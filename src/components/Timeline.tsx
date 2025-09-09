import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tech?: string;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  initialItems?: number;
}

const Timeline: React.FC<TimelineProps> = ({ items, initialItems = 8 }) => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [showAll, setShowAll] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  
  // Referência para o container da timeline
  const timelineRef = React.useRef<HTMLDivElement>(null);
  
  const displayedItems = showAll ? items : items.slice(0, initialItems);
  const hasMoreItems = items.length > initialItems;

  const handleToggle = () => {
    if (!showAll) {
      setIsExpanding(true);
      setTimeout(() => {
        setShowAll(true);
        setIsExpanding(false);
      }, 300);
    } else {
      setShowAll(false);
      // Scroll suave para manter a seção visível após contração
      setTimeout(() => {
        if (timelineRef.current) {
          timelineRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const expandButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.8 }
    }
  };

  return (
    <div ref={timelineRef} className="relative">
      <motion.div
        ref={elementRef}
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
      >
        {/* Linha central */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-600 to-accent-500"></div>
        
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative flex items-start"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Círculo na linha do tempo */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 transition-all duration-300 ${
                  item.highlight 
                    ? 'bg-secondary-600 scale-125' 
                    : 'bg-accent-500'
                }`}></div>
                
                {/* Conteúdo */}
                <div className="ml-16 flex-1">
                  <motion.div
                    className={`card-3d p-5 transition-all duration-300 ${
                      item.highlight 
                        ? 'ring-2 ring-secondary-500/30 bg-gradient-to-r from-white to-secondary-50/30' 
                        : ''
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xl font-bold ${
                        item.highlight ? 'text-secondary-600' : 'text-accent-600'
                      }`}>
                        {item.year}
                      </span>
                      {item.tech && (
                        <span className={`text-xs font-mono px-2 py-1 rounded ${
                          item.highlight 
                            ? 'text-secondary-700 bg-secondary-100' 
                            : 'text-secondary-600 bg-secondary-50'
                        }`}>
                          {item.tech}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-graphite leading-tight">{item.title}</h3>
                      {item.highlight && (
                        <span className="ml-2 px-2 py-1 bg-secondary-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                          ★ Destaque
                        </span>
                      )}
                    </div>
                    <p className="text-graphite/70 leading-relaxed text-sm">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Botão de Expansão */}
          {hasMoreItems && (
            <motion.div
              className="flex justify-center pt-8"
              variants={expandButtonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={handleToggle}
                className={`group flex items-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  showAll
                    ? 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-lg'
                    : 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-xl hover:shadow-2xl'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isExpanding}
              >
                {isExpanding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                ) : showAll ? (
                  <ChevronUpIcon className="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 mr-3 group-hover:translate-y-1 transition-transform" />
                )}
                
                {isExpanding 
                  ? 'Carregando...' 
                  : showAll 
                    ? 'Ver Menos' 
                    : `Ver Mais ${items.length - initialItems} Eventos`
                }
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;

