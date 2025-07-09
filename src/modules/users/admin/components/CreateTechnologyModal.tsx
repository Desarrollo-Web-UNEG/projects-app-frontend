import React, { useState } from "react";
import "../styles/modal.css";

interface CreateTechnologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  endpoint: string;
}

const CreateTechnologyModal: React.FC<CreateTechnologyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  endpoint,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Error al crear tecnología");

      setName("");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="subject-form-container">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? "Guardando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTechnologyModal;
