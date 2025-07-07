"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Resume", path: "/resume" },
    { name: "Projects", path: "/project" },
  ];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false); // Close menu on desktop
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const linkBaseStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: isMobile ? "0.875rem" : "1rem",
    fontWeight: "600",
    padding: isMobile ? "0.5rem 1.25rem" : "0.5rem 1.5rem",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    transition: "all 0.3s ease",
    display: "block",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  };

  const linkHoverStyle = {
    background: "rgba(255, 255, 255, 0.25)",
    color: "#facc15",
    transform: "scale(1.05)",
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        maxWidth: "100%",
        zIndex: 1000,
        padding: isMobile ? "0.75rem" : "1rem",
        background: "linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(59, 130, 246, 0.9))",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: isMobile ? "0 1rem" : "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* Left section: Menu + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "0.5rem",
                borderRadius: "8px",
                transition: "background 0.3s ease",
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "✕" : "☰"}
            </motion.button>
          )}

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: "800",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            Mouli<span style={{ color: "#facc15" }}> Portfolio</span>
          </motion.h1>
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              gap: isMobile ? "1rem" : "1.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{ boxSizing: "border-box" }}
              >
                <Link
                  href={item.path}
                  style={linkBaseStyle}
                  onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.target.style, linkBaseStyle)}
                  onFocus={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onBlur={(e) => Object.assign(e.target.style, linkBaseStyle)}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.ul
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "1.25rem",
              margin: 0,
              background: "linear-gradient(135deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.95))",
              backdropFilter: "blur(10px)",
              borderRadius: "0 0 16px 16px",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx + 0.2, duration: 0.3 }}
                style={{ marginBottom: "0.5rem", boxSizing: "border-box" }}
              >
                <Link
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={linkBaseStyle}
                  onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.target.style, linkBaseStyle)}
                  onFocus={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onBlur={(e) => Object.assign(e.target.style, linkBaseStyle)}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
