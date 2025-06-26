import User, { IUser } from '../models/User';

export const findUserByField = (field: string, value: string) => {
  return User.findOne({ [field]: value })
    .select('+storeManagerApprovalStatus +deliveryPartnerApprovalStatus');
};

export const findUserById = async (id: string) => {
  return await User.findById(id); // DO NOT use .lean() here!
};

export const createUserRecord = async (userData: Partial<IUser>): Promise<IUser> => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const updateUserById = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  if (updateData.password) delete updateData.password; // prevent password update here
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
};

export const findAllFarmers = async (): Promise<IUser[]> => {
  return await User.find({ role: 'farmer' }).select('-password').sort({ name: 1 });
};
