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

      {!isMobile && <div style={styles.divider} />}
      {!isMobile && <p style={styles.sectionTitle}>RESOURCES</p>}

      <Link to="/about" style={styles.navItem(isActive("/about"), isMobile)}>
        <span style={styles.icon(isMobile)}>ℹ️</span> 
        {!isMobile && "About CrowdFix"}
      </Link>

      <Link to="/developer" style={styles.navItem(isActive("/developer"), isMobile)}>
        <span style={styles.icon(isMobile)}>👨‍💻</span> 
        {!isMobile && "About Developer"}
      </Link>

      <Link to="/help" style={styles.navItem(isActive("/help"), isMobile)}>
        <span style={styles.icon(isMobile)}>❓</span> 
        {!isMobile && "Help Center"}
      </Link>

      {!isMobile && (
        <div style={styles.sidebarFooter}>
          <div style={styles.legalBox}>
            <p>© 2026 CrowdFix Inc.</p>
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
  
  padding: isMobile ? "0" : "24px 16px",
  background: "#ffffff",
  borderTop: isMobile ? "1px solid #e2e8f0" : "none",
  borderRight: isMobile ? "none" : "1px solid #e2e8f0",
  justifyContent: isMobile ? "space-around" : "flex-start",
  alignItems: "center",
  zIndex: 9999,
  boxShadow: isMobile ? "0 -4px 12px rgba(0,0,0,0.08)" : "none",
});

const styles = {
  sectionTitle: { fontSize: "11px", color: "#94a3b8", padding: "0 12px", marginBottom: "10px", fontWeight: "700", textTransform: "uppercase" },
  navItem: (active, isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    textDecoration: "none",
    flex: isMobile ? 1 : "initial",
    padding: isMobile ? "10px 0" : "12px 16px",
    borderRadius: isMobile ? "0" : "14px",
    fontSize: isMobile ? "10px" : "14px",
    fontWeight: active ? "700" : "500",
    color: active ? "#6366f1" : "#475569", 
    background: active && !isMobile ? "#6366f110" : "transparent",
    transition: "all 0.2s ease",
  }),
  icon: (isMobile) => ({
    marginRight: isMobile ? "0" : "12px",
    fontSize: isMobile ? "22px" : "18px",
    display: "flex",
    justifyContent: "center",

    opacity: 1,
  }),
  divider: { height: "1px", background: "#e2e8f0", margin: "24px 12px" },
  sidebarFooter: { marginTop: "auto", paddingTop: "20px" },
  legalBox: { padding: "16px", background: "#f8fafc", borderRadius: "16px", fontSize: "11px", color: "#94a3b8", textAlign: "center" }
};

export default Sidebar;