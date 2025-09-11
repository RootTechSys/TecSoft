import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowLeftIcon,
  ClockIcon
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getThemeColor = (theme: string) => {
    const colors: Record<string, string> = {
      'Inovação': 'bg-blue-100 text-blue-800',
      'Eventos': 'bg-green-100 text-green-800',
      'Parcerias': 'bg-purple-100 text-purple-800',
      'Startup Ecosystem': 'bg-orange-100 text-orange-800',
      'Mobile Development': 'bg-indigo-100 text-indigo-800',
      'Academic Partnership': 'bg-teal-100 text-teal-800',
      'Tecnologia': 'bg-gray-100 text-gray-800',
      'Desenvolvimento': 'bg-yellow-100 text-yellow-800',
      'Capacitação': 'bg-pink-100 text-pink-800',
      'Networking': 'bg-red-100 text-red-800'
    };
    return colors[theme] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-snow flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-snow flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <TagIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-graphite mb-4">Notícia não encontrada</h3>
          <p className="text-graphite/60 text-lg mb-6">
            {error || 'A notícia que você está procurando não existe ou foi removida.'}
          </p>
          <Link
            to="/noticias"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar às Notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/noticias"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar às Notícias
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={news.coverImage || '/placeholder-news.svg'}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-news.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 right-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(news.theme)}`}>
                {news.theme}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{formatDate(news.publicationDate)}</span>
              <span className="mx-2">•</span>
              <UserIcon className="w-4 h-4 mr-2" />
              <span>{news.authors.join(', ')}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-graphite mb-6 leading-tight">
              {news.title}
            </h1>

            <p className="text-xl text-graphite/70 mb-8 leading-relaxed">
              {news.briefDescription}
            </p>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-graphite leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>Publicado em {formatDate(news.publicationDate)}</span>
                </div>
                
                <Link
                  to="/noticias"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Voltar às Notícias
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
    </div>
  );
}
