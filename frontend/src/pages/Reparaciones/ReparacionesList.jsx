import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

/*
  Estados posibles:
  INGRESADO
  EN_REPARACION
  LISTO
  ENTREGADO
*/

const estados = [
  { value: "EN_REPARACION", label: "En reparación" },
  { value: "LISTO", label: "Listo" },
];

const colorEstado = (estado) => {
  switch (estado) {
    case "INGRESADO":
      return "default";
    case "EN_REPARACION":
      return "warning";
    case "LISTO":
      return "success";
    default:
      return "default";
  }
};

const ReparacionesList = () => {
  const [equipos, setEquipos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [modalEstado, setModalEstado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [observacion, setObservacion] = useState("");

  const [modalHistorial, setModalHistorial] = useState(null);

  // =========================
  // CARGAR DATOS
  // =========================
  useEffect(() => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");
    const clientesLS = JSON.parse(localStorage.getItem("clientes") || "[]");

    const activos = equiposLS
      .filter((e) => e.estado !== "ENTREGADO")
      .map((e) => {
        const cliente = clientesLS.find(
          (c) => String(c.id) === String(e.clienteId)
        );
        return { ...e, cliente };
      });

    setEquipos(activos);
    setClientes(clientesLS);
  }, []);

  // =========================
  // ABRIR MODAL ESTADO
  // =========================
  const abrirEstado = (eq) => {
    setModalEstado(eq);
    setNuevoEstado(eq.estado === "INGRESADO" ? "EN_REPARACION" : eq.estado);
    setTecnico("");
    setObservacion("");
  };

  // =========================
  // GUARDAR CAMBIO ESTADO
  // =========================
  const guardarEstado = () => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");

    const updated = equiposLS.map((e) => {
      if (String(e.id) === String(modalEstado.id)) {
        const historial = e.historial || [];

        historial.unshift({
          tipo: "estado",
          de: e.estado,
          a: nuevoEstado,
          tecnico: tecnico || "Técnico",
          descripcion: observacion || "",
          fecha: new Date().toISOString(), // ✅ FECHA CORRECTA
        });

        return {
          ...e,
          estado: nuevoEstado,
          historial,
        };
      }
      return e;
    });

    localStorage.setItem("equipos", JSON.stringify(updated));

    const refrescado = updated
      .filter((e) => e.estado !== "ENTREGADO")
      .map((e) => {
        const cliente = clientes.find(
          (c) => String(c.id) === String(e.clienteId)
        );
        return { ...e, cliente };
      });

    setEquipos(refrescado);
    setModalEstado(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Reparaciones
      </Typography>

      <Grid container spacing={2}>
        {equipos.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No hay equipos en reparación.
            </Typography>
          </Grid>
        ) : (
          equipos.map((eq) => (
            <Grid item xs={12} sm={6} md={4} key={eq.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {eq.marca} {eq.modelo}
                  </Typography>

                  <Chip
                    label={eq.estado}
                    color={colorEstado(eq.estado)}
                    sx={{ mt: 1 }}
                  />

                  <Typography sx={{ mt: 1 }}>
                    Cliente: <strong>{eq.cliente?.nombre}</strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Tel: {eq.cliente?.telefono}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Falla: {eq.falla}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Ingreso: {eq.fechaIngreso}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => abrirEstado(eq)}
                    >
                      Cambiar estado
                    </Button>

                    <Button
                      size="small"
                      onClick={() => setModalHistorial(eq)}
                    >
                      Historial
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* MODAL CAMBIO ESTADO */}
      <Dialog open={Boolean(modalEstado)} onClose={() => setModalEstado(null)}>
        <DialogTitle>Cambiar estado</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            select
            label="Nuevo estado"
            fullWidth
            sx={{ mb: 2 }}
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
          >
            {estados.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Técnico"
            fullWidth
            sx={{ mb: 2 }}
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
          />

          <TextField
            label="Observación"
            fullWidth
            multiline
            rows={3}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalEstado(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarEstado}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL HISTORIAL */}
      <Dialog
        open={Boolean(modalHistorial)}
        onClose={() => setModalHistorial(null)}
        fullWidth
      >
        <DialogTitle>Historial del equipo</DialogTitle>
        <DialogContent dividers>
          {modalHistorial?.historial?.length ? (
            modalHistorial.historial.map((h, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="subtitle2">
                  Estado: {h.de} → {h.a}
                </Typography>

                {h.descripcion && (
                  <Typography variant="body2">
                    {h.descripcion}
                  </Typography>
                )}

                <Typography variant="caption" color="text.secondary">
                  Técnico: {h.tecnico} —{" "}
                  {new Date(h.fecha).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              Sin historial
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalHistorial(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReparacionesList;
