import "@auth/styles/projects.css";
import { Letterhead, WelcomeBanner } from "@auth/components";
import studentsImage from "@auth/assets/Group_135.png"; // Asegúrate de que la ruta sea correcta


const Projects = () => {
  return (
    <div className="projects-container">
      <Letterhead />
      <div className="red-line" />

      <WelcomeBanner
        line1="TUS ENTREGAS SON EL REFLEJO DE TU ESFUERZO Y"
        line2="DEFINEN TU AVANCE ACADÉMICO"
        subtitle="No olvides revisar el feedback de tus profesores y mejorar tus publicaciones."
        image={studentsImage}
      />
    </div>
  );
};

export default Projects;
