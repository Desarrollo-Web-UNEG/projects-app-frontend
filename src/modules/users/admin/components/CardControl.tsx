import { useNavigate } from "react-router-dom";
import "../styles/card-control.css"

interface CardControlProps {
    logo: string;
    altText?: string;
    name: string;
}

const CardControl = ({ logo, name, altText = "logo descriptivo"}: CardControlProps) => {
    
    const navigate = useNavigate();

     const handleClick = () => {
        // Redirige a la ruta deseada, puedes personalizar la ruta usando name
        navigate(`/template/${name}`);
    };

    return (
      
        <button className="button-control" onClick={handleClick}>
           <img className="img-control" src={logo} alt={altText} />
           <span className="text-control">{name}</span>
        </button>
      
    )
}

export default CardControl;