import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { createApiClient, ENDPOINTS } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { Loader2, AlertCircle, FileClock, CheckCircle2, ScrollText, Filter, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Loan {
  _id: string;
  amount: number;
  purpose: string;
  term: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  appliedDate: string;
  cropType: string;
  collateral: string;
  landSize?: number;
  farmDetails?: string;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}

const LoanHistory = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'approved' | 'rejected' | 'pending'>('all');

  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const apiClient = createApiClient(token);
        const response = await apiClient.get(ENDPOINTS.GET_FARMER_LOANS);
        const loansData = response.data.data || [];
        setLoans(loansData);
        setFilteredLoans(loansData);

        // Calculate statistics
        const approved = loansData.filter((loan: Loan) => loan.status === 'approved').length;
        const rejected = loansData.filter((loan: Loan) => loan.status === 'rejected').length;
        const pending = loansData.filter((loan: Loan) => loan.status === 'pending').length;
        const total = loansData.reduce((sum: number, loan: Loan) => sum + loan.amount, 0);

        setApprovedCount(approved);
        setRejectedCount(rejected);
        setPendingCount(pending);
        setTotalAmount(total);
      } catch (err: unknown) {
        const error = err as ApiError;
        console.error('Error fetching loans:', error);
        setError(error.response?.data?.message || 'Failed to fetch loan history');
        if (error.response?.status === 401) {
          setTimeout(() => navigate('/login'), 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, [navigate]);

  const getStatusBadge = (status: Loan['status']) => {
    const baseClass = 'rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 w-fit';
    switch (status.toLowerCase()) {
      case 'approved':
        return (
          <Badge className={`${baseClass} bg-emerald-400 text-emerald-800 border border-emerald-200`}>
            <CheckCircle2 size={12} className="text-emerald-800" /> Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className={`${baseClass} bg-amber-400 text-amber-800 border border-amber-200`}>
            <FileClock size={12} className="text-amber-800" /> Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className={`${baseClass} bg-rose-300 text-rose-800 border border-rose-200`}>
            <AlertCircle size={12} className="text-rose-800" /> Rejected
          </Badge>
        );
      case 'completed':
        return (
          <Badge className={`${baseClass} bg-blue-100 text-blue-800 border border-blue-200`}>
            <ScrollText size={12} className="text-blue-800" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge className={`${baseClass} bg-gray-50 text-gray-700 border border-gray-200`}>
            {status}
          </Badge>
        );
    }
  };

  const filterLoans = (status: 'all' | 'approved' | 'rejected' | 'pending') => {
    setActiveFilter(status);
    if (status === 'all') {
      setFilteredLoans(loans);
    } else {
      setFilteredLoans(loans.filter((loan: Loan) => loan.status === status));
    }
  };

  const statCards = [
    {
      title: 'Total Amount',
      value: `₹${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-white',
      onClick: () => filterLoans('all')
    },
    {
      title: 'Approved',
      value: approvedCount.toString(),
      icon: CheckCircle2,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      onClick: () => filterLoans('approved')
    },
    {
      title: 'Pending',
      value: pendingCount.toString(),
      icon: FileClock,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      textColor: 'text-white',
      onClick: () => filterLoans('pending')
    },
    {
      title: 'Rejected',
      value: rejectedCount.toString(),
      icon: AlertCircle,
      color: 'bg-gradient-to-br from-rose-500 to-rose-600',
      textColor: 'text-white',
      onClick: () => filterLoans('rejected')
    }
  ];

  const LoanCard = ({ loan }: { loan: Loan }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium text-gray-600">
            {new Date(loan.appliedDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        {getStatusBadge(loan.status)}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">₹{loan.amount.toLocaleString()}</span>
          <span className="text-sm text-gray-500 capitalize">{loan.term}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Purpose:</span>
            <p className="font-medium capitalize text-gray-900">{loan.purpose}</p>
          </div>
          <div>
            <span className="text-gray-500">Crop:</span>
            <p className="font-medium capitalize text-gray-900">{loan.cropType}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FarmerLayout title="Loan History" subtitle="Track your loan applications and status">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={card.onClick}
              className={`${card.color} ${card.textColor} rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <card.icon size={20} className="opacity-80" />
                <TrendingUp size={16} className="opacity-60" />
              </div>
              <div>
                <p className="text-sm opacity-90 font-medium">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {['all', 'approved', 'pending', 'rejected'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => filterLoans(filter as any)}
              className={`capitalize transition-all duration-200 ${
                activeFilter === filter 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Filter size={14} className="mr-1" />
              {filter === 'all' ? 'All Loans' : filter}
            </Button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center">
                <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
                <p className="text-gray-600">Loading your loan history...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle size={24} />
                <div>
                  <h3 className="font-semibold">Error Loading Data</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          ) : filteredLoans.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ScrollText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-600">
                {activeFilter === 'all' 
                  ? "You haven't applied for any loans yet." 
                  : `No ${activeFilter} loans found.`}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Mobile View - Cards */}
              <div className="block lg:hidden space-y-4">
                {filteredLoans.map((loan) => (
                  <LoanCard key={loan._id} loan={loan} />
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block">
                <Card className="shadow-sm border-0 rounded-2xl bg-white">
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-600" />
                        Loan Applications ({filteredLoans.length})
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {activeFilter === 'all' ? 'All Status' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                            <TableHead className="font-semibold text-gray-700">Date Applied</TableHead>
                            <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                            <TableHead className="font-semibold text-gray-700">Purpose</TableHead>
                            <TableHead className="font-semibold text-gray-700">Term</TableHead>
                            <TableHead className="font-semibold text-gray-700">Crop Type</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLoans.map((loan, index) => (
                            <motion.tr
                              key={loan._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0"
                            >
                              <TableCell className="py-4">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-gray-400" />
                                  {new Date(loan.appliedDate).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <span className="font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</span>
                              </TableCell>
                              <TableCell className="py-4 capitalize text-gray-700">{loan.purpose}</TableCell>
                              <TableCell className="py-4 capitalize text-gray-700">{loan.term}</TableCell>
                              <TableCell className="py-4 capitalize text-gray-700">{loan.cropType}</TableCell>
                              <TableCell className="py-4">{getStatusBadge(loan.status)}</TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FarmerLayout>
  );
};

export default LoanHistory;