import React, { useState, useEffect } from "react";
import {
  getSubjects,
  getCategories,
  getTechnologies,
  getAcademicPeriods,
} from "../services/catalogService";
import { updateProject } from "../services/projectService";

interface EditProjectFullModalProps {
  project: any;
  onClose: () => void;
  onProjectUpdated?: () => void;
}

const EditProjectFullModal: React.FC<EditProjectFullModalProps> = ({
  project,
  onClose,
  onProjectUpdated,
}) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [academicPeriods, setAcademicPeriods] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objetives, setObjetives] = useState("");
  const [academicPeriodId, setAcademicPeriodId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState("");
  const [peopleId, setPeopleId] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token") || "";
      try {
        const [subjectsRes, categoriesRes, technologiesRes, academicPeriodsRes] = await Promise.all([
          getSubjects(token),
          getCategories(token),
          getTechnologies(token),
          getAcademicPeriods(token),
        ]);
        setSubjects(subjectsRes || []);
        setCategories(categoriesRes || []);
        setTechnologies(technologiesRes || []);
        setAcademicPeriods(academicPeriodsRes || []);
        console.log("📦 Proyecto recibido:", project);

        // Set valores del proyecto
        setTitle(project.title || "");
        setDescription(project.description || "");
        setObjetives(project.objectives || "");
        setProjectLink(project.projectLink || "");

        if (project.academicPeriod?.id) {
          setAcademicPeriodId(String(project.academicPeriod.id));
        } else if (project.academicPeriodId) {
          setAcademicPeriodId(String(project.academicPeriodId));
        }

        if (project.people?.id) {
          setPeopleId(String(project.people.id));
        } else if (project.peopleId) {
          setPeopleId(String(project.peopleId));
        }

        if (project.subject?.id) {
          setSelectedSubject(String(project.subject.id));
        } else if (project.subjectId) {
          setSelectedSubject(String(project.subjectId));
        }

        if (project.category?.id) {
          setSelectedCategory(String(project.category.id));
        } else if (project.categoryId) {
          setSelectedCategory(String(project.categoryId));
        }

        if (Array.isArray(project.technologies)) {
          setSelectedTechnologies(project.technologies.map((t: any) => String(t.id)));
        } else if (Array.isArray(project.technologyIds)) {
          setSelectedTechnologies(project.technologyIds.map((id: any) => String(id)));
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    fetchData();
  }, [project]);

  const handleFormatToggle = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    const token = localStorage.getItem("access_token") || "";

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("objectives", objetives);
      formData.append("academicPeriodId", academicPeriodId);
      formData.append("subjectId", selectedSubject);
      formData.append("categoryId", selectedCategory);
      formData.append("peopleId", peopleId);
      formData.append("projectLink", projectLink);
      selectedTechnologies.forEach((id) => formData.append("technologyIds[]", id));
      if (projectFile) {
        formData.append("projectFile", projectFile);
      }

      await updateProject(project.id, formData, token);
      setSuccessMsg("¡Proyecto actualizado exitosamente!");
      setTimeout(() => {
        setSuccessMsg("");
        onProjectUpdated?.();
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Error al actualizar el proyecto. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Editar Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <label>Título</label>
          <input className="modal-title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Descripción</label>
          <textarea className="modal-description-input" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="modal-select-group">
            <label htmlFor="academic-period">Periodo Académico</label>
            <select
              id="academic-period"
              className="modal-select"
              value={academicPeriodId}
              onChange={(e) => setAcademicPeriodId(e.target.value)}
            >
              <option value="">Selecciona un periodo</option>
              {academicPeriods.map((period: any) => (
                <option key={period.id} value={period.id}>
                  {period.description}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-row-selects">
            <div className="modal-select-group">
              <label>Materia</label>
              <select className="modal-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="">Selecciona una materia</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name || subject.nombre || subject.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-select-group">
              <label>Categoría</label>
              <select className="modal-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Selecciona una categoría</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name || cat.nombre || cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label>Tecnologías</label>
          <div className="modal-formats-list">
            {technologies.map((tech: any) => (
              <label
                key={tech.id}
                className={`modal-format-option${selectedTechnologies.includes(String(tech.id)) ? " selected" : ""}`}
              >
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

          <div className="modal-upload-group">
            <div className="modal-upload-item">
              <label htmlFor="project-file" className="modal-upload-label">📎 Archivo del proyecto</label>
              <input
                type="file"
                id="project-file"
                accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.png"
                onChange={(e) => setProjectFile(e.target.files?.[0] || null)}
                className="modal-file-input"
              />
              {projectFile && <div className="modal-file-name">{projectFile.name}</div>}
            </div>

            <div className="modal-upload-item">
              <label htmlFor="project-link" className="modal-upload-label">🔗 Enlace del proyecto</label>
              <input
                type="url"
                id="project-link"
                className="modal-link-input"
                placeholder="https://github.com/usuario/repositorio"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
            </div>
          </div>

          <input hidden type="text" value={peopleId} onChange={(e) => setPeopleId(e.target.value)} />

          <div style={{ marginTop: 12 }}>
            {loading && <span style={{ color: "#8a2d3c" }}>Actualizando...</span>}
            {successMsg && <span style={{ color: "green" }}>{successMsg}</span>}
            {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          </div>

          <div className="modal-footer">
            <button className="modal-next-btn" style={{ background: "#8a2d3c" }} type="submit" disabled={loading}>
              Actualizar Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectFullModal;
