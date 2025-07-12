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
  showDeleteButton?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  showEditButton?: boolean;
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
  showDeleteButton = false,
  onDelete,
  onEdit,
  showEditButton = false,
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
              {onClickApprove && (
                <button className="approbated" onClick={onClickApprove}>
                  Aprobar
                </button>
              )}
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
          <div className="card-info__item" style={{ position: 'relative' }}>
            <img src={icon} alt="icono de control" draggable="false" />
            <div className="card-info__item__text">
              <h3>{title}</h3>
              {description !== 'Descripcion' && (
                <li>{description}</li>
              )}
            </div>
            <div className="btn-align">
              {showDeleteButton && (
                <button
                  className="card-btn-delete"
                  style={{ marginTop: 8, marginRight: 0, alignSelf: 'flex-end' }}
                  onClick={onDelete}
                >
                  Eliminar
                </button>
              )}
            </div>
            {showEditButton && (
              <button
                className="card-btn-edit"
                style={{ position: 'absolute', top: '50%', right: 24, transform: 'translateY(-50%)', zIndex: 2 }}
                onClick={onEdit}
              >
                Editar
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardInfo;
