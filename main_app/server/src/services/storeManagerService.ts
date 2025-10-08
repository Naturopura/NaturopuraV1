import Product from "../models/Product";
import Vehicle from "../models/Vehicle";
import ExportImport from "../models/ExportImport";
import Store from "../models/Store";
import { addProductToStore } from "../dao/storeDao";

// Create a new product
export const createProduct = async (productData: any, userId: string) => {
  const product = new Product({
    ...productData,
    farmerId: userId,
  });
  return await product.save();
};

// Update product status
export const updateProductStatus = async (productId: string, status: "available" | "out_of_stock" | "purchased", userId: string) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return null;
  }
  product.status = status;
  await product.save();
  return product;
};

// Update arrival status
export const updateArrivalStatus = async (productId: string, arrival_status: "pending" | "arrived", userId: string) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return null;
  }
  product.arrival_status = arrival_status;
  if (arrival_status === "arrived") {
    product.arrivalDate = new Date();
    // Add product to store
    const store = await Store.findOne({ managerId: userId });
    if (store) {
      await addProductToStore(store._id.toString(), productId);
    }
  } else {
    product.arrivalDate = null;
  }
  await product.save();
  return product;
};

// Update shipping status
export const updateShippingStatus = async (productId: string, shipping_status: "pending" | "shipped" | "delivered", userId: string) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return null;
  }
  product.shipping_status = shipping_status;
  if (shipping_status === "shipped") {
    product.shippedDate = new Date();
  } else if (shipping_status === "delivered") {
    product.deliveredDate = new Date();
  } else {
    product.shippedDate = null;
    product.deliveredDate = null;
  }
  await product.save();
  return product;
};

// Update shipping details
export const updateShippingDetails = async (
  productId: string,
  shippingDetails: { vehicle_number?: string; origin?: string; destination?: string },
  userId: string
) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return null;
  }
  if (shippingDetails.vehicle_number !== undefined) {
    product.vehicle_number = shippingDetails.vehicle_number;
  }
  if (shippingDetails.origin !== undefined) {
    product.origin = shippingDetails.origin;
  }
  if (shippingDetails.destination !== undefined) {
    product.destination = shippingDetails.destination;
  }
  await product.save();
  return product;
};

// Create a new vehicle
export const createVehicle = async (vehicleData: any, userId: string) => {
  const vehicle = new Vehicle({
    ...vehicleData,
    storeManagerId: userId,
  });
  return await vehicle.save();
};

// Create export/import record
export const createExportImport = async (recordData: any, userId: string) => {
  const record = new ExportImport({
    ...recordData,
    storeManagerId: userId,
  });
  return await record.save();
};

// Get dashboard stats
export const getDashboardStatsService = async (userId: string) => {
  // Implement logic to aggregate stats for the store manager
  // For example, count of products, vehicles, export/import counts, etc.
  // This is a placeholder implementation
  const products = await Product.find({});
  const vehicles = await Vehicle.find({ storeManagerId: userId });
  const exportToday = 0; // Calculate based on ExportImport records
  const importToday = 0;
  const exportMonth = 0;
  const importMonth = 0;
  const vehicleCount = vehicles.length;

  return {
    products,
    vehicles,
    exportToday,
    importToday,
    exportMonth,
    importMonth,
    vehicleCount,
  };
};
