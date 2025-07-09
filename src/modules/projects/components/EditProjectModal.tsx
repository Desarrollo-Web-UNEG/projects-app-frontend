import React, { useState, useEffect } from "react";
import { getSubjects, getCategories, getTechnologies } from "../services/catalogService";
import { updateProject } from "../services/projectService";
import ModalDetails from "./ModalDetails";

interface EditProjectModalProps {
  project: any;
  onClose: () => void;
  onProjectUpdated?: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, onClose, onProjectUpdated }) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objetives, setObjetives] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar catálogos y luego setear los valores seleccionados del proyecto
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

        // Setear valores seleccionados justo después de cargar catálogos
        setTitle(project.title || "");
        setDescription(project.description || "");
        setObjetives(project.objectives || "");
        // Normalizar y buscar coincidencia en catálogos para selects y checkboxes
        const subjectIdStr = project.subjectId ? String(project.subjectId) : "";
        const categoryIdStr = project.categoryId ? String(project.categoryId) : "";
        setSelectedSubject(subjectsRes && subjectsRes.find((s: any) => String(s.id) === subjectIdStr)?.id ? subjectIdStr : "");
        setSelectedCategory(categoriesRes && categoriesRes.find((c: any) => String(c.id) === categoryIdStr)?.id ? categoryIdStr : "");
        if (Array.isArray(project.technologyIds)) {
          const techIds = project.technologyIds.map((id: any) => String(id));
          const validTechIds = (technologiesRes || []).filter((t: any) => techIds.includes(String(t.id))).map((t: any) => String(t.id));
          setSelectedTechnologies(validTechIds);
        } else {
          setSelectedTechnologies([]);
        }
      } catch (err) {
        setSubjects([]);
        setCategories([]);
        setTechnologies([]);
        setSelectedSubject("");
        setSelectedCategory("");
        setSelectedTechnologies([]);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Eliminar el segundo useEffect para evitar sobrescribir los valores seleccionados

  const handleFormatToggle = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const userId = localStorage.getItem('user_id') || '';

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
        academicPeriodId: project.academicPeriodId || '2',
        subjectId: selectedSubject,
        categoryId: selectedCategory,
        technologyIds: selectedTechnologies,
        peopleId: userId,
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
        <div className="modal-tabs">
          <button className="tab active">Editar Proyecto</button>
        </div>
        <div className="modal-section">
          <form onSubmit={handleSubmit}>
            <ModalDetails
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              // objetives={objetives}
              // setObjetives={setObjetives}
              userId={userId}
              handleFormatToggle={handleFormatToggle}
              subjects={subjects}
              categories={categories}
              technologies={technologies}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTechnologies={selectedTechnologies}
            />
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
    </div>
  );
};

export default EditProjectModal;
