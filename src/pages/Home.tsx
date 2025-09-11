import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRightIcon,
  StarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { NewsService } from '../services/newsService';
import { News } from '../types/news';
import { PartnerService } from '../services/partnerService';
import { Partner } from '../types/partner';
import PartnerCarousel from '../components/PartnerCarousel';
import DynamicCodeAnimation from '../components/DynamicCodeAnimation';
import { testFirebaseConnection } from '../utils/testFirebase';


const Home: React.FC = () => {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Estado para notícias
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  
  // Estado para teste de conexão
  const [connectionTest, setConnectionTest] = useState<{
    isRunning: boolean;
    result: any;
  }>({ isRunning: false, result: null });

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Networking Profissional',
      description: 'Conecte-se com profissionais e empresas do setor de tecnologia',
      tech: 'AI-Powered Matching'
    },
    {
      icon: AcademicCapIcon,
      title: 'Capacitação Contínua',
      description: 'Cursos e treinamentos para manter-se atualizado',
      tech: 'Machine Learning'
    },
    {
      icon: BriefcaseIcon,
      title: 'Consultoria Especializada',
      description: 'Suporte técnico e estratégico para seu negócio',
      tech: 'Data Analytics'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Fomento ao Desenvolvimento',
      description: 'Apoio para crescimento e inovação empresarial',
      tech: 'Cloud Solutions'
    }
  ];

  const services = [
    {
      title: 'Consultoria e Planejamento',
      description: 'Assessoria especializada em tecnologia e software',
      features: ['Análise de processos', 'Otimização de sistemas', 'Estratégia digital'],
      tech: 'DevOps & CI/CD'
    },
    {
      title: 'Desenvolvimento e Fomento',
      description: 'Apoio ao desenvolvimento de soluções tecnológicas',
      features: ['Incubação de startups', 'Mentoria técnica', 'Acesso a recursos'],
      tech: 'Full-Stack Development'
    },
    {
      title: 'Cursos e Capacitação',
      description: 'Formação profissional em tecnologia e software',
      features: ['Cursos técnicos', 'Workshops práticos', 'Certificações'],
      tech: 'Interactive Learning'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Desenvolvimento Web Full Stack',
      duration: '120 horas',
      price: 'R$ 1.200',
      level: 'Intermediário',
      rating: 4.8,
      tech: 'React • Node.js • MongoDB',
      description: 'Domine o desenvolvimento completo de aplicações web modernas',
      category: 'Desenvolvimento',
      students: 245,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Inteligência Artificial Aplicada',
      duration: '80 horas',
      price: 'R$ 980',
      level: 'Avançado',
      rating: 4.9,
      tech: 'Python • TensorFlow • ML',
      description: 'Construa soluções inteligentes com machine learning',
      category: 'IA & Data Science',
      students: 156,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Gestão de Projetos Ágeis',
      duration: '60 horas',
      price: 'R$ 750',
      level: 'Básico',
      rating: 4.7,
      tech: 'Scrum • Kanban • Jira',
      description: 'Lidere equipes com metodologias ágeis eficientes',
      category: 'Gestão',
      students: 312,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'DevOps e Cloud Computing',
      duration: '100 horas',
      price: 'R$ 1.100',
      level: 'Intermediário',
      rating: 4.8,
      tech: 'AWS • Docker • Kubernetes',
      description: 'Automatize deploys e gerencie infraestrutura na nuvem',
      category: 'Infraestrutura',
      students: 189,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'UX/UI Design Avançado',
      duration: '90 horas',
      price: 'R$ 850',
      level: 'Intermediário',
      rating: 4.6,
      tech: 'Figma • Sketch • Prototyping',
      description: 'Crie experiências digitais memoráveis e funcionais',
      category: 'Design',
      students: 198,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 6,
      title: 'Blockchain e Criptomoedas',
      duration: '70 horas',
      price: 'R$ 1.050',
      level: 'Avançado',
      rating: 4.5,
      tech: 'Solidity • Web3 • Smart Contracts',
      description: 'Desenvolva aplicações descentralizadas do futuro',
      category: 'Blockchain',
      students: 87,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slider para cursos (responsivo)
  const cardsPerView = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;
  const totalSlides = Math.ceil(courses.length / cardsPerView);
  
  useEffect(() => {
    if (totalSlides > 1) {
      const timer = setInterval(() => {
        setCurrentCourseIndex((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [totalSlides]);

  // Função para carregar notícias mais recentes
  const loadLatestNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError(null);
      console.log('Carregando notícias mais recentes...');
      const news = await NewsService.getLatestNews(3);
      console.log('Notícias carregadas:', news);
      setLatestNews(news);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      setNewsError('Erro ao carregar notícias. Verifique a conexão com o Firebase.');
      // Em caso de erro, definir array vazio para mostrar estado vazio
      setLatestNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  // Função para testar conexão com Firebase
  const handleTestConnection = async () => {
    setConnectionTest({ isRunning: true, result: null });
    try {
      const result = await testFirebaseConnection();
      setConnectionTest({ isRunning: false, result });
      
      // Se o teste foi bem-sucedido, recarregar dados
      if (result.success) {
        loadLatestNews();
        const activePartners = await PartnerService.getActivePartners();
        setPartners(activePartners);
      }
    } catch (error) {
      setConnectionTest({ 
        isRunning: false, 
        result: { success: false, error: 'Erro no teste de conexão' }
      });
    }
  };

  // Carregar notícias mais recentes
  useEffect(() => {
    loadLatestNews();
  }, []);

  // Função para formatar data das notícias
  const formatNewsDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Função para calcular tempo relativo desde a publicação
  const getTimeSincePublication = (publicationDate: Date) => {
    const now = new Date();
    const published = new Date(publicationDate);
    
    // Normalizar as datas para comparar apenas o dia (sem horas)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const pubDate = new Date(published.getFullYear(), published.getMonth(), published.getDate());
    
    const diffInMs = today.getTime() - pubDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Hoje';
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? '1 semana atrás' : `${weeks} semanas atrás`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return months === 1 ? '1 mês atrás' : `${months} meses atrás`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return years === 1 ? '1 ano atrás' : `${years} anos atrás`;
    }
  };

  const [partners, setPartners] = useState<Partner[]>([]);

  // Carregar parceiros ativos
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const activePartners = await PartnerService.getActivePartners();
        setPartners(activePartners);
      } catch (error) {
        console.error('Erro ao carregar parceiros:', error);
      }
    };

    loadPartners();
  }, []);



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
    <div className="min-h-screen">
      {/* Hero Section - Layout CSS Grid Corrigido */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 lg:flex hidden items-center justify-center font-['Inter',sans-serif]">
        {/* Elementos Decorativos de Fundo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[10%] left-[10%] w-80 h-80 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-xl z-0"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-orange-200/10 rounded-full mix-blend-multiply filter blur-xl z-0"
        />

        {/* Container Principal com CSS Grid */}
        <div className="hero-grid-container max-w-[1400px] w-full h-[80vh] items-center relative z-10">
          
          {/* Coluna 1: Seção de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="px-8 relative z-[2]"
          >
            {/* Badge "Centro de Tecnologia" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute -top-12 left-0 z-[1]"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Centro de Tecnologia
              </div>
            </motion.div>

            {/* Título Principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] mb-8 tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              <span className="font-black text-gray-900">Transformando</span>{' '}
              <span className="text-blue-600 font-normal">Ideias em</span>{' '}
              <span className="text-amber-500 font-black">Soluções</span>
            </motion.h1>
            
            {/* Descrição */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-[400px]"
              style={{ fontSize: '1.1rem', lineHeight: '1.6' }}
            >
              Apoiando o desenvolvimento das empresas e startups de tecnologia da informação no DF
            </motion.p>

            {/* Botão CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <motion.a
                href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Descubra Como</span>
                <ArrowRightIcon className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Coluna 2: Terminal Centralizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="justify-self-center self-center relative z-[10]"
            style={{ width: '380px', height: '450px' }}
          >
          {/* Terminal */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
            
            {/* Efeito de brilho */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Container principal */}
            <div className="relative z-10 p-8 h-full flex flex-col">
              {/* Window Controls */}
              <div className="flex items-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-white/80 text-sm font-mono">tecsoft.dev</span>
                </div>
              </div>

              {/* Animação Dinâmica TecSoft */}
              <div className="flex-1 flex items-center justify-center">
                <DynamicCodeAnimation />
              </div>

              {/* Status Bar */}
              <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span>Online</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>v2.0</span>
                  <span>Brasília, DF</span>
                </div>
              </div>
            </div>

            {/* Efeito de borda */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-blue-500/30"
              animate={{
                borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

            {/* Badge "50+ Startups" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-[20]"
            >
              50+ Startups
            </motion.div>
        </motion.div>

          {/* Coluna 3: Cards Laterais */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-6 self-center z-[5]"
          >
            {/* Card Assembleia */}
            <motion.a
              href="https://assembleia.tecsoft.dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer block w-[280px]"
              style={{ 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: '16px'
              }}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5l-1.5-2c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5l-1.5-2C4.03 7.88 3.29 7.51 2.49 7.51H1.5L4 15.5H6.5v6.5h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Assembleia Geral
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Participe das decisões importantes
                  </p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </motion.a>

            {/* Card Evento */}
            <motion.a
              href="https://evento.tecsoft.dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 cursor-pointer block w-[280px]"
              style={{ 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: '16px'
              }}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                    Próximo Evento
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Conecte-se com a comunidade
                  </p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </motion.a>
          </motion.div>
        </div>

      </section>

      {/* Hero Section - Mobile Layout */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 lg:hidden block">
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl"
          />
        </motion.div>

        <div className="container-custom relative z-10 py-20">
          <div className="text-center space-y-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Centro de Tecnologia
            </motion.div>

            {/* Título Principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-5xl font-display leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              <span className="font-black text-gray-900">Transformando</span>{' '}
              <span className="text-blue-600 font-normal">Ideias em</span>{' '}
              <span className="text-amber-500 font-black">Soluções</span>
            </motion.h1>
            
            {/* Descrição */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-700 leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Apoiando o desenvolvimento das empresas e startups de tecnologia da informação no DF
            </motion.p>

            {/* Terminal Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto"
              style={{ width: '90vw', maxWidth: '350px', height: '400px' }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-white/80 text-sm font-mono">tecsoft.dev</span>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <DynamicCodeAnimation />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span>Sistema Ativo</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>v2.0</span>
                      <span>Brasília, DF</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl border border-blue-500/30"
                  animate={{
                    borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Badge "50+ Startups" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                50+ Startups
              </motion.div>
            </motion.div>

            {/* Cards Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 gap-4 max-w-sm mx-auto"
            >
              {/* Card Assembleia */}
              <motion.a
                href="https://assembleia.tecsoft.dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white rounded-2xl p-6 border border-blue-200/50 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer block w-full"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5l-1.5-2c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5l-1.5-2C4.03 7.88 3.29 7.51 2.49 7.51H1.5L4 15.5H6.5v6.5h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Assembleia Geral
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Participe das decisões importantes
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </motion.a>

              {/* Card Evento */}
              <motion.a
                href="https://evento.tecsoft.dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white rounded-2xl p-6 border border-green-200/50 hover:border-green-300 hover:shadow-xl transition-all duration-300 cursor-pointer block w-full"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      Próximo Evento
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Conecte-se com a comunidade
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              </motion.a>
            </motion.div>

            {/* CTA Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] transition-all duration-300 inline-flex items-center"
              >
                <span>Descubra Como</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Elementos Decorativos Mobile */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 w-4 h-4 bg-blue-400/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -180, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400/40 rounded-full blur-sm"
        />
      </section>

      {/* Features Section - Redesigned */}
      <section className="section-padding section-contrast relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-snow via-white to-snow/50" />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-secondary-600/5 to-accent-500/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-accent-500/5 to-secondary-600/5 rounded-full blur-xl"
        />

        <div className="container-custom relative z-10">
          {/* Centralized Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white text-sm font-bold rounded-xl shadow-lg mb-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2" />
              <span className="relative z-10">Por que TECSOFT?</span>
            </div>
            
            <div className="space-y-4 relative max-w-4xl mx-auto">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-accent-500/10 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary-600/10 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-graphite leading-tight relative">
                Conectividade em <span className="text-accent-600 bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent relative">
                  Resultados
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-secondary-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <p className="text-xl md:text-2xl font-semibold text-secondary-600 leading-relaxed">
                    Soluções completas para tecnologia em Brasília
                  </p>
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-secondary-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
                
                <div className="relative bg-gradient-to-r from-accent-50 to-secondary-50 p-6 rounded-xl border border-accent-100 max-w-3xl mx-auto">
                  <p className="text-lg md:text-xl text-graphite/80 leading-relaxed">
                    <span className="font-bold text-accent-600 inline-flex items-center">
                      <motion.span
                        className="w-2 h-2 bg-accent-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Promovendo conexões que geram resultados.
                    </span> 
                    <br className="hidden sm:block" />
                    <span className="text-graphite/70">
                      Oferecemos networking e capacitação para o desenvolvimento do ecossistema tecnológico de Brasília.
                    </span>
                  </p>
                  
                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-accent-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative h-full"
              >
                {/* Interactive Card */}
                <motion.div 
                  className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 overflow-visible h-full flex flex-col min-h-[360px]"
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Tech Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 bg-secondary-600/10 text-secondary-600 rounded-full text-xs font-bold border border-secondary-600/20 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 bg-secondary-600 rounded-full mr-1 md:mr-2 animate-pulse" />
                      <span className="hidden sm:inline">{feature.tech}</span>
                      <span className="sm:hidden">{feature.tech.split(' ')[0]}</span>
                    </div>
                  </motion.div>

                  {/* Icon Container */}
                  <motion.div 
                    className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    
                    {/* Icon Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-graphite group-hover:text-secondary-600 transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-graphite/70 leading-relaxed mb-4 md:mb-6 text-base md:text-lg flex-1">
                      {feature.description}
                    </p>
                    
                    {/* Interactive Button */}
                    <motion.button
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 self-start"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Saiba Mais</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </div>



                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary-600/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="section-padding section-neutral relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50/50" />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-accent-500/5 to-secondary-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-32 -right-32 w-56 h-56 bg-gradient-to-tl from-secondary-600/5 to-accent-500/5 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          {/* Centralized Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold rounded-xl shadow-lg mb-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-white rounded-full mr-2" />
              <span className="relative z-10">Nossos Serviços</span>
            </div>
            
            <div className="space-y-4 relative max-w-4xl mx-auto">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-accent-500/10 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary-600/10 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-graphite leading-tight relative">
                Soluções <span className="text-accent-600 bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent relative">
                  Especializadas
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-secondary-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <p className="text-xl md:text-2xl font-semibold text-secondary-600 leading-relaxed">
                    Impulsione seu negócio no setor de tecnologia
                  </p>
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-secondary-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
                
                <div className="relative bg-gradient-to-r from-secondary-50 to-accent-50 p-6 rounded-xl border border-secondary-100 max-w-4xl mx-auto">
                  <div className="text-center mb-6">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-white rounded-full mr-2"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Elegível para Convênios Públicos
                    </motion.div>
                  </div>
                  
                  <div className="text-lg md:text-xl text-graphite/80 leading-relaxed space-y-4">
                    <p className="font-bold text-secondary-600 text-center">
                      O TECSOFT é elegível para fechar convênios e contratos com órgãos da administração pública, municipal, estadual, distrital e federal, sem a necessidade de licitação.
                    </p>
                    
                    <div className="bg-white/60 rounded-xl p-6 border border-secondary-200 shadow-sm">
                      <p className="text-graphite/70 text-base md:text-lg text-center mb-6">
                        <span className="font-semibold text-secondary-700">Três instrumentos legais</span> embasam essa prerrogativa:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {/* Card 1 */}
                        <motion.div 
                          className="group relative bg-white rounded-xl p-6 border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <div className="flex flex-col items-center text-center h-full justify-between">
                            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center min-h-[80px]">
                              <h3 className="text-sm font-semibold text-graphite/80 mb-3 leading-tight px-2">
                                Marco Legal das Organizações da Sociedade Civil
                              </h3>
                            </div>
                            <div className="mt-auto">
                              <p className="text-xs text-graphite/50 font-medium bg-secondary-50 px-3 py-1 rounded-full">
                                Lei 13.019/2014
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Card 2 */}
                        <motion.div 
                          className="group relative bg-white rounded-xl p-6 border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <div className="flex flex-col items-center text-center h-full justify-between">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center min-h-[80px]">
                              <h3 className="text-sm font-semibold text-graphite/80 mb-3 leading-tight px-2">
                                Decreto Distrital
                              </h3>
                            </div>
                            <div className="mt-auto">
                              <p className="text-xs text-graphite/50 font-medium bg-accent-50 px-3 py-1 rounded-full">
                                nº 37.843/2016
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Card 3 */}
                        <motion.div 
                          className="group relative bg-white rounded-xl p-6 border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1 flex flex-col"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <div className="flex flex-col items-center text-center h-full justify-between">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center min-h-[80px]">
                              <h3 className="text-sm font-semibold text-graphite/80 mb-3 leading-tight px-2">
                                Nova Lei das Licitações
                              </h3>
                            </div>
                            <div className="mt-auto">
                              <p className="text-xs text-graphite/50 font-medium bg-primary-50 px-3 py-1 rounded-full">
                                Lei nº 14.133/2021
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-secondary-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Services Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative h-full"
              >
                {/* Interactive Service Card */}
                <motion.div 
                  className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col min-h-[480px]"
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Tech Badge */}
                  <motion.div 
                    className="absolute top-6 right-6 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="inline-flex items-center px-3 py-1 bg-secondary-600/10 text-secondary-600 rounded-full text-xs font-bold border border-secondary-600/20 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 bg-secondary-600 rounded-full mr-2 animate-pulse" />
                      {service.tech}
                    </div>
                  </motion.div>

                  {/* Service Icon */}
                  <motion.div 
                    className="relative w-20 h-20 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <CommandLineIcon className="w-10 h-10 text-white" />
                    
                    {/* Icon Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-graphite group-hover:text-secondary-600 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-graphite/70 leading-relaxed mb-6 text-lg flex-1">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="mb-6 flex-1">
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={feature} 
                            className="flex items-center text-graphite/80 group-hover:text-graphite transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
                            whileHover={{ x: 8 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                            <span className="text-sm md:text-base">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Interactive Button */}
                    <motion.button
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 self-start mt-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Saiba Mais</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary-600/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="section-padding relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800" />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-40 -left-40 w-72 h-72 bg-gradient-to-tl from-accent-500/10 to-transparent rounded-full blur-3xl"
        />
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(230, 179, 61, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl text-white text-sm font-bold border border-white/20 shadow-lg"
              >
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse" />
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                Comunidade TECSOFT
              </motion.div>

              {/* Title */}
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-5xl lg:text-6xl font-display font-bold leading-none"
                >
                  <span className="block text-white">Junte-se à</span>
                  <span className="block text-accent-500">nossa</span>
                  <span className="block text-white">comunidade</span>
                </motion.h2>
              </div>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/90 max-w-lg leading-relaxed"
              >
                Faça parte de uma rede de profissionais e empresas que estão transformando 
                o setor de tecnologia em Brasília
              </motion.p>
              
              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex space-x-8 pt-4"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-500">500+</div>
                  <div className="text-sm text-white/70">Profissionais</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-500">50+</div>
                  <div className="text-sm text-white/70">Empresas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-500">100+</div>
                  <div className="text-sm text-white/70">Projetos</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Interactive Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main CTA Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                {/* Card Header */}
                <div className="flex items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-white/60 text-sm font-mono">tecsoft.dev/join</span>
                  </div>
                </div>

                {/* CTA Content */}
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Pronto para começar?</h3>
                    <p className="text-white/80 text-sm">
                      Acesse benefícios exclusivos e conecte-se com o ecossistema
                    </p>
                  </div>
                  
                  {/* Interactive Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <a 
                      href="https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      <span>Associe-se Agora</span>
                      <motion.div
                        className="ml-3"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </a>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500/50 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-8 -right-8 w-6 h-6 bg-accent-500/30 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-8 -left-8 w-4 h-4 bg-white/20 rounded-full blur-sm"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section - Redesigned */}
      <section className="py-16 md:py-20 section-contrast relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-snow via-white to-snow/50" />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-accent-500/5 to-secondary-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-32 -left-32 w-56 h-56 bg-gradient-to-tl from-secondary-600/5 to-accent-500/5 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          {/* Enhanced Header Section - Centralized for Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Cursos Destacados
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-graphite">
              Formação <span className="text-accent-600">Profissional</span>
            </h2>
            
            <p className="text-base md:text-lg text-graphite/70 max-w-2xl mx-auto mb-4">
              Qualidade e inovação para impulsionar sua carreira no setor de tecnologia
            </p>

            {/* Desktop CTA */}
            <Link to="/cursos" className="hidden md:inline-block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explorar Todos os Cursos</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Compact Courses Grid */}
          <div className="relative max-w-6xl mx-auto px-4">
            {/* Multi-Card Display */}
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-all duration-700 ease-out"
                animate={{ 
                  x: `-${currentCourseIndex * 100}%` 
                }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full flex-shrink-0 flex"
                    style={{ 
                      width: '100%',
                      gap: cardsPerView === 3 ? '1rem' : cardsPerView === 2 ? '1.5rem' : '0'
                    }}
                  >
                    {courses
                      .slice(slideIndex * cardsPerView, slideIndex * cardsPerView + cardsPerView)
                      .map((course, index) => (
                        <motion.div
                          key={course.id}
                          style={{
                            width: cardsPerView === 3 ? 'calc(33.333% - 0.667rem)' : 
                                   cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 
                                   '100%'
                          }}
                          className="flex-shrink-0"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                    {/* Compact Course Card */}
                    <motion.div 
                      className="relative bg-white rounded-xl p-4 shadow-lg border border-gray-100 overflow-hidden h-[340px] flex flex-col group"
                      whileHover={{ 
                        y: -4,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      {/* Dynamic Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`} />
                      
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-3">
                        {/* Course Icon */}
                        <motion.div 
                          className={`relative w-12 h-12 bg-gradient-to-br ${course.color} rounded-lg flex items-center justify-center group-hover:shadow-md transition-shadow duration-300`}
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                        >
                          <AcademicCapIcon className="w-6 h-6 text-white" />
                        </motion.div>

                        {/* Level Badge */}
                        <div className="inline-flex items-center px-2 py-1 bg-accent-500/10 text-accent-600 rounded-full text-xs font-bold border border-accent-500/20 whitespace-nowrap">
                          {course.level}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col justify-between">
                        {/* Top Content */}
                        <div className="space-y-3">
                          <h3 className="text-base font-bold text-graphite group-hover:text-secondary-600 transition-colors duration-300 leading-tight line-clamp-2">
                            {course.title}
                          </h3>
                          
                          <p className="text-graphite/70 text-sm leading-relaxed line-clamp-2">
                            {course.description}
                          </p>
                          
                          {/* Rating & Price Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon 
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(course.rating) 
                                        ? 'text-accent-500 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm font-bold text-accent-600">
                                {course.rating}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-accent-600">
                              {course.price}
                            </div>
                          </div>
                          
                          {/* Compact Info */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-graphite/60">
                              <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 text-secondary-600 mr-1" />
                                <span>{course.duration}</span>
                              </div>
                              <span className="text-secondary-600 font-medium">
                                {course.category}
                              </span>
                            </div>
                            
                            {/* Tech Stack */}
                            <div className="text-xs font-mono text-secondary-600 bg-secondary-50 px-3 py-2 rounded border border-secondary-100 text-center">
                              {course.tech}
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Button - Always at bottom */}
                        <div className="mt-4">
                          <motion.button
                            className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>Ver Detalhes</span>
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500/20 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                        </motion.div>
                      ))}
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              {/* Previous Button */}
              <motion.button
                onClick={() => setCurrentCourseIndex(prev => 
                  prev === 0 ? totalSlides - 1 : prev - 1
                )}
                disabled={totalSlides <= 1}
                className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: totalSlides > 1 ? 1.05 : 1 }}
                whileTap={{ scale: totalSlides > 1 ? 0.95 : 1 }}
              >
                <ChevronLeftIcon className="w-4 h-4 text-secondary-600 group-hover:text-accent-600 transition-colors" />
              </motion.button>
              
              {/* Dots Indicator */}
              {totalSlides > 1 && (
                <div className="flex space-x-2">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentCourseIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentCourseIndex 
                          ? 'bg-accent-500 w-5' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              )}
              
              {/* Next Button */}
              <motion.button
                onClick={() => setCurrentCourseIndex(prev => 
                  (prev + 1) % totalSlides
                )}
                disabled={totalSlides <= 1}
                className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: totalSlides > 1 ? 1.05 : 1 }}
                whileTap={{ scale: totalSlides > 1 ? 0.95 : 1 }}
              >
                <ChevronRightIcon className="w-4 h-4 text-secondary-600 group-hover:text-accent-600 transition-colors" />
              </motion.button>
            </div>
            
            {/* Course Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-4"
            >
              <span className="text-xs text-graphite/50">
                Página {currentCourseIndex + 1} de {totalSlides} • {courses.length} cursos disponíveis
              </span>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Latest News Section - Compact & User-Friendly */}
      <section className="py-12 md:py-16 section-contrast relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-snow via-white to-snow/50" />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent-500/5 to-secondary-600/5 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          {/* Enhanced Header Section - Centralized for Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-xl text-secondary-600 text-sm font-bold border border-gray-200 shadow-md mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping" />
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Últimas Notícias
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-graphite">
              Novidades do <span className="text-accent-600">Setor Tech</span>
            </h2>
            
            <p className="text-base md:text-lg text-graphite/70 max-w-2xl mx-auto mb-4">
              Tendências e inovações que moldam o futuro da tecnologia
            </p>
            
            {/* Botão de teste de conexão (apenas em desenvolvimento) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4">
                <button
                  onClick={handleTestConnection}
                  disabled={connectionTest.isRunning}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {connectionTest.isRunning ? 'Testando...' : 'Testar Conexão Firebase'}
                </button>
                {connectionTest.result && (
                  <div className="mt-2 text-sm">
                    {connectionTest.result.success ? (
                      <span className="text-green-600">
                        ✅ Conexão OK - {connectionTest.result.newsCount} notícias, {connectionTest.result.partnersCount} parceiros
                      </span>
                    ) : (
                      <span className="text-red-600">
                        ❌ Erro: {connectionTest.result.error}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Desktop CTA */}
            <Link to="/noticias" className="hidden md:inline-block">
              <motion.div 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver Todas as Notícias</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Interactive News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {newsLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col min-h-[400px] animate-pulse">
                    {/* Image placeholder */}
                    <div className="h-48 bg-gray-200"></div>
                    
                    {/* Content placeholders */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 flex-1"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : newsError ? (
              // Error state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-red-400 mb-4">
                  <CommandLineIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-red-600 mb-2">Erro ao carregar notícias</h3>
                <p className="text-red-500 mb-4">{newsError}</p>
                <button
                  onClick={() => {
                    setNewsError(null);
                    setNewsLoading(true);
                    loadLatestNews();
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Tentar Novamente
                </button>
              </motion.div>
            ) : latestNews.length > 0 ? (
              latestNews.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-full"
              >
                {/* Enhanced News Card with Image */}
                <motion.div 
                  className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col min-h-[400px] group"
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* Dynamic Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/3 to-accent-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Hero Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Image with fallback */}
                    <img
                      src={article.coverImage || '/placeholder-news.svg'}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-news.svg';
                      }}
                    />
                    
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 right-4 z-20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${
                        article.theme === 'Inovação' ? 'bg-purple-500/90 text-white border-purple-500/20' :
                        article.theme === 'Eventos' ? 'bg-blue-500/90 text-white border-blue-500/20' :
                        'bg-green-500/90 text-white border-green-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${
                          article.theme === 'Inovação' ? 'bg-white' :
                          article.theme === 'Eventos' ? 'bg-white' :
                          'bg-white'
                        }`} />
                        {article.theme}
                      </div>
                    </motion.div>
                    
                    {/* Date Badge */}
                    <motion.div 
                      className="absolute bottom-4 left-4 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    >
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-graphite backdrop-blur-sm border border-white/20">
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2 animate-pulse" />
                        {formatNewsDate(article.publicationDate)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 flex-1 flex flex-col p-5">
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-graphite group-hover:text-secondary-600 transition-colors duration-300 leading-tight line-clamp-2 hover:line-clamp-none">
                      {article.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-graphite/70 mb-4 leading-relaxed flex-1 line-clamp-3 text-sm">
                      {article.briefDescription}
                    </p>
                    
                    {/* Authors and Publication Time */}
                    <div className="flex items-center justify-between mb-4 text-xs text-graphite/60">
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{article.authors.join(', ')}</span>
                      </div>
                      
                      {/* Time since publication */}
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{getTimeSincePublication(article.publicationDate)}</span>
                      </div>
                    </div>
                    
                    {/* Action Row */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <Link to={`/noticias/${article.id}`}>
                        <motion.div
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600"
                          whileHover={{ scale: 1.05, x: 3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Ler mais</span>
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </motion.div>
                      </Link>
                      
                      {/* Theme indicator */}
                      <div className="text-xs font-medium text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full border border-secondary-100">
                        {article.theme}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary-600/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              </motion.article>
            ))
            ) : (
              // Empty state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <CommandLineIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia disponível</h3>
                <p className="text-gray-600">Aguarde novas publicações em breve</p>
              </motion.div>
            )}
          </div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 md:hidden"
          >
            <Link to="/noticias">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver Todas as Notícias</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding section-contrast">
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
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.5s' }} />
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                Nossos Parceiros
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-graphite">
                  Instituições de <span className="text-accent-600">Referência</span>
                </h2>
                <p className="text-sm text-graphite/60 mt-1">
                  Fortalecendo o ecossistema de tecnologia em Brasília
                </p>
              </div>
            </div>

            {/* Right Side - CTA */}
            <Link to="/sobre" className="hidden md:block">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Sobre Nós</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Container dos Parceiros */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <PartnerCarousel 
              partners={partners}
              autoPlay={true}
              autoPlayInterval={5000}
              showControls={true}
              showIndicators={true}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

