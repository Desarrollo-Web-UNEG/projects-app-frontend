import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { requestApi } from "@/modules/js/resquestApi";
import estudiantes from "../assets/Group_135.png";
import letterhead from "../assets/letterhead.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../styles/login-form.css";
import "../styles/register-form.css";

const RecoveryForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Paso 1: Consultar pregunta de seguridad
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess("");
    try {
      const backendUrl = import.meta.env.PROD
        ? "https://projects-app-backend-8elg.onrender.com/people/profile/security-question"
        : "/api/people/profile/security-question";
      const response = await requestApi({
        url: backendUrl,
        method: "POST",
        data: { email: email.trim().toLowerCase() },
        headers: { "Content-Type": "application/json" },
      });
      setSecurityQuestion(response.security_question);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "No se pudo encontrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Validar respuesta y cambiar contraseña
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess("");
    try {
      const backendUrl = import.meta.env.PROD
        ? "https://projects-app-backend-8elg.onrender.com/people/profile/reset-password"
        : "/api/people/profile/reset-password";
      await requestApi({
        url: backendUrl,
        method: "POST",
        data: {
          email,
          security_answer: securityAnswer,
          new_password: newPassword,
        },
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("¡Contraseña actualizada correctamente! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "No se pudo restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header-register">
        <img src={letterhead} alt="Logo UNEG" className="logo-uneg" />
      </div>
      <div className="register-container">
        {/* Bloque del formulario */}
        <div className="block-form">
          <h1 className="register-title">Recuperar Contraseña</h1>
          <form className="register-form" onSubmit={step === 1 ? handleEmailSubmit : handleResetSubmit}>
            {step === 1 && (
              <TextField
                placeholder="Correo Electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                margin="dense"
                type="email"
                required
                className="field"
              />
            )}
            {step === 2 && (
              <>
                <div className="security-question-box">
                  <HelpOutlineIcon style={{ color: "#0a2342", marginRight: 8, verticalAlign: "middle" }} />
                  <span>{securityQuestion}</span>
                </div>
                <TextField
                  placeholder="Respuesta de seguridad"
                  value={securityAnswer}
                  onChange={e => setSecurityAnswer(e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  required
                  className="field"
                />
                <TextField
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="password"
                  required
                  className="field"
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="sub-btn"
              style={{ marginTop: "24px" }}
              disabled={loading}
              fullWidth
            >
              {loading
                ? "Cargando..."
                : step === 1
                ? "Consultar pregunta"
                : "Restablecer contraseña"}
            </Button>
          </form>
          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
        </div>
        {/* Bloque de la imagen */}
        <div className="block-img">
          <img
            src={estudiantes}
            alt="4 Estudiantes"
            className="register-img"
            draggable="false"
          />
        </div>
      </div>
    </>
  );
};

export default RecoveryForm; 