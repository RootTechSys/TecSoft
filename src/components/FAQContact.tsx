import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQContact: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'Como faço para me inscrever no evento?',
      answer: 'As inscrições podem ser feitas através do botão "Inscrever-se" no topo da página. O processo é simples e gratuito.'
    },
    {
      id: 2,
      question: 'O evento é presencial ou online?',
      answer: 'O Open Connections + InCoDay é um evento híbrido, com atividades presenciais na FINATEC/UnB e transmissões online para quem não puder comparecer presencialmente.'
    },
    {
      id: 3,
      question: 'Posso participar apenas de algumas atividades?',
      answer: 'Sim! Você pode escolher quais atividades deseja participar. A programação é flexível e permite que você monte sua própria agenda.'
    },
    {
      id: 4,
      question: 'Há certificado de participação?',
      answer: 'Sim, todos os participantes receberão certificado de participação. Para os workshops, haverá certificados específicos com carga horária.'
    },
    {
      id: 5,
      question: 'Como posso submeter uma ideia para o Pitch Day?',
      answer: 'As submissões podem ser feitas através da seção "Chamada de Ideias BRAFIP" até 15 de outubro de 2025.'
    },
    {
      id: 6,
      question: 'Há estacionamento disponível?',
      answer: 'Sim, há estacionamento disponível na FINATEC/UnB. Recomendamos chegar com antecedência para garantir vaga.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show back to top button after 30% scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setShowBackToTop(scrollPercent > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="py-20"
      style={{
        backgroundColor: '#0E3D4E',
        color: '#EAF2FB'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Section Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
          </motion.div>

          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: '#E7C8A1',
              textShadow: '2px 2px 0 #0C2340, -1px -1px 0 #0C2340, 1px -1px 0 #0C2340, -1px 1px 0 #0C2340'
            }}
          >
            FAQ e Contato
          </h2>
          <p 
            className="text-xl"
            style={{ color: '#B6C3D1' }}
          >
            Tire suas dúvidas e entre em contato conosco
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: '#E7C8A1' }}
            >
              Perguntas Frequentes
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border rounded-2xl overflow-hidden"
                  style={{
                    borderColor: '#16B3A6',
                    backgroundColor: 'rgba(12, 35, 64, 0.8)'
                  }}
                >
                  <motion.button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-10 transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(22, 179, 166, 0.05)' }}
                    onClick={() => toggleFAQ(faq.id)}
                    whileHover={{ backgroundColor: 'rgba(22, 179, 166, 0.1)' }}
                  >
                    <span 
                      className="text-lg font-semibold pr-4"
                      style={{ color: '#E7C8A1' }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="h-5 w-5" style={{ color: '#16B3A6' }} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0">
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ color: '#B6C3D1' }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: '#E7C8A1' }}
            >
              Entre em Contato
            </h3>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-4 p-4 rounded-2xl border-2"
                  style={{
                    borderColor: '#16B3A6',
                    backgroundColor: 'rgba(12, 35, 64, 0.8)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(22, 179, 166, 0.2)',
                      color: '#16B3A6'
                    }}
                  >
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: '#E7C8A1' }}
                    >
                      Email
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#B6C3D1' }}
                    >
                      contato@openconnections.com.br
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 p-4 rounded-2xl border-2"
                  style={{
                    borderColor: '#16B3A6',
                    backgroundColor: 'rgba(12, 35, 64, 0.8)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(22, 179, 166, 0.2)',
                      color: '#16B3A6'
                    }}
                  >
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: '#E7C8A1' }}
                    >
                      Telefone
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#B6C3D1' }}
                    >
                      (61) 99999-9999
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 p-4 rounded-2xl border-2"
                  style={{
                    borderColor: '#16B3A6',
                    backgroundColor: 'rgba(12, 35, 64, 0.8)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(22, 179, 166, 0.2)',
                      color: '#16B3A6'
                    }}
                  >
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: '#E7C8A1' }}
                    >
                      Local
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#B6C3D1' }}
                    >
                      FINATEC/UnB - Brasília, DF
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                className="text-center pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="mailto:contato@openconnections.com.br"
                  className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  style={{
                    backgroundColor: '#E7C8A1',
                    color: '#0C2340',
                    boxShadow: '0 4px 14px 0 rgba(231, 200, 161, 0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 6px 20px 0 rgba(231, 200, 161, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enviar Mensagem
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              style={{
                backgroundColor: '#E7C8A1',
                color: '#0C2340',
                boxShadow: '0 4px 15px rgba(231, 200, 161, 0.4)'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 6px 20px rgba(231, 200, 161, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQContact;
