import { ExternalLink,  Info } from 'lucide-react';
import { motion } from 'framer-motion';

const schemes = [
  {
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    benefit: '₹6,000/year (in 3 installments)',
    eligibility: [
      'Small & marginal farmers (≤2 hectares)',
      'Excludes income tax payers, govt. employees, institutional landowners',
    ],
    apply: 'Submit Aadhaar, land records, and bank details at CSC or apply online.',
    link: 'https://pmkisan.gov.in',
  },
  {
    title: 'PM Fasal Bima Yojana (PMFBY – Crop Insurance)',
    benefit: 'Crop insurance at 1.5–5% premium',
    eligibility: ['All farmers (loanee/non-loanee)'],
    apply: 'Loanee: Auto via bank; Non-loanee: Apply online or at nearest bank.',
    link: 'https://pmfby.gov.in',
  },
  {
    title: 'Kisan Credit Card (KCC)',
    benefit: 'Loan up to ₹3 lakh at 4% interest',
    eligibility: ['Farmers, dairy/fishery/poultry workers'],
    apply: 'Apply at nationalized/co-op banks with Aadhaar & land papers.',
    link: 'https://www.nabard.org',
  },
  {
    title: 'Fertilizer Subsidy',
    benefit: 'Urea at ₹300/bag (vs ₹3,000 market price)',
    eligibility: ['All farmers with land records'],
    apply: 'Buy from govt.-approved dealers using Aadhaar/KCC.',
    link: 'https://www.fert.nic.in',
  },
  {
    title: 'Soil Health Card Scheme',
    benefit: 'Free soil testing & nutrient advice',
    eligibility: ['All farmers'],
    apply: 'Visit portal or agriculture office.',
    link: 'https://soilhealth.dac.gov.in',
  },
  {
    title: 'Agricultural Mechanization Scheme',
    benefit: '25–50% subsidy on tractors, harvesters, etc.',
    eligibility: ['Small farmers, FPOs, women farmers'],
    apply: 'Apply via state agriculture departments.',
    link: 'https://farmech.gov.in',
  },
  {
    title: 'PM Kisan Maan Dhan Yojana (Pension)',
    benefit: '₹3,000/month pension after age 60',
    eligibility: ['Small farmers with 1–2 hectares'],
    apply: 'Apply at CSC or online portal.',
    link: 'https://pmkmy.gov.in',
  },
  {
    title: 'Dairy & Fisheries Subsidies',
    benefit: '25–40% subsidies for dairy/fish infra',
    eligibility: ['Dairy/Fisheries farmers'],
    apply: 'Apply via NDDB or Fisheries Department.',
    link: 'https://www.nddb.coop',
  },
];

const GovernmentSchemes = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-naturopura-gradient">
       Government Schemes for Farmers
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-naturopura-gradient mb-2 flex items-center gap-2">
              {scheme.title}
            </h3>

            <p className="mb-2 text-sm text-gray-700 flex items-center gap-1">
              <strong>Benefit:</strong> {scheme.benefit}
            </p>

            <div className="mb-2 text-sm text-gray-700">
              <p className="flex items-center gap-1 font-medium">
                <Info className="w-4 h-4 text-indigo-500" />
                Eligibility:
              </p>
              <ul className="list-disc list-inside ml-4 mt-1">
                {scheme.eligibility.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>

            <p className="mb-3 text-sm text-gray-700">
              <strong>How to Apply:</strong> {scheme.apply}
            </p>

            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Visit Official Website
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
