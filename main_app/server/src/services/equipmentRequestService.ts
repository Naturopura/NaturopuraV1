import EquipmentRequest, { IEquipmentRequest } from '../models/EquipmentRequest';

export const createEquipmentRequest = async (farmerId: string, equipmentId: string, vendorId: string): Promise<IEquipmentRequest> => {
  const newRequest = new EquipmentRequest({
    farmerId,
    equipmentId,
    vendorId,
    status: 'pending'
  });
  return await newRequest.save();
};

export const getAllEquipmentRequests = async (): Promise<IEquipmentRequest[]> => {
  return await EquipmentRequest.find()
    .populate('equipmentId')
    .populate('farmerId')
    .populate({ path: 'vendorId', select: 'name phoneNumber' })
    .exec();
};

export const updateEquipmentRequestStatus = async (requestId: string, status: 'pending' | 'approved' | 'rejected'): Promise<IEquipmentRequest | null> => {
  const request = await EquipmentRequest.findById(requestId);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = status;
  return await request.save();
};

export const getRequestsByFarmerId = async (farmerId: string): Promise<IEquipmentRequest[]> => {
  return await EquipmentRequest.find({ farmerId })
    .populate('equipmentId')
    .populate({ path: 'vendorId', select: 'name phoneNumber' })
    .exec();
};
