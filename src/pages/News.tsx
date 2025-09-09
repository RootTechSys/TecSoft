import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { News, NewsTheme, NewsFilters } from '../types/news';
import { NewsService } from '../services/newsService';

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<NewsFilters>({
    search: '',
    theme: 'all'
  });

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [news, filters]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const allNews = await NewsService.getAllNews();
      // Filtrar apenas notícias publicadas
      const publishedNews = allNews.filter(item => item.isPublished);
      setNews(publishedNews);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...news];

    // Filtro por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.authors.some(author => author.toLowerCase().includes(searchLower)) ||
        item.briefDescription.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por tema
    if (filters.theme && filters.theme !== 'all') {
      filtered = filtered.filter(item => item.theme === filters.theme);
    }

    setFilteredNews(filtered);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getThemeColor = (theme: NewsTheme) => {
    const colors: Record<NewsTheme, string> = {
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

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </div>
          
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4"
            >
              <TagIcon className="w-4 h-4 mr-2" />
              Notícias TECSOFT
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-graphite mb-4"
            >
              Novidades do Setor Tech
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-graphite/70 max-w-3xl mx-auto"
            >
              Tendências e inovações que moldam o futuro da tecnologia em Brasília
            </motion.p>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título, autor ou descrição..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por tema */}
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.theme}
                onChange={(e) => setFilters(prev => ({ ...prev, theme: e.target.value as NewsTheme | 'all' }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Todos os Temas</option>
                <option value="Inovação">Inovação</option>
                <option value="Eventos">Eventos</option>
                <option value="Parcerias">Parcerias</option>
                <option value="Startup Ecosystem">Startup Ecosystem</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Academic Partnership">Academic Partnership</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Capacitação">Capacitação</option>
                <option value="Networking">Networking</option>
              </select>
            </div>

            {/* Contador */}
            <div className="flex items-center justify-center px-4 py-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">
                {filteredNews.length} de {news.length} notícias
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Notícias */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-6">
              <MagnifyingGlassIcon className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-graphite mb-4">Nenhuma notícia encontrada</h3>
            <p className="text-graphite/60 text-lg">
              {filters.search || filters.theme !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Aguarde novas publicações em breve'
              }
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -8 }}
                >
                  {/* Imagem */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.coverImage || '/placeholder-news.svg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getThemeColor(item.theme)}`}>
                        {item.theme}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{formatDate(item.publicationDate)}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-graphite mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.briefDescription}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>{item.authors.join(', ')}</span>
                      </div>
                      
                      <Link
                        to={`/noticias/${item.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Ler mais
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
