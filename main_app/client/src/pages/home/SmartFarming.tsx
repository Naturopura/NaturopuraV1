import { useState } from "react";
import Navbar from "../../components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Eye,
  Info,
  Plus,
  Minus,
  Star,
  Clock,
  Wifi,
  Cpu,
  BarChart3,
  Thermometer,
  Droplets,
  Lightbulb,
} from "lucide-react";
import { FaUser } from "react-icons/fa";

const SmartFarming = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const technologyFeatures = [
    {
      icon: <Wifi className="w-8 h-8 text-purple-600" />,
      title: "IoT Sensors",
      desc: "Real-time monitoring of soil, weather, and crop conditions",
      details: "Wireless sensors collect data 24/7 for continuous monitoring",
      time: "Real-time",
      image: "https://images.squarespace-cdn.com/content/v1/59b037304c0dbfb092fbe894/1592262129087-SYDENIHGJJS010LKOXIX/cap_soil_moisture_sensor_in_soil_BLOG.JPG"
    },
    {
      icon: <Cpu className="w-8 h-8 text-pink-600" />,
      title: "AI Analytics",
      desc: "Smart analysis of farm data for predictive insights",
      details: "Machine learning algorithms detect patterns and predict outcomes",
      time: "Instant",
      image: "https://farmonaut.com/wp-content/uploads/2024/09/1-748.jpg"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Data Visualization",
      desc: "Easy-to-understand dashboards and reports",
      details: "Visual insights help farmers make informed decisions",
      time: "On-demand",
      image: "https://pub.mdpi-res.com/ai/ai-02-00026/article_deploy/html/images/ai-02-00026-g001.png?1629963853"
    },
  ];

  const sensorTypes = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Temperature Sensors",
      desc: "Monitor ambient and soil temperature variations",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Moisture Sensors",
      desc: "Track soil moisture levels for optimal irrigation",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      label: "Light Sensors",
      desc: "Measure sunlight exposure for crop growth optimization",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Camera Systems",
      desc: "Visual monitoring for pest detection and growth tracking",
    },
  ];

  const benefits = [
    {
      title: "Increased Yield",
      desc: "Optimized growing conditions lead to higher crop production",
      status: "20-30% improvement",
    },
    {
      title: "Water Conservation",
      desc: "Precision irrigation reduces water usage by up to 50%",
      status: "Eco-friendly",
    },
    {
      title: "Early Disease Detection",
      desc: "AI-powered alerts for potential crop diseases before spread",
      status: "Proactive",
    },
    {
      title: "Cost Reduction",
      desc: "Automated systems reduce labor and resource costs",
      status: "25% savings",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Patel",
      role: "Farmer, Maharashtra",
      content:
        "The smart farming system helped me increase my yield by 35% while reducing water usage significantly.",
      rating: 5,
      image: <FaUser />,
    },
    {
      name: "Priya Sharma",
      role: "Farm Owner, Punjab",
      content:
        "Early warning alerts saved my crops from a fungal outbreak. The investment paid for itself in one season!",
      rating: 5,
      image: <FaUser />,
    },
  ];

  const faqs = [
    {
      question: "How does smart farming work?",
      answer:
        "Smart farming uses IoT sensors to monitor farm conditions, AI to analyze data, and automated systems to optimize farming operations.",
    },
    {
      question: "Is the system difficult to install?",
      answer:
        "No, our systems are designed for easy installation with minimal technical knowledge required.",
    },
    {
      question: "Can I access data remotely?",
      answer:
        "Yes, all data is accessible through our mobile app and web dashboard from anywhere.",
    },
    {
      question: "What crops are supported?",
      answer:
        "Our system works with all major crops including grains, vegetables, fruits, and cash crops.",
    },
  ];

  const technicalSpecs = [
    {
      category: "Sensor Network",
      specs: [
        "Wireless IoT sensors with 2-year battery life",
        "Real-time data transmission",
        "Weather-resistant housing",
        "Solar-powered options available",
      ],
    },
    {
      category: "Platform Features",
      specs: [
        "Mobile app and web dashboard",
        "Multi-language support",
        "Custom alert thresholds",
        "Historical data analysis",
      ],
    },
  ];

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
                Smart Farming
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                IoT-powered monitoring and early warning systems that transform traditional farming into precision agriculture
              </motion.p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "technology", label: "Technology" },
                { id: "benefits", label: "Benefits" },
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
                      Precision Agriculture Revolution
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Naturopura's smart farming solutions leverage cutting-edge IoT technology to help farmers monitor crops, predict issues, and optimize yields through data-driven insights.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Real-time crop monitoring with IoT sensors",
                        "AI-powered disease and pest prediction",
                        "Automated irrigation and nutrient management",
                        "Weather-based farming recommendations",
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
                      src="https://iotbusinessnews.com/WordPress/wp-content/uploads/farming-agriculture-aerial.jpg"
                      alt="Smart Farming"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-gray-600 mt-4 text-sm">
                      Transform your farm with intelligent monitoring systems
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Technology Tab */}
            {activeTab === "technology" && (
              <motion.div
                key="technology"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Smart Farming Technology
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Advanced IoT and AI technologies working together for smarter agriculture
                  </p>
                </div>
                <div className="space-y-12">
                  {technologyFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="relative"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {feature.title}
                              </h3>
                              <div className="text-sm text-purple-600 font-medium flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {feature.time}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{feature.desc}</p>
                          <p className="text-sm text-gray-600">
                            {feature.details}
                          </p>
                        </div>
                        <div className="flex-1">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                          />
                        </div>
                      </div>
                      {index < technologyFeatures.length - 1 && (
                        <div className="flex justify-center my-8">
                          <div className="w-px h-12 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Sensor Types Available
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sensorTypes.map((sensor, index) => (
                      <motion.div
                        key={sensor.label}
                        className="text-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-purple-600">
                          {sensor.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {sensor.label}
                        </h4>
                        <p className="text-sm text-gray-600">{sensor.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Benefits Tab */}
            {activeTab === "benefits" && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Smart Farming Benefits
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Transform your farming operation with measurable improvements
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900">
                          {benefit.title}
                        </h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                          {benefit.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Environmental Impact
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Smart farming not only improves yields but also promotes sustainable agriculture practices that benefit the environment.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Reduced water consumption</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Lower pesticide usage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Improved soil health</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>Carbon footprint reduction</span>
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
                    Smart Farming Testimonials
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Trusted by farmers across India who have transformed their operations
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
                    Smart Farming FAQ
                  </h2>
                  <p className="text-lg text-gray-600">
                    Everything you need to know about our smart farming solutions
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
                    Smart Farming Technical Specs
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Built on reliable, scalable, and farmer-friendly technology
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
                            <CheckCircle className="w-4 h-4 text-purple-600 flex-s极hrink-0" />
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 bg-gradient-to-r from-gray-900 to-purple-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    Integration Options
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Our smart farming system integrates seamlessly with existing farm equipment and management systems.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Mobile App</h4>
                      <p className="text-sm text-gray-300">
                        iOS and Android apps for real-time monitoring and alerts
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-semibold mb-2">API Access</h4>
                      <p className="text-sm text-gray-300">
                        REST APIs for custom integrations and data analysis
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
                Ready to Transform Your Farm?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
                Join thousands of farmers using Naturopura Smart Farming technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          className="bg-white py-12 px-4 border极-t border-gray-200"
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
    </>
  );
};

export default SmartFarming;