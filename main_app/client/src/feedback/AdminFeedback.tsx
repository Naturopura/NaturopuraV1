import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import AdminLayout from "../components/layouts/AdminLayout";
import FeedbackContractABI from "../constants/FeedbackContract.json";
import { CONTRACT_ADDRESS } from "../constants/feedback_addrs";
import { ethers } from "ethers";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  category: string;
  rating: number;
  title: string;
  createdAt: string;
}

const AdminFeedbackList: React.FC = () => {
  const { token, user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      setIsRefreshing(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      // Safely set feedbacks based on actual structure
      if (Array.isArray(res.data)) {
        setFeedbacks(res.data);
      } else if (Array.isArray(res.data.feedbacks)) {
        setFeedbacks(res.data.feedbacks);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchFeedbacks();
    }
  }, [token, user]);



  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch =
      (fb.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (fb.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (fb.message?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (fb.title?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || fb.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });


const fetchFeedbackFromBlockchain = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, FeedbackContractABI, signer);
    const allFeedback = await contract.getAllFeedback(); // only admin can call
    console.log(allFeedback);
    setFeedbacks(allFeedback); // Update frontend state
  } catch (error) {
    console.error("Fetching from blockchain failed:", error);
  }
};

useEffect(() => {
  if (user?.role === "admin") {
    fetchFeedbackFromBlockchain();
  }
}, [user]);

  const handleExport = () => {
    const csv = [
      [
        "Name",
        "Email",
        "Phone",
        "Category",
        "Rating",
        "Title",
        "Message",
        "Date",
      ],
      ...filteredFeedbacks.map((fb) => [
        fb.name,
        fb.email,
        fb.phoneNumber,
        fb.category,
        fb.rating,
        fb.title,
        fb.message,
        new Date(fb.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-export-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  const categories = ["all", "Bug", "Suggestion", "General", "Other"];

  if (loading) {
    return (
      <AdminLayout title="Feedback" subtitle="Feedback from farmers">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Feedback" subtitle="Feedback from farmers">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-naturopura-gradient px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Farmer Feedback Dashboard
                </h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchFeedbacks()}
                  className="flex items-center px-3 py-2 bg-white text-black rounded hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center px-3 py-2 bg-white text-black rounded hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          {filteredFeedbacks.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No feedback found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden space-y-4 p-4">
                {filteredFeedbacks.map((fb) => (
                  <div
                    key={fb._id}
                    className="bg-white rounded-lg shadow p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{fb.name}</p>
                        <p className="text-sm text-gray-500">{fb.email}</p>
                        <p className="text-sm text-gray-500">{fb.phoneNumber}</p>
                      </div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {fb.category}
                      </span>
                    </div>
                    <div className="mb-2">
                      <p className="font-medium text-gray-900">{fb.title}</p>
                      <p className="text-gray-500 line-clamp-3">{fb.message}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < fb.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div>
                        {new Date(fb.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 font-bold py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name & Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-bold py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-bold py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-bold py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feedback
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-bold py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFeedbacks.map((fb) => (
                      <tr
                        key={fb._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {fb.name}
                          </div>
                          <div className="text-sm text-gray-500">{fb.email}</div>
                          <div className="text-sm text-gray-500">
                            {fb.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {fb.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < fb.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {fb.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {fb.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(fb.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedbackList;
