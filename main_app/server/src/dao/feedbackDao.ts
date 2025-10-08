import Feedback from '../models/Feedback';

interface FeedbackQueryOptions {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const createFeedbackRecord = async (feedbackData: any) => {
  const feedback = new Feedback(feedbackData);
  return await feedback.save();
};

export const findAllFeedbacks = async (options: FeedbackQueryOptions) => {
  const { search, category, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = options;

  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) {
    query.category = category;
  }

  const pageNumber = page;
  const limitNumber = limit;
  const skip = (pageNumber - 1) * limitNumber;

  const sortOptions: Record<string, 1 | -1> = {
    [sort]: order === 'asc' ? 1 : -1,
  };

  const feedbacks = await Feedback.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  const total = await Feedback.countDocuments(query);

  return {
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber),
    feedbacks,
  };
};
