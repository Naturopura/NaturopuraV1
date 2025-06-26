import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, BadgeCheck, IndianRupee, ShoppingBag, TrendingUp, Activity, ArrowRight, Sparkles, Shield, Package2} from 'lucide-react';
import { createApiClient, ENDPOINTS } from '../../config/api';
import AdminLayout from '../layouts/AdminLayout';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalFarmers: number;
  totalLoans: number;
  totalLoanAmount: number;
  totalProducts: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    totalLoans: 0,
    totalLoanAmount: 0,
    totalProducts: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.GET_DASHBOARD_STATS);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const statsCards = [
    {
      title: "Total Farmers",
      value: stats.totalFarmers,
      icon: Users,
      link: "/admin/farmers",
      description: "Active platform users",
      gradient: "from-emerald-500 to-teal-600",
      bgAccent: "bg-emerald-100",
      accent: "text-emerald-600",
    },
    {
      title: "Products Listed",
      value: stats.totalProducts,
      icon: ShoppingBag,
      link: "/admin/marketplace",
      description: "In marketplace",
      gradient: "from-teal-500 to-emerald-600",
      bgAccent: "bg-teal-100",
      accent: "text-teal-600",
    },
    {
      title: "Total Loan Value",
      value: formatCurrency(stats.totalLoanAmount),
      icon: IndianRupee,
      link: "/admin/loans",
      description: `${stats.totalLoans} loans processed`,
      gradient: "from-emerald-600 to-green-600",
      bgAccent: "bg-emerald-100",
      accent: "text-emerald-700",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingLoans,
      icon: BadgeCheck,
      link: "/admin/loans/pending",
      description: "Awaiting review",
      gradient: "from-teal-600 to-emerald-700",
      bgAccent: "bg-teal-100",
      accent: "text-teal-700",
    },
  ];

  // Loading state with shimmer effect
  if (isLoading) {
    return (
      <AdminLayout title="Admin Dashboard" subtitle="Overview">
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Loading Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden animate-pulse">
              <div className="bg-gradient-to-r from-emerald-200 to-teal-200 h-64"></div>
            </div>
            
            {/* Loading Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-emerald-100 p-6 animate-pulse">
                  <div className="h-4 bg-emerald-200 rounded mb-4"></div>
                  <div className="h-8 bg-emerald-100 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Loading Chart */}
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 animate-pulse">
              <div className="h-6 bg-emerald-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 bg-emerald-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 sm:p-10 md:p-12 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Shield className="h-12 w-12" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      Welcome back, Admin!
                    </h2>
                    <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                  </div>
                  <p className="text-xl sm:text-2xl font-medium opacity-90">
                    Platform Overview
                  </p>
                </div>
              </div>
              
              <p className="opacity-95 text-lg sm:text-xl max-w-3xl mb-8 leading-relaxed">
                Manage farmers, monitor loans, and oversee the agricultural marketplace from your central dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admin/reports">
                  <Button 
                    size="lg" 
                    className="font-semibold text-lg px-8 py-4 bg-white text-emerald-700 hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View Reports
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/admin/farmers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-lg px-8 py-4 bg-white/10 text-white border-white/40 hover:bg-white/20 rounded-full backdrop-blur-sm"
                  >
                    Manage Farmers
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {statsCards.map((stat) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link to={stat.link} className="block group">
                      <Card className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                          <CardTitle className="text-sm font-semibold text-gray-700">
                            {stat.title}
                          </CardTitle>
                          <div className={`bg-gradient-to-r ${stat.gradient} p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-shadow`}>
                            <stat.icon className="h-6 w-6 text-white" />
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                            {stat.value}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`${stat.bgAccent} p-1 rounded-full`}>
                              <TrendingUp className={`h-3 w-3 ${stat.accent}`} />
                            </div>
                            <span className="font-medium text-gray-600">{stat.description}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-white shadow-xl rounded-2xl border border-emerald-100 p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-r ${stat.gradient} p-2 rounded-xl`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{stat.title}</h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {stat.description}. Click to access detailed management and analytics for {stat.title.toLowerCase()}.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Loan Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white border border-emerald-100 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Loan Application Status</CardTitle>
                    <p className="text-gray-600">Overview of all loan applications</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Approved Loans */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-xl">
                          <BadgeCheck className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-emerald-700">Approved</span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({Math.round((stats.approvedLoans / stats.totalLoans * 100) || 0)}%)
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-emerald-700">{stats.approvedLoans}</span>
                    </div>
                    <div className="h-4 bg-emerald-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.approvedLoans / stats.totalLoans * 100) || 0}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Pending Loans */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-teal-100 p-2 rounded-xl">
                          <Activity className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-teal-700">Pending</span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({Math.round((stats.pendingLoans / stats.totalLoans * 100) || 0)}%)
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-teal-700">{stats.pendingLoans}</span>
                    </div>
                    <div className="h-4 bg-teal-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.pendingLoans / stats.totalLoans * 100) || 0}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Rejected Loans */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-xl">
                          <Package2 className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-red-700">Rejected</span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({Math.round((stats.rejectedLoans / stats.totalLoans * 100) || 0)}%)
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-red-700">{stats.rejectedLoans}</span>
                    </div>
                    <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.rejectedLoans / stats.totalLoans * 100) || 0}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link to="/admin/farmers" className="group">
              <Card className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group-hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Farmers</h3>
                      <p className="text-gray-600 text-sm">View and manage farmer accounts</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/loans" className="group">
              <Card className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group-hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-4 rounded-2xl">
                      <IndianRupee className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Loan Management</h3>
                      <p className="text-gray-600 text-sm">Review and approve loan applications</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/marketplace" className="group">
              <Card className="bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group-hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-2xl">
                      <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Marketplace</h3>
                      <p className="text-gray-600 text-sm">Monitor product listings and sales</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;