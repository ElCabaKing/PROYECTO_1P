import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Divider,
} from "@mui/material";

// 🎨 estilos por estado
const estadoStyles = {
  INGRESADO: { color: "#374151", bg: "#f3f4f6", label: "Ingresado" },
  EN_REPARACION: { color: "#c2410c", bg: "#fff7ed", label: "En reparación" },
  LISTO: { color: "#1d4ed8", bg: "#eff6ff", label: "Listo" },
  ENTREGADO: { color: "#047857", bg: "#ecfdf5", label: "Entregado" },
};

const SeguimientoPage = () => {
  const [valor, setValor] = useState("");
  const [equipo, setEquipo] = useState(null);
  const [error, setError] = useState("");

  const buscarEquipo = () => {
    const equipos = JSON.parse(localStorage.getItem("equipos") || "[]");

    const encontrado = equipos.find(
      (e) =>
        e.imei === valor ||
        e.codigoSeguimiento === valor
    );

    if (!encontrado) {
      setEquipo(null);
      setError("No se encontró ningún equipo con esos datos.");
      return;
    }

    setEquipo(encontrado);
    setError("");
  };

  const estado = equipo ? estadoStyles[equipo.estado] : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f2937, #111827)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🔍 Seguimiento de reparación
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Ingresa tu IMEI o código de seguimiento
          </Typography>

          <TextField
            fullWidth
            label="IMEI o código"
            sx={{ mt: 2 }}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={buscarEquipo}
          >
            Consultar
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {equipo && (
            <>
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6">
                {equipo.marca} {equipo.modelo}
              </Typography>

              <Chip
                label={estado.label}
                sx={{
                  mt: 1,
                  backgroundColor: estado.color,
                  color: "#fff",
                }}
              />

              <Typography sx={{ mt: 2 }}>
                <strong>IMEI:</strong> {equipo.imei}
              </Typography>

              <Typography>
                <strong>Ingreso:</strong> {equipo.fechaIngreso}
              </Typography>

              {/* Historial */}
              {equipo.historial && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">
                    Historial
                  </Typography>

                  {equipo.historial.map((h, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="text.secondary"
                    >
                      • {h.estado} —{" "}
                      {new Date(h.fecha).toLocaleString()}  
                      {h.tecnico ? ` (${h.tecnico})` : ""}
                    </Typography>
                  ))}
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SeguimientoPage;
