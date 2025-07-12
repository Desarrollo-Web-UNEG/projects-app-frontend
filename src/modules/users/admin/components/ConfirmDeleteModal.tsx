import React from "react";
import "../../../projects/styles/cardproject.css";

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  subjectName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onConfirm, onCancel, subjectName }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3 style={{marginBottom: 12}}>¿Eliminar materia?</h3>
        <p style={{marginBottom: 18, color: '#8a2d3c', fontWeight: 500}}>
          {subjectName ? `¿Seguro que deseas eliminar la materia "${subjectName}"?` : "¿Seguro que deseas eliminar esta materia?"}
        </p>
        <div className="confirm-modal-actions">
          <button className="card-btn-delete confirm-btn" onClick={onConfirm}>Eliminar</button>
          <button className="card-btn-cancel confirm-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
