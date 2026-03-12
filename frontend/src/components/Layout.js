
import React, { useState, useEffect } from "react"; 
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TrendingPanel from "./TrendingPanel";
import FloatingCreateButton from "./FloatingCreateButton";
import { layoutStyles as styles } from "../styles/layoutStyles";

function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileContentStyle = isMobile ? {
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: "80px", 
    width: "100%"
  } : {};

  const mobileSidebarWrapper = isMobile ? {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "auto",
    zIndex: 2000
  } : {};

  return (
  <div style={{ ...styles.app, display: "flex", flexDirection: "column" }} className="app-container">
    <Navbar />

    <div 
      className="body-wrapper" 
      style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        width: "100%",
        minHeight: "100vh"
      }}
    >
      
      <Sidebar />

      <main 
        style={{
          flex: 1,
          marginLeft: isMobile ? "0" : "20px", 
          paddingBottom: isMobile ? "90px" : "20px", 
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center" 
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: isMobile ? "100%" : "700px", 
            margin: "0 auto" 
          }}
        >
          {children}
        </div>
      </main>

      {!isMobile && (
        <aside 
          style={{ 
            width: "350px", 
            padding: "20px",
            position: "sticky",
            top: "0",
            height: "fit-content"
          }}
        >
          <TrendingPanel />
        </aside>
      )}
    </div>

    {!isMobile && <FloatingCreateButton />}
  </div>
);
}

export default Layout;