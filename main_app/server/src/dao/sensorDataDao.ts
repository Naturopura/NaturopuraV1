import SensorData, { ISensorData } from "../models/SensorData";

export const saveSensorData = async (data: Partial<ISensorData>) => {
  return await SensorData.create(data);
};

export const getSensorData = async (sensorId: string, limit = 50) => {
  return await SensorData.find({ sensorId }).sort({ timestamp: -1 }).limit(limit);
};
