import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import FarmerLayout from "../layouts/FarmerLayout";
import type { Status, LogisticsStatus } from './types';
import { logisticsSteps } from './types';

const statusColors: Record<Status, string> = {
  Completed: "text-green-600",
  "In Progress": "text-yellow-600",
  Pending: "text-red-600",
};

const Logistics = () => {
  const { toast } = useToast();
  const authContext = useAuth();
  const { productId } = useParams();
  const [status, setStatus] = useState<LogisticsStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogisticsStatus = async () => {
    if (!productId || !authContext) return;
    try {
      setLoading(true);
      const logisticsService = getLogisticsService(authContext);
      const response = await logisticsService.getLogisticsStatus(productId);
      setStatus(response.data);
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
    <FarmerLayout title="Logistics Tracking" subtitle="Track your product's journey">
      {status && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${statusColors[status.status[status.currentStep as keyof typeof status.status].status]}`}>
              Current Status
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            {logisticsSteps.map((step, index) => {
              const stepData = status.status[step.title as keyof typeof status.status];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 transition-transform duration-300 hover:scale-[1.01] group"
                >
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 shadow-md animate-pulse group-hover:animate-none">
                    <div className="text-emerald-800">{step.icon}</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className={`text-lg font-semibold ${statusColors[stepData?.status]}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    <p className="text-sm font-medium text-gray-700">
                      Status: {stepData?.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Updated: {stepData?.timestamp ? new Date(stepData.timestamp).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};

export default Logistics;
