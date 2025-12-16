import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

const EquipoQRModal = ({ open, onClose, equipo }) => {
  if (!equipo) return null;

  const urlSeguimiento = `${window.location.origin}/seguimiento/${equipo.codigoSeguimiento}`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    urlSeguimiento
  )}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Código de seguimiento</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <img
            src={qrUrl}
            alt="QR seguimiento"
            width={200}
            height={200}
          />

          <Typography variant="body2">
            <strong>Código:</strong> {equipo.codigoSeguimiento}
          </Typography>

          <Typography
            variant="caption"
            align="center"
            color="text.secondary"
          >
            Escanee este código para ver el estado de su reparación
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EquipoQRModal;
