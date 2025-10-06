import React from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Sobre o
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Evento
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Organizadores */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Organizadores</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O evento é organizado pela <strong className="text-cyan-400">TecSoft</strong>, uma empresa líder em 
                tecnologia e inovação, em parceria com a <strong className="text-purple-400">Finatec</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                  <span className="text-gray-300">TecSoft - Tecnologia e Inovação</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-gray-300">Finatec - Fundação de Apoio à Pesquisa</span>
                </div>
              </div>
            </motion.div>

            {/* História */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Nossa História</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Desde 2020, o <strong className="text-cyan-400">Open Connections</strong> tem sido o principal 
                evento de tecnologia da região, reunindo profissionais, estudantes e entusiastas da área. 
                Em 2024, unimos forças com o <strong className="text-purple-400">InCoDay</strong> para criar 
                uma experiência ainda mais rica e diversificada.
              </p>
            </motion.div>
          </div>

          {/* Parceiros */}
          <motion.div
            className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Nossos Parceiros</h2>
              <p className="text-gray-300 text-lg">Empresas que acreditam na inovação e no futuro da tecnologia</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Microsoft", logo: "🔷" },
                { name: "Google Cloud", logo: "🌐" },
                { name: "Amazon AWS", logo: "☁️" },
                { name: "IBM", logo: "🔵" },
                { name: "Oracle", logo: "🔴" },
                { name: "Salesforce", logo: "⚡" },
                { name: "Adobe", logo: "🎨" },
                { name: "Intel", logo: "💻" }
              ].map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{partner.logo}</span>
                  </div>
                  <p className="text-gray-300 font-medium">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Informações do Evento */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Data e Local */}
            <motion.div
              className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Data e Local</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-cyan-400 font-semibold mr-4">📅 Data:</span>
                  <span className="text-gray-300 text-lg">11-12 de Novembro de 2024</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 font-semibold mr-4">📍 Local:</span>
                  <span className="text-gray-300 text-lg">Finatec - Brasília/DF</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 font-semibold mr-4">🕐 Horário:</span>
                  <span className="text-gray-300 text-lg">8h às 18h</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 font-semibold mr-4">💻 Formato:</span>
                  <span className="text-gray-300 text-lg">Híbrido (Presencial + Online)</span>
                </div>
              </div>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Números do Evento</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                  <div className="text-gray-300">Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">30+</div>
                  <div className="text-gray-300">Palestrantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">20+</div>
                  <div className="text-gray-300">Workshops</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">48h</div>
                  <div className="text-gray-300">de Conteúdo</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;


