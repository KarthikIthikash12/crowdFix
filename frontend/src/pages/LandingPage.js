import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>

      <div style={styles.content}>
        <h1 style={styles.title}>
          Crowd<span style={styles.highlight}>Fix</span>
        </h1>
        
        <p style={styles.subtitle}>
          Empower your community. Report potholes, broken lights, and civic issues 
          instantly. Together, we build a better city.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/register">
            <button style={styles.primaryBtn}>Get Started</button>
          </Link>
          
          <Link to="/login">
            <button style={styles.secondaryBtn}>Sign In</button>
          </Link>
        </div>

        <div style={styles.footer}>
          <p style={styles.stats}>Join 5,000+ citizens making a difference</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0f172a", 
    color: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
  },
  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)",
    top: "10%",
    zIndex: 0,
  },
  content: {
    zIndex: 1,
    maxWidth: "700px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    marginBottom: "1rem",
    marginTop: "0",
  },
  highlight: {
    background: "linear-gradient(to right, #6366f1, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "2.5rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  primaryBtn: {
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#6366f1",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.2s",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
  },
  secondaryBtn: {
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "12px",
    border: "1px solid #334155",
    backgroundColor: "transparent",
    color: "#f8fafc",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  footer: {
    marginTop: "4rem",
    borderTop: "1px solid #1e293b",
    paddingTop: "2rem",
  },
  stats: {
    fontSize: "0.9rem",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  }
};