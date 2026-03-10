import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api"; 

function TrendingPanel() {
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await API.get("../issues?sort=top&page=1&limit=5");
      if (res.data.issues) setTrending(res.data.issues);
    } catch (err) {
      console.log("Trending error:", err.message);
    }
  };

  return (
    <div style={styles.rightbar}>
      <h3 style={styles.title}>Trending Issues</h3>

      <div style={styles.container}>
        {trending.length === 0 ? (
          <p style={styles.empty}>No trending issues yet.</p>
        ) : (
          trending.map((issue, index) => (
            <div
              key={issue._id}
              style={styles.card}
              onClick={() => navigate(`/issues/${issue._id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={styles.rankSection}>
                <span style={styles.rankNumber}>{index + 1}</span>
              </div>
              
              <div style={styles.contentSection}>
                <div style={styles.area}>📍 {issue.location || "General"}</div>
                <div style={styles.desc}>
                  {issue.description.length > 60 
                    ? issue.description.slice(0, 60) + "..." 
                    : issue.description}
                </div>
                <div style={styles.meta}>
                  <span style={styles.upvoteCount}>▲ {issue.upvotes || 0} upvotes</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <button style={styles.viewAllBtn}>View All Trending</button>
    </div>
  );
}

const styles = {
  rightbar: {
    width: "300px",
    padding: "5px",
    background: "#ffffff",
    borderLeft: "1px solid #e2e8f0",
    height: "100vh",
    position: "sticky",
    top: 0,
    overflowY: "auto",
  },
  title: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "20px",
    letterSpacing: "-0.02em",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    display: "flex",
    gap: "12px",
    padding: "12px 8px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.2s ease",
    marginBottom: "8px",
  },
  rankSection: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "2px",
  },
  rankNumber: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#94a3b8",
  },
  contentSection: {
    flex: 1,
  },
  area: {
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#6366f1", // Using the primary Indigo for accent
    marginBottom: "4px",
    letterSpacing: "0.03em",
  },
  desc: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    lineHeight: "1.4",
    marginBottom: "6px",
  },
  meta: {
    fontSize: "12px",
    color: "#64748b",
  },
  upvoteCount: {
    fontWeight: "500",
  },
  empty: {
    fontSize: "14px",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "20px",
  },
  viewAllBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#475569",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    transition: "background 0.2s",
  }
};

export default TrendingPanel;