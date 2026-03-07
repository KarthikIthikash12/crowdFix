import React from "react";

function About() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>About Crowd<span style={{ color: "#6366f1" }}>Fix</span></h1>
        <p style={styles.subtitle}>Empowering citizens to build better neighborhoods together.</p>
      </header>

      <section style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>📢</div>
          <h3>Our Mission</h3>
          <p>To bridge the gap between citizens and local authorities by providing a transparent platform for reporting and tracking civic issues.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>🤝</div>
          <h3>Community Driven</h3>
          <p>We believe that when communities come together, change happens faster. Upvote issues to show what matters most.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>⚡</div>
          <h3>Real-time Impact</h3>
          <p>From broken streetlights to potholes, get the right eyes on the problem and track the resolution status in real-time.</p>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 CrowdFix Initiative. Built for a better tomorrow.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "900px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { textAlign: "center", marginBottom: "50px" },
  title: { fontSize: "36px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" },
  subtitle: { fontSize: "18px", color: "#64748b" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" },
  card: { background: "#fff", padding: "30px", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.03)", textAlign: "center", transition: "transform 0.2s" },
  icon: { fontSize: "40px", marginBottom: "15px" },
  footer: { marginTop: "60px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }
};

export default About;