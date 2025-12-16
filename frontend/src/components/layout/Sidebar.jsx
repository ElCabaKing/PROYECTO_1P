import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  People,
  Build,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Clientes", icon: <People />, path: "/clientes" },
    { text: "Reparaciones", icon: <Build />, path: "/reparaciones" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 230,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 230,
          background: "linear-gradient(180deg, #1f2937, #111827)",
          color: "white",
          borderRight: "1px solid #374151",
        },
      }}
    >
      <div className="sidebar-title">📱 Repair System</div>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            className="sidebar-item"
          >
            <ListItemIcon sx={{ color: "#9ca3af" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
