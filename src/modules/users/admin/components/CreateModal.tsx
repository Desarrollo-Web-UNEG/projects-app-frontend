import "../styles/createmodal.css";
import { useState } from "react";
import { requestApi } from "@/modules/js/resquestApi";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  endpoint: string;
  title: string;
};

const CreateModal = ({ isOpen, onClose, onSuccess, endpoint, title }: CreateModalProps) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const { name, description, isActive } = form;

    if (!name || !description) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      await requestApi({
        url: endpoint,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: {
          name,
          description,
          isActive,
        },
      });

      onSuccess();
      onClose();
      setForm({ name: "", description: "", isActive: true });
    } catch (error) {
      alert("Error al crear el elemento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>

        <div className="user-data-container">
          <div className="user-data-section">
            <h4>Datos de la Categoría</h4>

            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={form.name}
                placeholder="Ej. Categoría A"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                value={form.description}
                placeholder="Descripción detallada..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="divider"></div>

            <div className="status-section">
              <h5>Estatus:</h5>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={() => setForm({ ...form, isActive: !form.isActive })}
                  />
                  <span className="checkbox-custom"></span>
                  Activo
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={!form.isActive}
                    onChange={() => setForm({ ...form, isActive: !form.isActive })}
                  />
                  <span className="checkbox-custom"></span>
                  Inactivo
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="confirm-btn" onClick={handleCreate} disabled={loading}>
            {loading ? (
              <span className="loading-text">
                Creando...
                <span className="loading-spinner"></span>
              </span>
            ) : (
              "Crear"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;