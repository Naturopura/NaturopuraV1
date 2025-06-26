import Purchase from '../models/Purchase';

export const findPurchaseById = async (id: string) => {
  return await Purchase.findById(id);
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
