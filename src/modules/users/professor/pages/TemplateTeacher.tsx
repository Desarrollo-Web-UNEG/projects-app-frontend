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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<any | null>(null);
  const [approvedStudents, setApprovedStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [errorStudents, setErrorStudents] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !userId) {
      // Opcional: navegar al login o mostrar error
      return;
    }
    setLoading(true);

    const token = localStorage.getItem("access_token");
    const endpoints: Record<string, string> = {
      Alumnos: `https://projects-app-backend-8elg.onrender.com/subject-people/${userId}/subjects`,
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

  useEffect(() => {
    if (!editModalOpen) return;

    setLoadingStudents(true);
    setErrorStudents(null);

    const token = localStorage.getItem("access_token");
    requestApi({
      url: "https://projects-app-backend-8elg.onrender.com/people/profile/approved",
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        setApprovedStudents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setErrorStudents("Error al cargar la lista de estudiantes");
        setApprovedStudents([]);
      })
      .finally(() => setLoadingStudents(false));
  }, [editModalOpen]);

  const handleOpenAsignModal = (subject: any) => {
    setCurrentSubject(subject);
    setEditModalOpen(true);
  };

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
              onEdit={() => handleOpenAsignModal(subject)}
            />
          </div>
        ))}
      </div>

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Añadir estudiantes a: {currentSubject?.name}</h3>

            {loadingStudents && <p>Cargando estudiantes...</p>}
            {errorStudents && <p style={{ color: "red" }}>{errorStudents}</p>}

            {!loadingStudents && !errorStudents && (
              <ul className="student-list">
                {approvedStudents.map(({ id, name, last_name, id_number }) => (
                  <li key={id} className="student-item">
                    <span>
                      {name} {last_name}
                    </span>
                    <span> ({id_number})</span>
                  </li>
                ))}
              </ul>
            )}

            <button onClick={() => setEditModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
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
