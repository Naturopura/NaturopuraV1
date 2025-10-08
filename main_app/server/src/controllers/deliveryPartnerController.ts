import { Request, Response, RequestHandler } from 'express';
import { assignDeliveryPartner, getAvailablePurchases } from '../services/deliveryPartnerService';
import statusCode from '../utils/statusCode';
import * as purchaseDao from '../dao/purchaseDao';


// Helper function to handle responses
const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
};

// Helper function for error handling
const handleError = (res: Response, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: errorMessage
  });
};

// Helper function to check user ID
const checkUserId = (req: Request): string => {
  const userId = req.user?._id;
  if (!userId) {
    throw new Error('User ID is required');
  }
  return userId as string;
};

export const getAvailablePurchasesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = checkUserId(req);
    const { data } = await getAvailablePurchases(userId);
    res.status(statusCode.OK).json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const assignPurchaseController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;
    const userId = checkUserId(req);
    const { data } = await assignDeliveryPartner(purchaseId, userId);
    sendResponse(res, statusCode.OK, data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAssignedPurchasesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = checkUserId(req);
    const purchases = await purchaseDao.findPurchasesByDeliveryPartnerId(userId);
    sendResponse(res, statusCode.OK, purchases);
  } catch (error) {
    handleError(res, error);
  }
};
