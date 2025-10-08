import  { useState } from "react";
import Navbar from "../../components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronRight,
  CheckCircle,
  Shield,
  Lock,
  Database,
  Eye,
  FileCheck,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Star,
  Clock,
  Store,
  Tag,
  Truck,
  DollarSign,
} from "lucide-react";
import { FaUser } from "react-icons/fa";

const Marketplace = () => {
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const steps = [
    {
      icon: <Store className="w-8 h-8 text-purple-600" />,
      title: "Product Listing",
      desc: "Farmers list their produce directly on the marketplace",
      details: "Easy upload of product details, images, and certifications",
      time: "2 minutes",
      image: "../productList.png",
    },
    {
      icon: <Tag className="w-8 h-8 text-pink-600" />,
      title: "AI Price Recommendation",
      desc: "Get smart price suggestions based on market trends",
      details: "AI analyzes demand, supply, and quality for fair pricing",
      time: "Instant",
      image:
        "https://www.a3logics.com/wp-content/uploads/2023/04/monetizing-app-1.jpg",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Order & Logistics",
      desc: "Buyers place orders and track delivery in real-time",
      details: "Integrated logistics and transparent delivery tracking",
      time: "Real-time",
      image:
        "https://cart.com/hubfs/fulfillment-logistics-explained.png",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Secure Payment",
      desc: "Transactions are protected and instant",
      details: "Multiple payment options and instant settlements",
      time: "Instant",
      image:
        "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2023/02/Cashfree-Secure-Payment-Gateway.png?fit=1200%2C800&ssl=1",
    },
  ];

  const securityFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Secure Transactions",
      desc: "All payments are encrypted and verified",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      label: "Data Privacy",
      desc: "Buyer and seller data is protected by strict privacy controls",
    },
    {
      icon: <Database className="w-6 h-6" />,
      label: "Audit Trail",
      desc: "Every transaction is logged for transparency",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Fraud Detection",
      desc: "AI-powered monitoring for suspicious activity",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      label: "Regulatory Compliance",
      desc: "Meets government and financial standards",
    },
  ];

  const complianceStandards = [
    {
      title: "FSSAI Certified",
      desc: "Food safety and standards compliance for all listed produce",
      status: "Certified",
    },
    {
      title: "GST Integration",
      desc: "Marketplace supports GST invoicing and compliance",
      status: "Integrated",
    },
    {
      title: "Digital Payments",
      desc: "UPI, NEFT, and other digital payment standards",
      status: "Compliant",
    },
    {
      title: "ISO 9001",
      desc: "Quality management system certification",
      status: "Certified",
    },
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Buyer, Delhi",
      content:
        "Buying directly from farmers is easy and transparent. The price recommendations are fair.",
      rating: 5,
      image: <FaUser />,
    },
    {
      name: "Lakshmi Patel",
      role: "Farmer, Gujarat",
      content:
        "I sold my produce at a better price and tracked my delivery online. Highly recommended!",
      rating: 5,
      image: <FaUser />,
    },
  ];

  const faqs = [
    {
      question: "How do I list my products?",
      answer:
        "Register as a farmer, go to your dashboard, and use the 'Add Product' feature to list your produce.",
    },
    {
      question: "Are payments secure?",
      answer:
        "Yes, all payments are encrypted and processed through trusted gateways.",
    },
    {
      question: "Can buyers track their orders?",
      answer: "Yes, real-time tracking is available for all deliveries.",
    },
    {
      question: "Is there support for bulk orders?",
      answer:
        "Yes, buyers can place bulk orders and negotiate directly with farmers.",
    },
  ];

  const technicalSpecs = [
    {
      category: "Marketplace Engine",
      specs: [
        "AI-powered price recommendation",
        "Real-time inventory management",
        "Multi-category product support",
      ],
    },
    {
      category: "Integration",
      specs: [
        "Payment gateway APIs",
        "Logistics provider integration",
        "Webhook notifications for order status",
      ],
    },
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mt-10">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Marketplace
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Direct buyer-seller connections with AI-based price
                recommendations. Sell and buy farm produce securely and
                transparently.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button onClick={()=>{navigate('/login')}} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Start Selling
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
                { id: "overview", label: "Overview" },
                { id: "process", label: "How it Works" },
                { id: "security", label: "Security" },
                { id: "compliance", label: "Compliance" },
                { id: "testimonials", label: "Testimonials" },
                { id: "faq", label: "FAQ" },
                { id: "technical", label: "Technical" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-300"
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
            {activeTab === "overview" && (
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
                      Transparent, Direct, and Smart Marketplace
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Naturopura's marketplace empowers farmers and buyers to
                      connect directly, set fair prices, and ensure quality and
                      traceability for every transaction.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Direct farmer-to-buyer sales",
                        "AI-powered price recommendations",
                        "Real-time logistics tracking",
                        "Secure digital payments",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                    <img
                      src="https://images.pexels.com/photos/1458283/pexels-photo-1458283.jpeg"
                      alt="Marketplace"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-gray-600 mt-4 text-sm">
                      Sell and buy farm produce with confidence
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Choose Naturopura Marketplace?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Direct Sales
                      </h4>
                      <p className="text-gray-600 text-sm">
                        No middlemen, direct farmer-to-buyer transactions.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Tag className="w-8 h-8 text-pink-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Smart Pricing
                      </h4>
                      <p className="text-gray-600 text-sm">
                        AI suggests fair prices based on market data.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Logistics & Payment
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Integrated delivery and secure payment options.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Process Tab */}
            {activeTab === "process" && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    How Marketplace Works
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Seamless process for listing, selling, and buying farm
                    produce
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
                      <div
                        className={`grid lg:grid-cols-2 gap-8 items-center ${
                          index % 2 === 1 ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                                {step.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {step.title}
                                </h3>
                                <div className="text-sm text-purple-600 font-medium flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {step.time}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{step.desc}</p>
                            <p className="text-sm text-gray-600">
                              {step.details}
                            </p>
                          </div>
                        </div>
                        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
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
                          <div className="w-px h-12 bg-gradient-to-b from-purple-300 to-pink-300"></div>
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
                        <img
                          src={modalImage!}
                          alt="Step Detail"
                          className="w-full h-auto rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Marketplace Security
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Multi-layered security for every transaction and user
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
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {feature.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Security Notice
                      </h3>
                      <p className="text-gray-700 mb-4">
                        <strong>
                          All marketplace transactions are encrypted and
                          monitored for fraud.
                        </strong>
                        Your data is protected and never shared without consent.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>AI-powered fraud detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Consent-driven data access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Automatic data purging after transaction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Regular security audits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Compliance Tab */}
            {activeTab === "compliance" && (
              <motion.div
                key="compliance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Marketplace Compliance
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Certified and compliant with food, payment, and quality
                    standards
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
                        <h3 className="font-bold text-gray-900">
                          {standard.title}
                        </h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                          {standard.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{standard.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-pink-50 rounded-2xl p-8 border border-pink-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Compliance Updates
                      </h3>
                      <p className="text-gray-700 mb-4">
                        We monitor regulatory changes and update our systems to
                        maintain compliance. Our team works closely with
                        authorities to ensure adherence to evolving standards.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Quarterly compliance audits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Real-time regulatory monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Automatic system updates for compliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Testimonials Tab */}
            {activeTab === "testimonials" && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Marketplace Testimonials
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Trusted by farmers and buyers across India
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
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        {testimonial.image}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Marketplace FAQ
                  </h2>
                  <p className="text-lg text-gray-600">
                    Everything you need to know about our marketplace
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
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                      >
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
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
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
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
            {activeTab === "technical" && (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Marketplace Technical Specs
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Built on scalable, secure, and interoperable infrastructure
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
                      <h3 className="font-bold text-gray-900 mb-4">
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.specs.map((spec, specIndex) => (
                          <li
                            key={specIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 bg-gradient-to-r from-gray-900 to-purple-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    Developer Resources
                  </h3>
                  <p className="text-gray-300 mb-6">
                    APIs and SDKs for integrating marketplace features with your
                    systems.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">REST APIs</h4>
                      <p className="text-sm text-gray-300">
                        Endpoints for product, order, and payment operations
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">SDKs</h4>
                      <p className="text-sm text-gray-300">
                        Libraries for JavaScript, Python, and Java
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Sell or Buy?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
                Join thousands of farmers and buyers using Naturopura
                Marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Start Now
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
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Naturopura
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Transforming agriculture through secure, compliant, and innovative
              technology solutions.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2025 Naturopura by Quotus. All rights reserved. • Privacy
              Policy • Terms of Service
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Modal should be outside the main container */}
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
            <img
              src={modalImage!}
              alt="Step Detail"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Marketplace;
