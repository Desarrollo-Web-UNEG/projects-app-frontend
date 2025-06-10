import { useEffect, useState } from "react";

const Prueba = () => {
  // Estado para guardar la respuesta del backend
  const [mensaje, setMensaje] = useState("");
  // Estado para guardar errores
  const [error, setError] = useState("");

  useEffect(() => {
    // Selecciona la URL según el entorno (desarrollo usa proxy, producción usa URL real)
    const backendUrl = import.meta.env.PROD
      ? "https://projects-app-backend.onrender.com/"
      : "/api/";

    // Realiza la petición GET al backend
    fetch(backendUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Intenta leer como JSON, si no es posible, como texto
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          return typeof data === "string" ? data : JSON.stringify(data);
        } else {
          return await res.text();
        }
      })
      .then((data) => {
        setMensaje(data); // Guarda la respuesta en el estado
      })
      .catch((error) => {
        setError(`Error: ${error.message}`); // Guarda el error en el estado
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Prueba</h1>
      {/* Muestra el error si existe, si no muestra la respuesta */}
      <div>
        {error ? (
          <div>{error}</div>
        ) : (
          <div>
            <label>Respuesta del backend:</label>
            <pre>{mensaje || "Cargando..."}</pre>
          </div>
        )}
      </div>
      <div>
        URL del backend:{" "}
        {import.meta.env.VITE_BACKEND_URL ||
          "https://projects-app-backend.onrender.com"}
      </div>
    </div>
  );
};

export default Prueba;
