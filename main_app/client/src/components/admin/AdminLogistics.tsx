import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, Clock, AlertCircle, Settings, Sparkles, Save } from "lucide-react";
import { getLogisticsService } from "../../services/logisticsService";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import type { Status, LogisticsStatus } from '../../types/types';
import { logisticsSteps } from '../../types/types';

const statusColors: Record<Status, string> = {
  Completed: "text-emerald-600",
  "In Progress": "text-amber-600",
  Pending: "text-slate-500",
};

const statusBgColors: Record<Status, string> = {
  Completed: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
  "In Progress": "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
  Pending: "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200",
};

const statusOptions: Status[] = ['Pending', 'In Progress', 'Completed'];

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
        const data = await logisticsService.getLogisticsStatus(productId);
        setStatus(data);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
          await logisticsService.initializeLogistics(productId);
          const data = await logisticsService.getLogisticsStatus(productId);
          setStatus(data);
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
    if (!productId || !authContext) return;

    const logisticsService = getLogisticsService(authContext);
    fetchLogisticsStatus();

    const handleLogisticsUpdate = (data: any) => {
      setStatus(data);
      toast({
        title: "Update Received",
        description: "Logistics status has been updated",
        variant: "default",
      });
    };

    logisticsService.subscribeToLogistics(productId, handleLogisticsUpdate);

    return () => {
      logisticsService.unsubscribeFromLogistics(productId);
    };
  }, [productId, authContext]);

  const getProgressPercentage = () => {
    if (!status) return 0;
    const completedSteps = Object.values(status.status).filter(step => step.status === 'Completed').length;
    return (completedSteps / Object.keys(status.status).length) * 100;
  };

  if (!authContext?.user?.role || authContext.user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-red-600">Only admin users can access this page</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <div className="absolute inset-0 h-10 w-10 rounded-full bg-indigo-200 animate-ping opacity-20"></div>
          </div>
          <p className="text-indigo-600 font-medium">Loading admin dashboard...</p>
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
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Status Available</h3>
          <p className="text-red-600">Failed to fetch logistics status. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const progressPercentage = getProgressPercentage();

  return (
    <AdminLayout 
      title="Logistics Management" 
      subtitle={`Product #${productId} - ${Math.round(progressPercentage)}% Complete`}
    >
      {status && (
        <div className="space-y-8">
          {/* Admin Progress Overview */}
          <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-indigo-100/50 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Settings className="w-6 h-6 text-indigo-600" />
                  Admin Control Panel
                </h2>
                <p className="text-gray-600 mt-1">Manage and update logistics status</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-md">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                  Product #{productId}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Admin Logistics Controls */}
          <div className="grid gap-6">
            {logisticsSteps
              .filter((step) => step.title !== 'tracking')
              .map((step, index) => {
                const stepStatus = status.status[step.title.toLowerCase() as keyof typeof status.status];
                if (!stepStatus) return null;

                const isUpdating = updatingStep === step.title;
                const isCompleted = stepStatus.status === 'Completed';
                const isActive = stepStatus.status === 'In Progress';

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                      statusBgColors[stepStatus.status]
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
                    
                    <div className="relative p-6">
                      <div className="flex items-start gap-6">
                        {/* Step Icon */}
                        <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-200' 
                            : isActive 
                            ? 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-amber-200' 
                            : 'bg-gradient-to-br from-slate-200 to-gray-300 shadow-slate-200'
                        }`}>
                          <div className={`${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-slate-600'}`}>
                            {step.icon}
                          </div>
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-xl font-bold ${statusColors[stepStatus.status]}`}>
                              {step.title}
                            </h3>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 shadow-md">
                              {stepStatus.status === 'Completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                              {stepStatus.status === 'In Progress' && <Clock className="w-4 h-4 text-amber-500" />}
                              {stepStatus.status === 'Pending' && <AlertCircle className="w-4 h-4 text-slate-400" />}
                              <span className={`text-sm font-semibold ${statusColors[stepStatus.status]}`}>
                                {stepStatus.status}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          
                          {/* Admin Controls */}
                          <div className="bg-white/60 rounded-xl p-4 border border-white/40 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                              <label className="text-sm font-semibold text-gray-700 min-w-[80px]">
                                Update Status:
                              </label>
                              <div className="flex items-center gap-3 flex-1">
                                <select
                                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                                  value={stepStatus.status}
                                  disabled={isUpdating}
                                  onChange={(e) => handleStatusChange(step.title, e.target.value as Status)}
                                >
                                  {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                
                                {isUpdating ? (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-indigo-100 rounded-lg">
                                    <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                                    <span className="text-sm text-indigo-600 font-medium">Updating...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
                                    <Save className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-medium">Saved</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-lg">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">
                                Last Updated: {new Date(stepStatus.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {isActive && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-lg animate-pulse">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                                <span className="text-amber-700 font-medium">Currently Active</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step Connector Line */}
                    {index < logisticsSteps.filter(s => s.title !== 'tracking').length - 1 && (
                      <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Admin Summary Card */}
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-200 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Management Summary
              </h3>
              <p className="text-gray-600">
                You have full control over the logistics pipeline. 
                {progressPercentage === 100 
                  ? " 🎉 All steps completed successfully!" 
                  : ` Currently managing ${Math.round(progressPercentage)}% completion rate.`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLogistics;