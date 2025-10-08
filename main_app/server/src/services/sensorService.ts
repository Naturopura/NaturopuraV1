import * as sensorDao from "../dao/sensorDao";

export const registerSensor = async (userId: string, sensorId: string, type: string) => {
  const existing = await sensorDao.findSensorById(sensorId);
  if (existing) throw new Error("Sensor already registered");

  return await sensorDao.createSensor({ sensorId, user: userId, type });
};

export const getSensorsForUser = async (userId: string) => {
  return await sensorDao.getUserSensors(userId);
};
