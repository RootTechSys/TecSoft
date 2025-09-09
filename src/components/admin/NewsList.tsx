import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { News, NewsTheme, NewsFilters } from '../../types/news';
import { NewsService } from '../../services/newsService';
import NewsForm from './NewsForm';

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [deletingNews, setDeletingNews] = useState<string | null>(null);
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
      setError(null);
      console.log('Iniciando carregamento de notícias...');
      
      // Carregar do Firebase (agora com autenticação obrigatória)
      const allNews = await NewsService.getAllNews();
      console.log('Notícias carregadas do Firebase:', allNews);
      setNews(allNews);
      
    } catch (error) {
      console.error('Erro ao carregar do Firebase:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('autenticado')) {
          setError('🔐 Faça login para acessar as notícias');
        } else if (error.message.includes('permission') || error.message.includes('rules')) {
          setError('🚫 Erro de permissão. Verifique as regras de segurança do Firebase.');
        } else {
          setError(`❌ Erro ao carregar notícias: ${error.message}`);
        }
      } else {
        setError('❌ Erro desconhecido ao carregar notícias');
      }
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

  const handleCreateNews = async (newsData: any) => {
    try {
      await NewsService.createNews(newsData);
      setShowForm(false);
      loadNews();
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      if (error instanceof Error) {
        if (error.message.includes('autenticado')) {
          setError('🔐 Faça login para criar notícias');
        } else {
          setError(`❌ Erro ao criar notícia: ${error.message}`);
        }
      }
    }
  };

  const handleUpdateNews = async (newsData: any) => {
    if (!editingNews) return;
    
    try {
      await NewsService.updateNews(editingNews.id, newsData);
      setEditingNews(null);
      loadNews();
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
      if (error instanceof Error) {
        if (error.message.includes('autenticado')) {
          setError('🔐 Faça login para atualizar notícias');
        } else {
          setError(`❌ Erro ao atualizar notícia: ${error.message}`);
        }
      }
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      await NewsService.deleteNews(id);
      setDeletingNews(null);
      loadNews();
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
      if (error instanceof Error) {
        if (error.message.includes('autenticado')) {
          setError('🔐 Faça login para deletar notícias');
        } else {
          setError(`❌ Erro ao deletar notícia: ${error.message}`);
        }
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando notícias...</p>
          <p className="text-sm text-gray-500 mt-2">Aguarde enquanto conectamos ao Firebase</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerenciar Notícias</h2>
            <p className="text-gray-600">Crie, edite e gerencie as notícias do site</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Notícia
          </button>
        </div>

        {/* Aviso de erro não intrusivo */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {error.includes('⚠️') ? 'Modo Demonstração' : 'Aviso'}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>{error}</p>
                {error.includes('⚠️') && (
                  <p className="mt-1 text-xs">
                    Você pode criar, editar e excluir notícias normalmente. As alterações serão salvas localmente.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={loadNews}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Tentar conectar ao Firebase
          </button>
          <button
            onClick={async () => {
              console.log('Testando Firebase...');
              try {
                const isConnected = await NewsService.testConnection();
                console.log('Conexão Firebase:', isConnected ? 'OK' : 'FALHOU');
                if (isConnected) {
                  loadNews(); // Tentar carregar novamente se conectar
                } else {
                  alert('Firebase não está acessível. Verifique a configuração.');
                }
              } catch (error) {
                console.error('Erro no teste:', error);
                alert('Erro ao testar Firebase. Verifique o console para detalhes.');
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Testar Conexão Firebase
          </button>
        </div>

        {/* Lista de notícias */}
        {news.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Notícias Disponíveis
              </h3>
              <p className="text-sm text-gray-600">
                {news.length} notícia{news.length !== 1 ? 's' : ''} encontrada{news.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {news.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Imagem */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.coverImage || '/placeholder-news.jpg'}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {item.briefDescription}
                          </p>
                          
                          {/* Meta informações */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <UserIcon className="w-4 h-4" />
                              <span>{item.authors.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(item.publicationDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TagIcon className="w-4 h-4" />
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(item.theme)}`}>
                                {item.theme}
                              </span>
                            </div>
                            {!item.isPublished && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                Rascunho
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => setEditingNews(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                                                     <button
                             onClick={() => setDeletingNews(item.id)}
                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                             title="Deletar"
                           >
                             <TrashIcon className="w-5 h-5" />
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de Formulário */}
        <AnimatePresence>
          {showForm && (
            <NewsForm
              onSubmit={handleCreateNews}
              onCancel={() => setShowForm(false)}
              isLoading={false}
            />
          )}
          {editingNews && (
            <NewsForm
              news={editingNews}
              onSubmit={handleUpdateNews}
              onCancel={() => setEditingNews(null)}
              isLoading={false}
            />
          )}
        </AnimatePresence>

        {/* Modal de Confirmação de Exclusão */}
        <AnimatePresence>
          {deletingNews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirmar Exclusão
                </h3>
                <p className="text-gray-600 mb-6">
                  Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.
                </p>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setDeletingNews(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDeleteNews(deletingNews)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Notícias</h2>
          <p className="text-gray-600">Crie, edite e gerencie as notícias do site</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nova Notícia
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, autor ou descrição..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por tema */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.theme}
              onChange={(e) => setFilters(prev => ({ ...prev, theme: e.target.value as NewsTheme | 'all' }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
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
          <div className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {filteredNews.length} de {news.length} notícias
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Notícias */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-600">
              {filters.search || filters.theme !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Crie sua primeira notícia clicando no botão acima'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Imagem */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.coverImage || '/placeholder-news.jpg'}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {item.briefDescription}
                        </p>
                        
                        {/* Meta informações */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{item.authors.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(item.publicationDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TagIcon className="w-4 h-4" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(item.theme)}`}>
                              {item.theme}
                            </span>
                          </div>
                          {!item.isPublished && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Rascunho
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setEditingNews(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeletingNews(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Formulário */}
      <AnimatePresence>
        {showForm && (
          <NewsForm
            onSubmit={handleCreateNews}
            onCancel={() => setShowForm(false)}
            isLoading={false}
          />
        )}
        {editingNews && (
          <NewsForm
            news={editingNews}
            onSubmit={handleUpdateNews}
            onCancel={() => setEditingNews(null)}
            isLoading={false}
          />
        )}
      </AnimatePresence>

      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {deletingNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setDeletingNews(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteNews(deletingNews)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
