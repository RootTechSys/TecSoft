import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  UserGroupIcon,
  LightBulbIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const ConversionFooter: React.FC = () => {
  const benefits = [
    {
      icon: CheckCircleIcon,
      title: 'Conteúdo Aplicável',
      description: 'Metodologias e ferramentas que você pode usar imediatamente'
    },
    {
      icon: UserGroupIcon,
      title: 'Conexões Estratégicas',
      description: 'Networking com líderes e especialistas em inovação'
    },
    {
      icon: LightBulbIcon,
      title: 'Oportunidades de Pitch',
      description: 'Apresente sua ideia para investidores e aceleradoras'
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
            Não Perca Esta Oportunidade
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Garante sua vaga no maior evento de inovação do Distrito Federal
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Benefit Card */}
              <motion.div
                className="relative h-full p-8 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(12, 35, 64, 0.8)',
                  borderColor: '#16B3A6',
                  borderWidth: '2px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(231, 200, 161, 0.3)',
                  borderColor: '#E7C8A1'
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{
                      background: 'linear-gradient(135deg, #16B3A6 0%, #0E7C86 100%)',
                      boxShadow: '0 4px 15px rgba(22, 179, 166, 0.3)'
                    }}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: '#E7C8A1' }}
                  >
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="text-sm"
                    style={{ color: '#B6C3D1' }}
                  >
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(231, 200, 161, 0.1) 0%, rgba(22, 179, 166, 0.1) 100%)',
                    filter: 'blur(1px)'
                  }}
                />
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
          className="text-center"
        >
          <div className="max-w-4xl mx-auto">
            {/* Main CTA */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#inscrever"
                className="inline-flex items-center px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                style={{
                  backgroundColor: '#E7C8A1',
                  color: '#0C2340',
                  boxShadow: '0 8px 25px 0 rgba(231, 200, 161, 0.4)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 12px 35px 0 rgba(231, 200, 161, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <StarIcon className="mr-3 h-8 w-8" />
                Garantir Minha Vaga Agora
                <ArrowRightIcon className="ml-3 h-8 w-8" />
              </motion.a>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#agenda"
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
                Ver Programação Completa
              </motion.a>
            </motion.div>

            {/* Event Info */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#E7C8A1' }}
                >
                  2
                </div>
                <div 
                  className="text-sm"
                  style={{ color: '#B6C3D1' }}
                >
                  Dias de Evento
                </div>
              </div>
              
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#E7C8A1' }}
                >
                  20+
                </div>
                <div 
                  className="text-sm"
                  style={{ color: '#B6C3D1' }}
                >
                  Palestrantes
                </div>
              </div>
              
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#E7C8A1' }}
                >
                  100%
                </div>
                <div 
                  className="text-sm"
                  style={{ color: '#B6C3D1' }}
                >
                  Gratuito
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="text-sm"
              style={{ color: '#B6C3D1' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              viewport={{ once: true }}
            >
              * Agenda sujeita a alterações. Vagas limitadas.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionFooter;
