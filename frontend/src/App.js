import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";

import ClientesList from "./pages/Clientes/ClientesList";
import ClientesForm from "./pages/Clientes/ClientesForm";
import EquiposClientePage from "./pages/Clientes/EquiposClientePage";
import ReparacionesList from "./pages/Reparaciones/ReparacionesList";
import ReparacionDetalle from "./pages/Reparaciones/ReparacionDetalle";
import SeguimientoPage from "./pages/Seguimiento/SeguimientoPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />

        <Route path="/clientes" element={<MainLayout><ClientesList /></MainLayout>} />
        <Route path="/clientes/nuevo" element={<MainLayout><ClientesForm /></MainLayout>} />
        <Route path="/clientes/editar/:id" element={<MainLayout><ClientesForm /></MainLayout>} />

        <Route path="/clientes/:id/equipos" element={<MainLayout><EquiposClientePage /></MainLayout>} />
        <Route path="/reparaciones" element={<MainLayout><ReparacionesList /></MainLayout>}/>
        <Route path="/reparaciones/:id" element={<MainLayout><ReparacionDetalle /></MainLayout>}/>
        <Route path="/seguimiento" element={<SeguimientoPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
