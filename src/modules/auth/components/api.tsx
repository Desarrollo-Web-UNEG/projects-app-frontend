import { useEffect, useState } from "react";
import axios from "axios";

// Props: solo la URL a consultar
interface ApiProps {
  url: string;
}

/**
 * Componente reutilizable para hacer peticiones GET al backend y mostrar la respuesta o error.
 * Solo se encarga de la comunicación y visualización simple del resultado.
 */
const Api = ({ url }: ApiProps) => {
  // Estado para guardar la respuesta del backend
  const [mensaje, setMensaje] = useState("");
  // Estado para guardar errores de la petición
  const [error, setError] = useState("");

  useEffect(() => {
    // Realiza la petición GET al backend cada vez que cambia la URL
    axios
      .get(url)
      .then((res) => {
        // Si la respuesta es un string, la muestra; si es objeto, la convierte a string
        setMensaje(
          typeof res.data === "string" ? res.data : JSON.stringify(res.data)
        );
      })
      .catch((error) => {
        // Guarda el error en el estado si ocurre algún problema
        setError(
          error.response
            ? `Error: ${error.response.status} ${error.response.statusText}`
            : `Error: ${error.message}`
        );
      });
  }, [url]);

  // Renderiza el error si existe, si no muestra la respuesta o "Cargando..."
  return (
    <div>
      {error ? <div>{error}</div> : <pre>{mensaje || "Cargando..."}</pre>}
    </div>
  );
};

export default Api;
