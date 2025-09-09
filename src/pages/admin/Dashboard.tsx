import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  NewspaperIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import NewsList from '../../components/admin/NewsList';
import PartnerList from '../../components/admin/PartnerList';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const stats = [
    { title: 'Notícias Publicadas', value: '12', icon: NewspaperIcon, color: 'bg-blue-500' },
    { title: 'Documentos', value: '8', icon: DocumentTextIcon, color: 'bg-green-500' },
    { title: 'Parceiros', value: '15', icon: BuildingOfficeIcon, color: 'bg-purple-500' },
    { title: 'Visualizações', value: '2.4k', icon: ChartBarIcon, color: 'bg-orange-500' }
  ];

  const quickActions = [
    { title: 'Nova Notícia', icon: PlusIcon, action: () => navigate('/admin/noticias/nova'), color: 'bg-blue-500' },
    { title: 'Upload Documento', icon: PlusIcon, action: () => navigate('/admin/documentos/upload'), color: 'bg-green-500' },
    { title: 'Adicionar Parceiro', icon: PlusIcon, action: () => navigate('/admin/parceiros/novo'), color: 'bg-purple-500' },
    { title: 'Gerenciar Conteúdo', icon: PencilIcon, action: () => navigate('/admin/conteudo'), color: 'bg-orange-500' }
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
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-graphite">Nova notícia "Tecnologia em Brasília" publicada</span>
                  <span className="text-xs text-graphite/50 ml-auto">2h atrás</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-graphite">Documento "Estatuto Social" atualizado</span>
                  <span className="text-xs text-graphite/50 ml-auto">1 dia atrás</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-graphite">Novo parceiro "SEBRAE-DF" adicionado</span>
                  <span className="text-xs text-graphite/50 ml-auto">3 dias atrás</span>
                </div>
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

