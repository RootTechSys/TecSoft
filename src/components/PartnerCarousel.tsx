import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlayIcon, 
  PauseIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
}

interface PartnerCarouselProps {
  partners: Partner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const PartnerCarousel: React.FC<PartnerCarouselProps> = ({
  partners,
  autoPlay = true,
  autoPlayInterval = 4000,
  showControls = true,
  showIndicators = true,
  className = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrar apenas parceiros ativos e ordenar
  const activePartners = partners
    .filter(partner => partner.isActive)
    .sort((a, b) => a.order - b.order);

  // Configurações responsivas
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 4;
    
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    if (width < 1280) return 3; // desktop pequeno
    return 4; // desktop grande
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Atualizar itemsPerSlide quando a tela redimensionar
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular número de slides
  const totalSlides = Math.ceil(activePartners.length / itemsPerSlide);

  // Funções de navegação
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  // Auto-play com pausa no hover
  useEffect(() => {
    if (isAutoPlaying && !isHovered && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, totalSlides, autoPlayInterval, nextSlide]);

  // Pausar auto-play quando usuário interage
  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Se não há parceiros suficientes para carrossel, mostrar grid simples
  if (activePartners.length <= itemsPerSlide) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`grid gap-6 w-full max-w-7xl mx-auto ${className}`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(activePartners.length, 4)}, 1fr)`
        }}
      >
        {activePartners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-xl transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center"
          >
            {/* Logo Container */}
            <div className="w-20 h-16 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Nome do Parceiro */}
            <h3 className="text-gray-800 font-semibold text-center text-sm group-hover:text-blue-600 transition-colors duration-300">
              {partner.name}
            </h3>

            {/* Link externo se disponível */}
            {partner.websiteUrl && (
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 hover:text-blue-500" />
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Obter parceiros do slide atual
  const getCurrentSlidePartners = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return activePartners.slice(startIndex, endIndex);
  };

  const currentSlidePartners = getCurrentSlidePartners();

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-7xl mx-auto ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carrossel Container */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid gap-6 w-full"
            style={{
              gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`
            }}
          >
            {currentSlidePartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-xl transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center"
              >
                {/* Logo Container */}
                <div className="w-20 h-16 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Nome do Parceiro */}
                <h3 className="text-gray-800 font-semibold text-center text-sm group-hover:text-blue-600 transition-colors duration-300">
                  {partner.name}
                </h3>

                {/* Link externo se disponível */}
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de Navegação */}
      {showControls && totalSlides > 1 && (
        <>
          {/* Botão Anterior */}
          <motion.button
            onClick={() => {
              prevSlide();
              handleUserInteraction();
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 border border-gray-200/50 hover:border-blue-300/50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Slide anterior"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.button>
          
          {/* Botão Próximo */}
          <motion.button
            onClick={() => {
              nextSlide();
              handleUserInteraction();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 border border-gray-200/50 hover:border-blue-300/50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Próximo slide"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Indicadores de Slide */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                goToSlide(index);
                handleUserInteraction();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-600 scale-125 shadow-md'
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Controle de Auto-play */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={toggleAutoPlay}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAutoPlaying ? 'Pausar carrossel' : 'Retomar carrossel'}
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-semibold">
              {isAutoPlaying ? 'Pausar' : 'Retomar'}
            </span>
          </motion.button>
        </div>
      )}

      {/* Contador de Slides */}
      {totalSlides > 1 && (
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-gray-200/50 shadow-sm">
            {currentSlide + 1} de {totalSlides}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default PartnerCarousel;