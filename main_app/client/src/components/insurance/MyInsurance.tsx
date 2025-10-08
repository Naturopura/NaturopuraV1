import { useEffect, useState, useCallback } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { CheckCircle, XCircle, Hourglass, ExternalLink, Shield, Building, Smartphone, Users } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface Insurance {
  _id: string;
  insuranceType: string;
  cropType?: string;
  landSize: number;
  premiumAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
}

const statusMap = {
  approved: {
    color: 'bg-green-50 text-green-700 border border-green-200',
    icon: <CheckCircle size={16} />,
    text: 'Approved',
  },
  rejected: {
    color: 'bg-red-50 text-red-700 border border-red-200',
    icon: <XCircle size={16} />,
    text: 'Rejected',
  },
  pending: {
    color: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    icon: <Hourglass size={16} />,
    text: 'Pending',
  },
};

const insurancePlatforms = [
  {
    type: 'PMFBY / AIC & Private Insurers',
    focus: 'Crop insurance via government program',
    coverage: 'All major crops',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-teal-600 to-teal-700',
    links: [
      { name: 'PMFBY Website', url: 'https://pmfby.gov.in/' },
      { name: 'AIC of India', url: 'https://www.aicofindia.com/' }
    ]
  },
  {
    type: 'Special Insurers',
    focus: 'Crop, livestock, tractor, pump-set',
    coverage: 'Farmers under PMFBY and standalone policies',
    icon: <Building className="w-5 h-5" />,
    color: 'from-emerald-600 to-emerald-700',
    subtitle: 'HDFC ERGO, ICICI Lombard, Bajaj Allianz, SBI, etc.',
    links: [
      { name: 'HDFC ERGO – Agri', url: 'https://www.hdfcergo.com/rural-insurance/crop-insurance' },
      { name: 'ICICI Lombard – Rural', url: 'https://www.icicilombard.com/rural-insurance' },
      { name: 'Bajaj Allianz – Farmitra', url: 'https://www.bajajallianz.com/farmitra.html' },
      { name: 'SBI General – PMFBY', url: 'https://www.sbigeneral.in/product/farmer-package-policy' }
    ]
  },
  {
    type: 'Digital Insurtech',
    focus: 'Tech-enabled insurance',
    coverage: 'PMFBY, microinsurance, agritech integration',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-teal-600 to-teal-700',
    subtitle: 'GramCover, Cropin, Kshema',
    links: [
      { name: 'GramCover', url: 'https://www.gramcover.com/' },
      { name: 'Cropin – Agri Insurance', url: 'https://www.cropin.com/agri-insurance' },
      { name: 'Kshema Insurance', url: 'https://kshema.co/' }
    ]
  },
  {
    type: 'Coop & State Schemes',
    focus: 'Livestock or state-level benefits',
    coverage: 'Dairy, automatic crop coverage',
    icon: <Users className="w-5 h-5" />,
    color: 'from-emerald-600 to-emerald-700',
    subtitle: 'Mymul, AgriStack',
    links: [
      { name: 'Mymul Dairy', url: 'https://www.mymul.coop/' },
      { name: 'AgriStack Overview', url: 'https://agristacks.in/what-is-agristack/' }
    ]
  }
];

const ITEMS_PER_PAGE = 4;

// Add helper function for token validation
const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

const MyInsurance = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'applications' | 'platforms'>('applications');
  const navigate = useNavigate();

  // Wrap fetchInsurances in useCallback
  const fetchInsurances = useCallback(async () => {
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      const res = await api.get(ENDPOINTS.GET_MY_INSURANCE);
      setInsurances(res.data);
    } catch (err) {
      const error = err as Error;
      console.error(handleApiError(err));
      
      if (error.message === 'No authentication token found') {
        toast({
          title: "Session Expired",
          description: "Please login to view your insurance applications",
          variant: "destructive",
        });
        navigate('/login', { state: { from: '/farmer/insurance' } });
      }
    }
  }, [navigate]);

  // Update useEffect to include fetchInsurances
  useEffect(() => {
    fetchInsurances();
  }, [fetchInsurances]);

  const paginated = insurances.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <FarmerLayout title="Insurance Hub" subtitle="Manage applications and discover platforms">
      {/* Professional Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-green-50 p-1 rounded-lg max-w-md mx-auto border border-green-100">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'applications'
                ? 'bg-white naturopura-text shadow-sm border border-green-200'
                : 'naturopura-text hover:bg-green-100'
            }`}
          >
            My Applications
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'platforms'
                ? 'bg-white naturopura-text shadow-sm border border-green-200'
                : 'naturopura-text hover:bg-green-100'
            }`}
          >
            Insurance Platforms
          </button>
        </div>
      </div>

      {activeTab === 'applications' ? (
        /* My Insurance Applications Section */
        <div className="space-y-6">
          {paginated.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-md mx-auto">
                <Shield className="w-16 h-16 naturopura-text mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">No insurance applications found</p>
                <p className="text-gray-500 text-sm mt-2">Apply for insurance to see your applications here</p>
              </div>
            </div>
          ) : (
            paginated.map((i) => {
              const status = statusMap[i.status];
              return (
                <div
                  key={i._id}
                  className="bg-white border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{i.insuranceType}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${status.color}`}>
                      {status.icon}
                      {status.text}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Crop Type:</span>
                        <span className="text-gray-900 font-medium">{i.cropType || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Land Size:</span>
                        <span className="text-gray-900 font-medium">{i.landSize} acres</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Premium:</span>
                        <span className="text-green-700 font-semibold text-lg">₹{i.premiumAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Description:</span>
                        <span className="text-gray-900 font-medium text-right max-w-xs truncate">{i.description || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Professional Pagination */}
          {insurances.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-white border border-green-300 text-green-700 rounded-lg shadow-sm hover:bg-green-50 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                Previous
              </button>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium border border-green-200">
                Page {page} of {Math.ceil(insurances.length / ITEMS_PER_PAGE)}
              </div>
              <button
                onClick={() => setPage((prev) => (prev * ITEMS_PER_PAGE < insurances.length ? prev + 1 : prev))}
                disabled={page * ITEMS_PER_PAGE >= insurances.length}
                className="px-6 py-3 bg-white border border-green-300 text-green-700 rounded-lg shadow-sm hover:bg-green-50 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Insurance Platforms Section */
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Insurance Platforms for Farmers</h2>
            <p className="text-gray-600">Explore various insurance options available for agricultural needs</p>
          </div>

          <div className="grid gap-6">
            {insurancePlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-green-200 hover:border-green-300"
              >
                <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-15 p-3 rounded-lg">
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{platform.type}</h3>
                      {platform.subtitle && (
                        <p className="text-white text-opacity-90 text-sm mt-1">{platform.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Focus</h4>
                      <p className="text-gray-600">{platform.focus}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Coverage</h4>
                      <p className="text-gray-600">{platform.coverage}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Available Platforms
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {platform.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-all duration-200 hover:shadow-sm text-sm font-medium group border border-green-200 hover:border-green-300"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Call to Action */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mt-8">
            <Shield className="w-16 h-16 mx-auto mb-4 naturopura-text" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Contact your local agricultural officer or visit the nearest bank branch for personalized insurance advice
            </p>
            <button 
              onClick={() => setActiveTab('applications')}
              className="bg-naturopura-gradient text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-all duration-200 hover:shadow-sm"
            >
              View My Applications
            </button>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};

export default MyInsurance;