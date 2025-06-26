import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import type { Status, LogisticsStatus } from '../marketplace/types';
import { logisticsSteps } from '../marketplace/types';

const statusColors: Record<Status, string> = {
  Completed: "text-green-600",
  "In Progress": "text-yellow-600",
  Pending: "text-red-600",
} as const;

interface AdminLogisticsInlineProps {
  productId: string;
}

const AdminLogisticsInline = ({ productId }: AdminLogisticsInlineProps) => {
  const { toast } = useToast();
  const authContext = useAuth();
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
      const updatedLogistics = await logisticsService.updateLogisticsStep(productId, stepKey, { status: newStatus, completed: newStatus === 'Completed', timestamp: new Date().toISOString() });
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
    fetchLogisticsStatus();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!status) {
    return <div className="text-red-600">No logistics status available</div>;
  }

  return (
    <div className="space-y-4 bg-white p-4 rounded shadow">
      <h3 className={`text-lg font-semibold ${
        status.status[status.currentStep as keyof typeof status.status]
          ? statusColors[status.status[status.currentStep as keyof typeof status.status].status]
          : ''
      }`}>
        Current Status
      </h3>
      <div className="space-y-3">
        {logisticsSteps.filter(step => step.title !== 'tracking').map((step) => {
          const stepStatus = status.status[step.title.toLowerCase() as keyof typeof status.status];
          if (!stepStatus) return null;
          return (
            <div key={step.title} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div>{step.icon}</div>
                <div className="font-medium text-gray-900">{step.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="border border-gray-300 rounded px-2 py-1"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLogisticsInline;
