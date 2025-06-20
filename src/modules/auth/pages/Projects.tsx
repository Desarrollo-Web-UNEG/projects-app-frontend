import "@auth/styles/dashboard.css";
import { Letterhead, Banner, SearchFilter } from "@auth/components";
import { BannerStudents } from "@auth/assets";



const Projects = () => {
  return (
    <div className="container">
      <Letterhead />
      <div className="red-line" />

      <Banner
        line1="TUS ENTREGAS SON EL REFLEJO DE TU ESFUERZO Y"
        line2="DEFINEN TU AVANCE ACADÉMICO"
        subtitle="No olvides revisar el feedback de tus profesores y mejorar tus publicaciones."
        image={BannerStudents}
      />

      <div className="projects-header">
        <h2 className="projects-title">Proyectos</h2>
        <SearchFilter />
      </div>

    </div>
  );
};

export default Projects;
