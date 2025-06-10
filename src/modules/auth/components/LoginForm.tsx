import { Link } from "react-router-dom";
import { Button, TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import "../styles/login-form.css";

const adornemet = {
  email: ( <InputAdornment position="start"><EmailIcon /></InputAdornment>),
  password: ( <InputAdornment position="start"><LockIcon /></InputAdornment>),
}

const LoginForm = () => {
  return (
    <div className="login-form-container">
      <h1 className="title">¡Bienvenido!</h1>
      <h2 className="subtitle">Accede a tu espacio de aprendizaje</h2>
      <form>
        <TextField
          placeholder="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="dense"
          type="email"
          required
          className="email-field"
          slotProps={{ input: { startAdornment: adornemet.email }}}
        />
        <TextField
          placeholder="Contraseña"
          variant="outlined"
          fullWidth
          margin="dense"
          type="password"
          className="password-field"
          required
          slotProps={{ input: { startAdornment: adornemet.password }}}
        />
        <div className="register-btn-container">
          <Link to="/register" className="register-btn">
            Solicitar registro
          </Link>
        </div>
        <Button variant="contained" type="submit" className="submit-btn">
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
