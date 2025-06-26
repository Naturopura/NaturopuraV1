import StoreProduct from "../models/StoreProduct";
import Vehicle from "../models/Vehicle";
import ExportImport from "../models/ExportImport";

export const createProduct = async (data: any, storeManagerId: string) => {
  const product = new StoreProduct({ ...data, storeManager: storeManagerId });
  return await product.save();
};

export const updateProductStatus = async (
  productId: string,
  status: "in progress" | "delivered",
  storeManagerId: string
) => {
  const update: any = { status };
  if (status === "delivered") {
    update.deliveredAt = new Date();
  } else {
    update.deliveredAt = null;
  }
  return await StoreProduct.findOneAndUpdate(
    { _id: productId, storeManager: storeManagerId },
    update,
    { new: true }
  );
};

export const createVehicle = async (data: any, storeManagerId: string) => {
  const vehicle = new Vehicle({ ...data, storeManager: storeManagerId });
  return await vehicle.save();
};

export const createExportImport = async (data: any, storeManagerId: string) => {
  const record = new ExportImport({ ...data, storeManager: storeManagerId, date: new Date() });
  return await record.save();
};

export const getDashboardStatsService = async (storeManagerId: string) => {
  const products = await StoreProduct.find({ storeManager: storeManagerId });
  const vehicles = await Vehicle.find({ storeManager: storeManagerId });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const exportsToday = await ExportImport.countDocuments({
    storeManager: storeManagerId,
    type: "export",
    date: { $gte: today }
  });
  const importsToday = await ExportImport.countDocuments({
    storeManager: storeManagerId,
    type: "import",
    date: { $gte: today }
  });
  const exportsMonth = await ExportImport.countDocuments({
    storeManager: storeManagerId,
    type: "export",
    date: { $gte: monthStart }
  });
  const importsMonth = await ExportImport.countDocuments({
    storeManager: storeManagerId,
    type: "import",
    date: { $gte: monthStart }
  });

  return {
    products,
    vehicleCount: vehicles.length,
    vehicles, // <-- add this
    exportToday: exportsToday,
    importToday: importsToday,
    exportMonth: exportsMonth,
    importMonth: importsMonth
  };
};