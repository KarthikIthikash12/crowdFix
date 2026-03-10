import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard";
import { useLocation } from "react-router-dom";
import API from "../api"; 

function Issues() {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const observer = useRef();

  useEffect(() => {
    setIssues([]);
    setPage(1);
    setHasMore(true);
  }, [location.search]);

  useEffect(() => {
    fetchIssues();
  }, [page, location.search]);

  const fetchIssues = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(location.search);
      const sort = params.get("sort") || "recent";
      const searchQuery = params.get("search") || "";

      const res = await API.get(
        `../issues?sort=${sort}&page=${page}&limit=6&search=${searchQuery}`
      );

      const fetchedIssues = res.data.issues;

      setIssues((prev) => (page === 1 ? fetchedIssues : [...prev, ...fetchedIssues]));
      

      setHasMore(fetchedIssues.length === 6);
    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const lastIssueRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleUpvote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.patch(`../issues/${id}/upvote`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(prev => prev.map(issue => 
        issue._id === id ? { ...issue, upvotes: res.data.upvotes, upvotedBy: res.data.upvotedBy } : issue
      ));
    } catch (err) {
      alert("Upvote failed");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Reported Issues</h2>

        <div style={styles.issuesGrid}>
          {issues.length === 0 && !loading ? (
            <p>No issues found</p>
          ) : (
            issues.map((issue, index) => {
              const isLastElement = issues.length === index + 1;
              return (
                <div ref={isLastElement ? lastIssueRef : null} key={issue._id}>
                  <IssueCard issue={issue} onUpvote={handleUpvote} />
                </div>
              );
            })
          )}
        </div>
        
        {loading && <p style={{textAlign: 'center', padding: '20px'}}>Loading more...</p>}
      </div>
    </div>
  );
}
export default Issues
const styles = {
pageWrapper: {
    width: "100%",
    margin: "0 auto",
    padding: "0", 
    fontFamily: "system-ui, sans-serif",
  },

  issuesGrid: {
    display: "grid",
    gridTemplateColumns: "100%", 
    width: "100%",
    gap: "25px",
  },

sectionCard: {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "35px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  border: "1px solid #f1f5f9",
},

sectionTitle: {
  marginTop: "0px", 
  marginBottom: "20px",
  fontSize: "20px",
  fontWeight: "700",
  color: "#1e293b",
},



paginationWrapper: {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "40px",
},
}