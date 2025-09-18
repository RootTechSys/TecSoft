import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  NewspaperIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import NewsList from '../../components/admin/NewsList';
import PartnerList from '../../components/admin/PartnerList';
import { NewsService } from '../../services/newsService';
import { PartnerService } from '../../services/partnerService';
import { DocumentService } from '../../services/documentService';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [newsCount, setNewsCount] = useState<number>(0);
  const [documentsCount, setDocumentsCount] = useState<number>(0);
  const [partnersCount, setPartnersCount] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<Array<{
    id: string;
    type: 'news' | 'document' | 'partner';
    title: string;
    action: string;
    timestamp: Date;
    color: string;
  }>>([]);

  // Função para buscar atividades recentes
  const fetchRecentActivities = async () => {
    try {
      const activities: Array<{
        id: string;
        type: 'news' | 'document' | 'partner';
        title: string;
        action: string;
        timestamp: Date;
        color: string;
      }> = [];

      // Buscar notícias recentes
      const allNews = await NewsService.getAllNews();
      allNews.slice(0, 3).forEach(news => {
        activities.push({
          id: news.id,
          type: 'news',
          title: news.title,
          action: news.isPublished ? 'publicada' : 'criada',
          timestamp: news.updatedAt,
          color: 'bg-green-500'
        });
      });

      // Buscar documentos recentes
      const allDocuments = await DocumentService.getAllDocuments();
      allDocuments.slice(0, 2).forEach(doc => {
        activities.push({
          id: doc.id,
          type: 'document',
          title: doc.title,
          action: 'adicionado',
          timestamp: doc.uploadedAt,
          color: 'bg-blue-500'
        });
      });

      // Buscar parceiros recentes
      const allPartners = await PartnerService.getAllPartners();
      allPartners.slice(0, 2).forEach(partner => {
        activities.push({
          id: partner.id,
          type: 'partner',
          title: partner.name,
          action: 'adicionado',
          timestamp: partner.updatedAt,
          color: 'bg-purple-500'
        });
      });

      // Ordenar por timestamp (mais recente primeiro) e pegar os 5 mais recentes
      const sortedActivities = activities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5);

      setRecentActivities(sortedActivities);
    } catch (error) {
      setRecentActivities([]);
    }
  };

  // Função para formatar tempo relativo
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m atrás`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
    }
  };

  // Buscar contagens de dados e atividades recentes
  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        // Buscar contagem de notícias
        const allNews = await NewsService.getAllNews();
        setNewsCount(allNews.length);

        // Buscar contagem de documentos
        const allDocuments = await DocumentService.getAllDocuments();
        setDocumentsCount(allDocuments.length);

        // Buscar contagem de parceiros
        const allPartners = await PartnerService.getAllPartners();
        setPartnersCount(allPartners.length);

        // Buscar atividades recentes
        await fetchRecentActivities();

      } catch (error) {
        setNewsCount(0);
        setDocumentsCount(0);
        setPartnersCount(0);
        setRecentActivities([]);
      }
    };

    fetchDataCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
    }
  };

  const stats = [
    { title: 'Notícias Publicadas', value: newsCount.toString(), icon: NewspaperIcon, color: 'bg-blue-500' },
    { title: 'Documentos', value: documentsCount.toString(), icon: DocumentTextIcon, color: 'bg-green-500' },
    { title: 'Parceiros', value: partnersCount.toString(), icon: BuildingOfficeIcon, color: 'bg-purple-500' }
  ];

  const quickActions = [
    { title: 'Nova Notícia', icon: PlusIcon, action: () => setActiveTab('noticias'), color: 'bg-blue-500' },
    { title: 'Upload Documento', icon: PlusIcon, action: () => setActiveTab('documentos'), color: 'bg-green-500' },
    { title: 'Adicionar Parceiro', icon: PlusIcon, action: () => setActiveTab('parceiros'), color: 'bg-purple-500' },
    { title: 'Email', icon: EnvelopeIcon, action: () => window.open('https://mail.hostinger.com', '_blank'), color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-graphite">
                Painel Administrativo TECSOFT
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="w-8 h-8 text-secondary-600" />
                <span className="text-sm text-graphite">{currentUser?.email}</span>
              </div>
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Sair</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'noticias', label: 'Notícias' },
              { id: 'documentos', label: 'Documentos' },
              { id: 'parceiros', label: 'Parceiros' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-graphite hover:text-secondary-600 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-graphite/60">{stat.title}</p>
                      <p className="text-2xl font-bold text-graphite">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-graphite mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    onClick={action.action}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-graphite group-hover:text-secondary-600 transition-colors">
                      {action.title}
                    </h3>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-graphite mb-4">Atividade Recente</h2>
              <div className="space-y-3">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                      <span className="text-sm text-graphite">
                        {activity.type === 'news' && 'Notícia'}
                        {activity.type === 'document' && 'Documento'}
                        {activity.type === 'partner' && 'Parceiro'}
                        {' "'}{activity.title}{'" '}
                        {activity.action}
                      </span>
                      <span className="text-xs text-graphite/50 ml-auto">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-graphite/60">
                    <p>Nenhuma atividade recente encontrada</p>
                    <p className="text-xs mt-1">Crie conteúdo para ver as atividades aqui</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Notícias Tab */}
        {activeTab === 'noticias' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NewsList />
          </motion.div>
        )}

        {/* Documentos Tab */}
        {activeTab === 'documentos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-graphite/60">Gerenciamento de Documentos em desenvolvimento...</p>
          </motion.div>
        )}

        {/* Parceiros Tab */}
        {activeTab === 'parceiros' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PartnerList />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

