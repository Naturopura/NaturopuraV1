import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import type { Status, LogisticsStatus } from '../marketplace/types';
import { logisticsSteps } from '../marketplace/types';

const statusColors: Record<Status, string> = {
  Completed: "text-green-600",
  "In Progress": "text-yellow-600",
  Pending: "text-red-600",
};

const AdminLogistics = () => {
  const { toast } = useToast();
  const authContext = useAuth();
  const { productId } = useParams();
  const [status, setStatus] = useState<LogisticsStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState<string | null>(null);

  const fetchLogisticsStatus = async () => {
    if (!productId || !authContext) return;
    try {
      setLoading(true);
      const logisticsService = getLogisticsService(authContext);
      try {
        const response = await logisticsService.getLogisticsStatus(productId);
        setStatus(response.data);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
          await logisticsService.initializeLogistics(productId);
          const response = await logisticsService.getLogisticsStatus(productId);
          setStatus(response.data);
        } else {
          throw error;
        }
      }
    } catch (err) {
      console.error('Error fetching logistics status:', err);
      toast({
        title: "Error",
        description: "Failed to fetch logistics status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (stepTitle: string, newStatus: Status) => {
    if (!productId || !authContext) return;
    try {
      setUpdatingStep(stepTitle);
      const logisticsService = getLogisticsService(authContext);
      const stepKey = stepTitle.toLowerCase() as 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery';
      const updatedLogistics = await logisticsService.updateLogisticsStep(productId, stepKey, {
        status: newStatus,
        completed: newStatus === 'Completed',
        timestamp: new Date().toISOString(),
      });
      setStatus(updatedLogistics);
      toast({
        title: "Success",
        description: `Updated status for ${stepTitle} to ${newStatus}`,
        variant: "default",
      });
    } catch (err) {
      console.error('Error updating logistics status:', err);
      toast({
        title: "Error",
        description: `Failed to update status for ${stepTitle}`,
        variant: "destructive",
      });
    } finally {
      setUpdatingStep(null);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchLogisticsStatus();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-600">Product ID is required to view logistics status</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Logistics Tracking" subtitle="Track product logistics">
      {status && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${statusColors[status.status[status.currentStep as keyof typeof status.status]?.status] || ''}`}>
              Current Status
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            {logisticsSteps
              .filter((step) => step.title !== 'tracking')
              .map((step, index) => {
                const stepStatus = status.status[step.title.toLowerCase() as keyof typeof status.status];
                if (!stepStatus) return null;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 transition-all duration-300 hover:bg-gray-50 p-2 rounded-md"
                  >
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 animate-spin-slow group-hover:animate-none">
                      <div className="text-yellow-800">{step.icon}</div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className={`text-lg font-semibold ${statusColors[stepStatus.status]}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                      <div className="flex items-center gap-2">
                        <label htmlFor={`status-select-${index}`} className="font-medium text-gray-700">Status:</label>
                        <select
                          id={`status-select-${index}`}
                          className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-emerald-400 transition"
                          value={stepStatus.status}
                          disabled={updatingStep === step.title}
                          onChange={(e) => handleStatusChange(step.title, e.target.value as Status)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        {updatingStep === step.title && (
                          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Last Updated: {new Date(stepStatus.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLogistics;
