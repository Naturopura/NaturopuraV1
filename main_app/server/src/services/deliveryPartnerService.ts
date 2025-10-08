import { Types } from 'mongoose';
import * as purchaseDao from '../dao/purchaseDao';
import * as userDao from '../dao/userDao';


export const assignDeliveryPartner = async (purchaseId: string, deliveryPartnerId: string) => {
  try {
    const purchase = await purchaseDao.findPurchaseById(purchaseId);
    if (!purchase) {
      throw new Error('Purchase not found');
    }

    const deliveryPartner = await userDao.findUserById(deliveryPartnerId);
    if (!deliveryPartner || deliveryPartner.role !== 'delivery_partner') {
      throw new Error('Invalid delivery partner');
    }

    // Update the purchase with delivery partner ID
    purchase.deliveryPartnerId = new Types.ObjectId(deliveryPartnerId);
    await purchaseDao.updatePurchase(purchase);

    return {
      success: true,
      message: 'Delivery partner assigned successfully',
      data: purchase
    };
  } catch (error) {
    throw error;
  }
};

export const getAvailablePurchases = async (deliveryPartnerId: string) => {
  try {
    const deliveryPartner = await userDao.findUserById(deliveryPartnerId);
    if (!deliveryPartner || deliveryPartner.role !== 'delivery_partner') {
      throw new Error('Invalid delivery partner');
    }

    // Get all purchases
    const purchases = await purchaseDao.findPurchases();

    return {
      success: true,
      data: purchases
    };
  } catch (error) {
    throw error;
  }
};
