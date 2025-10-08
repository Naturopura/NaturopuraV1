import { Request, Response } from 'express';
import * as storeService from '../services/storeService';
import statusCode from '../utils/statusCode';

export const createStore = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }
    const storeData = req.body;
    storeData.managerId = req.user._id;
    const store = await storeService.createNewStore(storeData);
    res.status(statusCode.CREATED).json({ success: true, data: store });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const getStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await storeService.getStoreById(req.params.id);
    if (!store) {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Store not found' });
      return;
    }
    res.status(statusCode.OK).json(store);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const getStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const stores = await storeService.getAllStores();
    res.status(statusCode.OK).json(stores);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }
    const updatedStore = await storeService.updateStore(req.params.id, req.body);
    if (!updatedStore) {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Store not found' });
      return;
    }
    res.status(statusCode.OK).json({ success: true, data: updatedStore });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const deleteStore = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }
    await storeService.deleteStore(req.params.id);
    res.status(statusCode.OK).json({ success: true, message: 'Store deleted successfully' });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};
