import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicCodeAnimation: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'typing' | 'logo' | 'transition'>('typing');

  const targetText = 'printf("Inovação");';

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let phaseTimeoutId: NodeJS.Timeout;

    const startTypingAnimation = () => {
      setCurrentPhase('typing');
      setCurrentText('');
      
      let charIndex = 0;
      const typeNextChar = () => {
        if (charIndex < targetText.length) {
          setCurrentText(targetText.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 150 + Math.random() * 100);
        } else {
          // Finalizou a digitação, aguarda um pouco e mostra a logo
          phaseTimeoutId = setTimeout(() => {
            setCurrentPhase('transition');
            setTimeout(() => {
              setCurrentPhase('logo');
              // Após mostrar a logo, volta para a digitação (ciclo contínuo)
              setTimeout(() => {
                startTypingAnimation();
              }, 4000);
            }, 1000);
          }, 2000);
        }
      };
      
      typeNextChar();
    };

    startTypingAnimation();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(phaseTimeoutId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl opacity-95"></div>
      
      {/* Efeito de brilho animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-xl"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Cursor piscante */}
        <motion.div
          className="w-1 h-8 bg-blue-400"
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Texto ou Logo */}
        <AnimatePresence mode="wait">
          {currentPhase === 'typing' && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 max-w-full mx-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.pre
                  className="text-green-400 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {currentText}
                  <motion.span
                    className="text-yellow-400"
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    |
                  </motion.span>
                </motion.pre>
              </motion.div>
              <motion.p
                className="text-gray-200 text-sm mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Compilando...
              </motion.p>
            </motion.div>
          )}

          {currentPhase === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center w-full"
            >
              {/* Logo da TecSoft com animações premium */}
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto relative"
                whileHover={{ scale: 1.08, rotateY: 5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ perspective: '1000px' }}
              >
                {/* Aura/Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Container principal da logo */}
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-2xl"
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 15px 35px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Efeito de brilho holográfico */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-3xl"
                    animate={{ 
                      x: ['-150%', '150%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                  
                  {/* Logo com animações sofisticadas */}
                  <motion.img
                    src="/LogoTecsoft.png"
                    alt="TecSoft Logo"
                    className="w-full h-full object-contain relative z-10"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      filter: [
                        'brightness(1) saturate(1)',
                        'brightness(1.1) saturate(1.2)',
                        'brightness(1) saturate(1)'
                      ]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4, 
                      ease: "easeOut",
                      filter: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: 'brightness(1.2) saturate(1.3)',
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
                
                {/* Partículas decorativas */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                    y: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1.2
                  }}
                />
              </motion.div>
              
              {/* Texto informativo elegante */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-4 space-y-1"
              >
                <motion.p
                  className="text-blue-200 text-sm font-medium tracking-wide"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Centro de Tecnologia de Software
                </motion.p>
                <motion.p
                  className="text-purple-200 text-xs font-light tracking-wider"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  Agente SOFTEX • Centro-Oeste
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {currentPhase === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center w-full"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de status */}
        <motion.div
          className="flex items-center space-x-2 text-gray-400 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span>Sistema Ativo</span>
        </motion.div>
      </div>

      {/* Efeitos decorativos */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default DynamicCodeAnimation;
