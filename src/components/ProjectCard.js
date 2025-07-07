"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  if (!project) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "1rem",
          padding: "1.5rem",
          textAlign: "center",
          color: "#64748b",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <p>No project data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "1rem",
        padding: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent Line */}
      <div
        style={{
          height: "4px",
          width: "100%",
          background: "linear-gradient(to right, #0ea5e9, #f59e0b)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "0.75rem",
        }}
      >
        {project.title || "Untitled Project"}
      </h3>

      {/* Client */}
      <p
        style={{
          fontSize: "1rem",
          color: "#475569",
          marginBottom: "0.5rem",
        }}
      >
        <strong>Client:</strong> {project.client || "N/A"}
      </p>

      {/* Tools */}
      <p
        style={{
          fontSize: "0.95rem",
          color: "#475569",
          marginBottom: "0.5rem",
        }}
      >
        <strong>Tools Used:</strong> {project.tools?.join(", ") || "N/A"}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "1rem",
          color: "#64748b",
          lineHeight: "1.6",
          marginBottom: "0.75rem",
        }}
      >
        {project.description || "No description available"}
      </p>

      {/* Responsibilities */}
      <div style={{ marginTop: "1rem" }}>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#334155",
            marginBottom: "0.5rem",
          }}
        >
          Responsibilities:
        </p>
        <ul
          style={{
            paddingLeft: "1.5rem",
            lineHeight: "1.6",
            color: "#475569",
          }}
        >
          {project.role?.length > 0 ? (
            project.role.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>No responsibilities specified</li>
          )}
        </ul>
      </div>
    </motion.div>
  );
}
