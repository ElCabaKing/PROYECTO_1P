import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  Avatar,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate, useParams } from "react-router-dom";
import "./Clientes.css";

const ClientesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    tipoDocumento: "cedula",
    documento: "",
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  // -------------------------
  // Validaciones
  // -------------------------
  const validarCedula = (cedula) => /^\d{10}$/.test(cedula);
  const validarPasaporte = (p) => /^[A-Za-z0-9]{6,15}$/.test(p);
  const validarEmail = (e) => /\S+@\S+\.\S+/.test(e);
  const validarTelefono = (t) => /^\d{7,15}$/.test(t);

  const validarCampos = () => {
    const err = {};

    if (!formData.documento) {
      err.documento = "Ingrese identificación";
    } else {
      if (formData.tipoDocumento === "cedula") {
        if (!validarCedula(formData.documento)) {
          err.documento = "Cédula inválida";
        }
      } else {
        if (!validarPasaporte(formData.documento)) {
          err.documento = "Pasaporte inválido";
        }
      }
    }

    if (!formData.nombre || formData.nombre.trim().length < 3) {
      err.nombre = "Ingrese nombre válido";
    }
    if (!formData.apellido || formData.apellido.trim().length < 2) {
      err.apellido = "Ingrese apellido válido";
    }
    if (!validarTelefono(formData.telefono)) {
      err.telefono = "Teléfono inválido";
    }
    if (!validarEmail(formData.correo)) {
      err.correo = "Correo inválido";
    }
    if (!formData.direccion || formData.direccion.trim().length < 4) {
      err.direccion = "Dirección inválida";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // -------------------------
  // Cargar datos si es edición
  // -------------------------
  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("clientes");
      if (stored) {
        const arr = JSON.parse(stored);
        const cliente = arr.find((c) => String(c.id) === String(id));
        if (cliente) {
          setFormData({
            tipoDocumento: cliente.tipoDocumento || "cedula",
            documento: cliente.documento || "",
            nombre: cliente.nombre || "",
            apellido: cliente.apellido || "",
            telefono: cliente.telefono || "",
            correo: cliente.correo || "",
            direccion: cliente.direccion || "",
          });
        }
      }
    }
  }, [id]);

  // -------------------------
  // Guardar
  // -------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      setSnackbar({ open: true, message: "Corrija los errores del formulario", type: "error" });
      return;
    }

    const stored = localStorage.getItem("clientes");
    const arr = stored ? JSON.parse(stored) : [];

    if (id) {
      // Editar
      const updated = arr.map((c) =>
        String(c.id) === String(id)
          ? {
              ...c,
              tipoDocumento: formData.tipoDocumento,
              documento: formData.documento,
              nombre: formData.nombre,
              apellido: formData.apellido,
              telefono: formData.telefono,
              correo: formData.correo,
              direccion: formData.direccion,
            }
          : c
      );
      localStorage.setItem("clientes", JSON.stringify(updated));
      setSnackbar({ open: true, message: "Cliente actualizado correctamente", type: "info" });

    } else {
      // Crear
      const nuevo = {
        id: Date.now(),
        tipoDocumento: formData.tipoDocumento,
        documento: formData.documento,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        correo: formData.correo,
        direccion: formData.direccion,
      };
      arr.unshift(nuevo);
      localStorage.setItem("clientes", JSON.stringify(arr));
      setSnackbar({ open: true, message: "Cliente registrado", type: "success" });
    }

    setTimeout(() => navigate("/clientes"), 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="clientes-form-container">
      <Paper className="clientes-form-card" elevation={6}>
        <div className="clientes-form-header">
          <Avatar sx={{ bgcolor: "#2563eb", width: 56, height: 56 }}>
            <PersonAddAltIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" className="clientes-form-title">
            {id ? "Editar Cliente" : "Registrar Cliente"}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="clientes-form">
          <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Tipo Documento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
              >
                <MenuItem value="cedula">Cédula</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Documento"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                error={!!errors.documento}
                helperText={errors.documento}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombres"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellidos"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                error={!!errors.apellido}
                helperText={errors.apellido}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                error={!!errors.telefono}
                helperText={errors.telefono}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                error={!!errors.correo}
                helperText={errors.correo}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                error={!!errors.direccion}
                helperText={errors.direccion}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/clientes")}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.type}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ClientesForm;
