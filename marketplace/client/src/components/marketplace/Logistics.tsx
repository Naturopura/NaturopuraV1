import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import type { Status, LogisticsStatus } from "../../types/types";
import { logisticsSteps } from "../../types/types";

const statusBgColors: Record<Status, string> = {
  Completed: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
  "In Progress": "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
  Pending: "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200",
};

const statusIcons: Record<Status, React.ReactNode> = {
  Completed: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  "In Progress": <Clock className="w-5 h-5 text-amber-500" />,
  Pending: <AlertCircle className="w-5 h-5 text-slate-400" />,
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
      setStatus(response);
    } catch (err) {
      console.error("Error fetching logistics status:", err);
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
    if (!productId || !authContext) return;

    const logisticsService = getLogisticsService(authContext);

    // Ensure socket connection is established and wait for it to be ready
    if (!logisticsService.getSocket()) {
      logisticsService.connect();
    }

    // Wait for socket to be ready
    const socket = logisticsService.getSocket();
    if (socket) {
      socket.on("connect", () => {
        fetchLogisticsStatus();
      });
    } else {
      console.warn("Socket not available");
    }

    fetchLogisticsStatus();
  }, [productId, authContext]);

  useEffect(() => {
    if (!productId) return;

    // Subscribe to updates
    const id = productId as string;
    const logisticsService = getLogisticsService(authContext);

    const handleLogisticsUpdate = (data: any) => {
      setStatus(data);
      toast({
        title: "Logistics Update",
        description: `Logistics status has been updated for product ${id}`,
        variant: "default",
      });
    };

    logisticsService.subscribeToLogistics(id, handleLogisticsUpdate);

    return () => {
      // Cleanup subscription
      logisticsService.unsubscribeFromLogistics(id);
    };
  }, [productId, authContext]);

  const getProgressPercentage = () => {
    if (!status) return 0;
    const completedSteps = Object.values(status.status).filter(
      (step) => step.status === "Completed"
    ).length;
    return (completedSteps / Object.keys(status.status).length) * 100;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <div className="absolute inset-0 h-10 w-10 rounded-full bg-indigo-200 animate-ping opacity-20"></div>
          </div>
          <p className="text-indigo-600 font-medium">
            Loading logistics information...
          </p>
        </div>
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Product ID Required
          </h3>
          <p className="text-red-600">
            Product ID is required to view logistics status
          </p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Status
          </h3>
          <p className="text-red-600">
            Failed to fetch logistics status. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const progressPercentage = getProgressPercentage();

  return (
    <>
      {status && (
        <div className="space-y-8">
          {/* Progress Overview Card */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-100/50 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Product Delivery Progress
                </h2>
                <p className="text-gray-600 mt-1">Your product is on its way</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-md">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Logistics Steps */}
          <div className="grid gap-6">
            {logisticsSteps.map((step, index) => {
              const stepData =
                status.status[step.title as keyof typeof status.status];
              const isActive = stepData?.status === "In Progress";
              const isCompleted = stepData?.status === "Completed";

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    statusBgColors[stepData?.status || "Pending"]
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent"></div>
                  </div>

                  {/* Active Step Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-300/10 to-yellow-400/10 animate-pulse"></div>
                  )}

                  <div className="relative p-6 flex items-start gap-6">
                    {/* Step Icon */}
                    <div
                      className={`relative flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-200"
                          : isActive
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-amber-200 animate-pulse"
                          : "bg-gradient-to-br from-slate-200 to-gray-300 shadow-slate-200"
                      }`}
                    >
                      <div
                        className={`${
                          isCompleted
                            ? "text-white"
                            : isActive
                            ? "text-white"
                            : "text-slate-600"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-xl font-bold ${
                            statusBgColors[stepData?.status || "Pending"]
                          }`}
                        >
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 shadow-md">
                          {statusIcons[stepData?.status || "Pending"]}
                          <span
                            className={`text-sm font-semibold ${
                              statusBgColors[stepData?.status || "Pending"]
                            }`}
                          >
                            {stepData?.status || "Pending"}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {stepData?.timestamp
                              ? new Date(stepData.timestamp).toLocaleString()
                              : "Not started"}
                          </span>
                        </div>
                        {isActive && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-lg animate-pulse">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                            <span className="text-amber-700 font-medium">
                              In Progress
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step Connector Line */}
                  {index < logisticsSteps.length - 1 && (
                    <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tracking Summary
              </h3>
              <p className="text-gray-600">
                Your product is being carefully monitored throughout its
                journey.
                {progressPercentage === 100
                  ? " 🎉 Delivery completed!"
                  : ` Currently ${Math.round(progressPercentage)}% complete.`}
              </p>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default Logistics;
