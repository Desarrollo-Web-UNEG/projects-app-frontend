import estudiantesImg from "../assets/2_estudiantes.png";
import "../styles/login-img.css";

const LoginImg = () => {
  return (
    <div className="login-img-container">
      <img src={estudiantesImg} alt="2 Estudiantes" className="login-img" />
    </div>
  );
};

export default LoginImg;
