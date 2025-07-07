"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  if (!project) {
    return (
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          padding: "1rem",
          textAlign: "center",
          color: "#64748b",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "100%",
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
        padding: "1rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
      aria-label={`Project: ${project.title || "Untitled Project"}`}
    >
      <style jsx>{`
        .card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .accent-line {
          height: 4px;
          width: 100%;
          background: linear-gradient(to right, #0ea5e9, #f59e0b);
          position: absolute;
          top: 0;
          left: 0;
        }
        .title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .client,
        .tools,
        .description,
        .responsibilities-title {
          font-size: 0.875rem;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .description {
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 0.75rem;
        }
        .responsibilities-title {
          font-weight: 600;
          color: #334155;
        }
        .responsibilities-list {
          padding-left: 1.25rem;
          line-height: 1.6;
          color: #475569;
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .card {
            padding: 1.5rem;
          }
          .title {
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .client,
          .tools,
          .description,
          .responsibilities-title {
            font-size: 1rem;
          }
          .responsibilities-list {
            font-size: 0.875rem;
          }
        }
      `}</style>
      <div className="card">
        {/* Accent Line */}
        <div className="accent-line" />

        {/* Title */}
        <h3 className="title">{project.title || "Untitled Project"}</h3>

        {/* Client */}
        <p className="client">
          <strong>Client:</strong> {project.client || "N/A"}
        </p>

        {/* Tools */}
        <p className="tools">
          <strong>Tools Used:</strong> {project.tools?.join(", ") || "N/A"}
        </p>

        {/* Description */}
        <p className="description">
          {project.description || "No description available"}
        </p>

        {/* Responsibilities */}
        <div>
          <p className="responsibilities-title">Responsibilities:</p>
          <ul className="responsibilities-list">
            {project.role?.length > 0 ? (
              project.role.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No responsibilities specified</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}