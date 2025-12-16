import React, { useState } from "react";
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
  Pagination,
  IconButton,
} from "@mui/material";

import { Add, Edit, Delete, Search } from "@mui/icons-material";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

const ClientesList = () => {
  const navigate = useNavigate();

  // ============================
  // Cargar desde localStorage
  // ============================
  const cargarClientes = () => {
    const stored = localStorage.getItem("clientes");

    if (stored) return JSON.parse(stored);

    // Si no existe nada, cargar clientes base
    const iniciales = [
      {
        id: 1,
        documento: "0102030405",
        tipoDocumento: "cedula",
        nombre: "Carlos Pérez",
        telefono: "0987654321",
        correo: "carlos@example.com",
        direccion: "Av. Universitaria",
      },
      {
        id: 2,
        documento: "P98233A",
        tipoDocumento: "pasaporte",
        nombre: "Ana López",
        telefono: "0981112233",
        correo: "ana@example.com",
        direccion: "Cdla. El Maestro",
      },
      {
        id: 3,
        documento: "0912345678",
        tipoDocumento: "cedula",
        nombre: "Jorge Ruiz",
        telefono: "0987651122",
        correo: "jorge@example.com",
        direccion: "Las Brisas",
      },
    ];

    localStorage.setItem("clientes", JSON.stringify(iniciales));
    return iniciales;
  };

  const [clientes, setClientes] = useState(cargarClientes());
  const [busqueda, setBusqueda] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // FILTRO
  const clientesFiltrados =clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.documento.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.telefono.includes(busqueda) ||
    c.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // PAGINACIÓN
  const itemsPorPagina = 5;
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(clientesFiltrados.length / itemsPorPagina);

  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  const handlePagina = (event, value) => {
    setPagina(value);
  };

  // ============================
  // ELIMINAR
  // ============================
  const handleOpenModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setClienteSeleccionado(null);
    setOpenModal(false);
  };

  const eliminarCliente = () => {
    const updated = clientes.filter((c) => c.id !== clienteSeleccionado.id);
    setClientes(updated);
    localStorage.setItem("clientes", JSON.stringify(updated));
    handleCloseModal();
  };

  return (
    <div className="clientes-container">

      {/* HEADER */}
      <div className="clientes-header">
        <h2>Clientes</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/clientes/nuevo")}
        >
          Nuevo Cliente
        </Button>
      </div>

      {/* BUSCADOR */}
      <div className="clientes-search">
        <Search className="search-icon" />
        <TextField
          variant="outlined"
          placeholder="Buscar por nombre, documento, correo..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
          fullWidth
        />
      </div>

      {/* TABLA */}
      <Paper className="clientes-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clientesPaginados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            ) : (
              clientesPaginados.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.documento}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {c.tipoDocumento}
                  </TableCell>
                  <TableCell>{c.nombre}</TableCell>
                  <TableCell>{c.telefono}</TableCell>
                  <TableCell>{c.correo}</TableCell>
                  <TableCell>{c.direccion}</TableCell>

                  <TableCell align="center" className="acciones-cell">

                    {/* EDITAR */}
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/clientes/editar/${c.id}`)}
                    >
                      <Edit />
                    </IconButton>

                    {/* EQUIPOS – BOTÓN MORADO */}
                    <IconButton
                      onClick={() => navigate(`/clientes/${c.id}/equipos`)}
                    >
                      <LaptopChromebookIcon sx={{ color: "#8b00ff" }} />
                    </IconButton>

                    {/* ELIMINAR */}
                    <IconButton color="error" onClick={() => handleOpenModal(c)}>
                      <Delete />
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* PAGINACIÓN */}
      {clientesFiltrados.length > itemsPorPagina && (
        <div className="paginacion-container">
          <Pagination
            count={totalPaginas}
            page={pagina}
            onChange={handlePagina}
            color="primary"
            size="medium"
          />
        </div>
      )}

      {/* MODAL CONFIRMACIÓN */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de eliminar al cliente{" "}
            <strong>{clienteSeleccionado?.nombre}</strong>?  
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={eliminarCliente}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ClientesList;
