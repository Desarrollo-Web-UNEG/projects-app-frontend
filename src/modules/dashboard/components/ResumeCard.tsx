import "../styles/resumecard.css";

interface ResumeCardProps {
  name: string;
  career: string;
  // semester: string;
  deliveredProjects: number;
  pendingProjects: number;
  // lastGrade: string;
  currentSubjects: number;
  // ranking: string;
}

const ResumeCard = ({
  name,
  career,
  // semester,
  deliveredProjects,
  pendingProjects,
  // lastGrade,
  currentSubjects,
  // ranking,
}: ResumeCardProps) => {
  return (
    <section className="resume-section">
      {/* Información personal */}
      <div className="resume-info">
        <ul>
          <li><strong>Nombre</strong>: {name}</li>
          <li><strong>Carrera</strong>: {career}</li>
          {/* <li><strong>Semestre</strong>: {semester}</li> */}
        </ul>
      </div>

      {/* Estadísticas académicas */}
      <div className="resume-stats">
        <ul>
          <li>Proyectos entregados: <strong>{deliveredProjects}</strong></li>
          <li>Proyectos pendientes: <strong>{pendingProjects}</strong></li>
          {/* <li>Última calificación: <strong>{lastGrade}</strong></li> */}
          <li>Materias en curso: <strong>{currentSubjects}</strong></li>
          {/* <li>Ranking actual: <strong>{ranking}</strong></li> */}
        </ul>
      </div>
    </section>
  );
};

export default ResumeCard;
