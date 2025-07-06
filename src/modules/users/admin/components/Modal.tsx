import React from "react";
import "../styles/modal.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <div className="modal-actions">
          <button onClick={onClose}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};
