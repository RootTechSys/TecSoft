import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

interface NavbarProps {
  forceSolid?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ forceSolid = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sobre a Tecsoft', path: '/sobre' },
    { name: 'Nossos Serviços', path: '/servicos' },
    { name: 'Cursos e Capacitação', path: '/cursos' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        forceSolid || isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo com animação */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-lg">T</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-accent-500">
                  TECSOFT
                </h1>
                <p className="text-xs text-graphite/70 -mt-1">
                  Centro de Tecnologia e Software
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation com microanimações */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  to={item.path}
                  className={`menu-item relative font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-secondary-600'
                      : 'text-graphite/80 hover:text-secondary-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button com efeito de pulso */}
          <div className="hidden lg:block flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulse ripple"
              >
                Associe-se
              </a>
            </motion.div>
            
            {/* Link discreto para o painel administrativo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/admin/login"
                className="text-xs text-graphite/50 hover:text-secondary-600 transition-colors px-2 py-1 rounded"
                title="Painel Administrativo"
              >
                Admin
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button com animação */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-graphite/80 hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation com animações */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <motion.div 
                className="px-4 py-6 space-y-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      open: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.3
                        }
                      },
                      closed: {
                        opacity: 0,
                        x: -20,
                        transition: {
                          duration: 0.2
                        }
                      }
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'text-secondary-600 bg-primary-50 border-l-4 border-accent-500'
                          : 'text-graphite/80 hover:text-secondary-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.3,
                        delay: 0.6
                      }
                    },
                    closed: {
                      opacity: 0,
                      y: 20,
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                  className="pt-4 border-t border-gray-200"
                >
                  <a
                    href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="btn-pulse w-full text-center ripple"
                  >
                    Associe-se
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
