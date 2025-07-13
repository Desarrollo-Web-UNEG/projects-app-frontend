import React, { useState, useEffect } from "react";
import { getSubjects, getCategories, getTechnologies } from "../services/catalogService";
import { updateProject } from "../services/projectService";

interface EditProjectFullModalProps {
  project: any;
  onClose: () => void;
  onProjectUpdated?: () => void;
}

const EditProjectFullModal: React.FC<EditProjectFullModalProps> = ({ project, onClose, onProjectUpdated }) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objetives, setObjetives] = useState("");
  const [academicPeriodId, setAcademicPeriodId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [peopleId, setPeopleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token") || "";
      try {
        const [subjectsRes, categoriesRes, technologiesRes] = await Promise.all([
          getSubjects(token),
          getCategories(token),
          getTechnologies(token),
        ]);
        setSubjects(subjectsRes || []);
        setCategories(categoriesRes || []);
        setTechnologies(technologiesRes || []);

        // Setear los valores del proyecto después de cargar catálogos
        setTitle(project.title || "");
        setDescription(project.description || "");
        setObjetives(project.objectives || "");
        // academicPeriodId puede venir como objeto
        if (project.academicPeriod && project.academicPeriod.id) {
          setAcademicPeriodId(String(project.academicPeriod.id));
        } else if (project.academicPeriodId) {
          setAcademicPeriodId(String(project.academicPeriodId));
        } else {
          setAcademicPeriodId("");
        }
        // peopleId puede venir como objeto
        if (project.people && project.people.id) {
          setPeopleId(String(project.people.id));
        } else if (project.peopleId) {
          setPeopleId(String(project.peopleId));
        } else {
          setPeopleId("");
        }
        // subject puede venir como objeto
        if (project.subject && project.subject.id) {
          setSelectedSubject(String(project.subject.id));
        } else if (project.subjectId) {
          setSelectedSubject(String(project.subjectId));
        } else {
          setSelectedSubject("");
        }
        // category puede venir como objeto
        if (project.category && project.category.id) {
          setSelectedCategory(String(project.category.id));
        } else if (project.categoryId) {
          setSelectedCategory(String(project.categoryId));
        } else {
          setSelectedCategory("");
        }
        // technologies puede venir como array de objetos
        if (Array.isArray(project.technologies) && project.technologies.length > 0) {
          setSelectedTechnologies(project.technologies.map((t: any) => String(t.id)));
        } else if (Array.isArray(project.technologyIds)) {
          setSelectedTechnologies(project.technologyIds.map((id: any) => String(id)));
        } else {
          setSelectedTechnologies([]);
        }
      } catch (err) {
        setSubjects([]);
        setCategories([]);
        setTechnologies([]);
        setTitle("");
        setDescription("");
        setObjetives("");
        setAcademicPeriodId("");
        setPeopleId("");
        setSelectedSubject("");
        setSelectedCategory("");
        setSelectedTechnologies([]);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const handleFormatToggle = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    const token = localStorage.getItem("access_token") || "";
    try {
      const data = {
        title,
        description,
        objectives: objetives,
        academicPeriodId,
        subjectId: selectedSubject,
        categoryId: selectedCategory,
        technologyIds: selectedTechnologies,
        peopleId,
      };
      await updateProject(project.id, data, token);
      setSuccessMsg("¡Proyecto actualizado exitosamente!");
      setTimeout(() => {
        setSuccessMsg("");
        if (typeof onProjectUpdated === 'function') onProjectUpdated();
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg("Error al actualizar el proyecto. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 style={{textAlign: 'center', marginBottom: 16}}>Editar Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <label>Título</label>
          <input className="modal-title-input" type="text" value={title} onChange={e => setTitle(e.target.value)} />

          <label>Descripción</label>
          <textarea className="modal-description-input" value={description} onChange={e => setDescription(e.target.value)} />

          {/* <label>Objetivos</label>
          <textarea className="modal-description-input" value={objetives} onChange={e => setObjetives(e.target.value)} /> */}

          {/* <label>Periodo Académico</label> */}
          <input className="modal-title-input" type="text" hidden value={academicPeriodId} onChange={e => setAcademicPeriodId(e.target.value)} />

          <div className="modal-row-selects">
            <div className="modal-select-group">
              <label>Materia</label>
              <select className="modal-select" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                <option value="">Selecciona una materia</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name || subject.nombre || subject.title}</option>
                ))}
              </select>
            </div>
            <div className="modal-select-group">
              <label>Categoría</label>
              <select className="modal-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Selecciona una categoría</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name || cat.nombre || cat.title}</option>
                ))}
              </select>
            </div>
          </div>

          <label>Tecnologías</label>
          <div className="modal-formats-list">
            {technologies.map((tech: any) => (
              <label key={tech.id} className={`modal-format-option${selectedTechnologies.includes(String(tech.id)) ? " selected" : ""}`}>
                <input
                  type="checkbox"
                  checked={selectedTechnologies.includes(String(tech.id))}
                  onChange={() => handleFormatToggle(String(tech.id))}
                  className="modal-format-checkbox"
                />
                <span className="modal-format-label">{tech.name || tech.nombre || tech.title}</span>
              </label>
            ))}
          </div>

          {/* <label>ID de Persona (peopleId)</label> */}
          <input className="modal-title-input" hidden type="text" value={peopleId} onChange={e => setPeopleId(e.target.value)} />

          <div style={{marginTop: 12}}>
            {loading && <span style={{color: '#8a2d3c'}}>Actualizando...</span>}
            {successMsg && <span style={{color: 'green'}}>{successMsg}</span>}
            {errorMsg && <span style={{color: 'red'}}>{errorMsg}</span>}
          </div>
          <div className="modal-footer">
            <button className="modal-next-btn" style={{ background: '#8a2d3c' }} type="submit" disabled={loading}>Actualizar Proyecto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectFullModal;
