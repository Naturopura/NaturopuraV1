import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const particles = [
    { emoji: '🌱', delay: 0, duration: 15 },
    { emoji: '🌾', delay: 2, duration: 18 },
    { emoji: '🚜', delay: 4, duration: 20 },
    { emoji: '🌿', delay: 6, duration: 16 },
    { emoji: '🍃', delay: 8, duration: 14 },
    { emoji: '💚', delay: 10, duration: 17 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-30"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;