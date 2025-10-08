import Sensor, { ISensor } from "../models/Sensor";

export const createSensor = async (sensorData: Partial<ISensor>) => {
  return await Sensor.create(sensorData);
};

export const findSensorById = async (sensorId: string) => {
  return await Sensor.findOne({ sensorId });
};

export const getUserSensors = async (userId: string) => {
  return await Sensor.find({ user: userId });
};
