import React from "react";
import "../styles/studentprojectstable.css";


interface Project {
  id: number;
  title?: string;
  evaluationScore?: number;
  subject?: {
    id: number;
    name: string;
  };
}

interface Props {
  projects: Project[];
}

const StudentProjectsTable: React.FC<Props> = ({ projects }) => {
  if (projects.length === 0) {
    return <div className="empty-message">No tienes proyectos evaluados aún.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="student-projects-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Proyecto</th>
            <th>Asignatura</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <tr key={project.id}>
              <td>{idx + 1}</td>
              <td>{project.title || "Sin título"}</td>
              <td>{project.subject?.name || "Sin asignatura"}</td>
              <td className={project.evaluationScore !== undefined && project.evaluationScore >= 60 ? "score-passed" : "score-failed"}>
                {project.evaluationScore !== undefined ? project.evaluationScore : "Sin nota"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentProjectsTable;
