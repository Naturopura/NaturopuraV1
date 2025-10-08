import Loan from '../models/Loan';

export const createLoanRecord = async (loanData: any) => {
  const loan = new Loan(loanData);
  return await loan.save();
};

export const findAllLoans = async () => {
  return await Loan.find()
    .populate('farmer', 'name email')
    .sort({ appliedDate: -1 });
};

export const findLoansByFarmerId = async (farmerId: string) => {
  return await Loan.find({ farmer: farmerId }).sort({ appliedDate: -1 });
};

export const findLoanById = async (loanId: string) => {
  return await Loan.findById(loanId).populate('farmer', 'name email');
};

import { LoanStatusType } from '../utils/statusCode';

export const updateLoanRecordStatus = async (loanId: string, status: LoanStatusType, rejectionReason?: string) => {
  const loan = await Loan.findById(loanId);
  if (!loan) {
    throw new Error('Loan not found');
  }

  loan.status = status;

  if (status === 'approved') {
    loan.approvedDate = new Date();
  } else if (status === 'rejected') {
    loan.rejectedDate = new Date();
    loan.rejectionReason = rejectionReason || 'Application rejected by admin';
  } else if (status === 'completed') {
    loan.completedDate = new Date();
  }

  return await loan.save();
};

export const countLoansByStatus = async (status: string) => {
  if (!status) {
    return await Loan.countDocuments();
  }
  return await Loan.countDocuments({ status });
};

export const getTotalApprovedAmount = async () => {
  const approvedLoans = await Loan.find({ status: 'approved' });
  return approvedLoans.reduce((acc, loan) => acc + loan.amount, 0);
};

export const findLoansAggregate = async () => {
  return await Loan.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        approved: {
          $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
        },
        rejected: {
          $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
        }
      }
    }
  ]);
};
