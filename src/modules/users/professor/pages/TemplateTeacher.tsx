import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { Search } from "../../admin/components";
import { CardInfo } from "../../admin/components";
import "../styles/template-teacher.css";
import "../../admin/styles/card-info.css";
import { Book } from "../../admin/assets";
import { useEffect, useState } from "react";
import { requestApi } from "@/modules/js/resquestApi";

const TemplateTeacher = () => {
  const { name } = useParams();
  const userId = localStorage.getItem("user_id");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !userId) {
      // Opcional: navegar al login o mostrar error
      return;
    }
    setLoading(true);

    const token = localStorage.getItem("access_token");
    const endpoints: Record<string, string> = {
      Alumnos: `https://projects-app-backend.onrender.com/subject-people/${userId}/subjects`,
      // Si más secciones requieren userId, agrégalas aquí
    };

    requestApi({
      url: endpoints[name],
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        const materias = Array.isArray(data)
          ? data.map((item) => ({
              name: item.subject.name,
              description: item.subject.description,
            }))
          : [];
        setSubjects(materias);
        setError(null);
      })
      .catch(() => {
        setError(`Error al cargar ${name}`);
        setSubjects([]);
      })
      .finally(() => setLoading(false));
  }, [name, userId]);

  const renderAlumnosSection = () => (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">Asignar alumnos a materia</h2>
          <Search />
        </div>
      </div>

      {loading && <p>Cargando materias...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && subjects.length === 0 && (
        <p>No hay materias registradas.</p>
      )}

      <div className="subjects-list">
        {subjects.map((subject, idx) => (
          <div key={idx} style={{ marginBottom: "1rem" }}>
            <CardInfo
              icon={Book}
              title={subject.name}
              description={subject.description}
              showAsignButton={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
  const renderProyectosSection = () => <div></div>;
  const renderCalificacionesSection = () => <div></div>;

  return (
    <>
      <NavBar />
      {name === "Alumnos" && renderAlumnosSection()}
      {name === "Proyectos" && renderProyectosSection()}
      {name === "Calificaciones" && renderCalificacionesSection()}
    </>
  );
};

export default TemplateTeacher;
