'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';
import Logo from '../components/Logo';

export default function SobreEventos() {
  const [activeEvent, setActiveEvent] = useState('open');

  return (
    <div className="sobre-page">
      <style>{`
        /* ===== PÁGINA SOBRE - COM GRADIENTE COLORIDO ===== */
        .sobre-page {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            #009dc4 0%,          /* Cyan mais escuro */
            #0b6bb1 30%,         /* Azul profundo */
            #5a67d8 55%,         /* Azul-roxo */
            #7c3aed 75%,         /* Roxo */
            #b83280 100%         /* Rosa mais escuro */
          );
          position: relative;
          overflow-x: hidden;
        }

        /* Pattern overlay sutil */
        .sobre-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(90deg, 
              transparent 0px, 
              rgba(255, 255, 255, 0.02) 1px, 
              transparent 2px, 
              transparent 60px
            ),
            repeating-linear-gradient(0deg, 
              transparent 0px, 
              rgba(255, 255, 255, 0.02) 1px, 
              transparent 2px, 
              transparent 60px
            );
          pointer-events: none;
          opacity: 0.5;
        }

        /* ===== HERO SECTION - NÍTIDO SEM GHOSTING ===== */
        .hero-compact {
          position: relative;
          padding: 28px 0 16px; /* mais compacto */
        }

        /* escurece suavemente o fundo somente atrás do herói */
        .hero-compact::before{
          content:'';
          position:absolute; 
          inset:0;
          background: radial-gradient(60% 50% at 50% 45%,
            rgba(0,0,0,.35) 0%, rgba(0,0,0,.25) 40%, rgba(0,0,0,0) 100%);
          pointer-events:none;
          z-index: 0;
        }

        /* banda mais escura por trás do título */
        .hero-darkband{
          position:absolute; 
          left:0; 
          right:0;
          top: clamp(8px,4vw,18px); 
          height: clamp(120px,18vw,180px);
          background: linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.06));
          filter: blur(10px);
          opacity:.7; 
          z-index:0; 
          pointer-events:none;
        }

        /* Garantir que overlays fiquem atrás do texto */
        .sobre-hero::before{ z-index: 0; }
        .hero-inner{ position: relative; z-index: 1; }

        /* Conteúdo central - sem transform 3D */
        .hero-inner { 
          max-width: 980px; 
          margin: 0 auto; 
          text-align: center; 
          padding: 0 20px; 
    position: relative;
          z-index: 1;
          transform: none !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Eyebrow */
        .hero-eyebrow{
          display:inline-block;
          padding:6px 16px;
          border:1px solid rgba(255,255,255,.3);
          border-radius:14px;
          backdrop-filter: blur(8px);
          color:#fff;
          font-weight:700;
          font-size:12px;
          letter-spacing:.08em;
          text-transform:uppercase;
          margin-bottom:14px;
        }

        /* Título geral com leve sombra só para recorte no fundo */
        .hero-title{
          font-size: clamp(30px,4vw,52px);
          font-weight: 900;
          line-height: 1.12;
          color: #fff;
          margin: 0 0 8px;
          text-align: center;
          text-wrap: balance;
          text-shadow: 0 2px 6px rgba(0,0,0,.28);
          /* não use transform no título para não suavizar a fonte */
        }

        /* Gradiente sem filtros que borram */
        .grad-solid{
          background: linear-gradient(135deg,#b9f6ff 0%,#a78bfa 55%,#f69dcc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          filter: none !important;              /* remove qualquer herança */
          text-shadow: none;                     /* o gradiente já destaca */
        }

        /* Alternativa: cor sólida de alto contraste para monitores que ainda parecem suaves */
        @media (prefers-contrast: high) {
          .grad-solid{
            -webkit-text-fill-color: #eafaff;
            background: none;
            color: #eafaff; /* fallback em navegadores sem background-clip */
          }
        }

        /* Palavra branca plena ao lado */
        .hero-title .weak{
          color: #fff;
          opacity: .98;
        }

        /* Se havia classe .grad com drop-shadow, neutralize-a aqui */
        .grad, .switcher span{
          filter: none !important;
          text-shadow: none !important;
        }

        /* Evita antialias "lavado" por transform 3D no container */
        .hero-inner, .sobre-hero{
          transform: none !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Linha de reforço sutil */
        .hero-title::after{
          content:'';
          display:block;
          width: 220px; 
          height: 2px;
          margin: 10px auto 0;
          background: linear-gradient(90deg,transparent,#fff,transparent);
          opacity:.35;
        }

        /* Subtítulo mais legível (menor, branco 92% e largura limitada) */
        .hero-sub{
          font-size: clamp(14px,1.6vw,18px);
          color: rgba(255,255,255,.92);
          margin: 8px auto 16px;
          max-width: 820px;       /* evita linhas longas */
          text-align: center;
          text-shadow: 0 1px 6px rgba(0,0,0,.35);
        }

        /* CTAs com contraste e foco claros */
        .hero-cta{ 
          display:flex; 
          gap:12px; 
          justify-content:center; 
          flex-wrap:wrap; 
        }
        
        .btn-primary{
          padding:12px 22px; 
          border-radius:12px; 
          font-weight:800; 
          color:#0b1b2b;
          background: linear-gradient(135deg,#fff,#e8f6ff);
          box-shadow:0 10px 28px rgba(0,0,0,.25);
          text-decoration:none; 
          transition:.25s;
        }
        .btn-primary:hover{ 
          transform: translateY(-2px); 
        }

        .btn-ghost{
          padding:12px 22px; 
          border-radius:12px; 
          font-weight:800; 
          color:#fff;
          border:1px solid rgba(255,255,255,.45);
          background: rgba(0,0,0,.18);
          backdrop-filter: blur(6px);
          text-decoration:none;
          transition:.25s;
        }
        .btn-ghost:hover{ 
          background: rgba(0,0,0,.28); 
        }

        /* Responsivo: cola os cards na dobra */
        @media (min-width: 1024px){
          .hero-compact{ 
            padding-bottom: 8px; 
          }
        }

        @media (min-width:1200px){ 
          .hero-compact{ 
            padding-top: 20px; 
          } 
        }

        /* ===== SEÇÃO DE COMPARAÇÃO ===== */
        .eventos-comparison {
          padding: 60px 0;
          position: relative;
    overflow: hidden;
        }

        /* Remover o background anterior e adicionar overlay escuro */
        .eventos-comparison::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.25); /* Overlay escuro sutil */
          pointer-events: none;
          z-index: 0;
        }

        /* Pattern adicional */
        .eventos-comparison::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .container-wide {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Grid Responsivo */
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: stretch; /* IMPORTANTE: força altura igual */
        }

        /* ===== EVENT CARD - COM GLASSMORPHISM ===== */
        .event-card {
          background: rgba(255, 255, 255, 0.1); /* Glassmorphism */
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 36px;
          transition: all 0.4s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 680px;
          height: 100%;
          box-sizing: border-box;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 0 60px rgba(255, 255, 255, 0.05);
        }

        /* Borda superior animada */
        .event-card::before {
          content: '';
    position: absolute;
    top: 0;
          left: 0;
    right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--accent-color) 50%, 
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }

        .event-card:hover::before {
          opacity: 1;
          animation: borderSlide 2s ease infinite;
        }

        @keyframes borderSlide {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        /* Glow interno */
        .event-card::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
    pointer-events: none;
          z-index: 1;
        }

        .event-card:hover::after {
          opacity: 1;
        }

        .event-card-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .open-card {
          --accent-color: #00e5ff;
          --accent-rgb: 0, 229, 255;
        }

        .incoday-card {
          --accent-color: #ec4899;
          --accent-rgb: 236, 72, 153;
        }

        .event-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.4),
            0 0 80px rgba(var(--accent-rgb), 0.3),
            inset 0 0 80px rgba(255, 255, 255, 0.08);
        }

        /* ===== BADGE ===== */
        .event-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
          padding: 8px 18px;
    border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          align-self: flex-start;
          backdrop-filter: blur(10px);
        }

        .event-badge.cyan {
          background: rgba(0, 229, 255, 0.25);
          border: 2px solid rgba(0, 229, 255, 0.6);
          color: #ffffff;
          box-shadow: 
            0 0 25px rgba(0, 229, 255, 0.4),
            inset 0 0 20px rgba(0, 229, 255, 0.1);
        }

        .event-badge.pink {
          background: rgba(236, 72, 153, 0.25);
          border: 2px solid rgba(236, 72, 153, 0.6);
          color: #ffffff;
          box-shadow: 
            0 0 25px rgba(236, 72, 153, 0.4),
            inset 0 0 20px rgba(236, 72, 153, 0.1);
        }

        .badge-icon {
          font-size: 14px;
        }

        /* ===== IMAGEM ===== */
        .event-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px; /* REDUZIDO de 220px */
          margin-bottom: 24px; /* REDUZIDO de 28px */
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .image-glow {
    position: absolute;
          top: -30%;
          left: -30%;
          right: -30%;
          bottom: -30%;
          filter: blur(30px);
          opacity: 0.4;
          z-index: 0;
        }

        .cyan-glow {
          background: radial-gradient(circle, rgba(0, 229, 255, 0.6), transparent 60%);
        }

        .pink-glow {
          background: radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent 60%);
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
        }

        .event-card:hover .event-image {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent);
          z-index: 2;
        }

        .overlay-text {
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        /* ===== TÍTULO ===== */
        .event-title {
          font-size: 30px; /* REDUZIDO de 32px */
          font-weight: 900;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .cyan-text {
    color: #00e5ff;
          text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  }

        .pink-text {
    color: #ec4899;
          text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
  }

        .event-tagline {
          font-size: 14px; /* REDUZIDO */
    color: rgba(255, 255, 255, 0.7);
          margin-bottom: 18px; /* REDUZIDO */
        }

        /* ===== DESCRIÇÃO ===== */
        .event-description {
          margin-bottom: 20px; /* REDUZIDO */
          flex: 1;
          display: flex;
          align-items: flex-start;
        }

        .event-description p {
    font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 6; /* Limita a 6 linhas */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ===== STATS ===== */
        .event-stats {
          display: flex;
          flex-direction: column;
          gap: 14px; /* REDUZIDO de 16px */
          margin-top: auto;
        }

        .stat-item {
    display: flex;
    align-items: center;
          gap: 12px; /* REDUZIDO */
          padding: 12px 14px; /* REDUZIDO */
          background: rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

        .stat-item:hover {
    background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
  }

  .stat-icon {
          font-size: 22px; /* REDUZIDO */
          flex-shrink: 0;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
          gap: 2px;
          flex: 1;
  }

  .stat-number {
          font-size: 22px; /* REDUZIDO */
          font-weight: 900;
          color: white;
    line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }

        .stat-org {
          font-size: 15px; /* REDUZIDO */
          font-weight: 700;
          line-height: 1;
        }

        /* ===== DIVIDER ===== */
        .divider-vertical {
    display: flex;
          flex-direction: column;
    align-items: center;
          justify-content: center;
          min-height: 680px; /* Mesma altura dos cards */
        }

        .divider-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(180deg, 
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
        }

        .divider-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
          border-radius: 50%;
    display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 900;
          color: #7c3aed;
          box-shadow: 
            0 8px 32px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2);
          margin: 16px 0;
          flex-shrink: 0;
          animation: iconRotate 8s linear infinite;
        }

        @keyframes iconRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ===== RESPONSIVIDADE ===== */

        @media (max-width: 1200px) {
          .event-card {
            min-height: 720px;
          }
          
          .divider-vertical {
            min-height: 720px;
          }
        }

        @media (max-width: 1023px) {
          .sobre-hero {
            padding: 30px 0 30px;
          }
          
          .hero-title-sobre {
    font-size: 36px;
          }
          
          .comparison-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .event-card {
            min-height: auto;
            max-width: 700px;
            margin: 0 auto;
            width: 100%;
          }
          
          .divider-vertical {
            flex-direction: row;
            width: 100%;
            min-height: auto;
            height: 80px;
          }
          
          .divider-line {
            width: auto;
            height: 2px;
            flex: 1;
          }
        }

        @media (max-width: 767px) {
          .sobre-hero {
            padding: 24px 0 24px;
          }
          
          .hero-title-sobre {
      font-size: 28px;
    }
    
          .hero-subtitle {
            font-size: 16px;
          }
          
          .eventos-comparison {
            padding: 40px 0;
          }
          
          .container-wide {
            padding: 0 20px;
          }
          
          .event-card {
            padding: 28px;
          }
          
          .event-image-wrapper {
            height: 180px;
          }
          
          .event-title {
      font-size: 24px;
    }
        }

        /* ===== FORMATO SECTION ===== */
        .formato-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2); /* Overlay escuro */
          position: relative;
        }

        .formato-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(45deg, 
              transparent 0px, 
              rgba(255, 255, 255, 0.02) 1px, 
              transparent 2px, 
              transparent 40px
            );
          pointer-events: none;
        }

        .section-title-center {
    text-align: center;
          font-size: 42px;
          font-weight: 900;
          color: white;
          margin-bottom: 60px;
        }

        .formato-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .formato-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 40px;
    text-align: center;
    transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .formato-card:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
        }

        .formato-icon {
    font-size: 48px;
          margin-bottom: 20px;
  }

        .formato-title {
      font-size: 20px;
    font-weight: 700;
    color: white;
          margin-bottom: 12px;
  }

        .formato-text {
    font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .formato-link {
          display: inline-block;
    color: #00e5ff;
    font-size: 14px;
          font-weight: 600;
    text-decoration: none;
          transition: all 0.3s ease;
        }

        .formato-link:hover {
          color: #00bcd4;
          transform: translateX(4px);
        }

        /* ===== EXPECTATIVAS SECTION ===== */
        .expectativas-section {
          padding: 80px 0;
          position: relative;
        }

        .expectativas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .expectativa-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 36px;
    transition: all 0.4s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .expectativa-card:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .expectativa-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 900;
          color: white;
          margin-bottom: 24px;
    box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .expectativa-title {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .expectativa-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
        }

        /* ===== CTA FINAL ===== */
        .cta-final-section {
          padding: 80px 0 120px;
          position: relative;
        }

        .cta-final-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          padding: 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
    box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 0 80px rgba(255, 255, 255, 0.08);
        }

        .cta-final-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%,
            white 50%,
            transparent 100%
          );
          animation: lineMove 3s ease-in-out infinite;
        }

        .cta-icon-large {
          font-size: 64px;
          margin-bottom: 24px;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .cta-final-title {
          font-size: 40px;
          font-weight: 900;
          color: white;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .cta-final-text {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 32px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-cta-final {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 20px 48px;
          background: linear-gradient(135deg, #ffffff, #e0f2fe);
          color: #0c4a6e;
          font-size: 18px;
          font-weight: 800;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 12px 36px rgba(255, 255, 255, 0.3);
        }

        .btn-cta-final:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #e0f2fe, #ffffff);
        }

        @keyframes lineMove {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        /* Texto branco em toda página */
        .section-title-center,
        .formato-title,
        .formato-text,
        .expectativa-title,
        .expectativa-text,
        .cta-final-title,
        .cta-final-text {
          color: white;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        /* ===== BADGE - TEXTO ALTERADO ===== */
        .event-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
          align-self: flex-start;
          backdrop-filter: blur(10px);
        }

        .badge-icon svg {
          width: 16px;
          height: 16px;
        }

        /* ===== DIVIDER - SEM ROTAÇÃO ===== */
        .divider-icon-static {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 900;
          color: #7c3aed;
          box-shadow: 
            0 8px 32px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2);
          margin: 16px 0;
          flex-shrink: 0;
          /* SEM ANIMATION */
        }

        /* ===== FORMATO E DATA - MODERNIZADO ===== */
        .formato-section-modern {
          padding: 100px 0;
          background: rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .section-header-modern {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-label {
          display: inline-block;
          padding: 6px 20px;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
        }

        .section-title-modern {
          font-size: 48px;
          font-weight: 900;
          color: white;
          margin: 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .formato-cards-modern {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Card Modernizado */
        .formato-card-modern {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .formato-card-modern:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        /* Decoração do card */
        .card-decoration {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Ícone do card */
        .card-icon-modern {
    width: 80px;
    height: 80px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
          margin-bottom: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .card-icon-modern svg {
          color: white;
          stroke: white;
        }

        .formato-card-modern:hover .card-icon-modern {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.25);
        }

        /* Conteúdo do card */
        .card-content-modern {
          position: relative;
          z-index: 2;
        }

        .card-title-modern {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .card-text-modern {
          font-size: 18px;
          color: white;
    font-weight: 600;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .card-year {
          font-size: 32px;
          font-weight: 900;
    color: white;
          line-height: 1;
        }

        .card-subtext {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
    margin-bottom: 12px;
        }

        /* Link do mapa */
        .card-link-modern {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 12px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .card-link-modern:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(4px);
        }

        /* Tags de modalidade */
        .modalidade-tags {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .modalidade-tags span {
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .tag-presencial {
          background: rgba(16, 185, 129, 0.3);
          color: white;
          border-color: rgba(16, 185, 129, 0.5);
        }

        .tag-online {
          background: rgba(59, 130, 246, 0.3);
          color: white;
          border-color: rgba(59, 130, 246, 0.5);
        }

        /* ===== O QUE ESPERAR - MODERNIZADO ===== */
        .expectativas-section-modern {
          padding: 100px 0;
          position: relative;
        }

        .expectativas-grid-modern {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Card de expectativa */
        .expectativa-card-modern {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .expectativa-card-modern:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-12px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
        }

        /* Visual com ícone + número */
        .expectativa-visual {
          position: relative;
          width: 100px;
          height: 100px;
          margin-bottom: 28px;
        }

        .visual-icon {
          position: absolute;
          top: 0;
          left: 0;
          color: white;
          stroke: white;
          opacity: 0.3;
        }

        .visual-number {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 900;
          color: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .expectativa-content-modern {
          position: relative;
          z-index: 2;
        }

        .expectativa-title-modern {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .expectativa-text-modern {
    font-size: 15px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
        }

        /* Linha decorativa */
        .expectativa-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .expectativa-card-modern:hover .expectativa-line {
          opacity: 1;
        }

        /* ===== CTA FINAL - MODERNIZADO ===== */
        .cta-final-section-modern {
          padding: 100px 0 120px;
          position: relative;
        }

        .cta-final-box-modern {
          background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
          border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 32px;
          padding: 80px 60px;
    text-align: center;
          position: relative;
          overflow: hidden;
          max-width: 900px;
          margin: 0 auto;
    box-shadow: 
            0 24px 80px rgba(0, 0, 0, 0.3),
            inset 0 0 80px rgba(255, 255, 255, 0.08);
        }

        /* Decorações */
        .cta-decoration-top,
        .cta-decoration-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .cta-decoration-bottom {
          margin-top: 32px;
          margin-bottom: 0;
        }

        .decoration-line {
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
        }

        .decoration-circle {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }

        /* Ícone CTA */
        .cta-icon-modern {
          width: 100px;
          height: 100px;
          margin: 0 auto 32px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .cta-icon-modern svg {
    color: white;
          fill: white;
        }

        .cta-final-title-modern {
          font-size: 40px;
          font-weight: 900;
          color: white;
          margin-bottom: 20px;
    line-height: 1.3;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

        .cta-final-text-modern {
    font-size: 18px;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 36px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .btn-cta-final-modern {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 20px 48px;
          background: linear-gradient(135deg, #ffffff, #f0f0f0);
          color: #1e40af;
    font-size: 18px;
          font-weight: 800;
    border: none;
          border-radius: 16px;
    cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
    transition: all 0.3s ease;
          box-shadow: 0 12px 36px rgba(255, 255, 255, 0.3);
        }

        .btn-cta-final-modern:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #f0f0f0, #ffffff);
        }

        /* ===== EVENT STATS - PILL INLINE ===== */
        .event-stats-inline {
          display: flex;
          align-items: center;
    gap: 16px;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.10);
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 999px; /* formato pill */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          margin-top: auto;
        }

        .stat-inline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .stat-ico {
          color: rgba(255, 255, 255, 0.9);
        }

        .stat-number {
          font-size: 18px;
          font-weight: 900;
          color: #fff;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }


        .stat-divider {
          width: 1px;
          height: 22px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.5) 50%,
            rgba(255,255,255,0) 100%
          );
        }

        /* Hover effects */
        .event-stats-inline:hover { 
          box-shadow: 0 12px 36px rgba(0,0,0,0.25); 
        }

        .stat-inline:hover .stat-number { 
          transform: translateY(-1px); 
          transition: .2s; 
        }

        /* ===== ORGANIZADORES ===== */
        .orgs-section{
          padding: 64px 0 84px;
          position: relative;
        }
        .orgs-section::before{
          content:'';
          position:absolute; inset:0;
          background: radial-gradient(60% 50% at 50% 0%,
            rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 70%);
          pointer-events:none;
        }

        .container-wide{ max-width:1400px; margin:0 auto; padding:0 40px; }

        /* Cabeçalho */
        .orgs-header{ text-align:center; margin-bottom: 32px; }
        .orgs-eyebrow{
          display:inline-block; padding:6px 16px; border-radius:14px;
          border:1px solid rgba(255,255,255,.35); color:#fff; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; backdrop-filter: blur(8px);
        }
        .orgs-title{
          margin: 12px 0 8px; font-size: clamp(26px,3.6vw,38px);
          font-weight:900; color:#fff; text-shadow:0 2px 10px rgba(0,0,0,.3);
        }
        .orgs-sub{
          color: rgba(255,255,255,.9);
          max-width: 860px; margin: 0 auto;
          font-size: clamp(14px,1.6vw,16px);
        }

        /* Grid de organizadores */
        .orgs-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 18px;
          margin-top: 26px;
        }

        .org-card{
          position: relative;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 18px;
          padding: 18px 18px 22px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 10px 28px rgba(0,0,0,.22);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          text-decoration: none;
          display: flex; 
          flex-direction: column; 
          align-items: center;
          z-index: 1;
        }

        /* garanta que nenhum pseudo-elemento escureça a área */
        .org-card::after,
        .org-card::before{ display:none !important; }
        .org-card:hover{
          transform: translateY(-6px);
          border-color: rgba(255,255,255,.38);
          box-shadow: 0 14px 36px rgba(0,0,0,.28), 0 0 40px rgba(255,255,255,.08) inset;
        }

        .org-badge{
          position:absolute; top:10px; left:10px;
          font-size:11px; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
          color:#0b1b2b; background:#fff; padding:6px 10px; border-radius:10px;
        }
        .org-card.supporter .org-badge{ background:#eafff8; }

        /* Logo responsivo com proteção de contraste */
        .org-logo{
          background: transparent;         /* antes: rgba(255,255,255,.12) */
          padding: 0;                      /* evita "box" atrás da marca */
          height: auto;                    /* deixa a altura seguir a imagem */
          min-height: 64px;                /* garante área mínima uniforme */
          margin: 14px auto 10px; 
          display:flex; 
          align-items:center; 
          justify-content:center;
          position: relative; 
          z-index: 2;
        }
        .org-logo img{
          max-width: 240px;
          max-height: 60px;           /* dá presença sem estourar a altura */
          width: auto;
          height: auto;
          image-rendering: -webkit-optimize-contrast;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,.25)); /* sutil e limpo */
        }

        /* variante da TECSOFT com leve "halo" claro para legibilidade */
        .org-card.tecs{
          /* opcional: acento em ciano */
          --halo: rgba(255,255,255,.85);
        }
        .org-card.tecs .org-logo img{
          filter:
            drop-shadow(0 0 0 var(--halo)) /* sem sombra preta colada */
            drop-shadow(0 3px 10px rgba(0,0,0,.20));
        }

        .org-name{
          color:#fff; font-weight:800; letter-spacing:.02em; font-size: 14px;
          opacity:.95;
          margin-top: 10px;
        }


        /* Cores específicas por organizador */
        .org-card:nth-child(1){ --accent: #00e5ff; }
        .org-card:nth-child(2){ --accent: #7c3aed; }
        .org-card:nth-child(3){ --accent: #10b981; }

        /* Z-index correto para evitar overlays */
        .orgs-section::before{ z-index: 0; }
        .org-card{ position: relative; z-index: 1; }
        .org-logo{ position: relative; z-index: 2; }

        /* Para telas muito claras, incremente o halo branco */
        @media (prefers-color-scheme: light){
          .org-card.tecs .org-logo img{
            filter:
              drop-shadow(0 0 0 rgba(255,255,255,.95))
              drop-shadow(0 3px 10px rgba(0,0,0,.15));
          }
        }

        /* ===== APOIO GFORTI ===== */
        /* Paleta GFORTI */
        :root{
          --g-black:#1f1f1f;
          --g-white:#ffffff;
          --g-orange:#f59f0b; /* ajuste se necessário ao tom exato da logo */
        }

        /* Seção com identidade própria */
        .gforti-brand-section{
          position: relative;
          padding: 64px 0 84px;
          background:
            radial-gradient(90% 70% at 50% 0%, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.2) 100%);
          border-top: 2px solid rgba(255,255,255,.06);
        }

        /* Container centralizado */
        .gforti-brand-container{
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* Header com marca */
        .gforti-brand-header{
          display: grid;
          grid-template-columns: 240px 1fr;
      gap: 24px;
          align-items: center;
          margin-bottom: 18px;
        }

        .gforti-mark{
          position: relative;
          aspect-ratio: 1/1;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 12px 30px rgba(0,0,0,.25);
        }

        /* Bloco preto/branco/laranja inspirado na marca */
        .gforti-mark-bg{
          position: absolute; inset: 0;
          background:
            linear-gradient(135deg, var(--g-black) 0 65%, transparent 65%),
            linear-gradient(0deg, var(--g-white) 0 52%, transparent 52%),
            linear-gradient(90deg, var(--g-orange) 0 12%, transparent 12%);
          opacity: .95;
        }

        .gforti-logo{
          position: absolute; inset: 0; margin: auto;
          max-width: 70%; max-height: 70%;
          filter: drop-shadow(0 3px 10px rgba(0,0,0,.3));
        }

        /* Títulos e textos */
        .gforti-headlines{ min-width: 0; }
        .gforti-title{
          font-size: clamp(24px,3.2vw,36px);
          font-weight: 900;
          color: var(--g-white);
          margin: 4px 0 6px;
          text-shadow: 0 2px 10px rgba(0,0,0,.3);
        }
        .gforti-accent{ color: var(--g-orange); }

        .gforti-sub{
          color: rgba(255,255,255,.9);
          font-size: clamp(14px,1.6vw,16px);
          max-width: 900px;
        }

        /* Badge "Membro do GFORTI" */
        .gforti-badge-line{
          display: flex;
          justify-content: center;
          margin: 10px 0 18px;
        }
        .gforti-badge{
          display:inline-flex; align-items:center; gap:10px;
          padding: 8px 16px; border-radius: 999px;
          background: var(--g-black);
          color: var(--g-white);
          font-weight: 800; letter-spacing:.06em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 8px 24px rgba(0,0,0,.25), 0 0 0 4px rgba(245,159,11,.18) inset;
        }
        .gforti-badge::before{
          content:''; width:10px; height:10px; border-radius:50%;
          background: var(--g-orange); box-shadow: 0 0 12px var(--g-orange);
        }

        /* Grid de entidades */
        .gforti-grid-wrap{ position: relative; }
        .gforti-grid{
          display: grid;
          grid-template-columns: repeat(5, minmax(0,1fr));
          gap: 16px;
          margin-top: 6px;
        }

        /* Segunda linha de entidades adicionais */
        .gforti-grid-secondary{
          margin-top: 20px;
        }
        .gforti-grid-extra{
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
        }

        .gfi-item{ list-style:none; }

        /* 1) Remover qualquer blend ou filtro que faça a logo sumir */
        .gforti-brand-section * { mix-blend-mode: normal; }

        .gforti-members{ margin-top: 18px; }

        /* Linha que se autos quebra, todos os cards iguais */
        .members-row{
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;      /* centraliza última linha */
          align-items: stretch;
          list-style: none;
          margin: 0; padding: 0;
        }

        /* Dimensões fixas por breakpoint */
        .member-card{
          box-sizing: border-box;
          width: 260px;                 /* L: largura fixa */
          height: 160px;                /* L: altura fixa */
          display: flex; align-items: center; justify-content: center;
          padding: 14px 16px;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform .2s, border-color .2s, box-shadow .2s;
        }
        .member-card:hover{
          transform: translateY(-4px);
          border-color: rgba(245,159,11,.7);
        }

        .member-card img{
          max-height: 80%;              /* ocupa 80% da altura do card */
          max-width: 88%;               /* e 88% da largura */
          width: auto; height: auto;
          object-fit: contain;
          image-rendering: -webkit-optimize-contrast;
          mix-blend-mode: normal;
          filter: none !important;
        }

        /* Tapete claro só nos casos de baixo contraste (azul sobre azul etc.) */
        .member-card.contrast{
          background: linear-gradient(0deg, rgba(255,255,255,.18), rgba(255,255,255,.18));
        }

        /* Breakpoints mantêm proporção e igualdade */
        @media (max-width: 1200px){
          .member-card{ width: 240px; height: 150px; }
        }
        @media (max-width: 900px){
          .member-card{ width: 220px; height: 140px; }
        }
        @media (max-width: 640px){
          .member-card{ width: 48%; height: 130px; }  /* 2 por linha em mobile */
        }
        @media (max-width: 420px){
          .member-card{ width: 100%; height: 120px; } /* 1 por linha em telas muito pequenas */
        }

        /* Proteções contra quebras */
        .member-card, .member-card img{ min-width: 0; min-height: 0; }

        /* Placeholder para logos que falharem */
        .member-card img:not([src]), .member-card img[src=""]{
          display: none;
        }
        .member-card.missing{ 
          background: repeating-linear-gradient(45deg, rgba(255,255,255,.08) 0 6px, rgba(255,255,255,.04) 6px 12px);
          position: relative;
        }
        .member-card.missing::after{
          content:'Logo indisponível';
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          color: rgba(255,255,255,.8); font-weight:700; font-size: 12px;
        }
        /* Se a logo for monocromática escura, opção alternativa seria tornar branca:
        .gfi-item.mono-dark .gfi-stage img{ filter: brightness(0) invert(1) !important; }
        */

        /* Tile da GFORTI - imagem direta como background */
        .gforti-mark{
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 12px 30px rgba(0,0,0,.25);
          /* usa a imagem oficial diretamente */
          background-image: url('/Logos/GFORTI/Gforti.png');
          background-size: contain;      /* cobre a área com margem */
          background-repeat: no-repeat;
          background-position: center;   /* centralizada */
          background-color: #ffffff;     /* fundo branco para contraste */
        }

        /* Se quiser mais "respiro" nas bordas, use padding visual com background-position */
        @media (min-width: 768px){
          .gforti-mark{
            background-position: center 54%; /* ligeiramente mais baixo */
          }
        }


        /* Responsividade para header GFORTI */
        @media (max-width: 1024px){
          .gforti-brand-header{
            grid-template-columns: 1fr; gap: 14px; text-align:center;
          }
          .gforti-mark{ margin: 0 auto; width: 180px; }
        }

        /* ===== DEMAIS PARCEIROS APOIADORES ===== */
        .parceiros-section {
          padding: 80px 0;
          position: relative;
          background: rgba(0, 0, 0, 0.15);
          border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .parceiros-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(60% 50% at 50% 0%,
            rgba(255, 255, 255, 0.04) 0%, 
            rgba(255, 255, 255, 0) 70%
          );
          pointer-events: none;
        }

        .parceiros-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .parceiros-eyebrow {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          margin-bottom: 16px;
        }

        .parceiros-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          color: #fff;
          margin: 0 0 16px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .parceiros-sub {
          font-size: clamp(14px, 1.8vw, 18px);
          color: rgba(255, 255, 255, 0.9);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .parceiros-image-container {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .parceiros-image-wrapper {
          position: relative;
          max-width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 0 40px rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
        }

        .parceiros-image-wrapper:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 32px 80px rgba(0, 0, 0, 0.4),
            inset 0 0 60px rgba(255, 255, 255, 0.08);
        }

        .parceiros-image {
          width: 100%;
          height: auto;
          max-width: 1200px;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .parceiros-image-wrapper:hover .parceiros-image {
          transform: scale(1.02);
        }

        /* Responsividade para a seção de parceiros */
        @media (max-width: 1024px) {
          .parceiros-section {
            padding: 60px 0;
          }
          
          .parceiros-image-wrapper {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .parceiros-section {
            padding: 50px 0;
          }
          
          .parceiros-image-wrapper {
            padding: 20px;
            border-radius: 20px;
          }
          
          .parceiros-title {
            font-size: 28px;
          }
          
          .parceiros-sub {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .parceiros-image-wrapper {
            padding: 16px;
            border-radius: 16px;
          }
        }

        /* ===== RESPONSIVIDADE ===== */
        @media (max-width: 1024px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
          
          .formato-cards-modern,
          .expectativas-grid-modern {
            grid-template-columns: 1fr;
            max-width: 700px;
            margin: 0 auto;
          }

          .orgs-grid{ grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px){
          .container-wide{ padding:0 20px; }
          .orgs-grid{ grid-template-columns: 1fr; }
          .org-logo{ height:62px; }
        }

        @media (max-width: 767px) {
          .section-title-modern {
            font-size: 32px;
          }
          
          .cta-final-title-modern {
      font-size: 28px;
    }
    
          .cta-final-box-modern {
            padding: 60px 32px;
          }

          /* Stats responsivos */
          .event-stats-inline {
            flex-wrap: wrap;
            border-radius: 20px; /* perde o pill total, fica box no wrap */
            row-gap: 10px;
          }
          
          .stat-divider {
            display: none;
          }
        }
            gap: 40px;
          }
          
          .divider-vertical {
            flex-direction: row;
            width: 100%;
            height: auto;
          }
          
          .divider-line {
            width: auto;
            height: 2px;
          }
          
          .formato-grid,
          .expectativas-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-title-sobre {
            font-size: 36px;
          }
          
          .event-card {
            padding: 28px;
          }
          
          .event-title {
            font-size: 28px;
          }
          
          .cta-final-title {
            font-size: 28px;
          }
        }
      `}</style>
      
      {/* Navigation Sidebar */}
      <NavigationSidebar />

          {/* Hero Section - Compacto com Trocador de Palavras */}
      <section className="sobre-hero hero-compact">
        <div className="hero-darkband"></div>
        <div className="hero-inner">
          <span className="hero-eyebrow">Sobre os eventos</span>

          <h1 className="hero-title">
            Dois eventos, <span className="grad-solid">um futuro</span> <span className="weak">inovador</span>
              </h1>

          <p className="hero-sub">
            Programação de alto impacto para transformar ideias em parcerias, produtos e resultados.
          </p>

          <div className="hero-cta">
            <a className="btn-primary" href="/hotsite/inscricoes">Ver os destaques</a>
            <a className="btn-ghost" href="/hotsite/agenda">Ver programação</a>
            </div>
        </div>
      </section>

      {/* Comparação de Eventos - Cards Lado a Lado */}
      <section className="eventos-comparison">
        <div className="container-wide">
          <div className="comparison-grid">
            
            {/* OPEN CONNECTIONS */}
            <div className="event-card open-card">
              <div className="event-card-inner">
                <div className="event-badge cyan">
                  <span className="badge-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    </svg>
                  </span>
                  <span className="badge-text">OPEN CONNECTIONS</span>
                  </div>

                <div className="event-image-wrapper">
                  <div className="image-glow cyan-glow"></div>
                  <img
                    src="/OpenConnection.png"
                    alt="Open Connections"
                    className="event-image"
                  />
                  <div className="image-overlay">
                    <span className="overlay-text">Software + Conectividade</span>
                  </div>
              </div>
              
                <h2 className="event-title cyan-text">OPEN CONNECTIONS</h2>
                <p className="event-tagline">Software + Conectividade</p>

                <div className="event-description">
                  <p>
                    O Open Connections é um evento focado na disseminação de conteúdo relevante 
                    sobre inovação para empresas e profissionais. Com quatro edições já realizadas, 
                    ele se estabeleceu como um polo de conhecimento e networking.
                  </p>
                </div>
                
                <div className="event-stats-inline">
                  <div className="stat-inline">
                    <svg className="stat-ico" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                      <span className="stat-number">4+</span>
                      <span className="stat-label">Edições Realizadas</span>
                    </div>

                  <span className="stat-divider"></span>

                  <div className="stat-inline">
                    <svg className="stat-ico" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                      <span className="stat-number">400+</span>
                      <span className="stat-label">Participantes</span>
                  </div>
                    </div>
                  </div>
                </div>
                
            {/* DIVIDER - SEM ROTAÇÃO */}
            <div className="divider-vertical">
              <div className="divider-line"></div>
              <div className="divider-icon-static">+</div>
              <div className="divider-line"></div>
                    </div>

            {/* INCODAY */}
            <div className="event-card incoday-card">
              <div className="event-card-inner">
                <div className="event-badge pink">
                  <span className="badge-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    </svg>
                  </span>
                  <span className="badge-text">INCODAY 2025</span>
                  </div>

                <div className="event-image-wrapper">
                  <div className="image-glow pink-glow"></div>
                  <img
                    src="/Incoday.png"
                    alt="InCoDay 2025"
                    className="event-image"
                  />
                  <div className="image-overlay">
                    <span className="overlay-text">Innovation & Collaboration Day</span>
                  </div>
              </div>
              
                <h2 className="event-title pink-text">INCODAY 2025</h2>
                <p className="event-tagline">Innovation & Collaboration Day</p>

                <div className="event-description">
                  <p>
                    É um evento consolidado no cenário nacional de promoção da inovação tecnológica, 
                    realizado anualmente pela Associação Brasileira da Pesquisa, Desenvolvimento e 
                    Inovação Colaborativa -BraFIP e pela Federação de Entidades de Tecnologia da 
                    Informação da América Latina, Caribe, Espanha e Portugal - ALETI. Desde suas 
                    primeiras edições, o InCoDay tem como objetivo fomentar a colaboração entre 
                    empresas, universidades, centros de pesquisas e instituições públicas e privadas.
                  </p>
                </div>
                
                <div className="event-stats-inline">
                  <div className="stat-inline">
                    <svg className="stat-ico" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                      <span className="stat-number">8</span>
                      <span className="stat-label">Anos de Tradição</span>
                    </div>

                  <span className="stat-divider"></span>

                  <div className="stat-inline">
                    <svg className="stat-ico" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                      <span className="stat-number">500+</span>
                      <span className="stat-label">Participantes</span>
                    </div>
                  </div>
                </div>
          </div>
            </div>
        </div>
      </section>

      {/* ===== ORGANIZADORES ===== */}
      <section id="organizadores" className="orgs-section">
        <div className="container-wide">
          <div className="orgs-header">
            <span className="orgs-eyebrow">Parceria Estratégica</span>
            <h2 className="orgs-title">Organizadores e Apoiadores</h2>
            <p className="orgs-sub">
              TECSOFT, BraFIP e ALETI unem forças para realizar o InCoDay e o Open Connections, com apoio confirmado da FINATEC.
                  </p>
                    </div>
                
          <div className="orgs-grid">
            {/* TECSOFT */}
            <a className="org-card tecs" href="https://tecsoft.org.br" target="_blank" rel="noopener">
              <div className="org-badge">Organização</div>
              <div className="org-logo">
                <Logo src="/LogoTecsoft.png" alt="TECSOFT" variant="organizadores" />
                  </div>
              <div className="org-name">TECSOFT</div>
            </a>

            {/* BraFIP */}
            <a className="org-card" href="https://brafip.org.br" target="_blank" rel="noopener">
              <div className="org-badge">Organização</div>
              <div className="org-logo">
                <Logo src="/Logos/BraFip.png" alt="BraFIP" variant="organizadores" />
                </div>
              <div className="org-name">BraFIP</div>
            </a>

            {/* ALETI */}
            <a className="org-card" href="https://aleti.org" target="_blank" rel="noopener">
              <div className="org-badge">Organização</div>
              <div className="org-logo">
                <Logo src="/Logos/LOGO ALETI.png" alt="ALETI" variant="organizadores" />
              </div>
              <div className="org-name">ALETI</div>
            </a>

            {/* FINATEC */}
            <a className="org-card supporter" href="https://www.finatec.org.br" target="_blank" rel="noopener">
              <div className="org-badge">Apoio Confirmado</div>
              <div className="org-logo">
                <Logo src="/Logos/FinaTec.svg" alt="FINATEC" variant="organizadores" />
              </div>
              <div className="org-name">FINATEC</div>
            </a>
          </div>

        </div>
      </section>

      {/* ===== APOIO GFORTI ===== */}
      <section className="gforti-brand-section" aria-labelledby="gforti-brand-title">
        <div className="gforti-brand-container">
          {/* Header com a marca GFORTI em destaque */}
          <header className="gforti-brand-header">
            <div className="gforti-mark">
              {/* Tile simplificado - imagem direta como background */}
                    </div>
            <div className="gforti-headlines">
              <h2 id="gforti-brand-title" className="gforti-title">
                Entidades do <span className="gforti-accent">GFORTI</span>
              </h2>
              <p className="gforti-sub">
                O Open Connection + InCoDay contam com o apoio do GFORTI
              </p>
                  </div>
          </header>

          {/* Badge "Membro GFORTI" */}
          <div className="gforti-badge-line">
            <span className="gforti-badge">
              ORGANIZAÇÕES MEMBROS DO GFORTI
            </span>
                </div>

          {/* Cards fixos que se autoquebram */}
          <section className="gforti-members">
            <ul className="members-row">
              {/* TECSOFT */}
              <li className="member-card">
                <img src="/LogoTecsoft.png" alt="TECSOFT" loading="lazy" />
              </li>
              {/* ASSESPRODF */}
              <li className="member-card contrast">
                <img 
                  src="/Logos/GFORTI/ASSESPRODF.jpeg" 
                  alt="ASSESPRODF" 
                  loading="lazy" 
                  onError={(e) => {
                    console.error('Erro ao carregar imagem ASSESPRODF:', e);
                    // Tenta diferentes caminhos e formatos
                    const target = e.currentTarget;
                    if (target.src.includes('.jpeg')) {
                      target.src = '/Logos/GFORTI/ASSESPRODF.png';
                    } else if (target.src.includes('.png')) {
                      target.src = '/Logos/GFORTI/ASSESPRODF.jpg';
                    } else {
                      // Fallback final - mostra texto se nenhuma imagem carregar
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text';
                        fallback.style.cssText = `
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          width: 100%;
                          height: 100%;
                          background: #f3f4f6;
                          color: #374151;
                          font-weight: bold;
                          font-size: 14px;
                          text-align: center;
                          border-radius: 8px;
                        `;
                        fallback.textContent = 'ASSESPRODF';
                        parent.appendChild(fallback);
                      }
                    }
                  }}
                />
              </li>
              {/* Brasil Startups */}
              <li className="member-card contrast">
                <img src="/Logos/GFORTI/brasilstartups.png" alt="Brasil Startups" loading="lazy" />
              </li>
              {/* Iluminante */}
              <li className="member-card contrast">
                <img src="/Logos/GFORTI/Iluminante.png" alt="Iluminante" loading="lazy" />
              </li>
              {/* Sindesei */}
              <li className="member-card contrast">
                <img src="/Logos/GFORTI/sindesei.png" alt="Sindesei" loading="lazy" />
              </li>
              {/* ABIPTI */}
              <li className="member-card">
                <img src="/Logos/GFORTI/ABIPTI.svg" alt="ABIPTI" loading="lazy" />
              </li>
              {/* IBRACHICS */}
              <li className="member-card">
                <img src="/Logos/GFORTI/ibrachics.svg" alt="IBRACHICS" loading="lazy" />
              </li>
              {/* SINFOR */}
              <li className="member-card">
                <img src="/Logos/GFORTI/SINFOR.png" alt="SINFOR" loading="lazy" />
              </li>
            </ul>
          </section>
        </div>
      </section>

      {/* ===== DEMAIS PARCEIROS APOIADORES ===== */}
      <section className="parceiros-section">
        <div className="container-wide">
          <div className="parceiros-header">
            <span className="parceiros-eyebrow">Apoio Estratégico</span>
            <h2 className="parceiros-title">Demais Parceiros Apoiadores</h2>
            <p className="parceiros-sub">
              Organizações que apoiam e fortalecem o ecossistema de inovação e tecnologia.
            </p>
          </div>

          <div className="parceiros-image-container">
            <div className="parceiros-image-wrapper">
              <img 
                src="/Logos/Segunda parte/PainelApoiadoresParceiros.png" 
                alt="Parceiros e Apoiadores" 
                className="parceiros-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORMATO E DATA - MODERNIZADO ===== */}
      <section className="formato-section-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-label">Informações do Evento</span>
            <h2 className="section-title-modern">Formato e Data</h2>
            </div>

          <div className="formato-cards-modern">
              {/* Card Data */}
            <div className="formato-card-modern data-card">
              <div className="card-icon-modern">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              <div className="card-content-modern">
                <h3 className="card-title-modern">Data</h3>
                <p className="card-text-modern">11 e 12 de novembro</p>
                <p className="card-year">2025</p>
                </div>
              <div className="card-decoration"></div>
            </div>

              {/* Card Local */}
            <div className="formato-card-modern local-card">
              <div className="card-icon-modern">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              <div className="card-content-modern">
                <h3 className="card-title-modern">Local</h3>
                <p className="card-text-modern">Finatec</p>
                <p className="card-subtext">Campus da UnB, Asa Norte, Brasília</p>
                <a href="/hotsite/localizacao#mapa" className="card-link-modern">
                  <span>Ver no mapa</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
                </div>
              <div className="card-decoration"></div>
            </div>

              {/* Card Modalidade */}
            <div className="formato-card-modern modalidade-card">
              <div className="card-icon-modern">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              <div className="card-content-modern">
                <h3 className="card-title-modern">Modalidade</h3>
                <div className="modalidade-tags">
                  <span className="tag-presencial">Presencial</span>
                  <span className="tag-online">Online</span>
                </div>
                <p className="card-subtext">Formato híbrido</p>
            </div>
              <div className="card-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== O QUE ESPERAR - MODERNIZADO ===== */}
      <section className="expectativas-section-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-label">Por que Participar</span>
            <h2 className="section-title-modern">O Que Esperar</h2>
            </div>

          <div className="expectativas-grid-modern">
            {/* Card 1 */}
            <div className="expectativa-card-modern">
              <div className="expectativa-visual">
                <svg className="visual-icon" width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                <div className="visual-number">01</div>
                </div>
              <div className="expectativa-content-modern">
                <h3 className="expectativa-title-modern">Dois dias de programação intensiva</h3>
                <p className="expectativa-text-modern">
                  Aproveite dois dias completos de conteúdo, workshops e networking com 
                  os melhores profissionais do mercado.
                </p>
              </div>
              <div className="expectativa-line"></div>
            </div>
            
            {/* Card 2 */}
            <div className="expectativa-card-modern">
              <div className="expectativa-visual">
                <svg className="visual-icon" width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                <div className="visual-number">02</div>
                </div>
              <div className="expectativa-content-modern">
                <h3 className="expectativa-title-modern">Palestras, workshops e networking</h3>
                <p className="expectativa-text-modern">
                  Conecte-se com líderes da indústria, aprenda com especialistas e 
                  expanda sua rede profissional.
                </p>
              </div>
              <div className="expectativa-line"></div>
            </div>
            
            {/* Card 3 */}
            <div className="expectativa-card-modern">
              <div className="expectativa-visual">
                <svg className="visual-icon" width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                <div className="visual-number">03</div>
                </div>
              <div className="expectativa-content-modern">
                <h3 className="expectativa-title-modern">Conexões valiosas para o futuro</h3>
                <p className="expectativa-text-modern">
                  Forme parcerias estratégicas e colabore em projetos que moldarão 
                  o futuro da tecnologia e inovação.
                </p>
            </div>
              <div className="expectativa-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL - MODERNIZADO ===== */}
      <section className="cta-final-section-modern">
        <div className="container">
          <div className="cta-final-box-modern">
            <div className="cta-decoration-top">
              <div className="decoration-line"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
            </div>
            
            <div className="cta-icon-modern">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
              </svg>
            </div>
            
            <h2 className="cta-final-title-modern">
                Junte-se a nós para moldar o futuro da inovação e colaboração!
              </h2>
            <p className="cta-final-text-modern">
                Não perca a oportunidade de fazer parte deste evento transformador.
              </p>
            
            <a href="/hotsite/agenda" className="btn-cta-final-modern">
              <span>Ver Programação Completa</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"/>
                </svg>
            </a>
            
            <div className="cta-decoration-bottom">
              <div className="decoration-line"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
            </div>
        </div>
      </div>
      </section>
    </div>
  );
}