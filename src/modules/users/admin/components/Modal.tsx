import React from "react";
import "../styles/modal.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  onReject?: () => void;          // Nuevo
  confirmText?: string;
  rejectText?: string;            // Nuevo
  cancelText?: string;
};

const Modal = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  onReject,
  confirmText = "Confirmar",
  rejectText = "Rechazar",
  cancelText = "Cancelar",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div className="modal-actions">
          {/* Botón rechazar solo si onReject está definido */}
          {onReject && (
            <button className="reject-btn" onClick={onReject}>
              {rejectText}
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
