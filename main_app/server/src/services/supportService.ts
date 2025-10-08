// services/supportService.ts
import sendWhatsAppMessage from '../utils/sendWhatsAppMessage';

export const handleSupportMessage = async (
    phoneNumber: string,
    supportMessage: string
): Promise<void> => {
    if (!phoneNumber || !supportMessage) {
        throw new Error('Phone number and support message are required');
    }

    // Sanitize phone number
    const cleanedPhoneNumber = phoneNumber.startsWith('+')
        ? phoneNumber.substring(1)
        : phoneNumber;

    const message = `🛠 Support Request:\n\n${supportMessage}\n\nWe'll get back to you soon.`;

    await sendWhatsAppMessage(cleanedPhoneNumber, message);
};
