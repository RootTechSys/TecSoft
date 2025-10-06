import React from 'react';
import { motion } from 'framer-motion';

const CurvedBanner: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Gradiente Base Autêntico - Fiel às Referências */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(110deg, #002838 0%, #003d4d 8%, #00566b 16%, #007189 24%, #0099b8 30%, #00bcd4 36%, #2db3d3 42%, #5a9fce 46%, #7890d8 50%, #8b7fdb 54%, #9d6bdf 58%, #a855f7 62%, #b95cf6 66%, #c752ec 70%, #d648e3 74%, #e33ed9 78%, #ec4899 82%, #f06292 86%, #f48fb1 90%, #f8bbd0 94%, #ffc4d6 98%, #ffe0e8 100%)'
        }}
      />

      {/* Overlay Teal com Partículas Douradas - Open Connections */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(255, 165, 0, 0.08) 0%, transparent 10%),
            radial-gradient(circle at 25% 60%, rgba(255, 140, 66, 0.06) 0%, transparent 8%),
            radial-gradient(circle at 10% 80%, rgba(255, 165, 0, 0.07) 0%, transparent 12%),
            radial-gradient(ellipse at 0% 50%, rgba(0, 113, 137, 0.4) 0%, transparent 65%)
          `,
          mixBlendMode: 'screen',
          zIndex: 2
        }}
      />

      {/* Overlay Roxo-Rosa InCoDay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 1200px 1000px at 100% 30%, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.18) 35%, transparent 70%),
            radial-gradient(ellipse 1000px 1200px at 90% 70%, rgba(236, 72, 153, 0.2) 0%, rgba(244, 114, 182, 0.12) 40%, transparent 75%)
          `,
          mixBlendMode: 'overlay',
          zIndex: 2
        }}
      />

      {/* SVG Diagonal Transition */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
        viewBox="0 0 1200 800" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="diagonalTransition" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bcd4" stopOpacity="0"/>
            <stop offset="35%" stopColor="#5a9fce" stopOpacity="0.25"/>
            <stop offset="50%" stopColor="#8b7fdb" stopOpacity="0.4"/>
            <stop offset="65%" stopColor="#b95cf6" stopOpacity="0.35"/>
            <stop offset="80%" stopColor="#ec4899" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#f8bbd0" stopOpacity="0"/>
          </linearGradient>
          
          <filter id="softBlend">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40"/>
          </filter>
        </defs>
        
        <path 
          d="M 0,0 L 800,0 L 1200,800 L 400,800 Z"
          fill="url(#diagonalTransition)"
          filter="url(#softBlend)"
          style={{ mixBlendMode: 'overlay', opacity: 0.6 }}
        />
      </svg>


      {/* Noise Texture para Quebrar Banding */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          opacity: 0.5,
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />

      {/* Elementos Decorativos Autênticos - Fiel às Referências */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 10 }}
      >
        {/* Hexágono 1 - Ciano Vibrante Open Connections */}
        <motion.div
          className="absolute"
          style={{
            width: '90px',
            height: '90px',
            top: '28%',
            left: '18%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '2px solid #00e5ff',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3), inset 0 0 10px rgba(0, 229, 255, 0.1)',
            filter: 'drop-shadow(0 4px 12px rgba(0, 188, 212, 0.4))',
            opacity: 0.35,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.35, 0.3],
            scale: 1,
            y: [0, -6, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hexágono 2 - Ciano Vibrante Open Connections */}
        <motion.div
          className="absolute"
          style={{
            width: '90px',
            height: '90px',
            top: '58%',
            left: '24%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '2px solid #00e5ff',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3), inset 0 0 10px rgba(0, 229, 255, 0.1)',
            filter: 'drop-shadow(0 4px 12px rgba(0, 188, 212, 0.4))',
            opacity: 0.3,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.25, 0.3, 0.25],
            scale: 1,
            y: [0, -6, 0]
          }}
          transition={{
            duration: 11,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Partícula Dourada 1 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            top: '22%',
            left: '12%',
            background: 'radial-gradient(circle, #ffa500, #ff8c42)',
            boxShadow: '0 0 8px rgba(255, 165, 0, 0.6)',
            opacity: 0.5,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Partícula Dourada 2 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            top: '48%',
            left: '28%',
            background: 'radial-gradient(circle, #ffa500, #ff8c42)',
            boxShadow: '0 0 8px rgba(255, 165, 0, 0.6)',
            opacity: 0.5,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Partícula Dourada 3 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            top: '72%',
            left: '15%',
            background: 'radial-gradient(circle, #ffa500, #ff8c42)',
            boxShadow: '0 0 8px rgba(255, 165, 0, 0.6)',
            opacity: 0.5,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3.5,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Círculo 1 - Roxo-Rosa InCoDay */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '110px',
            height: '110px',
            top: '32%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 60%, rgba(244, 114, 182, 0.04) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), 0 4px 15px rgba(236, 72, 153, 0.15)',
            opacity: 0.3,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.25, 0.3, 0.25],
            scale: 1,
            y: [0, -6, 0]
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Círculo 2 - Roxo-Rosa InCoDay */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '85px',
            height: '85px',
            top: '62%',
            right: '28%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 60%, rgba(244, 114, 182, 0.04) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), 0 4px 15px rgba(236, 72, 153, 0.15)',
            opacity: 0.25,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.25, 0.2],
            scale: 1,
            y: [0, -6, 0]
          }}
          transition={{
            duration: 12,
            delay: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* CSS Animations Autênticas */}
      <style>{`
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-6px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2); 
          }
        }
      `}</style>
    </section>
  );
};

export default CurvedBanner;