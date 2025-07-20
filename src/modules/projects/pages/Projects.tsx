import "@dashboard/styles/dashboard.css";
import { NavBar } from "@dashboard/components";
import { Banner } from "@dashboard/components";
import { CardProject } from "@/modules/projects/components";
import CreateProjectModal from "../components/CreateProjectModal";
import { BannerProjects } from "@/modules/projects/assets";
import "../styles/cardproject.css";
import { Button } from "@/modules/users/admin/components";
import { getProjects, deleteProject } from "../services/projectService";
import EditProjectFullModal from "../components/EditProjectFullModal";
import { getSubjectsByPeopleId } from "@/modules/evaluation/services/subjectPeopleService";
import { getProfile } from "@/modules/dashboard/services/catalogServices";

import { useState, useEffect } from "react";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("access_token") || "";

      try {
        const profile = await getProfile(token);
        const userId = profile?.id;
        const userType = profile?.user_type;

        const allProjectsResponse = await getProjects(token);
        const allProjects = Array.isArray(allProjectsResponse)
          ? allProjectsResponse
          : allProjectsResponse?.data || [];

        if (userType === "student") {
          const filtered = allProjects.filter(
            (project: any) => project.people?.id === userId
          );
          setProjects(filtered);
        } else if (userType === "professor") {
          const subjectsResponse = await getSubjectsByPeopleId(
            String(userId),
            token
          );
          const subjectIds = (Array.isArray(subjectsResponse?.data)
            ? subjectsResponse.data
            : subjectsResponse
          ).map((s: any) => Number(s.subject.id));

          const filtered = allProjects.filter((project: any) =>
            subjectIds.includes(Number(project.subject?.id))
          );
          setProjects(filtered);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="red-line" />

      <Banner
        line1="TUS ENTREGAS SON EL REFLEJO DE TU ESFUERZO Y"
        line2="DEFINEN TU AVANCE ACADÉMICO"
        subtitle="No olvides revisar el feedback de tus profesores y mejorar tus publicaciones."
        image={BannerProjects}
      />

      <div className="projects-header">
        <div className="containt-header">
          <h2 className="projects-title">Proyectos</h2>
          <div className="search-and-button">
            <Button
              name="Crear proyecto"
              classComp="btn project"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>

      <div className="card-project-container">
        {projects.length === 0 && (
          <div style={{ color: "#8a2d3c", padding: 16 }}>
            Vista de proyectos.
          </div>
        )}
        {projects.map((project: any) => (
          <CardProject
            key={project.id}
            title={project.title || "Sin título"}
            description={project.description || "Sin descripción"}
            projectId={project.id}
            categoryId={project.categoryId}
            subjectId={project.subjectId}
            technologyIds={project.technologyIds}
            onEdit={() => {
              setSelectedProject(project);
              setShowEditModal(true);
            }}
            onDelete={async (id: string) => {
              const token = localStorage.getItem("access_token") || "";
              try {
                await deleteProject(id, token);
                setProjects((prev: any[]) => prev.filter((p) => p.id != id));
              } catch (err) {
                alert("Error al eliminar el proyecto.");
              }
            }}
          />
        ))}
        {showEditModal && selectedProject && (
          <EditProjectFullModal
            project={selectedProject}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProject(null);
            }}
            onProjectUpdated={async () => {
              const token = localStorage.getItem("access_token") || "";
              try {
                const result = await getProjects(token);
                setProjects(Array.isArray(result) ? result : result.data || []);
              } catch (err) {
                setProjects([]);
              }
            }}
          />
        )}
      </div>

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={async () => {
            const token = localStorage.getItem("access_token") || "";
            try {
              const result = await getProjects(token);
              setProjects(Array.isArray(result) ? result : result.data || []);
            } catch (err) {
              setProjects([]);
            }
          }}
        />
      )}
    </div>
  );
};

export default Projects;
