import "../styles/resumecard.css";

const ResumeCard = () => {
  return (
    <section className="resume-section">
      {/* Información personal (negrita antes de los dos puntos) */}
      <div className="resume-info">
        <ul>
          <li><strong>Nombre</strong>: Rinardo José Salazar Miranda</li>
          <li><strong>Carrera</strong>: Ingeniería en Informática</li>
          <li><strong>Semestre</strong>: 6to</li>
        </ul>
      </div>

      {/* Estadísticas académicas (negrita después de los dos puntos) */}
      <div className="resume-stats">
        <ul>
          <li>Proyectos entregados: <strong>4</strong></li>
          <li>Proyectos pendientes: <strong>2</strong></li>
          <li>Última calificación: <strong>19/25 (Proyecto CRUD)</strong></li>
          <li>Materias en curso: <strong>7</strong></li>
          <li>Ranking actual: <strong>#5 en la carrera</strong></li>
        </ul>
      </div>
    </section>
  );
};

export default ResumeCard;
