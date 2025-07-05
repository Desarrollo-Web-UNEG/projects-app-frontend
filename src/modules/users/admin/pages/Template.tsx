import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { Button, CardInfo, Search } from "../components";
import { Book, Categ2, Language, Light, User } from "../assets";
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

    const concat = 'Crear ' + name;


    return(
        <>
        <NavBar/>
      

    { name != 'Aprobrar Usuarios' ? (
        <>
        <div>
            <div className="search-button-container">
                <div className="inside-control-search">
                <h2 className="st-h2">{name}</h2>
                <Search/>
                <Button name={concat ?? ""} classComp="btn"/>
                </div>
            </div>      
            <CardInfo icon={icon ?? ""} />
            <CardInfo icon={icon ?? ""} title="Título personalizado" description="Descripción personalizada" />
            <CardInfo icon={icon ?? ""} />
        </div>

        </>
    ) : (
        <>
            <div className="search-button-container">
                <div className="inside-control-search">
                <h2 className="st-h2">{name}</h2>
                <Search/>
            
                </div>
            </div>

            <CardInfo icon={User ?? ""} isApprobated={true} />
            <CardInfo icon={User ?? ""} isApprobated={true} title="Título personalizado" description="Descripción personalizada" />
            <CardInfo icon={User ?? ""} isApprobated={true} />
        </>
    )}  
        </>
    )
}

export default Template;