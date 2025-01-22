"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
class FileUploader {
    constructor() {
        this.sharedUploadData = { secure_url: "", public_id: "" };
        // Cloudinary config
        this.cloudinaryConfig = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        };
        // Initialize Cloudinary
        cloudinary_1.v2.config(this.cloudinaryConfig);
    }
    // Method to upload to Cloudinary
    uploadImageOnCloudinary(filePath, folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.v2.uploader.upload(filePath, {
                    folder: folderName,
                });
                this.sharedUploadData.secure_url = result.secure_url;
                this.sharedUploadData.public_id = result.public_id;
                // Delete the local file after upload
                fs_1.default.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting local file:", err);
                    }
                    else {
                        console.log("Local file deleted successfully.");
                    }
                });
                return {
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    // Method to retrieve the secure URL from public_id
    getSecureUrlFromPublicId(publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!publicId) {
                throw new Error("Public ID is missing.");
            }
            try {
                const result = yield cloudinary_1.v2.api.resource(publicId);
                return result.secure_url;
            }
            catch (error) {
                console.error("Error fetching secure URL from public ID:", error);
                throw new Error(`Failed to fetch secure URL: ${error.message}`);
            }
        });
    }
    // General method to handle file upload
    uploadFile(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filePath, fileName, }) {
            if (!filePath || !fileName) {
                throw new Error("File path or file name is missing.");
            }
            const uploadPlatform = process.env.UPLOAD_PLATFORM; // Get platform from env
            try {
                switch (uploadPlatform) {
                    case "cloudinary":
                        return yield this.uploadImageOnCloudinary(filePath, "product-image");
                    default:
                        throw new Error("Invalid upload platform selected.");
                }
            }
            catch (error) {
                console.error("Upload Error:", error);
                throw new Error(`Upload failed: ${error.message}`);
            }
        });
    }
}
exports.FileUploader = FileUploader;
