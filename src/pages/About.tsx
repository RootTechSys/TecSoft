import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
  CpuChipIcon,
  CommandLineIcon,
  CubeIcon,
  ChartBarIcon,
  InformationCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import Timeline from '../components/Timeline';

const About: React.FC = () => {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  // Define o título da página
  useEffect(() => {
    document.title = 'Sobre a TECSOFT - Centro de Tecnologia e Software de Brasília';
  }, []);

  const objectives = [
    'Promover estudos e pesquisas na área de tecnologia e software',
    'Apoiar o desenvolvimento de soluções e tecnologias inovadoras',
    'Produzir e divulgar informações técnicas e científicas',
    'Fomentar a qualificação profissional no setor',
    'Apoiar o desenvolvimento de empresas de software',
    'Promover a inovação e competitividade do setor'
  ];

  const values = [
    {
      icon: UserGroupIcon,
      title: 'Colaboração',
      description: 'Trabalhamos em conjunto com empresas, instituições e profissionais para fortalecer o ecossistema de tecnologia.',
      tech: 'Open Source'
    },
    {
      icon: AcademicCapIcon,
      title: 'Excelência',
      description: 'Buscamos a excelência em todos os nossos serviços e capacitações, sempre com foco na qualidade.',
      tech: 'Best Practices'
    },
    {
      icon: LightBulbIcon,
      title: 'Inovação',
      description: 'Promovemos a inovação constante, incentivando novas ideias e soluções tecnológicas.',
      tech: 'R&D'
    },
    {
      icon: DocumentTextIcon,
      title: 'Transparência',
      description: 'Atuamos com transparência e ética, mantendo nossos associados sempre informados.',
      tech: 'Blockchain'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Profissionais Capacitados', tech: 'AI/ML' },
    { number: '150+', label: 'Empresas Associadas', tech: 'Cloud' },
    { number: '300+', label: 'Cursos Realizados', tech: 'DevOps' },
    { number: '32+', label: 'Anos de Experiência', tech: 'Innovation' }
  ];

  const timelineItems = [
    {
      year: '1993',
      title: 'Fundação do TECSOFT',
      description: 'Criação da sociedade civil sem fins lucrativos dedicada ao desenvolvimento do setor de tecnologia em Brasília. Participação de empresas, órgãos e governo local, o Tecsoft credenciou-se como agente regional do Programa Nacional de Software para Exportação - SOFTEX, e iniciou suas atividades no CDT/UnB.',
      tech: 'Foundation',
      highlight: true
    },
    {
      year: '1997',
      title: 'International Software Business Meeting - ISBM',
      description: 'Realização de rodada de negócios internacionais atraindo ao Brasil 10 publishers e representantes comerciais de software e serviços de TI para reuniões pré-agendadas com empresas brasileiras visando parcerias e aquisição de software.',
      tech: 'International'
    },
    {
      year: '1997',
      title: 'Estande Brasileiro na COMDEX Las Vegas',
      description: 'Realização, por delegação da SOFTEX, do estande brasileiro na feira mundial de TI Comdex Las Vegas, conduzida em parcerias com os agentes Softsul, Softex Campinas e ITS (São Paulo) o que se repetiu em 1998 e 1999.',
      tech: 'Global'
    },
    {
      year: '1997',
      title: 'Escritório do Vale do Silício',
      description: 'Abertura do escritório do Vale do Silício, em parceria com agentes Softsul, Softex Campinas e ITS (São Paulo), localizado em São Francisco-CA, que operou até o ano 2000.',
      tech: 'Silicon Valley'
    },
    {
      year: '1998',
      title: 'Mudança para Edifício Central Park',
      description: 'Início da primeira edição do curso de pós-graduação Gestão da Tecnologia da Informação, lançado em parceria com a UnB. Ocorreram ainda mais 5 edições deste curso, bem como cursos de Engenharia de Redes, Gestão da Informação e Gestão da Segurança da Informação, lançados em parceria com a UnB e com a Universidade Federal do Ceará.',
      tech: 'Education'
    },
    {
      year: '1999',
      title: 'Projeto BRAINS - Exportação de Software',
      description: 'Lançamento do projeto trianual de exportação de software e serviços de TI BRAINS - Brasília Intelligence in Software, com o apoio da APEX Brasil.',
      tech: 'Export'
    },
    {
      year: '2000',
      title: 'Reconhecimento como ICT',
      description: 'Reconhecimento como Instituto de Ciência e Tecnologia (ICT) pelo Ministério da Ciência, Tecnologia e Inovação (MCTI).',
      tech: 'ICT Recognition'
    },
    {
      year: '2001',
      title: 'Convênio com UNESCO',
      description: 'Criação da Universidade Corporativa do INSS.',
      tech: 'UNESCO Partnership'
    },
    {
      year: '2002',
      title: 'Convênio com Ministério da Defesa',
      description: 'Criação do PDTI do Ministério.',
      tech: 'Defense Partnership'
    },
    {
      year: '2004',
      title: 'Implantação de MPS.BR',
      description: 'Criação de grupos de empresas para aplicação coletiva da metodologia MPS.BR de qualidade de software em empresas brasilienses, com o apoio do Sebrae-DF. Três grupos criados, a partir de 2004 a 2008.',
      tech: 'MPS.BR Quality'
    },
    {
      year: '2006',
      title: 'Convênio com Sebrae Nacional - PROIMPE',
      description: 'Criação do Projeto Nacional de TI para as MPEs.',
      tech: 'Sebrae Partnership'
    },
    {
      year: '2007',
      title: 'Contrato com Banco do Brasil',
      description: 'Treinamento e aperfeiçoamento de pessoal em "SOA e WEB Services em Java".',
      tech: 'BB Training'
    },
    {
      year: '2010',
      title: 'Convênio com Secretaria de Educação de Pernambuco',
      description: 'Projeto para elaboração de diagnóstico, proposta de padronização e plano de ação para implantação da TI aplicada à educação em todo o estado de Pernambuco.',
      tech: 'Education Tech'
    },
    {
      year: '2014',
      title: 'Contrato com Sebrae MT',
      description: 'Projeto de mapeamento dos processos internos do Sebrae MT e desenvolvimento de ferramenta de workflow especialista.',
      tech: 'Process Mapping'
    },
    {
      year: '2018',
      title: 'Desenvolvimento de Aplicativos',
      description: 'Convênio com o Sebrae-DF para desenvolvimento de aplicativos para pequenas empresas do DF.',
      tech: 'App Development'
    },
    {
      year: '2019',
      title: 'Convênio com FAP-DF',
      description: 'Com base no MROSC, credenciamento junto à FAP-DF para desenvolvimento de projetos de interesse das partes, sem necessidade de edital específico.',
      tech: 'FAP-DF Partnership'
    },
    {
      year: '2019',
      title: 'Ambiente Físico no BIOTIC',
      description: 'Sala para execução de projetos no Parque Tecnológico de Brasília - BIOTIC. Encerrada em 2022.',
      tech: 'BIOTIC Space'
    },
    {
      year: '2021',
      title: 'Planejamento do Ecossistema de Inovação do DF',
      description: 'Elaboração da Fundação Certi, a pedido da FAP-DF.',
      tech: 'Innovation Ecosystem'
    },
    {
      year: '2021',
      title: 'Manifesto do Setor de TI do DF',
      description: 'Participação da elaboração do Manifesto do Setor de TI do DF, em conjunto com as entidades de TI no DF.',
      tech: 'TI Manifesto'
    },
    {
      year: '2023-2025',
      title: 'Participação no GFORTI e SebraeLab',
      description: 'Participação no GFORTI (Grupo de Fortalecimento do Setor de TI do DF) e no Comitê Gestor do SebraeLab.',
      tech: 'Future Growth',
      highlight: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden section-neutral tech-grid">
        {/* Tech Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-16 h-16 border-2 border-secondary-600/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-12 h-12 border-2 border-accent-500/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/4 w-8 h-8 bg-accent-500/10 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Tech Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-secondary-600/10 text-secondary-600 rounded-full text-sm font-medium mb-6"
            >
              <CpuChipIcon className="w-4 h-4 mr-2" />
              Sobre Nós
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              Sobre a <span className="heading-accent">TECSOFT</span>
            </h1>
            <p className="text-lg md:text-xl text-graphite/70 leading-relaxed max-w-3xl mx-auto">
              Uma sociedade civil sem fins lucrativos dedicada ao desenvolvimento 
              do setor de tecnologia e software em Brasília.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 section-contrast">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 text-graphite">
                Nossa <span className="heading-accent">Missão</span>
              </h2>
                          <p className="text-lg text-graphite/70 leading-relaxed mb-6">
              Desde 1993, trabalhamos pela melhoria da qualificação e desenvolvimento das empresas 
              de software e de seus colaboradores através da promoção de estudos e 
              pesquisas, desenvolvimento de tecnologias, produção e divulgação de 
              informações e conhecimentos técnicos e científicos. Como agente regional do SOFTEX, 
              contribuímos para o desenvolvimento do setor de tecnologia em Brasília e no Brasil.
            </p>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Acreditamos que o desenvolvimento tecnológico é fundamental para o 
                crescimento econômico e social de Brasília, e por isso dedicamos 
                nossos esforços para fortalecer este setor estratégico.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Video Container */}
              <div className="relative bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Video Placeholder - Substitua o src pelo seu vídeo */}
                <div className="relative aspect-video bg-gradient-to-br from-secondary-800 to-secondary-900">
                  {/* Video Element */}
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/placeholder-video.jpg"
                  >
                    <source src="/tecsoft-vision.mp4" type="video/mp4" />
                    <source src="/tecsoft-vision.webm" type="video/webm" />
                    {/* Fallback para navegadores que não suportam vídeo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <PlayIcon className="w-16 h-16 mx-auto mb-4 text-accent-400" />
                        <p className="text-lg font-semibold">Vídeo da Nossa Visão</p>
                        <p className="text-sm text-white/70">Clique para reproduzir</p>
                      </div>
                    </div>
                  </video>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-all duration-300 cursor-pointer group">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Tech Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-accent-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-accent-400" />
                  </div>
                </div>
                
                {/* Content Below Video */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold mb-4 text-white">Nossa Visão</h3>
                  <p className="text-lg leading-relaxed text-white/90 mb-4">
                    Ser referência nacional no desenvolvimento e fomento do setor de 
                    tecnologia e software, contribuindo para o crescimento econômico 
                    e social de Brasília através da inovação e capacitação profissional.
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-mono text-accent-300 bg-accent-500/20 px-3 py-1 rounded-full">
                      Strategic Vision
                    </span>
                    <span className="text-xs font-mono text-white/70 bg-white/10 px-3 py-1 rounded-full">
                      Innovation
                    </span>
                    <span className="text-xs font-mono text-white/70 bg-white/10 px-3 py-1 rounded-full">
                      Growth
                    </span>
                  </div>
                  
                  {/* Video Controls Info */}
                  <div className="flex items-center text-sm text-white/60">
                    <PlayIcon className="w-4 h-4 mr-2" />
                    <span>Vídeo interativo da nossa visão estratégica</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 section-neutral">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Nossa História
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-graphite">
              Linha do <span className="text-accent-600">Tempo</span>
            </h2>
            
            <p className="text-base md:text-lg text-graphite/70 max-w-2xl mx-auto mb-4">
              Nossa trajetória de 32+ anos no desenvolvimento da tecnologia em Brasília, com mais de 25 marcos históricos que moldaram o ecossistema de TI da capital federal
            </p>

            {/* Desktop CTA */}
            <Link to="/servicos" className="hidden md:inline-block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Nossos Serviços</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          <Timeline items={timelineItems} initialItems={6} />
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-12 md:py-16 section-contrast">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            {/* Left Side - Title */}
            <div className="flex items-center">
              <div className="inline-flex items-center px-3 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mr-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-ping" />
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                Nossos Objetivos
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite">
                  Resultados que <span className="text-accent-600">Impulsionam</span>
                </h2>
                <p className="text-sm text-graphite/60 mt-1">
                  Foco no desenvolvimento do setor de tecnologia
                </p>
              </div>
            </div>

            {/* Right Side - CTA */}
            <Link to="/servicos" className="hidden md:block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Nossos Serviços</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {objectives.map((objective, index) => (
              <motion.div
                key={objective}
                variants={itemVariants}
                className="card-3d p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-graphite/80 leading-relaxed">{objective}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 section-neutral">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            {/* Left Side - Title */}
            <div className="flex items-center">
              <div className="inline-flex items-center px-3 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mr-6">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-ping" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
                <span className="w-2 h-2 bg-violet-500 rounded-full mr-2" />
                Nossos Valores
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite">
                  Princípios que nos <span className="text-accent-600">Guiam</span>
                </h2>
                <p className="text-sm text-graphite/60 mt-1">
                  Ações e relacionamentos fundamentados em valores sólidos
                </p>
              </div>
            </div>

            {/* Right Side - CTA */}
            <Link to="/associar" className="hidden md:block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Faça Parte</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="card-3d p-6 text-center group relative"
                onMouseEnter={() => setActivePopover(value.title)}
                onMouseLeave={() => setActivePopover(null)}
              >
                <motion.div 
                  className="w-16 h-16 bg-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-graphite">
                  {value.title}
                </h3>
                <p className="text-graphite/70 text-sm leading-relaxed mb-4">
                  {value.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-accent-500/10 text-accent-600 rounded-full text-xs font-medium">
                  {value.tech}
                </div>

                {/* Popover informativo */}
                <AnimatePresence>
                  {activePopover === value.title && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-graphite text-white text-xs rounded-lg shadow-lg z-10 w-48"
                    >
                      <div className="flex items-center mb-1">
                        <InformationCircleIcon className="w-4 h-4 mr-1" />
                        <span className="font-semibold">Detalhes</span>
                      </div>
                      <p>Clique para saber mais sobre este valor e como o aplicamos em nossos projetos.</p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-graphite"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 section-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-xl text-white text-sm font-bold border border-white/20 shadow-md mb-4">
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
              Nossos Números
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-white">
              Resultados de <span className="text-accent-400">Impacto</span>
            </h2>
            
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-4">
              Compromisso demonstrado com o desenvolvimento do setor
            </p>

            {/* Desktop CTA */}
            <a 
              href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block"
            >
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Associe-se Agora</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </a>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div 
                  className="data-card bg-white/10 backdrop-blur-sm border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-display font-bold text-accent-500 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-white/90 text-sm md:text-base mb-2">
                    {stat.label}
                  </p>
                  <span className="text-xs font-mono text-accent-300 bg-accent-500/20 px-2 py-1 rounded">
                    {stat.tech}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="py-12 md:py-16 section-neutral">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            {/* Left Side - Title */}
            <div className="flex items-center">
              <div className="inline-flex items-center px-3 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mr-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-ping" />
                <span className="w-2 h-2 bg-lime-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
                <span className="w-2 h-2 bg-sky-500 rounded-full mr-2" />
                Estrutura Organizacional
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite">
                  Nossa <span className="text-accent-600">Governança</span>
                </h2>
                <p className="text-sm text-graphite/60 mt-1">
                  Como estamos organizados e estruturados
                </p>
              </div>
            </div>

            {/* Right Side - CTA */}
            <Link to="/contato" className="hidden md:block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Entre em Contato</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Diretoria */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6 text-graphite">
                Diretoria
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Diretor-presidente', name: 'Djalma Petit', tech: 'Leadership' },
                  { title: 'Diretor Vice-presidente', name: 'Ricardo Augusto Vilela do Nascimento', tech: 'Strategy' }
                ].map((member, index) => (
                  <motion.div 
                    key={member.title} 
                    className="card-3d p-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-graphite mb-2">{member.title}</h4>
                    <p className="text-graphite/70 mb-2">{member.name}</p>
                    <span className="text-xs font-mono text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                      {member.tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Conselho Deliberativo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6 text-graphite">
                Conselho Deliberativo
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Presidente', name: 'Jairo Fonseca da Silva', tech: 'Governance' },
                  { title: 'Vice-presidente', name: 'A indicar', tech: 'Pending' }
                ].map((member, index) => (
                  <motion.div 
                    key={member.title} 
                    className="card-3d p-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-graphite mb-2">{member.title}</h4>
                    <p className="text-graphite/70 mb-2">{member.name}</p>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      member.tech === 'Pending' 
                        ? 'text-amber-600 bg-amber-50' 
                        : 'text-secondary-600 bg-secondary-50'
                    }`}>
                      {member.tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statute Section */}
      <section className="py-12 md:py-16 section-contrast">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Estatuto Social
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-graphite">
              Documentos <span className="text-accent-600">Fundadores</span>
            </h2>
            
            <p className="text-base md:text-lg text-graphite/70 mb-6 max-w-2xl mx-auto">
              Regulamentos internos e base legal da organização
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/estatuto.pdf" 
                className="btn-pulse inline-flex items-center ripple"
                download
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Baixar Estatuto Social
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
