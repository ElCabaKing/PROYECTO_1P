import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";

const Historial = () => {
  const [equipos, setEquipos] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");

  useEffect(() => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");
    const clientesLS = JSON.parse(localStorage.getItem("clientes") || "[]");

    const historicos = equiposLS
      .filter(
        (e) => e.estado === "LISTO" || e.estado === "ENTREGADO"
      )
      .map((e) => {
        const cliente = clientesLS.find(
          (c) => String(c.id) === String(e.clienteId)
        );
        return { ...e, cliente };
      });

    setEquipos(historicos);
  }, []);

  const filtrados =
    filtro === "TODOS"
      ? equipos
      : equipos.filter((e) => e.estado === filtro);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Historial de equipos
      </Typography>

      <Select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        sx={{ mb: 3 }}
      >
        <MenuItem value="TODOS">Todos</MenuItem>
        <MenuItem value="LISTO">Listos</MenuItem>
        <MenuItem value="ENTREGADO">Entregados</MenuItem>
      </Select>

      <Grid container spacing={2}>
        {filtrados.length === 0 ? (
          <Typography color="text.secondary">
            No hay registros.
          </Typography>
        ) : (
          filtrados.map((eq) => (
            <Grid item xs={12} sm={6} md={4} key={eq.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {eq.marca} {eq.modelo}
                  </Typography>

                  <Chip
                    label={eq.estado}
                    color={eq.estado === "ENTREGADO" ? "success" : "warning"}
                    sx={{ mb: 1 }}
                  />

                  <Typography>
                    Cliente: <strong>{eq.cliente?.nombre}</strong>
                  </Typography>

                  <Typography variant="body2">
                    Falla: {eq.falla}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Ingreso: {eq.fechaIngreso}
                  </Typography>

                  {eq.historial && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">
                        Historial:
                      </Typography>
                      {eq.historial.map((h, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          display="block"
                        >
                          {h.fecha} – {h.de} → {h.a} ({h.tecnico})
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Historial;
