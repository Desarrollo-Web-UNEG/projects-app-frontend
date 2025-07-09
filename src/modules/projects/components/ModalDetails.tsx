import React from "react";

interface ModalDetailsProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  objetives: string;
  setObjetives: (v: string) => void;
  allowedFormats: string[];
  userId: string;
  handleFormatToggle: (f: string) => void;
  goNext: () => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  objetives,
  setObjetives,
  userId,
  allowedFormats,
  handleFormatToggle,
  goNext,
}) => (
  <>
    <input
      className="modal-title-input"
      type="text"
      placeholder="Título del proyecto o tarea..."
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
    <textarea
      className="modal-description-input"
      placeholder="Descripción del proyecto o tarea..."
      value={description}
      onChange={e => setDescription(e.target.value)}
    />

    <label htmlFor="">Objetivos</label>
    <textarea
      className="modal-description-input"
      placeholder="Descripción de los objetivos..."
      value={objetives}
      onChange={e => setObjetives(e.target.value)}
    />

    <input type="text" value={userId} readOnly hidden />

    <div className="modal-row-selects">
      <div className="modal-select-group">
        <label htmlFor="materia">Materia</label>
        <select name="materia" id="materia" className="modal-select">
          <option value="">Selecciona una materia</option>
          <option value="mat1">Matemáticas</option>
        </select>
      </div>
      <div className="modal-select-group">
        <label htmlFor="categoria">Categoría</label>
        <select name="categoria" id="categoria" className="modal-select">
          <option value="">Selecciona una categoría</option>
          <option value="cat1">Desarrollo web</option>
        </select>
      </div>
    </div>

    <label htmlFor="">Tecnologias</label>
     <div className="modal-formats-list">
      {["PHP", "REACT", "NESTJS", "NODE", "OTRO"].map(format => (
        <label key={format} className={`modal-format-option${allowedFormats.includes(format) ? " selected" : ""}`}> 
          <input
            type="checkbox"
            checked={allowedFormats.includes(format)}
            onChange={() => handleFormatToggle(format)}
            className="modal-format-checkbox"
          />
          <span className="modal-format-label">{format}</span>
        </label>
      ))}
    </div>
    
    <div className="modal-footer">
      <button className="modal-next-btn" style={{ background: '#8a2d3c' }} onClick={goNext}>Subir Proyecto</button>
    </div>
  </>
);

export default ModalDetails;
