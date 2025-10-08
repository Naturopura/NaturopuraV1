import * as storeDao from '../dao/storeDao';

export const createNewStore = async (storeData: any) => {
  return await storeDao.createStore(storeData);
};

export const getStoreById = async (id: string) => {
  return await storeDao.findStoreById(id);
};

export const getAllStores = async () => {
  return await storeDao.findAllStores();
};

export const updateStore = async (id: string, updateData: any) => {
  return await storeDao.updateStoreById(id, updateData);
};

export const deleteStore = async (id: string) => {
  return await storeDao.deleteStoreById(id);
};
