// services/smsService.ts
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;



if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  console.error("❌ Missing required Twilio configuration.");
  process.exit(1);
}

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const formatPhoneNumber = (number: string): string => {
  return number.startsWith("+") ? number : `+91${number.replace(/[^0-9]/g, "")}`;
};

export const sendSingleSMS = async (to: string, message: string) => {
  const formattedNumber = formatPhoneNumber(to);
  const smsResponse = await twilioClient.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to: formattedNumber,
  });
  return {
    to: formattedNumber,
    sid: smsResponse.sid,
    success: true,
  };
};

export const sendBulkSMSMessages = async (
  recipients: string[],
  message: string
) => {
  const results: Array<{ to: string; sid: string; success: boolean }> = [];
  const failed: Array<{ to: string; error: string; success: boolean }> = [];

  for (const recipient of recipients) {
    try {
      const result = await sendSingleSMS(recipient, message);
      results.push(result);
    } catch (error) {
      failed.push({
        to: recipient,
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      });
    }
  }

  return { results, failed };
};
