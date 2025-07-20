import React, { useState } from "react";
import "../styles/evaluateprojectmodal.css"; // estilos definidos

type EvaluateProjectModalProps = {
  projectTitle: string;
  onClose: () => void;
  onSubmit: (score: number, feedback: string) => void;
};

const EvaluateProjectModal: React.FC<EvaluateProjectModalProps> = ({
  projectTitle,
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
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Evaluar Proyecto: {projectTitle}</h2>

        <div className="modal-section">
          <label className="modal-upload-label">Puntaje (0-100):</label>
          <input
            type="number"
            value={score}
            className="modal-title-input"
            onChange={(e) => setScore(Number(e.target.value))}
          />

          <label className="modal-upload-label">Retroalimentación:</label>
          <textarea
            value={feedback}
            className="modal-description-input"
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="modal-correct-btn" onClick={handleSubmit}>
            Guardar Evaluación
          </button>
          <button className="modal-next-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateProjectModal;
