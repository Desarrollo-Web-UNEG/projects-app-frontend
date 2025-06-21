import "./App.css";
import { Login, Register } from "@auth/pages";
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
      </Routes>
    </>
  );
};

export default App;
