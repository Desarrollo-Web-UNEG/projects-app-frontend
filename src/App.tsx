import "./App.css";
import { Login, Register } from "@auth/pages";
import { Routes, Route } from "react-router-dom";
import Comunicacion from "./modules/auth/pages/Prueba";
import { Dashboard } from "@dashboard/pages";
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
      </Routes>
    </>
  );
};

export default App;
