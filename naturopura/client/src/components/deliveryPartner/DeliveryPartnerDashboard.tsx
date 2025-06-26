import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Home, User, LogOut, Bell, Truck, MapPin, Clock, TrendingUp, Award, Star, Menu, X } from 'lucide-react';

const DeliveryPartnerDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const navItems = [
    { path: 'purchased-products', label: 'Purchased Products', icon: Package },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname.includes(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isBaseDashboard = location.pathname === '/delivery-partner' || location.pathname === '/delivery-partner/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const DashboardHome = () => (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Welcome Section */}
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-violet-100 via-blue-100 to-cyan-100 rounded-3xl mb-4 sm:mb-6 shadow-2xl shadow-blue-200/40 ring-1 ring-white/20 backdrop-blur-sm">
          <Truck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Manage your delivery operations efficiently and track your performance with our comprehensive dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        <div className="group relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-blue-200/30 shadow-lg shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-300/40">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-1">24</h3>
            <p className="text-blue-600 text-xs sm:text-sm font-medium">Total Deliveries</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-200/30 shadow-lg shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-300/40">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 group-hover:text-teal-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-1">18</h3>
            <p className="text-emerald-600 text-xs sm:text-sm font-medium">On-Time Deliveries</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-200/30 shadow-lg shadow-amber-100/50 hover:shadow-2xl hover:shadow-amber-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-600 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-amber-300/40">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 group-hover:text-red-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent mb-1">156</h3>
            <p className="text-amber-600 text-xs sm:text-sm font-medium">Miles Covered</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200/30 shadow-lg shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-rose-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-300/40">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 group-hover:text-rose-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-700 to-rose-700 bg-clip-text text-transparent mb-1">4.8</h3>
            <p className="text-purple-600 text-xs sm:text-sm font-medium">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-10 border border-white/60 shadow-2xl shadow-blue-100/30 backdrop-blur-xl mx-4 sm:mx-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 to-purple-600/3"></div>
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <Link
              to="purchased-products"
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40 hover:border-blue-200/50 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl shadow-blue-300/40">
                  <Package className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
                    View Purchased Products
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Track and manage all purchased products with detailed insights
                  </p>
                </div>
              </div>
            </Link>

            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40 hover:border-emerald-200/50 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl shadow-emerald-300/40">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
                    Track Deliveries
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Monitor real-time delivery status with live tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-100/20 border border-white/60 mx-4 sm:mx-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/30"></div>
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 sm:mb-8">
            Performance Overview
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Recent Activity</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-xl sm:rounded-2xl border border-emerald-100/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-200/50">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">Delivery completed</p>
                    <p className="text-xs sm:text-sm text-gray-600">Order #12345 - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl sm:rounded-2xl border border-blue-100/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200/50">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">New order assigned</p>
                    <p className="text-xs sm:text-sm text-gray-600">Order #12346 - 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl sm:rounded-2xl border border-purple-100/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-200/50">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">5-star rating received</p>
                    <p className="text-xs sm:text-sm text-gray-600">From customer - 6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">This Week's Goals</h4>
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl sm:rounded-2xl border border-blue-100/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Deliveries Completed</span>
                    <span className="text-sm sm:text-base text-gray-600 font-medium">24/30</span>
                  </div>
                  <div className="w-full bg-gray-200/80 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-300/50" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50/50 to-green-50/50 rounded-xl sm:rounded-2xl border border-emerald-100/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">On-Time Rate</span>
                    <span className="text-sm sm:text-base text-gray-600 font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200/80 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-300/50" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl sm:rounded-2xl border border-purple-100/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Customer Rating</span>
                    <span className="text-sm sm:text-base text-gray-600 font-medium">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200/80 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-300/50" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 via-indigo-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-blue-100/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/40 ring-2 ring-white/20">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Delivery Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden lg:block">Manage your deliveries</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 sm:p-3 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl sm:rounded-2xl transition-all duration-200 group">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-200/50 animate-pulse"></span>
              </button>
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-100/50 border border-white/40">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 hidden lg:inline">Delivery Partner</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 sm:p-3 text-gray-600 hover:text-red-600 hover:bg-red-50/80 rounded-xl sm:rounded-2xl transition-all duration-200 group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className={`bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-2 sm:p-3 border border-white/40 shadow-xl shadow-blue-100/20 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden sm:block'}`}>
            <nav className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-2">
              <Link
                to="/delivery-partner"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  isBaseDashboard
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-200/50 scale-105'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-105'
                }`}
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Dashboard</span>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-200/50 scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] border border-white/40 shadow-2xl shadow-blue-100/20 min-h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-blue-50/20"></div>
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-10">
            {isBaseDashboard ? <DashboardHome /> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;