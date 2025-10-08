import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as loanService from '../services/loanService';
import statusCode from '../utils/statusCode';

export const createLoan = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const {
      amount,
      purpose,
      term,
      collateral,
      cropType,
      landSize,
      farmDetails,
    } = req.body;

    const loanData = {
      farmer: req.user._id,
      amount,
      purpose,
      term,
      collateral,
      cropType,
      landSize,
      farmDetails,
    };

    const savedLoan = await loanService.createLoan(loanData);

    res.status(statusCode.CREATED).json({
      success: true,
      message: 'Loan application submitted successfully',
      data: savedLoan,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating loan application',
    });
  }
};

export const getAllLoans = async (_req: Request, res: Response): Promise<void> => {
  try {
    const loans = await loanService.getAllLoans();

    res.status(statusCode.OK).json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
  }
};

export const getFarmerLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
      return;
    }
    const loans = await loanService.getLoansByFarmerId(req.user._id);

    res.status(statusCode.OK).json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
  }
};

export const getLoanById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const loan = await loanService.getLoanById(req.params.id);

    if (!loan) {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Loan not found' });
      return;
    }

    // Check access rights
    const isOwner = loan.farmer && typeof loan.farmer === 'object'
      ? loan.farmer._id.toString() === req.user._id.toString()
      : false;

    if (req.user.role !== 'admin' && !isOwner) {
      res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: 'Not authorized to access this loan',
      });
      return;
    }

    res.status(statusCode.OK).json({ success: true, data: loan });
  } catch (error: any) {
    if (error.kind === 'ObjectId') {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Loan not found' });
      return;
    }
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
  }
};

export const updateLoanStatus = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(statusCode.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  try {
    const { status, rejectionReason } = req.body;

    const updatedLoan = await loanService.updateLoanStatus(req.params.id, status, rejectionReason);

    res.status(statusCode.OK).json({ success: true, data: updatedLoan });
  } catch (error: any) {
    if (error.message === 'Loan not found') {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Loan not found' });
      return;
    }
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
  }
};

export const getLoanStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await loanService.getLoanStats();

    res.status(statusCode.OK).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
  }
};
