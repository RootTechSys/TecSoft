import React from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  background: string;
}

const BrafipCall: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Submissão da Ideia',
      description: 'Envie sua proposta de inovação através do formulário online',
      icon: LightBulbIcon,
      background: 'linear-gradient(45deg, rgba(22, 179, 166, 0.1) 0%, rgba(231, 200, 161, 0.1) 100%)'
    },
    {
      number: 2,
      title: 'Avaliação Técnica',
      description: 'Nossa equipe analisa a viabilidade e potencial de impacto',
      icon: DocumentTextIcon,
      background: 'linear-gradient(45deg, rgba(22, 179, 166, 0.1) 0%, rgba(12, 35, 64, 0.1) 100%)'
    },
    {
      number: 3,
      title: 'Pitch Day',
      description: 'Apresente sua ideia para investidores e especialistas',
      icon: CheckCircleIcon,
      background: 'linear-gradient(45deg, rgba(231, 200, 161, 0.1) 0%, rgba(22, 179, 166, 0.1) 100%)'
    },
    {
      number: 4,
      title: 'Implementação',
      description: 'Transforme sua ideia em projeto real com apoio técnico',
      icon: TrophyIcon,
      background: 'linear-gradient(45deg, rgba(12, 35, 64, 0.1) 0%, rgba(231, 200, 161, 0.1) 100%)'
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
            Chamada de Ideias BRAFIP
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Transforme sua ideia em projeto real em 4 passos simples
          </p>
        </motion.div>

        {/* Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step Card */}
              <motion.div
                className="relative h-full p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(12, 35, 64, 0.8)',
                  borderColor: '#E7C8A1',
                  borderWidth: '2px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  background: step.background
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(231, 200, 161, 0.3)',
                  borderColor: '#16B3A6'
                }}
              >
                {/* Step Number Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: '#E7C8A1',
                    color: '#0C2340',
                    boxShadow: '0 4px 15px rgba(231, 200, 161, 0.4)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #16B3A6 0%, #0E7C86 100%)',
                      boxShadow: '0 4px 15px rgba(22, 179, 166, 0.3)'
                    }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: '#E7C8A1' }}
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-sm"
                    style={{ color: '#B6C3D1' }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5"
                    style={{
                      backgroundColor: '#16B3A6',
                      boxShadow: '0 0 5px rgba(22, 179, 166, 0.3)'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  />
                )}
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
          <div className="max-w-2xl mx-auto">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: '#E7C8A1' }}
            >
              Pronto para submeter sua ideia?
            </h3>
            
            <p 
              className="text-lg mb-8"
              style={{ color: '#B6C3D1' }}
            >
              Participe da chamada e tenha a chance de apresentar sua ideia no Pitch Day
            </p>

            <motion.a
              href="#submeter"
              className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              style={{
                backgroundColor: '#E7C8A1',
                color: '#0C2340',
                boxShadow: '0 4px 14px 0 rgba(231, 200, 161, 0.3)',
                border: '2px solid #E7C8A1'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 6px 20px 0 rgba(231, 200, 161, 0.4)',
                backgroundColor: '#16B3A6',
                borderColor: '#16B3A6',
                color: '#EAF2FB'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Submeter Ideia
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </motion.a>

            <p 
              className="text-sm mt-4"
              style={{ color: '#B6C3D1' }}
            >
              Prazo: 15 de outubro de 2025
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrafipCall;
