import { Request, Response } from 'express';
import { fetchDashboardStats } from '../services/dashboardService';
import statusCode from '../utils/statusCode';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await fetchDashboardStats();
    res.status(statusCode.OK).json({ success: true, data: stats });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    console.error('Error fetching dashboard stats:', err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err
    });
  }
};
