import { requestApi } from "@/modules/js/resquestApi";
import "../styles/button.css"

interface ButtonProps {
    name: string;
    classComp: string;
    userId?: string;
    onActionSuccess?: (userId: string) => void;
}

const Button = ({ name, classComp, userId, onActionSuccess }: ButtonProps) => {
    const actionButton = async () => {
        const token = localStorage.getItem("access_token");
        let endpoint = "";
        if (name === "Aprobar") {
            endpoint = `https://projects-app-backend.onrender.com/people/admin/${userId}/approve`;
        } else if (name === "Rechazar") {
            endpoint = `https://projects-app-backend.onrender.com/people/admin/${userId}/reject`;
        } else {
            return;
        }

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