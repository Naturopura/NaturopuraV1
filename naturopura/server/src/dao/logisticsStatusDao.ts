import LogisticsStatus from '../models/LogisticsStatus';

export const findLogisticsStatusByProductId = async (productId: string) => {
  return await LogisticsStatus.findOne({ productId });
};

export const createLogisticsStatus = async (logisticsData: any) => {
  const logistics = new LogisticsStatus(logisticsData);
  return await logistics.save();
};

export const updateLogisticsStatus = async (productId: string, updateData: any) => {
  const logistics = await LogisticsStatus.findOne({ productId });
  if (!logistics) {
    throw new Error('Logistics status not found');
  }

  Object.assign(logistics, updateData);
  return await logistics.save();
};

export const findAllLogisticsStatuses = async () => {
  return await LogisticsStatus.find();
};
