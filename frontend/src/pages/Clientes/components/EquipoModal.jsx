import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const EquipoModal = ({ open, onClose, onSave, mode, initialData }) => {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    imei: "",
    falla: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        marca: initialData.marca || "",
        modelo: initialData.modelo || "",
        imei: initialData.imei || "",
        falla: initialData.falla || "",
      });
    } else {
      setForm({
        marca: "",
        modelo: "",
        imei: "",
        falla: "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "edit" ? "Editar equipo" : "Registrar equipo"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Marca"
              name="marca"
              fullWidth
              value={form.marca}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Modelo"
              name="modelo"
              fullWidth
              value={form.modelo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="IMEI / Serie"
              name="imei"
              fullWidth
              value={form.imei}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Falla reportada"
              name="falla"
              fullWidth
              multiline
              rows={3}
              value={form.falla}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "edit" ? "Guardar cambios" : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipoModal;
