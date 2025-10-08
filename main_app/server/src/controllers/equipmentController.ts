import { Request, Response } from 'express';
import * as equipmentService from '../services/equipmentService';
import statusCode from '../utils/statusCode';
import { equipmentUpload } from '../middleware/upload';


export const getVendorEquipments = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.user?._id;
    if (!vendorId) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    const equipments = await equipmentService.getEquipmentsByVendor(vendorId);
    res.status(statusCode.OK).json(equipments);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch equipments' });
  }
};

export const addVendorEquipment = [
  equipmentUpload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const vendorId = req.user?._id;
      if (!vendorId) {
        res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
      }
      const { name, quantity, price } = req.body;
      if (!name || quantity == null || price == null) {
        res.status(statusCode.BAD_REQUEST).json({ message: 'Missing required fields: name, quantity, price' });
        return;
      }
      const image = req.file ? `/uploads/equipment/${req.file.filename}` : undefined;
      const newEquipment = await equipmentService.addEquipment(vendorId, { name, quantity, price, image });
      res.status(statusCode.CREATED).json(newEquipment);
    } catch (error) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add equipment' });
    }
  }
];

export const updateVendorEquipment = [
  equipmentUpload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const vendorId = req.user?._id;
      if (!vendorId) {
        res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
      }
      const { id } = req.params;
      const { name, quantity, price } = req.body;
      const updateData: { name?: string; quantity?: number; price?: number; image?: string; } = {};
      if (name !== undefined) updateData.name = name;
      if (quantity !== undefined) updateData.quantity = Number(quantity);
      if (price !== undefined) updateData.price = Number(price);
      if (req.file) updateData.image = `/uploads/equipment/${req.file.filename}`;
      const updatedEquipment = await equipmentService.updateEquipment(id, vendorId, updateData);
      if (!updatedEquipment) {
        res.status(statusCode.NOT_FOUND).json({ message: 'Equipment not found' });
        return;
      }
      res.status(statusCode.OK).json(updatedEquipment);
    } catch (error) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update equipment' });
    }
  }
];

export const deleteVendorEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.user?._id;
    if (!vendorId) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    const { id } = req.params;
    const deleted = await equipmentService.deleteEquipment(id, vendorId);
    if (!deleted) {
      res.status(statusCode.NOT_FOUND).json({ message: 'Equipment not found' });
      return;
    }
    res.status(statusCode.OK).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete equipment' });
  }
};
