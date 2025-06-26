// controllers/subsidyController.ts
import { Request, Response } from 'express';
import statusCode from '../utils/statusCode';
import {
    applySubsidyService,
    updateSubsidyStatusService,
    getFarmerSubsidiesService,
    getAllSubsidiesService,
} from '../services/subsidyService';

export const applySubsidy = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(statusCode.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }

        const subsidy = await applySubsidyService(req.user._id, req.body);
        res.status(statusCode.CREATED).json({ message: 'Subsidy applied successfully', subsidy });
    } catch (error) {
        console.error('Error applying subsidy:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Error applying subsidy',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateSubsidyStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(statusCode.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }

        const updated = await updateSubsidyStatusService(req.params.id, req.body.status);

        if (!updated) {
            res.status(statusCode.NOT_FOUND).json({ message: 'Subsidy not found' });
            return;
        }

        res.status(statusCode.OK).json({ message: `Subsidy ${req.body.status}`, updated });
    } catch (error) {
        console.error('Error updating subsidy status:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Error updating status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getFarmerSubsidies = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(statusCode.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }

        const subsidies = await getFarmerSubsidiesService(req.user._id);
        res.status(statusCode.OK).json(subsidies);
    } catch (error) {
        console.error('Error fetching subsidies:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching subsidies',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getAllSubsidies = async (_req: Request, res: Response): Promise<void> => {
    try {
        const subsidies = await getAllSubsidiesService();
        res.status(statusCode.OK).json(subsidies);
    } catch (error) {
        console.error('Error fetching all subsidies:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching all subsidies',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
