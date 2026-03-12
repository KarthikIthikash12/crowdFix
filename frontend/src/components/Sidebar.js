// import { Link, useLocation } from "react-router-dom";
// const isMobile = window.innerWidth <= 768; 
// function Sidebar() {
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div style={styles.sidebar}>

//       <div style={styles.section}>
//         <p style={styles.sectionTitle}>FEEDS</p>
//         <Link to="/" style={styles.navItem(isActive("/"), isMobile)}>
//           <span style={styles.icon}>🏠</span> Home
//         </Link>

//         <Link to="/issues/my" style={styles.navItem(isActive("/issues/my"))}>
//           <span style={styles.icon}>👤</span> My Issues
//         </Link>
        
//         <Link to="/create" style={styles.navItem(isActive("/create"))}>
//           <span style={styles.icon}>➕</span> Create New
//         </Link>
//       </div>

//       <div style={styles.divider} />

//       <div style={styles.section}>
//         <p style={styles.sectionTitle}>RESOURCES</p>
        
//         <Link to="/about" style={styles.navItem(isActive("/about"))}>
//           <span style={styles.icon}>ℹ️</span> About CrowdFix
//         </Link>

//         <Link to="/developer" style={styles.navItem(isActive("/developer"))}>
//           <span style={styles.icon}>👨‍💻</span> About Developer
//         </Link>

//         <Link to="/help" style={styles.navItem(isActive("/help"))}>
//           <span style={styles.icon}>❓</span> Help Center
//         </Link>
//       </div>

//       <div style={styles.sidebarFooter}>
//         <div style={styles.legalBox}>
//           <p>© 2026 CrowdFix Inc.</p>
//           <p>Made with ❤️ for the Community</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
// //   sidebar: { 
// //   width: isMobile ? "100%" : "260px",
// //   padding: isMobile ? "6px 10px" : "5px 16px",
// //   background: "rgba(255, 255, 255, 0.9)",
// //   backdropFilter: "blur(10px)",
// //   borderRight: isMobile ? "none" : "1px solid #e2e8f0",
// //   borderTop: isMobile ? "1px solid #e2e8f0" : "none",
// //   height: isMobile ? "60px" : "100vh",

// //   position: isMobile ? "fixed" : "sticky",
// //   bottom: isMobile ? "0" : "auto",
// //   left: isMobile ? "0" : "auto",
// //   top: isMobile ? "auto" : "0",

// //   display: "flex",
// //   flexDirection: isMobile ? "row" : "column",
// //   justifyContent: isMobile ? "space-around" : "flex-start",

// //   zIndex: 1000,
// // },
// sidebar: { 

//     width: "260px",
//     height: "100vh",
//     position: "sticky",
//     top: "0",
//     display: "flex",
//     flexDirection: "column",
//     padding: "5px 16px",
//     background: "rgba(255, 255, 255, 0.9)",
//     backdropFilter: "blur(10px)",
//     borderRight: "1px solid #e2e8f0",
//     zIndex: 1000,
//     transition: "all 0.3s ease",

//     "@media (max-width: 768px)": {
//       position: "fixed",
//       bottom: "0",
//       top: "auto",
//       left: "0",
//       width: "100%",
//       height: "65px",
//       flexDirection: "row",
//       padding: "0 10px",
//       justifyContent: "space-around",
//       alignItems: "center",
//       borderRight: "none",
//       borderTop: "1px solid #e2e8f0",
//       background: "#fff",
//     }
//   },

//   section: {
//   display: "flex",
//   flexDirection: isMobile ? "row" : "column",
//   gap: "6px",
//   alignItems: "center"
// },

//  sectionTitle: {
//   display: isMobile ? "none" : "block",
//   fontSize: "11px",
//   color: "#94a3b8",
//   padding: "0 12px",
//   marginBottom: "10px",
//   fontWeight: "700",
//   letterSpacing: "0.1em",
//   textTransform: "uppercase",
// },

//   // navItem: (active) => ({
//   //   display: "flex",
//   //   alignItems: "center",
//   //   textDecoration: "none",
//   //   padding: "12px 16px",
//   //   borderRadius: "14px",
//   //   fontSize: "14px",
//   //   fontWeight: active ? "700" : "500",
//   //   color: active ? "#6366f1" : "#475569", 
//   //   background: active ? "#6366f110" : "transparent",
//   //   transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
//   //   cursor: "pointer",
//   //   border: active ? "1px solid #6366f120" : "1px solid transparent",
//   // }), 
//   navItem: (active, isMobile) => ({
//     display: "flex",
//     flexDirection: isMobile ? "column" : "row", 
//     alignItems: "center",
//     textDecoration: "none",
//     padding: isMobile ? "10px" : "12px 16px",
//     borderRadius: "14px",
//     fontSize: isMobile ? "10px" : "14px",
//     fontWeight: active ? "700" : "500",
//     color: active ? "#6366f1" : "#475569", 
//     background: active ? "#6366f110" : "transparent",
//     transition: "all 0.2s ease",
//   }),

//   icon: {
//     marginRight: "12px",
//     fontSize: "18px",
//     width: "24px",
//     display: "flex",
//     justifyContent: "center",
//   },

//  divider: {
//     display: isMobile ? "none" : "block",
//     height: "1px",
//     background: "#e2e8f0",
//     margin: "24px 12px",
//   },

//   sidebarFooter: {
//     display: isMobile ? "none" : "block",
//     marginTop: "auto",
//   },

//   legalBox: {
//     padding: "16px",
//     borderRadius: "16px",
//     background: "#f8fafc",
//     fontSize: "11px",
//     color: "#94a3b8",
//     lineHeight: "1.6",
//     textAlign: "center",
//   }
// };

// export default Sidebar; 

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: isMobile ? "100%" : "260px",
    height: isMobile ? "65px" : "100vh",
    position: isMobile ? "fixed" : "sticky",
    bottom: isMobile ? "0" : "auto",
    top: isMobile ? "auto" : "0",
    left: "0",
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    padding: isMobile ? "0 10px" : "5px 16px",
    background: isMobile ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
    backdropFilter: isMobile ? "none" : "blur(10px)",
    borderRight: isMobile ? "none" : "1px solid #e2e8f0",
    borderTop: isMobile ? "1px solid #e2e8f0" : "none",
    justifyContent: isMobile ? "space-around" : "flex-start",
    alignItems: isMobile ? "center" : "stretch",
    zIndex: 1000,
    transition: "all 0.3s ease",
  };

  return (
    <div style={sidebarStyle}>
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
      {!isMobile && (
        <div style={getSectionStyle(isMobile)}>
          <p style={styles.sectionTitle}>RESOURCES</p>
          <Link to="/about" style={styles.navItem(isActive("/about"), isMobile)}>
            <span style={styles.icon(isMobile)}>ℹ️</span> About CrowdFix
          </Link>
          <Link to="/developer" style={styles.navItem(isActive("/developer"), isMobile)}>
            <span style={styles.icon(isMobile)}>👨‍💻</span> About Developer
          </Link>
          <Link to="/help" style={styles.navItem(isActive("/help"), isMobile)}>
            <span style={styles.icon(isMobile)}>❓</span> Help Center
          </Link>
        </div>
      )}

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

const getSectionStyle = (isMobile) => ({
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  gap: isMobile ? "0" : "6px",
  alignItems: "center",
  width: isMobile ? "100%" : "auto",
  justifyContent: isMobile ? "space-around" : "flex-start"
});

const styles = {
  sectionTitle: {
    fontSize: "11px",
    color: "#94a3b8",
    padding: "0 12px",
    marginBottom: "10px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  navItem: (active, isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    textDecoration: "none",
    padding: isMobile ? "8px" : "12px 16px",
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
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "24px 12px",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingBottom: "20px"
  },
  legalBox: {
    padding: "16px",
    borderRadius: "16px",
    background: "#f8fafc",
    fontSize: "11px",
    color: "#94a3b8",
    textAlign: "center",
  }
};

export default Sidebar;