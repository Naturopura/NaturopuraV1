import * as droneDao from '../dao/droneDao';
import { ScheduleData } from '../dao/droneDao';
import mongoose from 'mongoose';

export const scheduleDroneFlight = async (scheduleData: ScheduleData) => {
  // Additional business logic or validation can be added here
  return await droneDao.createSchedule(scheduleData);
};

export const getAllSchedules = async () => {
  return await droneDao.getAllSchedules();
};

export const updateScheduleStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
  return await droneDao.updateScheduleStatus(id, status);
};

export const getDroneScheduleById = async (id: string) => {
  return await droneDao.getScheduleById(id);
};

export const getDroneSchedulesByFarmer = async (farmerId: mongoose.Types.ObjectId) => {
  return await droneDao.getSchedulesByFarmer(farmerId.toString());
};
