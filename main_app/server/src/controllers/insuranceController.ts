import { Request, Response } from 'express';
import * as insuranceService from '../services/insuranceService';
import statusCode from '../utils/statusCode';

export const applyInsurance = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Not authenticated' });
      return;
    }

    const data = {
      ...req.body,
      farmerId: req.user._id,
    };

    const insurance = await insuranceService.applyInsurance(data);
    res.status(statusCode.CREATED).json(insurance);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error applying insurance',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMyInsurance = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Not authenticated' });
      return;
    }

    const insurances = await insuranceService.getInsurancesByFarmer(req.user._id);
    res.status(statusCode.OK).json(insurances);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching insurance',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllInsurances = async (_req: Request, res: Response): Promise<void> => {
  try {
    const insurances = await insuranceService.getAllInsurances();
    res.status(statusCode.OK).json(insurances);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching insurances',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateInsuranceStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    const updatedInsurance = await insuranceService.updateInsuranceStatus(id, status);

    res.status(statusCode.OK).json(updatedInsurance);
  } catch (error) {
    if (error instanceof Error && error.message === 'Insurance not found') {
      res.status(statusCode.NOT_FOUND).json({ message: error.message });
    } else {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating insurance status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
};
