"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const cardStyle = {
    padding: "1.5rem",
    background: "rgba(255,255,255,0.07)",
    borderRadius: "12px",
    color: "white",
    marginBottom: "2rem",
    boxShadow: "0 0 12px rgba(59,130,246,0.4)",
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        padding: "2rem",
      }}
    >
      {/* Floating background effects */}
      <div style={{
        position: "absolute", top: "-100px", left: "-100px",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
        borderRadius: "50%", animation: "float 10s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "-120px", right: "-120px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(14,165,233,0.4), transparent 70%)",
        borderRadius: "50%", animation: "float2 12s ease-in-out infinite", zIndex: 0,
      }} />
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <main style={{ maxWidth: "1280px", margin: "0 auto", zIndex: 1 }}>
        {/* Profile Photo and Name */}
        <motion.div
          variants={itemVariants}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Image
            src="/My-photo.jfif"
            alt="Mouli Reddy"
            width={150}
            height={150}
            style={{
              borderRadius: "50%",
              border: "4px solid #38bdf8",
              boxShadow: "0 0 10px rgba(59,130,246,0.6)",
              objectFit: "cover"
            }}
          />
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginTop: "1rem"
          }}>
            Mouli 
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1rem" }}>
            Frontend Engineer | React.js | Next.js | UI Enthusiast
          </p>
        </motion.div>

        {/* Profile Summary */}
        <motion.section variants={itemVariants} style={cardStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Profile Summary</h2>
          <p style={{ lineHeight: "1.8" }}>
            A highly skilled Frontend Developer with experience in building scalable, responsive, and pixel-perfect web interfaces. I specialize in JavaScript, React.js, Redux, Next.js, and TypeScript. I’m passionate about turning design into functional UI/UX with strong attention to performance and clean architecture.
          </p>
        </motion.section>

        {/* Core Competencies */}
        <motion.section variants={itemVariants} style={cardStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Core Competencies</h2>
          <ul style={{ listStyle: "inside", lineHeight: "1.8" }}>
            <li>UI/UX Design Implementation</li>
            <li>Component-based Architecture using React</li>
            <li>State Management with Redux and Redux-Toolkit</li>
            <li>Micro Frontends and Modular Development</li>
            <li>Agile Methodology & Story Grooming</li>
            <li>Reusable Component Libraries</li>
            <li>Frontend Testing using Jest & RTL</li>
            <li>Responsive Web Development</li>
          </ul>
        </motion.section>

        {/* Professional Experience (Without Dates) */}
        <motion.section variants={itemVariants} style={cardStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Professional Experience</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li><strong>Associate Consultant</strong> at <em>ITC Infotech</em></li>
            <li><strong>Frontend Engineer</strong> at <em>Binder-sa</em> (Remote)</li>
            <li><strong>Senior Software Engineer</strong> at <em>Onward Technologies</em></li>
            <li><strong>Software Engineer</strong> at <em>FIDEL TECHNOLOGY</em></li>
          </ul>
        </motion.section>

        {/* Technology Stack */}
        <motion.section variants={itemVariants} style={cardStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Skills & Technologies</h2>
          <p><strong>Frontend:</strong> HTML5, CSS3, Sass, Bootstrap, JavaScript, TypeScript</p>
          <p><strong>Frameworks:</strong> React.js, Next.js, Redux, Redux-Thunk, Redux Toolkit</p>
          <p><strong>Testing:</strong> Jest with React Testing Library</p>
          <p><strong>Other Tools:</strong> GraphQL, Material UI, VS Code, Sublime</p>
          <p><strong>Patterns:</strong> Singleton, Component Reusability, Modularization</p>
          <p><strong>OS:</strong> Windows, macOS</p>
        </motion.section>

        {/* Academic Details (No Dates) */}
        <motion.section variants={itemVariants} style={cardStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Education</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li><strong>B.Tech in Computer Science Engineering</strong> from JNTU College of Engineering, Anantapur</li>
            <li><strong>Intermediate</strong> from Sri Satyam Junior College, Sullurpeta</li>
            <li><strong>SSC</strong> from Z.P. High School, Vatambedu, Nellore</li>
          </ul>
        </motion.section>

        {/* Final CTA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              padding: "1rem 2rem",
              background: "#10b981",
              color: "white",
              borderRadius: "9999px",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 0 20px rgba(16,185,129,0.4)",
              animation: "pulse 2s infinite",
              cursor: "pointer",
            }}
          >
            🌟 Let’s Collaborate and Build Engaging Web Experiences!
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
