import * as logisticsDao from '../dao/logisticsStatusDao';
import * as productDao from '../dao/productDao';
import { StepStatus } from '../models/LogisticsStatus';
import { updateLogisticsStatus } from './socketService';

import mongoose from 'mongoose';

export const getLogisticsStatus = async (productId: string) => {
  try {
    const status = await logisticsDao.findLogisticsStatusByProductId(productId);
    if (!status) {
      // If status doesn't exist, initialize it
      await initializeLogistics(productId);
      return await logisticsDao.findLogisticsStatusByProductId(productId);
    }
    return status;
  } catch (error) {
    console.error('Error getting logistics status:', error);
    throw error;
  }
};

export const initializeLogisticsForAllProducts = async () => {
  try {
    const products = await productDao.findAllProducts();
    const purchasedProducts = products.filter(p => p.status === 'purchased');
    for (const product of purchasedProducts) {
      await initializeLogistics(product._id.toString());
    }
    return purchasedProducts.length;
  } catch (error) {
    console.error('Error initializing logistics for all products:', error);
    throw error;
  }
};

export const initializeLogistics = async (productId: string) => {
  try {
    // Convert string productId to ObjectId
    const objectId = new mongoose.Types.ObjectId(productId);
    
    const logistics = await logisticsDao.createLogisticsStatus({
      productId: objectId,
      currentStep: 'collection',
      status: {
        collection: { completed: false, status: 'Pending' },
        transportation: { completed: false, status: 'Pending' },
        storage: { completed: false, status: 'Pending' },
        packaging: { completed: false, status: 'Pending' },
        delivery: { completed: false, status: 'Pending' }
      }
    });

    updateLogisticsStatus(productId, logistics);
    return logistics;
  } catch (error) {
    console.error('Error initializing logistics:', error);
    throw error;
  }
};

export const updateLogisticsStep = async (productId: string, step: 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery', stepData: Partial<StepStatus>) => {
  try {
    // First find the logistics status
    const logistics = await logisticsDao.findLogisticsStatusByProductId(productId);
    if (!logistics) {
      throw new Error('Logistics status not found for this product');
    }

    // Update the specific step status
    const currentStatus = logistics.status[step];
    const newStatus = {
      ...currentStatus,
      ...stepData
    };

    // Update completed status based on the status enum
    if (stepData.status) {
      newStatus.completed = stepData.status === 'Completed';
    }

    logistics.status[step] = newStatus;

    // Update the current step based on completion status
    if (stepData.completed !== undefined) {
      const steps = ['collection', 'transportation', 'storage', 'packaging', 'delivery'];
      const currentStepIndex = steps.indexOf(step);
      
      // If step is completed and not the last step, move to next step
      if (stepData.completed && currentStepIndex < steps.length - 1) {
        logistics.currentStep = steps[currentStepIndex + 1] as 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery';
      }
      // If step is uncompleted and not the first step, move back to previous step
      else if (!stepData.completed && currentStepIndex > 0) {
        logistics.currentStep = steps[currentStepIndex - 1] as 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery';
      }
    }

    // Save the updated status
    await logistics.save();

    // Update socket
    updateLogisticsStatus(productId, logistics);
    return logistics;
  } catch (error) {
    console.error('Error updating logistics status:', error);
    throw error;
  }
};
