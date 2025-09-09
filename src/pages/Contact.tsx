import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Endereço',
      content: 'SCS QUADRA 06 BLOCO A Nº 136 SALA 108 - 1º ANDAR - ED. SÔNIA - BRASÍLIA - DF - CEP: 70.306-000',
      subtitle: 'Centro de Tecnologia e Software',
      link: null
    },
    {
      icon: PhoneIcon,
      title: 'Telefone',
      content: '61 9 9131-0961',
      subtitle: 'Segunda a Sexta, 8h às 18h',
      link: 'tel:+5561991310961'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: 'tecsoft@tecsoft.org.br',
      subtitle: 'Respondemos em até 24h',
      link: 'mailto:tecsoft@tecsoft.org.br'
    },
    {
      icon: ClockIcon,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sexta',
      subtitle: '8h às 18h',
      link: null
    }
  ];

  const departments = [
    {
      name: 'Associação e Membros',
      email: 'associados@tecsoft.org.br',
      phone: '(61) 99999-9991',
      description: 'Informações sobre associação, benefícios e suporte aos membros.'
    },
    {
      name: 'Cursos e Capacitação',
      email: 'cursos@tecsoft.org.br',
      phone: '(61) 99999-9992',
      description: 'Informações sobre cursos, workshops e programas de capacitação.'
    },
    {
      name: 'Consultoria e Serviços',
      email: 'consultoria@tecsoft.org.br',
      phone: '(61) 99999-9993',
      description: 'Solicitações de consultoria, projetos e parcerias.'
    },
    {
      name: 'Eventos e Comunicação',
      email: 'eventos@tecsoft.org.br',
      phone: '(61) 99999-9994',
      description: 'Eventos, notícias e comunicação institucional.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
              Entre em <span className="text-gradient">Contato</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12">
              Estamos aqui para ajudar você. Entre em contato conosco e descubra 
              como podemos impulsionar seu negócio ou carreira.
            </p>
            
            {/* Contact Cards Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-sm block mb-1"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-medium text-sm mb-1 leading-relaxed">
                      {info.content}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs">
                    {info.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information - Detailed View */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">
              Informações <span className="text-gradient">Detalhadas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conheça mais sobre nossa localização e formas de contato para 
              uma experiência completa de atendimento.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-lg block mb-2"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-700 font-medium text-lg mb-2 leading-relaxed">
                          {info.content}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Departments Section - COMMENTED OUT FOR FUTURE USE */}
      {/* 
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">
              Nossos <span className="text-gradient">Departamentos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entre em contato com o departamento específico para obter 
              atendimento mais direcionado e eficiente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {dept.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <EnvelopeIcon className="w-4 h-4 mr-2 text-primary-500" />
                    <a 
                      href={`mailto:${dept.email}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <PhoneIcon className="w-4 h-4 mr-2 text-primary-500" />
                    <a 
                      href={`tel:${dept.phone}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {dept.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Contact Form Section - COMMENTED OUT FOR FUTURE USE */}
      {/* 
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">
                Envie sua <span className="text-gradient">Mensagem</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Preencha o formulário ao lado e nossa equipe entrará em contato 
                em até 24 horas para atender sua solicitação.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Resposta Rápida</h3>
                    <p className="text-gray-600">Entraremos em contato em até 24h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Atendimento Personalizado</h3>
                    <p className="text-gray-600">Cada solicitação é tratada individualmente</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Suporte Completo</h3>
                    <p className="text-gray-600">Acompanhamento durante todo o processo</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecione um assunto...</option>
                    <option value="associacao">Associação e Membros</option>
                    <option value="cursos">Cursos e Capacitação</option>
                    <option value="consultoria">Consultoria e Serviços</option>
                    <option value="eventos">Eventos e Comunicação</option>
                    <option value="parcerias">Parcerias</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Conte-nos como podemos ajudar você..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      */}

    </div>
  );
};

export default Contact;
