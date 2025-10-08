import Store from '../models/Store';

export const createStore = async (storeData: any) => {
  const store = new Store(storeData);
  return await store.save();
};

export const findStoreById = async (id: string) => {
  return await Store.findById(id)
    .populate('managerId', 'name email')
    .populate('products')
    .populate('vehicles');
};

export const findAllStores = async () => {
  return await Store.find()
    .populate('managerId', 'name email')
    .populate('products')
    .populate('vehicles');
};

export const updateStoreById = async (id: string, updateData: any) => {
  return await Store.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('managerId', 'name email')
    .populate('products')
    .populate('vehicles');
};

export const deleteStoreById = async (id: string) => {
  return await Store.findByIdAndDelete(id);
};

export const addProductToStore = async (storeId: string, productId: string) => {
  return await Store.findByIdAndUpdate(
    storeId,
    { $addToSet: { products: productId } },
    { new: true }
  );
};
