import Purchase from '../models/Purchase';

export const findPurchaseById = async (id: string) => {
  return await Purchase.findById(id)
    .populate('productId', 'name category description price unit quantity')
    .populate('userId', 'username email');
};

export const updatePurchase = async (purchase: any) => {
  return await purchase.save();
};

export const findPurchases = async () => {
  return await Purchase.find()
    .populate('productId', 'name category description price unit quantity')
    .populate('userId', 'username email')
    .select('+address');
};

export const findPurchasesByDeliveryPartnerId = async (deliveryPartnerId: string) => {
  return await Purchase.find({ deliveryPartnerId })
    .populate('productId', 'name category description price unit quantity')
    .populate('userId', 'username email')
    .select('+address');
};

export const createPurchase = async (purchaseData: any, options?: any) => {
  const purchase = new Purchase(purchaseData);
  return await purchase.save(options);
};

export const findUserPurchaseById = async (userId: string, purchaseId: string) => {
  return await Purchase.findOne({ _id: purchaseId, userId })
    .populate('productId', 'name category description price unit quantity')
    .populate('userId', 'username email')
    .select('shippingAddress');
};

export const findPurchasesByUserId = async (userId: string) => {
  return await Purchase.find({ userId })
    .populate('productId', 'name category description price unit quantity')
    .populate('userId', 'name email')
    .select('shippingAddress createdAt amount paymentMethod status');
};
