import imgTop from "../assets/img_top.png";
import "../styles/login-img-top.css";

const LoginImgTop = () => {
  return (
    <div className="login-img-top-container">
      <img
        src={imgTop}
        alt="Imagen superior de inicio de sesión"
        className="login-img-top"
      />
    </div>
  );
};

export default LoginImgTop;
