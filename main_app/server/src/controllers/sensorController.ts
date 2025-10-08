import { Request, Response } from "express";
import * as sensorService from "../services/sensorService";
import { IUser } from "../models/User";

export const registerSensor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sensorId, type } = req.body;
    const user = req.user as IUser; // Type assertion for authenticated user
    const userId = user._id;

    const sensor = await sensorService.registerSensor(userId, sensorId, type);
    res.status(201).json({ message: "Sensor registered", sensor });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserSensors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser; // Type assertion for authenticated user
    const userId = user._id;
    const sensors = await sensorService.getSensorsForUser(userId);
    res.json(sensors);
  } catch ( error: any) {
    res.status(500).json({ error: error.message });
  }
};
