import Product from '../models/Product';

export const findAllProducts = async () => {
  return await Product.find().populate('farmerId', 'name email').sort({ createdAt: -1 });
};

export const findProductById = async (id: string) => {
  return await Product.findById(id).populate('farmerId', 'name email');
};

export const createProductRecord = async (productData: any) => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProductById = async (productId: string, updateData: any) => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true }).populate('farmerId', 'name email');
};

export const deleteProductById = async (productId: string) => {
  return await Product.findByIdAndDelete(productId);
};

export const findProductsByCategory = async (category: string) => {
  return await Product.find({ category })
    .populate("farmerId", "name email")
    .sort({ createdAt: -1 });
};


