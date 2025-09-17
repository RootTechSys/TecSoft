import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Assembly: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <UserGroupIcon className="w-4 h-4 mr-2" />
              Assembleia Geral
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Participe das <span className="text-blue-200">decisões importantes</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Sua participação é fundamental para o futuro do TECSOFT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Event Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Reuniões Simultâneas
                </h2>
                <p className="text-lg text-gray-600">
                  Conselho Deliberativo e Assembleia Geral Extraordinária
                </p>
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Data</h3>
                  <p className="text-gray-600">03 de outubro de 2025</p>
                  <p className="text-sm text-gray-500">(sexta-feira)</p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Horário</h3>
                  <p className="text-gray-600">08:45 às 09:45</p>
                  <p className="text-sm text-gray-500">Google Meet</p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <MapPinIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Local</h3>
                  <p className="text-gray-600">Online</p>
                  <a 
                    href="https://meet.google.com/irm-copx-kgy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Acessar reunião
                  </a>
                </div>
              </div>

              {/* Meeting Link */}
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Link da Reunião</h3>
                <a 
                  href="https://meet.google.com/irm-copx-kgy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  Entrar na Reunião
                </a>
              </div>
            </motion.div>

            {/* Assembly Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Assembleia Geral Extraordinária
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Convocação</h3>
                  <p className="text-gray-700 leading-relaxed">
                    O Presidente do Conselho Deliberativo do TECSOFT, em conformidade com o previsto no Estatuto Social 
                    em seu Artigo 14º, parágrafo 1º e Artigo 16º, parágrafo 1º, convoca os associados para a realização 
                    de Assembleia Geral Extraordinária.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Horários de Convocação</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-1">Primeira Convocação</h4>
                      <p className="text-gray-700">08:45 - 2/3 dos associados votantes</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-1">Segunda Convocação</h4>
                      <p className="text-gray-700">09:15 - Qualquer número de associados</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pauta</h3>
                  <div className="space-y-2">
                    {[
                      'Aprovar a relação de associados, novos e recadastrados',
                      'Aprovar a recondução dos membros do Conselho Deliberativo e a indicação de novos membros',
                      'Aprovar a indicação dos membros da Diretoria',
                      'Aprovar a instituição da comissão de reforma de Estatuto',
                      'Assuntos Gerais'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Documents Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Documentos Oficiais
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.a
                  href="/Convoca%C3%A7%C3%A3o%20Reuniao%20do%20CD%2003-10-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <DocumentTextIcon className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Conselho Deliberativo</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Convocação para Reunião Extraordinária do Conselho Deliberativo
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                    <span className="font-medium">Baixar PDF</span>
                  </div>
                </motion.a>

                <motion.a
                  href="/Convoca%C3%A7%C3%A3o%20AGE%2003-10-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <DocumentTextIcon className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Assembleia Geral</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Convocação para Assembleia Geral Extraordinária
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                    <span className="font-medium">Baixar PDF</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Informação Importante
                  </h3>
                  <p className="text-yellow-700">
                    A Diretoria enviará em tempo hábil os documentos necessários à deliberação dos temas mencionados.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center text-gray-600"
            >
              <p className="mb-2">Brasília, 19 de setembro de 2025</p>
              <p className="font-semibold">JAIRO FONSECA DA SILVA</p>
              <p>Presidente do Conselho Deliberativo</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assembly;
