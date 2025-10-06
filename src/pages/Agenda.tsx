import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';

const Agenda: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2'>('day1');

  const schedule = {
    day1: [
      {
        time: '08:00 - 09:00',
        title: 'Credenciamento e Welcome Coffee',
        speaker: 'Equipe Organizadora',
        type: 'networking',
        description: 'Recepção dos participantes com coffee break e networking inicial'
      },
      {
        time: '09:00 - 09:30',
        title: 'Abertura Oficial',
        speaker: 'Diretoria TecSoft',
        type: 'opening',
        description: 'Boas-vindas e apresentação do evento'
      },
      {
        time: '09:30 - 10:30',
        title: 'O Futuro da Inteligência Artificial',
        speaker: 'Dr. Maria Silva - Microsoft',
        type: 'keynote',
        description: 'Tendências e inovações em IA que estão transformando o mundo'
      },
      {
        time: '10:30 - 11:00',
        title: 'Coffee Break',
        speaker: '',
        type: 'break',
        description: 'Networking e exposição de patrocinadores'
      },
      {
        time: '11:00 - 12:00',
        title: 'Cloud Computing: Estratégias e Melhores Práticas',
        speaker: 'João Santos - Amazon AWS',
        type: 'technical',
        description: 'Como migrar e otimizar aplicações na nuvem'
      },
      {
        time: '12:00 - 13:30',
        title: 'Almoço',
        speaker: '',
        type: 'break',
        description: 'Almoço de networking com patrocinadores'
      },
      {
        time: '13:30 - 14:30',
        title: 'Desenvolvimento Mobile: React Native vs Flutter',
        speaker: 'Ana Costa - Google',
        type: 'technical',
        description: 'Comparativo entre as principais tecnologias mobile'
      },
      {
        time: '14:30 - 15:30',
        title: 'Workshop: Introdução ao Machine Learning',
        speaker: 'Prof. Carlos Lima - IBM',
        type: 'workshop',
        description: 'Hands-on de ML com Python e TensorFlow'
      },
      {
        time: '15:30 - 16:00',
        title: 'Coffee Break',
        speaker: '',
        type: 'break',
        description: 'Networking e exposição de patrocinadores'
      },
      {
        time: '16:00 - 17:00',
        title: 'Segurança Cibernética: Desafios Atuais',
        speaker: 'Pedro Oliveira - Oracle',
        type: 'security',
        description: 'Estratégias de proteção contra ameaças digitais'
      },
      {
        time: '17:00 - 18:00',
        title: 'Painel: O Futuro do Trabalho em Tech',
        speaker: 'Múltiplos palestrantes',
        type: 'panel',
        description: 'Discussão sobre carreira e tendências no mercado'
      }
    ],
    day2: [
      {
        time: '08:00 - 09:00',
        title: 'Credenciamento e Welcome Coffee',
        speaker: 'Equipe Organizadora',
        type: 'networking',
        description: 'Recepção dos participantes com coffee break'
      },
      {
        time: '09:00 - 10:00',
        title: 'InCoDay: O Poder do Conteúdo Digital',
        speaker: 'Lucas Ferreira - Adobe',
        type: 'keynote',
        description: 'Como criar conteúdo impactante na era digital'
      },
      {
        time: '10:00 - 11:00',
        title: 'Networking Estratégico para Profissionais Tech',
        speaker: 'Marina Rodrigues - LinkedIn',
        type: 'networking',
        description: 'Técnicas para construir uma rede profissional sólida'
      },
      {
        time: '11:00 - 11:30',
        title: 'Coffee Break',
        speaker: '',
        type: 'break',
        description: 'Networking e exposição de patrocinadores'
      },
      {
        time: '11:30 - 12:30',
        title: 'Workshop: Design Thinking para Desenvolvedores',
        speaker: 'Sofia Almeida - Salesforce',
        type: 'workshop',
        description: 'Aplicando design thinking no desenvolvimento de software'
      },
      {
        time: '12:30 - 14:00',
        title: 'Almoço de Networking',
        speaker: '',
        type: 'networking',
        description: 'Almoço especial com rodadas de networking dirigido'
      },
      {
        time: '14:00 - 15:00',
        title: 'Parcerias Estratégicas em Tech',
        speaker: 'Roberto Silva - Intel',
        type: 'business',
        description: 'Como estabelecer parcerias de sucesso no setor'
      },
      {
        time: '15:00 - 16:00',
        title: 'Workshop: Storytelling para Apresentações',
        speaker: 'Camila Santos - TEDx',
        type: 'workshop',
        description: 'Técnicas para apresentar ideias de forma envolvente'
      },
      {
        time: '16:00 - 16:30',
        title: 'Coffee Break',
        speaker: '',
        type: 'break',
        description: 'Networking final e exposição de patrocinadores'
      },
      {
        time: '16:30 - 17:30',
        title: 'Painel: Inovação e Empreendedorismo',
        speaker: 'Startups e Investidores',
        type: 'panel',
        description: 'Discussão sobre o ecossistema de inovação'
      },
      {
        time: '17:30 - 18:00',
        title: 'Encerramento e Próximos Passos',
        speaker: 'Diretoria TecSoft',
        type: 'closing',
        description: 'Fechamento do evento e anúncios para 2025'
      }
    ]
  };

  const getTypeColor = (type: string) => {
    const colors = {
      keynote: 'from-yellow-500 to-orange-500',
      technical: 'from-cyan-500 to-blue-500',
      workshop: 'from-green-500 to-emerald-500',
      networking: 'from-purple-500 to-pink-500',
      security: 'from-red-500 to-rose-500',
      business: 'from-indigo-500 to-purple-500',
      panel: 'from-teal-500 to-cyan-500',
      opening: 'from-amber-500 to-yellow-500',
      closing: 'from-gray-500 to-slate-500',
      break: 'from-gray-400 to-gray-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      keynote: '🎤',
      technical: '💻',
      workshop: '🔧',
      networking: '🤝',
      security: '🔒',
      business: '💼',
      panel: '👥',
      opening: '🎉',
      closing: '🏁',
      break: '☕'
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Agenda
              </span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Programação completa do Open Connections + InCoDay 2024
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6"></div>
          </motion.div>

          {/* Day Selector */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
              <button
                onClick={() => setSelectedDay('day1')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDay === 'day1'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dia 1 - 11 Nov
              </button>
              <button
                onClick={() => setSelectedDay('day2')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDay === 'day2'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dia 2 - 12 Nov
              </button>
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {schedule[selectedDay].map((session, index) => (
              <motion.div
                key={index}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-6">
                  {/* Time and Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(session.type)} rounded-xl flex items-center justify-center mb-2`}>
                      <span className="text-2xl">{getTypeIcon(session.type)}</span>
                    </div>
                    <div className="text-cyan-400 font-bold text-sm text-center">
                      {session.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {session.title}
                    </h3>
                    {session.speaker && (
                      <p className="text-purple-400 font-semibold text-lg mb-3">
                        {session.speaker}
                      </p>
                    )}
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  {/* Type Badge */}
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-4 py-2 bg-gradient-to-r ${getTypeColor(session.type)} text-white text-sm font-semibold rounded-full`}>
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl border border-white/20 p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Não perca esta oportunidade!
              </h2>
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                Garante sua vaga e faça parte desta experiência única de aprendizado e networking.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscrever-se Agora
                </motion.button>
                <motion.button 
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Baixar Programação
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;


