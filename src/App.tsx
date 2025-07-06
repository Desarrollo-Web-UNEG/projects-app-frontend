import "./App.css";
import { Routes, Route } from "react-router-dom";
import Comunicacion from "./modules/auth/pages/Prueba";
import { Login, Register } from "@auth/pages";
import { Dashboard } from "@dashboard/pages";

import { Projects } from "@/modules/projects/pages";

import ProtectedRoute from "@auth/components/ProtectedRoute"
import { PanelControl } from "./modules/users/admin/pages";
import Template from "./modules/users/admin/pages/Template";
import { PanelControlTeacher } from "./modules/users/professor/pages";


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

        <Route path="panel-control/:user_type" element={<PanelControl/>}></Route>
        <Route path="panel-control-professor/:user_type" element={<PanelControlTeacher/>}></Route>
        

        <Route path="prueba" element={<Comunicacion />} />
        <Route path="projects" element={<Projects />} />
        <Route path="template/:name" element={<Template />} />
      </Routes>
    </>
  );
};

export default App;
