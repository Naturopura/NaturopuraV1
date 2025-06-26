import { Request, Response, NextFunction } from "express";
import STATUS_CODE from "../utils/statusCode";
import { detectCropIssueService } from "../services/cropService";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const detectCropHealth = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const imageFile = req.file;
    if (!imageFile) {
      res.status(STATUS_CODE.BAD_REQUEST).json({ error: "No image provided" });
      return;
    }

    const result = await detectCropIssueService(imageFile.buffer, imageFile.mimetype);
    res.status(STATUS_CODE.OK).json(result);
  } catch (err) {
    console.error("Error detecting crop health:", err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};
