import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ClienteHeader from "./ClienteHeader";
import EquipoModal from "./EquipoModal";
import EquipoHistorialModal from "./EquipoHistorialModal";
import EquipoQRModal from "./EquipoQRModal";

// 🎨 Colores según estado
const estadoStyles = {
  INGRESADO: { bg: "#f3f4f6", color: "#374151", label: "Ingresado" },
  EN_REPARACION: { bg: "#fff7ed", color: "#c2410c", label: "En reparación" },
  LISTO: { bg: "#eff6ff", color: "#1d4ed8", label: "Listo" },
  ENTREGADO: { bg: "#ecfdf5", color: "#047857", label: "Entregado" },
};

// 🆔 Generar código de seguimiento
const generarCodigoSeguimiento = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `RS-${year}-${random}`;
};

const EquiposCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [equipos, setEquipos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("new");
  const [editingEquipo, setEditingEquipo] = useState(null);

  // Historial
  const [historialOpen, setHistorialOpen] = useState(false);
  const [equipoHistorial, setEquipoHistorial] = useState(null);

  // QR
  const [qrOpen, setQrOpen] = useState(false);
  const [equipoQR, setEquipoQR] = useState(null);

  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");

    setCliente(clientes.find((c) => String(c.id) === String(id)));
    setEquipos(equiposLS.filter((e) => String(e.clienteId) === String(id)));
  }, [id]);

  const guardarEquipos = (lista) => {
    localStorage.setItem("equipos", JSON.stringify(lista));
    setEquipos(lista.filter((e) => String(e.clienteId) === String(id)));
  };

  const guardarDesdeModal = (data) => {
    const equiposLS = JSON.parse(localStorage.getItem("equipos") || "[]");

    if (modalMode === "new") {
      equiposLS.unshift({
        id: Date.now().toString(),
        clienteId: String(id),
        tipo: "Celular",
        codigoSeguimiento: generarCodigoSeguimiento(),
        ...data,
        estado: "INGRESADO",
        fechaIngreso: new Date().toISOString().slice(0, 10),
        historial: [
          {
            estado: "INGRESADO",
            fecha: new Date().toISOString(),
            tecnico: "Recepción",
          },
        ],
      });
    } else {
      const updated = equiposLS.map((e) =>
        e.id === editingEquipo.id ? { ...e, ...data } : e
      );
      guardarEquipos(updated);
      setModalOpen(false);
      return;
    }

    guardarEquipos(equiposLS);
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ClienteHeader cliente={cliente} onAdd={() => setModalOpen(true)} />

      <Grid container spacing={2}>
        {equipos.map((eq) => {
          const style = estadoStyles[eq.estado] || estadoStyles.INGRESADO;

          return (
            <Grid item xs={12} sm={6} md={4} key={eq.id}>
              <Card
                sx={{
                  height: "100%",
                  background: style.bg,
                  borderLeft: `6px solid ${style.color}`,
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {eq.marca} {eq.modelo}
                  </Typography>

                  <Chip
                    label={style.label}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: style.color,
                      color: "#fff",
                    }}
                  />

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Código:</strong> {eq.codigoSeguimiento}
                  </Typography>

                  <Typography variant="body2">
                    <strong>IMEI:</strong> {eq.imei}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Falla:</strong> {eq.falla}
                  </Typography>

                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Ingreso: {eq.fechaIngreso}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setEditingEquipo(eq);
                        setModalMode("edit");
                        setModalOpen(true);
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setEquipoHistorial(eq);
                        setHistorialOpen(true);
                      }}
                    >
                      Historial
                    </Button>

                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        setEquipoQR(eq);
                        setQrOpen(true);
                      }}
                    >
                      QR
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <EquipoModal
        open={modalOpen}
        mode={modalMode}
        initialData={editingEquipo}
        onClose={() => {
          setModalOpen(false);
          setEditingEquipo(null);
          setModalMode("new");
        }}
        onSave={guardarDesdeModal}
      />

      <EquipoHistorialModal
        open={historialOpen}
        equipo={equipoHistorial}
        onClose={() => {
          setHistorialOpen(false);
          setEquipoHistorial(null);
        }}
      />

      <EquipoQRModal
        open={qrOpen}
        equipo={equipoQR}
        onClose={() => {
          setQrOpen(false);
          setEquipoQR(null);
        }}
      />
    </Box>
  );
};

export default EquiposCliente;
