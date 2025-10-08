import { motion } from 'framer-motion';
import { Leaf, Sprout, TrendingUp, Shield, Users, Smartphone } from 'lucide-react';

const HeroVisual = () => {
  const floatingElements = [
    { icon: Leaf, color: 'text-green-500', delay: 0, size: 'w-12 h-12' },
    { icon: Sprout, color: 'text-emerald-500', delay: 0.5, size: 'w-10 h-10' },
    { icon: TrendingUp, color: 'text-blue-500', delay: 1, size: 'w-11 h-11' },
    { icon: Shield, color: 'text-purple-500', delay: 1.5, size: 'w-10 h-10' },
    { icon: Users, color: 'text-orange-500', delay: 2, size: 'w-12 h-12' },
    { icon: Smartphone, color: 'text-cyan-500', delay: 2.5, size: 'w-9 h-9' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Hub */}
      <motion.div
        className="relative w-80 h-80 bg-naturopura-gradient rounded-full border border-white/30 backdrop-blur-sm shadow-2xl flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Inner Circle */}
        <motion.div
          className="w-60 h-60 bg-gradient-to-br from-white/40 to-white/20 rounded-full border border-white/40 backdrop-blur-md shadow-xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="text-6xl"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            🌱
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        {floatingElements.map((element, index) => {
          const angle = (360 / floatingElements.length) * index;
          const radius = 160;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={index}
              className={`absolute ${element.size} bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg flex items-center justify-center`}
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 0.6, 
                delay: element.delay,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay
                }
              }}
            >
              <element.icon className={`${element.color} w-6 h-6`} />
            </motion.div>
          );
        })}

        {/* Connecting Lines */}
        {floatingElements.map((_, index) => {
          const angle = (360 / floatingElements.length) * index;
          
          
          return (
            <motion.div
              key={`line-${index}`}
              className="absolute w-0.5 h-20 bg-naturopura-gradient"
              style={{
                transformOrigin: 'bottom center',
                transform: `rotate(${angle}deg)`,
                bottom: '50%',
                left: '50%',
                marginLeft: '-1px'
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.5 + (index * 0.1),
                ease: "easeOut"
              }}
            />
          );
        })}
      </motion.div>

      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-green-400/10 rounded-full blur-lg"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/3 right-5 w-12 h-12 bg-purple-400/10 rounded-full blur-md"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default HeroVisual;