import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Speaker {
  id: number;
  name: string;
  title: string;
  organization: string;
  topic: string;
  time: string;
  track: string;
  image: string;
  isConfirmed: boolean;
}

const Speakers: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  const speakers: Speaker[] = [
    {
      id: 1,
      name: 'Camilo Mussi',
      title: 'Diretor de Inovação',
      organization: 'MAPA',
      topic: 'Inovação no Agronegócio',
      time: '10:00 - 11:00',
      track: 'Palestras',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    },
    {
      id: 2,
      name: 'Fernando Ribeiro',
      title: 'Coordenador de Projetos',
      organization: 'FINEP',
      topic: 'Financiamento à Inovação',
      time: '14:45 - 15:15',
      track: 'Negócios',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    },
    {
      id: 3,
      name: 'Humberto Ribeiro',
      title: 'Especialista em Cibersegurança',
      organization: 'CyberLab',
      topic: 'Segurança Digital',
      time: '15:45 - 16:45',
      track: 'Workshops',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    },
    {
      id: 4,
      name: 'Raulison Resende',
      title: 'Diretor de Inovação',
      organization: 'Instituto Hospital Albert Einstein',
      topic: 'Inovação em Saúde',
      time: '11:00 - 12:30',
      track: 'Palestras',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    },
    {
      id: 5,
      name: 'Marcelo Boarin',
      title: 'CEO',
      organization: 'A5 Solution',
      topic: 'Transformação Digital',
      time: '16:00 - 16:45',
      track: 'Pitches',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    },
    {
      id: 6,
      name: 'Roberto Mayer',
      title: 'Presidente',
      organization: 'BRAFIP',
      topic: 'Plataforma Tecnológica Brasileira',
      time: '09:00 - 10:00',
      track: 'Palestras',
      image: '/api/placeholder/200/200',
      isConfirmed: true
    }
  ];

  const tracks = ['all', 'Palestras', 'Workshops', 'Negócios', 'Pitches'];

  const filteredSpeakers = selectedTrack === 'all' 
    ? speakers 
    : speakers.filter(speaker => speaker.track === selectedTrack);

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
            Palestrantes Confirmados
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Especialistas e líderes em inovação compartilhando conhecimento
          </p>
        </motion.div>

        {/* Track Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tracks.map((track) => (
            <motion.button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTrack === track
                  ? 'border-2 shadow-lg'
                  : 'border border-slate-600 hover:border-slate-500'
              }`}
              style={{
                backgroundColor: selectedTrack === track ? '#E7C8A1' : 'transparent',
                color: selectedTrack === track ? '#0C2340' : '#B6C3D1',
                borderColor: selectedTrack === track ? '#E7C8A1' : '#16B3A6'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {track === 'all' ? 'Todos' : track}
            </motion.button>
          ))}
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Speaker Card */}
              <motion.div
                className="relative h-full p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
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
                {/* Hex Frame */}
                <div className="relative mb-6">
                  {/* Outer hex border */}
                  <div 
                    className="absolute inset-0 w-24 h-24 mx-auto"
                    style={{
                      border: '2px solid #16B3A6',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      transform: 'rotate(30deg)'
                    }}
                  />
                  
                  {/* Inner hex border */}
                  <div 
                    className="absolute inset-2 w-20 h-20 mx-auto"
                    style={{
                      border: '1px solid #E7C8A1',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      transform: 'rotate(30deg)'
                    }}
                  />

                  {/* Speaker Image */}
                  <div className="relative z-10 w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'grayscale(20%) contrast(1.1)'
                      }}
                    />
                  </div>

                  {/* Confirmed Badge */}
                  {speaker.isConfirmed && (
                    <div 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: '#E7C8A1',
                        color: '#0C2340'
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>

                {/* Speaker Info */}
                <div className="text-center">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: '#E7C8A1' }}
                  >
                    {speaker.name}
                  </h3>
                  
                  <p 
                    className="text-sm font-semibold mb-1"
                    style={{ color: '#16B3A6' }}
                  >
                    {speaker.title}
                  </p>
                  
                  <p 
                    className="text-sm mb-4"
                    style={{ color: '#B6C3D1' }}
                  >
                    {speaker.organization}
                  </p>

                  {/* Topic Badge */}
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                    style={{
                      backgroundColor: 'rgba(22, 179, 166, 0.2)',
                      color: '#16B3A6',
                      border: '1px solid rgba(22, 179, 166, 0.3)'
                    }}
                  >
                    {speaker.topic}
                  </div>

                  {/* Time and Track */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span 
                        className="text-xs"
                        style={{ color: '#B6C3D1' }}
                      >
                        {speaker.time}
                      </span>
                    </div>
                    
                    <div 
                      className="text-xs font-medium"
                      style={{ color: '#E7C8A1' }}
                    >
                      {speaker.track}
                    </div>
                  </div>
                </div>

                {/* Hover Effect - Topic Badge */}
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
          className="text-center mt-16"
        >
          <p 
            className="text-lg mb-6"
            style={{ color: '#B6C3D1' }}
          >
            Mais palestrantes serão confirmados em breve
          </p>
          
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
      </div>
    </section>
  );
};

export default Speakers;
