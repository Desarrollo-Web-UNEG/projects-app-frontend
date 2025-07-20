import "../styles/resumecard.css";

interface ResumeCardProps {
  name: string;
  career: string;
  deliveredProjects: number;
  currentSubjects: number;
}

const ResumeCard = ({
  name,
  career,
  deliveredProjects,
  currentSubjects,
}: ResumeCardProps) => {
  return (
    <section className="resume-section">
      {/* Información personal */}
      <div className="resume-info">
        <ul>
          <li><strong>Nombre</strong>: {name}</li>
          <li><strong>Carrera</strong>: {career}</li>
        </ul>
      </div>

      {/* Estadísticas académicas */}
      <div className="resume-stats">
        <ul>
          <li>Proyectos entregados: <strong>{deliveredProjects}</strong></li>
          <li>Materias en curso: <strong>{currentSubjects}</strong></li>
        </ul>
      </div>
    </section>
  );
};

export default ResumeCard;
