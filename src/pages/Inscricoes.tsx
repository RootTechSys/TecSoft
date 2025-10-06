import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';

type Card = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
  tone?: 'amber' | 'cyan' | 'violet' | 'pink' | 'green' | 'blue';
};

const CARDS: Card[] = [
  {
    id: 'congresso',
    icon: 'ic-congresso',
    title: 'Congresso Técnico e de Negócios',
    desc: 'Palestras e painéis com especialistas e atores de sucesso no mercado.',
    href: 'https://forms.gle/4iqerAKaukLmkGgCA',
    tone: 'amber'
  },
  {
    id: 'estandes',
    icon: 'ic-estandes',
    title: 'Estandes de empresas e start-ups',
    desc: 'Demonstração de produtos e serviços de empresas e start-ups.',
    href: 'https://forms.gle/4iqerAKaukLmkGgCA',
    tone: 'cyan'
  },
  {
    id: 'rodada',
    icon: 'ic-rodada',
    title: 'Rodada de Negócios',
    desc: 'Conexões diretas para parcerias e investimentos.',
    href: 'https://forms.gle/jdMLaKpW9gx3naq56',
    tone: 'violet'
  },
  {
    id: 'pitch',
    icon: 'ic-pitch',
    title: 'Pitch Day',
    desc: 'Pitch das ideias selecionadas na Chamada 2025. Acompanhe as ideias selecionadas na chamada de ideias.',
    href: 'https://forms.gle/4iqerAKaukLmkGgCA',
    tone: 'pink'
  },
  {
    id: 'hackathon',
    icon: 'ic-hackathon',
    title: 'Hackathon',
    desc: 'Evento reunindo pessoas de diversas formações para resolver problemas e criar soluções inovadoras em pouco tempo.',
    href: 'https://forms.gle/rFLyTLZia5qTEAvd6',
    tone: 'green'
  },
  {
    id: 'workshops',
    icon: 'ic-workshops',
    title: 'Mini-cursos e workshops',
    desc: 'Programação paralela de capacitações e treinamentos relevantes para empresas inovadoras.',
    href: 'https://forms.gle/LEX9CiPZhhYE2kUe9',
    tone: 'blue'
  }
];

