import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as storeManagerService from "../services/storeManagerService";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const product = await storeManagerService.createProduct(req.body, req.user._id);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};

export const updateProductStatus = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const updated = await storeManagerService.updateProductStatus(
      req.params.id,
      req.body.status,
      req.user._id
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

export const updateArrivalStatus = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const updated = await storeManagerService.updateArrivalStatus(
      req.params.id,
      req.body.arrival_status,
      req.user._id
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update arrival status" });
  }
};

export const updateShippingStatus = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const updated = await storeManagerService.updateShippingStatus(
      req.params.id,
      req.body.shipping_status,
      req.user._id
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update shipping status" });
  }
};

export const updateShippingDetails = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const { vehicle_number, origin, destination } = req.body;
    const updated = await storeManagerService.updateShippingDetails(
      req.params.id,
      { vehicle_number, origin, destination },
      req.user._id
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update shipping details" });
  }
};

export const addVehicle = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const vehicle = await storeManagerService.createVehicle(req.body, req.user._id);
    res.json({ success: true, vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding vehicle" });
  }
};

export const addExportImport = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const record = await storeManagerService.createExportImport(req.body, req.user._id);
    res.json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding export/import record" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const stats = await storeManagerService.getDashboardStatsService(req.user._id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
  }
};
