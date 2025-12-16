import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Campos del formulario
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // Mensajes de error
  const [error, setError] = useState("");

  const background = "/img/fondo.jpg";

  const handleLogin = (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (usuario.trim() === "" || password.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Si pasa las validaciones:
    setError("");
    console.log("Datos listos para enviar al backend:");
    console.log({ usuario, password });
  };

  return (
    <div
      className="glass-login-wrapper"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={6}
        className={`glass-card ${error ? "shake" : ""}`}
        sx={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "18px",
          padding: "45px 40px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom className="login-title">
          <Lock className="lock-icon" />
          Iniciar Sesión
        </Typography>

        {/* Mostrar error si existe */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Usuario"
            variant="filled"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="input-field"
            margin="normal"
            InputProps={{
              style: {
                background: "rgba(255,255,255,0.2)",
                borderRadius: "6px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            variant="filled"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            margin="normal"
            InputProps={{
              style: {
                background: "rgba(255,255,255,0.2)",
                borderRadius: "6px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            className="glass-btn"
            disabled={!usuario || !password}
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
