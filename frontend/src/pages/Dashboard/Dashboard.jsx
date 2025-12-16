import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Dashboard = () => {
  const [equiposListos, setEquiposListos] = useState([]);
  const [confirmar, setConfirmar] = useState(null);

  // =========================
  // CARGAR EQUIPOS LISTOS
  // =========================
  const cargarDatos = () => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");
    const clientesLS = JSON.parse(localStorage.getItem("clientes") || "[]");

    const listos = equiposLS
      .filter((e) => e.estado === "LISTO")
      .map((e) => {
        const cliente = clientesLS.find(
          (c) => String(c.id) === String(e.clienteId)
        );
        return { ...e, cliente };
      });

    setEquiposListos(listos);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // =========================
  // ENTREGAR EQUIPO
  // =========================
  const entregarEquipo = () => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");

    const updated = equiposLS.map((e) =>
      String(e.id) === String(confirmar.id)
        ? {
            ...e,
            estado: "ENTREGADO",
            historial: [
              ...(e.historial || []),
              {
                tipo: "estado",
                de: "LISTO",
                a: "ENTREGADO",
                tecnico: "Recepción",
                fecha: new Date().toLocaleString(),
              },
            ],
          }
        : e
    );

    localStorage.setItem("equipos", JSON.stringify(updated));
    setConfirmar(null);
    cargarDatos();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {/* RESUMEN */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">
                Equipos listos para entregar
              </Typography>
              <Typography variant="h4">{equiposListos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* LISTA DE LISTOS */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Listos para entrega
      </Typography>

      <Grid container spacing={2}>
        {equiposListos.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No hay equipos listos para entregar.
            </Typography>
          </Grid>
        ) : (
          equiposListos.map((eq) => (
            <Grid item xs={12} sm={6} md={4} key={eq.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {eq.marca} {eq.modelo}
                  </Typography>

                  <Chip
                    label="LISTO"
                    color="success"
                    sx={{ mt: 1 }}
                  />

                  <Typography sx={{ mt: 1 }}>
                    Cliente: <strong>{eq.cliente?.nombre}</strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Tel: {eq.cliente?.telefono}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Ingreso: {eq.fechaIngreso}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setConfirmar(eq)}
                    >
                      Entregar equipo
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* CONFIRMACIÓN */}
      <Dialog open={Boolean(confirmar)} onClose={() => setConfirmar(null)}>
        <DialogTitle>Confirmar entrega</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Confirmar entrega del equipo{" "}
            <strong>
              {confirmar?.marca} {confirmar?.modelo}
            </strong>{" "}
            al cliente{" "}
            <strong>{confirmar?.cliente?.nombre}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmar(null)}>Cancelar</Button>
          <Button color="success" variant="contained" onClick={entregarEquipo}>
            Entregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
