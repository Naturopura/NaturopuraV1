import { Request, Response } from "express";
import * as sensorDataService from "../services/sensorDataService";

export const addSensorData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sensorId, value } = req.body;
    const user = req.user;
    
    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }
    
    const userId = user._id;

    const data = await sensorDataService.addSensorData(userId, sensorId, value);
    res.status(201).json({ message: "Data stored", data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSensorData = async (req: Request, res: Response) => {
  try {
    const { sensorId } = req.params;
    const data = await sensorDataService.getSensorReadings(sensorId, 50);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
