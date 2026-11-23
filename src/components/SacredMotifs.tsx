import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export const MandalaMotif: React.FC<{ className?: string; slowSpin?: boolean }> = ({
  className = 'w-64 h-64',
  slowSpin = false,
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    aria-hidden="true"
    className={`${className} ${slowSpin ? 'animate-mandala-slow' : ''}`}
  >
    <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />
    <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.7" />
    <circle cx="100" cy="100" r="56" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
    <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 100 + Math.cos(angle) * 32;
      const y1 = 100 + Math.sin(angle) * 32;
      const x2 = 100 + Math.cos(angle) * 94;
      const y2 = 100 + Math.sin(angle) * 94;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />;
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = i * 45;
      return (
        <path
          key={i}
          d="M100 22 C112 42, 112 60, 100 68 C88 60, 88 42, 100 22 Z"
          stroke="currentColor"
          strokeWidth="0.7"
          transform={`rotate(${angle} 100 100)`}
        />
      );
    })}
  </svg>
);

export const LotusDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-4 my-6 ${className}`} aria-hidden="true">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C6A15B]/50 to-[#C6A15B]/80" />
    <svg viewBox="0 0 48 28" className="w-9 h-6 text-[#C6A15B]" fill="none">
      <path d="M24 3 C29 11, 29 19, 24 24 C19 19, 19 11, 24 3 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 24 C16 21, 11 15, 10 8 C16 10, 21 15, 24 24 Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M24 24 C32 21, 37 15, 38 8 C32 10, 27 15, 24 24 Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 25 H42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C6A15B]/50 to-[#C6A15B]/80" />
  </div>
);

export const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = 'w-full h-full object-cover' }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F6ECD8] via-[#E8D5B0] to-[#DFCAA2] dark:from-[#172B45] dark:to-[#0F1A2B] text-[#641E24] dark:text-[#C6A15B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-7 h-7 opacity-75 mb-2" />
        <span className="text-xs font-serif-editorial opacity-85 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
