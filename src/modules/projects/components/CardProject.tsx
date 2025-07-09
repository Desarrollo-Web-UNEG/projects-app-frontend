
import { Button } from "@/modules/users/admin/components"
import "../styles/cardproject.css"
import React, { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface CardProps {
    title: string;
    description: string;
    projectId?: string;
    categoryId?: string;
    subjectId?: string;
    technologyIds?: string[];
    onEdit?: () => void;
    onDelete?: (id: string) => void;
}



const CardProject = ({ title, description, projectId, categoryId, subjectId, technologyIds, onEdit, onDelete }: CardProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    return (
       <>
        <div className="cardCont">
            <h3 className="card-project-title">{title}</h3>
            <p className="card-project-desc">{description}</p>
            <div className="card-project-actions">
                <Button name="Editar" classComp="card-btn-edit" projectId={projectId} onClick={onEdit} />
                <Button name="Eliminar" classComp="card-btn-delete" projectId={projectId} onClick={() => setShowConfirm(true)} />
            </div>
            <ConfirmDeleteModal
                open={showConfirm}
                projectTitle={title}
                onConfirm={() => {
                    if (projectId && onDelete) onDelete(projectId);
                    setShowConfirm(false);
                }}
                onCancel={() => setShowConfirm(false)}
            />
            {/*
            <div style={{ display: 'none' }}>
                <span>{categoryId}</span>
                <span>{subjectId}</span>
                <span>{technologyIds && technologyIds.join(',')}</span>
            </div>
            */}
       </div>
       </>
    );
}

export default CardProject