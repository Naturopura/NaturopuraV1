import { Request, Response } from 'express';
import * as equipmentRequestService from '../services/equipmentRequestService';
import statusCode from '../utils/statusCode';

export const getMyRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const farmerId = req.user?._id;
    if (!farmerId) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    const requests = await equipmentRequestService.getRequestsByFarmerId(farmerId);
    // Map requests to include vendor phone number only if status is approved
    const mappedRequests = requests.map(req => {
      const equipment = req.equipmentId && typeof req.equipmentId !== 'string' && 'name' in req.equipmentId ? req.equipmentId : null;
      const vendor = req.vendorId && typeof req.vendorId !== 'string' && 'name' in req.vendorId ? req.vendorId : null;
      return {
        _id: req._id,
        equipmentName: equipment?.name || 'Unknown',
        vendorName: vendor?.name || 'Unknown',
        status: req.status,
        requestedAt: req.createdAt,
        vendorPhoneNumber: req.status === 'approved' && vendor && 'phoneNumber' in vendor ? vendor.phoneNumber : undefined,
      };
    });
    res.status(statusCode.OK).json(mappedRequests);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch your equipment requests' });
  }
};

export const createEquipmentRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    const { equipmentId, vendorId } = req.body;
    if (!equipmentId || !vendorId) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Equipment ID and Vendor ID are required' });
      return;
    }
    const newRequest = await equipmentRequestService.createEquipmentRequest(userId, equipmentId, vendorId);
    res.status(statusCode.CREATED).json(newRequest);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create equipment request' });
  }
};
