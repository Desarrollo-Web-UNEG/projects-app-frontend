import { requestApi } from "@/modules/js/resquestApi";
import "../styles/button.css"
import React from "react";

interface ButtonProps {
    name: string;
    classComp: string;
    userId?: string;
    projectId?: string;
    onActionSuccess?: (userId: string) => void;
    onClick?: () => void;
}



const Button: React.FC<ButtonProps> = ({ name, classComp, userId, onActionSuccess, projectId, onClick }) => {
    const actionButton = async () => {
        const token = localStorage.getItem("access_token");
        let endpoint = "";
        if (name === "Aprobar") {
            endpoint = `https://projects-app-backend.onrender.com/people/admin/${userId}/approve`;
        } else if (name === "Rechazar") {
            endpoint = `https://projects-app-backend.onrender.com/people/admin/${userId}/reject`;
        } else if (projectId) {
            // Future: handle project actions
        }

        // If a custom onClick is provided, call it (for generic buttons like 'Crear proyecto')
        if (onClick) {
            onClick();
            return;
        }
        // If not, only handle approve/reject/project actions
        if (!endpoint) return;

        try {
            await requestApi({
                url: endpoint,
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            // Llama a la función para actualizar el estado en el padre
            if (onActionSuccess && userId) {
                onActionSuccess(userId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button className={classComp} onClick={actionButton}>
            {name}
        </button>
    );
};

export default Button;
