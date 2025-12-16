import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./TopRightActions.css";

const TopRightActions = () => {
  const handleLogout = () => {
    // Más adelante aquí limpiarás token / sesión
    console.log("Cerrar sesión");
  };

  return (
    <div className="top-actions">
      <Tooltip title="Cerrar sesión">
        <IconButton onClick={handleLogout} className="logout-btn">
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default TopRightActions;
