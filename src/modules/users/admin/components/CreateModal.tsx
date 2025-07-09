import "../styles/modal.css";
import { useState } from "react";
import { requestApi } from "@/modules/js/resquestApi";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  endpoint: string; // 👈 Endpoint dinámico
  title: string;    // 👈 Título dinámico
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
        url: endpoint, // 🔁 Aquí es dinámico
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
            <h4>Información</h4>

            <div className="user-data-row">
              <label>Nombre:</label>
              <input
                type="text"
                value={form.name}
                placeholder="Ej. Categoría A"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="user-data-row">
              <label>Descripción:</label>
              <textarea
                value={form.description}
                placeholder="Descripción detallada..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="user-data-row">
              <label>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={() => setForm({ ...form, isActive: !form.isActive })}
                />
                Activa
              </label>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-btn" onClick={handleCreate} disabled={loading}>
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
