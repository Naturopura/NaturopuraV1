import { Request, Response } from 'express';
import * as equipmentService from '../services/equipmentService';
import * as equipmentRequestService from '../services/equipmentRequestService';
import statusCode from '../utils/statusCode';

export const searchEquipments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    if (!search || typeof search !== 'string') {
      const equipments = await equipmentService.getAllEquipments(); // Fetch all equipments
      res.status(statusCode.OK).json(equipments);
      return;
    }
    let equipments = await equipmentService.searchEquipments(search);
    equipments = equipments.map(equipment => equipment.toObject());

    console.log('Equipments returned from searchEquipments:', equipments);
    res.status(statusCode.OK).json(equipments);
  } catch (error) {
    console.error('Error in searchEquipments controller:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to search equipments' });
  }
};

export const getAllEquipments = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.user?._id; // Get vendor ID from authenticated user
    console.log('Authenticated vendor ID:', vendorId); // Log the vendor ID
    if (!vendorId) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    // Fetch all equipments and populate vendor info
    let equipments = await equipmentService.getAllEquipments();
    // Populate vendor info for each equipment
    equipments = await Promise.all(equipments.map(async (eq) => {
      const populatedEq = await eq.populate({
        path: 'vendorId',
        select: 'name phoneNumber',
        model: 'User'
      });
      return populatedEq.toObject();
    }));
    res.status(statusCode.OK).json(equipments);
  } catch (error) {
    console.error('Error in getAllEquipments controller:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch equipments' });
  }
};

export const getRequestStatuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const farmerId = req.user?._id;
    const { equipmentIds } = req.body;
    if (!farmerId || !Array.isArray(equipmentIds)) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid request' });
      return;
    }
    const allRequests = await equipmentRequestService.getAllEquipmentRequests();
    // Filter requests for this farmer and equipmentIds
    const filteredRequests = allRequests.filter(req =>
      req.farmerId.toString() === farmerId.toString() &&
      equipmentIds.includes(req.equipmentId.toString())
    );
    // Map equipmentId to request status and vendor phone number if approved
    const response = filteredRequests.map(req => ({
      equipmentId: req.equipmentId.toString(),
      status: req.status,
      vendor: req.vendorId && typeof req.vendorId !== 'string' && 'name' in req.vendorId && 'phoneNumber' in req.vendorId
        ? { name: (req.vendorId as any).name, phoneNumber: (req.vendorId as any).phoneNumber }
        : null,
    }));
    res.status(statusCode.OK).json(response);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get request statuses' });
  }
};
