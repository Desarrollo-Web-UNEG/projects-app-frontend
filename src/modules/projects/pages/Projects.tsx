import "@dashboard/styles/dashboard.css";
import { NavBar } from "@dashboard/components";
import { Banner } from "@dashboard/components";
import { SearchFilter } from "@/modules/projects/components";
import { BannerProjects } from "@/modules/projects/assets";

const Projects = () => {
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
        <h2 className="projects-title">Proyectos</h2>
        <SearchFilter />
      </div>
    </div>
  );
};

export default Projects;
