import { requestApi } from "@/modules/js/resquestApi";
import "../styles/button.css"

interface ButtonProps {
    name: string;
    classComp: string;
    userId?: string;
    onActionSuccess?: (userId: string) => void;
    onClick?: () => void;  // <-- Agregado onClick externo opcional
}

const Button = ({
  name,
  classComp,
  userId,
  onActionSuccess,
  onClick,
}: ButtonProps) => {

  const actionButton = async () => {
    if (onClick) {
      onClick();  // Si se pasa onClick externo, ejecutarlo y salir
      return;
    }

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
