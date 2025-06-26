import { ethers } from 'ethers';
import mongoose from 'mongoose';
import * as productDao from '../dao/productDao';
import * as purchaseDao from '../dao/purchaseDao';
import { PaymentRequest, CryptoPaymentRequest } from '../types/payment';

export const handleTestPayment = (req: PaymentRequest, userId: string | undefined) => {
  const { amount, productId, status } = req;

  if (!amount || !productId) {
    throw new Error('Amount and productId are required');
  }

  return {
    amount,
    productId,
    userId,
    status,
    createdAt: new Date()
  };
};

export const handleCryptoPurchase = async (req: CryptoPaymentRequest & { shippingAddress?: { name: string; phone: string; street: string; city: string; state: string; pincode: string } }, userId: string | undefined) => {
  const { productId, amount, txHash, shippingAddress } = req;

  if (!productId || !amount || !txHash || !shippingAddress) {
    throw new Error('Missing required fields');
  }

  let transaction: ethers.TransactionResponse | null = null;
  try {
    // Validate environment variables
    if (!process.env.SEPOLIA_RPC_URL) {
      throw new Error('SEPOLIA_RPC_URL environment variable is not set');
    }
    if (!process.env.CONTRACT_ADDRESS) {
      throw new Error('CONTRACT_ADDRESS environment variable is not set');
    }

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    console.log('Verifying transaction:', txHash);

    // First try to get the transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      throw new Error(`Transaction receipt not found for txHash: ${txHash}`);
    }

    // Check if transaction was successful
    if (receipt.status !== 1) {
      throw new Error(`Transaction failed on blockchain. Status: ${receipt.status}`);
    }

    // Verify the transaction matches our expected parameters
    transaction = await provider.getTransaction(txHash);
    if (!transaction) {
      throw new Error(`Transaction not found for txHash: ${txHash}`);
    }

    // Get product and verify price
    const product = await productDao.findProductById(productId);
    if (!product) {
      throw new Error(`Product not found with ID: ${productId}`);
    }

    // Check if product is available
    if (product.status !== 'available') {
      throw new Error(`Product is not available for purchase. Current status: ${product.status}`);
    }

    // Verify transaction amount matches product price
    const expectedValue = ethers.parseEther(product.price.toString());
    if (transaction.value !== expectedValue) {
      throw new Error(`Transaction value mismatch. Expected: ${expectedValue.toString()}, Actual: ${transaction.value.toString()}`);
    }

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
    // No longer update product status on purchase to allow multiple purchases

      // Create purchase record
      const purchase = await purchaseDao.createPurchase({
        productId,
        userId,
        deliveryPartnerId: undefined, // TODO: Assign delivery partner ID here if applicable
        address: shippingAddress.street,
        pincode: shippingAddress.pincode,
        txHash,
        amount: Number(product.price),
        paymentMethod: 'crypto',
        status: 'completed',
        shippingAddress
      }, { session });

      await session.commitTransaction();
      return purchase;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    console.error('Transaction verification failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      txHash,
      userId,
      amount,
      transaction: transaction ? {
        to: transaction.to,
        value: transaction.value.toString()
      } : null
    });
    throw error;
  }
};
