import React from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";

const ClienteHeader = ({ cliente, onAdd }) => {
  if (!cliente) return null;

  const name = cliente.nombre || cliente.nombres || `${cliente.nombre || ""} ${cliente.apellido || ""}`;
  const initial = (name && name.length > 0) ? name.charAt(0).toUpperCase() : "U";

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      mb: 3,
      width: "100%"
    }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 72, height: 72, fontSize: 28 }}>
          {initial}
        </Avatar>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <strong>Cédula:</strong> {cliente.documento}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Tel:</strong> {cliente.telefono} &nbsp; • &nbsp; <strong>Correo:</strong> {cliente.correo}
          </Typography>

          {cliente.direccion && (
            <Typography variant="body2" color="text.secondary">
              <strong>Dirección:</strong> {cliente.direccion}
            </Typography>
          )}
        </Box>
      </Box>

      <Box>
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            color: "#fff",
            px: 3,
            py: 1.1,
            borderRadius: 2,
            boxShadow: "0 6px 12px rgba(37,99,235,0.15)"
          }}
        >
          + Agregar Equipo
        </Button>
      </Box>
    </Box>
  );
};

export default ClienteHeader;
