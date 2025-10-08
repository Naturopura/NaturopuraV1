 import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import type { LogisticsStatus, Status } from '../../types/types';
import { logisticsSteps } from '../../types/types';

const statusColors: Record<Status, string> = {
  Completed: "text-emerald-600",
  "In Progress": "text-amber-600",
  Pending: "text-slate-500",
};

const FarmerLogistics = () => {
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
      const data = await logisticsService.getLogisticsStatus(productId);
      setStatus(data);
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
    fetchLogisticsStatus();
  }, [productId, authContext]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-indigo-600 font-medium ml-4">Loading logistics status...</p>
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Product ID Required</h3>
          <p className="text-red-600">Product ID is required to view logistics status</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Status Available</h3>
          <p className="text-red-600">Failed to fetch logistics status. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Logistics Status for Product #{productId}</h2>
      <div className="space-y-6">
        {logisticsSteps.filter(step => step.title !== 'tracking').map((step) => {
          const stepStatus = status.status[step.title.toLowerCase() as keyof typeof status.status];
          if (!stepStatus) return null;
          return (
            <div key={step.title} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-indigo-600">{step.icon}</div>
                <div>
                  <h3 className={`text-lg font-semibold ${statusColors[stepStatus.status]}`}>{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stepStatus.status === 'Completed' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                {stepStatus.status === 'In Progress' && <Clock className="w-6 h-6 text-amber-500" />}
                {stepStatus.status === 'Pending' && <AlertCircle className="w-6 h-6 text-slate-400" />}
                <span className={`text-sm font-semibold ${statusColors[stepStatus.status]}`}>
                  {stepStatus.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerLogistics;
