import { useState } from "react";
import { Letterhead } from "@/modules/auth/components";
import DehazeIcon from "@mui/icons-material/Dehaze";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@dashboard/styles/navbar.css";

// Botones del menú
const menuButtons = (
  <>
    <button>Inicio</button>
    <button>Proyectos</button>
    <button>Perfil</button>
    <button>Cerrar Sesión</button>
  </>
);

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

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
