import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  PlusIcon, 
  UserIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { NewsFormData, News, NewsTheme } from '../../types/news';

interface NewsFormProps {
  news?: News | null;
  onSubmit: (data: NewsFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const NEWS_THEMES: NewsTheme[] = [
  'Inovação',
  'Eventos',
  'Parcerias',
  'Startup Ecosystem',
  'Mobile Development',
  'Academic Partnership',
  'Tecnologia',
  'Desenvolvimento',
  'Capacitação',
  'Networking'
];

export default function NewsForm({ news, onSubmit, onCancel, isLoading }: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    coverImageUrl: '',
    briefDescription: '',
    content: '',
    authors: [''],
    theme: 'Tecnologia',
    isPublished: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewsFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        coverImageUrl: news.coverImage || '',
        briefDescription: news.briefDescription,
        content: news.content,
        authors: news.authors,
        theme: news.theme,
        isPublished: news.isPublished
      });
      setImagePreview(news.coverImage);
    }
  }, [news]);

  const handleInputChange = (field: keyof NewsFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };



  const addAuthor = () => {
    setFormData(prev => ({ ...prev, authors: [...prev.authors, ''] }));
  };

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      setFormData(prev => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index)
      }));
    }
  };

  const updateAuthor = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => i === index ? value : author)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewsFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.coverImageUrl.trim()) newErrors.coverImageUrl = 'Link da imagem é obrigatório';
    if (!formData.briefDescription.trim()) newErrors.briefDescription = 'Descrição é obrigatória';
    if (!formData.content.trim()) newErrors.content = 'Conteúdo é obrigatório';
    if (formData.authors.some(author => !author.trim())) newErrors.authors = 'Todos os autores são obrigatórios';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {news ? 'Editar Notícia' : 'Nova Notícia'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título da Notícia *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o título da notícia..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Imagem de Capa */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagem de Capa *
            </label>
            
            {/* Campo para link direto */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Link da Imagem (URL da imagem hospedada)
              </label>
              <input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.coverImageUrl || ''}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    coverImageUrl: e.target.value
                  });
                  if (e.target.value.trim()) {
                    setImagePreview(e.target.value);
                  } else {
                    setImagePreview('');
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Cole aqui o link direto da imagem (ex: https://imgur.com/abc123.jpg)
              </p>
              {errors.coverImageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.coverImageUrl}</p>
              )}
            </div>
            
            {/* Preview da imagem */}
            {formData.coverImageUrl && (
              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-2">Preview da Imagem:</label>
                <div className="w-32 h-20 border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.coverImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      console.log('Erro ao carregar imagem');
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Descrição Breve */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição Breve *
            </label>
            <textarea
              value={formData.briefDescription}
              onChange={(e) => handleInputChange('briefDescription', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.briefDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite uma descrição breve da notícia..."
            />
            {errors.briefDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.briefDescription}</p>
            )}
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Conteúdo da Notícia *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o conteúdo completo da notícia..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Dica: Use **texto** para negrito, *texto* para itálico, etc.
            </p>
          </div>

          {/* Autores */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Autores *
            </label>
            <div className="space-y-2">
              {formData.authors.map((author, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => updateAuthor(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nome do autor..."
                  />
                  {formData.authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addAuthor}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Adicionar Autor</span>
              </button>
            </div>
            {errors.authors && (
              <p className="text-red-500 text-sm mt-1">{errors.authors}</p>
            )}
          </div>

          {/* Tema */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tema *
            </label>
            <div className="relative">
              <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.theme}
                onChange={(e) => handleInputChange('theme', e.target.value as NewsTheme)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {NEWS_THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status de Publicação */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              {/* Ícone */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                formData.isPublished 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {formData.isPublished ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              
              {/* Conteúdo */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {formData.isPublished ? 'Publicar Imediatamente' : 'Salvar como Rascunho'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {formData.isPublished 
                    ? 'A notícia será publicada instantaneamente e ficará visível no site'
                    : 'A notícia será salva como rascunho para edição posterior'
                  }
                </p>
                
                {/* Toggle Switch */}
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    !formData.isPublished ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    Rascunho
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('isPublished', !formData.isPublished)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      formData.isPublished ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        formData.isPublished ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    formData.isPublished ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    Publicar
                  </span>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="mt-4 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                formData.isPublished ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span className={`text-xs font-medium ${
                formData.isPublished ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {formData.isPublished ? 'Status: Publicação Imediata' : 'Status: Rascunho'}
              </span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Salvando...' : (news ? 'Atualizar' : 'Criar')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
