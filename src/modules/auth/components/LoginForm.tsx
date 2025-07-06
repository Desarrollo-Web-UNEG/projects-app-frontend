import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import "../styles/login-form.css";
import {requestApi} from "@/modules/js/resquestApi"



const adornemet = {
  email: ( <InputAdornment position="start"><EmailIcon /></InputAdornment>),
  password: ( <InputAdornment position="start"><LockIcon /></InputAdornment>),
}

const LoginForm = () => {
  // Estados para email, password, error y loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const backendUrl = import.meta.env.PROD
        ? "https://projects-app-backend.onrender.com/auth/login"
        : "/api/auth/login";

    try {

    // Solicitud a la api
     const response = await requestApi({
      url: backendUrl,
      method: "POST",
      data: { email, password },
      headers: { 'Content-Type': 'application/json' }
      });
      
    // Guarda el token,nombre,apellido y rol en localStorage
   localStorage.setItem('access_token', response.access_token);
   localStorage.setItem('user_name', response.user.name)
   localStorage.setItem('user_lastname', response.user.last_name)
   localStorage.setItem('user_usertype', response.user.user_type)
    console.log(response);

      if(response.user.user_type == 'student'){
        navigate("/dashboard");
      }else if(response.user.user_type =='admin'){
        navigate(`/panel-control/${response.user.user_type}`);
      }else{
        navigate(`/panel-control-professor/:${response.user.user_type}`)
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="title">¡Bienvenido!</h1>
      <h2 className="subtitle">Accede a tu espacio de aprendizaje</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="dense"
          type="email"
          required
          className="email-field"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          value={password}
          onChange={e => setPassword(e.target.value)}
          slotProps={{ input: { startAdornment: adornemet.password }}}
        />
        {error && <div className="login-error">{error}</div>}
        <div className="register-btn-container">
          <Link to="/register" className="register-btn">
            Solicitar registro
          </Link>
        </div>
        <Button variant="contained" type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
