import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  LinkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { Partner, PartnerFilters } from '../../types/partner';
import { PartnerService } from '../../services/partnerService';
import PartnerForm from './PartnerForm';

export default function PartnerList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<PartnerFilters>({
    search: '',
    isActive: null
  });

  const loadPartners = async () => {
    try {
      setLoading(true);
      console.log('Carregando parceiros...');
      const partnersData = await PartnerService.getAllPartners();
      setPartners(partnersData);
      console.log(`${partnersData.length} parceiros carregados`);
    } catch (error) {
      console.error('Erro ao carregar parceiros:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...partners];

    // Filtro por busca
    if (filters.search) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por status
    if (filters.isActive !== null) {
      filtered = filtered.filter(partner => partner.isActive === filters.isActive);
    }

    setFilteredPartners(filtered);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [partners, filters]);

  const handleCreatePartner = async (partnerData: any) => {
    try {
      setIsSubmitting(true);
      console.log('Criando parceiro:', partnerData);
      await PartnerService.createPartner(partnerData);
      await loadPartners();
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar parceiro:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePartner = async (partnerData: any) => {
    if (!editingPartner) return;
    
    try {
      setIsSubmitting(true);
      console.log('Atualizando parceiro:', editingPartner.id, partnerData);
      await PartnerService.updatePartner(editingPartner.id, partnerData);
      await loadPartners();
      setEditingPartner(null);
    } catch (error) {
      console.error('Erro ao atualizar parceiro:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este parceiro?')) {
      return;
    }

    try {
      console.log('Excluindo parceiro:', id);
      await PartnerService.deletePartner(id);
      await loadPartners();
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
    }
  };

  const handleToggleActive = async (partner: Partner) => {
    try {
      console.log('Alternando status do parceiro:', partner.id);
      await PartnerService.updatePartner(partner.id, { isActive: !partner.isActive });
      await loadPartners();
    } catch (error) {
      console.error('Erro ao alterar status do parceiro:', error);
    }
  };

  const handleReorder = async (partnerId: string, direction: 'up' | 'down') => {
    console.log('=== INICIANDO REORDENAÇÃO ===');
    console.log('Partner ID:', partnerId);
    console.log('Direction:', direction);
    console.log('Partners antes da ordenação:', partners.map(p => ({ id: p.id, name: p.name, order: p.order })));
    
    const sortedPartners = [...partners].sort((a, b) => a.order - b.order);
    console.log('Partners ordenados:', sortedPartners.map(p => ({ id: p.id, name: p.name, order: p.order })));
    
    const currentIndex = sortedPartners.findIndex(p => p.id === partnerId);
    console.log('Current index:', currentIndex);
    
    if (currentIndex === -1) {
      console.log('Parceiro não encontrado!');
      return;
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    console.log('New index:', newIndex);
    
    if (newIndex < 0 || newIndex >= sortedPartners.length) {
      console.log('Índice inválido - não é possível mover');
      return;
    }
    
    // Trocar as ordens
    const currentPartner = sortedPartners[currentIndex];
    const targetPartner = sortedPartners[newIndex];
    
    const currentOrder = currentPartner.order;
    const targetOrder = targetPartner.order;
    
    console.log('=== DADOS DA TROCA ===');
    console.log('Current Partner:', { id: currentPartner.id, name: currentPartner.name, currentOrder, newOrder: targetOrder });
    console.log('Target Partner:', { id: targetPartner.id, name: targetPartner.name, currentOrder: targetOrder, newOrder: currentOrder });
    
    try {
      // Atualizar no banco de dados
      console.log('Atualizando no banco de dados...');
      await PartnerService.reorderPartners([
        { id: currentPartner.id, order: targetOrder },
        { id: targetPartner.id, order: currentOrder }
      ]);
      
      console.log('Reordenação no banco concluída!');
      console.log('Recarregando lista...');
      
      // Recarregar a lista
      await loadPartners();
      
      console.log('=== REORDENAÇÃO CONCLUÍDA ===');
    } catch (error) {
      console.error('Erro ao reordenar parceiros:', error);
      alert('Erro ao reordenar parceiros: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };

  const openEditForm = (partner: Partner) => {
    setEditingPartner(partner);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Parceiros</h2>
          <p className="text-gray-600 mt-1">
            Gerencie os parceiros que aparecem na seção "Nossos Parceiros" do site
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Novo Parceiro
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
              placeholder="Buscar parceiros..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por Status */}
          <div>
            <select
              value={filters.isActive === null ? '' : filters.isActive.toString()}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                isActive: e.target.value === '' ? null : e.target.value === 'true'
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
          </div>

          {/* Contador */}
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-500">
              {filteredPartners.length} de {partners.length} parceiros
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Parceiros */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-12">
            <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filters.search || filters.isActive !== null ? 'Nenhum parceiro encontrado' : 'Nenhum parceiro cadastrado'}
            </h3>
            <p className="text-gray-500 mb-4">
              {filters.search || filters.isActive !== null 
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando seu primeiro parceiro'
              }
            </p>
            {(!filters.search && filters.isActive === null) && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Criar Primeiro Parceiro
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPartners
              .sort((a, b) => a.order - b.order)
              .map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {partner.name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Ordem: {partner.order}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          partner.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {partner.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      
                      {partner.websiteUrl && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <LinkIcon className="w-4 h-4" />
                          <a 
                            href={partner.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary-600 transition-colors truncate"
                          >
                            {partner.websiteUrl}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Controles de Ordem */}
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleReorder(partner.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowUpIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReorder(partner.id, 'down')}
                        disabled={index === filteredPartners.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowDownIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(partner)}
                        className={`p-2 rounded-lg transition-colors ${
                          partner.isActive 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={partner.isActive ? 'Desativar' : 'Ativar'}
                      >
                        {partner.isActive ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => openEditForm(partner)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeletePartner(partner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* Formulário Modal */}
      <AnimatePresence>
        {showForm && (
          <PartnerForm
            onSubmit={handleCreatePartner}
            onCancel={closeForm}
            isLoading={isSubmitting}
          />
        )}
        {editingPartner && (
          <PartnerForm
            partner={editingPartner}
            onSubmit={handleUpdatePartner}
            onCancel={closeForm}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
