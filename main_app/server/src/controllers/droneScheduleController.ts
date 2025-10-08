import { Request, Response, NextFunction } from 'express';
import * as droneService from '../services/droneService';
import mongoose from 'mongoose';
import statusCode from '../utils/statusCode';

export const scheduleDroneFlight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { farmerId, date, fieldName, provider, currentLocation } = req.body;
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid farmerId' });
      return;
    }
    const scheduleData = {
      farmerId,
      date: new Date(date),
      fieldName,
      provider,
      currentLocation,
    };
    const schedule = await droneService.scheduleDroneFlight(scheduleData);
    res.status(statusCode.CREATED).json(schedule);
  } catch (error: any) {
    next(error);
  }
};

export const getAllSchedules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const schedules = await droneService.getAllSchedules();
    res.status(statusCode.OK).json(schedules);
  } catch (error: any) {
    next(error);
  }
};

export const updateScheduleStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid schedule id' });
      return;
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid status' });
      return;
    }

    const updatedSchedule = await droneService.updateScheduleStatus(id, status);
    res.status(statusCode.OK).json(updatedSchedule);
  } catch (error: any) {
    next(error);
  }
};

export const getSchedulesByFarmer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { farmerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid farmerId' });
      return;
    }
    const schedules = await droneService.getDroneSchedulesByFarmer(new mongoose.Types.ObjectId(farmerId));
    res.status(statusCode.OK).json(schedules);
  } catch (error: any) {
    next(error);
  }
};
