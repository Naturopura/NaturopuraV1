import Equipment, { IEquipment } from '../models/Equipment';

export const getEquipmentsByVendor = async (vendorId: string): Promise<IEquipment[]> => {
  console.log('Fetching equipments for vendor ID:', vendorId); // Log the vendor ID
  const equipments = await Equipment.find({ vendorId });
  return equipments;
};

export const getAllEquipments = async (): Promise<IEquipment[]> => {
  try {
    const equipments = await Equipment.find({});
    console.log('All equipments fetched:', equipments); // Log the fetched equipments
    return equipments;
  } catch (error) {
    console.error('Error fetching all equipments:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const addEquipment = async (vendorId: string, equipmentData: { name: string; quantity: number; price: number; image?: string; }): Promise<IEquipment> => {
  const newEquipment = new Equipment({
    ...equipmentData,
    vendorId
  });
  return await newEquipment.save();
};

export const searchEquipments = async (searchTerm: string): Promise<IEquipment[]> => {
  return await Equipment.find({ name: { $regex: searchTerm, $options: 'i' } }).populate({
    path: 'vendorId',
    select: 'name phoneNumber',
    model: 'User'
  });
};

export const updateEquipment = async (equipmentId: string, vendorId: string, updateData: { name?: string; quantity?: number; price?: number; image?: string; }): Promise<IEquipment | null> => {
  const equipment = await Equipment.findOne({ _id: equipmentId, vendorId });
  if (!equipment) {
    throw new Error('Equipment not found or unauthorized');
  }
  Object.assign(equipment, updateData);
  return await equipment.save();
};

export const deleteEquipment = async (equipmentId: string, vendorId: string): Promise<boolean> => {
  const result = await Equipment.findOneAndDelete({ _id: equipmentId, vendorId });
  return !!result;
};
