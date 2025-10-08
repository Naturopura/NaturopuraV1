import { Request, Response } from 'express';
import statusCode from '../utils/statusCode';
import * as motionEventService from '../services/motionEventService';

export const createMotionEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { timestamp } = req.body;

    if (!req.file) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Photo file is required' });
      return;
    }

    const { detectedObjects } = await motionEventService.createMotionEventService(
      req.file.buffer,
      timestamp
    );

    res.status(statusCode.CREATED).json({
      message: 'Motion event saved and object detection completed successfully',
      detectedObjects,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};

export const getAllMotionEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await motionEventService.getAllMotionEventsService();
    res.status(statusCode.OK).json(events);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};
