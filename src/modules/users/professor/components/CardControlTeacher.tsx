import { useNavigate } from "react-router-dom";

interface CardControlProps {
  logo: string;
  altText?: string;
  name: string;
}

const CardControlTeacher = ({
  logo,
  name,
  altText = "logo descriptivo",
}: CardControlProps) => {
  const navigate = useNavigate();

  const menu = ["Alumnos", "Proyectos", "Calificaciones"];

  const handleClick = () => {
    if (menu.includes(name)) {
      navigate(`/template-teacher/${name}`);
    }
  };

  return (
    <button className="button-control" onClick={handleClick}>
      <img className="img-control" src={logo} alt={altText} draggable="false" />
      <span className="text-control">{name}</span>
    </button>
  );
};

export default CardControlTeacher;
