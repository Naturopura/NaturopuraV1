import { Request, Response } from 'express';
import * as logisticsService from '../services/logisticsService';
import statusCode from '../utils/statusCode';

export const initializeLogistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    const logistics = await logisticsService.initializeLogistics(productId);
    res.status(statusCode.CREATED).json(logistics);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const updateLogisticsStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.user as { role: string };
    
    if (role !== 'admin') {
      res.status(statusCode.FORBIDDEN).json({ 
        success: false, 
        message: 'Only admins can update logistics status' 
      });
      return;
    }

    const { productId } = req.params;
    const { step, ...stepData } = req.body;
    
    const logistics = await logisticsService.updateLogisticsStep(productId, step, stepData);
    res.status(statusCode.OK).json(logistics);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
  return;
};

export const getLogisticsStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const logistics = await logisticsService.getLogisticsStatus(productId);
    res.status(statusCode.OK).json(logistics);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};