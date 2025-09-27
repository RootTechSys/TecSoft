import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ConnectionGatewayProps {
  variant?: 'full' | 'idle';
  reducedMotion?: boolean;
  accent?: string;
  parallax?: boolean;
  title?: string;
  badge?: string;
  onRevealStart?: () => void;
  onRevealEnd?: () => void;
}

const ConnectionGateway: React.FC<ConnectionGatewayProps> = ({
  variant = 'full',
  reducedMotion = false,
  accent = '#E7C8A1',
  parallax = true,
  title = 'OPEN CONNECTIONS',
  badge = 'INCODAY',
  onRevealStart,
  onRevealEnd
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  // Patch 1: Refs de performance/tempo (evitar re-render)
  const clockRef = useRef(0);
  const fpsLagRef = useRef(0);
  const revealedRef = useRef(false);
  const runningRef = useRef(variant === 'full');
  const degradedRef = useRef(false);
  const degradationTimeRef = useRef(0);
  
  // Patch 3: Parallax com spring real
  const targetParallax = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  
  // Estados mínimos (só quando necessário)
  const [isFocused, setIsFocused] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Math.random());

  // Patch 2: Canvas scale correto em resize (sem blur acumulado)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const ratio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(ratio, ratio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Patch 3: Parallax com spring real e clamp
  const spring = (v: number, target: number, k = 0.14, d = 0.86) => v + (target - v) * k * d;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || !parallax) return;
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        
        targetParallax.current = { 
          x: (newX - 0.5) * 12, 
          y: (newY - 0.5) * 12 
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion, parallax]);

  // Patch 1: Suavização do delta (evita "frames duros")
  const advanceClock = (deltaMs: number) => {
    const delta = Math.min(48, Math.max(8, deltaMs)); // clamp
    fpsLagRef.current = fpsLagRef.current * 0.9 + delta * 0.1;
    clockRef.current += delta / 1000;
  };

  // Focus handler for CTA interaction
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 480);
  }, []);

  useEffect(() => {
    const ctaButton = document.querySelector('a[href="#inscrever"]');
    if (ctaButton) {
      ctaButton.addEventListener('focus', handleFocus);
      return () => ctaButton.removeEventListener('focus', handleFocus);
    }
  }, [handleFocus]);

  // Easing functions
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  // Perlin-like noise for jitter
  const noise = (x: number, y: number, seed: number) => {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Patch 3: Parallax com spring real
    parallaxRef.current.x = spring(parallaxRef.current.x, reducedMotion ? 0 : targetParallax.current.x);
    parallaxRef.current.y = spring(parallaxRef.current.y, reducedMotion ? 0 : targetParallax.current.y);

    const currentTime = clockRef.current % 9.5; // v2: Timeline de 9.5s
    const isIdle = variant === 'idle' || !runningRef.current;

    // v2: Phase 1 - Pré-aquecimento (0.00-1.00s, overlap 35%)
    if (currentTime >= 0.0 && currentTime <= 1.0) {
      const phaseProgress = Math.min((currentTime - 0.0) / 1.0, 1);
      const easedProgress = easeOutCubic(phaseProgress);
      
      const scale = 0.90 + (easedProgress * 0.10); // v2: 0.90→1.00
      const blur = 10 * (1 - easedProgress); // v2: blur 10→0
      const opacity = easedProgress;

      ctx.save();
      ctx.globalAlpha = opacity * 0.4;
      ctx.filter = `blur(${blur}px)`;
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      ctx.scale(scale, scale);

      // v2: Rings base com aberração cromática sutil
      for (let i = 0; i < 3; i++) {
        const radius = 60 + i * 30; // v2: Tamanhos maiores
        const ringOpacity = opacity * (0.3 - i * 0.1);
        
        ctx.globalAlpha = ringOpacity;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i === 0 ? '#16B3A6' : i === 1 ? '#0E7C86' : '#0C2340';
        ctx.lineWidth = 2.5 - i * 0.5;
        ctx.stroke();
      }

      // v2: Partículas acordam (16-22 pontos)
      for (let i = 0; i < 20; i++) { // v2: Mais partículas
        const angle = (i * Math.PI * 2) / 20;
        const radius = 50 + i * 4;
        const particleOpacity = Math.min(phaseProgress * 0.18, 0.18);
        
        // v2: Jitter subpixel aprimorado
        const jx = noise(angle * 0.7, currentTime * 0.6, randomSeed) * 0.4;
        const jy = noise(angle * 0.7 + 1, currentTime * 0.6, randomSeed) * 0.4;
        
        ctx.globalAlpha = particleOpacity;
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * radius + jx,
          Math.sin(angle) * radius + jy,
          2.5, // v2: 2-4px
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#16B3A6';
        ctx.fill();
      }

      ctx.restore();
    }

    // v2: Phase 2 - Traçado do hex (0.70-2.20s, overlap 30%)
    if (currentTime >= 0.7 && currentTime <= 2.2) {
      const phaseProgress = Math.min((currentTime - 0.7) / 1.5, 1);
      const hexProgress = Math.min((currentTime - 0.7) / 0.9, 1); // v2: 0.9s
      const innerHexProgress = Math.min((currentTime - 0.88) / 0.9, 1); // v2: 180ms depois
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      ctx.globalAlpha = Math.min(phaseProgress * 0.6, 0.6);

      // v2: Hex duplo com stroke variável (1.8→1.2px)
      const outerHexSize = 110; // v2: Ainda maior
      const dashProgress = easeOutQuart(hexProgress);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * outerHexSize;
        const y = Math.sin(angle) * outerHexSize;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = '#16B3A6';
      ctx.lineWidth = 1.8; // v2: Stroke variável
      ctx.stroke();

      // v2: Inner hexagon
      if (innerHexProgress > 0) {
        const innerHexSize = 75; // v2: Proporcional
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * innerHexSize;
          const y = Math.sin(angle) * innerHexSize;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2; // v2: Stroke variável
        ctx.stroke();
      }

      // v2: Glow bege nos vértices no apogeu (160ms)
      if (hexProgress > 0.8) {
        const glowProgress = Math.min((hexProgress - 0.8) / 0.2, 1);
        ctx.globalAlpha = glowProgress * 0.45;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 16; // v2: Glow maior
        
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * outerHexSize;
          const y = Math.sin(angle) * outerHexSize;
          
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2); // v2: Maior
          ctx.fillStyle = accent;
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // v2: Phase 3 - Respiração + drift (1.60-3.20s, overlap 40%)
    if (currentTime >= 1.6 && currentTime <= 3.2) {
      const phaseProgress = Math.min((currentTime - 1.6) / 1.6, 1);
      const breathingProgress = Math.sin(phaseProgress * Math.PI * 2) * 0.03;
      const scale = 1.0 + breathingProgress;
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      ctx.scale(scale, scale);

      // v2: Rings scale 1.00→1.03→1.00 (1.4s)
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < 3; i++) {
        const radius = 70 + i * 25; // v2: Tamanhos maiores
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#16B3A6';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // v2: Partículas em micro-órbita com ruído perlin (±10px)
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16 + phaseProgress * 0.5;
        const radius = 60 + i * 5; // v2: Órbita maior
        const jitterX = noise(angle * 0.7, phaseProgress * 0.6, randomSeed) * 10; // v2: ±10px
        const jitterY = noise(angle * 0.7 + 1, phaseProgress * 0.6, randomSeed) * 10;
        
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * radius + jitterX,
          Math.sin(angle) * radius + jitterY,
          3, // v2: Maior
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#16B3A6';
        ctx.fill();
      }

      ctx.restore();
    }

    // v2: Phase 4 - Scan volumétrico (2.60-3.60s, overlap 40%)
    if (currentTime >= 2.6 && currentTime <= 3.6) {
      const scanProgress = Math.min((currentTime - 2.6) / 1.0, 1);
      const scanX = centerX + parallaxRef.current.x + (scanProgress - 0.5) * 250; // v2: Scan maior
      
      ctx.save();
      ctx.globalAlpha = 0.4;
      
      // v2: Barra vertical com gradiente cruza e aumenta brilho local (±20%)
      const gradient = ctx.createLinearGradient(scanX - 4, centerY + parallaxRef.current.y - 80, scanX + 4, centerY + parallaxRef.current.y + 80);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, '#16B3A6');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(scanX - 4, centerY + parallaxRef.current.y - 80, 8, 160); // v2: Maior
      
      // v2: Bloom discreto por 240ms
      if (scanProgress > 0.3 && scanProgress < 0.7) {
        ctx.globalAlpha = 0.2;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 30; // v2: Bloom maior
        ctx.fillRect(scanX - 3, centerY + parallaxRef.current.y - 80, 6, 160);
      }

      ctx.restore();
    }

    // v2: Phase 5 - Revelação tipográfica integrada (3.20-5.20s, overlap 30%)
    if (currentTime >= 3.2 && currentTime <= 5.2) {
      const textProgress = Math.min((currentTime - 3.2) / 2.0, 1);
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      
      // v2: 'OPEN' stroke-write (0.8s) com pressão simulada, alpha final 0.7
      if (textProgress >= 0.1) {
        const openProgress = Math.min((textProgress - 0.1) / 0.8, 1);
        const strokeWidth = 1.8 - (openProgress * 0.4); // v2: Pressão simulada
        
        ctx.globalAlpha = openProgress * 0.7; // v2: Alpha final 0.7
        ctx.font = 'bold 32px system-ui, -apple-system, sans-serif'; // v2: Maior
        ctx.strokeStyle = accent;
        ctx.lineWidth = strokeWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeText('OPEN', -50, -15); // v2: Posição ajustada
      }
      
      // v2: 'CONNECTIONS' máscara diagonal (1.2s) com lift 8px e blur 4→0
      if (textProgress >= 0.3) {
        const connectionsProgress = Math.min((textProgress - 0.3) / 1.2, 1);
        const yOffset = (1 - connectionsProgress) * 8; // v2: Lift 8px
        const blur = (1 - connectionsProgress) * 4;
        
        ctx.globalAlpha = connectionsProgress;
        ctx.filter = `blur(${blur}px)`;
        ctx.font = 'bold 28px system-ui, -apple-system, sans-serif'; // v2: 8-10% menor que OPEN
        
        // v2: Sombra sutil para leitura no grid
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = '#EAF2FB';
        ctx.fillText('CONNECTIONS', -80, 20 + yOffset); // v2: Posição ajustada
        ctx.restore();
      }

      // v2: 'INCODAY' chip surge com scale 0.94→1.0 e fade 220ms
      if (textProgress >= 0.5) {
        const badgeProgress = Math.min((textProgress - 0.5) / 0.22, 1);
        const scale = 0.94 + (badgeProgress * 0.06); // v2: Scale 0.94→1.0
        
        ctx.save();
        ctx.scale(scale, scale);
        ctx.globalAlpha = badgeProgress;
        
        // v2: Chip teal translúcido com borda sutil
        const chipWidth = 120;
        const chipHeight = 30;
        const chipX = -chipWidth / 2;
        const chipY = 40;
        
        // Fundo do chip
        ctx.fillStyle = 'rgba(22, 179, 166, 0.2)'; // v2: Teal translúcido
        ctx.fillRect(chipX, chipY, chipWidth, chipHeight);
        
        // Borda do chip
        ctx.strokeStyle = '#16B3A6';
        ctx.lineWidth = 1;
        ctx.strokeRect(chipX, chipY, chipWidth, chipHeight);
        
        // Texto do chip
        ctx.fillStyle = '#EAF2FB'; // v2: Texto branco
        ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(badge, 0, chipY + 20);
        
        ctx.restore();
      }

      ctx.restore();
    }

    // v2: Phase 5.5 - Revelação do nome completo do evento (4.20-5.80s, overlap 20%)
    if (currentTime >= 4.2 && currentTime <= 5.8) {
      const eventNameProgress = Math.min((currentTime - 4.2) / 1.6, 1);
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      
      // v2: Nome completo do evento com transição dramática
      if (eventNameProgress >= 0.2) {
        const nameProgress = Math.min((eventNameProgress - 0.2) / 0.8, 1);
        const scale = 0.7 + (nameProgress * 0.3); // v2: Scale 0.7→1.0 para efeito mais dramático
        const alpha = nameProgress * 0.95;
        const yOffset = (1 - nameProgress) * 20; // v2: Entrada de baixo para cima
        
        ctx.save();
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;
        ctx.translate(0, yOffset);
        
        // v2: Fundo translúcido com bordas arredondadas simuladas
        const bgWidth = 320;
        const bgHeight = 90;
        const bgX = -bgWidth / 2;
        const bgY = -bgHeight / 2;
        const cornerRadius = 12;
        
        // Fundo com gradiente mais sutil
        const gradient = ctx.createLinearGradient(bgX, bgY, bgX + bgWidth, bgY + bgHeight);
        gradient.addColorStop(0, 'rgba(12, 35, 64, 0.9)');
        gradient.addColorStop(0.3, 'rgba(14, 124, 134, 0.7)');
        gradient.addColorStop(0.7, 'rgba(14, 124, 134, 0.7)');
        gradient.addColorStop(1, 'rgba(12, 35, 64, 0.9)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
        
        // Borda com glow mais intenso
        ctx.strokeStyle = accent;
        ctx.lineWidth = 3;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 15;
        ctx.strokeRect(bgX, bgY, bgWidth, bgHeight);
        
        // v2: "OPEN CONNECTIONS" em destaque com efeito de brilho
        ctx.fillStyle = accent;
        ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;
        ctx.fillText('OPEN CONNECTIONS', 0, -8);
        
        // v2: "+ INCODAY" como complemento com fade-in
        const incoDayAlpha = Math.min((nameProgress - 0.3) / 0.4, 1);
        ctx.globalAlpha = alpha * incoDayAlpha;
        ctx.fillStyle = '#EAF2FB';
        ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;
        ctx.fillText('+ INCODAY', 0, 18);
        
        // v2: Efeito de pulsação sutil no fundo
        if (nameProgress > 0.5) {
          const pulseProgress = Math.sin((nameProgress - 0.5) * Math.PI * 4) * 0.1 + 0.9;
          ctx.globalAlpha = alpha * 0.3 * pulseProgress;
          ctx.fillStyle = accent;
          ctx.fillRect(bgX - 5, bgY - 5, bgWidth + 10, bgHeight + 10);
        }
        
        ctx.restore();
      }

      ctx.restore();
    }

    // v2: Phase 6 - Conexões inteligentes (4.80-7.20s, overlap 25%)
    if (currentTime >= 4.8 && currentTime <= 7.2) {
      const connectionProgress = Math.min((currentTime - 4.8) / 2.4, 1);
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      
      // v2: 3-5 linhas com "head light" percorrem nós (420ms cada)
      for (let i = 0; i < 5; i++) { // v2: 3-5 linhas
        const lineProgress = Math.min((connectionProgress - i * 0.2) / 0.42, 1);
        if (lineProgress > 0 && lineProgress < 1) {
          const startAngle = (i * Math.PI * 2) / 5;
          const endAngle = ((i + 1) * Math.PI * 2) / 5;
          
          const startX = Math.cos(startAngle) * 70; // v2: Maior
          const startY = Math.sin(startAngle) * 70;
          const endX = Math.cos(endAngle) * 70;
          const endY = Math.sin(endAngle) * 70;
          
          const currentX = startX + (endX - startX) * lineProgress;
          const currentY = startY + (endY - startY) * lineProgress;
          
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2; // v2: Mais grosso
          ctx.stroke();
          
          // v2: Head light percorre nós
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2); // v2: Maior
          ctx.fillStyle = accent;
          ctx.fill();
        }
      }

      // v2: Ocasional '+' implícito por 500-700ms
      if (connectionProgress > 0.6 && connectionProgress < 0.8) {
        const plusProgress = Math.min((connectionProgress - 0.6) / 0.2, 1);
        ctx.globalAlpha = plusProgress * 0.4;
        
        // Desenhar '+' implícito no centro
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(8, 0);
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 8);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    }

    // v2: Phase 7 - Estado vivo + rotação lenta (7.00-9.50s)
    if (currentTime >= 7.0) {
      const livingProgress = (currentTime - 7.0) / 2.5;
      const breathingProgress = Math.sin(livingProgress * Math.PI * 2) * 0.02;
      const rotationProgress = Math.sin(livingProgress * Math.PI) * 3; // v2: Oscilação -3°→+3° (9.5s)
      
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      ctx.rotate((rotationProgress * Math.PI) / 180);
      ctx.scale(1.0 + breathingProgress, 1.0 + breathingProgress);

      // v2: Living rings com respiração a 1.8s
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 3; i++) {
        const radius = 60 + i * 30; // v2: Tamanhos maiores
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#16B3A6';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // v2: Partículas alternam órbita/idle
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12 + livingProgress * 0.3;
        const radius = 55 + i * 8; // v2: Órbita maior
        
        // v2: Jitter subpixel aprimorado
        const jx = noise(angle * 0.7, livingProgress * 0.6, randomSeed) * 0.4;
        const jy = noise(angle * 0.7 + 1, livingProgress * 0.6, randomSeed) * 0.4;
        
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * radius + jx,
          Math.sin(angle) * radius + jy,
          2.5, // v2: Maior
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#16B3A6';
        ctx.fill();
      }

      ctx.restore();
    }

    // CTA focus effect (Patch 5: tamanhos maiores)
    if (isFocused) {
      ctx.save();
      ctx.translate(centerX + parallaxRef.current.x, centerY + parallaxRef.current.y);
      
      // Central halo (Patch 5: tamanho maior)
      ctx.globalAlpha = 0.6;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 25; // Aumentado
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2); // Aumentado
      ctx.fillStyle = accent;
      ctx.fill();
      
      // Line to CTA (Patch 5: linha mais grossa)
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-120, -60); // Aumentado
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5; // Aumentado
      ctx.stroke();
      
      ctx.restore();
    }
  };

  // Patch 1: useEffect otimizado com refs
  useEffect(() => {
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      // Patch 1: Suavização do delta
      advanceClock(deltaTime);
      
      // Patch 8: Degradação elegante
      if (fpsLagRef.current > 22) {
        degradationTimeRef.current += deltaTime;
        if (degradationTimeRef.current > 1000) { // 1s
          degradedRef.current = true;
        }
      } else if (fpsLagRef.current < 15) {
        degradationTimeRef.current = Math.max(0, degradationTimeRef.current - deltaTime);
        if (degradationTimeRef.current === 0) {
          degradedRef.current = false;
        }
      }

      if (runningRef.current) {
        const t = clockRef.current % 8.0;
        
        // Patch 7: Eventos de reveal sem piscar
        if (t >= 2.8 && !revealedRef.current) {
          revealedRef.current = true;
          onRevealStart?.();
        }
        
        if (t >= 4.2 && revealedRef.current) {
          onRevealEnd?.();
        }
        
        // v2: Loop every 9.5 seconds
        if (clockRef.current >= 9.5) {
          clockRef.current = 0;
          revealedRef.current = false;
          setRandomSeed(Math.random()); // New random seed for variations
        }
      }
      
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Inicializar estado
    runningRef.current = variant === 'full';
    if (variant === 'full') {
      clockRef.current = 0;
      revealedRef.current = false;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, onRevealStart, onRevealEnd, randomSeed]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maxWidth: '58%', // v2: 55-65% da largura (desktop)
          maxHeight: '100%',
          marginLeft: '64px' // v2: Margem interna 48-64px
        }}
      />
    </div>
  );
};

export default ConnectionGateway;
