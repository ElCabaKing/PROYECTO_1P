import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Box,
  Divider,
  Slide,
} from "@mui/material";

const estadoColor = {
  INGRESADO: "default",
  EN_REPARACION: "warning",
  LISTO: "info",
  ENTREGADO: "success",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 🛡️ blindaje total
const safeFecha = (valor) => {
  if (!valor) return "";
  const d = new Date(valor);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("es-EC");
};

const EquipoHistorialModal = ({ open, onClose, equipo }) => {
  if (!equipo) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Historial de reparación
        <Typography variant="subtitle2" color="text.secondary">
          {equipo.marca} {equipo.modelo} — IMEI: {equipo.imei}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {(!equipo.historial || equipo.historial.length === 0) && (
          <Typography>No hay movimientos registrados.</Typography>
        )}

        {equipo.historial?.map((item, index) => {
          const fecha = safeFecha(item.fecha);

          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={item.estado || "SIN ESTADO"}
                  color={estadoColor[item.estado] || "default"}
                  size="small"
                />

                {fecha && (
                  <Typography variant="caption" color="text.secondary">
                    {fecha}
                  </Typography>
                )}
              </Box>

              {item.tecnico && (
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, fontStyle: "italic" }}
                >
                  Técnico: {item.tecnico}
                </Typography>
              )}

              {item.observacion &&
                item.observacion !== "Invalid Date" && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Observación: {item.observacion}
                  </Typography>
                )}

              {index < equipo.historial.length - 1 && (
                <Divider sx={{ mt: 1.5 }} />
              )}
            </Box>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default EquipoHistorialModal;
