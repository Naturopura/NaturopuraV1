import Subsidy, { ISubsidy } from '../models/Subsidy';

export const createSubsidy = async (subsidyData: Partial<ISubsidy>): Promise<ISubsidy> => {
  const subsidy = new Subsidy(subsidyData);
  return await subsidy.save();
};

export const updateSubsidyStatus = async (id: string, status: string): Promise<ISubsidy | null> => {
  return await Subsidy.findByIdAndUpdate(id, { status }, { new: true });
};

export const findSubsidiesByFarmerId = async (farmerId: string): Promise<ISubsidy[]> => {
  return await Subsidy.find({ farmerId });
};

export const findAllSubsidies = async (): Promise<ISubsidy[]> => {
  return await Subsidy.find().populate('farmerId');
};
