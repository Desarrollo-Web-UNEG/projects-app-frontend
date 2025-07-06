import estudiantes from "../assets/Group_135.png";
import { Button, TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ModeIcon from "@mui/icons-material/Mode";
import CallIcon from "@mui/icons-material/Call";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import KeyIcon from '@mui/icons-material/Key';
import "../styles/register-form.css";
import {requestApi} from "@/modules/js/resquestApi"
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const RegisterForm = () => {
  // Estados para cada campo del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  // yearOfCreation se obtiene automáticamente antes de enviar
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!userType) {
    setError("Debes seleccionar un tipo de usuario.");
    return;
    }

    const backendUrl = import.meta.env.PROD
      ? "https://projects-app-backend.onrender.com/people/auth/register"
      : "/api/people/auth/register";

    // Obtener fecha actual del equipo en formato YYYY-MM-DD
    const now = new Date();
    const yearOfCreation = now.toISOString().split("T")[0];

    try {
      // Solicitud a la api
      const response = await requestApi({
        url: backendUrl,
        method: "POST",
        data: {
        name,
        last_name: lastName,
        address,
        user_type: userType,
        birthdate, 
        email,
        phone_number: phoneNumber,
        id_number: idNumber,
        security_question: securityQuestion,
        security_answer: securityAnswer,
        yearOfCreation,
        password
      },
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccess("Su solicitud fue enviada, debe esperar la aprobacion del administrador.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="register-container">
      {/* Bloque del formulario */}
      <div className="block-form">
        <h1 className="register-title">Registro de Usuario</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="two_fields">
            <TextField
              placeholder="Nombres"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              required
              className="field flex-in"
              value={name}
              onChange={e => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ModeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Apellidos"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              required
              className="field"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ModeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="two_fields">
            <TextField
              placeholder="Dirección"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              required
              className="field"
              value={address}
              onChange={e => setAddress(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />

            
            <TextField
              select
              label=""
              variant="outlined"
              fullWidth
              margin="dense"
              required
              className="field"
              value={userType}
              onChange={e => setUserType(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="" disabled>Selecciona tipo de usuario</option>
              <option value="student">Estudiante</option>
              <option value="professor">Profesor</option>
            </TextField>
         
          </div>
          <div>
          <TextField
          label="Fecha de nacimiento"
          variant="outlined"
          fullWidth
          margin="dense"
          type="date"
          required
          className="field"
          InputLabelProps={{ shrink: true }}
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          />    
          </div>
          <div>
            <TextField
              placeholder="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="dense"
              type="email"
              required
              className="field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              placeholder="Contraseña"
              variant="outlined"
              fullWidth
              margin="dense"
              type="password"
              required
              className="field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="two_fields">
            <TextField
            placeholder="Teléfono"
            variant="outlined"
            fullWidth
            margin="dense"
            type="text"
            required
            className="field"
            value={phoneNumber}
            onChange={e => {
              // Solo permite números
              const value = e.target.value.replace(/\D/g, "");
              setPhoneNumber(value);
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 11,
              minLength: 11
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              ),
            }}
            />
            <TextField
            placeholder="Nro de Cédula"
            variant="outlined"
            fullWidth
            margin="dense"
            type="text"
            required
            className="field"
            value={idNumber}
            onChange={e => {
              // Solo permite números
              const value = e.target.value.replace(/\D/g, "");
              setIdNumber(value);
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 8,
              minLength: 8
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactEmergencyIcon />
                </InputAdornment>
              ),
            }}
          />
          </div>

          <div>
            <TextField
              placeholder="Pregunta de Seguridad"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              required
              className="field"
              value={securityQuestion}
              onChange={e => setSecurityQuestion(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HelpOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              placeholder="Respuesta"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              required
              className="field"
              value={securityAnswer}
              onChange={e => setSecurityAnswer(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriorityHighIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <Button
            variant="contained"
            type="submit"
            className="sub-btn"
            style={{ marginTop: "24px" }}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Finalizar registro"}
          </Button>
        </form>
      </div>

      {/* Bloque de la imagen */}
      <div className="block-img">
        <img src={estudiantes} alt="4 Estudiantes" className="register-img" />
      </div>
    </div>
  );
};

export default RegisterForm;
