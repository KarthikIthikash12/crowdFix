import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API from "../api"; 

function IssueCard({ issue, onUpvote }) {
  const [following, setFollowing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleFollow = async (e) => {
    e.stopPropagation();
    try {
      const headers = getAuthHeader();
      if (!headers.Authorization) { alert("Login required"); return; }

      await API.post(
        `../users/${issue.createdBy?._id}/follow`,
        {},
        { headers }
      );
      setFollowing(!following);
    } catch (err) {
      alert("Follow failed");
    }
  };

  const handleUpvoteInternal = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to upvote! ✋");
      return;
    }

    onUpvote(issue._id);
  };

  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/issues/${issue._id}`;
    const message = `Check this issue on CrowdFix:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const upvoteCount = Array.isArray(issue.upvotes) ? issue.upvotes.length : (issue.upvotes || 0);

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <img
            src={issue.createdBy?.profilePic || `https://ui-avatars.com/api/?name=${issue.createdBy?.username || 'C'}&background=random`}
            alt="user"
            style={styles.avatar}
          />
          <div style={styles.userText}>
            <span style={styles.username}>
              {issue.createdBy?.username || "Anonymous"}
            </span>
            {/* <button onClick={handleFollow} style={styles.followBtn}>
              {following ? "Following" : "+ Follow"}
            </button> */}
          </div>
        </div>
        
        <div style={{
          ...styles.statusTag,
          backgroundColor: issue.resolved ? "#ecfdf5" : "#fff1f2",
          color: issue.resolved ? "#059669" : "#e11d48",
          border: `1px solid ${issue.resolved ? "#10b98133" : "#f43f5e33"}`
        }}>
          <span style={styles.statusDot(issue.resolved)}>●</span>
          {issue.resolved ? "Resolved" : "Unresolved"}
        </div>
      </div>

      <Link to={`/issues/${issue._id}`} style={styles.link}>
        <p style={styles.description}>{issue.description}</p>
      </Link>

      {issue.photo && (
        <Link to={`/issues/${issue._id}`}>
          <div style={styles.imageContainer}>
            <img src={issue.photo} alt="issue" style={styles.image} />
          </div>
        </Link>
      )}

      <div style={styles.actions}>
        <button onClick={handleUpvoteInternal} style={styles.actionBtn}>
          <span style={styles.icon}>👍</span> 
          <span style={styles.count}>{upvoteCount}</span>
        </button>

        {/* <Link to={`/issues/${issue._id}`} style={styles.actionBtn}>
          <span style={styles.icon}>💬</span> 
          <span style={styles.count}>{issue.comments?.length || 0}</span>
        </Link> */}

        <button onClick={handleWhatsAppShare} style={styles.whatsappBtn}>
          <span style={styles.icon}>🔗</span> Share
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userText: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    objectFit: "cover",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  username: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#0f172a",
    fontFamily: "'Inter', sans-serif",
  },
  followBtn: {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontSize: "13px",
    fontWeight: "600",
    padding: "0",
    cursor: "pointer",
    textAlign: "left",
    transition: "color 0.2s",
  },
  statusTag: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusDot: (resolved) => ({
    fontSize: "14px",
    color: resolved ? "#10b981" : "#f43f5e",
  }),
  description: {
    fontSize: "16px",
    color: "#334155",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
    fontFamily: "'Inter', sans-serif",
  },
  imageContainer: {
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    display: "block",
    maxHeight: "500px",
    objectFit: "cover",
  },
  actions: {
    display: "flex",
    gap: "10px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "10px 18px",
    borderRadius: "14px",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
  },
  whatsappBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f0fdf4",
    border: "1px solid #dcfce7",
    padding: "10px 18px",
    borderRadius: "14px",
    color: "#15803d",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginLeft: "auto",
  },
  icon: { fontSize: "18px" },
  count: { color: "#1e293b" },
  link: { textDecoration: "none", color: "inherit" }
};

export default IssueCard;