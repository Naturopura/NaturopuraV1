import React from "react";
import { Loader2 } from "lucide-react";
import { BlockchainSoilData } from '../../types/soil';

interface BlockchainSoilDataTableProps {
  data: BlockchainSoilData[];
  loading: boolean;
  error: string | null;
  onFetch: () => void;
}

const BlockchainSoilDataTable: React.FC<BlockchainSoilDataTableProps> = ({
  data,
  loading,
  error,
  onFetch
}) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 naturopura-text">Soil Data from Blockchain</h2>
        <button
          onClick={onFetch}
          disabled={loading}
          className="mb-6 px-6 py-2 bg-naturopura-gradient text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              Fetching...
            </span>
          ) : (
            "Fetch Soil Data from Blockchain"
          )}
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300 text-left">Location</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left">pH</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left">Organic Carbon</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left">Clay Content</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200">{entry.location}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{entry.ph.toFixed(1)}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{entry.organicCarbon.toFixed(1)}%</td>
                    <td className="px-4 py-2 border-b border-gray-200">{entry.clayContent.toFixed(1)}%</td>
                    <td className="px-4 py-2 border-b border-gray-200">{entry.timestamp.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No soil data fetched from blockchain yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlockchainSoilDataTable;