import "@auth/styles/dashboard.css";
import { Letterhead, WelcomeBanner, ResumeCard } from "@auth/components";
import studentsImage from "@auth/assets/Group_135.png"; // Asegúrate de que esta ruta sea correcta

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Letterhead />
      <div className="red-line" />

      <WelcomeBanner
        line1="¡QUE BUENO VERTE,"
        line2="RINARDO!"
        subtitle="Revisa tus tareas, evalúa o entrega proyectos"
        image={studentsImage}
      />

      <div className="resume-wrapper">
        <h2 className="resume-title">Resumen</h2>
      </div>

      <ResumeCard
        name="Rinardo José Salazar Miranda"
        career="Ingeniería en Informática"
        semester="6to"
        deliveredProjects={4}
        pendingProjects={2}
        lastGrade="19/25 (Proyecto CRUD)"
        currentSubjects={7}
        ranking="#5 en la carrera"
      />
    </div>
  );
};

export default Dashboard;
