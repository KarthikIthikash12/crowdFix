import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TrendingPanel from "./TrendingPanel";
import FloatingCreateButton from "./FloatingCreateButton";
import { layoutStyles as styles } from "../styles/layoutStyles";

function Layout({ children }) {
  return (
    <div style={styles.app} className="app-container">
      <Navbar />

      <div style={styles.body} className="body-container">

        <div className="sidebar-container" style={styles.sidebar}>
           <Sidebar />
        </div>

        <div style={styles.content} className="content-container">
          {children}
        </div>

        <div className="rightbar-container" style={styles.rightbar}>
           <TrendingPanel />
        </div>
      </div>

      <FloatingCreateButton />
    </div>
  );
}

export default Layout;