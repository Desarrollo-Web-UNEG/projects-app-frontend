import "./App.css";
import { Routes, Route } from "react-router-dom";
import Comunicacion from "./modules/auth/pages/Prueba";
import { Login, Register } from "@auth/pages";
import { Dashboard, Profile } from "@dashboard/pages";
import { ChatPage } from "./modules/chatbot/pages";
import { Projects } from "@/modules/projects/pages";
import ProtectedRoute from "@auth/components/ProtectedRoute";
import { PanelControl } from "./modules/users/admin/pages";
import Template from "./modules/users/admin/pages/Template";
import { PanelControlTeacher } from "./modules/users/professor/pages";

const App = () => {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="panel-control/:user_type"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PanelControl />
            </ProtectedRoute>
          }
        />

        <Route
          path="panel-control-professor/:user_type"
          element={
            <ProtectedRoute allowedRoles={['professor']}>
              <PanelControlTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={['admin', 'professor', 'student']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="projects"
          element={
            <ProtectedRoute allowedRoles={['admin', 'professor', 'student']}>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="chatbot"
          element={
            <ProtectedRoute allowedRoles={['admin', 'professor', 'student']}>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="template/:name"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Template />
            </ProtectedRoute>
          }
        />

        {/* Ruta de prueba (opcional, puedes protegerla si es necesario) */}
        <Route path="prueba" element={<Comunicacion />} />
      </Routes>
    </>
  );
};

export default App;