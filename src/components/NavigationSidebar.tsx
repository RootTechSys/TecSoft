import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavigationSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Home',
      path: '/open-connections',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Sobre o Evento',
      path: '/hotsite/sobre',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Agenda',
      path: '/hotsite/agenda',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-purple-500'
    },
    {
      name: 'Localização',
      path: '/hotsite/localizacao',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Inscrições',
      path: '/hotsite/inscricoes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/open-connections') {
      return location.pathname === '/open-connections' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Estilos personalizados para o menu mobile */}
      <style>{`
        /* Reset e posicionamento base */
        .mobile-menu-btn {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 1000 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        
        /* Menu mobile mais atrativo */
        @media (max-width: 767px) {
          .mobile-menu-btn {
            background: linear-gradient(135deg, 
              rgba(0, 188, 212, 0.25) 0%, 
              rgba(168, 85, 247, 0.25) 50%,
              rgba(236, 72, 153, 0.25) 100%
            ) !important;
            backdrop-filter: blur(20px) !important;
            border: 2px solid rgba(0, 188, 212, 0.4) !important;
            box-shadow: 
              0 8px 32px rgba(0, 188, 212, 0.3),
              0 0 60px rgba(168, 85, 247, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            animation: mobileMenuGlow 3s ease-in-out infinite;
            padding: 12px !important;
            border-radius: 0 0 20px 0 !important;
            width: 60px !important;
            height: 60px !important;
          }
          
          .mobile-menu-btn:hover {
            background: linear-gradient(135deg, 
              rgba(0, 188, 212, 0.35) 0%, 
              rgba(168, 85, 247, 0.35) 50%,
              rgba(236, 72, 153, 0.35) 100%
            ) !important;
            border-color: rgba(0, 188, 212, 0.6) !important;
            box-shadow: 
              0 12px 40px rgba(0, 188, 212, 0.4),
              0 0 80px rgba(168, 85, 247, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
            transform: scale(1.1) !important;
          }
          
          @keyframes mobileMenuGlow {
            0%, 100% {
              box-shadow: 
                0 8px 32px rgba(0, 188, 212, 0.3),
                0 0 60px rgba(168, 85, 247, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            50% {
              box-shadow: 
                0 12px 40px rgba(0, 188, 212, 0.4),
                0 0 80px rgba(168, 85, 247, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
          }
          
          /* Ícone com efeito especial no mobile */
          .mobile-menu-icon {
            filter: drop-shadow(0 0 8px rgba(0, 188, 212, 0.6));
            animation: iconPulse 2s ease-in-out infinite;
          }
          
          @keyframes iconPulse {
            0%, 100% {
              filter: drop-shadow(0 0 8px rgba(0, 188, 212, 0.6));
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(0, 188, 212, 0.8));
            }
          }
        }
        
        /* Desktop/tablet mantém o estilo original */
        @media (min-width: 768px) {
          .mobile-menu-btn {
            background: rgba(0, 0, 0, 0.4) !important;
            backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: none !important;
            animation: none !important;
            padding: 16px !important;
            border-radius: 0 0 16px 0 !important;
            width: 64px !important;
            height: 64px !important;
          }
          
          .mobile-menu-btn:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            transform: scale(1.05) !important;
          }
          
          .mobile-menu-icon {
            filter: none !important;
            animation: none !important;
          }
        }
      `}</style>
      
      {/* Mobile Menu Button - ÚNICO */}
      <motion.button
        className="mobile-menu-btn text-white transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Ícone único com classes responsivas */}
          <svg className="mobile-menu-icon w-6 h-6 md:w-8 md:h-8 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Content */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/20 z-[1001]"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-8 h-full flex flex-col">
                {/* Header */}
                <div className="mb-12 pt-20">
                  <h2 className="text-2xl font-bold text-white mb-2">Open Connections</h2>
                  <h3 className="text-lg text-gray-300">+ InCoDay</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mt-4"></div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center p-4 rounded-xl transition-all duration-300 group ${
                            isActive(item.path)
                              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/30'
                              : 'hover:bg-white/10 border border-transparent'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                          </div>
                          <span className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300">
                            {item.name}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationSidebar;