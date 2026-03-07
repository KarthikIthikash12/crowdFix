import { Link, useLocation } from "react-router-dom";
const isMobile = window.innerWidth <= 768; 
function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>FEEDS</p>
        <Link to="/" style={styles.navItem(isActive("/"))}>
          <span style={styles.icon}>🏠</span> Home
        </Link>

        <Link to="/issues/my" style={styles.navItem(isActive("/issues/my"))}>
          <span style={styles.icon}>👤</span> My Issues
        </Link>
        
        <Link to="/create" style={styles.navItem(isActive("/create"))}>
          <span style={styles.icon}>➕</span> Create New
        </Link>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <p style={styles.sectionTitle}>RESOURCES</p>
        
        <Link to="/about" style={styles.navItem(isActive("/about"))}>
          <span style={styles.icon}>ℹ️</span> About CrowdFix
        </Link>

        <Link to="/developer" style={styles.navItem(isActive("/developer"))}>
          <span style={styles.icon}>👨‍💻</span> About Developer
        </Link>

        <Link to="/help" style={styles.navItem(isActive("/help"))}>
          <span style={styles.icon}>❓</span> Help Center
        </Link>
      </div>

      <div style={styles.sidebarFooter}>
        <div style={styles.legalBox}>
          <p>© 2026 CrowdFix Inc.</p>
          <p>Made with ❤️ for the Community</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: { 
  width: isMobile ? "100%" : "260px",
  padding: isMobile ? "6px 10px" : "5px 16px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRight: isMobile ? "none" : "1px solid #e2e8f0",
  borderTop: isMobile ? "1px solid #e2e8f0" : "none",
  height: isMobile ? "60px" : "100vh",

  position: isMobile ? "fixed" : "sticky",
  bottom: isMobile ? "0" : "auto",
  left: isMobile ? "0" : "auto",
  top: isMobile ? "auto" : "0",

  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  justifyContent: isMobile ? "space-around" : "flex-start",

  zIndex: 1000,
},

  section: {
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  gap: "6px",
  alignItems: "center"
},

 sectionTitle: {
  display: isMobile ? "none" : "block",
  fontSize: "11px",
  color: "#94a3b8",
  padding: "0 12px",
  marginBottom: "10px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
},

  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: active ? "700" : "500",
    color: active ? "#6366f1" : "#475569", 
    background: active ? "#6366f110" : "transparent",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: active ? "1px solid #6366f120" : "1px solid transparent",
  }),

  icon: {
    marginRight: "12px",
    fontSize: "18px",
    width: "24px",
    display: "flex",
    justifyContent: "center",
  },

  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
    margin: "24px 12px",
  },

 sidebarFooter: {
  display: isMobile ? "none" : "block",
  marginTop: "auto",
  paddingTop: "20px",
}, 

  legalBox: {
    padding: "16px",
    borderRadius: "16px",
    background: "#f8fafc",
    fontSize: "11px",
    color: "#94a3b8",
    lineHeight: "1.6",
    textAlign: "center",
  }
};

export default Sidebar;