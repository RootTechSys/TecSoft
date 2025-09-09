import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  ChartBarIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  CogIcon,
  CpuChipIcon,
  CommandLineIcon,
  ArrowRightIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: ChartBarIcon,
      title: 'Consultoria e Planejamento',
      description: 'Assessoria especializada em tecnologia e software para empresas de todos os portes.',
      features: [
        'Análise de processos e otimização de sistemas',
        'Estratégia digital e transformação tecnológica',
        'Auditoria de sistemas e segurança da informação',
        'Planejamento de arquitetura de software',
        'Gestão de projetos de tecnologia',
        'Consultoria em inovação e pesquisa'
      ],
      tech: 'DevOps & CI/CD',
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100'
    },
    {
      icon: CodeBracketIcon,
      title: 'Desenvolvimento e Fomento',
      description: 'Apoio ao desenvolvimento de soluções tecnológicas e fomento à inovação.',
      features: [
        'Incubação de startups de tecnologia',
        'Mentoria técnica para empreendedores',
        'Acesso a recursos e infraestrutura',
        'Desenvolvimento de protótipos e MVPs',
        'Conectividade com investidores',
        'Programas de aceleração'
      ],
      tech: 'Full-Stack Development',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100'
    },
    {
      icon: AcademicCapIcon,
      title: 'Cursos e Capacitação',
      description: 'Formação profissional em tecnologia e software com metodologias atualizadas.',
      features: [
        'Cursos técnicos e especializações',
        'Workshops práticos e hands-on',
        'Certificações reconhecidas pelo mercado',
        'Treinamentos in-company',
        'Programas de capacitação contínua',
        'Mentoria individual e em grupo'
      ],
      tech: 'Interactive Learning',
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100'
    }
  ];

  const partnershipModels = [
    {
      title: 'Parceria Estratégica',
      description: 'Colaboração de longo prazo para desenvolvimento de projetos inovadores.',
      benefits: ['Acesso prioritário a recursos', 'Participação em projetos exclusivos', 'Networking com parceiros estratégicos'],
      icon: UserGroupIcon,
      tech: 'Strategic Alliance',
      color: 'primary',
      accent: 'bg-gradient-to-br from-primary-500 to-primary-600'
    },
    {
      title: 'Parceria Técnica',
      description: 'Cooperação técnica para desenvolvimento de soluções específicas.',
      benefits: ['Suporte técnico especializado', 'Compartilhamento de conhecimento', 'Desenvolvimento conjunto'],
      icon: CogIcon,
      tech: 'Technical Partnership',
      color: 'secondary',
      accent: 'bg-gradient-to-br from-secondary-500 to-secondary-600'
    },
    {
      title: 'Parceria Educacional',
      description: 'Colaboração em programas de capacitação e formação profissional.',
      benefits: ['Descontos em cursos e treinamentos', 'Acesso a laboratórios e recursos', 'Certificações conjuntas'],
      icon: AcademicCapIcon,
      tech: 'Educational Partnership',
      color: 'accent',
      accent: 'bg-gradient-to-br from-accent-500 to-accent-600'
    }
  ];

  const additionalServices = [
    {
      icon: GlobeAltIcon,
      title: 'Internacionalização',
      description: 'Apoio para expansão de mercados e presença internacional das empresas.',
      tech: 'Global Expansion',
      color: 'secondary',
      features: ['Mercados internacionais', 'Expansão global', 'Presença digital']
    },
    {
      icon: LightBulbIcon,
      title: 'Gestão da Inovação',
      description: 'Implementação de processos inovadores e gestão de mudanças organizacionais.',
      tech: 'Innovation Management',
      color: 'accent',
      features: ['Processos inovadores', 'Gestão de mudanças', 'Transformação digital']
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Coworking e Espaços',
      description: 'Espaços de trabalho colaborativo e infraestrutura para empresas de tecnologia.',
      tech: 'Collaborative Spaces',
      color: 'primary',
      features: ['Espaços colaborativos', 'Infraestrutura', 'Networking']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Diagnóstico',
      description: 'Análise detalhada das necessidades e objetivos da empresa.',
      tech: 'Data Analysis',
      icon: ChartBarIcon,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      step: '02',
      title: 'Planejamento',
      description: 'Desenvolvimento de estratégia personalizada e cronograma de execução.',
      tech: 'Strategic Planning',
      icon: LightBulbIcon,
      color: 'from-primary-500 to-primary-600'
    },
    {
      step: '03',
      title: 'Execução',
      description: 'Implementação das soluções com acompanhamento contínuo.',
      tech: 'Implementation',
      icon: CogIcon,
      color: 'from-accent-500 to-accent-600'
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Monitoramento de resultados e ajustes conforme necessário.',
      tech: 'Monitoring',
      icon: StarIcon,
      color: 'from-secondary-600 to-primary-600'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Design Inovador com Cards Flutuantes */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-snow via-secondary-50 to-primary-50">
        {/* Background Elements Animados */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-20 left-20 w-32 h-32 border-4 border-secondary-200/30 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-20 right-20 w-24 h-24 border-4 border-primary-200/30 rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity 
            }}
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Header Inovador */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto mb-20 px-4"
          >
            {/* Badge Animado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-full text-sm font-medium mb-8 shadow-lg"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Nossos Serviços
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-8 bg-gradient-to-r from-graphite via-secondary-800 to-primary-800 bg-clip-text text-transparent leading-tight tracking-wide break-words">
              Soluções <span className="text-transparent bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text">Especializadas</span>
            </h1>
            <p className="text-xl md:text-2xl text-graphite/70 leading-relaxed max-w-4xl mx-auto">
              Impulsionamos seu negócio no setor de tecnologia com serviços completos e inovadores
            </p>
          </motion.div>

          {/* Grid de Serviços com Design Único */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative flex flex-col h-full"
              >
                {/* Card Principal com Design Único */}
                <div className={`relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-6 lg:p-8 h-full flex flex-col transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl`}>
                  {/* Decoração de Fundo */}
                  <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-12 lg:-translate-y-16 translate-x-12 lg:translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-20 lg:w-24 h-20 lg:h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-8 lg:translate-y-12 -translate-x-8 lg:-translate-x-12" />
                  
                  {/* Header do Card */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                      <div className={`w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        <service.icon className="w-8 lg:w-10 h-8 lg:h-10 text-white" />
                      </div>
                      <div className="w-12 lg:w-14 h-12 lg:h-14 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <CommandLineIcon className="w-5 lg:w-7 h-5 lg:h-7 text-graphite" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-graphite group-hover:text-graphite/90 transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-graphite/70 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* Lista de Features com Design Único */}
                  <div className="relative z-10 mb-4 lg:mb-6 flex-grow">
                    <ul className="space-y-2 lg:space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li 
                          key={feature} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + idx * 0.05 }}
                          className="flex items-start text-graphite/80 group-hover:text-graphite/90 transition-colors"
                        >
                          <div className="w-5 lg:w-6 h-5 lg:h-6 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center mr-2 lg:mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                            <CheckCircleIcon className="w-3 lg:w-4 h-3 lg:h-4 text-white" />
                          </div>
                          <span className="text-xs lg:text-sm font-medium leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer do Card */}
                  <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-white/20">
                    <span className="text-xs font-mono text-graphite/70 bg-white/50 backdrop-blur-sm px-2 lg:px-3 py-1 rounded-full border border-white/20">
                      {service.tech}
                    </span>
                    <Link 
                      to="/servicos" 
                      className="text-graphite/80 hover:text-graphite font-semibold transition-colors text-xs lg:text-sm group-hover:translate-x-1 transform duration-300 flex items-center"
                    >
                      Saiba mais 
                      <ArrowRightIcon className="w-3 lg:w-4 h-3 lg:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Parcerias - Layout Diagonal e Cards Asimétricos */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Background Diagonal */}
        <div className="absolute inset-0 bg-gradient-to-br from-snow via-secondary-50 to-primary-50 transform -skew-y-3 origin-top-left" />
        
        <div className="container-custom relative z-10">
          {/* Header com Layout Diagonal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 transform skew-y-3"
          >
            <div className="transform -skew-y-3">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg"
                >
                  <StarIcon className="w-5 h-5 mr-2" />
                  Modelos de Parceria
                </motion.div>
                
                <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-graphite to-secondary-800 bg-clip-text text-transparent">
                  Parcerias <span className="text-transparent bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text">Estratégicas</span>
                </h2>
                <p className="text-xl text-graphite/70 max-w-3xl mx-auto leading-relaxed">
                  Diferentes formas de colaboração para atender às necessidades específicas do seu negócio
                </p>
              </div>
            </div>
          </motion.div>

          {/* Grid Asimétrico de Parcerias */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnershipModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`group relative ${index === 1 ? 'lg:translate-y-8' : ''}`}
              >
                {/* Card com Design Asimétrico */}
                <div className={`relative bg-white rounded-3xl p-8 h-full transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl border border-secondary-100/50`}>
                  {/* Decoração de Fundo */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${model.accent} rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Header do Card */}
                  <div className="relative z-10 text-center">
                    <div className={`w-20 h-20 ${model.accent} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                      <model.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-graphite group-hover:text-graphite/90 transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-graphite/70 mb-6 leading-relaxed text-base">
                      {model.description}
                    </p>
                  </div>

                  {/* Lista de Benefícios */}
                  <div className="relative z-10 mb-6">
                    <ul className="space-y-3 text-left">
                      {model.benefits.map((benefit, idx) => (
                        <motion.li 
                          key={benefit} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.2 + idx * 0.1 }}
                          className="flex items-center text-graphite/80 group-hover:text-graphite/90 transition-colors"
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Badge Tecnológico */}
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-snow to-secondary-50 text-graphite/80 rounded-full text-sm font-medium border border-secondary-200">
                      {model.tech}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Serviços Adicionais - Layout em Zigzag */}
      <section className="relative py-24 bg-gradient-to-br from-graphite via-secondary-900 to-primary-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          {/* Header Centralizado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Serviços Complementares
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
              Soluções <span className="text-transparent bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text">Adicionais</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Soluções complementares para fortalecer ainda mais seu negócio
            </p>
          </motion.div>

          {/* Layout em Zigzag */}
          <div className="space-y-16">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Conteúdo */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 text-white/80 rounded-full text-sm font-medium mb-4 border border-secondary-400/30`}>
                    {service.tech}
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-accent-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features em Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                        className="flex items-center text-white/80"
                      >
                        <div className="w-4 h-4 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ícone com Design Único */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-32 h-32 bg-gradient-to-br ${service.color === 'secondary' ? 'from-secondary-500 to-secondary-600' : service.color === 'accent' ? 'from-accent-500 to-accent-600' : 'from-primary-500 to-primary-600'} rounded-3xl flex items-center justify-center shadow-2xl`}
                  >
                    <service.icon className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Como Trabalhamos - Timeline Circular */}
      <section className="relative py-24 bg-gradient-to-br from-snow via-accent-50 to-primary-50 overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white rounded-full text-xs lg:text-sm font-medium mb-4 lg:mb-6 shadow-lg"
            >
              <CogIcon className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
              Nossa Metodologia
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 lg:mb-6 bg-gradient-to-r from-graphite via-accent-800 to-primary-800 bg-clip-text text-transparent leading-tight">
              Como <span className="text-transparent bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text">Trabalhamos</span>
            </h2>
            <p className="text-lg lg:text-xl text-graphite/70 max-w-3xl mx-auto leading-relaxed px-4">
              Metodologia estruturada para garantir resultados consistentes e inovadores
            </p>
          </motion.div>

          {/* Timeline Circular */}
          <div className="relative">
            {/* Linha Central */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 via-primary-500 to-accent-500 transform -translate-x-1/2" />
            
            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group flex flex-col h-full"
                >
                  {/* Conector para Desktop */}
                  <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-8 bg-gradient-to-b from-accent-500 to-primary-500 transform -translate-x-1/2" />
                  
                  {/* Card do Step */}
                  <div className="relative bg-white rounded-3xl p-6 lg:p-8 text-center transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl border border-accent-100/50 flex flex-col h-full">
                    {/* Número do Step */}
                    <div className={`w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl flex-shrink-0`}>
                      <span className="text-white font-bold text-lg lg:text-2xl">{step.step}</span>
                    </div>
                    
                    {/* Ícone */}
                    <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 flex-shrink-0">
                      <step.icon className="w-6 lg:w-8 h-6 lg:h-8 text-accent-600" />
                    </div>
                    
                    <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-graphite group-hover:text-accent-700 transition-colors leading-tight flex-shrink-0">
                      {step.title}
                    </h3>
                    
                    <p className="text-graphite/70 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 flex-grow">
                      {step.description}
                    </p>
                    
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 bg-gradient-to-r from-accent-100 to-primary-100 text-accent-700 rounded-full text-xs font-medium border border-accent-200 mt-auto">
                      {step.tech}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Design Futurista */}
      <section className="relative py-24 bg-gradient-to-br from-graphite via-secondary-900 to-primary-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-40">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10" />
          </div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Vamos Começar
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
              Pronto para <span className="text-transparent bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text">começar</span>?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Entre em contato conosco para discutir como podemos ajudar seu negócio a crescer
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a 
                href="/contato" 
                className="group relative px-10 py-5 bg-gradient-to-r from-secondary-600 to-primary-600 text-white font-semibold text-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-secondary-500/25 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10 flex items-center">
                  Solicitar Orçamento
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              
              <motion.a 
                href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-white text-graphite font-semibold text-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10 flex items-center">
                  Associe-se
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-snow to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
