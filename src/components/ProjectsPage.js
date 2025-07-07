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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        .container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 1.5rem 1rem;
          flex-grow: 1;
          position: relative;
          z-index: 1;
          overflow-x: hidden;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          width: 100%;
          max-width: 100%;
        }
        .section {
          margin-bottom: 2rem;
        }
        .title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .no-projects {
          text-align: center;
          color: #718096;
          font-size: 1rem;
          grid-column: 1 / -1;
        }
        @media (min-width: 640px) {
          .container {
            padding: 2rem 1.5rem;
          }
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .title {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
          }
          .no-projects {
            font-size: 1.1rem;
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .container {
            padding: 2.5rem 2rem;
          }
          .section {
            margin-bottom: 3rem;
          }
        }
      `}</style>
      <main className="container">
        <motion.section className="section" variants={itemVariants}>
          <h2 className="title">My Projects</h2>
          <div className="grid">
            {resumeData.projects?.length > 0 ? (
              resumeData.projects.map((project, index) =>
                project ? <ProjectCard key={index} project={project} /> : null
              )
            ) : (
              <p className="no-projects">No projects available</p>
            )}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}