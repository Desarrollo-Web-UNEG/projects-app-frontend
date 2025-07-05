import { Light } from "../assets";
import "../styles/card-info.css";
import Button from "./Button";

interface CardInfoProps {
    title?: string;
    description?: string;
    icon?: string;
    isApprobated?:boolean;
}


const CardInfo = ({ icon=Light,title="Item x", description="Descripcion", isApprobated=false }: CardInfoProps) => {
    return (
        <>

        {isApprobated ? (
            <>
            <div className="card-info">
          
                <div className="card-info__item">
                    <img src={icon} alt="icono de control" />

                    <div className="card-info__item__text">
                        <h3>{title}</h3>
                        <li>{description}</li>
                    </div>
                
                <div className="btn-align">
                    <Button name='Aprobar' classComp='approbated'/>
                    <Button name='Rechazar' classComp='denied'/>

                </div>
                  
                </div>


            </div>
            
            
            </>
        ) : (
            <>
            
            <div className="card-info">
          
                <div className="card-info__item">
                    <img src={icon} alt="icono de control" />

                    <div className="card-info__item__text">
                        <h3>{title}</h3>
                        <li>{description}</li>
                    </div>


                </div>


            </div>

            
            </>
        )}



        </>
        
       
    )
}

export default CardInfo;