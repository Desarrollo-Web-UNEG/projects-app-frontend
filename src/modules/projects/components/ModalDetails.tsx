import React from "react";

interface ModalDetailsProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
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
  projectLink?: string;
  setProjectLink?: (link: string) => void;

  academicPeriods?: any[];
  selectedAcademicPeriod?: string;
  setSelectedAcademicPeriod?: (v: string) => void;

  // NUEVAS props para el archivo
  projectFile?: File | null;
  setProjectFile?: (file: File | null) => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
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
  academicPeriods = [],
  selectedAcademicPeriod = "",
  setSelectedAcademicPeriod = () => {},

  projectFile,
  setProjectFile,
  projectLink,
  setProjectLink,
}) => (
  <>
    <input
      className="modal-title-input"
      type="text"
      placeholder="Título del proyecto o tarea..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
      className="modal-description-input"
      placeholder="Descripción del proyecto o tarea..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <input type="text" value={userId} readOnly hidden />

    {academicPeriods.length > 0 && (
      <div className="modal-select-group">
        <label htmlFor="academic-period">Periodo Académico</label>
        <select
          id="academic-period"
          className="modal-select"
          value={selectedAcademicPeriod}
          onChange={(e) => setSelectedAcademicPeriod(e.target.value)}
        >
          <option value="">Selecciona un periodo</option>
          {academicPeriods.map((period: any) => (
            <option key={period.id} value={period.id}>
              {period.description}
            </option>
          ))}
        </select>
      </div>
    )}

    <div className="modal-row-selects">
      <div className="modal-select-group">
        <label htmlFor="materia">Materia</label>
        <select
          name="materia"
          id="materia"
          className="modal-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Selecciona una materia</option>
          {subjects.map((subject: any) => (
            <option key={subject.id} value={subject.id}>
              {subject.name || subject.nombre || subject.title}
            </option>
          ))}
        </select>
      </div>
      <div className="modal-select-group">
        <label htmlFor="categoria">Categoría</label>
        <select
          name="categoria"
          id="categoria"
          className="modal-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name || cat.nombre || cat.title}
            </option>
          ))}
        </select>
      </div>
    </div>

    <label htmlFor="">Tecnologías</label>
    <div className="modal-formats-list">
      {technologies.map((tech: any) => (
        <label
          key={tech.id}
          className={`modal-format-option${
            selectedTechnologies.includes(tech.id) ? " selected" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={selectedTechnologies.includes(tech.id)}
            onChange={() => handleFormatToggle(tech.id)}
            className="modal-format-checkbox"
          />
          <span className="modal-format-label">
            {tech.name || tech.nombre || tech.title}
          </span>
        </label>
      ))}
    </div>

<div className="modal-upload-group">
  {setProjectFile && (
    <div className="modal-upload-item">
      <label htmlFor="project-file" className="modal-upload-label">
        📎 Archivo del proyecto
      </label>
      <input
        type="file"
        id="project-file"
        accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setProjectFile(file);
          else setProjectFile(null);
        }}
        className="modal-file-input"
      />
      {projectFile && (
        <div className="modal-file-name">{projectFile.name}</div>
      )}
    </div>
  )}

  {setProjectLink && (
    <div className="modal-upload-item">
      <label htmlFor="project-link" className="modal-upload-label">
        🔗 Enlace del proyecto
      </label>
      <input
        type="url"
        id="project-link"
        className="modal-link-input"
        placeholder="https://github.com/usuario/repositorio"
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
      />
    </div>
  )}
</div>
  </>
);

export default ModalDetails;
