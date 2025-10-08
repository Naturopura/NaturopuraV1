export interface PaymentRequest {
    amount: number;
    productId: string;
    status: 'success' | 'failed';
}

export interface CryptoPaymentRequest {
    productId: string;
    amount: number;
    txHash: string;
    paymentMethod: 'crypto';
}