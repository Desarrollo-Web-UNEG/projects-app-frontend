import React, { useState } from "react";
import "../styles/evaluateprojectmodal.css";

type EvaluateProjectModalProps = {
  project: any;
  onClose: () => void;
  onSubmit: (score: number, feedback: string) => void;
};

const EvaluateProjectModal: React.FC<EvaluateProjectModalProps> = ({
  project,
  onClose,
  onSubmit,
}) => {
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (score < 0 || score > 100) {
      alert("El puntaje debe estar entre 0 y 100.");
      return;
    }
    onSubmit(score, feedback);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>

        <h2 className="modal-title">Evaluar Proyecto: {project.title}</h2>

        {/* Vista previa del proyecto */}
        <div className="preview-grid">
          <div className="preview-card">
            <h3>📌 Información General</h3>
            <p><strong>Título:</strong> {project.title}</p>
            <p><strong>Descripción:</strong> {project.description || "No proporcionada"}</p>
            {project.academicPeriod?.description && (
              <p><strong>Periodo Académico:</strong> {project.academicPeriod.description}</p>
            )}
            {project.subject?.name && (
              <p><strong>Materia:</strong> {project.subject.name}</p>
            )}
            {project.category?.name && (
              <p><strong>Categoría:</strong> {project.category.name}</p>
            )}
          </div>

          <div className="preview-card">
            <h3>🛠 Tecnologías</h3>
            {project.technologies?.length > 0 ? (
              <ul>
                {project.technologies.map((t: any, i: number) => (
                  <li key={i}>{t.name}</li>
                ))}
              </ul>
            ) : (
              <p>No especificadas</p>
            )}
          </div>

          <div className="preview-card">
            <h3>🔗 Recursos</h3>
            {project.projectLink ? (
              <p>
                <strong>Enlace:</strong>{" "}
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  {project.projectLink}
                </a>
              </p>
            ) : (
              <p>No hay enlace disponible</p>
            )}
            {project.projectFile ? (
              <p>
                <strong>Archivo:</strong>{" "}
                <a
                  href={`https://api.ejemplo.com/uploads/${project.projectFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Ver archivo adjunto
                </a>
              </p>
            ) : (
              <p>No hay archivo adjunto</p>
            )}
          </div>
        </div>

        {/* Evaluación */}
        <div className="evaluation-section">
          <label htmlFor="score-input" className="modal-label">Puntaje (0-100):</label>
          <input
            id="score-input"
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            min={0}
            max={100}
            className="modal-input"
            placeholder="Ej: 85"
          />

          <label htmlFor="feedback-textarea" className="modal-label">Retroalimentación:</label>
          <textarea
            id="feedback-textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escribe comentarios para el estudiante..."
            className="modal-textarea"
          />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={score < 0 || score > 100}>
            Guardar Evaluación
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateProjectModal;
