import React from 'react';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'gforti' | 'organizadores';
}

function Logo({ src, alt, className = '', variant = 'gforti' }: LogoProps) {
  const isPdf = src.toLowerCase().endsWith('.pdf');
  const finalSrc = isPdf ? `/api/logo/pdf2png?src=${encodeURIComponent(src)}` : src;
  
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const stage = target.parentElement;
    if (stage) {
      stage.classList.add('missing');
    }
  };
  
  if (variant === 'organizadores') {
    return (
      <img src={finalSrc} alt={alt} loading="lazy" onError={handleError} />
    );
  }
  
  return (
    <div className={`gfi-card ${className}`}>
      <div className="gfi-stage">
        <img src={finalSrc} alt={alt} loading="lazy" onError={handleError} />
      </div>
    </div>
  );
}

export default Logo;
