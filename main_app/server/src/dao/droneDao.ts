import DroneSchedule, { IDroneSchedule } from '../models/DroneSchedule';
import mongoose from 'mongoose';

export interface ScheduleData {
  farmerId: string;
  date: Date;
  fieldName: string;
  provider: string;
  currentLocation: string;
}

export const createSchedule = async (scheduleData: ScheduleData): Promise<IDroneSchedule> => {
  const schedule = new DroneSchedule({
    farmerId: scheduleData.farmerId,
    date: scheduleData.date,
    fieldName: scheduleData.fieldName,
    provider: scheduleData.provider,
    currentLocation: scheduleData.currentLocation,
  });

  return await schedule.save();
};

export const getAllSchedules = async (): Promise<IDroneSchedule[]> => {
  return await DroneSchedule.find().sort({ createdAt: -1 });
};

export const getScheduleById = async (id: string): Promise<IDroneSchedule | null> => {
  return await DroneSchedule.findById(id);
};

export const getSchedulesByFarmer = async (farmerId: string): Promise<IDroneSchedule[]> => {
  return await DroneSchedule.find({ farmerId });
};

export const updateScheduleStatus = async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<IDroneSchedule | null> => {
  return await DroneSchedule.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};
