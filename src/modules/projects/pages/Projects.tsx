import "@dashboard/styles/dashboard.css";
import { NavBar } from "@dashboard/components";
import { Banner } from "@dashboard/components";
// import { CardProject, SearchFilter } from "@/modules/projects/components";
import { CardProject } from "@/modules/projects/components";
import CreateProjectModal from "../components/CreateProjectModal";
import { BannerProjects } from "@/modules/projects/assets";
import '../styles/cardproject.css'
import { Button } from "@/modules/users/admin/components";
import { getProjects, deleteProject } from "../services/projectService";
import EditProjectFullModal from "../components/EditProjectFullModal";

import { useState, useEffect } from "react";


const Projects = () => {

  
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  console.log(projects)
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("access_token") || "";
      try {
        const result = await getProjects(token);
        // Si el backend retorna un array directo:
        setProjects(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <NavBar />
      {/* <Letterhead /> */}
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
            {/* <SearchFilter /> */}
            <Button name="Crear proyecto" classComp="btn project" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      <div className="card-project-container">
        {projects.length === 0 && <div style={{color: '#8a2d3c', padding: 16}}>Vista de proyectos.</div>}
        {projects.map((project: any) => (
          <CardProject
            key={project.id}
            title={project.title || 'Sin título'}
            description={project.description || 'Sin descripción'}
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
                setProjects((prev: any[]) => prev.filter(p => p.id != id));
              } catch (err) {
                alert('Error al eliminar el proyecto.');
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
          onProjectUpdated={() => {
            // Refresca la lista de proyectos al editar uno
            const fetchProjects = async () => {
              const token = localStorage.getItem("access_token") || "";
              try {
                const result = await getProjects(token);
                setProjects(Array.isArray(result) ? result : result.data || []);
              } catch (err) {
                setProjects([]);
              }
            };
            fetchProjects();
          }}
        />
      )}
      </div>

      {showModal && (
        <CreateProjectModal 
          onClose={() => setShowModal(false)} 
          onProjectCreated={() => {
            // Refresca la lista de proyectos al crear uno nuevo
            const fetchProjects = async () => {
              const token = localStorage.getItem("access_token") || "";
              try {
                const result = await getProjects(token);
                setProjects(Array.isArray(result) ? result : result.data || []);
              } catch (err) {
                setProjects([]);
              }
            };
            fetchProjects();
          }}
        />
      )}
    </div>
  );
};


export default Projects;
