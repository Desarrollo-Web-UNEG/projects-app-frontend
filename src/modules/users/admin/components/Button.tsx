import "../styles/button.css"

interface ButtonProps {
    name: string;
    classComp:string;
}

// Falta la accion que permite abrir el modal y crear el registro
const Button = ({name, classComp} : ButtonProps) => {
    return (
        <button className={classComp}>
            {name}
        </button>
    )
}

export default Button;