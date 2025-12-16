import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

/*
  Este módulo NO guarda datos propios.
  Todo se modifica directamente sobre "equipos" en localStorage.
*/

const ReparacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipo, setEquipo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Flujo lógico de estados
  const estados = {
    INGRESADO: ["EN_REPARACION"],
    EN_REPARACION: ["LISTO"],
    LISTO: ["ENTREGADO"],
    ENTREGADO: [],
  };

  useEffect(() => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");
    const found = equiposLS.find((e) => String(e.id) === String(id));

    if (!found) {
      setLoading(false);
      return;
    }

    // Al abrir reparación por primera vez
    if (found.estado === "INGRESADO") {
      found.estado = "EN_REPARACION";
      found.fechaInicioReparacion = new Date()
        .toISOString()
        .slice(0, 10);

      const updated = equiposLS.map((e) =>
        String(e.id) === String(id) ? found : e
      );

      localStorage.setItem("equipos", JSON.stringify(updated));
    }

    setEquipo(found);
    setLoading(false);
  }, [id]);

  const handleSave = () => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");

    const actualizado = {
      ...equipo,
      fechaEntrega:
        equipo.estado === "ENTREGADO"
          ? new Date().toISOString().slice(0, 10)
          : equipo.fechaEntrega || null,
    };

    const updated = equiposLS.map((e) =>
      String(e.id) === String(id) ? actualizado : e
    );

    localStorage.setItem("equipos", JSON.stringify(updated));
    navigate("/reparaciones");
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (!equipo) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Equipo no encontrado</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/reparaciones")}
        >
          Volver
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reparación – {equipo.marca} {equipo.modelo}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            IMEI / Serie: {equipo.imei || "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Falla reportada: {equipo.falla || "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Inicio reparación: {equipo.fechaInicioReparacion || "—"}
          </Typography>

          {equipo.fechaEntrega && (
            <Typography variant="body2" color="text.secondary">
              Fecha entrega: {equipo.fechaEntrega}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <TextField
              label="Diagnóstico"
              multiline
              rows={3}
              fullWidth
              value={equipo.diagnostico || ""}
              onChange={(e) =>
                setEquipo({ ...equipo, diagnostico: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Estado"
              value={equipo.estado}
              onChange={(e) =>
                setEquipo({ ...equipo, estado: e.target.value })
              }
              sx={{ mb: 3 }}
            >
              <MenuItem value={equipo.estado}>
                {equipo.estado}
              </MenuItem>

              {estados[equipo.estado]?.map((est) => (
                <MenuItem key={est} value={est}>
                  {est}
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSave}
            >
              Guardar cambios
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReparacionDetalle;
