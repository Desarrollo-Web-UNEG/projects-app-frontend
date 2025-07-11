import { Light } from "../assets";
import "../styles/card-info.css";
import Button from "./Button";

interface CardInfoProps {
  title?: string;
  description?: string;
  rol_type?: string;
  icon?: string;
  isApprobated?: boolean;
  userId?: string;
  onActionSuccess?: (userId: string) => void;

  onClickApprove?: () => void; // Para abrir modal aprobación
}

const CardInfo = ({
  icon = Light,
  title = "Item x",
  description = "Descripcion",
  isApprobated = false,
  rol_type = "",
  userId,
  onActionSuccess,
  onClickApprove,
}: CardInfoProps) => {
  return (
    <>
      {isApprobated ? (
        <div className="card-info">
          <div className="card-info__item">
            <img src={icon} alt="icono de control" draggable="false" />

            <div className="card-info__item__text">
              <h3>{title}</h3>
              <li>{description}</li>
              <li>{rol_type === "professor" ? "Profesor" : "Estudiante"}</li>
            </div>

            <div className="btn-align">
              {/* Solo muestra botón aprobar si viene la función */}
              {onClickApprove && (
                <button className="approbated" onClick={onClickApprove}>
                  Aprobar
                </button>
              )}

              {/* Botón rechazar directo (puedes cambiarlo si quieres usar modal) */}
              <Button
                name="Rechazar"
                classComp="denied"
                userId={userId}
                onActionSuccess={onActionSuccess}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="card-info">
          <div className="card-info__item">
            <img src={icon} alt="icono de control" draggable="false" />

            <div className="card-info__item__text">
              <h3>{title}</h3>
              <li>{description}</li>
            </div>

              <div className="btn-align">
          
      
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardInfo;
