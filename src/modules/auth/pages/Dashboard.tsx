import "@auth/styles/dashboard.css";
import { Letterhead, WelcomeBanner, ResumeCard } from "@auth/components";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Letterhead />
      <div className="red-line" />

      <WelcomeBanner />

      <div className="resume-wrapper">
        <h2 className="resume-title">Resumen</h2>
      </div>
      <ResumeCard />
    </div>
  );
};

export default Dashboard;
