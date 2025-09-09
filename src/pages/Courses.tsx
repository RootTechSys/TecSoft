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

  const categories = [
    { id: 'all', name: 'Todos os Cursos' },
    { id: 'programming', name: 'Programação' },
    { id: 'data-science', name: 'Ciência de Dados' },
    { id: 'ai-ml', name: 'IA e Machine Learning' },
    { id: 'web-development', name: 'Desenvolvimento Web' },
    { id: 'mobile', name: 'Desenvolvimento Mobile' },
    { id: 'devops', name: 'DevOps e Cloud' },
    { id: 'management', name: 'Gestão de Projetos' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Desenvolvimento Web Full Stack',
      description: 'Aprenda a desenvolver aplicações web completas com as tecnologias mais modernas do mercado.',
      category: 'web-development',
      duration: '120 horas',
      level: 'Intermediário',
      price: 'R$ 1.200',
      originalPrice: 'R$ 1.500',
      rating: 4.8,
      students: 245,
      instructor: 'Prof. Carlos Silva',
      features: [
        'HTML5, CSS3 e JavaScript',
        'React.js e Node.js',
        'Banco de dados MongoDB',
        'Deploy em produção',
        'Certificado de conclusão'
      ],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Inteligência Artificial Aplicada',
      description: 'Domine os conceitos fundamentais de IA e aprenda a implementar soluções inteligentes.',
      category: 'ai-ml',
      duration: '80 horas',
      level: 'Avançado',
      price: 'R$ 980',
      originalPrice: 'R$ 1.200',
      rating: 4.9,
      students: 189,
      instructor: 'Dra. Ana Costa',
      features: [
        'Fundamentos de Machine Learning',
        'Deep Learning com Python',
        'Processamento de linguagem natural',
        'Visão computacional',
        'Projetos práticos'
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Data Science I: Ciência de Dados',
      description: 'Introdução à ciência de dados com foco em análise exploratória e visualização.',
      category: 'data-science',
      duration: '60 horas',
      level: 'Básico',
      price: 'R$ 750',
      originalPrice: 'R$ 900',
      rating: 4.7,
      students: 312,
      instructor: 'Prof. Roberto Santos',
      features: [
        'Python para Data Science',
        'Pandas e NumPy',
        'Visualização com Matplotlib',
        'Análise estatística',
        'Projeto final'
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'Desenvolvimento Mobile com React Native',
      description: 'Crie aplicativos móveis multiplataforma com React Native e JavaScript.',
      category: 'mobile',
      duration: '90 horas',
      level: 'Intermediário',
      price: 'R$ 890',
      originalPrice: 'R$ 1.100',
      rating: 4.6,
      students: 178,
      instructor: 'Prof. Maria Oliveira',
      features: [
        'Fundamentos do React Native',
        'Navegação e roteamento',
        'Integração com APIs',
        'Publicação nas lojas',
        'Performance e otimização'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: 'DevOps e Cloud Computing',
      description: 'Aprenda práticas DevOps e deploy em nuvem com AWS, Docker e Kubernetes.',
      category: 'devops',
      duration: '100 horas',
      level: 'Avançado',
      price: 'R$ 1.100',
      originalPrice: 'R$ 1.400',
      rating: 4.8,
      students: 156,
      instructor: 'Prof. João Pereira',
      features: [
        'Docker e containers',
        'Kubernetes',
        'AWS Cloud Services',
        'CI/CD pipelines',
        'Monitoramento e logs'
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 6,
      title: 'Gestão de Projetos Ágeis',
      description: 'Metodologias ágeis para gestão eficiente de projetos de tecnologia.',
      category: 'management',
      duration: '40 horas',
      level: 'Básico',
      price: 'R$ 650',
      originalPrice: 'R$ 800',
      rating: 4.5,
      students: 203,
      instructor: 'Prof. Fernanda Lima',
      features: [
        'Scrum e Kanban',
        'Ferramentas ágeis',
        'Gestão de equipes',
        'Métricas e KPIs',
        'Certificação preparatória'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
      title: 'Instrutores Especializados',
      description: 'Professores com vasta experiência no mercado de tecnologia'
    },
    {
      icon: UserGroupIcon,
      title: 'Turmas Reduzidas',
      description: 'Atenção personalizada com no máximo 15 alunos por turma'
    },
    {
      icon: ClockIcon,
      title: 'Flexibilidade de Horários',
      description: 'Cursos em diferentes horários para se adequar à sua rotina'
    },
    {
      icon: StarIcon,
      title: 'Certificação Reconhecida',
      description: 'Certificados válidos e reconhecidos pelo mercado'
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
              Cursos e <span className="text-gradient">Capacitação</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Desenvolva suas habilidades com nossos cursos especializados em tecnologia, 
              ministrados por profissionais experientes do mercado.
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card overflow-hidden group"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {course.students} alunos
                      </div>
                    </div>

                    {/* Instructor */}
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Instrutor:</span> {course.instructor}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {course.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-700">
                          <CheckCircleIcon className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">
                          {course.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {course.originalPrice}
                        </span>
                      </div>
                      <button className="btn-primary">
                        Ver Detalhes
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
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
