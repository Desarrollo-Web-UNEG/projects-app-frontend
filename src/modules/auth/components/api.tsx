import { useEffect, useState } from "react";

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
    fetch(url)
      .then(async (res) => {
        // Si la respuesta no es exitosa, lanza un error
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Detecta si la respuesta es JSON o texto plano
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          // Si el JSON es un string, lo retorna, si no, lo convierte a string
          return typeof data === "string" ? data : JSON.stringify(data);
        } else {
          // Si no es JSON, retorna el texto plano
          return await res.text();
        }
      })
      .then((data) => {
        // Guarda la respuesta en el estado
        setMensaje(data);
      })
      .catch((error) => {
        // Guarda el error en el estado si ocurre algún problema
        setError(`Error: ${error.message}`);
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
