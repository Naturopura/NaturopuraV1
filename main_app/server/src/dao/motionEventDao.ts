import MotionEvent from '../models/MotionEvent';

export const createMotionEventRecord = async (motionEventData: any) => {
  const motionEvent = new MotionEvent(motionEventData);
  return await motionEvent.save();
};

export const findAllMotionEvents = async () => {
  return await MotionEvent.find().sort({ createdAt: -1 });
};
