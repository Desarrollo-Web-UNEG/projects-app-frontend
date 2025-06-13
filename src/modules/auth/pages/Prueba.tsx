import Api from "../components/api";

const Prueba = () => {
  // Selecciona la URL según el entorno
  const backendUrl = import.meta.env.PROD
    ? "https://projects-app-backend.onrender.com/"
    : "/api/";

  // Solo muestra el componente Api con la URL
  return <Api url={backendUrl} />;
};

export default Prueba;
