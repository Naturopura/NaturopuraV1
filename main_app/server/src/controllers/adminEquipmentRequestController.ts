import { Request, Response } from 'express';
import * as equipmentRequestService from '../services/equipmentRequestService';
import statusCode from '../utils/statusCode';

export const getAllRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await equipmentRequestService.getAllEquipmentRequests();
    res.status(statusCode.OK).json(requests);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch equipment requests' });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Missing required fields' });
      return;
    }
    const updatedRequest = await equipmentRequestService.updateEquipmentRequestStatus(id, status);
    res.status(statusCode.OK).json(updatedRequest);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update request status' });
  }
};
