import React, { useState, useEffect } from "react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import AdminLayout from "../layouts/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  Filter,
  Loader2,
  Search,
  Users,
  Check,
  Download,
  Plus,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface Farmer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  farmSize: string;
  cropTypes: string[];
  kyc: {
    status: "pending" | "verified" | "rejected";
    documents: string[];
  };
  createdAt: string;
}

type SortDirection = "asc" | "desc";
type SortableField = "name" | "email" | "createdAt";

interface StatsCardProps {
  title: string;
  value: number;
   icon: React.ReactElement<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLElement>>;
  gradient: string;
  description?: string;
}

const FarmerList: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getFarmers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const apiClient = createApiClient(token);
        const response = await apiClient.get(ENDPOINTS.GET_FARMERS);

        if (isMounted) {
          if (!response.data || !response.data.data) {
            throw new Error("Invalid response format from server");
          }
          setFarmers(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "Failed to fetch farmers"
          );
          setIsLoading(false);
        }
      }
    };

    getFarmers();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortFarmers = (a: Farmer, b: Farmer) => {
    if (sortField === "name" || sortField === "email") {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
    if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  };

  const handleSort = (field: SortableField) => {
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "N/A";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error(
        "Invalid date string provided, resulting in 'Invalid Date':",
        dateString
      );
      return "Invalid Date";
    }

    return date.toLocaleDateString(undefined, options);
  };

  const renderStatsCard = ({
    title,
    value,
    icon,
    gradient,
    description,
  }: StatsCardProps): React.ReactElement => (
    <div
      className={cn(
        `${gradient} rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`,
        "relative overflow-hidden group"
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{value.toLocaleString()}</p>
            {description && (
              <p className="text-xs opacity-75 mt-1">{description}</p>
            )}
          </div>
          <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
            {React.cloneElement(icon, { className: "h-5 w-5 sm:h-6 sm:w-6 text-white" })}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
        </div>
      </div>
    </div>
  );

  const renderKycBadge = (status: "verified" | "rejected" | "pending") => {
    const configs = {
      verified: {
        className: "bg-emerald-400 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
        dotColor: "bg-emerald-500",
        icon: "✓"
      },
      rejected: {
        className: "bg-red-400 text-red-700 border border-red-200 hover:bg-red-100",
        dotColor: "bg-red-500",
        icon: "✕"
      },
      pending: {
        className: "bg-amber-300 text-amber-700 border border-amber-200 hover:bg-amber-100",
        dotColor: "bg-amber-500",
        icon: "⏳"
      },
    };

    const config = configs[status];

    return (
      <Badge
        className={cn(
          `px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium ${config.className} shadow-sm transition-all duration-300 transform hover:scale-105`,
          "whitespace-nowrap cursor-default"
        )}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${config.dotColor} animate-pulse`} />
          <span className="capitalize font-medium">{status}</span>
          <span className="opacity-60 hidden sm:inline">{config.icon}</span>
        </div>
      </Badge>
    );
  };

  const filteredFarmers = farmers
    .filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (farmer.phoneNumber && farmer.phoneNumber.includes(searchTerm)) ||
        (farmer.address && farmer.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        farmer.farmSize
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        farmer.kyc.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (farmer.cropTypes && farmer.cropTypes.some((crop) => 
          crop.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    )
    .sort(sortFarmers);

  const verifiedCount = farmers.filter((f) => f.kyc.status === "verified").length;
  const pendingCount = farmers.filter((f) => f.kyc.status === "pending").length;
  const rejectedCount = farmers.filter((f) => f.kyc.status === "rejected").length;

  // New FarmerCard component for mobile view
  const FarmerCard: React.FC<{ farmer: Farmer }> = ({ farmer }) => (
    <div className="block sm:hidden bg-white rounded-2xl shadow-md border border-gray-200 p-4 mb-4">
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
          {farmer.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-base">{farmer.name}</p>
          <p className="text-sm text-gray-500 truncate">{farmer.email}</p>
        </div>
        <div>{renderKycBadge(farmer.kyc.status)}</div>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p><span className="font-medium">Phone:</span> {farmer.phoneNumber || "N/A"}</p>
        <p><span className="font-medium">Address:</span> {farmer.address || "N/A"}</p>
        <p><span className="font-medium">Farm Size:</span> {farmer.farmSize || "N/A"}</p>
        <p>
          <span className="font-medium">Crops:</span>{" "}
          {farmer.cropTypes && farmer.cropTypes.length > 0 ? (
            <span className="inline-flex flex-wrap gap-1">
              {farmer.cropTypes.slice(0, 3).map((crop, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                >
                  🌱 {crop}
                </span>
              ))}
              {farmer.cropTypes.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{farmer.cropTypes.length - 3} more
                </span>
              )}
            </span>
          ) : (
            <span className="text-gray-400">No crops listed</span>
          )}
        </p>
        <p>
          <span className="font-medium">Joined:</span> {formatDate(farmer.createdAt)} (
          {new Date().getFullYear() - new Date(farmer.createdAt).getFullYear()} years ago)
        </p>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Farmer Management" subtitle="Manage and monitor registered farmers">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {renderStatsCard({
            title: "Total Farmers",
            value: farmers.length,
            icon: <Users />,
            gradient: "bg-naturopura-gradient",
            description: "Active registrations"
          })}
          {renderStatsCard({
            title: "Verified Farmers",
            value: verifiedCount,
            icon: <Check />,
            gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
            description: "Completed KYC process"
          })}
          {renderStatsCard({
            title: "Pending Verification",
            value: pendingCount,
            icon: <Loader2 />,
            gradient: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-600",
            description: "Awaiting review"
          })}
          {renderStatsCard({
            title: "Growth Rate",
            value: rejectedCount,
            icon: <TrendingUp />,
            gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600",
            description: "This month"
          })}
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white/80 backdrop-blur-lg p-3 sm:p-4 lg:p-6 rounded-2xl shadow-xl border border-gray-100/50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            
            {/* Search Section */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
                <Input
                  placeholder="Search farmers by name, email, crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-50/50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 text-xs sm:text-sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-xs sm:text-sm"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{filteredFarmers.length}</span> of <span className="font-semibold">{farmers.length}</span> farmers
              {searchTerm && (
                <span className="ml-2 text-gray-500">
                  for "<span className="font-medium text-gray-700">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-4 w-4 sm:h-5 sm:w-5 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div className="ml-2 sm:ml-3">
                <p className="text-red-800 font-medium text-sm sm:text-base">Error loading farmers</p>
                <p className="text-red-600 text-xs sm:text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 sm:h-80 lg:h-96 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="relative">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-medium text-base sm:text-lg">Loading farmers data...</p>
                <p className="text-gray-500 text-xs sm:text-sm">Please wait while we fetch the latest information</p>
              </div>
            </div>
          </div>
        ) : filteredFarmers.length === 0 ? (
          // Empty State
          <div className="flex justify-center items-center h-64 sm:h-80 lg:h-96 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-700 font-medium text-base sm:text-lg">No farmers found</p>
                <p className="text-gray-500 text-xs sm:text-sm px-4">
                  {searchTerm 
                    ? `No results match "${searchTerm}". Try adjusting your search.`
                    : "Start by adding your first farmer to the system."
                  }
                </p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add First Farmer
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            {filteredFarmers.map((farmer) => (
              <FarmerCard key={farmer._id} farmer={farmer} />
            ))}

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100/50 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-150 transition-all duration-300">
                      <TableHead
                        className="cursor-pointer group py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center space-x-1 sm:space-x-2 group-hover:text-emerald-600 transition-colors duration-200">
                          <span className="text-xs sm:text-sm">Name</span>
                          <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                      </TableHead>
                      
                      <TableHead className="hidden sm:table-cell py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">
                        <span className="text-xs sm:text-sm">Contact Info</span>
                      </TableHead>
                      
                      <TableHead className="hidden lg:table-cell py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">
                        <span className="text-xs sm:text-sm">Farm Details</span>
                      </TableHead>
                      
                      <TableHead className="hidden xl:table-cell py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">
                        <span className="text-xs sm:text-sm">Crop Types</span>
                      </TableHead>
                      
                      <TableHead className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">
                        <span className="text-xs sm:text-sm">KYC Status</span>
                      </TableHead>
                      
                      <TableHead
                        className="cursor-pointer group py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center space-x-1 sm:space-x-2 group-hover:text-emerald-600 transition-colors duration-200">
                          <span className="text-xs sm:text-sm">Joined</span>
                          <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredFarmers.map((farmer, index) => (
                      <TableRow 
                        key={farmer._id}
                        className="group hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-teal-50/30 transition-all duration-300 border-b border-gray-100/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-naturopura-gradient rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-lg">
                              {farmer.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200 text-xs sm:text-sm">
                                {farmer.name}
                              </p>
                              <p className="text-xs text-gray-500 sm:hidden truncate max-w-32">{farmer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="hidden sm:table-cell py-3 sm:py-4 px-3 sm:px-6">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{farmer.email}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{farmer.phoneNumber}</p>
                            <p className="text-xs text-gray-400 md:hidden truncate max-w-32">{farmer.address}</p>
                          </div>
                        </TableCell>
                        
                        <TableCell className="hidden lg:table-cell py-3 sm:py-4 px-3 sm:px-6">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">
                              📍 {farmer.address}
                            </p>
                            <p className="text-xs sm:text-sm text-emerald-600 font-medium">
                              🏡 {farmer.farmSize}
                            </p>
                          </div>
                        </TableCell>
                        
                        <TableCell className="hidden xl:table-cell py-3 sm:py-4 px-3 sm:px-6">
                          {farmer.cropTypes && farmer.cropTypes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {farmer.cropTypes.slice(0, 3).map((crop, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                                >
                                  🌱 {crop}
                                </span>
                              ))}
                              {farmer.cropTypes.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  +{farmer.cropTypes.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs sm:text-sm">No crops listed</span>
                          )}
                        </TableCell>
                        
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                          {renderKycBadge(farmer.kyc.status)}
                        </TableCell>
                        
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                          <div className="text-xs sm:text-sm">
                            <p className="font-medium text-gray-900">{formatDate(farmer.createdAt)}</p>
                            <p className="text-gray-500 text-xs">
                              {new Date().getFullYear() - new Date(farmer.createdAt).getFullYear()} years ago
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default FarmerList;