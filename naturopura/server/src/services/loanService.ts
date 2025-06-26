import * as loanDao from '../dao/loanDao';
import { LoanStatus, LoanStatusType } from '../utils/statusCode';

interface LoanData {
  farmer: string;
  amount: number;
  purpose: string;
  term: string;
  collateral?: string;
  cropType?: string;
  landSize?: number;
  farmDetails?: string;
  // add other fields as per your Loan model
}

export const createLoan = async (loanData: LoanData) => {
  const loan = await loanDao.createLoanRecord({
    ...loanData,
    status: LoanStatus.PENDING,
    appliedDate: new Date(),
  });

  return loan;
};

export const getAllLoans = async () => {
  return await loanDao.findAllLoans();
};

export const getLoansByFarmerId = async (farmerId: string) => {
  return await loanDao.findLoansByFarmerId(farmerId);
};

export const getLoanById = async (loanId: string) => {
  return await loanDao.findLoanById(loanId);
};

export const updateLoanStatus = async (
  loanId: string,
  status: LoanStatusType,
  rejectionReason?: string
) => {
  return await loanDao.updateLoanRecordStatus(loanId, status, rejectionReason);
};

export const getLoanStats = async () => {
  const totalLoans = await loanDao.countLoansByStatus('');
  const pendingLoans = await loanDao.countLoansByStatus(LoanStatus.PENDING);
  const approvedLoans = await loanDao.countLoansByStatus(LoanStatus.APPROVED);
  const rejectedLoans = await loanDao.countLoansByStatus(LoanStatus.REJECTED);
  const completedLoans = await loanDao.countLoansByStatus(LoanStatus.COMPLETED);

  const totalApprovedAmount = await loanDao.getTotalApprovedAmount();

  return {
    totalLoans,
    pendingLoans,
    approvedLoans,
    rejectedLoans,
    completedLoans,
    totalApprovedAmount,
  };
};
