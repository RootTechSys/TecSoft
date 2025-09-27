import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  category: 'realizacao' | 'apoio' | 'parceiros';
  isHighlighted?: boolean;
}

const Partners: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners: Partner[] = [
    {
      id: 1,
      name: 'FINATEC/UnB',
      logo: '/api/placeholder/200/100',
      description: 'Fundação de Apoio à Pesquisa e Desenvolvimento',
      category: 'realizacao',
      isHighlighted: true
    },
    {
      id: 2,
      name: 'BRAFIP',
      logo: '/api/placeholder/200/100',
      description: 'Associação Brasileira de Fomento à Inovação em Plataformas Tecnológicas',
      category: 'realizacao',
      isHighlighted: true
    },
    {
      id: 3,
      name: 'TECSOFT',
      logo: '/api/placeholder/200/100',
      description: 'Centro de Tecnologia de Software de Brasília',
      category: 'realizacao',
      isHighlighted: true
    },
    {
      id: 4,
      name: 'MAPA',
      logo: '/api/placeholder/200/100',
      description: 'Ministério da Agricultura, Pecuária e Abastecimento',
      category: 'apoio'
    },
    {
      id: 5,
      name: 'FINEP',
      logo: '/api/placeholder/200/100',
      description: 'Financiadora de Estudos e Projetos',
      category: 'apoio'
    },
    {
      id: 6,
      name: 'CyberLab',
      logo: '/api/placeholder/200/100',
      description: 'Laboratório de Cibersegurança',
      category: 'apoio'
    },
    {
      id: 7,
      name: 'A5 Solution',
      logo: '/api/placeholder/200/100',
      description: 'Soluções em Tecnologia',
      category: 'parceiros'
    },
    {
      id: 8,
      name: 'Instituto Albert Einstein',
      logo: '/api/placeholder/200/100',
      description: 'Inovação em Saúde',
      category: 'parceiros'
    }
  ];

  const categories = {
    realizacao: {
      title: 'Realização',
      color: '#E7C8A1',
      bgColor: 'rgba(231, 200, 161, 0.1)'
    },
    apoio: {
      title: 'Apoio',
      color: '#16B3A6',
      bgColor: 'rgba(22, 179, 166, 0.1)'
    },
    parceiros: {
      title: 'Parceiros',
      color: '#B6C3D1',
      bgColor: 'rgba(182, 195, 209, 0.1)'
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(partners.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(partners.length / 3)) % Math.ceil(partners.length / 3));
  };

  return (
    <section 
      className="py-20"
      style={{
        backgroundColor: '#0E3D4E',
        color: '#EAF2FB'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Section Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
          </motion.div>

          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: '#E7C8A1',
              textShadow: '2px 2px 0 #0C2340, -1px -1px 0 #0C2340, 1px -1px 0 #0C2340, -1px 1px 0 #0C2340'
            }}
          >
            Parceiros e Apoios
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Instituições que tornam este evento possível
          </p>
        </motion.div>

        {/* Partners by Category */}
        {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
          const categoryPartners = partners.filter(partner => partner.category === categoryKey);
          
          return (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="flex items-center justify-center mb-8">
                <div 
                  className="px-6 py-3 rounded-full border-2"
                  style={{
                    borderColor: categoryInfo.color,
                    backgroundColor: categoryInfo.bgColor
                  }}
                >
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: categoryInfo.color }}
                  >
                    {categoryInfo.title}
                  </h3>
                </div>
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Partner Card */}
                    <motion.div
                      className="relative h-full p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(12, 35, 64, 0.8)',
                        borderColor: categoryInfo.color,
                        borderWidth: '2px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      whileHover={{
                        boxShadow: `0 0 20px ${categoryInfo.color}30`,
                        borderColor: '#E7C8A1'
                      }}
                    >
                      {/* Highlight Badge */}
                      {partner.isHighlighted && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: '#E7C8A1',
                            boxShadow: '0 4px 15px rgba(231, 200, 161, 0.4)'
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <StarIcon className="h-4 w-4 text-slate-800" />
                        </motion.div>
                      )}

                      {/* Logo */}
                      <div className="mb-6">
                        <div className="w-24 h-16 mx-auto rounded-lg overflow-hidden bg-white p-2">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h4 
                          className="text-lg font-bold mb-2"
                          style={{ color: '#E7C8A1' }}
                        >
                          {partner.name}
                        </h4>
                        
                        <p 
                          className="text-sm"
                          style={{ color: '#B6C3D1' }}
                        >
                          {partner.description}
                        </p>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${categoryInfo.bgColor} 0%, rgba(231, 200, 161, 0.1) 100%)`,
                          filter: 'blur(1px)'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: '#E7C8A1' }}
            >
              Quer ser nosso parceiro?
            </h3>
            
            <p 
              className="text-lg mb-8"
              style={{ color: '#B6C3D1' }}
            >
              Entre em contato e descubra como sua instituição pode participar
            </p>

            <motion.a
              href="#contato"
              className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
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
              Entrar em Contato
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
