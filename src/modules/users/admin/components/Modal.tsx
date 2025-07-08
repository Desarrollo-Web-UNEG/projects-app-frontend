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
    requesterName?: string;
    requesterDate?: string;
  };
  onClose: () => void;
  onConfirm: () => void;
  onReject?: () => void;
  confirmText?: string;
  rejectText?: string;
  cancelText?: string;
};

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
}: ModalProps) => {
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
                <strong>Fecha de Solicitud:</strong> {userData.requestDate || "27/06/2026"}
              </p>

              <div className="user-data-grid">
                <div className="user-data-row">
                  <span>Nro. Cédula:</span>
                  <span>{userData.id || "10.123.145"}</span>
                </div>
                
                <div className="user-data-row">
                  <span>Correo:</span>
                  <span>{userData.email || "loogg@gmail.com"}</span>
                </div>
                
                <div className="user-data-row">
                  <span>Nombre:</span>
                  <span>
                    {userData.name || "Isobelio Esterionio"} {userData.lastName || "Gonzalez García"}
                  </span>
                </div>
                
                <div className="user-data-row">
                  <span>Teléfono:</span>
                  <span>{userData.phone || "0412-1478-965"}</span>
                </div>
                
                <div className="user-data-row">
                  <span>Rol:</span>
                  <span>{userData.role || "Profesor"}</span>
                </div>
              </div>
            </div>

            <div className="requester-section">
              <p><strong>Solicitador</strong></p>
              <p>{userData.requesterName || "Isobelia Guadalupe Paparella Salazar"}</p>
              <p><strong>Fecha de solicitud:</strong> {userData.requesterDate || "28/06/2026"}</p>
            </div>
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
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;