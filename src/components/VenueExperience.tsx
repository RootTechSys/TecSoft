import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Hotspot {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  position: { x: number; y: number };
  activities: string[];
  color: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const VenueExperience: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 1,
      name: 'Sebrae Lab',
      description: 'Espaço de inovação e empreendedorismo',
      icon: BuildingOfficeIcon,
      position: { x: 20, y: 30 },
      activities: ['Workshops', 'Mentorias', 'Networking'],
      color: '#E7C8A1'
    },
    {
      id: 2,
      name: 'Auditório Principal',
      description: 'Palestras e apresentações principais',
      icon: UserGroupIcon,
      position: { x: 50, y: 20 },
      activities: ['Palestras Magnas', 'Painéis', 'Abertura'],
      color: '#16B3A6'
    },
    {
      id: 3,
      name: 'Estandes',
      description: 'Demonstrações e exposições',
      icon: MapPinIcon,
      position: { x: 80, y: 60 },
      activities: ['Exposições', 'Demonstrações', 'Networking'],
      color: '#B6C3D1'
    }
  ];

  const steps: Step[] = [
    {
      number: 1,
      title: 'Credenciamento',
      description: 'Receba seu kit de participante e credencial',
      icon: UserGroupIcon
    },
    {
      number: 2,
      title: 'Exploração',
      description: 'Navegue pelos espaços e conheça os participantes',
      icon: MapPinIcon
    },
    {
      number: 3,
      title: 'Conexões',
      description: 'Participe das atividades e faça networking',
      icon: ClockIcon
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
            Local e Experiência
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Conheça os espaços e viva uma experiência única de inovação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h3 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: '#E7C8A1' }}
            >
              Mapa Interativo
            </h3>

            {/* Map Container */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border-2" style={{ borderColor: '#16B3A6' }}>
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316B3A6' fill-opacity='0.1'%3E%3Cpath d='M20 20h8v8h8v8h-8v8h-8v-8h-8v-8h8v-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  className="absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${hotspot.position.x}%`,
                    top: `${hotspot.position.y}%`,
                    backgroundColor: hotspot.color,
                    boxShadow: `0 0 20px ${hotspot.color}50`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <hotspot.icon className="h-6 w-6 text-slate-800" />
                </motion.button>
              ))}

              {/* Venue Info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(12, 35, 64, 0.9)' }}>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5" style={{ color: '#16B3A6' }} />
                  <span className="text-sm font-medium" style={{ color: '#EAF2FB' }}>
                    FINATEC - Sede da Finatec-UnB
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#B6C3D1' }}>
                  Brasília, DF - 11-12 de Novembro de 2025
                </p>
              </div>
            </div>

            {/* Hotspot Details */}
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 rounded-2xl border-2"
                style={{
                  backgroundColor: 'rgba(12, 35, 64, 0.8)',
                  borderColor: selectedHotspot.color
                }}
              >
                <h4 
                  className="text-xl font-bold mb-2"
                  style={{ color: selectedHotspot.color }}
                >
                  {selectedHotspot.name}
                </h4>
                <p 
                  className="text-sm mb-4"
                  style={{ color: '#B6C3D1' }}
                >
                  {selectedHotspot.description}
                </p>
                <div>
                  <h5 
                    className="text-sm font-semibold mb-2"
                    style={{ color: '#E7C8A1' }}
                  >
                    Atividades:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedHotspot.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: 'rgba(22, 179, 166, 0.2)',
                          color: '#16B3A6',
                          border: '1px solid rgba(22, 179, 166, 0.3)'
                        }}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Visitor Journey */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: '#E7C8A1' }}
            >
              Trilha do Visitante
            </h3>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  {/* Step Number */}
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
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

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 
                      className="text-lg font-bold mb-2"
                      style={{ color: '#E7C8A1' }}
                    >
                      {step.title}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#B6C3D1' }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Step Icon */}
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(22, 179, 166, 0.2)',
                      color: '#16B3A6'
                    }}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <motion.a
                href="#inscrever"
                className="inline-flex items-center px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
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
                Garantir Minha Vaga
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueExperience;
