import "@dashboard/styles/dashboard.css";
import { useEffect, useState } from "react";
import { NavBar } from "@dashboard/components";
import { Banner } from "@dashboard/components";
import CardProject from "../components/CardProject";
import { BannerProjects } from "@/modules/projects/assets";
import { getProjects } from "@/modules/projects/services/projectService";
import EvaluateProjectModal from "../components/EvaluateProjectModal";
import { getSubjectsByPeopleId } from "@/modules/evaluation/services/subjectPeopleService";
import "../styles/cardproject.css";

// Tipo para proyectos
interface Project {
  id: number;
  title: string;
  description?: string;
  categoryId?: number;
  subjectId: number;
  technologyIds?: number[];
}

// Tipo para materias
interface Subject {
  id: number;
  name: string;
}

const Evaluations = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [projectToEvaluate, setProjectToEvaluate] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectsForProfessor = async () => {
      const token = localStorage.getItem("access_token") || "";
      const peopleId = localStorage.getItem("people_id"); // 👈 usa string, como indica Swagger

      if (!peopleId) {
        console.warn("No hay peopleId del profesor");
        setProjects([]);
        return;
      }

      try {
        // 1. Obtener materias asignadas
        const subjectsResponse = await getSubjectsByPeopleId(peopleId, token);

        const subjects: Subject[] = Array.isArray(subjectsResponse?.data)
          ? subjectsResponse.data
          : subjectsResponse;

        const subjectIds = subjects.map((s) => Number(s.id));

        // 2. Obtener todos los proyectos
        const projectsResponse = await getProjects(token);
        const allProjects: Project[] = Array.isArray(projectsResponse?.data)
          ? projectsResponse.data
          : projectsResponse;

        // 3. Filtrar por subjectId
        const filteredProjects = allProjects.filter((project) =>
          subjectIds.includes(Number(project.subjectId))
        );

        setProjects(filteredProjects);
      } catch (err) {
        console.error("Error al cargar proyectos o materias:", err);
        setProjects([]);
      }
    };

    fetchProjectsForProfessor();
  }, []);

  const handleEvaluate = (project: Project) => {
    setProjectToEvaluate(project);
    setShowEvaluationModal(true);
  };

  const handleEvaluationSubmit = async (score: number, feedback: string) => {
    console.log("Evaluación enviada:", {
      projectId: projectToEvaluate?.id,
      score,
      feedback,
    });

    setShowEvaluationModal(false);
    setProjectToEvaluate(null);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="red-line" />

      <Banner
        line1="REVISA Y EVALÚA LOS PROYECTOS ASIGNADOS"
        line2="TU CRITERIO CONTRIBUYE A LA MEJORA CONTINUA"
        subtitle="Selecciona un proyecto para ver los detalles y asignar una evaluación justa."
        image={BannerProjects}
      />

      <div className="projects-header">
        <div className="containt-header">
          <h2 className="projects-title">Evaluaciones de Proyectos</h2>
        </div>
      </div>

      <div className="card-project-container">
        {projects.length === 0 && (
          <div style={{ color: "#8a2d3c", padding: 16 }}>
            No hay proyectos disponibles para evaluar.
          </div>
        )}

        {projects.map((project) => (
          <CardProject
            key={project.id}
            title={project.title || "Sin título"}
            description={project.description || "Sin descripción"}
            onEvaluate={() => handleEvaluate(project)}
          />
        ))}
      </div>

      {showEvaluationModal && projectToEvaluate && (
        <EvaluateProjectModal
          projectTitle={projectToEvaluate.title}
          onClose={() => {
            setShowEvaluationModal(false);
            setProjectToEvaluate(null);
          }}
          onSubmit={handleEvaluationSubmit}
        />
      )}
    </div>
  );
};

export default Evaluations;
