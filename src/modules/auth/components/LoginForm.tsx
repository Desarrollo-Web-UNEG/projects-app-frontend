import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../styles/login-form.css";

const LoginForm = () => {
  return (
    <div className="login-form-container">
      <h1>¡Bienvenido!</h1>
      <form>
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="dense"
          type="email"
          required
          className="email-field"
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          margin="dense"
          type="password"
          className="password-field"
          required
        />
        <Button variant="contained" type="submit" className="submit-btn">
          Iniciar Sesión
        </Button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default LoginForm;
