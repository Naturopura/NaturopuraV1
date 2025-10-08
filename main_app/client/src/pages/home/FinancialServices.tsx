import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf,  ChevronRight, CheckCircle, Shield, Lock, Database, Eye, FileCheck, AlertCircle, Info, Plus, Minus, Star, Clock, Banknote, Wallet, DollarSign, Users } from "lucide-react";
import { FaUser } from 'react-icons/fa';

const FinancialServices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const steps = [
    {
      icon: <Banknote className="w-8 h-8 text-green-600" />,
      title: "Loan Application",
      desc: "Farmers apply for loans directly from their dashboard",
      details: "Simple digital forms and instant eligibility checks",
      time: "2 minutes",
      image: "../loanApplication.png"
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Insurance Enrollment",
      desc: "Choose from government and private insurance schemes",
      details: "Automated premium calculation and policy issuance",
      time: "1 minute",
      image: "../insurance.png"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-purple-600" />,
      title: "Subsidy Claim",
      desc: "Submit subsidy claims with digital proof of eligibility",
      details: "Real-time status tracking and direct benefit transfer",
      time: "Instant",
      image: "../subsidy.png"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Support & Advisory",
      desc: "Access financial literacy resources and expert help",
      details: "Chatbots and advisors available 24/7",
      time: "Anytime",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
    }
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6" />, label: "Secure Transactions", desc: "All financial operations are encrypted and verified" },
    { icon: <Lock className="w-6 h-6" />, label: "Data Privacy", desc: "Personal and financial data is protected by strict privacy controls" },
    { icon: <Database className="w-6 h-6" />, label: "Audit Trail", desc: "Every transaction is logged for transparency and compliance" },
    { icon: <Eye className="w-6 h-6" />, label: "Fraud Detection", desc: "AI-powered monitoring for suspicious activity" },
    { icon: <FileCheck className="w-6 h-6" />, label: "Regulatory Compliance", desc: "Meets RBI, IRDAI, and government standards" }
  ];

  const complianceStandards = [
    { title: "RBI Guidelines", desc: "Compliant with Reserve Bank of India digital lending norms", status: "Certified" },
    { title: "IRDAI Compliance", desc: "Insurance operations meet IRDAI regulations", status: "Compliant" },
    { title: "DBT Standards", desc: "Direct Benefit Transfer integration for subsidies", status: "Integrated" },
    { title: "ISO 27001", desc: "Information Security Management System certification", status: "Certified" }
  ];

  const testimonials = [
    {
      name: "Sunil Joshi",
      role: "Farmer, Maharashtra",
      content: "I got my crop loan approved in just a few minutes. The process was easy and transparent.",
      rating: 5,
      image: <FaUser />
    },
    {
      name: "Meena Devi",
      role: "Farmer, Bihar",
      content: "Insurance enrollment was quick and I could track my subsidy claim online. Highly recommended!",
      rating: 5,
      image: <FaUser />
    }
  ];

  const faqs = [
    { question: "How do I apply for a loan?", answer: "Log in to your dashboard, fill out the loan application form, and submit required documents. You’ll get instant eligibility feedback." },
    { question: "Is my financial data safe?", answer: "Yes, all data is encrypted and only accessible to authorized parties. We comply with RBI and IRDAI standards." },
    { question: "Can I enroll in multiple insurance schemes?", answer: "Yes, you can compare and enroll in multiple schemes as per your eligibility and needs." },
    { question: "How are subsidies transferred?", answer: "Subsidies are transferred directly to your bank account via DBT after claim approval." }
  ];

  const technicalSpecs = [
    {
      category: "Security",
      specs: [
        "AES-256 encryption at rest",
        "TLS 1.3 for data in transit",
        "Multi-factor authentication",
        "AI-powered fraud detection"
      ]
    },
    {
      category: "Integration",
      specs: [
        "RESTful APIs for banks and insurers",
        "Webhook notifications for status updates",
        "SDK for third-party apps"
      ]
    }
  ];

  const openModal = (img: string) => {
    setModalImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mt-10">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Financial
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Services
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Instant access to loans, insurance, and government subsidies for farmers. Secure, transparent, and fully compliant financial solutions.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button onClick={()=>{navigate('/login')}} className="bg-blue-600 hover:bg-blue-700 text-white  px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Apply Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs */}
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
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'
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
                      Empowering Farmers with Financial Access
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Naturopura's financial services platform connects farmers to instant loans, insurance, and subsidies, all in one place. Our secure, compliant system ensures every transaction is transparent and efficient.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Instant loan approval",
                        "Insurance enrollment in minutes",
                        "Direct subsidy transfers",
                        "Full regulatory compliance"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                    <img
                      src="https://images.pexels.com/photos/14907452/pexels-photo-14907452.jpeg"
                      alt="Farmer using financial services"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-gray-600 mt-4 text-sm">
                      Farmers can access financial services anywhere, anytime
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Naturopura?</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Easy Access</h4>
                      <p className="text-gray-600 text-sm">Apply for loans and insurance with just a few clicks.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Secure & Transparent</h4>
                      <p className="text-gray-600 text-sm">All transactions are encrypted and fully auditable.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Banknote className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Direct Benefits</h4>
                      <p className="text-gray-600 text-sm">Subsidies and payments go straight to your account.</p>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How Financial Services Work</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our streamlined process connects farmers to financial products in minutes
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
                                <div className="text-sm text-green-600 font-medium flex items-center gap-1">
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
                            className="w-full h-64 object-cover rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-105"
                            onClick={() => openModal(step.image)}
                          />
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex justify-center my-8">
                          <div className="w-px h-12 bg-gradient-to-b from-green-300 to-blue-300"></div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {/* Modal for image pop-up */}
                  {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg">
                      <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-2xl mx-auto">
                        <button
                          className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
                          onClick={closeModal}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <img src={modalImage!} alt="Step Detail" className="w-full h-auto rounded-xl" />
                      </div>
                    </div>
                  )}
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
                    Multi-layered security architecture protecting your financial data
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
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
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
                        <strong>Your financial data is encrypted and never shared without your consent.</strong>
                        All transactions are logged and monitored for fraud. We comply with RBI and IRDAI standards.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>AI-powered fraud detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Consent-driven data access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Automatic data purging after transaction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Regular security audits</span>
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
                        We continuously monitor regulatory changes and update our systems to maintain compliance. Our legal and compliance team works closely with regulatory bodies to ensure adherence to evolving standards.
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
                    Trusted by thousands of farmers and cooperatives across India
                  </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
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
                    Everything you need to know about our financial services
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
                    Built on secure, scalable, and interoperable infrastructure
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
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
                <div className="mt-12 bg-gradient-to-r from-gray-900 to-green-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Developer Resources</h3>
                  <p className="text-gray-300 mb-6">
                    APIs and SDKs for integrating financial services with your systems.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">REST APIs</h4>
                      <p className="text-sm text-gray-300">Endpoints for loan, insurance, and subsidy operations</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">SDKs</h4>
                      <p className="text-sm text-gray-300">Libraries for JavaScript, Python, and Java</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Access Financial Services?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Join thousands of farmers using Naturopura for loans, insurance, and subsidies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={()=>navigate("/login")} className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Apply Now
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

      {/* Modal should be outside the main container */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 bg-opacity-60 backdrop-blur">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-2xl mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img src={modalImage!} alt="Step Detail" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default FinancialServices;