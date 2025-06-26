// controllers/supportController.ts
import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { handleSupportMessage } from '../services/supportService';
import statusCode from '../utils/statusCode';

interface SupportMessageRequest {
    phoneNumber: string;
    supportMessage: string;
}

export const sendSupportMessage = async (
    req: Request<{}, {}, SupportMessageRequest>,
    res: Response
): Promise<void> => {
    try {
        const { phoneNumber, supportMessage } = req.body;
        await handleSupportMessage(phoneNumber, supportMessage);

        res.status(statusCode.OK).json({
            message: 'Support request sent via WhatsApp',
        });
    } catch (error) {
        console.error('Support message error:', error);

        if (error instanceof AxiosError && error.response?.data) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to send support message via WhatsApp API',
                details: error.response.data,
            });
        } else if (error instanceof Error && error.message.includes('required')) {
            res.status(statusCode.BAD_REQUEST).json({ message: error.message });
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to send support message',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
};
