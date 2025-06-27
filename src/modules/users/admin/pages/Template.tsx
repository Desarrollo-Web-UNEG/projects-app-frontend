import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { Button, CardInfo, Search } from "../components";
import { Book, Categ2, Language, Light } from "../assets";
import "../styles/template.css";



const Template = () => {

    const iconMap: Record<string, string> = {
    Materias: Book,
    Criterios: Light,
    Tecnologias: Language,
    Categorias: Categ2,
    };

    const { name } = useParams();

    const icon = name ? iconMap[name] : null;

    return(
        <>
        <NavBar/>
      
        <div>

            <div className="search-button-container">
                <div className="inside-control-search">
                <h2 className="st-h2">{name}</h2>
                <Search/>
                <Button name={name ?? ""} />
                </div>
            </div>

{/* Aqui se debe agrear una iteracion para cada registro */}
            <CardInfo icon={icon ?? ""} />
            <CardInfo icon={icon ?? ""} title="Título personalizado" description="Descripción personalizada" />
            <CardInfo icon={icon ?? ""} />
        </div>

        
        </>
    )


    
}

export default Template;