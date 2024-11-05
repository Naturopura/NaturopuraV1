import Product from '../models/admin.farmer.model';
import { Response, Request, NextFunction } from 'express';

async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // Extract productId and farmerId from the request body
    const { productId, farmerId } = req.body;
    console.log("Deleting product:", productId);

    // Ensure productId and farmerId are provided
    if (!productId || !farmerId) {
      return res.status(400).json({ error: "Please provide both productId and farmerId." });
    }

    // Find and delete the product by productId and farmerId
    const deletedProduct = await Product.findOneAndDelete({ _id: productId, farmerId });

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found or not authorized to delete." });
    }

    // Return success message as the response
    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default deleteProduct;
