"use client";
import { useEffect } from 'react';

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background:
          'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2) 2px, transparent 2px), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 2px, transparent 2px), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)',
        backgroundSize: '150px 150px',
        animation: 'moveParticles 30s linear infinite',
      }}
    >
      <style jsx global>{`
        @keyframes moveParticles {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-150px, -150px);
          }
        }
        @media (max-width: 768px) {
          body > div:first-child {
            background-size: 100px 100px;
            animation: moveParticles 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}