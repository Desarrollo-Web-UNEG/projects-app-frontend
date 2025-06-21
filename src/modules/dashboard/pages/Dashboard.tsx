import { NavBar } from "@dashboard/components";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.body.classList.add("dashboard-view");
    return () => {
      document.body.classList.remove("dashboard-view");
    };
  }, []);

  return <NavBar />;
};

export default Dashboard;
