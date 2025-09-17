import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Updated courses data - 2024

  const categories = [
    { id: 'all', name: 'Todos os Cursos' },
    { id: 'innovation', name: 'Inovação' },
    { id: 'project-management', name: 'Gestão de Projetos' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Curso Gestão de Ideias para Inovação',
      description: 'Aprenda a metodologia MGPDI para gestão eficiente de ideias e inovação em projetos.',
      category: 'innovation',
      duration: '6 horas',
      level: 'Intermediário',
      price: 'Gratuito',
      originalPrice: '',
      rating: 5.0,
      students: 0,
      instructor: 'Cristina Filipak Machado',
      instructorTitle: 'Co-criadora da Metodologia MGPDI',
      features: [
        'Metodologia MGPDI',
        'Gestão de ideias',
        'Processo de inovação',
        'Ferramentas práticas',
        'Certificado de participação'
      ],
      schedule: '11/11 e 12/11/25',
      time: '14:30 às 17:30',
      location: 'Sede da Finatec-UnB',
      locationUrl: 'https://maps.app.goo.gl/mP1iyT24Bd2rAkcCA',
      event: 'Open Connections + InCoDay',
      status: 'Aguarde link de inscrição!',
      statusType: 'Em Breve',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50',
      icon: '💡'
    },
    {
      id: 2,
      title: 'Curso Gestão da Colaboração para Inovação',
      description: 'Aprenda a metodologia MGPDI para gestão eficiente da colaboração e inovação em projetos.',
      category: 'innovation',
      duration: '6 horas',
      level: 'Intermediário',
      price: 'Gratuito',
      originalPrice: '',
      rating: 5.0,
      students: 0,
      instructor: 'José Antonio Antonioni e Kival Weber',
      instructorTitle: 'Co-criadores da Metodologia MGPDI',
      features: [
        'Metodologia MGPDI',
        'Gestão da colaboração',
        'Processo de inovação',
        'Ferramentas práticas',
        'Certificado de participação'
      ],
      schedule: '11/11 e 12/11/25',
      time: '14:30 às 17:30',
      location: 'Sede da Finatec-UnB',
      locationUrl: 'https://maps.app.goo.gl/mP1iyT24Bd2rAkcCA',
      event: 'Open Connections + InCoDay',
      status: 'Aguarde link de inscrição!',
      statusType: 'Em Breve',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🎯'
    },
    {
      id: 3,
      title: 'Curso Inovação Aberta: Gestão de Projetos Inovadores usando Métodos Ágeis e Design Thinking',
      description: 'Domine a gestão de projetos inovadores combinando metodologias ágeis com Design Thinking.',
      category: 'project-management',
      duration: '6 horas',
      level: 'Intermediário',
      price: 'Gratuito',
      originalPrice: '',
      rating: 5.0,
      students: 0,
      instructor: 'Rodrigo Quites',
      instructorTitle: 'Co-criador da Metodologia MGPDI',
      features: [
        'Métodos Ágeis',
        'Design Thinking',
        'Gestão de projetos inovadores',
        'Ferramentas práticas',
        'Certificado de participação'
      ],
      schedule: '11/11 e 12/11/25',
      time: '09:30 às 12:30',
      location: 'Sede da Finatec-UnB',
      locationUrl: 'https://maps.app.goo.gl/mP1iyT24Bd2rAkcCA',
      event: 'Open Connections + InCoDay',
      status: 'Aguarde link de inscrição!',
      statusType: 'Em Breve',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'bg-green-600',
      bgColor: 'bg-green-50',
      icon: '🚀'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const valuePropositions = [
    {
      icon: AcademicCapIcon,
      title: 'Instrutores Especialistas',
      description: 'Co-criadores da Metodologia MGPDI com vasta experiência'
    },
    {
      icon: UserGroupIcon,
      title: 'Evento Gratuito',
      description: 'Cursos totalmente gratuitos no âmbito do evento'
    },
    {
      icon: ClockIcon,
      title: 'Carga Horária Concentrada',
      description: '6 horas de conteúdo intensivo e prático'
    },
    {
      icon: StarIcon,
      title: 'Certificado de Participação',
      description: 'Certificado válido para todos os participantes'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Cursos <span className="text-gradient">Open Connections + InCoDay</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Participe dos cursos gratuitos do evento Open Connections + InCoDay, 
              ministrados por especialistas da Metodologia MGPDI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((proposition, index) => (
              <motion.div
                key={proposition.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <proposition.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {proposition.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {proposition.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">
              Encontre seu <span className="text-gradient">Curso Ideal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore nossa variedade de cursos e encontre a capacitação perfeita 
              para impulsionar sua carreira.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FunnelIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou termos de busca.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${course.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col`}
                >
                  {/* Course Header */}
                  <div className={`relative h-32 ${course.color} p-4`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <StarIcon className="w-3 h-3 text-yellow-300 fill-current" />
                        <span className="ml-1 text-xs font-medium text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{course.icon}</span>
                      <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight flex-1">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Meta - Compact */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-3 h-3 mr-1" />
                        {course.students} alunos
                      </div>
                    </div>

                    {/* Instructor - Compact */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 font-medium">
                        {course.instructor}
                      </p>
                      {course.instructorTitle && (
                        <p className="text-xs text-gray-500">
                          {course.instructorTitle}
                        </p>
                      )}
                    </div>

                    {/* Schedule - Compact */}
                    <div className="space-y-1 mb-3 text-xs text-gray-600">
                      <p><span className="font-medium">Dias:</span> {course.schedule}</p>
                      {course.time && (
                        <p><span className="font-medium">Horário:</span> {course.time}</p>
                      )}
                      <p>
                        <span className="font-medium">Local:</span> 
                        <a 
                          href={course.locationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          {course.location}
                        </a>
                      </p>
                      {course.event && (
                        <p className="text-blue-600 font-medium text-xs">
                          {course.event}
                        </p>
                      )}
                    </div>

                    {/* Features - Compact */}
                    <div className="mb-4 flex-1">
                      <div className="flex flex-wrap gap-1">
                        {course.features.slice(0, 3).map((feature) => (
                          <span 
                            key={feature} 
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA - Fixed at bottom */}
                    <div className="mt-auto">
                      <div className="text-center mb-2">
                        <span className="text-xl font-bold text-green-600">
                          {course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Status */}
                      {course.status && (
                        <div className="text-center mb-3">
                          <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            {course.status}
                          </span>
                        </div>
                      )}
                      
                      <button 
                        className={`w-full ${course.color} hover:opacity-90 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm`}
                        disabled={course.status?.includes('Aguarde')}
                      >
                        {course.status?.includes('Aguarde') ? 'Em Breve' : 'Ver Detalhes'}
                        <ArrowRightIcon className="w-4 h-4 ml-2 inline" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Pronto para impulsionar sua carreira?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Entre em contato conosco para mais informações sobre nossos cursos 
              e descubra como podemos ajudar você a alcançar seus objetivos profissionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contato" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Solicitar Informações
              </a>
              <a href="/contato" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                Agendar Consultoria
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
