import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ClockIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { News, NewsTheme } from '../types/news';
import { NewsService } from '../services/newsService';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    if (id) {
      loadNews(id);
    }
  }, [id]);

  const loadNews = async (newsId: string) => {
    try {
      setLoading(true);
      const newsItem = await NewsService.getNewsById(newsId);
      setNews(newsItem);
      
      // Carregar notícias relacionadas
      if (newsItem) {
        const allNews = await NewsService.getAllNews();
        const related = allNews
          .filter(item => item.id !== newsId && item.theme === newsItem.theme && item.isPublished)
          .slice(0, 3);
        setRelatedNews(related);
      }
    } catch (error) {
      console.error('Erro ao carregar notícia:', error);
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

  const handleShare = async () => {
    if (navigator.share && news) {
      try {
        await navigator.share({
          title: news.title,
          text: news.briefDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-snow pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-snow pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
          <Link
            to="/noticias"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar às Notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snow pt-20">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/noticias" className="text-gray-500 hover:text-gray-700 transition-colors">Notícias</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {news.title.length > 50 ? `${news.title.substring(0, 50)}...` : news.title}
            </span>
          </nav>

          {/* Back Button */}
          <Link
            to="/noticias"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar às Notícias
          </Link>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Theme Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(news.theme)}`}>
                <TagIcon className="w-4 h-4 mr-2" />
                {news.theme}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight break-words overflow-wrap-anywhere hyphens-auto">
              {news.title}
            </h1>

            {/* Brief Description */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 break-words overflow-wrap-anywhere hyphens-auto">
              {news.briefDescription}
            </p>

            {/* Meta Info & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <UserIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">{news.authors.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{formatDate(news.publicationDate)}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{formatTime(news.publicationDate)}</span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  <span>5 min de leitura</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    liked 
                      ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {liked ? <HeartSolidIcon className="w-4 h-4 mr-2" /> : <HeartIcon className="w-4 h-4 mr-2" />}
                  <span className="text-sm">{liked ? 'Curtido' : 'Curtir'}</span>
                </button>
                
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    bookmarked 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{bookmarked ? 'Salvo' : 'Salvar'}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <ShareIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">Compartilhar</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">

        {/* Cover Image */}
        {news.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="relative w-full min-h-[300px] max-h-[500px] flex items-center justify-center">
                <img
                  src={news.coverImage}
                  alt={news.title}
                  className="max-w-full max-h-full object-contain bg-gray-50 rounded-lg"
                  loading="eager"
                />
                {/* Overlay sutil para melhorar contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
              </div>
              {/* Image Caption */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  Imagem da notícia: {news.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <div className="prose prose-lg prose-gray max-w-none" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', hyphens: 'auto' }}>
            <div 
              className="text-gray-800 leading-relaxed space-y-6 break-words overflow-wrap-anywhere hyphens-auto"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.7',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
                hyphens: 'auto',
                maxWidth: '100%'
              }}
            >
              <div 
                className="[&>p]:mb-6 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:break-words [&>p]:overflow-wrap-anywhere [&>p]:hyphens-auto
                          [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-12 [&>h1]:leading-tight [&>h1]:break-words [&>h1]:overflow-wrap-anywhere [&>h1]:hyphens-auto
                          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:leading-tight [&>h2]:break-words [&>h2]:overflow-wrap-anywhere [&>h2]:hyphens-auto
                          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:leading-tight [&>h3]:break-words [&>h3]:overflow-wrap-anywhere [&>h3]:hyphens-auto
                          [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul>li]:text-gray-700 [&>ul>li]:leading-relaxed [&>ul>li]:break-words [&>ul>li]:overflow-wrap-anywhere [&>ul>li]:hyphens-auto
                          [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol>li]:text-gray-700 [&>ol>li]:leading-relaxed [&>ol>li]:break-words [&>ol>li]:overflow-wrap-anywhere [&>ol>li]:hyphens-auto
                          [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:bg-gray-50 [&>blockquote]:rounded-r-lg [&>blockquote]:break-words [&>blockquote]:overflow-wrap-anywhere [&>blockquote]:hyphens-auto
                          [&>a]:text-primary-600 [&>a]:underline [&>a]:decoration-primary-200 [&>a:hover]:decoration-primary-500 [&>a:hover]:text-primary-700 [&>a]:break-words [&>a]:overflow-wrap-anywhere
                          [&>strong]:font-semibold [&>strong]:text-gray-900 [&>strong]:break-words [&>strong]:overflow-wrap-anywhere
                          [&>em]:italic [&>em]:text-gray-700 [&>em]:break-words [&>em]:overflow-wrap-anywhere
                          [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>code]:text-gray-800 [&>code]:break-all"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
          </div>
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Sobre o(s) Autor(es)</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {news.authors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{author}</p>
                      <p className="text-sm text-gray-600">Colaborador TECSOFT</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-graphite mb-4">
                Notícias Relacionadas
              </h2>
              <p className="text-xl text-gray-600">
                Mais conteúdo sobre {news.theme}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
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

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{formatDate(item.publicationDate)}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-graphite mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {item.briefDescription}
                    </p>
                    
                    <Link
                      to={`/noticias/${item.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Ler mais
                      <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
