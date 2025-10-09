import React, { useState, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';

interface Atividade {
  id: number;
  horario: string;
  atividade: string;
  tipo: string;
  icone: string;
  palestrante?: string;
}

interface Evento {
  id: string;
  titulo: string;
  periodo: string;
  dia: number;
  cor: string;
  atividades: Atividade[];
}

interface Workshop {
  id: number;
  nome: string;
  responsavel: string;
  datasHorarios: string;
  dias: string[];
  horario: string;
}

interface WorkshopsData {
  titulo: string;
  subtitulo: string;
  cor: string;
  items: Workshop[];
}

interface AgendaData {
  eventos: Evento[];
  workshops: WorkshopsData;
}

const AgendaCompleta: React.FC = () => {
  const [agendaData, setAgendaData] = useState<AgendaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [atividadesVisiveis, setAtividadesVisiveis] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const ITEMS_PER_VIEW = 5;

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch('/agenda.json');
        const data = await response.json();
        setAgendaData(data);
      } catch (error) {
        console.error('Erro ao carregar agenda:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  const toggleExpand = useCallback((eventoId: string) => {
    const isCurrentlyExpanded = expandedSections[eventoId];
    
    setExpandedSections(prev => ({
      ...prev,
      [eventoId]: !prev[eventoId]
    }));

    // Scroll suave apenas para "Ver Menos"
    if (isCurrentlyExpanded) {
      setTimeout(() => {
        // "Ver Menos" - scroll para o topo da seção de atividades
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
          timelineContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 200); // Delay maior para permitir renderização completa
    }
  }, [expandedSections]);

  // Reset do estado quando mudar de dia
  useEffect(() => {
    setAtividadesVisiveis(ITEMS_PER_VIEW);
    setIsExpanded(false);
  }, [activeDay]);

  // Função para alternar entre mostrar mais/menos atividades
  const toggleShowMore = useCallback(() => {
    if (isExpanded) {
      // Mostrar menos - voltar aos primeiros 5 itens
      setAtividadesVisiveis(ITEMS_PER_VIEW);
      setIsExpanded(false);
      setIsLoadingMore(false);
      
      // Scroll suave para o topo da timeline
      setTimeout(() => {
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
          timelineContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 300);
    } else {
      // Mostrar mais - animar a revelação dos itens adicionais
      setIsExpanded(true);
      setIsLoadingMore(true);
      
      // Animar a revelação dos itens adicionais com delay escalonado
      const totalItems = agendaData ? agendaData.eventos.filter(e => e.dia === activeDay).flatMap(evento => evento.atividades).length : 0;
      const itemsToShow = totalItems;
      
      // Revelar itens gradualmente
      for (let i = ITEMS_PER_VIEW; i < itemsToShow; i++) {
        setTimeout(() => {
          setAtividadesVisiveis(prev => Math.min(prev + 1, itemsToShow));
          
          // Parar o loading quando todos os itens foram revelados
          if (i === itemsToShow - 1) {
            setTimeout(() => {
              setIsLoadingMore(false);
            }, 200);
          }
        }, (i - ITEMS_PER_VIEW) * 150); // 150ms de delay entre cada item
      }
    }
  }, [isExpanded, activeDay, agendaData, ITEMS_PER_VIEW]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando agenda...</div>
      </div>
    );
  }

  if (!agendaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Erro ao carregar agenda</div>
      </div>
    );
  }

  // Filtrar eventos por dia selecionado e combinar todas as atividades
  const eventosDoDia = agendaData.eventos.filter(e => e.dia === activeDay);
  const todasAtividadesDoDia = eventosDoDia.flatMap(evento => evento.atividades);

  return (
    <div className="agenda-timeline-section min-h-screen">
      <style>{`
        /* ===== CONTAINER PRINCIPAL - COM MARGENS LATERAIS ===== */
        .agenda-timeline-section {
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
          max-width: 1200px; /* REDUZIDO de 1400px */
          width: 85%; /* REDUZIDO de 90% - mais espaço lateral */
          margin: 0 auto;
          padding: 0 40px; /* AUMENTADO de 32px */
          position: relative;
          z-index: 1;
        }

        /* Header Limpo - SEM RETÂNGULO */
        .section-header-clean {
          text-align: center;
          margin-bottom: 50px; /* Reduzido de 80px */
          padding: 20px 32px 30px; /* Padding topo reduzido */
          position: relative;
          background: transparent; /* SEM fundo */
          overflow: visible; /* Garantir que nada seja cortado */
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
          margin-bottom: 20px; /* Mais compacto */
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

        /* Título Principal - SEM CORTE */
        .main-title-clean {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.3; /* Aumentado para evitar corte */
          margin-bottom: 24px; /* Mais compacto */
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          position: relative;
          overflow: visible; /* CRÍTICO */
          padding: 0 0 8px 0; /* Padding inferior para cedilha */
        }

        .title-word {
          display: inline-block;
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          line-height: inherit; /* Herdar line-height do pai */
          overflow: visible; /* Permitir cedilha */
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
          
          /* Garantir que cedilha não seja cortada */
          display: inline-block;
          padding-bottom: 0.1em; /* Usa unidade relativa */
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

        /* Badges dos Eventos em Linha */
        .event-badges-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px; /* Mais compacto */
          flex-wrap: wrap;
        }

        .event-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          backdrop-filter: blur(10px);
          border: 2px solid;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .event-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }

        .event-badge:hover::before {
          left: 100%;
        }

        .event-badge.open-connections {
          background: rgba(0, 188, 212, 0.15);
          border-color: #00e5ff;
          color: #00e5ff;
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
        }

        .event-badge.incoday {
          background: rgba(236, 72, 153, 0.15);
          border-color: #ec4899;
          color: #ec4899;
          box-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
        }

        .event-badge:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 10px currentColor;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        .badge-text {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        /* Divider Plus */
        .plus-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .plus-divider svg {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Descrição Limpa */
        .event-description-clean {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.6s;
          margin-bottom: 0; /* Sem margem extra embaixo */
        }

        /* Linhas Decorativas */
        .decorative-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: -1;
        }

        .line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 229, 255, 0.5) 50%, 
            transparent 100%
          );
          opacity: 0.3;
        }

        .line-1 {
          top: 20%;
          left: 0;
          width: 40%;
          animation: lineSlide1 4s ease-in-out infinite;
        }

        .line-2 {
          top: 80%;
          right: 0;
          width: 35%;
          animation: lineSlide2 5s ease-in-out infinite 1s;
        }

        @keyframes lineSlide1 {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.3;
          }
        }

        @keyframes lineSlide2 {
          0%, 100% {
            transform: translateX(100%);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.3;
          }
        }

        /* Tabs de Dias */
        .days-tabs {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .day-tab {
          flex: 1;
          max-width: 280px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .day-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-4px);
        }

        .day-tab.active {
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 229, 255, 0.15));
          border-color: #00e5ff;
        }

        .day-number {
          font-size: 24px;
          font-weight: 700;
          color: white;
        }

        .day-date {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
        }


        /* ===== TIMELINE CONTAINER - MAIS ESPAÇO ===== */
        .timeline-container {
          position: relative;
          padding: 40px 0 0 0 !important; /* Remove padding inferior completamente */
          margin: 0 20px; /* ADICIONAR margem lateral */
          gap: 12px !important; /* Reduz espaço entre itens */
          padding-bottom: 0 !important; /* Remove padding inferior do container */
        }

        /* Linha da Timeline */
        .timeline-line {
          position: absolute;
          left: 40px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, 
            transparent 0%,
            var(--timeline-color) 10%,
            var(--timeline-color) 90%,
            transparent 100%
          );
          box-shadow: 0 0 10px var(--timeline-color);
        }

        /* Items da Timeline */
        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 12px; /* Reduzido para 12px conforme solicitado */
          margin-bottom: 0; /* Remove margem inferior */
        }

        /* Item Individual */
        .timeline-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 24px;
          opacity: 0;
          animation: slideIn 0.6s ease forwards;
          animation-delay: var(--item-delay);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Dot da Timeline */
        .timeline-dot {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 8px;
        }

        .dot-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 229, 255, 0.1));
          border: 3px solid var(--item-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 
            0 0 20px var(--item-color),
            0 4px 16px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .timeline-item:hover .dot-icon {
          transform: scale(1.15);
          box-shadow: 
            0 0 30px var(--item-color),
            0 6px 24px rgba(0, 0, 0, 0.4);
        }

        /* ===== CARDS DA AGENDA - SEM PROBLEMA DE RENDERIZAÇÃO ===== */
        .activity-card {
          background: rgba(255, 255, 255, 0.08);
          /* REMOVER backdrop-filter que causa problema cinza */
          /* backdrop-filter: blur(20px); - COMENTADO */
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.15),
            0 8px 32px rgba(0, 0, 0, 0.1);
          
          /* FIX DE RENDERIZAÇÃO */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }

        .timeline-item:hover .activity-card {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--item-color);
          transform: translateX(8px) translateZ(0); /* Manter translateZ */
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            0 16px 48px rgba(0, 0, 0, 0.15),
            0 0 40px rgba(var(--item-color-rgb), 0.2);
        }

        /* Header do Card */
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .activity-time {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--item-color);
        }

        .clock-icon {
          color: var(--item-color);
        }

        .activity-type-badge {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Body do Card */
        .activity-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .activity-title {
          font-size: 17px;
          font-weight: 600;
          color: white;
          line-height: 1.5;
          margin: 0;
        }

        .activity-speaker {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
          margin: 0;
        }

        .activity-speaker svg {
          opacity: 0.6;
        }

        /* Itens de Intervalo - Estilo Diferenciado */
        .timeline-item.intervalo {
          opacity: 0.7;
        }

        .timeline-item.intervalo .activity-card {
          background: rgba(255, 255, 255, 0.04);
          border-style: dashed;
        }

        /* Botão Mostrar Mais/Menos - Responsivo */
        .btn-show-more {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;                    /* espaço entre ícone e texto */
          flex-direction: row;          /* garante ícone → texto */
          
          /* Largura */
          width: auto;                    /* Desktop: largura automática */
          max-width: 400px;               /* Largura máxima controlada */
          min-width: 280px;               /* Mínimo para não ficar muito estreito */
          
          /* Espaçamento e aparência */
          margin: 8px auto 40px !important;  /* Centraliza horizontalmente */
          padding: 16px 32px;
          
          background: linear-gradient(135deg, var(--btn-color, #00bcd4) 0%, var(--btn-color, #00bcd4) 100%);
          color: white;
          border: none;
          border-radius: 12px;
          
          font-size: 16px;
          font-weight: 700;
          
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          box-shadow: 0 8px 24px rgba(0, 188, 212, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-show-more::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-show-more:active::before {
          left: 100%;
        }

        /* Hover e estados */
        .btn-show-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 188, 212, 0.4);
        }

        .btn-show-more:active {
          transform: translateY(0);
        }

        /* Ícone SVG dentro do botão */
        .btn-show-more svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;              /* impede o ícone de encolher */
          transition: transform 0.3s ease;
        }

        /* Rotaciona o ícone quando expandido */
        .btn-show-more[data-expanded="true"] svg {
          transform: rotate(180deg);
        }

        /* Animação shimmer para placeholder */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .timeline-placeholder {
          border-radius: 8px;
          overflow: hidden;
        }

        /* Otimizações de performance para timeline */
        .timeline-items {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: height, opacity;
        }

        .timeline-item {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: transform, opacity;
        }

        .btn-show-more:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.25),
            0 0 30px var(--btn-color);
        }

        /* CTA de Workshops */
        .workshops-cta {
          margin-top: 80px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08));
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 2px solid rgba(16, 185, 129, 0.3);
          padding: 40px;
          text-align: center;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(16, 185, 129, 0.1);
        }

        .cta-content h3 {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .cta-content p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .btn-workshops {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        }

        .btn-workshops:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(16, 185, 129, 0.4);
        }

        /* ===== SEÇÃO WORKSHOPS - DIVULGAÇÃO ÚNICA ===== */

        /* Seção com destaque amarelo/laranja (contrasta com o restante da agenda) */
        .wk-hero{
          position: relative;
          padding: 48px 0 56px;
          background:
            radial-gradient(120% 80% at 100% 0%, rgba(255,174,70,.22) 0%, rgba(255,174,70,0) 60%),
            linear-gradient(180deg, rgba(9,41,45,.75), rgba(9,41,45,.70));
          border-top: 2px solid rgba(255,198,93,.25);
          border-bottom: 1px solid rgba(255,198,93,.15);
          isolation: isolate; z-index: 1;
        }
        .wk-container{
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* 1) Respiro entre grupos */
        .wk-head{ text-align:center; margin-bottom: 18px; }
        .wk-title{
          margin:0 0 6px; color:#fff; font-weight:900;
          font-size: clamp(22px,3vw,32px);
          text-shadow: 0 2px 10px rgba(0,0,0,.25);
        }
        .wk-sub{ color: rgba(255,255,255,.92); }

        .wk-dates{
          margin: 12px auto 16px;
          width: fit-content;
          padding: 8px 14px;
          color:#0b1b2b; font-weight: 900;
          background: linear-gradient(135deg,#ffd27a,#ff9f4a);
          border-radius: 999px;
          box-shadow: 0 10px 24px rgba(255,182,72,.25);
        }

        .wk-tags{
          display:flex; flex-wrap:wrap; gap:12px;
          justify-content: center;
          margin: 10px 0 22px; padding:0; list-style:none;
        }
        .wk-tag{
          padding: 8px 12px; border-radius: 999px;
          color:#fff; font-weight:900; letter-spacing:.02em;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.24);
          backdrop-filter: blur(8px);
        }
        @media (max-width: 420px){
          .wk-tags{ gap: 10px 8px; justify-content: flex-start; }
        }

        /* 2) Features com alturas alinhadas e equilíbrio de texto */
        .wk-features{
          display:grid; gap:16px;
          grid-template-columns: repeat(3, minmax(0,1fr));
          margin-top: 6px;
          align-items: stretch;
        }
        @media (max-width: 880px){ .wk-features{ grid-template-columns: 1fr; } }

        .wk-feature{
          display:flex; gap:12px; align-items:flex-start;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 16px; padding: 14px 16px;
          backdrop-filter: blur(10px);
          transition: transform .2s, border-color .2s, box-shadow .2s, background .2s;
          height: 100%;
        }
        .wk-feature:hover{
          transform: translateY(-2px);
          border-color: rgba(255,182,72,.8);
          box-shadow: 0 12px 26px rgba(255,182,72,.22);
          background: rgba(255,255,255,.12);
        }
        .wk-ico{
          width:42px; height:42px; border-radius:50%;
          display:grid; place-items:center; color:#0b1b2b;
          background: radial-gradient(circle at 30% 30%, #ffd27a, #ff9f4a);
          box-shadow: 0 4px 12px rgba(255,182,72,.35);
        }
        /* 6) Ícones verdadeiramente decorativos */
        .wk-ico svg{ pointer-events: none; }
        /* 7) Microtipografia */
        .wk-fb h3{ color:#fff; margin:0 0 4px; font-weight:900; font-size: 15px; line-height: 1.25; }
        .wk-fb p{ color: rgba(255,255,255,.92); margin:0; font-size: 14px; line-height: 1.55; }

        .wk-cta{ display:flex; flex-direction:column; align-items:center; gap:10px; margin-top: 18px; }
        /* 4) CTA com foco/hover/active e acessibilidade */
        .wk-btn{
          display:inline-flex; align-items:center; justify-content:center;
          padding: 12px 22px; border-radius: 12px; font-weight: 900;
          color:#0b1b2b; background: linear-gradient(135deg,#ffd27a,#ff9f4a);
          box-shadow: 0 12px 28px rgba(255,182,72,.30);
          border: none; cursor: pointer; text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
          outline: none; position: relative;
        }
        .wk-btn:hover{ transform: translateY(-2px); box-shadow: 0 16px 32px rgba(255,182,72,.35); }
        .wk-btn:focus-visible{
          box-shadow: 0 0 0 3px rgba(11,27,43,.9), 0 0 0 6px rgba(255,182,72,.6);
        }
        .wk-btn:active{ transform: translateY(0); }
        .wk-note{ color: rgba(255,255,255,.9); font-size: 14px; text-align:center; }

        /* 8) Layout mobile */
        @media (max-width: 880px){
          .wk-hero{ padding: 40px 0 48px; }
          .wk-container{ padding: 0 20px; }
          .wk-dates{ transform: scale(.96); }
        }



        .icon-circle {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid rgba(16, 185, 129, 0.4);
          box-shadow: 
            0 0 40px rgba(16, 185, 129, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.2);
          animation: pulse 3s ease-in-out infinite;
        }

        .icon-emoji {
          font-size: 48px;
        }

        .workshops-title-full {
          font-size: 48px;
          font-weight: 900;
          line-height: 1.3;
          margin-bottom: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .title-part.green {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-part.white {
          color: white;
        }

        .workshops-subtitle-full {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 12px;
        }

        .alteracoes-badge {
          display: inline-block;
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        /* Grid com Espaço Lateral */
        .workshops-grid-full {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 60px;
          padding: 0 10px; /* ADICIONAR padding lateral */
        }

        /* ===== WORKSHOP CARDS - SEM PROBLEMA DE RENDERIZAÇÃO ===== */
        .workshop-card-full {
          background: rgba(255, 255, 255, 0.08);
          /* REMOVER backdrop-filter problemático */
          /* backdrop-filter: blur(20px); - COMENTADO */
          border-radius: 20px;
          border: 2px solid rgba(16, 185, 129, 0.2);
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: slideUp 0.6s ease forwards;
          animation-delay: var(--animation-delay);
          min-height: 280px;
          max-height: 350px;
          
          /* FIX DE RENDERIZAÇÃO */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, opacity;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        .workshop-card-full::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #10b981, #059669);
          transform: scaleY(0);
          transition: transform 0.4s ease;
        }

        .workshop-card-full:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(16, 185, 129, 0.5);
          transform: translateY(-6px) translateZ(0); /* Manter translateZ */
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.3),
            0 0 50px rgba(16, 185, 129, 0.25);
        }

        .workshop-card-full:hover::before {
          transform: scaleY(1);
        }

        /* Header do Card: Número + Título */
        .workshop-card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        /* Número do Workshop - Compacto */
        .workshop-number-large {
          width: 70px; /* Reduzido */
          height: 70px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.15));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px; /* Tamanho moderado */
          font-weight: 900;
          color: #10b981;
          border: 2px solid rgba(16, 185, 129, 0.4);
          flex-shrink: 0;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2);
          transition: all 0.3s ease;
        }

        .workshop-card-full:hover .workshop-number-large {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        /* Conteúdo do Card */
        .workshop-content-full {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          min-width: 0; /* Importante para quebra de linha */
        }

        .workshop-title-full {
          font-size: 18px; /* Tamanho otimizado */
          font-weight: 700;
          color: white;
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Limita a 3 linhas */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Detalhes (Responsável e Horário) */
        .workshop-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .detail-icon {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .detail-text {
          font-size: 14px; /* Tamanho compacto */
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Limita a 2 linhas */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Botão Inscreva-se - Footer do Card */
        .btn-inscreva-se {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 
            0 6px 20px rgba(16, 185, 129, 0.4),
            0 0 25px rgba(16, 185, 129, 0.2);
          position: relative;
          overflow: hidden;
          margin-top: auto; /* Empurra para o final do card */
        }

        .btn-inscreva-se::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn-inscreva-se:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 10px 28px rgba(16, 185, 129, 0.5),
            0 0 40px rgba(16, 185, 129, 0.3);
        }

        .btn-inscreva-se:hover::before {
          left: 100%;
        }

        /* ===== CTA FOOTER - MARGENS LATERAIS ===== */
        .workshops-cta-large {
          text-align: center;
          padding: 50px 40px;
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 0.2), 
            rgba(16, 185, 129, 0.1)
          );
          /* backdrop-filter: blur(15px); - REMOVER se causar problema */
          border-radius: 28px;
          border: 2px solid rgba(16, 185, 129, 0.3);
          position: relative;
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.25),
            inset 0 0 60px rgba(16, 185, 129, 0.05);
          margin: 0 10px; /* ADICIONAR margem lateral */
          
          /* FIX DE RENDERIZAÇÃO */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
        }

        .cta-text-large {
          font-size: 22px;
          color: white;
          margin-bottom: 28px;
          font-weight: 600;
          line-height: 1.4;
        }

        .btn-inscricao-geral {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 44px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 18px;
          font-weight: 800;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 
            0 10px 28px rgba(16, 185, 129, 0.5),
            0 0 50px rgba(16, 185, 129, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-inscricao-geral:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 14px 36px rgba(16, 185, 129, 0.6),
            0 0 70px rgba(16, 185, 129, 0.4);
        }

        /* ===== FIX GLOBAL PARA RENDERIZAÇÃO ===== */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Evitar flicker no Chrome/Safari */
        .timeline-item,
        .workshop-card-full,
        .activity-card {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        /* ===== ANIMAÇÕES PARA PRÉ-RENDERIZAÇÃO ===== */
        .timeline-item-reveal {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        /* Remove margem/padding excessivo do container que envolve os itens + botão */
        .agenda-list,
        .timeline-container,
        .activities-wrapper {
          gap: 12px !important;           /* reduz espaço entre itens */
          padding-bottom: 0 !important;   /* remove padding inferior do container */
        }

        /* Adiciona espaço abaixo do botão "Mostrar Mais" */
        .mostrar-mais-btn,
        .btn-show-more {
          margin-top: 8px !important;    /* ALTERADO de 16px para 8px */
          margin-bottom: 40px !important;  /* Cria respiro antes da próxima seção */
        }

        /* Remove margem do último item visível (antes dos hidden) */
        .timeline-items > div[style*="visibility: visible"]:last-of-type {
          margin-bottom: 0 !important;
        }

        /* Ou force o último antes de hidden */
        .timeline-items > div:has(+ div[style*="visibility: hidden"]) {
          margin-bottom: 0 !important;
        }

        /* Remove margem inferior do último item se houver */
        .agenda-item:last-of-type,
        .timeline-item:last-child {
          margin-bottom: 0 !important;
        }

        /* Garante espaçamento superior da seção de workshops */
        .workshops-section,
        section:has(h2:contains("Minicursos")),
        .minicursos-section,
        #workshops {
          margin-top: 60px !important;
          padding-top: 40px !important;
        }

        /* PATCH RÁPIDO - Remove espaço excessivo acima do botão */
        .btn-show-more,
        .mostrar-mais-btn {
          margin-top: 8px !important;  /* Reduzido de 16px */
        }

        /* Remove margem do último item visível da timeline */
        .timeline-items > div:last-child {
          margin-bottom: 0 !important;
        }

        /* Procure por wrappers intermediários com espaçamento fixo */
        .btn-wrapper,
        .actions-container {
          padding-top: 0 !important;
          margin-top: 0 !important;
          min-height: 0 !important;
        }

        .timeline-item-reveal.hidden {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          height: 0;
          margin-bottom: 0;
          overflow: hidden;
        }

        .timeline-item-reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          height: auto;
          margin-bottom: 32px;
        }

        /* Efeito shimmer para itens sendo carregados */
        .timeline-item-loading {
          position: relative;
          overflow: hidden;
        }

        .timeline-item-loading::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 188, 212, 0.1), 
            transparent
          );
          animation: shimmer 1.5s infinite;
          z-index: 1;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Animação de entrada escalonada */
        .timeline-item-stagger {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVIDADE ATUALIZADA ===== */

        /* Desktop Grande (1920px+) */
        @media (min-width: 1920px) {
          .container {
            max-width: 1300px;
            width: 80%;
          }
          
          .workshops-container-wide {
            max-width: 1600px;
            width: 80%;
            padding: 0 60px;
          }
        }

        /* Desktop Médio (1440px - 1919px) */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .container {
            width: 82%;
          }
          
          .workshops-container-wide {
            width: 82%;
            padding: 0 50px;
          }
        }

        /* Laptop (1024px - 1439px) */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .container {
            width: 85%;
            padding: 0 32px;
          }
          
          .workshops-container-wide {
            width: 85%;
            padding: 0 32px;
          }
          
          .timeline-container {
            margin: 0 15px;
          }
          
          .workshops-grid-full {
            gap: 24px;
            padding: 0 8px;
          }
          
          .workshop-card-full {
            padding: 24px 28px;
            min-height: 260px;
          }
          
          .workshop-title-full {
            font-size: 17px;
          }
          
          .detail-text {
            font-size: 13px;
          }
        }

        /* Tablet (768px - 1023px) */
        @media (max-width: 1023px) {
          .container {
            width: 88%;
            padding: 0 24px;
          }
          
          .workshops-container-wide {
            width: 88%;
            padding: 0 24px;
          }
          
          .timeline-container {
            margin: 0 10px;
          }
          
          .workshops-grid-full {
            grid-template-columns: 1fr; /* 1 COLUNA */
            gap: 24px;
            padding: 0 5px;
          }
          
          .workshop-card-full {
            padding: 24px 28px;
            min-height: auto;
            max-height: none;
          }
          
          .workshop-number-large {
            width: 65px;
            height: 65px;
            font-size: 28px;
          }
          
          .workshop-title-full {
            font-size: 17px;
            -webkit-line-clamp: 4; /* Permite mais linhas no tablet */
          }
          
          .btn-inscreva-se {
            padding: 13px 22px;
            font-size: 14px;
          }
        }

        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .container {
            width: 90%;
            padding: 0 20px;
          }
          
          .workshops-container-wide {
            width: 90%;
            padding: 0 20px;
          }
          
          .timeline-container {
            margin: 0 5px;
          }
          
          .workshops-section-fullwidth {
            padding: 60px 0 80px;
          }
          
          .workshops-title-full {
            font-size: 32px;
          }
          
          .workshops-grid-full {
            gap: 20px;
            padding: 0;
          }
          
          .workshop-card-full {
            padding: 20px 24px;
          }
          
          .workshop-card-header {
            gap: 16px;
          }
          
          .workshop-number-large {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
          
          .workshop-title-full {
            font-size: 16px;
            -webkit-line-clamp: 5; /* Mais flexível no mobile */
          }
          
          .detail-text {
            font-size: 13px;
          }
          
          .btn-inscreva-se {
            padding: 12px 20px;
            font-size: 14px;
          }
          
          .workshops-cta-large {
            margin: 0 5px;
            padding: 40px 24px;
          }
          
          .cta-text-large {
            font-size: 19px;
          }
          
          .btn-inscricao-geral {
            padding: 16px 36px;
            font-size: 16px;
          }
        }

        /* Mobile Pequeno (< 480px) */
        @media (max-width: 479px) {
          .container {
            width: 92%;
            padding: 0 15px;
          }
          
          .workshops-container-wide {
            width: 92%;
            padding: 0 15px;
          }
          
          .workshop-title-full {
            font-size: 15px;
          }
          
          .detail-text {
            font-size: 12px;
          }
        }

        /* ===== MELHORIAS DE RESPONSIVIDADE PARA MOBILE ===== */
        
        /* Mobile - Título Principal */
        @media (max-width: 768px) {
          .main-title-clean {
            font-size: 36px;
            line-height: 1.2;
            margin-bottom: 16px;
          }
          
          .title-word {
            display: block;
            margin-bottom: 4px;
          }
          
          .section-header-clean {
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
        }

        /* Mobile - Tabs de Dias */
        @media (max-width: 768px) {
          .days-tabs {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .day-tab {
            max-width: none;
            padding: 16px 24px;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .day-number {
            font-size: 20px;
          }
          
          .day-date {
            font-size: 13px;
          }
        }


        /* Mobile - Timeline */
        @media (max-width: 768px) {
          .timeline-container {
            margin: 0;
            padding: 20px 0;
          }
          
          .timeline-line {
            left: 20px;
            width: 2px;
          }
          
          .timeline-item {
            grid-template-columns: 50px 1fr;
            gap: 16px;
          }
          
          .dot-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .activity-card {
            padding: 16px;
            border-radius: 16px;
          }
          
          .activity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 12px;
            padding-bottom: 8px;
          }
          
          .activity-time {
            font-size: 14px;
          }
          
          .activity-type-badge {
            font-size: 11px;
            padding: 3px 8px;
          }
          
          .activity-title {
            font-size: 15px;
            line-height: 1.4;
          }
          
          .activity-speaker {
            font-size: 13px;
          }
        }

        /* Mobile - Event Badges */
        @media (max-width: 768px) {
          .event-badges-row {
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
          
          .event-badge {
            padding: 8px 20px;
            font-size: 13px;
          }
          
          .plus-divider {
            width: 32px;
            height: 32px;
          }
        }

        /* Mobile - Workshops Section */
        @media (max-width: 768px) {
          .wk-hero {
            padding: 32px 0 40px;
          }
          
          .wk-container {
            padding: 0 16px;
          }
          
          .wk-title {
            font-size: 24px;
            margin-bottom: 8px;
          }
          
          .wk-sub {
            font-size: 14px;
            line-height: 1.5;
          }
          
          .wk-dates {
            font-size: 13px;
            padding: 6px 12px;
            margin: 8px auto 12px;
          }
          
          .wk-features {
            gap: 12px;
            margin-top: 20px;
          }
          
          .wk-feature {
            padding: 12px 14px;
            gap: 10px;
          }
          
          .wk-ico {
            width: 36px;
            height: 36px;
          }
          
          .wk-fb h3 {
            font-size: 14px;
            margin-bottom: 3px;
          }
          
          .wk-fb p {
            font-size: 13px;
            line-height: 1.4;
          }
          
          .wk-btn {
            padding: 12px 20px;
            font-size: 14px;
          }
          
          .wk-note {
            font-size: 12px;
            margin-top: 8px;
          }
        }

        /* Mobile: ocupa mais largura */
        @media (max-width: 640px) {
          .btn-show-more {
            width: calc(100% - 32px);     /* Largura quase completa em mobile */
            max-width: none;
            min-width: 0;
            margin: 8px 16px 40px !important;
            padding: 14px 24px;
            font-size: 15px;
          }
        }

        /* Mobile - Botões e CTAs */
        @media (max-width: 768px) {
          .btn-show-more {
            padding: 14px 24px;
            font-size: 14px;
            margin: 8px auto 40px !important; /* ALTERADO de 16px para 8px */
          }
          
          .btn-inscreva-se {
            padding: 12px 18px;
            font-size: 13px;
          }
          
          .workshops-cta-large {
            margin: 0;
            padding: 32px 20px;
          }
          
          .cta-text-large {
            font-size: 16px;
            margin-bottom: 20px;
          }
          
          .btn-inscricao-geral {
            padding: 14px 28px;
            font-size: 14px;
          }
        }

        /* Mobile - Melhorias de Espaçamento */
        @media (max-width: 768px) {
          .agenda-timeline-section {
            padding: 20px 0 80px;
          }
          
          .container {
            width: 95%;
            padding: 0 16px;
          }
        }

        /* Tablet */
        @media (max-width: 1024px) and (min-width: 769px) {
          .main-title-clean {
            font-size: 52px;
            line-height: 1.3;
          }
          
          .section-header-clean {
            padding: 20px 32px 28px;
          }
        }
      `}</style>
      
      {/* Navigation Sidebar */}
      <NavigationSidebar />
      
      <div className="container">
        {/* Header Limpo - SEM RETÂNGULO */}
        <div className="section-header-clean">
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
            <span className="title-word gradient">Programação</span>
            <span className="title-word white">do Evento</span>
          </h1>

          {/* Badges dos Eventos */}
          <div className="event-badges-row">
            <div className="event-badge open-connections">
              <span className="badge-dot"></span>
              <span className="badge-text">OPEN CONNECTIONS</span>
            </div>
            
            <div className="plus-divider">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="event-badge incoday">
              <span className="badge-dot"></span>
              <span className="badge-text">INCODAY 2025</span>
            </div>
          </div>

          {/* Descrição */}
          <p className="event-description-clean">
            Dois dias completos de inovação, networking e conhecimento com os especialistas renomados do mercado
          </p>

          {/* Decoração de linhas */}
          <div className="decorative-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>

        {/* Tabs de Dias */}
        <div className="days-tabs">
          <button
            className={`day-tab ${activeDay === 1 ? 'active' : ''}`}
            onClick={() => setActiveDay(1)}
          >
            <span className="day-number">Dia 1</span>
            <span className="day-date">11 de Novembro</span>
          </button>
          <button
            className={`day-tab ${activeDay === 2 ? 'active' : ''}`}
            onClick={() => setActiveDay(2)}
          >
            <span className="day-number">Dia 2</span>
            <span className="day-date">12 de Novembro</span>
          </button>
        </div>


        {/* Timeline de Atividades - Sequência Contínua */}
        <div className="timeline-container">
          <div className="timeline-line" style={{ '--timeline-color': '#00bcd4' } as React.CSSProperties}></div>
          
          <motion.div 
            className="timeline-items"
            initial={false}
            animate={{ 
              opacity: 1,
              height: "auto"
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
            style={{
              minHeight: "auto",
              overflow: "hidden",
              position: "relative",
              willChange: "height, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
          >
            {todasAtividadesDoDia.map((atividade, index) => {
              const isVisible = index < atividadesVisiveis;
              const isInitialLoad = index < ITEMS_PER_VIEW;
              const isLastVisible = isVisible && index === atividadesVisiveis - 1;
              
              return (
                <motion.div
                  key={atividade.id}
                  initial={isInitialLoad ? { opacity: 0, y: 20 } : { opacity: 0, y: 10, scale: 0.95 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  } : { 
                    opacity: 0, 
                    y: 10, 
                    scale: 0.95,
                    transition: {
                      duration: 0.3,
                      ease: "easeIn"
                    }
                  }}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    // Pré-renderizar mas controlar visibilidade
                    visibility: isVisible ? "visible" : "hidden",
                    height: isVisible ? "auto" : "0",
                    overflow: "hidden",
                    // Remove margem do último item visível
                    marginBottom: isLastVisible ? "0" : (isVisible ? "12px" : "0")  // ALTERADO de 32px para 12px
                  }}
                >
                  <TimelineItem 
                    atividade={atividade} 
                    cor="#00bcd4"
                    index={index}
                  />
                </motion.div>
              );
            })}

            {/* Botão Ver Mais/Menos - AGORA DENTRO do timeline-items */}
            {todasAtividadesDoDia.length > ITEMS_PER_VIEW && (
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <motion.button 
                  className="btn-show-more mostrar-mais-btn"
                  onClick={toggleShowMore}
                  disabled={isLoadingMore}
                  data-expanded={isExpanded}
                  style={{ 
                    '--btn-color': '#00bcd4',
                    '--btn-color-rgb': '0, 188, 212',
                    opacity: isLoadingMore ? 0.7 : 1,
                    cursor: isLoadingMore ? 'not-allowed' : 'pointer'
                  } as React.CSSProperties}
                  whileHover={!isLoadingMore ? { scale: 1.02 } : {}}
                  whileTap={!isLoadingMore ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.2 }}
                >
                {isLoadingMore ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: 20, height: 20 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                          <animate attributeName="stroke-dashoffset" values="31.416;0" dur="1s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    </motion.div>
                    Carregando...
                  </>
                ) : isExpanded ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 14l5-5 5 5z"/>
                    </svg>
                    Mostrar Menos
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                    </svg>
                    Mostrar Mais {todasAtividadesDoDia.length - ITEMS_PER_VIEW} Atividades
                  </>
                )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Seção de divulgação de Workshops e Minicursos */}
        <section id="workshops" className="wk-hero">
          <div className="wk-container">
            <header className="wk-head">
              <h2 className="wk-title">Minicursos e Workshops</h2>
              <p className="wk-sub">
                Programação paralela de capacitações especializadas com vagas limitadas (sujeito a alterações).
              </p>
            </header>

            {/* Faixa de datas/unidade de tempo genérica */}
            <div className="wk-dates" role="note" aria-label="Período estimado" title="Datas e horários sujeitos a alterações">
              11 e 12 de novembro
            </div>


            {/* Bloco de valor com ícones simples (SVG inline) */}
            <div className="wk-features">
              <div className="wk-feature">
                <span className="wk-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z" fill="currentColor"/></svg>
                </span>
                <div className="wk-fb">
                  <h3>Conteúdo de alto impacto</h3>
                  <p>Aprendizado prático com especialistas e foco em aplicação imediata.</p>
                </div>
              </div>
              <div className="wk-feature">
                <span className="wk-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/></svg>
                </span>
                <div className="wk-fb">
                  <h3>Escolha no formulário</h3>
                  <p>Seleção do workshop direto no formulário, sem precisar alterar o site.</p>
                </div>
              </div>
              <div className="wk-feature">
                <span className="wk-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9Zm-1-5 6-6-1.41-1.41L11 13.17l-2.59-2.58L7 12l4 4z" fill="currentColor"/></svg>
                </span>
                <div className="wk-fb">
                  <h3>Vagas limitadas</h3>
                  <p>Garanta participação com antecedência; confirmação por e-mail.</p>
                </div>
              </div>
            </div>

            {/* CTA único: link do Google Forms (configurável) */}
            <div className="wk-cta">
              <a
                className="wk-btn"
                href="https://forms.gle/LEX9CiPZhhYE2kUe9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir formulário de inscrição de workshops"
              >
                Inscreva-se nos Workshops
              </a>
              <p className="wk-note">Escolha seu workshop no formulário — confirmação por e‑mail</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Componente Timeline
function TimelineView({ evento, isExpanded, onToggle, maxItems }: {
  evento: Evento;
  isExpanded: boolean;
  onToggle: () => void;
  maxItems: number;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const visibleItems = useMemo(() => {
    return isExpanded 
      ? evento.atividades 
      : evento.atividades.slice(0, maxItems);
  }, [evento.atividades, isExpanded, maxItems]);
  
  const hasMore = useMemo(() => {
    return evento.atividades.length > maxItems;
  }, [evento.atividades.length, maxItems]);

  const handleToggle = () => {
    setIsTransitioning(true);
    onToggle();
    
    // Reset transition state após renderização completa
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // Aumentado para garantir renderização completa
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line" style={{ '--timeline-color': evento.cor } as React.CSSProperties}></div>
      
      <motion.div 
        className="timeline-items"
        initial={false}
        animate={{ 
          opacity: 1,
          height: "auto"
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
        style={{
          minHeight: isExpanded ? "auto" : "0px",
          overflow: "hidden",
          position: "relative",
          willChange: "height, opacity",
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden"
        }}
      >
        {/* Placeholder para evitar espaço vazio durante transição */}
        {isTransitioning && isExpanded && (
          <motion.div
            className="timeline-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "200px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              animation: "shimmer 1.5s infinite"
            }}
          />
        )}
        
        {visibleItems.map((atividade, index) => (
          <motion.div
            key={atividade.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.08,
              ease: "easeOut"
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)"
            }}
          >
            <MemoizedTimelineItem 
              atividade={atividade} 
              cor={evento.cor}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.button 
          id={`btn-show-more-${evento.id}`}
          className="btn-show-more"
          onClick={handleToggle}
          disabled={isTransitioning}
          style={{ 
            '--btn-color': evento.cor,
            opacity: isTransitioning ? 0.7 : 1,
            cursor: isTransitioning ? 'not-allowed' : 'pointer'
          } as React.CSSProperties}
          whileHover={!isTransitioning ? { scale: 1.02 } : {}}
          whileTap={!isTransitioning ? { scale: 0.98 } : {}}
          transition={{ duration: 0.2 }}
        >
          {isTransitioning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: 20, height: 20 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dashoffset" values="31.416;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </motion.div>
              Carregando...
            </>
          ) : isExpanded ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 14l5-5 5 5z"/>
              </svg>
              Mostrar Menos
            </>
          ) : (
            <>
              Mostrar Mais {evento.atividades.length - maxItems} Atividades
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}

// Item da Timeline
const TimelineItem = React.memo(function TimelineItem({ atividade, cor, index }: {
  atividade: Atividade;
  cor: string;
  index: number;
}) {
  const isIntervalo = atividade.tipo === 'intervalo';
  
  return (
    <div 
      className={`timeline-item ${isIntervalo ? 'intervalo' : ''}`}
      style={{ 
        '--item-color': cor,
        '--item-delay': `${index * 0.1}s`
      } as React.CSSProperties}
    >
      {/* Dot da Timeline */}
      <div className="timeline-dot">
        <span className="dot-icon">{atividade.icone}</span>
      </div>

      {/* Card da Atividade */}
      <div className="activity-card">
        <div className="activity-header">
          <div className="activity-time">
            <svg className="clock-icon" width="18" height="18" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2"/>
              <path d="M12 6v6l4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            {atividade.horario}
          </div>
          <div className="activity-type-badge">{getTypeName(atividade.tipo)}</div>
        </div>

        <div className="activity-body">
          <h3 className="activity-title">{atividade.atividade}</h3>
          {atividade.palestrante && (
            <p className="activity-speaker">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              {atividade.palestrante}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

const MemoizedTimelineItem = TimelineItem;

// Helper para nomes de tipos
function getTypeName(tipo: string): string {
  const tipos: Record<string, string> = {
    'credenciamento': 'Credenciamento',
    'cerimonia': 'Cerimônia',
    'palestra': 'Palestra',
    'painel': 'Painel',
    'pitch': 'Pitch',
    'intervalo': 'Intervalo',
    'networking': 'Networking'
  };
  return tipos[tipo] || tipo;
}

export default AgendaCompleta;