import { useState } from "react";
import { Letterhead } from "@/modules/auth/components";
import DehazeIcon from "@mui/icons-material/Dehaze";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "@dashboard/styles/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const userType = localStorage.getItem("user_usertype");

  let menuButtons;
  if (userType === "professor") {
    menuButtons = (
      <>
        <Link to="/dashboard">
          <button>Inicio</button>
        </Link>
        <Link to="/projects">
          <button>Proyectos</button>
        </Link>
        <Link to="/evaluations">
          <button>Evaluaciones</button>
        </Link>
        <Link to="/chatbot">
          <button>Chatbot IA</button>
        </Link>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </>
    );
  } else if (userType === "student") {

    menuButtons = (
      <>
        <Link to="/dashboard">
          <button>Inicio</button>
        </Link>
        <Link to="/projects">
          <button>Proyectos</button>
        </Link>
        <Link to="/evaluations">
          <button>Evaluaciones</button>
        </Link>
        <Link to="/chatbot">
          <button>Chatbot IA</button>
        </Link>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </>
    );
  } else if (userType === "admin") {

    menuButtons = (
      <>
        <Link to="/dashboard">
          <button>Inicio</button>
        </Link>

        <button>Crear</button>

        <button>Usuarios</button>

        <Link to="/projects">
          <button>Proyectos</button>
        </Link>
        <Link to="/chatbot">
          <button>Chatbot IA</button>
        </Link>
        <Link to="/evaluations">
          <button>Evaluaciones</button>
        </Link>
        <Link to="/perfil">
          <button>Perfil</button>
        </Link>

        <button onClick={handleLogout}>Cerrar Sesión</button>
      </>
    );

  }

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  return isMobile ? (
    <div className="navbar">
      <Letterhead>
        <IconButton
          className="menu-button"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <DehazeIcon />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <div className="drawer-content" onClick={toggleDrawer(false)}>
            {menuButtons}
          </div>
        </Drawer>
      </Letterhead>
    </div>
  ) : (
    <div className="navbar">
      <Letterhead>
        <nav>{menuButtons}</nav>
      </Letterhead>
    </div>
  );
};

export default NavBar;
