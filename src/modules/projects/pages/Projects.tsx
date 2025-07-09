import "@dashboard/styles/dashboard.css";
import { NavBar } from "@dashboard/components";
import { Banner } from "@dashboard/components";
import { CardProject, SearchFilter } from "@/modules/projects/components";
import CreateProjectModal from "../components/CreateProjectModal";
import { BannerProjects } from "@/modules/projects/assets";
import '../styles/cardproject.css'
import { Button } from "@/modules/users/admin/components";

import { useState } from "react";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);

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
            <SearchFilter />
            <Button name="Crear proyecto" classComp="btn project" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      <div className="card-project-container">
        <CardProject title="Aplicacion moodle estudiantil" description="Creación de una página web responsiva usando React y Tailwind. Se evaluará diseño, funcionalidad y código limpio."/>
        <CardProject title="Aplicacion moodle estudiantil" description="Aplicación web para organizar tareas diarias, con funcionalidades de login, lista de tareas y recordatorios."/>
        <CardProject title="Aplicacion moodle estudiantil" description="lorem ipsum xzy"/>
        <CardProject title="Aplicacion moodle estudiantil" description="lorem ipsum xzy"/>
      </div>

      {showModal && (
        <CreateProjectModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};


export default Projects;
