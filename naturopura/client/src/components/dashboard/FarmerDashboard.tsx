import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import FarmerLayout from "../layouts/FarmerLayout";
import {
  IndianRupee,
  Calendar,
  Activity,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Leaf,
  Sparkles,
  Star,
  Award,
  Target,
  Package2,
} from "lucide-react";
import { motion } from "framer-motion";

const FarmerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Loans",
      value: "3",
      icon: CreditCard,
      link: "/farmer/loans/history",
      description: "All time loans",
      trend: "+2 this year",
      gradient: "from-emerald-500 to-teal-600",
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-100",
    },
    {
      title: "Active Loans", 
      value: "1",
      icon: Activity,
      description: "Currently active",
      trend: "On schedule",
      gradient: "from-teal-500 to-emerald-600",
      accent: "text-teal-600",
      bgAccent: "bg-teal-100",
    },
    {
      title: "Total Amount",
      value: "₹75,000",
      icon: IndianRupee,
      description: "Total borrowed",
      trend: "₹25,000 available",
      gradient: "from-emerald-600 to-green-600",
      accent: "text-emerald-700",
      bgAccent: "bg-emerald-100",
    },
    {
      title: "Next Payment",
      value: "₹5,000", 
      icon: Calendar,
      description: "Due in 7 days",
      trend: "Auto-pay enabled",
      gradient: "from-teal-600 to-emerald-700",
      accent: "text-teal-700",
      bgAccent: "bg-teal-100",
    },
  ];

  const quickActions = [
    {
      title: "Apply for New Loan",
      description: "Get instant approval for agricultural loans",
      icon: CreditCard,
      link: "/farmer/loans/apply",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "View Loan History", 
      description: "Track all your loan applications and payments",
      icon: Activity,
      link: "/farmer/loans/history",
      gradient: "from-teal-500 to-emerald-600",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: "Payment Calculator",
      description: "Calculate EMI and plan your finances",
      icon: Target,
      link: "/farmer/calculator",
      gradient: "from-emerald-600 to-green-600", 
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
    },
  ];

  const recentActivities = [
    {
      title: "Loan Application Approved",
      description: "Crop Enhancement Loan - ₹25,000",
      icon: Award,
      time: "2 days ago",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Payment Processed",
      description: "₹5,000 EMI payment successful",
      icon: IndianRupee,
      time: "4 days ago", 
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: "Credit Score Updated",
      description: "Your score improved to 750",
      icon: Star,
      time: "1 week ago",
      iconBg: "bg-emerald-100", 
      iconColor: "text-emerald-700",
    },
  ];

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

  return (
    <FarmerLayout
      title="Dashboard"
      subtitle={`Welcome back, ${user?.name || "Farmer"}`}
    >
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
                  <Leaf className="h-12 w-12" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      Welcome back!
                    </h2>
                    <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                  </div>
                  <p className="text-xl sm:text-2xl font-medium opacity-90">
                    {user?.name || "Farmer"}
                  </p>
                </div>
              </div>
              
              <p className="opacity-95 text-lg sm:text-xl max-w-3xl mb-8 leading-relaxed">
                Your agricultural financing hub - manage loans, track payments, and grow your farming business with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/farmer/loans/apply">
                  <Button 
                    size="lg" 
                    className="font-semibold text-lg px-8 py-4 bg-white text-emerald-700 hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Apply for Loan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-lg px-8 py-4 bg-white/10 text-white border-white/40 hover:bg-white/20 rounded-full backdrop-blur-sm"
                >
                  View Analytics
                </Button>
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
            {stats.map((stat) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link to={stat.link ?? "#"} className="block group">
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
                            <span className="font-medium text-gray-600">{stat.trend}</span>
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
                        {stat.description}. Click to access detailed analytics and manage your {stat.title.toLowerCase()}.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white border border-emerald-100 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
                      <CardDescription className="text-gray-600">
                        Fast access to key features
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  {quickActions.map((action, i) => (
                    <Link
                      key={i}
                      to={action.link}
                      className="group block"
                    >
                      <div className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${action.gradient} text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}>
                        <div className={`${action.iconBg} p-3 rounded-xl shadow-sm`}>
                          <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                          <p className="text-white/90 text-sm">{action.description}</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white border border-emerald-100 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-3 rounded-xl">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
                      <CardDescription className="text-gray-600">
                        Your latest updates and achievements
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {recentActivities.map((activity, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 group"
                    >
                      <div className={`${activity.iconBg} p-3 rounded-xl group-hover:shadow-md transition-shadow`}>
                        <activity.icon className={`h-6 w-6 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg mb-1">
                          {activity.title}
                        </p>
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500 font-medium">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full">
                  <Package2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
                  <p className="text-gray-600">Our support team is here to assist you</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full px-6">
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default FarmerDashboard;