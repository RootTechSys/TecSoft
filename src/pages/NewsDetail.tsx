import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowLeftIcon,
  ClockIcon,
  ShareIcon,
  BookOpenIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { NewsService } from '../services/newsService';
import { News } from '../types/news';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNews();
    }
  }, [id]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const newsData = await NewsService.getNewsById(id!);
      if (newsData) {
        setNews(newsData);
      } else {
        setError('Notícia não encontrada');
      }
    } catch (error) {
      console.error('Erro ao carregar notícia:', error);
      setError('Erro ao carregar notícia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getThemeColor = (theme: string) => {
    const colors: Record<string, string> = {
      'Inovação': 'bg-blue-100 text-blue-800 border-blue-200',
      'Eventos': 'bg-green-100 text-green-800 border-green-200',
      'Parcerias': 'bg-purple-100 text-purple-800 border-purple-200',
      'Startup Ecosystem': 'bg-orange-100 text-orange-800 border-orange-200',
      'Mobile Development': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Academic Partnership': 'bg-teal-100 text-teal-800 border-teal-200',
      'Tecnologia': 'bg-gray-100 text-gray-800 border-gray-200',
      'Desenvolvimento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Capacitação': 'bg-pink-100 text-pink-800 border-pink-200',
      'Networking': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[theme] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.briefDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 mb-6">
            <BookOpenIcon className="w-20 h-20 mx-auto" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Notícia não encontrada</h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {error || 'A notícia que você está procurando não existe ou foi removida.'}
          </p>
          <Link
            to="/noticias"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar às Notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 h-[70vh] md:h-[80vh]">
          <img
            src={news.coverImage || '/placeholder-news.svg'}
            alt={news.title}
            className="w-full h-full object-cover transform scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-news.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>

        {/* Content Overlay */}
        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/noticias"
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white/90 hover:text-white hover:bg-white/30 transition-all duration-300 rounded-full text-sm font-medium border border-white/20"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Voltar às Notícias
              </Link>
            </motion.div>

            {/* Article Header */}
            <div className="max-w-5xl">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <span className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold border-2 shadow-lg backdrop-blur-sm ${getThemeColor(news.theme)}`}>
                  <TagIcon className="w-5 h-5 mr-2" />
                  {news.theme}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                {news.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-3xl text-white/95 mb-12 leading-relaxed max-w-4xl font-light"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                {news.briefDescription}
              </motion.p>

              {/* Meta Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap items-center gap-8 text-white/90"
              >
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{formatDate(news.publicationDate)}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{formatTime(news.publicationDate)}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{news.authors.join(', ')}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <EyeIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Visualização</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="py-20 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Content */}
            <div className="p-10 md:p-16">
              <div className="prose prose-lg md:prose-2xl max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-xl md:text-2xl font-light">
                  {news.content}
                </div>
              </div>
            </div>

            {/* Article Footer */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-10 md:px-16 py-12 border-t border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-gray-700">
                  <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                    <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-semibold">Publicado em {formatDate(news.publicationDate)}</span>
                  </div>
                  <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                    <UserIcon className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-semibold">Por {news.authors.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ShareIcon className="w-6 h-6 mr-3" />
                    Compartilhar
                  </button>
                  
                  <Link
                    to="/noticias"
                    className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <ArrowLeftIcon className="w-6 h-6 mr-3" />
                    Voltar às Notícias
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Mais Notícias
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Continue explorando o mundo da tecnologia e inovação
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <Link
              to="/noticias"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
            >
              <BookOpenIcon className="w-8 h-8 mr-4" />
              Ver Todas as Notícias
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
