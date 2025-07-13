
import React, { useEffect, useState } from "react";
import "../styles/modal.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  userData?: {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    id?: string;
    role?: string;
    requestDate?: string;
    user_type?: string;
    id_number?: string;
  };
  onClose: () => void;
  onConfirm: (materiasSeleccionadas: string[]) => void;
  onReject?: () => void;
  confirmText?: string;
  rejectText?: string;
  cancelText?: string;
  selectedMaterias: string[];
  setSelectedMaterias: React.Dispatch<React.SetStateAction<string[]>>;
};


import { getSubjects } from "@/modules/projects/services/catalogService";

const Modal = ({
  isOpen,
  title,
  userData,
  onClose,
  onConfirm,
  onReject,
  confirmText = "Aprobar",
  rejectText = "Rechazar",
  cancelText = "Cancelar",
  selectedMaterias,
  setSelectedMaterias,
}: ModalProps) => {
  const [materiasList, setMateriasList] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      const token = localStorage.getItem("access_token") || "";
      try {
        const data = await getSubjects(token);
        setMateriasList(Array.isArray(data) ? data : []);
      } catch (error) {
        setMateriasList([]);
      }
    };
    if (isOpen && userData?.user_type === 'professor') {
      fetchMaterias();
    }
  }, [isOpen, userData]);

  const handleMateriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedMaterias((prev) =>
      prev.includes(value)
        ? prev.filter((m) => m !== value)
        : [...prev, value]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>
        
        {userData && (
          <div className="user-data-container">
            <h3>Datos de Usuario</h3>
            
            <div className="user-data-section">
              <h4>Verifica la Solicitud de Usuario</h4>
              
              <p className="user-data-field">
                <strong>Fecha de Solicitud:</strong> {userData.requestDate || "27/05/2025"}
              </p>

              <div className="user-data-grid">
                <div className="user-data-row">
                  <span>Nro. Cédula:</span>
                  <span>{userData.id_number || "10.123.145"}</span>
                </div>
                <div className="user-data-row">
                  <span>Correo:</span>
                  <span>{userData.email || "izagg@gmail.com"}</span>
                </div>
                
                <div className="user-data-row">
                  <span>Nombre:</span>
                  <span>
                    {userData.name} {userData.lastName}
                  </span>
                </div>
                
                <div className="user-data-row">
                  <span>Teléfono:</span>
                  <span>{userData.phone}</span>
                </div>
                
                <div className="user-data-row">
                  <span>Rol:</span>
                  <span>{userData.user_type == 'professor' ? "Profesor" : "Estudiante"}</span>
                </div>


            
{/* Seleccionar varias materias para 1 profesor */}
                {userData.user_type === 'professor' && (
                  <div className="user-data-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span>Materias asignadas:</span>
                    <div className="materias-checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                      {materiasList.length === 0 ? (
                        <span style={{ color: '#888' }}>No hay materias registradas</span>
                      ) : (
                        materiasList.map((materia) => (
                          <label key={materia.id} style={{ fontWeight: 400, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <input
                              type="checkbox"
                              value={materia.id}
                              // checked={selectedMaterias.includes(materia.id)}
                              onChange={handleMateriaChange}
                              className="modal-format-checkbox"
                            />
                            {materia.name}
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                )}

                


              </div>
            </div>
            {/* Se eliminó la sección del soción */}
          </div>
        )}

        <div className="modal-actions">
          {onReject && (
            <button className="reject-btn" onClick={onReject}>
              {rejectText}
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
          <button className="confirm-btn" onClick={() => onConfirm(selectedMaterias)}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;