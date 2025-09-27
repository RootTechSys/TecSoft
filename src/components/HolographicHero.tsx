import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ConnectionGateway from './ConnectionGateway';

interface Beacon {
  id: number;
  x: number;
  y: number;
  nodeIndex: number;
  startTime: number;
  duration: number;
}

interface HolographicHeroProps {
  className?: string;
}

const HolographicHero: React.FC<HolographicHeroProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [meshPoints, setMeshPoints] = useState<{ x: number; y: number; z: number }[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Gerar pontos da malha
  const generateMeshPoints = useCallback(() => {
    const points: { x: number; y: number; z: number }[] = [];
    const cols = 20;
    const rows = 15;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        points.push({
          x: (col / (cols - 1)) * 100,
          y: (row / (rows - 1)) * 100,
          z: 0
        });
      }
    }
    setMeshPoints(points);
  }, []);

  // Gerar beacon
  const generateBeacon = useCallback(() => {
    if (meshPoints.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * meshPoints.length);
    const point = meshPoints[randomIndex];
    
    const newBeacon: Beacon = {
      id: Date.now() + Math.random(),
      x: point.x,
      y: point.y,
      nodeIndex: randomIndex,
      startTime: Date.now(),
      duration: 1200 + Math.random() * 600 // 1.2s ± 0.6s
    };
    
    setBeacons(prev => [...prev, newBeacon]);
    
    // Remover beacon após duração
    setTimeout(() => {
      setBeacons(prev => prev.filter(beacon => beacon.id !== newBeacon.id));
    }, newBeacon.duration);
  }, [meshPoints]);

  // Gerenciador de beacons
  useEffect(() => {
    if (isReducedMotion) return;
    
    const interval = setInterval(() => {
      // Limitar beacons ativos a 10
      if (beacons.length < 10) {
        generateBeacon();
      }
    }, 600 + Math.random() * 300); // 600-900ms
    
    return () => clearInterval(interval);
  }, [beacons.length, generateBeacon, isReducedMotion]);

  // Renderizar canvas
  const renderMesh = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurar estilo
    ctx.strokeStyle = 'rgba(22, 179, 166, 0.3)'; // Teal 30% opacity
    ctx.lineWidth = 1;
    ctx.shadowColor = 'rgba(22, 179, 166, 0.2)';
    ctx.shadowBlur = 2;
    
    // Calcular offset de perspectiva baseado no mouse
    const offsetX = springX.get() * 0.1;
    const offsetY = springY.get() * 0.1;
    
    // Renderizar linhas da malha
    const cols = 20;
    const rows = 15;
    const time = Date.now() * 0.001;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const point = meshPoints[index];
        if (!point) continue;
        
        // Ondulação suave
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const waveZ = isReducedMotion ? 0 : Math.sin(time * 0.1 + point.x * 0.1) * 20;
        
        // Projeção 3D simples
        const x = (point.x / 100) * width + offsetX;
        const y = (point.y / 100) * height + offsetY;
        
        // Conectar com pontos adjacentes
        if (col < cols - 1) {
          const rightIndex = index + 1;
          const rightPoint = meshPoints[rightIndex];
          if (rightPoint) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const rightWaveZ = isReducedMotion ? 0 : Math.sin(time * 0.1 + rightPoint.x * 0.1) * 20;
            const rightX = (rightPoint.x / 100) * width + offsetX;
            const rightY = (rightPoint.y / 100) * height + offsetY;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
          }
        }
        
        if (row < rows - 1) {
          const bottomIndex = index + cols;
          const bottomPoint = meshPoints[bottomIndex];
          if (bottomPoint) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const bottomWaveZ = isReducedMotion ? 0 : Math.sin(time * 0.1 + bottomPoint.x * 0.1) * 20;
            const bottomX = (bottomPoint.x / 100) * width + offsetX;
            const bottomY = (bottomPoint.y / 100) * height + offsetY;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(bottomX, bottomY);
            ctx.stroke();
          }
        }
      }
    }
    
    // Renderizar beacons
    beacons.forEach(beacon => {
      const elapsed = Date.now() - beacon.startTime;
      const progress = Math.min(elapsed / beacon.duration, 1);
      
      // Fade in/out
      const alpha = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
      
      const x = (beacon.x / 100) * width + offsetX;
      const y = (beacon.y / 100) * height + offsetY;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      gradient.addColorStop(0, `rgba(231, 200, 161, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(231, 200, 161, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(231, 200, 161, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Plus symbol
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', x, y);
    });
    
    animationRef.current = requestAnimationFrame(renderMesh);
  }, [meshPoints, beacons, springX, springY, isReducedMotion]);

  // Inicializar canvas
  useEffect(() => {
    generateMeshPoints();
  }, [generateMeshPoints]);

  useEffect(() => {
    renderMesh();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [renderMesh]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set((x - 0.5) * 100);
    mouseY.set((y - 0.5) * 100);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Estilos CSS para animações */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes scanlines {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes strokeWrite {
          0% {
            stroke-dasharray: 0 100;
          }
          100% {
            stroke-dasharray: 100 0;
          }
        }
        
        .holographic-glow {
          box-shadow: 
            0 0 20px rgba(22, 179, 166, 0.3),
            0 0 40px rgba(22, 179, 166, 0.2),
            0 0 60px rgba(22, 179, 166, 0.1);
        }
        
        .interface-viva {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .volumetric-shadow {
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.28));
        }
        
        .tech-interface {
          backdrop-filter: blur(1px);
          background: linear-gradient(135deg, rgba(22, 179, 166, 0.05) 0%, rgba(231, 200, 161, 0.03) 50%, rgba(22, 179, 166, 0.05) 100%);
        }
      `}</style>
      
      <section 
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: 'radial-gradient(120% 120% at 70% 10%, #0E7C86 0%, #0C2340 55%, #081629 100%)'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
      {/* Layer 1: Background texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0))',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 2: Holographic mesh canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.4px)' }}
      />

      {/* Layer 3: Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content (42% desktop) */}
          {/* Left Side - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* H1: "OPEN CONNECTIONS + INCODAY" com outline/fill */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.02em'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.46, delay: 0.9 }} // v2: Iniciar aos 0.9s
            >
              {/* "OPEN" outline com stroke-write e pressão simulada */}
              <motion.span
                className="block"
                initial={{ y: 10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  WebkitTextStroke: ['1.8px #E7C8A1', '1.4px #E7C8A1', '1.8px #E7C8A1']
                }}
                transition={{ 
                  duration: 0.7, // v2: stroke-write 0.7s com pressão simulada
                  delay: 1.2, // v2: Tipografia "OPEN/CONNECTIONS" com máscara
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.8px #E7C8A1',
                  textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  filter: 'drop-shadow(0 0 4px rgba(231, 200, 161, 0.3))'
                }}
              >
                OPEN
              </motion.span>
              
              {/* "CONNECTIONS" fill com máscara diagonal e lift */}
              <motion.span
                className="block"
                initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 10, opacity: 1, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 1.2, // v2: revelação com máscara diagonal 1.2s
                  delay: 1.2, // v2: lift 8px e blur 4→0
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  color: '#EAF2FB',
                  textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  background: 'linear-gradient(45deg, transparent 0%, rgba(231, 200, 161, 0.1) 50%, transparent 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text'
                }}
                onAnimationComplete={() => {
                  // Microglow bege 120ms ao fim para marcar entrada
                  setTimeout(() => {
                    // Trigger glow effect
                  }, 120);
                }}
              >
                CONNECTIONS
              </motion.span>
              
              {/* "+ INCODAY" chip com pontos internos animados */}
              <motion.span
                className="inline-block px-4 py-2 rounded-full text-2xl font-bold mt-4 relative overflow-hidden"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: 1.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  backgroundColor: 'rgba(22, 179, 166, 0.2)',
                  border: '1px solid #16B3A6',
                  color: '#EAF2FB'
                }}
              >
                + INCODAY
                
                {/* Pontos internos que percorrem de esquerda para direita */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(231, 200, 161, 0.3) 50%, transparent 100%)',
                    width: '20px',
                    height: '2px',
                    top: '50%',
                    left: '0%',
                    transform: 'translateY(-50%)',
                    borderRadius: '1px'
                  }}
                  animate={{
                    x: ['0%', '100%']
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 2.0,
                    repeat: Infinity,
                    repeatDelay: 14, // v2: a cada 14s
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </motion.h1>

            {/* Sub: "Software + Conectividade" com opacidade 85% */}
            <motion.p 
              className="text-2xl font-semibold"
              style={{ color: '#EAF2FB', opacity: 0.85 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.24, delay: 1.2 }} // v2: Sublinha aos 1.2s
            >
              Software + Conectividade
            </motion.p>
            
            {/* Linha de valor: "Conteúdo, Networking e Parcerias" com opacidade 70% */}
            <motion.p 
              className="text-xl"
              style={{ color: '#EAF2FB', opacity: 0.7 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.24, delay: 1.4 }} // v2: Linha de valor aos 1.4s
            >
              Conteúdo, Networking e Parcerias
            </motion.p>

            {/* Selos de contexto: "Formato Híbrido", "Finatec, 11–12 Nov" */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: 1.6 }} // v2: Chips aos 1.6s
            >
              <motion.span 
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#16B3A6',
                  color: '#EAF2FB'
                }}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.18, 
                  delay: 1.6, // v2: Cápsulas minimalistas com borda teal
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  backgroundColor: 'rgba(22, 179, 166, 0.1)',
                  borderColor: '#E7C8A1',
                  color: '#E7C8A1'
                }}
              >
                Formato Híbrido
              </motion.span>
              <motion.span 
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#16B3A6',
                  color: '#EAF2FB'
                }}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.18, 
                  delay: 1.72, // v2: 120ms de atraso entre chips
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  backgroundColor: 'rgba(22, 179, 166, 0.1)',
                  borderColor: '#E7C8A1',
                  color: '#E7C8A1'
                }}
              >
                Finatec, 11–12 Nov
              </motion.span>
            </motion.div>

            {/* CTAs: "Inscrever-se" e "Ver Agenda" */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: 1.8 }} // v2: CTAs aos 1.8s
            >
              <motion.a
                href="#inscrever"
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                style={{
                  backgroundColor: '#E7C8A1',
                  color: '#0C2340',
                  boxShadow: '0 4px 14px 0 rgba(231, 200, 161, 0.3)'
                }}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.18, 
                  delay: 1.8, // v2: CTA primário em bege com micro-bloom no foco
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 6px 20px 0 rgba(231, 200, 161, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onFocus={() => {
                  // Trigger beacon near CTA
                  if (meshPoints.length > 0) {
                    const randomIndex = Math.floor(Math.random() * meshPoints.length);
                    const point = meshPoints[randomIndex];
                    const newBeacon: Beacon = {
                      id: Date.now(),
                      x: point.x,
                      y: point.y,
                      nodeIndex: randomIndex,
                      startTime: Date.now(),
                      duration: 1200
                    };
                    setBeacons(prev => [...prev, newBeacon]);
                  }
                }}
              >
                Inscrever-se
              </motion.a>
              
              <motion.a
                href="#agenda"
                className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                style={{
                  borderColor: '#16B3A6',
                  color: '#16B3A6',
                  backgroundColor: 'transparent'
                }}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.18, 
                  delay: 1.92, // v2: 120ms de atraso entre CTAs
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(22, 179, 166, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Agenda
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Integração 3D da imagem (55-62% desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative flex items-center justify-center h-[600px] lg:h-[700px]"
            style={{
              // v2: Container 55-62% do herói, centralizado verticalmente
              width: '100%',
              maxWidth: '62%',
              margin: '0 auto'
            }}
          >
            {/* Container da imagem com integração 3D */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Sombra física em 3 níveis */}
              
              {/* 1. Contato: elipse curta e densa sob o busto */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.35 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '200px',
                  height: '80px',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)'
                }}
              />
              
              {/* 2. Difusa: gradiente radial suave atrás do tronco */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.18 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
              />
              
              {/* 3. Volumétrica: cone sutil caindo para diagonal inferior */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.08 }}
                transition={{ 
                  duration: 1.4, 
                  delay: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute bottom-0 right-0"
                style={{
                  width: '300px',
                  height: '200px',
                  background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)',
                  filter: 'blur(15px)'
                }}
              />

              {/* Hex Network Halo - Animação Refinada */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.0, // v2: Boot suave do hex (0.0-1.0s)
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Backplate Holográfico - Círculos Concêntricos */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 1.6, // v2: Respiração 1.6s
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {[180, 240, 300].map((size, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderColor: 'rgba(22, 179, 166, 0.2)',
                        filter: 'blur(1px)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.2 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.8 + i * 0.2, // v2: Traçado do hex externo (0.8-2.2s)
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                  ))}
                </motion.div>

                {/* Hex Interno Rotativo */}
                <motion.div
                  className="absolute"
                  style={{
                    width: '160px',
                    height: '160px',
                    background: 'conic-gradient(from 0deg, rgba(22, 179, 166, 0.1), rgba(231, 200, 161, 0.2), rgba(22, 179, 166, 0.1))',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    filter: 'blur(0.5px)'
                  }}
                  animate={{
                    rotate: [-3, 3, -3], // v2: Rotação mínima -3°→+3° em 10s
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Nós Orbitais (24-36 nós pequenos) */}
                {[...Array(30)].map((_, i) => {
                  const angle = (i * 360) / 30;
                  const radius = 120 + (i % 3) * 20;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${2 + (i % 3)}px`, // v2: 2-4px
                        height: `${2 + (i % 3)}px`,
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        background: 'rgba(22, 179, 166, 0.6)',
                        boxShadow: '0 0 8px rgba(22, 179, 166, 0.4)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.7, 0.3],
                        x: [0, Math.cos(angle * Math.PI / 180) * 6, 0], // v2: Drift orbital 6-10px
                        y: [0, Math.sin(angle * Math.PI / 180) * 6, 0]
                      }}
                      transition={{
                        duration: 2 + i * 0.1,
                        delay: 1.6 + i * 0.05, // v2: Drift orbital (1.6-3.4s)
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                {/* Linhas de Conexão Inteligentes */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(5)].map((_, i) => {
                    const startAngle = (i * 72) * Math.PI / 180;
                    const endAngle = ((i + 2) * 72) * Math.PI / 180;
                    const radius = 100;
                    
                    return (
                      <motion.line
                        key={i}
                        x1={`${50 + Math.cos(startAngle) * 30}%`}
                        y1={`${50 + Math.sin(startAngle) * 30}%`}
                        x2={`${50 + Math.cos(endAngle) * 30}%`}
                        y2={`${50 + Math.sin(endAngle) * 30}%`}
                        stroke="url(#headLightGradient)"
                        strokeWidth="1"
                        opacity="0.6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1, 0],
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{
                          duration: 0.42, // v2: Head-light bege 420ms
                          delay: 3.0 + i * 0.5, // v2: Conexões inteligentes (3.0-6.0s)
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      />
                    );
                  })}
                  
                  {/* Gradiente Head-Light Bege */}
                  <defs>
                    <linearGradient id="headLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(231, 200, 161, 0.8)" />
                      <stop offset="50%" stopColor="rgba(22, 179, 166, 0.6)" />
                      <stop offset="100%" stopColor="rgba(231, 200, 161, 0.4)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Varredura Volumétrica */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(22, 179, 166, 0.3) 50%, transparent 100%)',
                    width: '4px',
                    left: '0%',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 20px rgba(22, 179, 166, 0.4)'
                  }}
                  animate={{
                    x: ['0%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.9, // v2: 900ms
                    delay: 2.6, // v2: Varredura volumétrica (2.6-3.6s)
                    repeat: Infinity,
                    repeatDelay: 8
                  }}
                />

                {/* Moldura Hex Reativa */}
                <motion.div
                  className="absolute"
                  style={{
                    width: '400px',
                    height: '500px',
                    border: '2px solid rgba(22, 179, 166, 0.4)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: '0 0 30px rgba(22, 179, 166, 0.3)'
                  }}
                  animate={{
                    borderWidth: ['1.8px', '1.2px', '1.8px'], // v2: Stroke variável 1.8→1.2px
                    boxShadow: [
                      '0 0 30px rgba(22, 179, 166, 0.3)',
                      '0 0 40px rgba(231, 200, 161, 0.4)',
                      '0 0 30px rgba(22, 179, 166, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Glow Bege nos Vértices */}
                {[
                  { x: '50%', y: '0%' },
                  { x: '100%', y: '25%' },
                  { x: '100%', y: '75%' },
                  { x: '50%', y: '100%' },
                  { x: '0%', y: '75%' },
                  { x: '0%', y: '25%' }
                ].map((vertex, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: '8px',
                      height: '8px',
                      left: vertex.x,
                      top: vertex.y,
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(231, 200, 161, 0.8) 0%, transparent 70%)',
                      boxShadow: '0 0 15px rgba(231, 200, 161, 0.6)'
                    }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 0.16, // v2: Halos bege 160ms
                      delay: 0.8 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                ))}
              </motion.div>

              {/* Linhas isométricas conectando a moldura */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.42, 
                  delay: 1.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg className="w-full h-full">
                  {/* Linhas conectando a moldura a pinos do grid */}
                  {[
                    { x1: '50%', y1: '0%', x2: '60%', y2: '20%' },
                    { x1: '100%', y1: '25%', x2: '85%', y2: '35%' },
                    { x1: '100%', y1: '75%', x2: '85%', y2: '65%' },
                    { x1: '50%', y1: '100%', x2: '60%', y2: '80%' }
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#16B3A6"
                      strokeWidth="1"
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 0.42, 
                        delay: 1.8 + i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Placas semi-transparentes de vidro */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Placa atrás da moldura */}
                <div 
                  className="absolute inset-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(22, 179, 166, 0.05) 0%, rgba(231, 200, 161, 0.03) 50%, rgba(22, 179, 166, 0.05) 100%)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(1px)',
                    border: '1px solid rgba(231, 200, 161, 0.1)',
                    boxShadow: 'inset 0 0 20px rgba(231, 200, 161, 0.1)'
                  }}
                />
                
                {/* Placa à frente da moldura */}
                <div 
                  className="absolute inset-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(231, 200, 161, 0.03) 0%, rgba(22, 179, 166, 0.05) 50%, rgba(231, 200, 161, 0.03) 100%)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(0.5px)',
                    border: '1px solid rgba(22, 179, 166, 0.1)',
                    boxShadow: 'inset 0 0 15px rgba(22, 179, 166, 0.1)'
                  }}
                />
              </motion.div>

              {/* Container geométrico com máscara */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative z-10"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Moldura hex reativa com espessura variável */}
                <motion.div 
                  className="relative overflow-hidden"
                  style={{
                    width: '400px',
                    height: '500px',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: 'linear-gradient(135deg, rgba(12, 35, 64, 0.9) 0%, rgba(14, 124, 134, 0.8) 50%, rgba(12, 35, 64, 0.9) 100%)',
                    borderRadius: '20px',
                    boxShadow: `
                      0 0 30px rgba(22, 179, 166, 0.4),
                      0 0 60px rgba(22, 179, 166, 0.2),
                      inset 0 0 20px rgba(231, 200, 161, 0.1)
                    `
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Borda interna com glow */}
                  <div 
                    className="absolute inset-2 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(22, 179, 166, 0.3) 0%, rgba(231, 200, 161, 0.2) 50%, rgba(22, 179, 166, 0.3) 100%)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  />
                  
                  {/* Imagem com rim light coerente */}
                  <motion.img
                    src="/Connection.png"
                    alt="Open Connections - Tecnologia e Conectividade"
                    className="w-full h-full object-cover cursor-pointer"
                    style={{
                      filter: `
                        drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))
                        drop-shadow(3px 0 6px rgba(22, 179, 166, 0.3))
                        drop-shadow(-2px 0 4px rgba(231, 200, 161, 0.2))
                        brightness(1.05)
                        contrast(1.1)
                      `,
                      objectPosition: 'center center'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      filter: `
                        drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))
                        drop-shadow(4px 0 8px rgba(22, 179, 166, 0.4))
                        drop-shadow(-3px 0 6px rgba(231, 200, 161, 0.3))
                        brightness(1.08)
                        contrast(1.15)
                      `,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  />
                  
                  {/* Grade especular com scanlines diagonais */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.12 }}
                    transition={{ 
                      duration: 1.0, 
                      delay: 2.0,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        repeating-linear-gradient(
                          45deg,
                          transparent 0px,
                          transparent 2px,
                          rgba(22, 179, 166, 0.1) 2px,
                          rgba(22, 179, 166, 0.1) 4px
                        )
                      `,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      animation: 'scanlines 0.4s linear infinite'
                    }}
                  />
                  
                  {/* Overlay de profundidade */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.2) 100%)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  />
                  
                  {/* Cantos com glow sutil */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 20% 20%, rgba(231, 200, 161, 0.1) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(22, 179, 166, 0.1) 0%, transparent 30%), radial-gradient(circle at 20% 80%, rgba(22, 179, 166, 0.1) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(231, 200, 161, 0.1) 0%, transparent 30%)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  />
                </motion.div>
                
                {/* Efeito de respiração no container */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    border: '2px solid rgba(22, 179, 166, 0.3)',
                    borderRadius: '20px'
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Partículas atmosféricas alinhadas com a forma geométrica */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => {
                  // Distribuir partículas ao redor do hexágono
                  const angle = (i * Math.PI * 2) / 8;
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        x: x * 0.5,
                        y: y * 0.5
                      }}
                      animate={{ 
                        opacity: [0, 0.4, 0],
                        scale: [0, 1, 0],
                        x: x,
                        y: y
                      }}
                      transition={{ 
                        duration: 4,
                        delay: 2.0 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute rounded-full"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: i % 3 === 0 ? '#16B3A6' : i % 3 === 1 ? '#E7C8A1' : '#EAF2FB',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(1px)',
                        boxShadow: '0 0 6px rgba(22, 179, 166, 0.3)'
                      }}
                    />
                  );
                })}
                
                {/* Partículas internas no hexágono */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`inner-${i}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: (Math.random() - 0.5) * 100,
                      y: (Math.random() - 0.5) * 100
                    }}
                    animate={{ 
                      opacity: [0, 0.2, 0],
                      scale: [0, 0.8, 0],
                      x: (Math.random() - 0.5) * 150,
                      y: (Math.random() - 0.5) * 150
                    }}
                    transition={{ 
                      duration: 3,
                      delay: 2.5 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute rounded-full"
                    style={{
                      width: '2px',
                      height: '2px',
                      backgroundColor: '#EAF2FB',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      filter: 'blur(0.5px)'
                    }}
                  />
                ))}
              </div>

              {/* Gradiente de oclusão seguindo a forma hexagonal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 1.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  borderRadius: '20px'
                }}
              />

              {/* Scan volumétrico com bloom suave */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: 1 }}
                transition={{ 
                  duration: 0.9, // v2: 900ms
                  delay: 2.0, // v2: scan volumétrico 2.0-3.0s
                  repeat: Infinity,
                  repeatDelay: 18, // v2: a cada 16-22s
                  ease: "easeInOut"
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(22, 179, 166, 0.4) 50%, transparent 100%)',
                  width: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  borderRadius: '4px',
                  boxShadow: '0 0 20px rgba(22, 179, 166, 0.6), 0 0 40px rgba(22, 179, 166, 0.3)',
                  filter: 'blur(1px)'
                }}
              />
              
              {/* Conexões dinâmicas com head-light beige */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.42, 
                  delay: 2.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg className="w-full h-full">
                  {[
                    { x1: '20%', y1: '30%', x2: '80%', y2: '70%' },
                    { x1: '30%', y1: '60%', x2: '70%', y2: '40%' },
                    { x1: '40%', y1: '20%', x2: '60%', y2: '80%' }
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#E7C8A1"
                      strokeWidth="1"
                      opacity="0.6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ 
                        duration: 0.42, 
                        delay: 2.4 + i * 0.2,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(231, 200, 161, 0.4))'
                      }}
                    />
                  ))}
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HolographicHero;
