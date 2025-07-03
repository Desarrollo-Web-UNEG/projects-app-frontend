import { Banner, NavBar } from "@/modules/dashboard/components";
import { Approval, BannerAdmin, Category, Criterion, Grade, Subject, Technology } from "../assets";
import { CardControl } from "../components";
import "../styles/card-control.css"

const PanelControl = () => {

    

    return (
        <>
        <NavBar/> 

        <Banner
        line1="¡QUE BUENO VERTE,"
        line2="RINARDO!"
        subtitle="Tu panel está listo. Comienza a gestionar usuarios y supervisar el portal académico."
        image={BannerAdmin}
        />

        <div className="card-control">

        <CardControl
        logo={Approval}
        altText="Gestionar de usuarios"
        name="Aprobrar Usuarios"
        />

        <CardControl
        logo={Subject}
        altText="Gestionar materias"
        name="Materias"
        />

        <CardControl
        logo={Criterion}
        altText="Gestionar Criterios"
        name="Criterios"
        />
        
        <CardControl
        logo={Category}
        altText="Gestionar Categorías"
        name="Categorias"
        />

        <CardControl
        logo={Technology}
        altText="Gestionar Tecnologias"
        name="Tecnologias"
        />

        <CardControl
        logo={Grade}
        altText="Gestion de Calificación"
        name="Calificaciones"
        />
       </div>
    </>
    )
}

export default PanelControl;