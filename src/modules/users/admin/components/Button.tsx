import "../styles/button.css"

interface ButtonProps {
    name: string;
}

// Falta la accion que permite abrir el modal y crear el registro
const Button = ({name} : ButtonProps) => {
    return (
        <button className="btn">
           Crear {name}
        </button>
    )
}

export default Button;