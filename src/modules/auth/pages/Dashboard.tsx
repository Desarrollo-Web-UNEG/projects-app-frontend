import "@auth/styles/dashboard.css";
import { Letterhead, WelcomeBanner } from "@auth/components";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Letterhead />
      <div className="red-line" />

      <WelcomeBanner />
    </div>
  );
};

export default Dashboard;
