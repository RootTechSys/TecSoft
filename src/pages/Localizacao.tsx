import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';

const Localizacao: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'map' | 'transport'>('info');

  // Scroll para seção do mapa se houver âncora
  useEffect(() => {
    if (window.location.hash === '#mapa') {
      setActiveTab('map');
      setTimeout(() => {
        const mapElement = document.getElementById('mapa');
        if (mapElement) {
          mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="location-page min-h-screen">
      <style>{`
        /* ===== DESIGN SYSTEM INSPIRADO NO OPEN CONNECTIONS ===== */
        .location-page {
          min-height: 100vh;
          padding: 40px 0 120px;
          background: linear-gradient(180deg, 
            #001a26 0%, 
            #002838 25%, 
            #003d4d 50%,
            #004d5d 75%,
            #005566 100%
          );
          position: relative;
        }

        .container {
          max-width: 1200px;
          width: 85%;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Header com estilo do Open Connections */
        .location-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 20px 32px 30px;
          position: relative;
          background: transparent;
          overflow: visible;
        }

        /* Badge de Data Flutuante */
        .floating-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, 
            rgba(0, 188, 212, 0.15), 
            rgba(0, 229, 255, 0.1)
          );
          backdrop-filter: blur(10px);
          border: 2px solid rgba(0, 229, 255, 0.4);
          padding: 10px 24px;
          border-radius: 30px;
          margin-bottom: 20px;
          box-shadow: 
            0 0 30px rgba(0, 229, 255, 0.3),
            0 8px 24px rgba(0, 0, 0, 0.2);
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .calendar-icon {
          color: #00e5ff;
          flex-shrink: 0;
        }

        .floating-date-badge span {
          font-size: 15px;
          font-weight: 700;
          color: #00e5ff;
          letter-spacing: 0.5px;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }

        /* Título Principal */
        .main-title-clean {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.3;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          position: relative;
          overflow: visible;
          padding: 0 0 8px 0;
        }

        .title-word {
          display: inline-block;
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          line-height: inherit;
          overflow: visible;
        }

        .title-word.gradient {
          background: linear-gradient(135deg, 
            #00e5ff 0%, 
            #00bcd4 30%, 
            #a855f7 70%, 
            #ec4899 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation-delay: 0.2s;
          filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.3));
          display: inline-block;
          padding-bottom: 0.1em;
          line-height: 1.3;
          vertical-align: baseline;
        }

        .title-word.white {
          color: white;
          animation-delay: 0.4s;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Descrição */
        .event-description-clean {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.6s;
          margin-bottom: 0;
        }

        /* Tabs de Navegação */
        .location-tabs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 48px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .location-tab {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 16px 20px 16px 48px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: block;
          text-align: center;
          position: relative;
          width: 100%;
          min-height: 80px;
          white-space: nowrap;
          overflow: visible;
        }

        .location-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 188, 212, 0.5);
          transform: translateY(-2px);
        }

        .location-tab.active {
          background: linear-gradient(135deg, 
            rgba(0, 188, 212, 0.3) 0%, 
            rgba(0, 229, 255, 0.2) 100%
          );
          border-color: #00e5ff;
          box-shadow: 
            0 0 30px rgba(0, 229, 255, 0.4),
            0 8px 24px rgba(0, 188, 212, 0.3),
            inset 0 0 20px rgba(0, 229, 255, 0.1);
          transform: scale(1.05);
        }

        .tab-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .tab-icon svg {
          width: 100%;
          height: 100%;
        }

        .location-tab.active .tab-icon {
          transform: translateY(-50%) scale(1.1);
        }

        .tab-label {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
          line-height: 1.2;
          text-overflow: clip;
        }

        .location-tab.active .tab-label {
          color: white;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }

        /* Cards de Conteúdo */
        .content-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.15),
            0 8px 32px rgba(0, 0, 0, 0.1);
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }

        .content-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-4px) translateZ(0);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            0 16px 48px rgba(0, 0, 0, 0.15),
            0 0 40px rgba(0, 229, 255, 0.2);
        }

        /* Grid de Informações */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.3);
          transform: translateY(-2px);
        }

        .info-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
        }

        .info-content p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.5;
        }


        /* Mapa */
        .map-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .map-container iframe {
          width: 100%;
          height: 400px;
          border: none;
        }

        /* CTA Section */
        .cta-section {
          margin-top: 60px;
          background: linear-gradient(135deg, 
            rgba(0, 188, 212, 0.15), 
            rgba(0, 229, 255, 0.1)
          );
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 2px solid rgba(0, 229, 255, 0.3);
          padding: 40px;
          text-align: center;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(0, 229, 255, 0.1);
        }

        .cta-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
        }

        .cta-description {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #ffd27a, #ff9f4a);
          color: #0b1b2b;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 182, 72, 0.4);
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(255, 182, 72, 0.5);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 16px;
          font-weight: 700;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        /* Desktop: Grid com largura adequada para texto completo */
        @media (min-width: 1024px) {
          :root {
            --item-min: clamp(240px, 22ch + 4rem, 360px);
          }

          .location-tabs {
            grid-template-columns: repeat(3, minmax(var(--item-min), 1fr));
            max-width: 1000px;
          }

          .location-tab {
            overflow: visible;
          }
        }

        /* Responsividade Mobile */
        @media (max-width: 768px) {
          .container {
            width: 95%;
            padding: 0 16px;
          }

          .main-title-clean {
            font-size: 36px;
            line-height: 1.2;
            margin-bottom: 16px;
          }

          .title-word {
            display: block;
            margin-bottom: 4px;
          }

          .location-header {
            padding: 16px 20px 24px;
            margin-bottom: 32px;
          }

          .floating-date-badge {
            padding: 8px 20px;
            font-size: 14px;
            margin-bottom: 16px;
          }

          .event-description-clean {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 0;
          }

          .location-tabs {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
            padding: 12px;
            max-width: none;
          }

          .location-tab {
            padding: 12px 16px 12px 44px;
            min-height: 60px;
          }

          .tab-icon {
            left: 12px;
            width: 20px;
            height: 20px;
          }

          .tab-label {
            font-size: 13px;
            letter-spacing: 0.3px;
          }

          .content-card {
            padding: 24px;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .info-item {
            padding: 16px;
          }

          .info-icon {
            width: 40px;
            height: 40px;
          }

          .info-content h3 {
            font-size: 16px;
          }

          .info-content p {
            font-size: 13px;
          }

          .map-container iframe {
            height: 300px;
          }

          .cta-section {
            margin-top: 40px;
            padding: 32px 20px;
          }

          .cta-title {
            font-size: 24px;
          }

          .cta-description {
            font-size: 16px;
            margin-bottom: 24px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
            padding: 14px 24px;
            font-size: 15px;
          }
        }

        /* Mobile Pequeno */
        @media (max-width: 480px) {
          .main-title-clean {
            font-size: 36px;
          }

          .content-card {
            padding: 20px;
          }

          .info-item {
            padding: 14px;
          }

          .info-icon {
            width: 36px;
            height: 36px;
          }

          .map-container iframe {
            height: 250px;
          }

          .cta-section {
            padding: 24px 16px;
          }

          .cta-title {
            font-size: 20px;
          }

          .cta-description {
            font-size: 14px;
          }
        }
      `}</style>
      
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      <div className="container">
        {/* Header */}
        <div className="location-header">
          {/* Badge de Data Flutuante */}
          <div className="floating-date-badge">
            <svg className="calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>11 e 12 de Novembro, 2025</span>
          </div>

          {/* Título Principal */}
          <h1 className="main-title-clean">
            <span className="title-word gradient">Localização</span>
            <span className="title-word white">do Evento</span>
          </h1>

          {/* Descrição */}
          <p className="event-description-clean">
            Tudo que você precisa saber para chegar ao Open Connections + InCoDay 2025
          </p>
      </div>

        {/* Tabs de Navegação */}
        <div className="location-tabs">
          <button
            className={`location-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="tab-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              </span>
            <span className="tab-label">Informações</span>
          </button>
          
          <button
            className={`location-tab ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <span className="tab-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              </span>
            <span className="tab-label">Mapa</span>
          </button>
          
          <button
            className={`location-tab ${activeTab === 'transport' ? 'active' : ''}`}
            onClick={() => setActiveTab('transport')}
          >
            <span className="tab-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
            </span>
            <span className="tab-label">Transporte</span>
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'info' && (
          <motion.div
            className="content-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #00bcd4, #00e5ff)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                <div className="info-content">
                  <h3>Endereço</h3>
                  <p><strong>Finatec - Fundação de Empreendimentos Científicos e Tecnológicos</strong><br/>
                  Campus da UnB, Asa Norte<br/>
                  Brasília - DF, Brasil</p>
                  </div>
                </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                <div className="info-content">
                  <h3>Data e Horário</h3>
                  <p><strong>11 e 12 de novembro de 2025</strong><br/>
                  8h às 18h<br/>
                  Modalidade: Híbrido (presencial e online)</p>
                  </div>
                </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #ffd27a, #ff9f4a)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                <div className="info-content">
                  <h3>Modalidade</h3>
                  <p><strong>Híbrido</strong><br/>
                  Presencial na Finatec<br/>
                  Transmissão online disponível</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Coordenadas GPS</h3>
                  <p><strong>Latitude:</strong> -15.7631<br/>
                  <strong>Longitude:</strong> -47.8700<br/>
                  <strong>CEP:</strong> 70910-900</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Contato</h3>
                  <p><strong>Djalma Petit</strong><br/>
                  <strong>Telefone:</strong> (61) 99619-8585<br/>
                  <strong>Email:</strong> operacao@tecsoft.org.br</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'map' && (
          <motion.div
            id="mapa"
            className="content-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.1234567890!2d-47.8700!3d-15.7631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ1JzQ3LjEiUyA0N8KwNTInMTIuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <a 
                href="https://maps.google.com/?q=Finatec+Brasilia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === 'transport' && (
            <motion.div
            className="content-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #00bcd4, #00e5ff)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Estacionamento</h3>
                  <p><strong>Gratuito</strong> no local<br/>
                  Vagas limitadas - chegue cedo<br/>
                  Acesso pela portaria principal</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Ônibus</h3>
                  <p><strong>Linhas UnB - Asa Norte</strong><br/>
                  Parada próxima ao campus<br/>
                  Consultar horários no DFTrans</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #ffd27a, #ff9f4a)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Metrô</h3>
                  <p><strong>Estação Asa Norte</strong><br/>
                  15 minutos a pé<br/>
                  Linha Verde - DF</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
              </div>
                <div className="info-content">
                  <h3>Uber/Taxi</h3>
                  <p><strong>Fácil acesso</strong><br/>
                  Aplicativos disponíveis<br/>
                  Endereço: Campus UnB - Finatec</p>
          </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Pronto para participar?</h2>
          <p className="cta-description">
            Garanta sua vaga e faça parte desta experiência única de inovação e colaboração.
          </p>
          <div className="cta-buttons">
            <a href="/hotsite/inscricoes" className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Garantir Vaga
            </a>
            <a href="/hotsite/agenda" className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Ver Agenda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localizacao;