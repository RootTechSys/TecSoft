import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  LightBulbIcon,
  CodeBracketIcon,
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ArrowRightIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AgendaNavigable from '../components/AgendaNavigable';
import HolographicHero from '../components/HolographicHero';
import WhyParticipate from '../components/WhyParticipate';
import Speakers from '../components/Speakers';
import BrafipCall from '../components/BrafipCall';
import Partners from '../components/Partners';
import VenueExperience from '../components/VenueExperience';
import FAQContact from '../components/FAQContact';
import ConversionFooter from '../components/ConversionFooter';

const OpenConnections: React.FC = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);


  const workshops = [
    {
      title: 'Gestão de Ideias para a Inovação - Modelo MGPDI',
      instructor: 'Cristina Filipak Machado (QualityFocus)',
      schedule: 'Dias 11 e 12 de novembro, 19:00 às 22:00',
      icon: LightBulbIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Gestão da Colaboração para a Inovação - Modelo MGPDI',
      instructor: 'José Antônio Antonioni (Softsul) e Kival Weber (MGDPI)',
      schedule: 'Dias 11 e 12 de novembro, 19:00 às 22:00',
      icon: UserGroupIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Inovação Aberta - Gerência de Projetos Inovadores usando Métodos Ágeis',
      instructor: 'Rodrigo Quites Reis (UFPA)',
      schedule: 'Dias 11 e 12 de novembro, 19:00 às 22:00',
      icon: CodeBracketIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Como elaborar projetos de captação de recursos para Inovação',
      instructor: 'Membro da equipe técnica do Tecsoft',
      schedule: 'Dias 11 e 12 de novembro, 19:00 às 22:00',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'IA Generativa como alavancador de negócios - Como planejar sistemas de LLM',
      instructor: 'Consultor especializado em IA',
      schedule: 'Dias 11 e 12 de novembro, 19:00 às 22:00',
      icon: AcademicCapIcon,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const speakers = [
    'Camilo Mussi (MAPA)',
    'Fernando Ribeiro (FINEP)',
    'Humberto Ribeiro (CyberLab)',
    'Raulison Resende (Instituto Hosp. Alberto Einstein)',
    'Marcelo Boarin (A5 Solution)',
    'Roberto Mayer (BRAFIP)',
    'Fabio Pagani (representante Austrália)',
    'Hélio Ciffoni (representante Japão)',
    'Fernando Carrello (representante USA)',
    'Márcio Canedo (EEN-IBICT)'
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-blue-900 to-teal-800">
      {/* Sticky Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 z-50"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
      />
      
      {/* Sticky CTA Bar */}
      <motion.div 
        className={`fixed top-4 right-4 z-40 transition-all duration-300 ${
          scrollProgress > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
          {scrollProgress > 50 ? 'Garantir Vaga' : 'Inscrever-se'}
          <ArrowRightIcon className="inline-block ml-2 h-4 w-4" />
        </button>
      </motion.div>

      {/* Hero Section with Holographic Mesh + Plus Beacons */}
      <HolographicHero />

      {/* Why Participate Section */}
      <WhyParticipate />

      {/* Speakers Section */}
      <Speakers />

      {/* BRAFIP Call Section */}
      <BrafipCall />

      {/* Partners Section */}
      <Partners />

      {/* Venue Experience Section */}
      <VenueExperience />

      {/* FAQ and Contact Section */}
      <FAQContact />

      {/* Conversion Footer */}
      <ConversionFooter />

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              De 2017 a 2024
            </h2>
            <p className="text-xl text-gray-300">
              Uma jornada de inovação e conexões pelo mundo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: '2017', city: 'Brasília', participants: '150+', theme: 'Inovação Local' },
              { year: '2019', city: 'São Paulo', participants: '300+', theme: 'Escala Nacional' },
              { year: '2021', city: 'Virtual', participants: '500+', theme: 'Transformação Digital' },
              { year: '2024', city: 'Lisboa', participants: '800+', theme: 'Conectividade Global' }
            ].map((edition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-600 hover:border-cyan-400/50 h-full">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">{edition.year}</div>
                    <div className="text-xl font-semibold text-white mb-2">{edition.city}</div>
                    <div className="text-cyan-400 font-bold text-lg mb-2">{edition.participants}</div>
                    <div className="text-gray-300 text-sm">{edition.theme}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl p-8 border border-amber-500/30">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Lisboa 2026 Previsto</h3>
              <p className="text-gray-300 text-lg">
                A próxima edição internacional já está sendo planejada para conectar ainda mais inovadores globais
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agenda Navegável - Componente Independente */}
      <AgendaNavigable />

      {/* Workshops Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mini-cursos e Workshops
            </h2>
            <p className="text-xl text-gray-300">
              Capacitação no Open Connections - Programação intensa de capacitações e treinamentos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-600 hover:border-cyan-400/50 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${workshop.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <workshop.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {workshop.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <UserGroupIcon className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{workshop.instructor}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ClockIcon className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{workshop.schedule}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Palestrantes Confirmados
            </h2>
            <p className="text-xl text-gray-300">
              Especialistas e atores de sucesso no mercado de inovação
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-600 hover:border-cyan-400/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <StarIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">
                      {speaker}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* BRAFIP Call for Ideas Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Chamada de Ideias BRAFIP
            </h2>
            <p className="text-xl text-gray-300">
              Submeta sua ideia inovadora e participe do processo de seleção
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Submissão', description: 'Envie sua ideia através do formulário online', icon: LightBulbIcon },
              { step: 2, title: 'Avaliação', description: 'Nossa equipe analisa e seleciona as melhores propostas', icon: ChartBarIcon },
              { step: 3, title: 'Seleção', description: 'Ideias selecionadas são convidadas para o Pitch Day', icon: TrophyIcon },
              { step: 4, title: 'Apresentação', description: 'Apresente sua ideia no evento e conecte-se com investidores', icon: UserGroupIcon }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 shadow-2xl border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400 mb-2">{step.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRightIcon className="h-6 w-6 text-amber-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
              Submeter Ideia
              <ArrowRightIcon className="inline-block ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Apoios e Parceiros
            </h2>
            <p className="text-xl text-gray-300">
              Instituições que apoiam a inovação e o desenvolvimento tecnológico
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'FINATEC/UnB', description: 'Fundação de Empreendimentos Científicos e Tecnológicos', logo: '🏛️' },
              { name: 'BRAFIP', description: 'Associação Brasileira de Fomento à Inovação', logo: '🤝' },
              { name: 'TECSOFT', description: 'Centro de Tecnologia de Software de Brasília', logo: '💻' }
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 border border-slate-600 hover:border-amber-400/50 h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{partner.logo}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{partner.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Garante Sua Vaga
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Não perca a oportunidade de participar do maior evento de inovação do Distrito Federal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Conteúdo Aplicável', description: 'Aprenda com especialistas e aplique imediatamente em seu negócio', icon: AcademicCapIcon },
              { title: 'Conexões Estratégicas', description: 'Conecte-se com investidores, parceiros e mentores', icon: UserGroupIcon },
              { title: 'Oportunidades de Pitch', description: 'Apresente sua ideia e receba feedback de especialistas', icon: TrophyIcon }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl border border-slate-600">
              <h3 className="text-2xl font-bold text-white mb-6">Inscreva-se Agora</h3>
              <p className="text-gray-300 mb-6">
                Vagas limitadas. Garanta sua participação no Open Connections + InCoDay 2025
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
                  Inscrever-se
                  <ArrowRightIcon className="inline-block ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300">
                  Baixar Programação
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                * Agenda sujeita a alterações. Consulte o site oficial para atualizações.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCalendarModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Adicionar ao Calendário</h3>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Open Connections + InCoDay 2025</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-amber-400" />
                    <span>11 e 12 de Novembro de 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-amber-400" />
                    <span>08:30 às 17:30</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-amber-400" />
                    <span>Parque Tecnológico Biotic / Sebrae Lab</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  Adicionar ao Google Calendar
                </button>
                <button className="w-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  Baixar .ics
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">TECSOFT</h3>
              <p className="text-gray-300 mb-4">
                Centro de Tecnologia de Software de Brasília, criado em 1993 para promover 
                o setor de TI e incentivar a inovação.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">BRAFIP</h3>
              <p className="text-gray-300 mb-4">
                Associação Brasileira de Fomento à Inovação em Plataformas Tecnológicas, 
                criada em 2015 para articular consórcios colaborativos de PD&I.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
              <div className="space-y-2 text-gray-300">
                <p>📧 contato@tecsoft.org.br</p>
                <p>📱 (61) 99999-9999</p>
                <p>📍 Parque Tecnológico Biotic / Sebrae Lab</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Open Connections + InCoDay. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OpenConnections;
