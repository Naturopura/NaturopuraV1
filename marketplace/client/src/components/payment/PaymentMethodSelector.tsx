import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Coins, Shield, Zap, Globe, Lock } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: 'razorpay' | 'crypto';
  onMethodChange: (method: 'razorpay' | 'crypto') => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  const paymentMethods = [
    {
      id: 'razorpay' as const,
      title: 'Razorpay',
      subtitle: 'Cards, UPI, Net Banking & More',
      description: 'Pay with your preferred method - Credit/Debit cards, UPI, Net Banking, and digital wallets',
      icon: CreditCard,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      features: ['Instant Payment', 'Multiple Options', 'Secure & Trusted'],
      featureIcons: [Zap, Globe, Shield],
      popular: true,
    },
    {
      id: 'crypto' as const,
      title: 'Cryptocurrency',
      subtitle: 'MetaMask & Web3 Wallets',
      description: 'Pay with Ethereum and other cryptocurrencies using your MetaMask wallet',
      icon: Coins,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      features: ['Decentralized', 'Global Access', 'Blockchain Secure'],
      featureIcons: [Globe, Zap, Lock],
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h3>
        <p className="text-gray-600">Select your preferred way to complete the purchase</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          
          return (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onMethodChange(method.id)}
              className={`
                relative cursor-pointer rounded-2xl border-2 transition-all duration-300
                ${isSelected 
                  ? `${method.borderColor} bg-gradient-to-br ${method.bgColor} shadow-lg ring-4 ring-opacity-20 ${method.color.includes('blue') ? 'ring-blue-500' : 'ring-purple-500'}`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {/* Popular Badge */}
              {method.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${method.color} shadow-lg
                    `}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className={`
                    w-6 h-6 rounded-full border-2 transition-all duration-200
                    ${isSelected 
                      ? `${method.borderColor} bg-gradient-to-r ${method.color}` 
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full rounded-full bg-white flex items-center justify-center"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${method.color}`} />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {method.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {method.features.map((feature, index) => {
                    const FeatureIcon = method.featureIcons[index];
                    return (
                      <div key={feature} className="flex items-center space-x-2">
                        <FeatureIcon className={`h-4 w-4 ${isSelected ? 'text-gray-700' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isSelected ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Visual Enhancement for Selected State */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${method.color} animate-pulse`} />
                      <span className="text-sm font-medium text-gray-700">Selected</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Gradient Border Effect for Selected */}
              {isSelected && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.color} opacity-10 pointer-events-none`} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-1">Secure Payment Processing</h5>
            <p className="text-sm text-gray-600">
              All payments are processed securely with industry-standard encryption. 
              Your financial information is protected and never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;