"use client";
import { motion } from "framer-motion";
import resumeData from "@/data/resumeData";
import ProjectCard from "./ProjectCard";

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <main
        style={{
          maxWidth: '1280px',
          margin: ' 0 100px auto 80px',
          padding: '1.5rem',
          flexGrow: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1.5rem',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            My Projects
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <style jsx>{`
              @media (max-width: 768px) {
                div {
                  grid-template-columns: 1fr;
                }
                h2 {
                  font-size: 1.8rem;
                }
              }
            `}</style>
            {resumeData.projects?.length > 0 ? (
              resumeData.projects.map((project, index) => (
                project ? <ProjectCard key={index} project={project} /> : null
              ))
            ) : (
              <p
                style={{ textAlign: 'center', color: '#718096', gridColumn: '1 / -1', fontSize: '1.1rem' }}
              >
                No projects available
              </p>
            )}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}