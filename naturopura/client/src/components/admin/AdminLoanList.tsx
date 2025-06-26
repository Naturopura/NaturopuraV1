import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Clock, XCircle, Info } from "lucide-react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import { toast } from "../ui/use-toast";
import { AxiosError } from "axios";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface Loan {
  _id: string;
  farmer?: {
    name?: string;
    email?: string;
  };
  amount: number;
  purpose: string;
  term: string;
  status: "pending" | "approved" | "rejected" | "completed";
  appliedDate: string;
  cropType: string;
  collateral: string;
  landSize?: number;
  farmDetails?: string;
  rejectionReason?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const customStyles = (
  <style>
    {`
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
      }
      .animate-shake {
        animation: shake 0.5s ease-in-out infinite;
      }
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.7); }
        50% { text-shadow: 0 0 15px rgba(59, 130, 246, 1); }
      }
      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }
      .fade-in {
        animation: fadeIn 0.5s ease forwards;
        opacity: 0;
      }
      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
      .hover-scale-shadow:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .button-loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }
      .button-loading::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1rem;
        height: 1rem;
        margin-top: -0.5rem;
        margin-left: -0.5rem;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
  </style>
);

const AdminLoanList = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const apiClient = createApiClient(token);
      const response = await apiClient.get<ApiResponse<Loan[]>>(
        ENDPOINTS.GET_ALL_LOANS
      );
      const loansData = response.data?.data || [];

      if (!Array.isArray(loansData)) {
        setError("Invalid data format received from server");
        setLoans([]);
        return;
      }

      setLoans(loansData);
      setError("");
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to fetch loans");
      } else {
        setError(error.message || "Failed to fetch loans");
      }
      setLoans([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (
    loanId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const apiClient = createApiClient(token);
      const response = await apiClient.put<ApiResponse<Loan>>(
        ENDPOINTS.UPDATE_LOAN_STATUS(loanId),
        {
          status: newStatus,
          rejectionReason:
            newStatus === "rejected" ? rejectionReason : undefined,
        }
      );

      if (response.data.success) {
        setLoans(
          loans.map((loan) =>
            loan._id === loanId
              ? {
                  ...loan,
                  status: newStatus,
                  rejectionReason:
                    newStatus === "rejected" ? rejectionReason : undefined,
                }
              : loan
          )
        );

        toast({
          title: "Success",
          description: `Loan ${newStatus} successfully`,
        });

        setIsDialogOpen(false);
        setSelectedLoan(null);
        setRejectionReason("");
      } else {
        throw new Error("Failed to update loan status");
      }
    } catch (err) {
      const error = err as Error | AxiosError;
      toast({
        title: "Error",
        description:
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to update loan status"
            : error.message || "Failed to update loan status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Clock className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  const statusIconClasses = {
    pending: "animate-pulse text-yellow-600",
    approved: "text-green-600",
    rejected: "text-red-600",
    completed: "animate-glow text-blue-600",
  };

  return (
    <>
      {customStyles}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500 animate-glow" />
            Loan Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-green-100">
          {loans.map((loan, index) => (
            <div
              key={loan._id}
              className={`py-6 px-4 flex flex-col md:flex-row md:items-center md:justify-between bg-green-50 border border-green-200 rounded-xl shadow-sm mb-4 transition-all fade-in hover-scale-shadow`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-1 mb-4 md:mb-0">
                <div className="font-semibold text-lg text-green-900">
                  {loan.farmer?.name || "Unknown Farmer"}
                </div>
                <div className="text-sm text-green-700">
                  {loan.farmer?.email || "No email provided"}
                </div>
                <div className="text-sm text-green-800">
                  ₹{loan.amount?.toLocaleString() || "0"} • Term:{" "}
                  {loan.term || "N/A"}
                </div>
                <div className="text-sm text-green-700">
                  Purpose: {loan.purpose || "Not specified"}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    loan.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : loan.status === "approved"
                      ? "bg-green-200 text-green-900"
                      : loan.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {loan.status === "pending" && (
                    <Clock className={`w-4 h-4 ${statusIconClasses.pending}`} />
                  )}
                  {loan.status === "approved" && (
                    <CheckCircle
                      className={`w-4 h-4 ${statusIconClasses.approved}`}
                    />
                  )}
                  {loan.status === "rejected" && (
                    <XCircle className={`w-4 h-4 ${statusIconClasses.rejected}`} />
                  )}
                  {loan.status === "completed" && (
                    <Info className={`w-4 h-4 ${statusIconClasses.completed}`} />
                  )}
                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </span>

                {loan.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-green-600 text-green-700 hover:bg-green-100 ${
                        isUpdating ? "button-loading" : ""
                      }`}
                      onClick={() => handleStatusUpdate(loan._id, "approved")}
                      disabled={isUpdating}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-red-600 text-red-700 hover:bg-red-100 ${
                        isUpdating ? "button-loading" : ""
                      }`}
                      onClick={() => {
                        setSelectedLoan(loan);
                        setIsDialogOpen(true);
                      }}
                      disabled={isUpdating}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Loan Application</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                Please provide a reason for rejecting this loan application.
              </p>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setSelectedLoan(null);
                  setRejectionReason("");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedLoan) {
                    handleStatusUpdate(selectedLoan._id, "rejected");
                  }
                }}
                disabled={!rejectionReason.trim() || isUpdating}
              >
                {isUpdating ? "Rejecting..." : "Reject Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default AdminLoanList;
