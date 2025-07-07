"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import resumeData from "@/data/resumeData";
import ProjectCard from "./ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const sectionCard = {
  background: "rgba(255,255,255,0.9)",
  padding: "1.5rem",
  borderRadius: "1rem",
  marginBottom: "2rem",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
};

export default function Resume() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#0f172a",
        fontFamily: "'Inter', sans-serif",
        padding: "2rem 1rem",
      }}
    >
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
       

        {/* Contact Info */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> {resumeData.email}</p>
          <p><strong>Phone:</strong> {resumeData.phone}</p>
        </motion.section>

        {/* Experience */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Professional Experience</h2>
          {resumeData.organizationalExperience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: "600" }}>{exp.role}</h3>
              <p>{exp.company}</p>
            </div>
          ))}
        </motion.section>

        {/* Profile Summary */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Profile Summary</h2>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
            {resumeData.profileSummary.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.section>

        {/* Core Competencies */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Core Competencies</h2>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
            {resumeData.coreCompetencies.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.section>

        {/* Key Result Areas */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Key Result Areas</h2>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
            {resumeData.keyResultAreas.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.section>

        {/* Technologies */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Technologies</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            {resumeData.technologies.map((tech, index) => (
              <span
                key={index}
                style={{
                  background: "#f1f5f9",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* IT Skills */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>IT Skills</h2>
          <div>
            <strong>Technologies:</strong>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {resumeData.itSkills.technologies.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
            <strong>Editing Tools:</strong>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {resumeData.itSkills.editingTools.map((tool, i) => (
                <li key={i}>{tool}</li>
              ))}
            </ul>
            <strong>Design Patterns:</strong>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {resumeData.itSkills.designPatterns.map((pattern, i) => (
                <li key={i}>{pattern}</li>
              ))}
            </ul>
            <strong>Operating Systems:</strong>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {resumeData.itSkills.operatingSystems.map((os, i) => (
                <li key={i}>{os}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Academic Details */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Academic Details</h2>
          {resumeData.academicDetails.map((edu, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <p><strong>{edu.degree}</strong></p>
              <p>{edu.institution}</p>
            </div>
          ))}
        </motion.section>

        {/* Projects */}
        <motion.section variants={itemVariants} style={sectionCard}>
          <h2>Projects Undertaken</h2>
          {resumeData.projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.section>
      </main>
    </motion.div>
  );
}
