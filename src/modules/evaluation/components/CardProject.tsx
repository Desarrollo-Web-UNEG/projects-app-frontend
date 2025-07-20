import { Button } from "@/modules/users/admin/components";
import "../styles/cardproject.css";

interface CardProps {
  title: string;
  description: string;
  projectId?: string;
  categoryId?: string;
  subjectId?: string;
  technologyIds?: string[];
  onEvaluate?: () => void; // ✅ Solo se necesita esta prop ahora
}

const CardProject = ({
  title,
  description,
  projectId,
  onEvaluate,
}: CardProps) => {
  return (
    <div className="cardCont">
      <h3 className="card-project-title">{title}</h3>
      <p className="card-project-desc">{description}</p>
      <div className="card-project-actions">
        {onEvaluate && (
          <Button
            name="Corregir"
            classComp="card-btn-correct"
            projectId={projectId}
            onClick={onEvaluate}
          />
        )}
      </div>
    </div>
  );
};

export default CardProject;
