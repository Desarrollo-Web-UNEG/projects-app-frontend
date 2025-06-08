import imgBottom from "../assets/img_bottom.png";
import "../styles/login-img-bottom.css";

const LoginImgBottom = () => {
  return (
    <div className="login-img-bottom-container">
      <img
        src={imgBottom}
        alt="Imagen inferior de inicio de sesión"
        className="login-img-bottom"
      />
    </div>
  );
};

export default LoginImgBottom;
