import { Insurance } from '../models/Insurance';

export const createInsuranceRecord = async (insuranceData: any) => {
  const insurance = new Insurance(insuranceData);
  return await insurance.save();
};

export const findInsurancesByFarmerId = async (farmerId: string) => {
  return await Insurance.find({ farmerId });
};

export const findAllInsurances = async () => {
  return await Insurance.find().populate('farmerId', 'name email');
};

export const findInsuranceById = async (insuranceId: string) => {
  return await Insurance.findById(insuranceId);
};

import { InsuranceStatus } from '../services/insuranceService';

export const updateInsuranceRecordStatus = async (insuranceId: string, status: InsuranceStatus) => {
  const insurance = await Insurance.findById(insuranceId);
  if (!insurance) {
    throw new Error('Insurance not found');
  }
  insurance.status = status;
  return await insurance.save();
};
