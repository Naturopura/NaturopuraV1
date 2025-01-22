import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

export class FileUploader {
  private cloudinaryConfig: any;
  private sharedUploadData: { secure_url: string; public_id: string };

  constructor() {
    this.sharedUploadData = { secure_url: "", public_id: "" };

    // Cloudinary config
    this.cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };

    // Initialize Cloudinary
    cloudinary.config(this.cloudinaryConfig);
  }

  // Method to upload to Cloudinary
  private async uploadImageOnCloudinary(filePath: string, folderName: string) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
      });

      this.sharedUploadData.secure_url = result.secure_url;
      this.sharedUploadData.public_id = result.public_id;

      // Delete the local file after upload
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted successfully.");
        }
      });

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Method to retrieve the secure URL from public_id
  public async getSecureUrlFromPublicId(publicId: string) {
    if (!publicId) {
      throw new Error("Public ID is missing.");
    }

    try {
      const result = await cloudinary.api.resource(publicId);
      return result.secure_url;
    } catch (error: any) {
      console.error("Error fetching secure URL from public ID:", error);
      throw new Error(`Failed to fetch secure URL: ${error.message}`);
    }
  }

  // General method to handle file upload
  public async uploadFile({
    filePath,
    fileName,
  }: {
    filePath: string;
    fileName: string;
  }) {
    if (!filePath || !fileName) {
      throw new Error("File path or file name is missing.");
    }

    const uploadPlatform = process.env.UPLOAD_PLATFORM; // Get platform from env

    try {
      switch (uploadPlatform) {
        case "cloudinary":
          return await this.uploadImageOnCloudinary(filePath, "product-image");
        default:
          throw new Error("Invalid upload platform selected.");
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}
