import * as sensorDataDao from "../dao/sensorDataDao";
import * as sensorDao from "../dao/sensorDao";
import mongoose from "mongoose";

export const addSensorData = async (userId: string, sensorId: string, value: number) => {
  const sensor = await sensorDao.findSensorById(sensorId);
  if (!sensor) throw new Error("Sensor not found");
  if (sensor.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized: Sensor does not belong to this user");
  }

  return await sensorDataDao.saveSensorData({
    sensor: new mongoose.Types.ObjectId(sensorId),
    user: new mongoose.Types.ObjectId(userId),
    value,
    timestamp: new Date(),
  });
};

export const getSensorReadings = async (sensorId: string, limit?: number) => {
  return await sensorDataDao.getSensorData(sensorId, limit);
};
