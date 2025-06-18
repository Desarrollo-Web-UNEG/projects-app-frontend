import "@auth/styles/dashboard.css";
import { Letterhead, Banner } from "@auth/components";
import studentsImage from "@auth/assets/Group_135.png";


const Projects = () => {
  return (
    <div className="container">
      <Letterhead />
      <div className="red-line" />

      <Banner
        line1="TUS ENTREGAS SON EL REFLEJO DE TU ESFUERZO Y"
        line2="DEFINEN TU AVANCE ACADÉMICO"
        subtitle="No olvides revisar el feedback de tus profesores y mejorar tus publicaciones."
        image={studentsImage}
      />

      <div className="wrapper">
        <h2 className="title">Proyectos</h2>
      </div>

    </div>
  );
};

export default Projects;
