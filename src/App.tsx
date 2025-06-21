import "./App.css";
import { Dashboard, Login, Register, Projects } from "@auth/pages";
import { Routes, Route } from "react-router-dom";
import Comunicacion from "./modules/auth/pages/Prueba";
import { Dashboard } from "@dashboard/pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />,
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="prueba" element={<Comunicacion />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
      </Routes>
    </>
  );
};

export default App;
