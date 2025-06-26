// controllers/smsController.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendSingleSMS, sendBulkSMSMessages } from "../services/smsService";
import STATUS from "../utils/statusCode";

// Interfaces
interface SendSMSRequest {
  to: string;
  message: string;
}

interface SendBulkSMSRequest {
  recipients: string[];
  message: string;
}

export const sendSMS = async (
  req: Request<{}, {}, SendSMSRequest>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(STATUS.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const { to, message } = req.body;

  try {
    const result = await sendSingleSMS(to, message);
    res.status(STATUS.OK).json({
      message: "SMS sent successfully",
      ...result,
    });
  } catch (error) {
    console.error("❌ SMS sending error:", error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send SMS",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const sendBulkSMS = async (
  req: Request<{}, {}, SendBulkSMSRequest>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(STATUS.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const { recipients, message } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    res.status(STATUS.BAD_REQUEST).json({
      success: false,
      message: "Recipients must be a non-empty array",
    });
    return;
  }

  try {
    const { results, failed } = await sendBulkSMSMessages(recipients, message);

    res.status(STATUS.OK).json({
      success: true,
      message: `Bulk SMS sent to ${results.length} users, ${failed.length} failed`,
      results,
      errors: failed,
    });
  } catch (error) {
    console.error("❌ Bulk SMS sending error:", error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send bulk SMS",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
