import { Request, Response } from 'express';
import * as feedbackService from '../services/feedbackService';
import statusCode from '../utils/statusCode';

export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Not authenticated' });
      return;
    }

    const { message, phoneNumber, rating, category } = req.body;

    if (!message) {
      res.status(statusCode.BAD_REQUEST).json({ message: 'Message is required' });
      return;
    }

    await feedbackService.createFeedback({
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      message,
      phoneNumber,
      rating,
      category,
    });

    res.status(statusCode.CREATED).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Server error submitting feedback',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      sort = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '10',
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const data = await feedbackService.getAllFeedbacks({
      search: search as string | undefined,
      category: category as string | undefined,
      sort: sort as string,
      order: order === 'asc' ? 'asc' : 'desc',
      page: isNaN(pageNumber) ? 1 : pageNumber,
      limit: isNaN(limitNumber) ? 10 : limitNumber,
    });

    res.status(statusCode.OK).json(data);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Server error fetching feedbacks',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
