import "@dashboard/styles/dashboard.css";
import { useEffect, useState, useCallback } from "react";
import { NavBar, Banner } from "@dashboard/components";
import CardProject from "../components/CardProject";
import EvaluateProjectModal from "../components/EvaluateProjectModal";
import StudentProjectsTable from "../components/StudenProjectsTable";
import { getProjects } from "@/modules/projects/services/projectService";
import { getSubjectsByPeopleId } from "@/modules/evaluation/services/subjectPeopleService";
import { getProfile } from "@/modules/dashboard/services/catalogServices";
import { BannerProjects } from "@/modules/projects/assets";
import { BannerStudents } from "@dashboard/assets";
import "../styles/cardproject.css";

// Tipos
interface Project {
  id: number;
  title: string;
  description?: string;
  objectives?: string;
  category?: {
    id: string;
    name: string;
    description?: string;
  };
  subject?: {
    id: number;
    name: string;
    description?: string;
  };
  academicPeriod?: {
    id: string;
    description: string;
  };
  technologies?: {
    id: string;
    name: string;
  }[];
  projectLink?: string;
  projectFile?: string;
  people?: {
    id: string;
    name: string;
    last_name: string;
    user_type: string;
  };
  evaluationScore?: number;
}

interface Subject {
  subject: {
    id: number;
    name: string;
  };
}

const Evaluations = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const name = `${localStorage.getItem("user_name") ?? ""} ${localStorage.getItem("user_lastname") ?? ""}`;


  // Se asegura que id_user sea string para evitar error TS
  const fetchProjectsForProfessor = async (id_user: string, token: string) => {
    try {
      const subjectsResponse = await getSubjectsByPeopleId(id_user, token);
      // Defino tipo de respuesta para evitar 'any'
      const subjects: Subject[] = Array.isArray(subjectsResponse?.data)
        ? subjectsResponse.data
        : subjectsResponse;

      const subjectIds = subjects.map((s) => Number(s.subject.id));

      const projectsResponse = await getProjects(token);
      const allProjects: Project[] = Array.isArray(projectsResponse?.data)
        ? projectsResponse.data
        : projectsResponse;

      const filteredProjects = allProjects.filter((project) =>
        subjectIds.includes(Number(project.subject?.id))
      );

      setProjects(filteredProjects);
    } catch (err) {
      console.error("Error al cargar proyectos para profesor:", err);
      setProjects([]);
    }
  };

  // Se pone _id_user para indicar que no se usa y evitar warning TS
  const fetchProjectsForStudent = async (_id_user: string, token: string) => {
    try {
      const projectsResponse = await getProjects(token);
      const allProjects: Project[] = Array.isArray(projectsResponse?.data)
        ? projectsResponse.data
        : projectsResponse;

      // Nota simulada para ejemplo, reemplaza con la real si la tienes
      const studentProjects = allProjects.map((p) => ({
        ...p,
        evaluationScore: Math.floor(Math.random() * 101),
      }));

      setProjects(studentProjects);
    } catch (err) {
      console.error("Error al cargar proyectos para estudiante:", err);
      setProjects([]);
    }
  };

  // Uso useCallback para que fetchData sea estable y useEffect no tenga warning
  const fetchData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token") || "";

    try {
      const profile = await getProfile(token);
      const id_user_num = profile?.id;
      const user_type = profile?.user_type || null;

      setUserType(user_type);

      if (!id_user_num) {
        console.warn("No se encontró el ID del usuario");
        setProjects([]);
        setLoading(false);
        return;
      }

      const id_user_str = String(id_user_num);

      if (user_type === "professor") {
        await fetchProjectsForProfessor(id_user_str, token);
      } else if (user_type === "student") {
        await fetchProjectsForStudent(id_user_str, token);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      setProjects([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEvaluate = (project: Project) => {
    setSelectedProject(project);
    setShowEvaluationModal(true);
  };

  const handleEvaluationSubmit = async (score: number, feedback: string) => {
    console.log("📤 Evaluación enviada:", {
      projectId: selectedProject?.id,
      score,
      feedback,
    });

    setShowEvaluationModal(false);
    setSelectedProject(null);

    if (userType === "professor") {
      const token = localStorage.getItem("access_token") || "";
      const profile = await getProfile(token);
      if (profile?.id) await fetchProjectsForProfessor(String(profile.id), token);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container">
      <NavBar />
      <div className="red-line" />

      {userType === "professor" && (
        <>
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
            {projects.length === 0 ? (
              <div style={{ color: "#8a2d3c", padding: 16 }}>
                No hay proyectos disponibles para evaluar.
              </div>
            ) : (
              projects.map((project) => (
                <CardProject
                  key={project.id}
                  title={project.title || "Sin título"}
                  description={project.description || "Sin descripción"}
                  onEvaluate={() => handleEvaluate(project)}
                />
              ))
            )}
          </div>

          {showEvaluationModal && selectedProject && (
            <EvaluateProjectModal
              project={selectedProject}
              onClose={() => {
                setShowEvaluationModal(false);
                setSelectedProject(null);
              }}
              onSubmit={handleEvaluationSubmit}
            />
          )}
        </>
      )}

      {userType === "student" && (
        <>
      <Banner
            line1="¡QUE BUENO VERTE,"
            line2= {name ?? ""}
            subtitle="Aquí puedes revisar tus evaluaciones y calificaciones de proyectos"
            image={BannerStudents}
          />
          <h2 className="projects-title" style={{ margin: "20px 0" }}>
            Mis Evaluaciones
          </h2>
          <StudentProjectsTable projects={projects} />
        </>
      )}

      {!userType && (
        <div style={{ color: "#8a2d3c", padding: 16 }}>
          No se pudo identificar el tipo de usuario.
        </div>
      )}
    </div>
  );
};

export default Evaluations;
