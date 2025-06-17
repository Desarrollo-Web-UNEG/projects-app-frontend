import "../styles/dashboard.css";

const ResumeCard = () => {
  return (
    <section className="resume-section">
      <div className="resume-info">
        <p><strong>Nombre:</strong> Rinardo José Salazar Miranda</p>
        <p><strong>Carrera:</strong> Ingeniería en Informática</p>
        <p><strong>Semestre:</strong> 6to</p>
      </div>

      <div className="resume-stats">
        <p><strong>Proyectos entregados:</strong> 4</p>
        <p><strong>Proyectos pendientes:</strong> 2</p>
        <p><strong>Última calificación:</strong> 19/25 (<strong>Proyecto CRUD</strong>)</p>
        <p><strong>Materias en curso:</strong> 7</p>
        <p><strong>Ranking actual:</strong> <strong>#5 en la carrera</strong></p>
      </div>
    </section>
  );
};

export default ResumeCard;
