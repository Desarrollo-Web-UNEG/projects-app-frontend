import { NavBar } from "@dashboard/components";
import { useEffect } from "react";
import "@dashboard/styles/dashboard.css";
import { Banner, ResumeCard } from "@dashboard/components";
import { BannerStudents } from "@dashboard/assets";

const Dashboard = () => {


  const name = localStorage.getItem('user_name') + " " + localStorage.getItem('user_lastname');


  useEffect(() => {
    document.body.classList.add("dashboard-view");
    return () => {
      document.body.classList.remove("dashboard-view");
    };
  }, []);

  return (
    <div className="container">
      <NavBar />
      {/* <Letterhead /> */}
      <div className="red-line" />

      <Banner
        line1="¡QUE BUENO VERTE,"
        line2= {name ?? ""}
        subtitle="Revisa tus tareas, evalúa o entrega proyectos"
        image={BannerStudents}
      />

      <div className="wrapper">
        <h2 className="title-dashboard">Resumen</h2>
      </div>

      <ResumeCard
        name= {name ?? ""}
        career="Ingeniería en Informática"
        // semester="6to"
        deliveredProjects={4}
        pendingProjects={2}
        // lastGrade="19/25 (Proyecto CRUD)"
        currentSubjects={7}
        // ranking="#5 en la carrera"
      />
    </div>
  );
};

export default Dashboard;
