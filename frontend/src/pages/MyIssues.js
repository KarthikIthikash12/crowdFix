import { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard";

function MyIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/issues/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setIssues(res.data);
    } catch (err) {
      console.log("Fetch my issues error:", err.response?.data || err.message);
      alert("Failed to load issues");
    }
  };

  const handleUpvote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/issues/${id}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchMyIssues();
    } catch (err) {
      console.log("Upvote error:", err.response?.data || err.message);
      alert("Upvote failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.feed}>
        <h2 style={styles.title}>👤 My Issues</h2>

        {issues.length === 0 ? (
          <div style={styles.emptyBox}>
            <p>You haven't posted any issues yet.</p>
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onUpvote={handleUpvote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyIssues;

const styles = {
  page: {
    padding: "25px 15px"
  },

  feed: {
    width: "100%",
  },

  title: {
    marginBottom: "20px"
  },

  emptyBox: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "12px",
    background: "var(--card-bg)",
    border: "1px solid var(--border)"
  }
};