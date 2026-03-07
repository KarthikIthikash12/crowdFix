import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Crowd<span style={{ color: "#6366f1" }}>Fix</span>
        </Link>

        <form onSubmit={handleSearch} style={styles.searchForm}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search issues (e.g. water, road...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </form>

        <div style={styles.userActions}>
          {username ? (
            <>
              <span style={styles.welcome}>Hi, {username}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={styles.loginBtn}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: "64px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: "0 20px",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    textDecoration: "none",
    color: "#0f172a",
    letterSpacing: "-0.03em",
  },
  searchForm: {
    flex: 1,
    maxWidth: "600px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  searchInput: {
    width: "100%",
    padding: "10px 15px 10px 40px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  userActions: { display: "flex", alignItems: "center", gap: "15px" },
  welcome: { fontSize: "14px", fontWeight: "600", color: "#475569" },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  loginBtn: {
    textDecoration: "none",
    background: "#6366f1",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
  }
};

export default Navbar;