import "../styles/letterhead.css";
import { letterHead, letterHeadResponsive } from "@auth/assets";
import { ReactNode } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  children?: ReactNode;
}

const Letterhead = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { children } = props;

  return isMobile ? (
    <div className="letterhead-container">
      <img
        src={letterHeadResponsive}
        alt="Letterhead Responsive"
        className="letterhead"
      />
      {children}
    </div>
  ) : (
    <div className="letterhead-container">
      <img src={letterHead} alt="Letterhead" className="letterhead" />
      {children}
    </div>
  );
};

export default Letterhead;
