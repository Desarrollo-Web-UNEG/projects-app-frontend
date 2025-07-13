import { Banner, NavBar } from "@/modules/dashboard/components";
import {
  Approval,
  BannerAdmin,
  Category,
  Grade,
  professordash,
  projects,
  students,
  Subject,
  Technology,
} from "../assets";
import { CardControl } from "../components";
import "../styles/card-control.css";
import { useParams } from "react-router-dom";


const PanelControl = () => {
  const { user_type } = useParams();

  const name =
    localStorage.getItem("user_name") +
    " " +
    localStorage.getItem("user_lastname");


  return (
    <>
      <NavBar />

      {user_type == "admin" ? (
        <>
          <Banner
            line1="¡QUE BUENO VERTE,"
            line2={name ?? ""}
            subtitle="Tu panel está listo. Comienza a gestionar usuarios y supervisar el portal académico."
            image={BannerAdmin}
          />

          <div className="card-control">
            <CardControl
              logo={Approval}
              altText="Gestionar de usuarios"
              name="Aprobar Usuarios"
            />

            <CardControl
              logo={Subject}
              altText="Gestionar materias"
              name="Materias"
            />

            {/* <CardControl
              logo={Criterion}
              altText="Gestionar Criterios"
              name="Criterios"
            /> */}

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

            {/* <CardControl
              logo={Grade}
              altText="Gestion de Calificación"
              name="Calificaciones"
            /> */}
          </div>
        </>
      ) : (
        <>
          <Banner
            line1="¡QUE BUENO VERTE,"
            line2={name ?? ""}
            subtitle="Tu panel está listo. Comienza a gestionar evaluaciones e interactuar con el portal académico."
            image={professordash}
          />

          <div className="card-control">
            <CardControl
              logo={students}
              altText="Cargar alumnos"
              name="Alumnos"
            />

            <CardControl logo={projects} altText="Proyectos" name="Proyectos" />

            <CardControl
              logo={Grade}
              altText="Calificaciones"
              name="Calificaciones"
            />
          </div>
        </>
      )}
    </>
  );
};

export default PanelControl;
