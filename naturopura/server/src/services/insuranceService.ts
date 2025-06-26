import * as insuranceDao from '../dao/insuranceDao';
import { Types } from 'mongoose';

export type InsuranceStatus = 'pending' | 'approved' | 'rejected' | 'completed';

interface ApplyInsuranceData {
  farmerId: Types.ObjectId;
  policyNumber: string;
  amount: number;
  status?: InsuranceStatus;
  appliedDate?: Date;
  // add other insurance fields here
}

export const applyInsurance = async (data: ApplyInsuranceData) => {
  const insurance = await insuranceDao.createInsuranceRecord({
    ...data,
    status: data.status || 'pending',
    appliedDate: data.appliedDate || new Date(),
  });
  return insurance;
};

export const getInsurancesByFarmer = async (farmerId: string) => {
  return await insuranceDao.findInsurancesByFarmerId(farmerId);
};

export const getAllInsurances = async () => {
  return await insuranceDao.findAllInsurances();
};

export const updateInsuranceStatus = async (
  insuranceId: string,
  status: InsuranceStatus
) => {
  return await insuranceDao.updateInsuranceRecordStatus(insuranceId, status);
};
