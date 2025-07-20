import React, { useState, useEffect } from "react";

import {
  getSubjects,
  getCategories,
  getTechnologies,
  getAcademicPeriods,
  uploadProjectFile,
} from "../services/catalogService";

import { createProject } from "../services/projectService";
import "../styles/createprojectmodal.css";
import ModalDetails from "./ModalDetails";


interface CreateProjectModalProps {
  onClose: () => void;
  onProjectCreated?: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onClose,
  onProjectCreated,
}) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [academicPeriods, setAcademicPeriods] = useState<any[]>([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedAcademicPeriod, setSelectedAcademicPeriod] = useState("");

  const [projectFile, setProjectFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
    
  // Id del usuario
    const userId = localStorage.getItem('user_id') || '';

  const [section, setSection] = useState<"detalles" | "entrega" | "rubrica">(
    "detalles"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [objetives, setObjetives] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token") || "";

      try {

        const [subjectsRes, categoriesRes, technologiesRes, periodsRes] =
          await Promise.all([
            getSubjects(token),
            getCategories(token),
            getTechnologies(token),
            getAcademicPeriods(token),
          ]);

        setSubjects(subjectsRes || []);
        setCategories(categoriesRes || [])
        console.log("🚀 ~ fetchData ~ subjectsRes:", subjectsRes)

        setTechnologies(technologiesRes || []);
        setAcademicPeriods(periodsRes || []);
        console.log("🚀 ~ technologiesRes:", technologiesRes)
console.log("🚀 ~ periodsRes:", periodsRes)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

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
      // 1) Crear el proyecto
      const data = {
        title,
        description,
        // objectives: objetives || null,
        academicPeriodId: selectedAcademicPeriod
          ? Number(selectedAcademicPeriod)
          : null,
        subjectId: selectedSubject ? Number(selectedSubject) : null,
        categoryId: selectedCategory || null,
        technologyIds: selectedTechnologies.map((id) =>
          isNaN(Number(id)) ? id : Number(id)
        ),
        peopleId: userId || null,
      };

      console.log("Data to submit:", data);

      // Crear proyecto y obtener respuesta con ID del proyecto
      const createdProject = await createProject(data, token);

      // 2) Subir archivo si existe archivo seleccionado
      if (projectFile) {
        // Usamos el ID del proyecto creado
        await uploadProjectFile(token, createdProject.id, projectFile);
      }

      setSuccessMsg("¡Proyecto enviado exitosamente!");
      setTimeout(() => {
        setSuccessMsg("");
        if (typeof onProjectCreated === "function") onProjectCreated();
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Error al enviar el proyecto. Intenta de nuevo.");
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
        <div className="modal-tabs">
          <button
            className={`tab${section === "detalles" ? " active" : ""}`}
            onClick={() => setSection("detalles")}
          >
            Detalles del Proyecto
          </button>
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
              academicPeriods={academicPeriods}
              selectedAcademicPeriod={selectedAcademicPeriod}
              setSelectedAcademicPeriod={setSelectedAcademicPeriod}
              projectFile={projectFile}
              setProjectFile={setProjectFile}
            />

            <div style={{ marginTop: 12 }}>
              {loading && <span style={{ color: "#8a2d3c" }}>Enviando...</span>}
              {successMsg && <span style={{ color: "green" }}>{successMsg}</span>}
              {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
            </div>

            <div className="modal-footer">
              <button
                className="modal-next-btn"
                style={{ background: "#8a2d3c" }}
                type="submit"
                disabled={loading}
              >
                Subir Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
