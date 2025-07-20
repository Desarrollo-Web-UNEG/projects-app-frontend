import { NavBar, Banner, ResumeCard } from "@dashboard/components";
import { useEffect, useState } from "react";
import "@dashboard/styles/dashboard.css";
import { BannerStudents } from "@dashboard/assets";
import { getDashboardProfile } from "../services/catalogServices";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [deliveredProjects, setDeliveredProjects] = useState(0);
  const [currentSubjects, setCurrentSubjects] = useState(0);

  useEffect(() => {
    document.body.classList.add("dashboard-view");
    return () => {
      document.body.classList.remove("dashboard-view");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");
      console.log("Token:", token);
      console.log("User ID:", userId);

      if (!token || !userId) return;

      try {
        const data = await getDashboardProfile(userId, token);

        setName(`${data.user.name} ${data.user.last_name}`);
        setDeliveredProjects(data.projectsCount || 0);
        setCurrentSubjects(data.enrolledSubjectsCount || 0);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="red-line" />

      <Banner
        line1="¡QUE BUENO VERTE,"
        line2={name}
        subtitle="Revisa tus tareas, evalúa o entrega proyectos"
        image={BannerStudents}
      />

      <div className="wrapper">
        <h2 className="title-dashboard">Resumen</h2>
      </div>

      <ResumeCard
        name={name}
        career="Ingeniería en Informática"
        deliveredProjects={deliveredProjects}
        currentSubjects={currentSubjects}
      />
    </div>
  );
};

export default Dashboard;
