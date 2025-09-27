import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PlusElement {
  id: number;
  layer: 'back' | 'mid' | 'front';
  size: 'sm' | 'md' | 'lg';
  left: number;
  dx: number;
  delay: number;
}

interface HeroPlusRiseProps {
  className?: string;
}

const HeroPlusRise: React.FC<HeroPlusRiseProps> = ({ className = '' }) => {
  const [plusElements, setPlusElements] = useState<PlusElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Gerar elementos "+" dinamicamente
  useEffect(() => {
    const generatePlusElements = () => {
      const elements: PlusElement[] = [];
      const isMobile = window.innerWidth <= 768;
      const count = isMobile ? 24 : 40;

      for (let i = 0; i < count; i++) {
        // Distribuição de camadas: 30% back, 45% mid, 25% front
        const layerRand = Math.random();
        let layer: 'back' | 'mid' | 'front';
        if (layerRand < 0.3) layer = 'back';
        else if (layerRand < 0.75) layer = 'mid';
        else layer = 'front';

        // Distribuição de tamanhos: 40% sm, 40% md, 20% lg
        const sizeRand = Math.random();
        let size: 'sm' | 'md' | 'lg';
        if (sizeRand < 0.4) size = 'sm';
        else if (sizeRand < 0.8) size = 'md';
        else size = 'lg';

        elements.push({
          id: i,
          layer,
          size,
          left: Math.random() * 100, // 0% a 100%
          dx: (Math.random() - 0.5) * 16, // -8px a 8px
          delay: Math.random() * 12, // 0s a 12s
        });
      }

      setPlusElements(elements);
    };

    generatePlusElements();

    // Regenerar em resize para responsividade
    const handleResize = () => {
      generatePlusElements();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(120% 120% at 70% 10%, #0E7C86 0%, #0C2340 55%, #081629 100%)',
        minHeight: '100vh'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0))'
        }}
      />

      {/* Plus field */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {plusElements.map((element) => (
          <motion.span
            key={element.id}
            className="absolute text-white select-none"
            style={{
              left: `${element.left}%`,
              top: '110%',
              fontSize: element.size === 'sm' ? '14px' : element.size === 'md' ? '20px' : '28px',
              opacity: element.layer === 'back' ? 0.06 : element.layer === 'mid' ? 0.08 : 0.10,
              filter: 'blur(0.2px)',
              willChange: 'transform, opacity',
              '--dx': `${element.dx}px`
            } as React.CSSProperties}
            animate={{
              y: ['110%', '-20%'],
              x: [0, element.dx, 0],
            }}
            transition={{
              duration: element.layer === 'back' ? 28 : element.layer === 'mid' ? 22 : 16,
              delay: element.delay,
              repeat: Infinity,
              ease: 'linear',
              x: {
                duration: element.layer === 'back' ? 6 : element.layer === 'mid' ? 5 : 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            whileHover={isHovered ? {
              scale: 1.05,
              transition: { duration: 0.2 }
            } : {}}
          >
            +
          </motion.span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Event Title with Condensed Typography */}
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '-0.02em'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span 
                  className="block"
                  style={{
                    color: '#E7C8A1',
                    textShadow: '2px 2px 0 #0C2340, -1px -1px 0 #0C2340, 1px -1px 0 #0C2340, -1px 1px 0 #0C2340'
                  }}
                >
                  OPEN
                </span>
                <span 
                  className="block text-white"
                  style={{
                    textShadow: '2px 2px 0 #0C2340, -1px -1px 0 #0C2340, 1px -1px 0 #0C2340, -1px 1px 0 #0C2340'
                  }}
                >
                  CONNECTIONS
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-cyan-400"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 700
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                INCODAY
              </motion.h2>
            </div>

            {/* Subtitle and Description */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-2xl font-semibold text-white">
                Software + Conectividade
              </p>
              <p className="text-xl text-gray-300">
                Conteúdo, Networking e Parcerias
              </p>
            </motion.div>

            {/* Chips */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium border-2"
                style={{
                  backgroundColor: 'rgba(231, 200, 161, 0.1)',
                  borderColor: '#E7C8A1',
                  color: '#E7C8A1'
                }}
              >
                Formato Híbrido
              </span>
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium border-2"
                style={{
                  backgroundColor: 'rgba(231, 200, 161, 0.1)',
                  borderColor: '#E7C8A1',
                  color: '#E7C8A1'
                }}
              >
                Finatec, 11–12 Nov
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.a
                href="#inscrever"
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                style={{
                  backgroundColor: '#E7C8A1',
                  color: '#0C2340',
                  boxShadow: '0 4px 14px 0 rgba(231, 200, 161, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 6px 20px 0 rgba(231, 200, 161, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Inscrever-se
              </motion.a>
              
              <motion.a
                href="#agenda"
                className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                style={{
                  borderColor: '#E7C8A1',
                  color: '#E7C8A1',
                  backgroundColor: 'transparent'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(231, 200, 161, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Agenda
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Central Plus Symbol */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="text-9xl md:text-[12rem] font-black text-white/20 select-none"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                +
              </motion.div>
              
              {/* Orbital elements */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className="w-32 h-32 border border-cyan-400/30 rounded-full" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className="w-24 h-24 border border-amber-400/30 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroPlusRise;
