import "@auth/styles/index.css";
import { LoginForm } from "@auth/components";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { imgBottom, imgTop, twoStudentsImg } from "@auth/assets";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <>
      <div className="login-img-top-container">
        <img src={imgTop} className="login-img-top" />
      </div>
      <div className="main-container">
        <LoginForm />
      </div>
      <div>
        <img src={imgBottom} className="login-img-bottom" />
      </div>
    </>
  ) : (
    <div className="main-container">
      <div className="login-img-container">
        <img src={twoStudentsImg} className="login-img" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
