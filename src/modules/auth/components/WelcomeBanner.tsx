import studentsImage from "../assets/Group_135.png";
import "../styles/welcomebanner.css";

const WelcomeBanner = () => {
  return (
    <section className="welcome-banner">
      <div className="banner-text">
        <h1>
          <span>¡QUE BUENO VERTE,</span>
          <span>RINARDO!</span>
        </h1>
        <p>Revisa tus tareas, evalúa o entrega proyectos</p>
      </div>
      <img src={studentsImage} alt="Estudiantes" className="banner-image" />
    </section>
  );
};

export default WelcomeBanner;
