import * as feedbackDao from '../dao/feedbackDao';

interface CreateFeedbackData {
  userId: string;
  name: string;
  email: string;
  message: string;
  phoneNumber?: string;
  rating?: number;
  category?: string;
}

interface FeedbackQueryOptions {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const createFeedback = async (data: CreateFeedbackData) => {
  return await feedbackDao.createFeedbackRecord(data);
};

export const getAllFeedbacks = async (options: FeedbackQueryOptions) => {
  return await feedbackDao.findAllFeedbacks(options);
};
