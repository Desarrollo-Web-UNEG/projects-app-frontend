import "./App.css";
import { Routes, Route } from "react-router-dom";
import Comunicacion from "./modules/auth/pages/Prueba";
import { Login, Register } from "@auth/pages";
import { Dashboard } from "@dashboard/pages";

import { Projects } from "@/modules/projects/pages";

import ProtectedRoute from "@auth/components/ProtectedRoute"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="register" element={<Register />} />

      {/* Ruta protegida, solo se accede con token de acceso */}
        <Route path="dashboard" element={
        <ProtectedRoute> 
          <Dashboard />
        </ProtectedRoute>
        } />

        <Route path="prueba" element={<Comunicacion />} />
        <Route path="projects" element={<Projects />} />
      </Routes>
    </>
  );
};

export default App;
