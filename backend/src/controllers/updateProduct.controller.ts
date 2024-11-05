import Product from '../models/admin.farmer.model';
import { Response, Request, NextFunction } from 'express';

async function updateProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // Extract productId and the updated fields from the request body
    const { productId, farmerId, name, category, price, quantity, description, image, unit } = req.body;
    console.log("Updating product:", productId);

    // Ensure productId and farmerId are provided
    if (!productId || !farmerId) {
      return res.status(400).json({ error: "Please provide both productId and farmerId." });
    }

    // Locate and update the product using productId and farmerId
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, farmerId }, // Ensure the product belongs to the farmer
      { name, category, price, quantity, description, image, unit }, // Fields to update
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found or not authorized to update." });
    }

    // Return the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default updateProduct;
