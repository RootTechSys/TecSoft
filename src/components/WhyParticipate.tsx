import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChartBarIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface BenefitCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  benefits: string[];
  color: string;
}

const WhyParticipate: React.FC = () => {
  const benefits: BenefitCard[] = [
    {
      icon: AcademicCapIcon,
      title: 'Conteúdo Aplicável',
      description: 'Aprenda com especialistas e metodologias comprovadas',
      benefits: [
        'Metodologias MGPDI em gestão de ideias',
        'Design Thinking e métodos ágeis',
        'Cases reais de inovação',
        'Ferramentas práticas de implementação'
      ],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Networking de Alto Nível',
      description: 'Conecte-se com líderes e inovadores',
      benefits: [
        'Executivos de grandes empresas',
        'Empreendedores de sucesso',
        'Especialistas em inovação',
        'Investidores e aceleradoras'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: LightBulbIcon,
      title: 'Oportunidades de Negócio',
      description: 'Transforme ideias em projetos reais',
      benefits: [
        'Rodada de negócios exclusiva',
        'Pitch para investidores',
        'Parcerias estratégicas',
        'Acesso a recursos e mentoria'
      ],
      color: 'from-teal-500 to-emerald-500'
    }
  ];

  return (
    <section 
      className="py-20"
      style={{
        backgroundColor: '#0C2340',
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
            Por que participar?
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Três pilares fundamentais para sua jornada de inovação
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                className="relative h-full p-8 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(12, 35, 64, 0.8)',
                  borderColor: '#16B3A6',
                  borderWidth: '1px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(231, 200, 161, 0.3)',
                  borderColor: '#E7C8A1'
                }}
              >
                {/* Microglow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(231, 200, 161, 0.1) 0%, rgba(22, 179, 166, 0.1) 100%)',
                    filter: 'blur(1px)'
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color})`,
                      boxShadow: '0 4px 15px rgba(22, 179, 166, 0.3)'
                    }}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Feixe de conexão */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, #E7C8A1 50%, transparent 100%)',
                      boxShadow: '0 0 10px rgba(231, 200, 161, 0.5)'
                    }}
                    initial={{ scaleX: 0, x: -20 }}
                    whileHover={{ 
                      scaleX: 1, 
                      x: 0,
                      transition: { duration: 0.4 }
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#E7C8A1' }}
                  >
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="text-lg mb-6"
                    style={{ color: '#B6C3D1' }}
                  >
                    {benefit.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3">
                    {benefit.benefits.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: '#16B3A6' }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: '#EAF2FB' }}
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#inscrever"
            className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
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
            Garantir minha vaga
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyParticipate;
