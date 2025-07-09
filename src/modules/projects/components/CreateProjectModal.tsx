import React, { useState } from "react";
import "../styles/createprojectmodal.css";
import ModalDetails from "./ModalDetails";


interface CreateProjectModalProps {
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose }) => {
  const [section, setSection] = useState<'detalles' | 'entrega' | 'rubrica'>('detalles');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objetives, setObjetives] = useState("");
  const [allowedFormats, setAllowedFormats] = useState<string[]>(["PDF"]);


  const handleFormatToggle = (format: string) => {
    setAllowedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  // Id del usuario
  const userId = localStorage.getItem('user_id') || '';

 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-tabs">
          <button className={`tab${section === 'detalles' ? ' active' : ''}`} onClick={() => setSection('detalles')}>Detalles del Proyecto</button>
        </div>
        <div className="modal-section">
          {section === 'detalles' && (
            <ModalDetails
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              objetives={objetives}
              setObjetives={setObjetives}
              allowedFormats={allowedFormats}
              userId={userId}
              handleFormatToggle={handleFormatToggle}
              goNext={() => setSection('entrega')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
