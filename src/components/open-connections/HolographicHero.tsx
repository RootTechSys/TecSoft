import React from 'react';
import { motion } from 'framer-motion';

const HolographicHero: React.FC = () => {
  return (
    <section className="hero-section">
      <style>{`
        /* ===== HERO SECTION - INOVADORA ===== */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 80px 20px;
          overflow: hidden;
          background: linear-gradient(135deg, 
            #001a26 0%,
            #002838 25%,
            #003d4d 50%,
            #004d5d 75%,
            #005566 100%
          );
        }

        /* Background Tech Pattern - LEVE */
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(90deg, 
              transparent 0px, 
              rgba(0, 188, 212, 0.03) 1px, 
              transparent 2px, 
              transparent 60px
            ),
            repeating-linear-gradient(0deg, 
              transparent 0px, 
              rgba(0, 188, 212, 0.03) 1px, 
              transparent 2px, 
              transparent 60px
            ),
            radial-gradient(circle at 20% 30%, rgba(0, 188, 212, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%);
          pointer-events: none;
          animation: gridMove 20s linear infinite;
          opacity: 0.6;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        /* Container Hero */
        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ===== IMAGEM HEXAGONAL COM MOLDURA ===== */

        .hero-image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Container da Imagem */
        .hero-image-container {
          position: relative;
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MOLDURA HEXAGONAL - Shape ao redor */
        .hexagon-frame {
          position: absolute;
          width: 520px;
          height: 520px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, 
            rgba(251, 191, 36, 0.2) 0%,
            rgba(251, 191, 36, 0.1) 100%
          );
          border: 4px solid #fbbf24; /* Borda amarela sólida */
          z-index: 1;
          pointer-events: none;
        }

        /* Borda Externa Adicional (Efeito Duplo) */
        .hexagon-frame::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          border: 2px solid rgba(251, 191, 36, 0.3);
        }

        /* Imagem Hexagonal (dentro da moldura) */
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .hero-image:hover {
          transform: scale(1.05);
        }

        /* Glow Amarelo sutil ao redor */
        .hexagon-glow {
          position: absolute;
          width: 540px;
          height: 540px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: radial-gradient(circle, 
            rgba(251, 191, 36, 0.3) 0%,
            rgba(251, 191, 36, 0.15) 50%,
            transparent 70%
          );
          filter: blur(15px);
          z-index: 0;
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.03);
          }
        }

        /* REMOVER completamente os corner-dots */
        /* .hexagon-corners { display: none; } */
        /* .corner-dot { display: none; } */

        /* ===== EFEITOS TECH - LEVES E PERFORMÁTICOS ===== */

        /* Partículas Flutuantes (mantidas) */
        .tech-particles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          pointer-events: none;
          z-index: 1;
        }

        .tech-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 188, 212, 0.7);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 188, 212, 0.8);
          animation: particleFloat 10s ease-in-out infinite;
        }

        .tech-particle:nth-child(1) {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
          animation-duration: 11s;
        }

        .tech-particle:nth-child(2) {
          top: 30%;
          left: 80%;
          animation-delay: 1.5s;
          animation-duration: 13s;
        }

        .tech-particle:nth-child(3) {
          top: 60%;
          left: 10%;
          animation-delay: 3s;
          animation-duration: 12s;
        }

        .tech-particle:nth-child(4) {
          top: 80%;
          left: 70%;
          animation-delay: 4s;
          animation-duration: 14s;
        }

        .tech-particle:nth-child(5) {
          top: 40%;
          left: 50%;
          animation-delay: 2s;
          animation-duration: 15s;
        }

        .tech-particle:nth-child(6) {
          top: 70%;
          left: 30%;
          animation-delay: 3.5s;
          animation-duration: 13.5s;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 40px), var(--ty, -90px));
            opacity: 0;
          }
        }

        .tech-particle:nth-child(1) { --tx: 25px; --ty: -95px; }
        .tech-particle:nth-child(2) { --tx: -35px; --ty: -85px; }
        .tech-particle:nth-child(3) { --tx: 50px; --ty: -75px; }
        .tech-particle:nth-child(4) { --tx: -25px; --ty: -100px; }
        .tech-particle:nth-child(5) { --tx: 45px; --ty: -80px; }
        .tech-particle:nth-child(6) { --tx: -45px; --ty: -90px; }

        /* Círculos Concêntricos Pulsantes */
        .tech-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 550px;
          height: 550px;
          pointer-events: none;
          z-index: 0;
        }

        .tech-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(0, 188, 212, 0.12);
          border-radius: 50%;
          animation: ringPulse 5s ease-out infinite;
        }

        .tech-ring:nth-child(1) {
          width: 450px;
          height: 450px;
          animation-delay: 0s;
        }

        .tech-ring:nth-child(2) {
          width: 500px;
          height: 500px;
          animation-delay: 1.5s;
        }

        .tech-ring:nth-child(3) {
          width: 550px;
          height: 550px;
          animation-delay: 3s;
        }

        @keyframes ringPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        /* Linhas de Dados Tech */
        .tech-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .tech-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 188, 212, 0.4) 50%, 
            transparent 100%
          );
          animation: lineMove 10s linear infinite;
        }

        .tech-line:nth-child(1) {
          top: 20%;
          width: 200px;
          left: -200px;
          animation-delay: 0s;
        }

        .tech-line:nth-child(2) {
          top: 50%;
          width: 150px;
          left: -150px;
          animation-delay: 3s;
        }

        .tech-line:nth-child(3) {
          top: 80%;
          width: 180px;
          left: -180px;
          animation-delay: 6s;
        }

        @keyframes lineMove {
          0% {
            left: -200px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Pontos de Conexão Tech (CYAN - não amarelos) */
        .tech-dots {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .tech-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(0, 188, 212, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 188, 212, 0.8);
          animation: dotBlink 4s ease-in-out infinite;
        }

        .tech-dot:nth-child(1) {
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .tech-dot:nth-child(2) {
          top: 25%;
          right: 20%;
          animation-delay: 1.5s;
        }

        .tech-dot:nth-child(3) {
          bottom: 30%;
          left: 25%;
          animation-delay: 3s;
        }

        .tech-dot:nth-child(4) {
          bottom: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        @keyframes dotBlink {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        /* ===== CONTEÚDO HERO (Texto) ===== */
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.1;
          color: white;
          margin: 0;
        }

        .hero-highlight {
          background: linear-gradient(135deg, #00e5ff, #00bcd4, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          max-width: 600px;
        }

        .hero-event-title {
          background: linear-gradient(135deg, #00bcd4, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(0, 188, 212, 0.3);
        }

        .hero-cta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 16px 40px;
          background: linear-gradient(135deg, #00bcd4, #00e5ff);
          color: white;
          font-size: 18px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 188, 212, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 188, 212, 0.6);
        }

        .btn-secondary {
          padding: 16px 40px;
          background: transparent;
          color: white;
          font-size: 18px;
          font-weight: 700;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6);
        }

        /* ===== RESPONSIVIDADE ===== */

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          
          .hero-image-container {
            width: 400px;
            height: 400px;
          }
          
          .hexagon-frame {
            width: 420px;
            height: 420px;
          }
          
          .hexagon-glow {
            width: 440px;
            height: 440px;
          }
          
          .tech-particles,
          .tech-rings {
            width: 500px;
            height: 500px;
          }
          
          .hero-title {
            font-size: 48px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 20px;
          }
          
          .hero-image-container {
            width: 320px;
            height: 320px;
          }
          
          .hexagon-frame {
            width: 340px;
            height: 340px;
            border-width: 3px;
          }
          
          .hexagon-glow {
            width: 360px;
            height: 360px;
          }
          
          .tech-particles,
          .tech-rings {
            width: 400px;
            height: 400px;
          }
          
          .tech-particle {
            width: 2px;
            height: 2px;
          }
          
          .tech-dot {
            width: 4px;
            height: 4px;
          }
          
          .hero-title {
            font-size: 36px;
          }
          
          .hero-description {
            font-size: 18px;
          }
        }
      `}</style>
      <div className="hero-container">
        {/* Lado Esquerdo - Conteúdo */}
        <div className="hero-content">
          <h1 className="hero-title">
            Conectando <span className="hero-highlight">Inovação</span> e Tecnologia
          </h1>
          <p className="hero-description">
            <span className="hero-event-title">Open Connections + InCoDay 2025</span>: reunindo Tecnologia, Inovação e Negócios para o desenvolvimento profissional, empresarial e do DF
          </p>
          <div className="hero-cta">
            <a href="https://forms.gle/4iqerAKaukLmkGgCA" target="_blank" rel="noopener noreferrer" className="btn-primary">Inscreva-se Agora</a>
            <a href="/hotsite/sobre" className="btn-secondary">Saiba Mais</a>
          </div>
        </div>

        {/* Lado Direito - Imagem com Moldura Hexagonal */}
        <div className="hero-image-wrapper">
          {/* Glow de fundo */}
          <div className="hexagon-glow"></div>

          {/* Moldura Hexagonal Externa */}
          <div className="hexagon-frame"></div>

          {/* Container da Imagem */}
          <div className="hero-image-container">
            <img 
              src="/Connection.png" 
              alt="Person with VR headset" 
              className="hero-image"
            />
          </div>

          {/* Partículas Flutuantes (cyan) */}
          <div className="tech-particles">
            <div className="tech-particle"></div>
            <div className="tech-particle"></div>
            <div className="tech-particle"></div>
            <div className="tech-particle"></div>
            <div className="tech-particle"></div>
            <div className="tech-particle"></div>
          </div>

          {/* Círculos Concêntricos */}
          <div className="tech-rings">
            <div className="tech-ring"></div>
            <div className="tech-ring"></div>
            <div className="tech-ring"></div>
          </div>

          {/* Linhas de Dados */}
          <div className="tech-lines">
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            </div>

          {/* Pontos de Conexão (cyan - não amarelo) */}
          <div className="tech-dots">
            <div className="tech-dot"></div>
            <div className="tech-dot"></div>
            <div className="tech-dot"></div>
            <div className="tech-dot"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HolographicHero;

