import React from "react";

interface ModalDetailsProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  // objetives: string;
  // setObjetives: (v: string) => void;
  userId: string;
  handleFormatToggle: (f: string) => void;
  subjects: any[];
  categories: any[];
  technologies: any[];
  selectedSubject: string;
  setSelectedSubject: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedTechnologies: string[];
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  // objetives,
  // setObjetives,
  userId,
  handleFormatToggle,
  subjects,
  categories,
  technologies,
  selectedSubject,
  setSelectedSubject,
  selectedCategory,
  setSelectedCategory,
  selectedTechnologies,
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

    {/* <label htmlFor="">Objetivos</label>
    <textarea
      className="modal-description-input"
      placeholder="Descripción de los objetivos..."
      // value={objetives}
      // onChange={e => setObjetives(e.target.value)}
    /> */}

    <input type="text" value={userId} readOnly hidden />

    <div className="modal-row-selects">
      <div className="modal-select-group">
        <label htmlFor="materia">Materia</label>
        <select name="materia" id="materia" className="modal-select" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">Selecciona una materia</option>
          {subjects.map((subject: any) => (
            <option key={subject.id} value={subject.id}>{subject.name || subject.nombre || subject.title}</option>
          ))}
        </select>
      </div>
      <div className="modal-select-group">
        <label htmlFor="categoria">Categoría</label>
        <select name="categoria" id="categoria" className="modal-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          {categories.map((cat: any) => (
            
            <option key={cat.id} value={cat.id}>{cat.name || cat.nombre || cat.title}</option>
          ))}
        </select>
      </div>
    </div>

    <label htmlFor="">Tecnologías</label>
    <div className="modal-formats-list">
      {technologies.map((tech: any) => (
        <label key={tech.id} className={`modal-format-option${selectedTechnologies.includes(tech.id) ? " selected" : ""}`}>
          <input
            type="checkbox"
            checked={selectedTechnologies.includes(tech.id)}
            onChange={() => handleFormatToggle(tech.id)}
            className="modal-format-checkbox"
          />
          <span className="modal-format-label">{tech.name || tech.nombre || tech.title}</span>
        </label>
      ))}
    </div>
    
  </>
);

export default ModalDetails;
