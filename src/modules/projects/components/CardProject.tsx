
import { Button } from "@/modules/users/admin/components"
import "../styles/cardproject.css"

interface CardProps {
    title: string;
    description: string;
    projectId?:string;
}


const CardProject = ({ title, description, projectId }: CardProps) => {
    return (
       <>
        <div className="cardCont">
            <h3 className="card-project-title">{title}</h3>
            <p className="card-project-desc">{description}</p>
            <div className="card-project-actions">
                <Button name="Editar" classComp="card-btn-edit" projectId={projectId} />
                {/* <button className="card-btn-rubric">Crear rúbrica</button> */}
            </div>
       </div>
       
       
       </>
    );
}

export default CardProject