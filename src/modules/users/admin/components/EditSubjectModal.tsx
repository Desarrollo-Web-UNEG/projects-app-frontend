import React, { useState } from "react";

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }) => void;
  subject: { id: number; name: string; description: string; isActive: boolean };
}

const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subject,
}) => {
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);
  const [isActive, setIsActive] = useState(subject.isActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: subject.id, name, description, isActive });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-subject-modal">
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Modo Edicion</h2>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <div className="form-row">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-text"
            />
          </div>

          {description !== undefined && (
            <div className="form-row">
              <label>Descripción:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="input-textarea"
                rows={3}
              />
            </div>
          )}

          {isActive !== undefined && (
            <div
              className="form-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 24,
              }}
            >
              <label style={{ marginRight: 8, fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ marginRight: 4 }}
                />
                Activo
              </label>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content.edit-subject-modal {
          background: #fff;
          padding: 32px 32px 24px 32px;
          border-radius: 16px;
          min-width: 320px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
        }
        .edit-subject-modal .form-row {
          margin-bottom: 18px;
        }
        .edit-subject-modal label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .edit-subject-modal .input-text,
        .edit-subject-modal .input-textarea {
          width: 100%;
          border: 1px solid #bbb;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 1rem;
          margin-bottom: 0;
          background: #fafbfc;
          transition: border 0.2s;
        }
        .edit-subject-modal .input-text:focus,
        .edit-subject-modal .input-textarea:focus {
          border: 1.5px solid #7a1b2c;
          outline: none;
        }
        .edit-subject-modal textarea {
          resize: vertical;
        }
      `}</style>
    </div>
  );
};

export default EditSubjectModal;