const Inscricoes: React.FC = () => {
  // Accordion controlado - apenas um item aberto por vez
  useEffect(() => {
    const root = document.querySelector('.faq-list[data-accordion="single"]');
    if (!root) return;

    // Fecha todos, exceto o selecionado
    const closeOthers = (current: Element) => {
      root.querySelectorAll('details.faq-item[open]').forEach(d => {
        if (d !== current) d.removeAttribute('open');
      });
    };

    // Clique com mouse/teclado
    const handleClick = (ev: Event) => {
      const target = ev.target as HTMLElement;
      const sum = target.closest('summary');
      if (!sum) return;
      const item = sum.parentElement; // details
      // atraso mínimo para deixar o browser alternar o 'open'
      requestAnimationFrame(() => {
        if (item && item.hasAttribute('open')) closeOthers(item);
      });
    };

    // Suporte a abertura via teclado (Enter/Espaço já funcionam em summary)
    const handleToggle = (ev: Event) => {
      const target = ev.target as HTMLDetailsElement;
      if (target.open) closeOthers(target);
    };

    root.addEventListener('click', handleClick);
    root.querySelectorAll('details.faq-item').forEach(d => {
      d.addEventListener('toggle', handleToggle);
    });

    // Cleanup
    return () => {
      root.removeEventListener('click', handleClick);
      root.querySelectorAll('details.faq-item').forEach(d => {
        d.removeEventListener('toggle', handleToggle);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>{`
        /* Wrapper e grid */
        .insc-wrap{ max-width: 1200px; margin: 0 auto; padding: 24px; }
        .insc-grid{
          display: grid; gap: 20px;
          grid-template-columns: repeat(3, minmax(0,1fr));
          grid-auto-rows: 1fr; /* altura uniforme */
          content-visibility: auto; /* performance */
          align-items: stretch; /* estica cards para mesma altura */
          padding: 10px 0; /* espaço extra para ribbons */
        }
        @media (max-width: 1024px){ 
          .insc-grid{ 
            grid-template-columns: repeat(2,1fr); 
            gap: 18px;
          } 
        }
        @media (max-width: 640px){  
          .insc-grid{ 
            grid-template-columns: 1fr; 
            gap: 16px;
          } 
        }

        /* Card */
        .insc-card{
          --card-bg: rgba(9,22,45,.82);
          --card-bd: rgba(255,255,255,.14);
          background: var(--card-bg);
          border: 1px solid var(--card-bd);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 12px 30px rgba(0,0,0,.25);
          backdrop-filter: blur(8px);
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          position: relative; isolation: isolate;
          height: 100%; /* ocupa toda altura disponível */
          min-height: 240px; /* altura mínima consistente */
          
          /* Card em coluna única: head (topo), desc (meio), cta (rodapé) */
          display: grid;
          grid-template-rows: auto 1fr auto;    /* CTA sempre no final */
          grid-auto-flow: row;
          gap: 12px;
        }
        .insc-card::after{ /* halo sutil no hover */
          content:'';
          position:absolute; inset:-1px; border-radius:16px;
          background: conic-gradient(from 180deg at 50% 50%, rgba(255,182,72,.0), rgba(255,182,72,.28), rgba(255,182,72,0));
          opacity:0; transition: opacity .2s ease; z-index:-1;
        }
        .insc-card:hover{ transform: translateY(-2px); border-color: rgba(255,255,255,.2); }
        .insc-card:hover::after{ opacity:.7; }

        /* Cabeçalho */
        .insc-head{ 
          display: grid; 
          grid-template-columns: 48px 1fr; 
          gap: 12px; 
          align-items: center; 
        }
        .insc-title{ 
          margin:0; 
          color:#fff; 
          font-weight:900; 
          font-size: 18px; 
          letter-spacing:.2px; 
          line-height: 1.3;
        }

        /* Ícone */
        .insc-ico{
          width:48px; height:48px; border-radius:12px;
          display:grid; place-items:center;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.18);
          flex-shrink: 0; /* não encolhe */
        }
        .ic{ width:24px; height:24px; color:#fff; }

        /* Texto */
        .insc-desc{ 
          margin: 0; 
          color: rgba(255,255,255,.92); 
          line-height:1.55; 
          font-size: 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6; /* ajuste conforme necessidade */
          overflow: hidden;
        }

        /* CTA */
        .insc-cta{ 
          margin-top: 6px;
          display: flex; 
          justify-content: flex-end; /* alinha à direita em desktop */
        }
        .insc-btn{
          display:inline-flex; align-items:center; justify-content:center;
          min-height: 44px; min-width: 160px; padding: 10px 16px; border-radius: 10px; border: none;
          color:#0b1b2b; font-weight:900; text-decoration:none;
          transition: transform .18s ease, filter .18s ease, box-shadow .18s ease;
          outline: none;
        }
        .insc-btn:hover{ transform: translateY(-1px); filter: brightness(1.03); }
        .insc-btn:focus-visible{ box-shadow: 0 0 0 3px rgba(255,255,255,.6), 0 0 0 6px rgba(255,182,72,.55); }

        /* Tons de gradiente */
        .tone-amber{  background: linear-gradient(135deg,#ffd27a,#ff9f4a); box-shadow: 0 10px 22px rgba(255,182,72,.26); }
        .tone-cyan{   background: linear-gradient(135deg,#7fd8ff,#20b7e6); box-shadow: 0 10px 22px rgba(32,183,230,.26); }
        .tone-violet{ background: linear-gradient(135deg,#b38cff,#7a5be7); box-shadow: 0 10px 22px rgba(122,91,231,.26); }
        .tone-pink{   background: linear-gradient(135deg,#ff9ed6,#ea6bb6); box-shadow: 0 10px 22px rgba(234,107,182,.26); }
        .tone-green{  background: linear-gradient(135deg,#7de6a2,#30c777); box-shadow: 0 10px 22px rgba(48,199,119,.26); }
        .tone-blue{   background: linear-gradient(135deg,#9fd3ff,#4fb1ff); box-shadow: 0 10px 22px rgba(79,177,255,.24); }

        /* Nota informativa discreta */
        .insc-note{
          margin: 24px 0; 
          color: rgba(255,255,255,.8);
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px; 
          padding: 16px 20px; 
          line-height: 1.5;
          font-size: 14px;
          text-align: center;
        }

        /* Responsivo tablet */
        @media (max-width: 900px){ 
          .insc-card{ min-height: 220px; } 
        }

        /* Responsivo mobile */
        @media (max-width: 640px){
          .insc-card{
            min-height: 0; /* remove altura fixa no mobile */
            padding: 16px;
          }
          .insc-title{ font-size: 16px; }
          .insc-desc{ 
            font-size: 14px; 
            -webkit-line-clamp: 6; /* permite mais linhas no mobile */
          }
          .insc-ico{
            width: 40px; height: 40px;
          }
          .ic{ width: 20px; height: 20px; }
          
          /* Ajuste do ribbon no mobile */
          .insc-card.featured::before{
            top: 6px;
            right: 6px;
            font-size: 10px;
            padding: 3px 6px;
          }
          
          /* CTA ocupa largura total no mobile */
          .insc-cta{ 
            justify-content: stretch;
          }
          .insc-btn{ 
            width: 100%; 
            min-width: 0; 
          }
          
          /* Nota informativa mobile */
          .insc-note{
            margin: 20px 0;
            padding: 14px 16px;
            font-size: 13px;
            line-height: 1.4;
          }
        }



        /* Card em destaque */
        .insc-card.featured{ 
          border-color: rgba(255,182,72,.55); 
          box-shadow: 0 18px 40px rgba(255,182,72,.22);
          overflow: visible; /* permite que o ribbon saia do card */
        }
        .insc-card.featured::before{
          content:"Destaque";
          position:absolute; 
          top:8px; 
          right:8px; /* mudou de -8px para 8px para ficar dentro */
          background: linear-gradient(135deg,#ffd27a,#ff9f4a);
          color:#0b1b2b; 
          font-weight:900; 
          font-size:11px;
          padding:4px 8px; 
          border-radius:999px;
          z-index: 10;
          white-space: nowrap;
        }


        /* FAQ Profissional com Respiro e Ícones */
        .faq-wrap{ 
          max-width: 1200px; margin: 36px auto 0; padding: 10px 24px 18px;
          position: relative;
        }
        .faq-wrap::before{
          content:'';
          position:absolute; left:0; right:0; top:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
        }
        @media (max-width: 640px){ 
          .faq-wrap{ 
            margin-top: 28px; 
            padding: 10px 16px 18px;
          } 
        }
        .faq-title{
          text-align:center; color:#fff; font-weight: 900;
          font-size: clamp(22px,3vw,28px); margin: 0 0 12px;
        }

        .faq-list{ 
          display: grid; 
          gap: 12px; 
          max-width: 100%;
        }

        /* Item base */
        .faq-item{
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 12px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
          overflow: clip;           /* necessário p/ animar altura interna */
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
          width: 100%;
          max-width: 100%;
        }
        .faq-item[open]{
          border-color: rgba(255,182,72,.55);
          background: rgba(255,255,255,.10);
          box-shadow: 0 14px 32px rgba(255,182,72,.16);
        }

        /* Cabeçalho do item com ícone à esquerda e caret à direita */
        .faq-item > summary{
          list-style: none; cursor: pointer; padding: 14px 16px;
          display: grid; grid-template-columns: 1fr 24px; align-items: center; gap: 10px;
          color:#fff; font-weight: 900;
          width: 100%;
          box-sizing: border-box;
        }
        .faq-item > summary::-webkit-details-marker{ display: none; }

        .faq-lead{ 
          display: grid; grid-template-columns: 36px 1fr; gap: 10px; align-items: center; 
          min-width: 0;
          overflow: hidden;
        }
        .faq-ico-wrap{
          width: 36px; height: 36px; border-radius: 10px;
          display:grid; place-items:center;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.18);
          flex-shrink: 0;
        }
        .faq-ico{ width: 20px; height: 20px; color:#fff; }
        .faq-caret{ 
          width: 20px; height: 20px; stroke:#fff; fill:none; stroke-width:2; 
          transition: transform .2s ease; 
          flex-shrink: 0;
        }
        .faq-item[open] .faq-caret{ transform: rotate(180deg); }

        /* Conteúdo do item: animação suave */
        .faq-a{
          color: rgba(255,255,255,.92);
          padding: 0 16px 14px;
          line-height: 1.55;
          animation: faq-reveal .22s ease;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        @keyframes faq-reveal{
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* CTA integrado, com visual coeso */
        .faq-cta{
          margin: 12px 0 12px; padding: 12px;
          border-radius: 12px;
          background: rgba(9,22,45,.85);
          border: 1px solid rgba(255,255,255,.18);
          display: flex; gap: 10px; align-items: center; justify-content: center;
          backdrop-filter: blur(8px);
          flex-wrap: wrap;
        }
        .cta-text{ 
          color:#fff; 
          font-weight: 800; 
          text-align: center;
          flex: 1;
          min-width: 0;
        }
        .faq-cta .insc-btn{ 
          min-width: 160px; 
          flex-shrink: 0;
        }

        /* Nota final coesa */
        .faq-note{
          margin-top: 12px; color: rgba(255,255,255,.92);
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 12px; padding: 12px 14px; line-height: 1.45;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        /* Acessibilidade de foco e área clicável */
        .faq-item > summary:focus-visible{
          outline: 3px solid rgba(255,255,255,.5); outline-offset: 2px; border-radius: 10px;
        }

        /* Tema responsivo */
        @media (max-width: 640px){
          .faq-item > summary{ 
            padding: 12px 14px; 
            grid-template-columns: 1fr 20px;
            gap: 8px;
          }
          .faq-lead{ 
            grid-template-columns: 32px 1fr; 
            gap: 8px;
            min-width: 0;
          }
          .faq-ico-wrap{ 
            width: 32px; height: 32px; border-radius: 8px; 
            flex-shrink: 0;
          }
          .faq-a{ 
            padding: 0 14px 12px; 
            font-size: 14px;
            line-height: 1.5;
          }
          .faq-cta{ 
            flex-direction: column; 
            gap: 8px; 
            padding: 16px;
          }
          .cta-text{
            font-size: 14px;
            margin-bottom: 8px;
          }
          .faq-cta .insc-btn{
            width: 100%;
            min-width: 0;
          }
        }

        /* Acessibilidade & motion */
        @media (prefers-reduced-motion: reduce){
          .insc-card, .insc-btn, .faq-item, .faq-a, .faq-caret{ transition: none; animation: none; }
        }
      `}</style>
      
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-20">
        <main className="insc-wrap">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Atividades e
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Inscrições
              </span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Escolha a atividade de seu interesse e inscreva-se!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6"></div>
          </motion.div>



          {/* Cards Grid */}
          <motion.section 
            className="insc-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* carrega o sprite uma única vez */}
            <svg style={{display: 'none'}}>
              <use href="/icons/inscricoes.svg#ic-congresso" />
                    </svg>

            {CARDS.map((c, i) => (
              <motion.article 
                key={c.id} 
                className={`insc-card ${c.id === 'rodada' ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="insc-head">
                  <span className={`insc-ico tone-${c.tone}`} aria-hidden="true">
                    <svg className="ic" viewBox="0 0 24 24">
                      <use href={`/icons/inscricoes.svg#${c.icon}`} />
                    </svg>
                  </span>
                  <h3 className="insc-title">{c.title}</h3>
                </div>

                <p className="insc-desc">{c.desc}</p>

                <div className="insc-cta">
                  <motion.a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`insc-btn tone-${c.tone}`}
                    aria-label={`Inscrever-se em ${c.title}`}
                    data-activity={c.id}
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: 'insc_click', 
                          activity: c.id
                        });
                      }
                    }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                    Inscrever-se Gratuitamente
                  </motion.a>
              </div>
              </motion.article>
            ))}
          </motion.section>

          {/* Nota informativa discreta */}
          <motion.div 
            className="insc-note"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.8)' }}>
              <strong>Importante:</strong> Se você fez a inscrição para participar da rodada de negócios (1 pessoa), hackathon ou mini‑cursos você não precisa se inscrever também para assistir às palestras do congresso, assistir aos pitches das melhores ideias ou visitação aos estandes, pois terá acesso a todas as atividades.
            </p>
          </motion.div>

          {/* FAQ */}
          <motion.section 
            className="faq-wrap" 
            aria-labelledby="faq-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h2 id="faq-title" className="faq-title">Dúvidas Frequentes</h2>

            <div className="faq-list" data-accordion="single">
              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-rodada" />
                      </svg>
                    </span>
                    <span className="faq-q">Quem pode participar da Rodada de Negócios?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Empresas, startups e investidores com interesse real em parcerias e investimento. Seleção conforme critérios do evento.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-congresso" />
                      </svg>
                    </span>
                    <span className="faq-q">Haverá certificado?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Atividades elegíveis oferecem certificado digital mediante presença confirmada. Envio em até 10 dias úteis.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-hackathon" />
                      </svg>
                    </span>
                    <span className="faq-q">Como funciona o Hackathon?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Times multidisciplinares resolvem desafios em tempo limitado, com mentoria e avaliação final por banca.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-workshops" />
                      </svg>
                    </span>
                    <span className="faq-q">Posso participar de múltiplas atividades?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Sim, conforme disponibilidade de agenda e regras de cada trilha. Recomenda-se registrar todas no formulário.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-estandes" />
                      </svg>
                    </span>
                    <span className="faq-q">Há custo para participar?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Algumas atividades são gratuitas; outras podem exigir inscrição aprovada. Consulte o formulário para detalhes.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span className="faq-lead">
                    <span className="faq-ico-wrap">
                      <svg className="faq-ico" viewBox="0 0 24 24">
                        <use href="/icons/inscricoes.svg#ic-pitch" />
                      </svg>
                    </span>
                    <span className="faq-q">Como me inscrevo?</span>
                  </span>
                  <svg className="faq-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="faq-a">
                  Escolha a atividade de interesse e clique em "Inscrever-se Gratuitamente" no card correspondente. Preencha o formulário e aguarde confirmação por e-mail.
                </div>
              </details>
              </div>

            {/* CTA integrado */}
            <div className="faq-cta">
              <span className="cta-text">Pronto para garantir vaga?</span>
              <a className="insc-btn tone-amber" href="https://forms.gle/4iqerAKaukLmkGgCA" target="_blank" rel="noopener noreferrer">Inscrever-se Gratuitamente</a>
            </div>
          </motion.section>

        </main>
      </div>
    </div>
  );
};

export default Inscricoes;

