// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import TrendingPanel from "./TrendingPanel";
// import FloatingCreateButton from "./FloatingCreateButton";
// import { layoutStyles as styles } from "../styles/layoutStyles";

// function Layout({ children }) {
//   return (
//     <div style={styles.app} className="app-container">
//       <Navbar />

//       <div style={styles.body} className="body-container">

//         <div className="sidebar-container" style={styles.sidebar}>
//            <Sidebar />
//         </div>

//         <div style={styles.content} className="content-container">
//           {children}
//         </div>

//         <div className="rightbar-container" style={styles.rightbar}>
//            <TrendingPanel />
//         </div>
//       </div>

//       <FloatingCreateButton />
//     </div>
//   );
// }
 
// export default Layout; 

import React, { useState, useEffect } from "react"; // Added hooks
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TrendingPanel from "./TrendingPanel";
import FloatingCreateButton from "./FloatingCreateButton";
import { layoutStyles as styles } from "../styles/layoutStyles";

function Layout({ children }) {
  // 1. Monitor screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Define overrides for Mobile
  const mobileContentStyle = isMobile ? {
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: "80px", // Space so the bar doesn't cover content
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

  // return (
  //   <div style={styles.app} className="app-container">
  //     <Navbar />

  //     <div style={{...styles.body, flexDirection: isMobile ? "column" : "row"}} className="body-container">
        
  //       {/* Sidebar Wrapper */}
  //       <div className="sidebar-container" style={{...styles.sidebar, ...mobileSidebarWrapper}}>
  //          <Sidebar />
  //       </div>

  //       {/* Main Content Wrapper */}
  //       <div style={{...styles.content, ...mobileContentStyle}} className="content-container">
  //         {children}
  //       </div>

  //       {/* Hide Trending Panel on Mobile to save space (Optional) */}
  //       {!isMobile && (
  //         <div className="rightbar-container" style={styles.rightbar}>
  //            <TrendingPanel />
  //         </div>
  //       )}
  //     </div>

  //     {/* Hide floating button on mobile if it's already in your Bottom Sidebar */}
  //     {!isMobile && <FloatingCreateButton />}
  //   </div>
  // ); 
  return (
  <div style={styles.app} className="app-container">
    <Navbar />

    <div 
      className="body-container"
      style={{
        ...styles.body, 
        flexDirection: isMobile ? "column" : "row",
        display: "flex" 
      }}
    >
      {/* 1. SIDEBAR: No wrapper needed, it handles itself */}
      <Sidebar />

      {/* 2. MAIN CONTENT */}
      <div 
        className="content-container"
        style={{
          ...styles.content,
          marginLeft: isMobile ? 0 : "260px", // Match your sidebar width
          paddingBottom: isMobile ? "90px" : "0", // Space for bottom bar
          flex: 1,
          width: "100%"
        }}
      >
        {children}
      </div>

      {/* 3. RIGHT PANEL */}
      {!isMobile && (
        <div className="rightbar-container" style={styles.rightbar}>
          <TrendingPanel />
        </div>
      )}
    </div>

    {!isMobile && <FloatingCreateButton />}
  </div>
);
}

export default Layout;