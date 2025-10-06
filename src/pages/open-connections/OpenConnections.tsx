import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import HolographicHero from '../../components/open-connections/HolographicHero';
import CurvedBanner from '../../components/open-connections/CurvedBanner';
import NavigationSidebar from '../../components/NavigationSidebar';

const OpenConnections: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllGuests, setShowAllGuests] = useState(false);

  const toggleGuests = () => {
    if (showAllGuests) {
      // Quando fechando, faz scroll suave para a seção
      const guestsSection = document.getElementById('convidados');
      if (guestsSection) {
        guestsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      // Pequeno delay para o scroll acontecer antes da animação
      setTimeout(() => {
        setShowAllGuests(false);
      }, 100);
    } else {
      setShowAllGuests(true);
    }
  };
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Mobile UX enhancements
  useEffect(() => {
    // Smooth scroll para âncoras
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (!element) return;
      
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Clamp em descrições longas
    const clampDescriptions = () => {
      document.querySelectorAll('.oc-card-desc, .speaker-bio').forEach(el => {
        const element = el as HTMLElement;
        element.style.display = '-webkit-box';
        element.style.webkitBoxOrient = 'vertical';
        element.style.webkitLineClamp = '6';
        element.style.overflow = 'hidden';
      });
    };

    document.addEventListener('click', handleAnchorClick);
    clampDescriptions();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Sticky Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
      />
      
      {/* Sticky CTA Bar */}
      <motion.div 
        className={`fixed top-4 right-4 z-40 transition-all duration-300 ${
          scrollProgress > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <a 
          href="/hotsite/inscricoes"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          {scrollProgress > 50 ? 'Garantir Vaga' : 'Inscrever-se'}
        </a>
      </motion.div>

      {/* CSS Mobile-First para Open Connections */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Container global responsivo */
          .oc-container{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          @media (max-width: 480px){ .oc-container{ padding: 0 16px; } }

          /* Grids padrão da página */
          .grid-3{ display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
          .grid-2{ display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }

          @media (max-width: 900px){
            .grid-3{ grid-template-columns: repeat(2,1fr); }
          }
          @media (max-width: 640px){
            .grid-3, .grid-2{ grid-template-columns: 1fr; gap: 12px; }
          }

          /* Título principal responsivo */
          .oc-hero-title{ font-size: clamp(24px, 6vw, 44px); line-height: 1.1; }
          .oc-hero-sub{ font-size: clamp(14px, 3.8vw, 18px); color: rgba(255,255,255,.9); }

          /* Espaço do herói */
          .oc-hero{ padding: clamp(28px, 8vw, 56px) 0 clamp(20px, 6vw, 40px); }

          /* Card responsivo com CTA embaixo */
          .oc-card{
            display: grid; grid-template-rows: auto 1fr auto;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.16);
            border-radius: 16px; backdrop-filter: blur(8px);
            padding: 14px; gap: 10px;
            min-height: 0;
          }
          .oc-card-head{ display:flex; gap:10px; align-items:center; }
          .oc-card-ico{ width:40px; height:40px; border-radius:10px; display:grid; place-items:center; background: rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.18); }
          .oc-card-title{ color:#fff; font-weight:900; font-size: clamp(16px,4.2vw,18px); }
          .oc-card-desc{ color: rgba(255,255,255,.92); font-size: clamp(13px,3.6vw,14px); line-height: 1.55; }
          .oc-card-cta{ display:flex; justify-content:flex-end; }
          .oc-btn{ min-height: 42px; padding: 10px 14px; border-radius: 10px; font-weight: 900; color:#0b1b2b; background: linear-gradient(135deg,#ffd27a,#ff9f4a); }

          /* Mobile: CTA ocupa a largura */
          @media (max-width: 640px){
            .oc-card-cta{ justify-content: stretch; }
            .oc-btn{ width:100%; }
          }

          /* Scroll horizontal suave em mobile */
          .oc-scroll-x{
            display: grid; grid-auto-flow: column; grid-auto-columns: 80%;
            gap: 12px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; padding-bottom: 6px;
          }
          .oc-scroll-x > *{ scroll-snap-align: start; }
          @media (min-width: 641px){ .oc-scroll-x{ grid-auto-columns: unset; grid-auto-flow: unset; overflow: visible; } }

          /* Seção "O que esperar" */
          .expect-item{ display:flex; gap:10px; align-items:flex-start; }
          .expect-ico{ width:36px; height:36px; border-radius:10px; background: rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.18); display:grid; place-items:center; }
          .expect-title{ color:#fff; font-weight:900; font-size: clamp(14px,3.8vw,16px); }
          .expect-desc{ color: rgba(255,255,255,.92); font-size: clamp(12px,3.4vw,14px); }

          /* Cards de palestrantes responsivos */
          .speaker-card{
            display:grid; grid-template-rows: auto 1fr; gap:10px;
            background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius:16px; overflow:hidden;
          }
          .speaker-photo{ height: 160px; background:#222; }
          .speaker-photo img{ width:100%; height:100%; object-fit:cover; }
          .speaker-name{ color:#fff; font-weight:900; font-size: clamp(16px,4.4vw,18px); }
          .speaker-role,.speaker-bio{ color:rgba(255,255,255,.9); font-size: clamp(12px,3.4vw,14px); line-height:1.55; }
          @media (min-width: 900px){
            .speaker-card{ grid-template-columns: 42% 58%; grid-template-rows: auto; }
            .speaker-photo{ height:auto; }
          }

          /* Para tabelas inevitáveis */
          .table-wrap{ overflow-x:auto; -webkit-overflow-scrolling: touch; border-radius:12px; border:1px solid rgba(255,255,255,.16); }
          .table{ min-width: 560px; }

          /* Alternativa como cards */
          .agenda-card{ background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius:12px; padding:12px; }
          .agenda-title{ color:#fff; font-weight:900; }
          .agenda-meta{ color:rgba(255,255,255,.9); font-size:13px; }

          /* Espaçamentos verticais */
          .section{ padding: clamp(24px, 7vw, 56px) 0; }
          .section + .section{ padding-top: clamp(18px, 6vw, 40px); }

          /* Imagens e gradientes */
          .banner{ aspect-ratio: 16/9; max-height: 320px; border-radius: 16px; overflow: hidden; }
          @media (max-width: 480px){ .banner{ aspect-ratio: 16/10; max-height: 220px; } }

          /* Acessibilidade e toques */
          :where(button, .oc-btn){ min-height: 44px; }
          :focus-visible{ outline: 3px solid rgba(255,255,255,.6); outline-offset: 2px; border-radius: 10px; }

          /* Performance no mobile */
          .grid-3, .grid-2, .speaker-list, .agenda-list{ content-visibility: auto; contain-intrinsic-size: 600px; }
        `
      }} />

      {/* Hero Section with Holographic Effects */}
      <HolographicHero />

      {/* 1) Palestrantes desta edição (full width) */}
      <section id="palestrantes-top" className="speakers-hero">
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 1) Hero de palestrantes (full width, com foco amarelo/laranja) */
            .speakers-hero{
              position: relative;
              z-index: 5;             /* sobe a seção */
              isolation: isolate;     /* impede bleed de pseudo-elementos de fora */
              padding: 64px 0 42px;
              background:
                radial-gradient(60% 40% at 50% 0%, rgba(255,198,93,.25) 0%, rgba(255,198,93,0) 60%),
                linear-gradient(180deg, rgba(255,182,72,.18), rgba(255,182,72,.05));
            }
            .sph-inner{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }

            .sph-head{ text-align: center; margin-bottom: 24px; }
            .sph-head h2{ color:#fff; margin:0 0 6px; font-weight:900; font-size: clamp(24px,3.2vw,36px); }
            .sph-head p{ color: rgba(255,255,255,.9); }

            /* Evita colapso de altura quando o conteúdo ainda não foi migrado */
            .sph-grid{
              display: grid;
              grid-template-columns: repeat(2, minmax(0,1fr));
              gap: 16px;
              min-height: 220px;      /* placeholder visual */
            }
            @media (max-width: 980px){ .sph-grid{ grid-template-columns: 1fr; } }

            /* Cada card ainda sem imagem precisa de uma altura mínima */
            .sph-item{
              display: grid;
              grid-template-columns: 42% 58%;
              min-height: 220px;
              background: rgba(255,255,255,.10);
              border: 1px solid rgba(255,255,255,.20);
              border-radius: 18px;
              overflow: hidden;
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              transition: transform .2s, border-color .2s, box-shadow .2s;
            }
            .sph-item:hover{ transform: translateY(-4px); border-color: rgba(255,182,72,.8); }

            .sph-photo{
              background: linear-gradient(135deg, rgba(255,182,72,.35), rgba(255,111,60,.28));
              position: relative;
            }
            .sph-photo img{
              position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
            }
            
            /* Mobile: evita corte das fotos */
            @media (max-width: 980px){
              .speaker-photo img{
                position: static !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                object-position: center;
                max-width: 100%;
                max-height: 100%;
              }
            }
            .sph-body{ padding: 16px 18px; display:flex; flex-direction:column; gap:8px; }
            .sph-body h3{ margin:0; color:#fff; font-weight:900; font-size: clamp(18px,2.2vw,22px); }
            .sph-role{ margin:0; color: rgba(255,255,255,.92); font-weight:700; font-size: 14px; }
            .sph-bio{ margin:2px 0 0; color: rgba(255,255,255,.86); font-size: 14px; line-height: 1.55; }

            /* Mobile: evita colapso quando vira vertical */
            @media (max-width: 980px){
              .sph-grid{ grid-template-columns: 1fr; }
              .sph-item{ grid-template-columns: 100%; }
              .speaker-photo{ 
                height: 200px; 
                background: linear-gradient(135deg, rgba(255,182,72,.15), rgba(255,111,60,.12));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }
            }
            @media (max-width: 480px){
              .speaker-photo{ 
                height: 160px; 
                background: linear-gradient(135deg, rgba(255,182,72,.15), rgba(255,111,60,.12));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }
            }
          `
        }} />
        
        <div className="oc-container">
          <header className="sph-head">
            <h2 className="oc-hero-title">Palestrantes desta edição</h2>
            <p className="oc-hero-sub">Quatro vozes que conduzem conteúdo de alto impacto.</p>
          </header>

          <div className="grid-2">
            {/* Humberto */}
            <article className="speaker-card">
              <div className="speaker-photo">
                <img src="/images/speakers/humberto-ribeiro.jpg?v=1" alt="Humberto Luiz Ribeiro" loading="lazy" />
              </div>
              <div className="sph-body">
                <h3 className="speaker-name">Humberto Luiz Ribeiro</h3>
                <p className="speaker-role">Diretor da EPICENTOR • Coordenador do CiberLab (FINATEC/UnB)</p>
                <p className="speaker-bio">
                  Conselheiro de Cibersegurança do WEF (2025–2026) e diretor do Deptº de Defesa e Segurança da FIESP (2023–2026).
                  Formações na UnB, MIT, INSEAD, Wharton, UNA e Georgetown; professor‑visitante na Cornell. Ex‑Secretário de Comércio e
                  Serviços do Governo Federal; cofundador da BRASSCOM e da CONAJE; condecorações diversas.
                </p>
              </div>
            </article>

            {/* Raulison */}
            <article className="speaker-card">
              <div className="speaker-photo">
                <img src="/images/speakers/raulison-resende-new.jpg" alt="Raulison Resende" loading="lazy" />
              </div>
              <div className="sph-body">
                <h3 className="speaker-name">Raulison Resende</h3>
                <p className="speaker-role">Diretor do Comitê de Tecnologia (Instituto Pactuá) • Diretor de Educação (ASSESPRO‑SP) • CEO da Wongola</p>
                <p className="speaker-bio">
                  25+ anos liderando projetos estratégicos em tecnologia e educação (BR, Angola, EUA). Fundador do Black in Tech (BiT).
                  Mestre/Doutor (UNICAMP) e pós‑doc (FGV); referência em inovação e gestão de alto impacto com resultados escaláveis.
                </p>
              </div>
            </article>

            {/* Marcelo */}
            <article className="speaker-card">
              <div className="speaker-photo">
                <img src="/images/speakers/marcelo-boarin-new.jpg" alt="Marcelo Boarin" loading="lazy" />
              </div>
              <div className="sph-body">
                <h3 className="speaker-name">Marcelo Boarin</h3>
                <p className="speaker-role">Mestre em Engenharia Elétrica (UnB) • PROFNIT (UEG) • MBA (FGV)</p>
                <p className="speaker-bio">
                  26 anos em TI, CX e IA; passagens por Saint Gobain, J&J, IBM, VIVO, Brasil Telecom/Oi, CONTAX e Nextel/Claro.
                  Fundador da SOBREXP e consultor na iniciativa de Empregabilidade 50+ da A5 Solutions.
                </p>
              </div>
            </article>

            {/* Camilo */}
            <article className="speaker-card">
              <div className="speaker-photo">
                <img src="/images/speakers/camilo-mussi-new.jpg" alt="Camilo Mussi" loading="lazy" />
              </div>
              <div className="sph-body">
                <h3 className="speaker-name">Camilo Mussi</h3>
                <p className="speaker-role">CIO do Ministério da Agricultura e Pecuária (desde 2023)</p>
                <p className="speaker-bio">
                  Ex‑CIO de ANTAQ, INEP e Ministério do Esporte. Oficial Aviador da FAB. Security Leader Brasil 2024; destaque em inovação no DF
                  e transformação digital (2019). Mestre em IA; especializações em Direito e Administração; 24 anos como gestor e professor.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 2) Convidados confirmados (reformulado com ícones) */}
      <section id="convidados" className="guests guests-v2">
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 2) Convidados confirmados - Reformulado com ícones */
            .guests{ 
              position: relative; 
              z-index: 5; 
              isolation: isolate; 
              padding-top: 20px;
              padding-bottom: 42px;
            }

            /* Wrapper com tema diferenciado */
            .guests-v2{
              position: relative;
              padding: 28px 0 44px;
              background:
                radial-gradient(120% 80% at 100% 0%, rgba(255,174,70,.18) 0%, rgba(255,174,70,0) 60%),
                linear-gradient(180deg, rgba(255,198,93,.10), rgba(255,140,60,.08));
              border-top: 2px solid rgba(255,198,93,.25);
            }

            /* Container com respiro lateral */
            .guests-v2 .guests-container{
              max-width: 1300px;
              margin: 0 auto;
              padding: 0 32px;
            }
            @media (max-width:640px){ .guests-v2 .guests-container{ padding: 0 20px; } }

            .guests-title{
              margin: 0 0 16px 2px;
              color:#fff; font-weight:900; font-size: clamp(20px,2.6vw,26px);
              text-shadow: 0 1px 8px rgba(0,0,0,.25);
            }

            /* Grid arejada */
            .guests-v2 .guests-grid{
              display:grid;
              grid-template-columns: repeat(4, minmax(0,1fr));
              gap: 16px 18px;
            }
            @media (max-width:1200px){ .guests-v2 .guests-grid{ grid-template-columns: repeat(3,1fr); } }
            @media (max-width:820px){  .guests-v2 .guests-grid{ grid-template-columns: repeat(2,1fr); gap:14px; } }
            @media (max-width:480px){  .guests-v2 .guests-grid{ grid-template-columns: 1fr; gap:12px; } }

            /* Cartão com ícone */
            .guest-card{
              display:grid; grid-template-columns: 42px 1fr; align-items:center; gap:12px;
              padding: 14px 18px; min-height: 62px;
              background: rgba(255,255,255,.10);
              border: 1px solid rgba(255,255,255,.22);
              border-radius: 16px;
              backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
              color:#fff; font-weight:800;
              transition: transform .2s, border-color .2s, box-shadow .2s, background .2s;
            }
            .guest-card:hover{
              transform: translateY(-2px);
              border-color: rgba(255,182,72,.8);
              box-shadow: 0 12px 26px rgba(255,182,72,.22);
              background: rgba(255,255,255,.12);
            }

            /* Badge do ícone */
            .guest-icon{
              width:42px; height:42px; border-radius:50%;
              display:grid; place-items:center;
              background: radial-gradient(circle at 30% 30%, #ffd27a, #ff9f4a);
              box-shadow: 0 4px 12px rgba(255,182,72,.35);
            }
            .ic{ width:22px; height:22px; fill:#0b1b2b; opacity:.95; }

            /* Permite 2 linhas por padrão */
            .guest-name{
              line-height:1.35;
              display:-webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;     /* até 2 linhas */
              overflow:hidden;
              word-break: break-word;
            }

            /* Para o item específico do Raulison, permita 3 linhas no desktop */
            .guest-card.is-raulison .guest-name{
              -webkit-line-clamp: 3;     /* cabe sem truncar */
            }

            /* Em telas menores, ajuste um pouco a fonte para esse item */
            @media (max-width: 820px){
              .guest-card.is-raulison .guest-name{ font-size: 0.95rem; }
            }

            /* Sistema Ver Mais/Ver Menos - Mobile */
            @media (max-width: 640px){
              .guests-grid{
                position: relative;
                overflow: hidden;
                transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              .guests-grid.collapsed{
                max-height: 200px;
              }
              
              .guests-grid.expanded{
                max-height: 1000px;
              }
              
              .guests-toggle-btn{
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 16px auto 0;
                padding: 12px 24px;
                background: linear-gradient(135deg, rgba(255,182,72,.15), rgba(255,111,60,.12));
                border: 1px solid rgba(255,182,72,.3);
                border-radius: 12px;
                color: #fff;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
              }
              
              .guests-toggle-btn:hover{
                background: linear-gradient(135deg, rgba(255,182,72,.25), rgba(255,111,60,.2));
                border-color: rgba(255,182,72,.5);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(255,182,72,.2);
              }
              
              .guests-toggle-btn:active{
                transform: translateY(0);
              }
              
              .toggle-icon{
                transition: transform 0.3s ease;
              }
              
              .toggle-icon.rotated{
                transform: rotate(180deg);
              }
              
              /* Fade gradient no final quando collapsed */
              .guests-grid.collapsed::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 40px;
                background: linear-gradient(transparent, rgba(0,0,0,0.3));
                pointer-events: none;
              }
            }
            
            /* Desktop: esconde o botão */
            @media (min-width: 641px){
              .guests-toggle-btn{
                display: none;
              }
            }

            /* Proteção contra overlay do herói anterior pegando toda a página */
            .hero-principal::before,
            .hero-principal::after{
              position: absolute;     /* não deixe fixed se cobrir a página toda */
              pointer-events: none;   /* evita bloquear cliques das seções abaixo */
              z-index: 0;             /* abaixo do conteúdo do herói apenas */
            }
            .hero-principal{ position: relative; overflow: hidden; }

            /* Se algum overlay global estiver fixed cobrindo tudo, força ficar por trás */
            body > .decor-fixed,
            body::before,
            body::after{
              z-index: 0 !important;
              pointer-events: none !important;
            }

            /* Cards uniformes e responsivos */
            .content-cards-grid{
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
              margin-bottom: 4rem;
              grid-auto-rows: 1fr;
            }
            @media (min-width: 768px){
              .content-cards-grid{
                grid-template-columns: repeat(2, 1fr);
                gap: 3rem;
              }
            }

            /* Responsividade Mobile para o componente principal */
            @media (max-width: 640px) {
              /* Título principal responsivo */
              .text-6xl {
                font-size: 2.5rem !important;
                line-height: 1.1 !important;
              }
              
              .text-2xl {
                font-size: 1.25rem !important;
                line-height: 1.4 !important;
              }
              
              /* Container principal */
              .bg-black\\/40 {
                padding: 1.5rem !important;
              }
              
              /* Content cards grid */
              .content-cards-grid {
                gap: 1.5rem;
                margin-bottom: 2rem;
              }
              
              .content-cards-grid .bg-gradient-to-br {
                padding: 1.5rem;
              }
              
              .content-cards-grid .flex.items-center {
                flex-direction: row;
                align-items: flex-start;
                gap: 0.75rem;
                margin-bottom: 1rem;
              }
              
              .content-cards-grid .w-12.h-12 {
                width: 2.5rem !important;
                height: 2.5rem !important;
                flex-shrink: 0;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              
              .content-cards-grid .w-12.h-12 svg {
                width: 1.5rem !important;
                height: 1.5rem !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
              }
              
              .content-cards-grid h3 {
                font-size: 1.25rem;
                line-height: 1.3;
                margin: 0;
              }
              
              .content-cards-grid p {
                font-size: 0.95rem;
                line-height: 1.5;
              }
              
              /* Seção "O Que Esperar" */
              .grid.md\\:grid-cols-3 {
                grid-template-columns: 1fr !important;
                gap: 1.5rem;
              }
              
              .grid.md\\:grid-cols-3 .text-center {
                padding: 1rem;
              }
              
              .grid.md\\:grid-cols-3 .w-16.h-16 {
                width: 3rem !important;
                height: 3rem !important;
                margin-bottom: 0.75rem;
              }
              
              .grid.md\\:grid-cols-3 .w-8.h-8 {
                width: 1.5rem !important;
                height: 1.5rem !important;
              }
              
              .grid.md\\:grid-cols-3 p {
                font-size: 0.9rem;
                line-height: 1.4;
              }
              
              /* Cards de navegação */
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
                grid-template-columns: 1fr !important;
                gap: 1rem;
              }
              
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 .p-6 {
                padding: 1.25rem;
              }
              
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 .w-16.h-16 {
                width: 3rem !important;
                height: 3rem !important;
                margin-bottom: 0.75rem;
              }
              
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 .w-8.h-8 {
                width: 1.5rem !important;
                height: 1.5rem !important;
              }
              
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 h3 {
                font-size: 1.1rem;
                margin-bottom: 0.5rem;
              }
              
              .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 p {
                font-size: 0.85rem;
                line-height: 1.3;
              }
              
              /* Botões CTA */
              .flex.flex-col.sm\\:flex-row {
                flex-direction: column !important;
                gap: 1rem;
              }
              
              .flex.flex-col.sm\\:flex-row a {
                width: 100%;
                text-align: center;
                padding: 0.875rem 1.5rem;
                font-size: 1rem;
              }
              
              /* Badge de data */
              .inline-flex.items-center {
                flex-direction: column;
                gap: 0.5rem;
                padding: 1rem;
                text-align: center;
              }
              
              .inline-flex.items-center span {
                font-size: 0.9rem;
              }
            }
            .content-cards-grid > div{
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            .content-cards-grid .bg-gradient-to-br{
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            .content-cards-grid p{
              flex: 1;
              display: flex;
              align-items: flex-start;
            }

            /* Ícones com tamanho fixo e profissional */
            .content-cards-grid .flex.items-center{
              align-items: flex-start;
              gap: 1rem;
            }
            .content-cards-grid .w-12.h-12{
              width: 3rem !important;
              height: 3rem !important;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 0.75rem;
            }
            .content-cards-grid h3{
              flex: 1;
              line-height: 1.2;
              margin: 0;
            }
          `
        }} />
        
        <div className="guests-container">
          <h3 className="guests-title">Convidados confirmados</h3>

          <ul className={`guests-grid ${showAllGuests ? 'expanded' : 'collapsed'}`}>
            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Camilo Mussi (MAPA)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Fernando Ribeiro (FINEP)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Humberto Ribeiro (CyberLab)</span>
            </li>

            <li className="guest-card is-raulison">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Raulison Resende (Instituto Hosp. Alberto Einstein)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Marcelo Boarin (A5 Solution)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Roberto Mayer (BRAFIP)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Fabio Pagani (representante Austrália)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Hélio Ciffoni (representante Japão)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Fernando Cariello (representante USA)</span>
            </li>

            <li className="guest-card">
              <span className="guest-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ic">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
                </svg>
              </span>
              <span className="guest-name">Márcio Canedo (EEN‑IBICT)</span>
            </li>
          </ul>
          
          {/* Botão Ver Mais/Ver Menos - Apenas Mobile */}
          <button 
            className="guests-toggle-btn"
            onClick={toggleGuests}
            aria-label={showAllGuests ? "Ver menos convidados" : "Ver mais convidados"}
          >
            <span>{showAllGuests ? 'Ver menos' : 'Ver mais'}</span>
            <svg 
              className={`toggle-icon ${showAllGuests ? 'rotated' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Background Gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(110deg, #002838 0%, #003d4d 8%, #00566b 16%, #007189 24%, #0099b8 30%, #00bcd4 36%, #2db3d3 42%, #5a9fce 46%, #7890d8 50%, #8b7fdb 54%, #9d6bdf 58%, #a855f7 62%, #b95cf6 66%, #c752ec 70%, #d648e3 74%, #e33ed9 78%, #ec4899 82%, #f06292 86%, #f48fb1 90%, #f8bbd0 94%, #ffc4d6 98%, #ffe0e8 100%)'
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Hexágonos (lado esquerdo) */}
        <motion.div
          className="absolute"
          style={{
            width: '80px',
            height: '80px',
            top: '25%',
            left: '15%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '2px solid #00e5ff',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            opacity: 0.6
          }}
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute"
          style={{
            width: '60px',
            height: '60px',
            top: '60%',
            left: '20%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid #00e5ff',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)',
            opacity: 0.4
          }}
          animate={{ 
            y: [0, -3, 0],
            rotate: [0, -1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Círculos (lado direito) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '90px',
            height: '90px',
            top: '30%',
            right: '18%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.3)',
            opacity: 0.6
          }}
          animate={{ 
            y: [0, -4, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '70px',
            height: '70px',
            top: '65%',
            right: '25%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(244, 114, 182, 0.08) 100%)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)',
            opacity: 0.5
          }}
          animate={{ 
            y: [0, -3, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Partículas douradas */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i}px`,
              height: `${4 + i}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 8}%`,
              background: 'radial-gradient(circle, #ffa500, #ff8c42)',
              boxShadow: '0 0 10px rgba(255, 165, 0, 0.6)',
              opacity: 0.7
            }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Main Content Card */}
          <motion.div 
            className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-12 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #00e5ff 0%, #a855f7 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0, 229, 255, 0.3)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                OPEN CONNECTIONS + InCoDay 2025
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-white mb-8 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Software + Conectividade · Conteúdo, Networking e Parcerias
              </motion.p>

              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: '6rem' }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>

            {/* Content Grid */}
            <div className="content-cards-grid">
              {/* Open Connections Card */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Software + Conectividade</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Explore as últimas tendências em desenvolvimento de software, 
                    conectividade e tecnologias emergentes que estão moldando o futuro digital.
                  </p>
                </div>
              </motion.div>

              {/* InCoDay Card */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 group-hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Conteúdo, Networking e Parcerias</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Conecte-se com profissionais, descubra novas oportunidades de parceria 
                    e participe de discussões sobre conteúdo e inovação.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Event Info */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 mb-8">
                <svg className="w-6 h-6 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-lg font-semibold">11-12 Novembro 2025</span>
                <span className="text-gray-300 mx-4">•</span>
                <span className="text-white text-lg font-semibold">Finatec (campus da UnB na Asa Norte, Brasília)</span>
              </div>
            </motion.div>

            {/* What to Expect */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">O Que Esperar</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">Dois dias de programação intensiva</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">Palestras com especialistas, workshops interativos e sessões de networking</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">Conexões valiosas para o futuro da inovação</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.a 
                href="/hotsite/inscricoes"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 hover:scale-105 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Garantir Vaga
              </motion.a>
              
              <motion.a 
                href="/hotsite/agenda"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Agenda
              </motion.a>
            </motion.div>

            {/* Navigation Cards Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                Explore Mais Detalhes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* Sobre o Evento Card */}
                <motion.a
                  href="/hotsite/sobre"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Sobre o Evento</h3>
                    <p className="text-gray-300 text-sm">Conheça os organizadores, história e parceiros</p>
                  </div>
                </motion.a>

                {/* Agenda Card */}
                <motion.a
                  href="/hotsite/agenda"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Agenda</h3>
                    <p className="text-gray-300 text-sm">Programação completa e atividades</p>
                  </div>
                </motion.a>

                {/* Localização Card */}
                <motion.a
                  href="/hotsite/localizacao"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Localização</h3>
                    <p className="text-gray-300 text-sm">Como chegar e informações do local</p>
                  </div>
                </motion.a>

                {/* Inscrições Card */}
                <motion.a
                  href="/hotsite/inscricoes"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Inscrições</h3>
                    <p className="text-gray-300 text-sm">Garante sua vaga no evento</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OpenConnections;
