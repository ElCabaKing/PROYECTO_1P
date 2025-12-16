import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Add, Edit, Delete, Search } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import "./Equipos.css";

const EquiposList = () => {
  const { clienteId } = useParams(); 
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [equipos, setEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // ============================
  // Cargar cliente + equipos
  // ============================
  useEffect(() => {
    const clientesLS = JSON.parse(localStorage.getItem("clientes")) || [];
    const equiposLS = JSON.parse(localStorage.getItem("equipos")) || [];

    const cli = clientesLS.find((c) => String(c.id) === String(clienteId));
    setCliente(cli);

    const equiposCliente = equiposLS.filter(
      (e) => String(e.clienteId) === String(clienteId)
    );
    setEquipos(equiposCliente);
  }, [clienteId]);

  // ============================
  // FILTRO
  // ============================
  const equiposFiltrados = equipos.filter((e) =>
    e.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.serie.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.falla.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ============================
  // MODAL
  // ============================
  const handleOpenModal = (equipo) => {
    setEquipoSeleccionado(equipo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEquipoSeleccionado(null);
    setOpenModal(false);
  };

  const eliminarEquipo = () => {
    const todos = JSON.parse(localStorage.getItem("equipos")) || [];
    const updated = todos.filter((e) => e.id !== equipoSeleccionado.id);
    localStorage.setItem("equipos", JSON.stringify(updated));

    setEquipos(updated.filter((e) => e.clienteId === cliente.id));
    handleCloseModal();
  };

  if (!cliente) return <h3>Cargando cliente...</h3>;

  return (
    <div className="equipos-container">

      {/* TARJETA DEL CLIENTE (Opción B) */}
      <Paper className="cliente-card" elevation={4}>
        <h2>{cliente.nombre}</h2>
        <p><strong>Documento:</strong> {cliente.documento}</p>
        <p><strong>Tipo:</strong> {cliente.tipoDocumento.toUpperCase()}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
        <p><strong>Dirección:</strong> {cliente.direccion}</p>
      </Paper>

      {/* HEADER */}
      <div className="equipos-header">
        <h2>Equipos Registrados</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(`/clientes/${clienteId}/equipos/nuevo`)}
        >
          Nuevo Equipo
        </Button>
      </div>

      {/* BUSCADOR */}
      <div className="equipos-search">
        <Search className="search-icon" />
        <TextField
          placeholder="Buscar por marca, modelo, serie..."
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* TABLA */}
      <Paper className="equipos-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Serie</TableCell>
              <TableCell>Falla</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {equiposFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  No hay equipos registrados.
                </TableCell>
              </TableRow>
            ) : (
              equiposFiltrados.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.marca}</TableCell>
                  <TableCell>{e.modelo}</TableCell>
                  <TableCell>{e.serie}</TableCell>
                  <TableCell>{e.falla}</TableCell>

                  <TableCell align="center" className="acciones-cell">
                    <Button
                      color="warning"
                      onClick={() =>
                        navigate(`/clientes/${clienteId}/equipos/editar/${e.id}`)
                      }
                    >
                      <Edit />
                    </Button>

                    <Button color="error" onClick={() => handleOpenModal(e)}>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* MODAL ELIMINAR */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Eliminar Equipo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de eliminar este equipo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={eliminarEquipo}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EquiposList;
