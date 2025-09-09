import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  PhotoIcon,
  LinkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { PartnerFormData, Partner } from '../../types/partner';

interface PartnerFormProps {
  partner?: Partner | null;
  onSubmit: (data: PartnerFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function PartnerForm({ partner, onSubmit, onCancel, isLoading }: PartnerFormProps) {
  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    order: 1,
    isActive: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PartnerFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl || '',
        order: partner.order,
        isActive: partner.isActive
      });
      setImagePreview(partner.logoUrl);
    } else {
      // Para novo parceiro, buscar a próxima ordem disponível
      const loadNextOrder = async () => {
        try {
          const { PartnerService } = await import('../../services/partnerService');
          const nextOrder = await PartnerService.getNextOrder();
          setFormData(prev => ({ ...prev, order: nextOrder }));
        } catch (error) {
          console.error('Erro ao obter próxima ordem:', error);
        }
      };
      loadNextOrder();
    }
  }, [partner]);

  const handleInputChange = (field: keyof PartnerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Atualizar preview da imagem
    if (field === 'logoUrl') {
      setImagePreview(value);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PartnerFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do parceiro é obrigatório';
    }

    if (!formData.logoUrl.trim()) {
      newErrors.logoUrl = 'URL da logo é obrigatória';
    } else {
      // Validar se é uma URL válida
      try {
        new URL(formData.logoUrl);
      } catch {
        newErrors.logoUrl = 'URL da logo deve ser válida';
      }
    }

    if (formData.websiteUrl && formData.websiteUrl.trim()) {
      try {
        new URL(formData.websiteUrl);
      } catch {
        newErrors.websiteUrl = 'URL do site deve ser válida';
      }
    }

    if (formData.order < 1) {
      newErrors.order = 'Ordem deve ser maior que 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao salvar parceiro:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {partner ? 'Editar Parceiro' : 'Novo Parceiro'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome do Parceiro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome do Parceiro *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Digite o nome do parceiro..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* URL da Logo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL da Logo *
            </label>
            <div className="relative">
              <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://exemplo.com/logo.png"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.logoUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.logoUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.logoUrl}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Cole aqui o link direto da logo (ex: https://imgur.com/abc123.png)
            </p>
          </div>

          {/* Preview da Logo */}
          {imagePreview && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preview da Logo
              </label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <img
                  src={imagePreview}
                  alt="Preview da logo"
                  className="max-h-20 max-w-full object-contain mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* URL do Site */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL do Site (Opcional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                placeholder="https://exemplo.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.websiteUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.websiteUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>
            )}
          </div>

          {/* Ordem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ordem de Exibição *
            </label>
            <input
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  handleInputChange('order', 1);
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue) && numValue >= 1) {
                    handleInputChange('order', numValue);
                  }
                }
              }}
              onFocus={(e) => e.target.select()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.order ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.order && (
              <p className="text-red-500 text-sm mt-1">{errors.order}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Número que define a ordem de exibição (1 = primeiro, 2 = segundo, etc.)
            </p>
          </div>

          {/* Status Ativo */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              {/* Ícone */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                formData.isActive 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {formData.isActive ? (
                  <EyeIcon className="w-6 h-6" />
                ) : (
                  <XMarkIcon className="w-6 h-6" />
                )}
              </div>
              
              {/* Conteúdo */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {formData.isActive ? 'Parceiro Ativo' : 'Parceiro Inativo'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {formData.isActive 
                    ? 'O parceiro será exibido na seção de parceiros do site'
                    : 'O parceiro não será exibido no site'
                  }
                </p>
                
                {/* Toggle Switch */}
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    !formData.isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    Inativo
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('isActive', !formData.isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      formData.isActive ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        formData.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    formData.isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    Ativo
                  </span>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="mt-4 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                formData.isActive ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-xs font-medium ${
                formData.isActive ? 'text-green-700' : 'text-red-700'
              }`}>
                {formData.isActive ? 'Status: Ativo' : 'Status: Inativo'}
              </span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Salvando...' : (partner ? 'Atualizar' : 'Criar')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
