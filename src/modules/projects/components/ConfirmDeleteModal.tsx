import React from "react";
import "../styles/cardproject.css";

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  projectTitle?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onConfirm, onCancel, projectTitle }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3 style={{marginBottom: 12}}>¿Eliminar proyecto?</h3>
        <p style={{marginBottom: 18, color: '#8a2d3c', fontWeight: 500}}>
          {projectTitle ? `¿Seguro que deseas eliminar "${projectTitle}"?` : "¿Seguro que deseas eliminar este proyecto?"}
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
