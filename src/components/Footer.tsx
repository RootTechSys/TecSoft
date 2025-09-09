import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    institucional: [
      { name: 'Sobre a Tecsoft', href: '/sobre' },
      { name: 'Nossos Serviços', href: '/servicos' },
      { name: 'Associe-se', href: 'https://docs.google.com/forms/d/1OrbitPrktXc30jVR1oVlxzhkenaRLzRvgzvy3yUAnO4/viewform?edit_requested=true', external: true },
      { name: 'Estatuto Social', href: '/estatuto' },
    ],
    servicos: [
      { name: 'Consultoria e Planejamento', href: '/servicos' },
      { name: 'Desenvolvimento e Fomento', href: '/servicos' },
      { name: 'Cursos e Capacitação', href: '/cursos' },
      { name: 'Parcerias', href: '/servicos' },
    ],
    recursos: [
      { name: 'Notícias', href: '/noticias' },
      { name: 'Blog', href: '/blog' },
      { name: 'Eventos', href: '/eventos' },
      { name: 'Biblioteca', href: '/biblioteca' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
  ];

  return (
    <footer className="bg-secondary-600 text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-graphite font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">TECSOFT</h3>
                <p className="text-sm text-snow/80">Centro de Tecnologia e Software</p>
              </div>
            </div>
            <p className="text-snow/90 text-sm leading-relaxed mb-6">
              Promovendo o desenvolvimento tecnológico e a inovação em Brasília através de 
              consultoria, capacitação e fomento ao setor de tecnologia e software.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-secondary-700 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-snow/80 hover:text-graphite transition-colors">
                    {social.icon === 'linkedin' && 'in'}
                    {social.icon === 'facebook' && 'f'}
                    {social.icon === 'instagram' && 'ig'}
                    {social.icon === 'youtube' && 'yt'}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Institutional Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Institucional</h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-snow/80 hover:text-accent-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-snow/80 hover:text-accent-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-snow/80 hover:text-accent-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-snow/90 text-sm">SCS QUADRA 06 BLOCO A Nº 136 SALA 108 - 1º ANDAR - ED. SÔNIA - BRASÍLIA - DF - CEP: 70.306-000</p>
                  <p className="text-snow/70 text-xs">Centro de Tecnologia e Software</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a 
                  href="tel:+5561991310961" 
                  className="text-snow/90 hover:text-accent-500 transition-colors duration-200 text-sm"
                >
                  61 9 9131-0961
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a 
                  href="mailto:tecsoft@tecsoft.org.br" 
                  className="text-snow/90 hover:text-accent-500 transition-colors duration-200 text-sm"
                >
                  tecsoft@tecsoft.org.br
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <GlobeAltIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <a 
                  href="https://tecsoft.org.br" 
                  className="text-snow/90 hover:text-accent-500 transition-colors duration-200 text-sm"
                >
                  www.tecsoft.org.br
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary-700">
        <div className="container-custom py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-snow/80 text-sm">
              © {currentYear} Centro de Tecnologia e Software de Brasília (TECSOFT). 
              Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6 text-sm">
                <Link to="/privacidade" className="text-snow/80 hover:text-accent-500 transition-colors">Política de Privacidade</Link>
                <Link to="/termos" className="text-snow/80 hover:text-accent-500 transition-colors">Termos de Uso</Link>
                <Link to="/cookies" className="text-snow/80 hover:text-accent-500 transition-colors">Cookies</Link>
              </div>
              
              {/* Botão Voltar ao Topo */}
              <motion.button
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                  });
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-accent-500 hover:bg-accent-600 text-graphite rounded-lg flex items-center justify-center transition-colors duration-300 ml-4"
                aria-label="Voltar ao topo"
              >
                <ArrowUpIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
