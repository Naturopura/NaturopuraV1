import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Car as IdCard, CheckCircle2, ShieldCheck, Lock,  Clock,  FileCheck, Eye, Database, Zap, Globe, ChevronRight,  Star, Shield, CheckCircle, AlertCircle, Info, Plus, Minus } from "lucide-react";
import { FaUser } from 'react-icons/fa';

const IdentityVerification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const steps = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Mobile Registration",
      desc: "Farmers register using their mobile number with secure OTP verification",
      details: "Multi-factor authentication ensures only legitimate users can access the platform",
      time: "30 seconds",
      image: "https://images.pexels.com/photos/336948/pexels-photo-336948.jpeg"
    },
    {
      icon: <IdCard className="w-8 h-8 text-green-600" />,
      title: "Aadhaar eKYC Consent",
      desc: "Consent-driven verification through India's Aadhaar digital identity system",
      details: "UIDAI-compliant process with full data protection and privacy safeguards",
      time: "2 minutes",
      image: "https://static.toiimg.com/thumb/msid-115657021,width-400,resizemode-4/115657021.jpg"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-600" />,
      title: "Data Verification",
      desc: "Cross-verification with multiple authoritative databases",
      details: "Real-time validation against government and institutional records",
      time: "5 seconds",
      image: "https://sslinsights.com/wp-content/uploads/2024/09/data-validation-vs-data-verification-comparison.png"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
      title: "Blockchain Proof",
      desc: "Immutable verification proof recorded on distributed ledger",
      details: "Cryptographic attestation provides tamper-evident audit trail",
      time: "Instant",
      image: "https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg"
    }
  ];

  const securityFeatures = [
    { 
      icon: <ShieldCheck className="w-6 h-6" />, 
      label: "Consent-based Access",
      desc: "All data access requires explicit user consent"
    },
    { 
      icon: <Lock className="w-6 h-6" />, 
      label: "End-to-End Encryption",
      desc: "TLS 1.3 encryption for all data in transit"
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      label: "Data Minimization",
      desc: "Only essential data collected and processed"
    },
    { 
      icon: <Database className="w-6 h-6" />, 
      label: "On-chain Audit Trail",
      desc: "Immutable record of all verification events"
    },
    { 
      icon: <Eye className="w-6 h-6" />, 
      label: "Privacy by Design",
      desc: "Zero-knowledge proofs protect sensitive data"
    },
    { 
      icon: <FileCheck className="w-6 h-6" />, 
      label: "Regulatory Compliance",
      desc: "GDPR, DPDPA 2023, and UIDAI compliant"
    }
  ];



  const complianceStandards = [
    {
      title: "UIDAI Compliance",
      desc: "Fully compliant with UIDAI regulations for Aadhaar-based authentication",
      status: "Certified"
    },
    {
      title: "DPDPA 2023",
      desc: "Adherent to India's Digital Personal Data Protection Act 2023",
      status: "Compliant"
    },
    {
      title: "ISO 27001",
      desc: "Information Security Management System certification",
      status: "Certified"
    },
    {
      title: "SOC 2 Type II",
      desc: "Security, availability, and confidentiality controls audited",
      status: "Audited"
    }
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Farmer, Punjab",
      content: "The verification process was so simple. I got my digital identity in just 2 minutes, and now I can access loans and insurance easily.",
      rating: 5,
      image: <FaUser />
    },
    {
      name: "Priya Sharma",
      role: "Agricultural Cooperative",
      content: "Naturopura's verification system has streamlined our farmer onboarding. The blockchain proof gives us confidence in identity authenticity.",
      rating: 5,
      image: <FaUser />
    },
    {
      name: "Dr. Amit Patel",
      role: "AgTech Researcher",
      content: "The combination of eKYC with blockchain creates a robust, tamper-proof identity system that's perfect for agricultural applications.",
      rating: 5,
      image: <FaUser />
    }
  ];

  const faqs = [
    {
      question: "How secure is my Aadhaar information?",
      answer: "We never store your Aadhaar number or biometric data. We only store a cryptographic proof that verification was completed successfully. Your sensitive information stays with UIDAI and is only accessed with your explicit consent."
    },
    {
      question: "What happens to my data on the blockchain?",
      answer: "Only a verification hash (cryptographic proof) is stored on the blockchain - never your personal information. This hash proves that verification occurred without revealing any personal details. The blockchain record is immutable and provides an audit trail."
    },
    {
      question: "How long does the verification process take?",
      answer: "The entire process typically takes 2-3 minutes. Mobile OTP verification takes about 30 seconds, Aadhaar eKYC takes 1-2 minutes, and blockchain recording is instantaneous."
    },
    {
      question: "What if I don't have an Aadhaar card?",
      answer: "While Aadhaar is our primary verification method, we also support alternative KYC methods including PAN card, driving license, and voter ID verification for users who don't have Aadhaar."
    },
    {
      question: "Is this process legally compliant?",
      answer: "Yes, we are fully compliant with UIDAI regulations, DPDPA 2023, and international privacy standards. We undergo regular security audits and maintain all necessary certifications."
    },
    {
      question: "Can I update my information later?",
      answer: "Yes, you can update your information at any time. Changes will create a new verification record on the blockchain while maintaining the history of previous verifications for audit purposes."
    }
  ];

  const technicalSpecs = [
    {
      category: "Security",
      specs: [
        "AES-256 encryption at rest",
        "TLS 1.3 for data in transit",
        "HMAC-SHA256 for data integrity",
        "Multi-factor authentication",
        "Zero-knowledge proofs"
      ]
    },
    {
      category: "Blockchain",
      specs: [
        "Ethereum-compatible network",
        "Smart contract verification",
        "IPFS for distributed storage",
        "Gas-optimized transactions",
        "Cross-chain compatibility"
      ]
    },
    {
      category: "Integration",
      specs: [
        "RESTful APIs",
        "WebSocket real-time updates",
        "SDK for multiple languages",
        "Webhook notifications",
        "GraphQL support"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mt-10">
              
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Digital Identity
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Verification
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Secure, compliant, and instant farmer onboarding through Aadhaar eKYC 
                with blockchain-verified proof of identity. Trusted by 50,000+ farmers across India.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button onClick={()=>{navigate('/login')}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Start Verification
                  <ChevronRight className="w-5 h-5" />
                </button>
              
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'process', label: 'How it Works' },
                { id: 'security', label: 'Security' },
                { id: 'compliance', label: 'Compliance' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'faq', label: 'FAQ' },
                { id: 'technical', label: 'Technical' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className="py-16">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Transforming Agricultural Identity Verification
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Naturopura's identity verification system combines India's robust Aadhaar eKYC 
                      infrastructure with cutting-edge blockchain technology to create the most secure, 
                      efficient, and compliant farmer onboarding solution in the market.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Instant verification in under 3 minutes",
                        "99.7% success rate with real-time validation",
                        "Blockchain-secured audit trail",
                        "Full regulatory compliance (UIDAI, DPDPA 2023)"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                    <img
                      src="https://images.pexels.com/photos/33586991/pexels-photo-33586991.jpeg"
                      alt="Farmer using mobile verification"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-gray-600 mt-4 text-sm">
                      Farmers can complete identity verification anywhere, anytime
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Naturopura?</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
                      <p className="text-gray-600 text-sm">Complete verification in under 3 minutes with real-time processing and instant blockchain confirmation.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ultra Secure</h4>
                      <p className="text-gray-600 text-sm">Military-grade encryption, zero-knowledge proofs, and blockchain immutability protect all data.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Globally Compliant</h4>
                      <p className="text-gray-600 text-sm">Meets international standards while being specifically designed for Indian agricultural needs.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Process Tab */}
            {activeTab === 'process' && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How Identity Verification Works</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our streamlined 4-step process ensures secure, compliant, and efficient farmer onboarding
                  </p>
                </div>

                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      className="relative"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                                {step.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                <div className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {step.time}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{step.desc}</p>
                            <p className="text-sm text-gray-600">{step.details}</p>
                          </div>
                        </div>
                        <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                          <img
                            src={step.image}
                            alt={`Step ${index + 1}: ${step.title}`}
                            className="w-full h-64 object-cover rounded-2xl shadow-lg"
                          />
                        </div>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className="flex justify-center my-8">
                          <div className="w-px h-12 bg-gradient-to-b from-blue-300 to-green-300"></div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Security at the Core</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Multi-layered security architecture protecting your data at every step
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {securityFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900">{feature.label}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Critical Security Notice</h3>
                      <p className="text-gray-700 mb-4">
                        <strong>Your Aadhaar number and biometric data are NEVER stored on the blockchain or our servers.</strong> 
                        We only store a cryptographic hash that proves verification was completed successfully. 
                        All sensitive personal information remains with UIDAI and is accessed only with your explicit consent.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Zero-knowledge verification proofs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Consent-driven data access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Automatic data purging after verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Regular security audits and penetration testing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Compliance Tab */}
            {activeTab === 'compliance' && (
              <motion.div
                key="compliance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Certified compliance with national and international standards
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {complianceStandards.map((standard, index) => (
                    <motion.div
                      key={standard.title}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900">{standard.title}</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {standard.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{standard.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Compliance Updates</h3>
                      <p className="text-gray-700 mb-4">
                        We continuously monitor regulatory changes and update our systems to maintain compliance. 
                        Our legal and compliance team works closely with regulatory bodies to ensure adherence to evolving standards.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Quarterly compliance audits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Real-time regulatory monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Automatic system updates for compliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Trusted by thousands of farmers, cooperatives, and agricultural organizations across India
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                      {testimonial.image}
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <p className="text-lg text-gray-600">
                    Everything you need to know about our identity verification process
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Technical Tab */}
            {activeTab === 'technical' && (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Built on enterprise-grade infrastructure with cutting-edge technologies
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {technicalSpecs.map((category, index) => (
                    <motion.div
                      key={category.category}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="font-bold text-gray-900 mb-4">{category.category}</h3>
                      <ul className="space-y-2">
                        {category.specs.map((spec, specIndex) => (
                          <li key={specIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Developer Resources</h3>
                  <p className="text-gray-300 mb-6">
                    Comprehensive APIs and SDKs for seamless integration with your existing systems.
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">REST APIs</h4>
                      <p className="text-sm text-gray-300">RESTful endpoints for all verification operations</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">SDKs</h4>
                      <p className="text-sm text-gray-300">Native SDKs for JavaScript, Python, and Java</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Webhooks</h4>
                      <p className="text-sm text-gray-300">Real-time notifications for all events</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Documentation</h4>
                      <p className="text-sm text-gray-300">Comprehensive guides and API references</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Farmer Onboarding?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of agricultural organizations using Naturopura's identity verification platform.
                Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={()=>navigate("/login")} className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Start Free Trial
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          className="bg-white py-12 px-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Naturopura</span>
            </div>
            <p className="text-gray-600 mb-4">
              Transforming agriculture through secure, compliant, and innovative technology solutions.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2025 Naturopura by Quotus. All rights reserved. • Privacy Policy • Terms of Service
            </p>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default IdentityVerification;