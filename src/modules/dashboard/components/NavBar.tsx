import { Letterhead } from "@/modules/auth/components";
import "@dashboard/styles/navbar.css";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <Letterhead>
          <nav>
            <button>Inicio</button>
            <button>Proyectos</button>
            <button>Perfil</button>
            <button>Cerrar Sesión</button>
          </nav>
        </Letterhead>
      </div>
    </>
  );
};

export default NavBar;
