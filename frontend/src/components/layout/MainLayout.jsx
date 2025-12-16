import React from "react";
import Sidebar from "./Sidebar";
import TopRightActions from "./TopRightActions";

const drawerWidth = 230;

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: drawerWidth,
          minHeight: "100vh",
          padding: "20px",
          background: "linear-gradient(135deg, #7da0db, #b5bfcf)",
        }}
      >
        <TopRightActions />
        {children}
      </main>
    </>
  );
};

export default MainLayout;

