import { Light } from "../assets";
import "../styles/card-info.css";

interface CardInfoProps {
    title?: string;
    description?: string;
    icon?: string;
}


const CardInfo = ({ icon=Light,title="Item x", description="Descripcion" }: CardInfoProps) => {
    return (
        <div className="card-info">
          
          <div className="card-info__item">
            <img src={icon} alt="icono de control" />

            <div className="card-info__item__text">
                <h3>{title}</h3>
                <li>{description}</li>
            </div>
        </div>
           
            
        </div>
    )
}

export default CardInfo;