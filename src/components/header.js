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
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const linkBaseStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    display: "inline-block",
    marginBottom: isMobile ? "1rem" : 0,
  };

  const linkHoverStyle = {
    background: "rgba(255,255,255,0.2)",
    color: "#facc15",
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "1rem 0rem",
        background: "linear-gradient(135deg, rgba(30,64,175,0.85), rgba(59,130,246,0.85))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left section: Menu + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          )}

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
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
              gap: "2rem",
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
              >
                <Link
                  href={item.path}
                  style={linkBaseStyle}
                  onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.target.style, linkBaseStyle)}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              listStyle: "none",
              padding: "1rem 2rem",
              marginTop: "1rem",
              background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              borderRadius: "0 0 12px 12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={linkBaseStyle}
                  onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.target.style, linkBaseStyle)}
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
