"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        color: '#ffffff',
        padding: '1.5rem',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 -4px 10px rgba(0,0,0,0.3)',
      }}
    >
      <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>© 2025 Mouli. All rights reserved.</p>
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { href: 'mailto:mouli.v598@gmail.com', text: 'Email' },
          { href: 'https://linkedin.com', text: 'LinkedIn' },
          { href: 'https://github.com', text: 'GitHub' },
        ].map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            style={{
              color: '#f59e0b',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(245, 158, 11, 0.1)';
              e.target.style.color = '#48bb78';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#f59e0b';
            }}
          >
            {link.text}
          </a>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 480px) {
          p, a {
            font-size: 0.9rem;
          }
          div {
            gap: 1rem;
          }
        }
      `}</style>
    </motion.footer>
  );
}