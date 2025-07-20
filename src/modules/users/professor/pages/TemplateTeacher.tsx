import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "@/modules/dashboard/components";
import { Search } from "../../admin/components";
import { CardInfo } from "../../admin/components";
import { requestApi } from "@/modules/js/resquestApi";
import { Book } from "../../admin/assets";
import "../styles/template-teacher.css";
import "../../admin/styles/card-info.css";

interface Subject {
  id: string;
  name: string;
  description: string;
}

interface Student {
  id: string;
  name: string;
  last_name: string;
  id_number: string;
}

const TemplateTeacher: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const userId = localStorage.getItem("user_id");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [errorStudents, setErrorStudents] = useState<string | null>(null);

  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);

  // 1. Carga de materias según sección
  useEffect(() => {
    if (!name || !userId) return;
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access_token");
    const endpoints: Record<string, string> = {
      Alumnos: `https://projects-app-backend-8elg.onrender.com/subject-people/${userId}/subjects`,
      // agrega más si necesitas Proyectos, Calificaciones…
    };

    requestApi({
      url: endpoints[name] || "",
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        const materias: Subject[] = Array.isArray(data)
          ? data.map((item) => ({
              id: item.subject.id,
              name: item.subject.name,
              description: item.subject.description,
            }))
          : [];
        setSubjects(materias);
      })
      .catch(() => {
        setError(`Error al cargar ${name}`);
      })
      .finally(() => setLoading(false));
  }, [name, userId]);

  // 2. Carga de estudiantes aprobados sólo al abrir el modal
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
        const estudiantes: Student[] = Array.isArray(data)
          ? data.map((stu: any) => ({
              id: stu.id,
              name: stu.name,
              last_name: stu.last_name,
              id_number: stu.id_number,
            }))
          : [];
        setApprovedStudents(estudiantes);
      })
      .catch(() => {
        setErrorStudents("Error al cargar la lista de estudiantes");
      })
      .finally(() => setLoadingStudents(false));
  }, [editModalOpen]);

  // 3. Abrir modal y guardar la materia actual
  const handleOpenAsignModal = (subject: Subject) => {
    setCurrentSubject(subject);
    setEditModalOpen(true);
  };

  // 4. Asignar estudiante a la materia
  const handleAssignStudent = async (studentId: string) => {
    if (!currentSubject) return;

    setAssignLoading(true);
    setAssignError(null);

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        "https://projects-app-backend-8elg.onrender.com/subject-people",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            peopleid: studentId,
            subjectid: currentSubject.id,
          }),
        }
      );

      // Si no es 2xx, extraigo el JSON de error
      if (!res.ok) {
        const errPayload = await res.json().catch(() => null);
        console.error("Error response:", errPayload || res.statusText);
        setAssignError(
          errPayload?.message ||
            errPayload?.error ||
            `Error ${res.status}: ${res.statusText}`
        );
        return;
      }

      // Éxito → cierro modal o recargo lista de materias si quieres
      setEditModalOpen(false);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setAssignError("Error de conexión al asignar estudiante");
    } finally {
      setAssignLoading(false);
    }
  };

  // 5. Sección de Alumnos
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
        {subjects.map((subject) => (
          <div key={subject.id} style={{ marginBottom: "1rem" }}>
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

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Añadir estudiantes a: {currentSubject?.name}</h3>

            {loadingStudents && <p>Cargando estudiantes...</p>}
            {errorStudents && <p style={{ color: "red" }}>{errorStudents}</p>}

            {!loadingStudents && !errorStudents && (
              <ul className="student-list">
                {approvedStudents.map((stu) => (
                  <li key={stu.id} className="student-item">
                    <div>
                      {stu.name} {stu.last_name} — Cédula: {stu.id_number}
                    </div>
                    <button
                      disabled={assignLoading}
                      onClick={() => handleAssignStudent(stu.id)}
                    >
                      {assignLoading ? "Asignando..." : "Asignar"}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {assignError && <p style={{ color: "red" }}>{assignError}</p>}

            <button
              className="modal-close-btn"
              onClick={() => setEditModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateTeacher;
