// services/smsService.ts
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;



if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  process.exit(1);
}

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const formatPhoneNumber = (number: string): string => {
  // Remove all non-digit characters except +
  const cleanNumber = number.replace(/[^0-9+]/g, "");
  
  // If it already starts with +, return as is (already formatted)
  if (cleanNumber.startsWith("+")) {
    return cleanNumber;
  }
  
  // Remove + if present and get only digits
  const digitsOnly = cleanNumber.replace(/[^0-9]/g, "");
  
  // Check if it's already a full international number starting with 91
  if (digitsOnly.startsWith("91") && digitsOnly.length === 12) {
    return `+${digitsOnly}`;
  }
  
  // If it's a 10-digit Indian number, add +91
  if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
    return `+91${digitsOnly}`;
  }
  
  // If it's 11 digits starting with 0, remove the 0 and add +91
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return `+91${digitsOnly.substring(1)}`;
  }
  
  // Default case: assume it's a 10-digit number and add +91
  return `+91${digitsOnly}`;
};

export const sendSingleSMS = async (to: string, message: string) => {
  try {
    const formattedNumber = formatPhoneNumber(to);
    
    const smsResponse = await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });
    
    console.log(`SMS sent successfully! SID: ${smsResponse.sid}`);
    console.log(`Message status: ${smsResponse.status}`);
    console.log(`Full Twilio response:`, JSON.stringify(smsResponse, null, 2));
    
    return {
      to: formattedNumber,
      sid: smsResponse.sid,
      success: true,
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    console.error('Error details:', {
      code: (error as any).code,
      message: (error as any).message,
      status: (error as any).status,
      moreInfo: (error as any).moreInfo
    });
    throw error;
  }
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
