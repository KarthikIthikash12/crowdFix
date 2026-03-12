import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;

  return (
    <div style={getSidebarStyles(isMobile)}>
      <div style={getSectionStyle(isMobile)}>
        {!isMobile && <p style={styles.sectionTitle}>FEEDS</p>}
        
        <Link to="/" style={styles.navItem(isActive("/"), isMobile)}>
          <span style={styles.icon(isMobile)}>🏠</span> 
          {!isMobile && "Home"}
        </Link>

        <Link to="/issues/my" style={styles.navItem(isActive("/issues/my"), isMobile)}>
          <span style={styles.icon(isMobile)}>👤</span> 
          {!isMobile && "My Issues"}
        </Link>
        
        <Link to="/create" style={styles.navItem(isActive("/create"), isMobile)}>
          <span style={styles.icon(isMobile)}>➕</span> 
          {!isMobile && "Create New"}
        </Link>
      </div>

      {!isMobile && <div style={styles.divider} />}

      <div style={getSectionStyle(isMobile)}>
        {!isMobile && <p style={styles.sectionTitle}>RESOURCES</p>}
        
        <Link to="/about" style={styles.navItem(isActive("/about"), isMobile)}>
          <span style={styles.icon(isMobile)}>ℹ️</span> 
          {!isMobile && "About"}
        </Link>

        <Link to="/developer" style={styles.navItem(isActive("/developer"), isMobile)}>
          <span style={styles.icon(isMobile)}>👨‍💻</span> 
          {!isMobile && "Dev"}
        </Link>

        <Link to="/help" style={styles.navItem(isActive("/help"), isMobile)}>
          <span style={styles.icon(isMobile)}>❓</span> 
          {!isMobile && "Help"}
        </Link>
      </div>

      {!isMobile && (
        <div style={styles.sidebarFooter}>
          <div style={styles.legalBox}>
            <p>© 2026 CrowdFix</p>
          </div>
        </div>
      )}
    </div>
  );
}


const getSidebarStyles = (isMobile) => ({
  width: isMobile ? "100%" : "260px",
  height: isMobile ? "70px" : "100vh",
  position: isMobile ? "fixed" : "sticky",
  bottom: isMobile ? 0 : "auto",
  top: isMobile ? "auto" : 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  padding: isMobile ? "0 5px" : "24px 16px",
  background: "#ffffff",
  borderTop: isMobile ? "1px solid #e2e8f0" : "none",
  borderRight: isMobile ? "none" : "1px solid #e2e8f0",
  justifyContent: isMobile ? "space-around" : "flex-start",
  alignItems: isMobile ? "center" : "stretch",
  zIndex: 9999,
  boxShadow: isMobile ? "0 -4px 12px rgba(0,0,0,0.08)" : "none",
});

const getSectionStyle = (isMobile) => ({
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  gap: isMobile ? "2px" : "6px",
  width: isMobile ? "auto" : "100%",
  justifyContent: "space-around",
});

const styles = {
  sectionTitle: { fontSize: "11px", color: "#94a3b8", padding: "0 12px", marginBottom: "10px", fontWeight: "700", textTransform: "uppercase" },
  navItem: (active, isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    textDecoration: "none",
    padding: isMobile ? "10px 5px" : "12px 16px",
    borderRadius: "14px",
    fontSize: isMobile ? "10px" : "14px",
    fontWeight: active ? "700" : "500",
    color: active ? "#6366f1" : "#475569", 
    background: active ? "#6366f110" : "transparent",
    transition: "all 0.2s ease",
  }),
  icon: (isMobile) => ({
    marginRight: isMobile ? "0" : "12px",
    fontSize: isMobile ? "22px" : "18px",
    display: "flex",
    justifyContent: "center",
  }),
  divider: { height: "1px", background: "#e2e8f0", margin: "24px 12px" },
  sidebarFooter: { marginTop: "auto", paddingTop: "20px" },
  legalBox: { padding: "16px", background: "#f8fafc", borderRadius: "16px", fontSize: "11px", color: "#94a3b8", textAlign: "center" }
};

export default Sidebar;