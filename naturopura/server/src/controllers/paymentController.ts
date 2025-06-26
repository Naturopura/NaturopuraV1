import { Request, Response } from 'express';
import { PaymentRequest, CryptoPaymentRequest } from '../types/payment';
import * as paymentService from '../services/paymentService';
import statusCode from '../utils/statusCode';
import * as purchaseDao from '../dao/purchaseDao';

export const processTestPayment = async (
  req: Request<{}, {}, PaymentRequest>,
  res: Response
): Promise<void> => {
  try {
    const payment = paymentService.handleTestPayment(req.body, req.user?._id);

    console.log('Test payment:', payment);

    res.status(statusCode.OK).json({
      success: true,
      message: `Test payment ${payment.status} processed`,
      data: payment
    });
  } catch (error) {
    console.error('Test payment error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      body: req.body
    });

    res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error processing test payment'
    });
  }
};

export const processCryptoPurchase = async (
  req: Request<{}, {}, CryptoPaymentRequest & { shippingAddress?: { name: string; phone: string; street: string; city: string; state: string; pincode: string } }>,
  res: Response
): Promise<void> => {
  try {
    console.log('Received payment request:', {
      body: req.body,
      userId: req.user?._id
    });

    const purchase = await paymentService.handleCryptoPurchase(req.body, req.user?._id);

    console.log('Processing purchase:', {
      purchase,
      user: req.user
    });

    res.status(statusCode.OK).json({
      success: true,
      message: 'Purchase processed successfully',
      data: purchase
    });
  } catch (error) {
    console.error('Purchase processing error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      body: req.body,
      userId: req.user?._id
    });

    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error processing purchase'
    });
  }
};

export const updatePurchaseAddress = async (
  req: Request<{ purchaseId: string }, {}, { shippingAddress: { name: string; phone: string; street: string; city: string; state: string; country: string; pincode: string } }>,
  res: Response
): Promise<void> => {
  try {
    const { purchaseId } = req.params;
    const { shippingAddress } = req.body;

    const purchase = await purchaseDao.findPurchaseById(purchaseId);
    if (!purchase) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Purchase not found'
      });
      return;
    }

    purchase.shippingAddress = shippingAddress;
    purchase.address = shippingAddress.street;
    purchase.pincode = Number(shippingAddress.pincode);

    const updatedPurchase = await purchaseDao.updatePurchase(purchase);

    res.status(statusCode.OK).json({
      success: true,
      message: 'Purchase address updated successfully',
      data: updatedPurchase
    });
  } catch (error) {
    console.error('Error updating purchase address:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      body: req.body,
      params: req.params
    });

    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating purchase address'
    });
  }
};

export const getPurchaseDetails = async (
  req: Request<{ purchaseId: string }>,
  res: Response
): Promise<void> => {
  try {
    console.log('Request headers:', req.headers);
    console.log('Request params:', req.params);
    console.log('Request user:', req.user);
    
    const { purchaseId } = req.params;
    console.log('Fetching purchase details:', {
      purchaseId,
      userId: req.user?._id,
      isAuthenticated: !!req.user
    });

    // First check if the purchase exists
    const purchase = await purchaseDao.findPurchaseById(purchaseId);
    if (!purchase) {
      console.log('Purchase not found in database for ID:', purchaseId);
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Purchase not found',
        error: 'No purchase found with the specified ID'
      });
      return;
    }

    // Verify ownership - purchase should belong to the authenticated user
    if (req.user?._id !== purchase.userId.toString()) {
      console.log('Purchase ID:', purchaseId, 'does not belong to user:', req.user?._id);
      res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: 'Unauthorized access',
        error: 'Purchase does not belong to this user'
      });
      return;
    }

    // Format the response to match the client's expectations
    const response = {
      data: {
        data: purchase
      }
    };

    res.status(statusCode.OK).json(response);
  } catch (error) {
    console.error('Error fetching purchase details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      purchaseId: req.params.purchaseId,
      userId: req.user?._id
    });
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching purchase details',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getPurchaseAddress = async (
  req: Request<{ purchaseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { purchaseId } = req.params;
    
    const purchase = await purchaseDao.findPurchaseById(purchaseId);
    if (!purchase) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Purchase not found'
      });
      return;
    }

    if (!purchase.shippingAddress) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'No address found for this purchase'
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      data: {
        address: purchase.shippingAddress
      }
    });
  } catch (error) {
    console.error('Error fetching purchase address:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching purchase address'
    });
  }
};

export default {
  processTestPayment,
  processCryptoPurchase,
  updatePurchaseAddress,
  getPurchaseAddress,
  getPurchaseDetails
};
