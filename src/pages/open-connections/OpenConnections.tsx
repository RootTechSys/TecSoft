import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import HolographicHero from '../../components/open-connections/HolographicHero';
import CurvedBanner from '../../components/open-connections/CurvedBanner';
import NavigationSidebar from '../../components/NavigationSidebar';

interface Speaker {
  id: number;
  name: string;
  role: string;
  bio: string;
  miniBio: string[]; // Array de 3 bullets para mini bio
  photo: string;
  externalLink?: string; // Link externo opcional
}

const OpenConnections: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllGuests, setShowAllGuests] = useState(false);
  const [expandedBios, setExpandedBios] = useState<Set<number>>(new Set());
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'auto'; // Limpa overflow ao desmontar
    };
  }, []);

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

  const toggleBio = (speakerId: number, speaker: Speaker, event?: React.MouseEvent) => {
    if (isMobile) {
      // Mobile: acordeão - apenas um card expandido por vez
      setExpandedBios(prev => {
        const newSet = new Set<number>();
        if (!prev.has(speakerId)) {
          // Se não estava expandido, expande este e fecha os outros
          newSet.add(speakerId);
          // Scroll suave para o card expandido
          setTimeout(() => {
            const cardElement = document.getElementById(`speaker-card-${speakerId}`);
            if (cardElement) {
              cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 250); // Após animação do acordeão
        }
        // Se já estava expandido, fecha (newSet vazio)
        return newSet;
      });
    } else {
      // Desktop: abre modal
      // Guarda referência do botão que abriu para retornar foco
      const triggerButton = event?.currentTarget as HTMLButtonElement;
      if (triggerButton) {
        triggerButton.setAttribute('data-modal-trigger', 'true');
      }
      
      setSelectedSpeaker(speaker);
      document.body.style.overflow = 'hidden';
      
      // Foco inicial no título do modal (será aplicado após render)
      setTimeout(() => {
        const modalTitle = document.getElementById('speaker-modal-title');
        if (modalTitle) {
          (modalTitle as HTMLElement).focus();
        }
      }, 200);
    }
    
    // Previne propagação do evento
    event?.stopPropagation();
  };

  const closeModal = () => {
    // Encontra o botão que abriu o modal
    const triggerButton = document.querySelector('[data-modal-trigger="true"]') as HTMLButtonElement;
    
    setSelectedSpeaker(null);
    document.body.style.overflow = 'auto';
    
    // Remove atributo e retorna foco ao botão
    if (triggerButton) {
      triggerButton.removeAttribute('data-modal-trigger');
      setTimeout(() => {
        triggerButton.focus();
      }, 100);
    }
  };

  // Fecha modal com ESC
  useEffect(() => {
    if (!selectedSpeaker) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSpeaker(null);
        document.body.style.overflow = 'auto';
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedSpeaker]);


  // Mapeamento de foco para cada palestrante (ajuste conforme necessário)
  // Valores são percentuais: --focus-x (horizontal), --focus-y (vertical)
  // Por padrão, imagens usam object-fit: contain (mostram inteiras)
  // Se useCover: true, usa object-fit: cover (preenche o espaço, pode cortar)
  const speakerFocusMap: Record<number, { x: string; y: string; useCover?: boolean }> = {
    1: { x: 'center', y: 'center' }, // Henrique (primeiro)
    2: { x: 'center', y: 'center' }, // Humberto
    3: { x: 'center', y: 'center' }, // Raulison
    4: { x: 'center', y: 'center' }, // Marcelo
    5: { x: 'center', y: 'center' }, // Camilo
    6: { x: 'center', y: 'center' }, // Fabio
    7: { x: 'center', y: 'center' }, // Gerardo
    8: { x: 'center', y: 'center' }, // Alexandre
    9: { x: 'center', y: 'center' }, // Helio
    10: { x: 'center', y: 'center' }, // Marcio Canedo
    11: { x: 'center', y: 'center' }, // Renata Vianna
  };

  // Dados dos palestrantes
  const speakers: Speaker[] = [
    {
      id: 1,
      name: 'Henrique de Oliveira Miguel',
      role: 'Secretário de Ciência e Tecnologia para Transformação Digital - MCTI',
      miniBio: [
        'Eng. eletrônico (UnB) e servidor de carreira no MCTI.',
        'Liderou CG de Microeletrônica e Tecnologias Digitais; hoje Secretário de Transformação Digital (desde 06/2023).',
        'Trajetória iniciada na SEI em políticas públicas de TIC.'
      ],
      bio: `Henrique de Oliveira Miguel é engenheiro eletrônico pela Universidade de Brasília - UnB. Iniciou a carreira como Assessor Técnico da antiga Secretaria Especial de Informática - SEI, órgão pioneiro na definição de políticas públicas para o setor de Tecnologias da Informação e Comunicação no Brasil. Já no Ministério da Ciência, Tecnologia e Inovação, ocupou diversos cargos de direção, coordenação e assessoramento, com destaque para a de Coordenador-Geral de Microeletrônica da Secretaria de Política de Informática do Ministério da Ciência, Tecnologia e Inovação e de Coordenador-Geral de Tecnologias Digitais (CGTD) da Secretaria de Empreendedorismo e Inovação-SEMPI do MCTI. Funcionário de carreira, assumiu como interino, por diversas vezes, o cargo de Secretário de Política de Informática e de outras secretarias do MCTI que trataram do tema das políticas nacionais de TIC até assumir a titularidade como secretário da Secretaria de Ciência e Tecnologia para Transformação Digital do MCTI, em junho de 2023.`,
      photo: '/Palestrantes/henriquedeoliveiramiguel.jpg'
    },
    {
      id: 2,
      name: 'Humberto Luiz Ribeiro',
      role: 'Diretor da EPICENTOR • Coordenador do CiberLab (FINATEC/UnB)',
      miniBio: [
        'Diretor da EPICENTOR e coordenador do CiberLab FINATEC/UnB.',
        'Conselheiro de Cibersegurança do WEF (2025–2026) e diretor na FIESP (2023–2026).',
        'Eng. pela UnB, pós no MIT/INSEAD/Wharton; ex-Secretário de Comércio e Serviços.'
      ],
      bio: `Diretor da EPICENTOR.
Coordenador do CiberLab (FINATEC/UnB).

É Conselheiro de Cibersegurança do World Economic Forum (2025-2026) e membro-diretor do Departamento de Defesa e Segurança da FIESP (2023-2026). 

Engenheiro pela Universidade de Brasília (UnB), é pós-graduado pelo MIT, INSEAD, The Wharton School (UPenn), UNA, e Georgetown University. Professor-visitante de Services Innovation & Trade na Cornell University (NY – EUA).

Foi Secretário de Comércio e Serviços do Governo Federal (2011 a 2014). Co-Fundador dirigente da BRASSCOM e da CONAJE.

Condecorado com a Medalha do Mérito Alvorada (GDF), a Medalha da Vitória (Ministério da Defesa) e Hall da Fama do Franchising (ABF), entre outras comendas.`,
      photo: '/images/speakers/humberto-ribeiro.jpg?v=1'
    },
    {
      id: 3,
      name: 'Raulison Resende',
      role: 'Diretor do Comitê de Tecnologia (Instituto Pactuá) • Diretor de Educação (ASSESPRO‑SP) • CEO da Wongola',
      miniBio: [
        'Diretor de Tecnologia do Instituto Pactuá e Educação na Federação ASSESPRO‑SP; CEO da Wongola.',
        '25+ anos liderando projetos e captação milionária em inovação no Brasil e exterior.',
        'Fundador do programa Black in Tech; Mestre/Doutor UNICAMP, pós‑doc FGV.'
      ],
      bio: `Raulison Resende é Diretor do Comitê de Tecnologia do Instituto Pactuá e Diretor de Educação da Federação ASSESPRO-SP, sendo uma figura central no desenvolvimento de políticas e estratégias para o setor de tecnologia no Brasil. Com mais de 25 anos de experiência liderando projetos estratégicos, é amplamente reconhecido por sua habilidade em implementar soluções transformadoras que geram impactos mensuráveis em diferentes ecossistemas. Atualmente, Raulison é CEO da Wongola, uma startup inovadora com atuação nas áreas de tecnologia e educação, com operações no Brasil e em Angola, consolidando-se como referência em projetos que conectam tecnologia, inovação e gestão estratégica com foco em resultados concretos e escaláveis. Ele também é fundador do programa Black in Tech (BiT), uma iniciativa que promove a diversidade no setor tecnológico, conectando talentos negros a oportunidades qualificadas e reduzindo barreiras de acesso ao mercado. Sua trajetória internacional inclui a liderança de projetos de transformação digital em países como Angola e Estados Unidos, além de captar milhões de reais para iniciativas de tecnologia e inovação no Brasil. Mestre e Doutor pela UNICAMP, com pós-doutorado pela FGV, Raulison une sólida trajetória acadêmica a uma atuação profissional de destaque, posicionando-se como uma referência em tecnologia, inovação e gestão de alto impacto.`,
      photo: '/images/speakers/raulison-resende-new.jpg'
    },
    {
      id: 4,
      name: 'Marcelo Boarin',
      role: 'Mestre em Engenharia Elétrica (UnB) • PROFNIT (UEG) • MBA (FGV)',
      miniBio: [
        'Mestre em Eng. Elétrica (UnB); MBA Marketing (FGV); pós em Experiência do Cliente (Sírio‑Libanês).',
        '20+ anos em TI, CX e IA em empresas como IBM, VIVO e Claro.',
        'Fundador da SOBREXP e consultor na A5 Solutions (empregabilidade 50+).'
      ],
      bio: `Marcelo Boarin é Pai da Nicole (Autista), Mestre em Engenharia Elétrica (UNB), Mestrando em Propriedade Intelectual e Transferência de Tecnologia para a Inovação Tecnológica (UEG/PROFNIT), graduado em Engenharia e Administração (Universidade Mackenzie), MBA em Marketing (FGV) e Pós-graduado em Experiência do Cliente e Cuidado Centrado na Pessoa (Hospital Sírio Libanês) e Gestão de Tecnologia da Informação (UNB).
Nascido em São Paulo e morando em Anápolis/Goiás a 26anos.
Trabalhou em grandes empresas (Saint Gobain, J&J, IBM, VIVO, Brasil Telecom/Oi, CONTAX e Nextel/Claro) estando envolvido nas últimas duas décadas em grandes projetos ligados a Tecnologia da Informação / Relacionamento & Experiência do Cliente / Inovação / Inteligência Artificial.
Fundador e entusiasta da Sociedade Brasileira de Experiência ao Paciente e Cuidado Centrado na Pessoa (SOBREXP).
Participa da iniciativa de Empregabilidade 50+ da A5 Solutions, como consultor em projetos estratégicos.`,
      photo: '/images/speakers/marcelo-boarin-new.jpg'
    },
    {
      id: 5,
      name: 'Camilo Mussi',
      role: 'CIO do Ministério da Agricultura e Pecuária (desde 2023)',
      miniBio: [
        'CIO do MAPA desde 01/2023; ex‑CIO em ANTAQ, INEP e Min. do Esporte.',
        'Prêmios: Security Leader Brasil 2024 e liderança em transformação digital.',
        'Mestre em IA; docente por 24 anos em graduação e pós.'
      ],
      bio: `Atual CIO do Ministério da Agricultura e Pecuária, desde jan/2023.

Foi CIO de diversos órgãos federais, como ANTAQ, INEP e Ministério do Esporte.

Foi Oficial Aviador da Força Aérea;

Recebeu premiações relevantes na área de Tecnologia da Informação, como Security Leader Brasil 2024; Líder de inovação no Distrito Federal e um dos líderes de transformação digital do governo federal em 2019.

Possui Mestrado em Inteligência Artificial; Especializações e Graduação em Direito e Administração.
 
Foi gestor e Professor de cursos de graduação e de pós-graduação, durante 24 anos e autor de artigos apresentados em congressos nacionais e internacionais.`,
      photo: '/images/speakers/camilo-mussi-new.jpg'
    },
    {
      id: 6,
      name: 'Fabio Pagani',
      role: 'Empreendedor Serial • Ativista do Ecossistema de Inovação',
      miniBio: [
        'Empreendedor serial: seis empresas fundadas; mentor e investidor de startups.',
        'Ativista do ecossistema desde os anos 90; gestão pública em Campinas e SP.',
        'Cientista da computação (Unicamp); foco em inovação, sociologia e educação.'
      ],
      bio: `Empreendedor serial, em 40 anos de empreendedorismo abri seis empresas. Errei em três.
Ativista do ecossistema de inovação e empreendedorismo brasileiro desde os anos 90, participei da criação e da gestão de quatro entidades ligadas à este ecossistema.
Empreendi politicamente, participando da gestão da tecnologia nos municípios de Campinas e de São Paulo.
Sou mentor e investidor de startups que irão melhorar o mundo.
A Unicamp me fez cientista da computação, a experiência me transformou em gestor, tenho paixão pela sociologia e fico feliz quando consigo ser professor, mas o que me move é a enorme disposição em ser um eterno aluno.`,
      photo: '/Palestrantes/Fabio Pagani - Foto.jpg'
    },
    {
      id: 7,
      name: 'Gerardo Lima',
      role: 'Consultor Técnico Empresarial • Presidente da UniOficiais/BR',
      miniBio: [
        'Consultor técnico empresarial; bacharel, especialista e mestre em Direito.',
        'Presidente da UniOficiais/BR; 23 anos como Oficial de Justiça no TJDFT.',
        'Experiência prévia como policial rodoviário federal.'
      ],
      bio: `Gerardo Lima. Consultor técnico na área empresarial. Bacharel, Especialista e Mestre em Direito. Presidente da Associação Nacional dos Oficiais de Justiça Federais - UniOficiais/BR. 23 anos como Oficial de Justiça do TJDFT e como ex-policial rodoviário federal.`,
      photo: '/Palestrantes/Gerardor Lima - Foto.jpg'
    },
    {
      id: 8,
      name: 'Alexandre Barragat',
      role: 'Gerente do Departamento de Cooperação Internacional da Finep',
      miniBio: [
        'Gerente de Cooperação Internacional na Finep.',
        'Eng. civil (UFV), esp. em engenharia econômica (FDC), mestre em adm. pública (FGV).',
        'Atuação desde 2001 na Finep em operações, planejamento e cooperação.'
      ],
      bio: `Gerente do Departamento de Cooperação Internacional da Finep

Engenheiro civil formado pela Universidade Federal de Viçosa, especialista em engenharia econômica pela Fundação Dom Cabral e mestre em administração pública pela Fundação Getúlio Vargas. Analista da Finep desde 2001, trabalhou em operações, no planejamento e na cooperação internacional. Anteriormente, foi engenheiro da Caixa Econômica Federal e do Banco de Desenvolvimento de Minas Gerais.`,
      photo: '/Palestrantes/Alexandre Barragat - Foto1.jpg'
    },
    {
      id: 9,
      name: 'Helio Galvão Ciffoni',
      role: 'Fundador e CEO da Sapiens Global',
      miniBio: [
        'Fundador/CEO da Sapiens Global, com bases em Singapura, Japão, China, Brasil e Portugal.',
        'Mestre em Educação (PUCPR); físico e engenheiro civil (UFPR).',
        '30+ anos em gestão, TI e mercado internacional; palestras na Ásia, Américas e Europa.'
      ],
      bio: `Fundador e CEO da Sapiens Global, empresa com sede em Singapura e escritórios em Tóquio, Dongguan, Barcelos (Portugal), Curitiba e São Paulo.

Mestre em Educação (PUCPR), Físico e Engenheiro Civil (UFPR). Empresário com mais de 30 anos de experiência em Gestão de Empresas, Tecnologia da Informação e Mercado Internacional.

Foi professor do Depto. de Ciência da Computação da PUCPR por 20 anos, de 1987 a 2007. Atua no mercado asiático desde 1998, vivendo na Ásia (Tóquio e Singapura) desde 2009.
Participou como palestrante em eventos de Tecnologia da Informação e Mercado Internacional no Japão, Singapura, Malásia, Indonésia, Tailândia, Myanmar, China, Brasil, Canadá e Portugal. 

Ação Institucional:

Diretor da MACC - Câmara de Comércio Mercosul / Sudeste Asiático (ASEAN) desde 2020;
Membro do Conselho de Amizade com Países Estrangeiros da Cidade de Dongguan, China, desde 2019;
Ex-Conselheiro do CITS - Centro Internacional de Tecnologia de Software (Curitiba) de 2004 a 2007;
Membro-Fundador da CCBJ - Câmara Brasil-Japão em Tóquio, em 2001;
Ex-Conselheiro da Câmara de Indústria e Comércio Brasil - Japão do Paraná, de 2000 a 2002.`,
      photo: '/Palestrantes/Helio Ciffoni - Foto.jpg'
    },
    {
      id: 10,
      name: 'Marcio Canedo',
      role: 'Pesquisador do IBICT • Coordenador do Programa Enterprise Europe Network EEN Brasil',
      miniBio: [
        'Pesquisador do IBICT; coordenador do Programa Enterprise Europe Network EEN Brasil.',
        'Mestre em Relações Internacionais (Columbia); professor em múltiplas instituições.',
        'Especialista em cooperação internacional, propriedade intelectual e contratos internacionais.'
      ],
      bio: `Possui graduação em Relações Internacionais e Direito pela Universidade de Brasília (1992) e Mestre (Master in International Affairs) pela Universidade Columbia, Nova Iorque, EUA. Foi professor da Universidade Federal do Mato Grosso do Sul, UFMS, na Faculdade de Direito, FADIR por 8 anos, e também consultor para assuntos internacionais e de propriedade intelectual do escritório de advocacia LGA Advogados Associados, em Campo Grande, MS, também prestando serviços similares à Paineiras Consultoria, também em Campo Grande, MS. Tem experiência docente e profissional nas áreas de Ciência Política, Relações Internacionais e Direito, com ênfase em Política Internacional, Regulação Econômica, Direito Internacional Público e Privado e Direito Empresarial. Também é consultor nas áreas jurídica e econômica internacionais e empresariais, especialmente na área de marcas e patentes internacionais e negociação de contratos internacionais, de projetos de cooperação internacional e de desenvolvimento sustentável. Foi professor e coordenador do Curso de Relações Internacionais do Centro Universitário de Campo Grande - UNAES, professor da FCG FACSUL, da Universidade Católica Dom Bosco, dos cursos preparatórios EXATO, NEON e Ícones do Direito e professor voluntário da Faculdade de Direito da Universidade de Brasília, UnB. Atualmente é pesquisador do Instituto Brasileiro de Informação em Ciência e Tecnologia, IBICT, onde também é coordenador da Seção de Relações Internacionais, SERIN, e do Programa Enterprise Europe Network EEN Brasil, a maior plataforma digital de negociação do mundo, criada pela União Europeia para facilitação de negócios internacionais para pequenas e médias empresas, e pesquisador da Fundação de Apoio à Cultura, Educação e Pesquisa, FAPEC, da Universidade Federal do Mato Grosso do Sul, UFMS.`,
      photo: '/Palestrantes/Marcio Canedo - Foto.jpg'
    },
    {
      id: 11,
      name: 'Renata Vianna',
      role: 'Superintendente de Ciência, Tecnologia e Inovação da FAPDF',
      miniBio: [
        'Superintendente de Ciência, Tecnologia e Inovação da FAPDF.',
        'Mestre em Engenharia de Segurança Cibernética (UnB); referência em proteção de dados e IA.',
        'Lidera iniciativas estratégicas em tecnologia, sustentabilidade e ecossistema local.'
      ],
      bio: `Renata Vianna é advogada e Superintendente de Ciência, Tecnologia e Inovação da FAPDF, com atuação em políticas públicas voltadas ao desenvolvimento científico e à inovação no DF. Mestre em Engenharia de Segurança Cibernética pela UnB, é referência em proteção de dados e inteligência artificial. Lidera iniciativas estratégicas com foco em tecnologia, sustentabilidade e fortalecimento do ecossistema local.`,
      photo: '/Palestrantes/Renata Viana - Foto.jpg'
    }
  ];
  
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
          {scrollProgress > 50 ? 'Garantir Vaga' : 'Atividades e Inscrições'}
        </a>
      </motion.div>

      {/* CSS Mobile-First para Open Connections */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Container global responsivo */
          .oc-container{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          @media (max-width: 480px){ .oc-container{ padding: 0 16px; } }

          /* Grids padrão da página */
          /* Grid responsivo dos cards - garante tamanho uniforme */
          .grid-3{ 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 24px; 
            align-items: stretch; /* Iguala a altura dos cards */
          }
          .grid-2{ 
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 24px; 
            align-items: stretch; 
          }

          /* Tablet: 2 colunas */
          @media (max-width: 1024px) and (min-width: 641px){
            .grid-3{ 
              grid-template-columns: repeat(2, 1fr); 
              gap: 20px;
            }
            .grid-2{
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }
          
          /* Mobile: 1 coluna */
          @media (max-width: 640px){
            .grid-3, .grid-2{ 
              grid-template-columns: 1fr; 
              gap: 20px; 
            }
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
            display: flex;
            flex-direction: column;
            background: rgba(255,255,255,.08); 
            border:1px solid rgba(255,255,255,.16); 
            border-radius:16px; 
            overflow:hidden;
            height: 100%; /* Força todos os cards a terem a mesma altura */
            min-height: 320px;
          }
          
          /* Wrapper da foto com proporção fixa 4:5 - todos os containers têm o mesmo tamanho */
          .speaker-photo{ 
            aspect-ratio: 4 / 5;
            width: 100%;
            position: relative;
            overflow: hidden;
            background: #222;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Suporta variáveis CSS para foco customizado */
            --focus-x: 50%;
            --focus-y: 50%;
          }
          
          /* Imagens com contain para mostrar inteiras, sem cortes */
          .speaker-photo img{ 
            width: 100%;
            height: 100%;
            object-fit: contain; /* Mostra imagem inteira sem cortes */
            /* Usa variáveis CSS para posicionamento customizado por imagem */
            object-position: var(--focus-x, center) var(--focus-y, center);
            display: block;
          }
          
          /* Alternativa para imagens que podem usar cover (se necessário) */
          .speaker-photo img.is-cover{
            object-fit: cover;
          }
          
          /* Fallback para browsers sem suporte a aspect-ratio */
          @supports not (aspect-ratio: 4 / 5) {
            .speaker-photo::before {
              content: '';
              display: block;
              padding-top: 125%; /* 5/4 = 1.25 = 125% */
            }
            .speaker-photo {
              position: relative;
            }
            .speaker-photo img {
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .speaker-name{ 
            color:#fff; 
            font-weight:900; 
            font-size: clamp(18px,4.4vw,22px); 
            margin-bottom: 6px; 
            line-height: 1.3;
          }
          .speaker-role{ 
            color:rgba(255,255,255,.9); 
            font-size: clamp(14px,3.2vw,16px); 
            line-height:1.5; 
            margin-bottom: 12px; 
            font-weight: 600;
          }
          
          /* Mini bio em bullets */
          .speaker-mini-bio{
            list-style: none;
            padding: 0;
            margin: 0 0 12px 0;
            flex: 1 1 auto;
            min-height: 60px;
          }
          .mini-bio-bullet{
            color: rgba(255,255,255,.92);
            font-size: clamp(14px,3.4vw,16px);
            line-height: 1.6;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
          }
          .mini-bio-bullet::before{
            content: '•';
            position: absolute;
            left: 0;
            color: rgba(255,255,255,.8);
            font-weight: bold;
            font-size: 18px;
          }
          .mini-bio-bullet:last-child{
            margin-bottom: 0;
          }
          
          /* Bio expandida (mobile acordeão) */
          .speaker-bio-expanded{
            flex: 1 1 auto;
            color: rgba(255,255,255,.92);
            font-size: clamp(14px,3.4vw,16px);
            line-height: 1.6;
            margin-bottom: 12px;
            animation: slideDown 0.25s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .sph-body{ 
            display: flex; 
            flex-direction: column; 
            padding: 16px;
            gap: 12px;
            flex: 1 1 auto; /* Ocupa o espaço disponível */
            min-height: 0;
          }
          /* Área de ações sempre no rodapé */
          .sph-body > .bio-toggle-btn,
          .sph-body > .speaker-profile-link{
            margin-top: auto; /* "Cola" no fundo do card */
            flex-shrink: 0;
          }
          
          .bio-toggle-btn{
            padding: 12px 20px;
            background: rgba(255,255,255,.1);
            border: 1px solid rgba(255,255,255,.2);
            border-radius: 8px;
            color: rgba(255,255,255,.95);
            font-size: clamp(14px,3.4vw,16px);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.25s ease;
            align-self: flex-start;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            width: auto;
            min-height: 44px; /* Área de toque mínima 44x44px */
            min-width: 120px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          
          .bio-toggle-btn:focus-visible{
            outline: 3px solid rgba(255,255,255,.6);
            outline-offset: 2px;
          }
          
          .speaker-profile-link{
            margin-top: 8px;
            padding: 10px 18px;
            color: rgba(255,255,255,.9);
            font-size: clamp(13px,3.2vw,15px);
            text-decoration: none;
            border: 1px solid rgba(255,255,255,.3);
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
            min-height: 40px;
            align-self: flex-start;
          }
          
          .speaker-profile-link:hover,
          .speaker-profile-link:focus{
            background: rgba(255,255,255,.15);
            border-color: rgba(255,255,255,.4);
            outline: none;
          }
          
          .speaker-profile-link:focus-visible{
            outline: 3px solid rgba(255,255,255,.6);
            outline-offset: 2px;
          }
          .bio-toggle-btn:hover{
            background: rgba(255,255,255,.15);
            border-color: rgba(255,255,255,.3);
            transform: translateY(-1px);
          }
          .bio-toggle-btn:active{
            transform: translateY(0);
          }
          
          @media (max-width: 640px){
            .speaker-card{
              min-height: 280px;
            }
            .speaker-photo{
              aspect-ratio: 4 / 5;
            }
            .bio-toggle-btn{
              padding: 12px 20px;
              font-size: 15px;
              min-height: 44px;
            }
          }
          
          /* Modal de biografia completa - Desktop */
          .speaker-modal-overlay{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(11, 27, 43, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            animation: fadeIn 0.25s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          /* Contraste mínimo 4.5:1 para acessibilidade */
          .speaker-name,
          .speaker-modal-name{
            color: #ffffff; /* Contraste máximo com fundo escuro */
            text-shadow: 0 1px 2px rgba(0,0,0,.3);
          }
          
          .speaker-role,
          .speaker-modal-role,
          .mini-bio-bullet,
          .speaker-bio-expanded{
            color: rgba(255,255,255,.95); /* Alto contraste */
          }
          
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .speaker-modal{
            background: linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.08));
            border: 1px solid rgba(255,255,255,.2);
            border-radius: 24px;
            max-width: 900px;
            width: 100%;
            max-height: 85vh;
            overflow-y: auto;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 20px 60px rgba(0,0,0,.4);
            animation: slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
          }
          
          .speaker-modal::-webkit-scrollbar {
            width: 8px;
          }
          
          .speaker-modal::-webkit-scrollbar-track {
            background: rgba(255,255,255,.05);
            border-radius: 4px;
          }
          
          .speaker-modal::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.2);
            border-radius: 4px;
          }
          
          .speaker-modal::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,.3);
          }
          
          .speaker-modal-header{
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 32px 32px 24px;
            border-bottom: 1px solid rgba(255,255,255,.1);
          }
          
          .speaker-modal-photo{
            width: 180px;
            height: 180px;
            border-radius: 16px;
            overflow: hidden;
            flex-shrink: 0;
            border: 2px solid rgba(255,255,255,.2);
            box-shadow: 0 8px 24px rgba(0,0,0,.3);
            background: rgba(255,255,255,.05);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          .speaker-modal-photo img{
            width: 100%;
            height: 100%;
            object-fit: contain; /* Mostra imagem inteira sem cortes */
            object-position: center center;
            display: block;
          }
          
          .speaker-modal-info{
            flex: 1;
          }
          
            .speaker-modal-name{
              color: #fff;
              font-weight: 900;
              font-size: 28px;
              margin: 0 0 8px;
              line-height: 1.2;
            }
            
            #speaker-modal-title{
              outline: none;
            }
            
            #speaker-modal-title:focus{
              outline: 3px solid rgba(255,255,255,.6);
              outline-offset: 2px;
              border-radius: 4px;
            }
          
          .speaker-modal-role{
            color: rgba(255,255,255,.85);
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
          }
          
          .speaker-modal-close{
            position: absolute;
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
            border-radius: 50%;
            background: rgba(255,255,255,.1);
            border: 1px solid rgba(255,255,255,.2);
            color: rgba(255,255,255,.9);
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          
          .speaker-modal-close:focus-visible{
            outline: 3px solid rgba(255,255,255,.6);
            outline-offset: 2px;
          }
          
          .speaker-modal-close:hover{
            background: rgba(255,255,255,.2);
            border-color: rgba(255,255,255,.3);
            transform: rotate(90deg);
          }
          
          .speaker-modal-body{
            padding: 32px;
          }
          
          .speaker-modal-bio{
            color: rgba(255,255,255,.92);
            font-size: 16px;
            line-height: 1.7;
            margin: 0;
            white-space: pre-line;
            max-width: 65ch; /* 60-75 caracteres para leitura confortável */
          }
          
          .speaker-modal-bio p{
            margin-bottom: 16px;
          }
          
          .speaker-modal-bio p:last-child{
            margin-bottom: 0;
          }
          
          @media (max-width: 900px){
            .speaker-modal-overlay{
              padding: 0;
              align-items: flex-end;
            }
            
            .speaker-modal{
              max-height: 90vh;
              border-radius: 24px 24px 0 0;
              animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .speaker-modal-header{
              flex-direction: column;
              text-align: center;
              padding: 24px 20px 20px;
            }
            
            .speaker-modal-photo{
              width: 140px;
              height: 140px;
              /* Mantém contain para evitar cortes também no mobile */
            }
            
            .speaker-modal-name{
              font-size: 22px;
            }
            
            .speaker-modal-role{
              font-size: 14px;
            }
            
            .speaker-modal-body{
              padding: 24px 20px;
            }
            
            .speaker-modal-bio{
              font-size: 15px;
              line-height: 1.6;
            }
          }
          /* Layout desktop: mantém flex column para garantir botão no rodapé */
          @media (min-width: 900px){
            .speaker-card{ 
              display: flex;
              flex-direction: column;
              min-height: 320px;
            }
            .speaker-photo{ 
              aspect-ratio: 4 / 5;
              width: 100%;
              flex-shrink: 0;
            }
            .sph-body{ 
              padding: 20px; 
              display: flex;
              flex-direction: column;
              gap: 12px;
              flex: 1 1 auto;
              min-height: 0;
            }
            .speaker-mini-bio{
              flex: 1 1 auto;
              min-height: 60px;
            }
            .speaker-bio-expanded{
              flex: 1 1 auto;
            }
            .sph-body > .bio-toggle-btn,
            .sph-body > .speaker-profile-link{
              margin-top: auto;
            }
            .bio-toggle-btn{
              padding: 12px 18px;
              min-height: 44px;
            }
          }
          
          /* Mobile: garante altura mínima adequada */
          @media (max-width: 640px){
            .speaker-card{
              min-height: 300px;
            }
            .speaker-photo{
              /* Mantém aspect-ratio 4:5 em mobile também */
            }
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
            
            /* Botão de programação */
            .btn-programacao{
              display: inline-block;
              margin-top: 16px;
              padding: 14px 28px;
              background: linear-gradient(135deg, #ff6b35, #f7931e);
              color: white;
              text-decoration: none;
              border-radius: 12px;
              font-weight: 700;
              font-size: 15px;
              transition: all 0.3s ease;
              border: 2px solid rgba(255, 255, 255, 0.2);
              cursor: pointer;
              box-shadow: 
                0 4px 15px rgba(255, 107, 53, 0.4),
                0 2px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
            .btn-programacao:hover{
              background: linear-gradient(135deg, #ff5722, #ff9800);
              transform: translateY(-3px);
              box-shadow: 
                0 8px 25px rgba(255, 107, 53, 0.6),
                0 4px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
              border-color: rgba(255, 255, 255, 0.4);
            }

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
            <p className="oc-hero-sub">Vozes que conduzem conteúdo de alto impacto</p>
            <a href="/hotsite/agenda" className="btn-programacao">
              Ver programação completa
            </a>
          </header>

          <div className="grid-3">
            {speakers.map((speaker) => {
              const isExpanded = expandedBios.has(speaker.id);
              const bioId = `speaker-bio-${speaker.id}`;
              const buttonId = `speaker-btn-${speaker.id}`;
              
              return (
                <article 
                  key={speaker.id} 
                  id={`speaker-card-${speaker.id}`}
                  className="speaker-card"
                >
                  <div 
                    className="speaker-photo"
                    style={{
                      '--focus-x': speakerFocusMap[speaker.id]?.x || '50%',
                      '--focus-y': speakerFocusMap[speaker.id]?.y || '50%'
                    } as React.CSSProperties}
                  >
                    <img 
                      src={speaker.photo} 
                      alt={`Foto de ${speaker.name}`} 
                      loading="lazy"
                      className={speakerFocusMap[speaker.id]?.useCover ? 'is-cover' : ''}
                    />
              </div>
              <div className="sph-body">
                    <h3 className="speaker-name">{speaker.name}</h3>
                    <p className="speaker-role">{speaker.role}</p>
                    
                    {!isExpanded ? (
                      <ul className="speaker-mini-bio" aria-label="Informações resumidas">
                        {speaker.miniBio.map((bullet, idx) => (
                          <li key={idx} className="mini-bio-bullet">{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      <div 
                        id={bioId}
                        className="speaker-bio-expanded"
                        aria-label="Biografia completa"
                      >
                        {speaker.bio.split('\n').map((paragraph, idx) => 
                          paragraph.trim() ? (
                            <p key={idx} style={{ marginBottom: '12px', whiteSpace: 'pre-line' }}>
                              {paragraph}
                            </p>
                          ) : null
                        )}
              </div>
                    )}
                    
                    <button 
                      id={buttonId}
                      className="bio-toggle-btn"
                      onClick={(e) => toggleBio(speaker.id, speaker, e)}
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? bioId : undefined}
                      aria-label={isExpanded ? `Fechar biografia de ${speaker.name}` : `Ver biografia completa de ${speaker.name}`}
                      type="button"
                    >
                      {isExpanded ? 'Ver menos' : 'Ver mais'}
                    </button>
                    
                    {speaker.externalLink && (
                      <a 
                        href={speaker.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="speaker-profile-link"
                        aria-label={`Ver perfil externo de ${speaker.name}`}
                      >
                        Ver perfil
                      </a>
                    )}
              </div>
            </article>
              );
            })}
              </div>
              </div>
      </section>

      {/* Modal de biografia completa - Desktop */}
      {selectedSpeaker && (
        <div className="speaker-modal-overlay" onClick={closeModal}>
          <motion.div 
            className="speaker-modal"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="speaker-modal-title"
          >
            <button 
              className="speaker-modal-close"
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              ×
            </button>
            <div className="speaker-modal-header">
              <div className="speaker-modal-photo">
                <img src={selectedSpeaker.photo} alt={selectedSpeaker.name} />
              </div>
              <div className="speaker-modal-info">
                <h3 id="speaker-modal-title" className="speaker-modal-name" tabIndex={-1}>{selectedSpeaker.name}</h3>
                <p className="speaker-modal-role">{selectedSpeaker.role}</p>
              </div>
          </div>
            <div className="speaker-modal-body">
              <div className="speaker-modal-bio">
                {selectedSpeaker.bio.split('\n\n').map((paragraph, idx) => 
                  paragraph.trim() ? (
                    <p key={idx}>{paragraph.trim()}</p>
                  ) : null
                )}
        </div>
            </div>
          </motion.div>
        </div>
      )}

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
              <span className="guest-name">Raulison Resende (Instituto Hosp. Albert Einstein)</span>
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
                reunindo Tecnologia, Inovação e Negócios para o desenvolvimento profissional, empresarial e do DF
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
