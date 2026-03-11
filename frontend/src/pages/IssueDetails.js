import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../api"; 

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [isEditingIssue, setIsEditingIssue] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPhoto, setEditedPhoto] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const BASE_URL = "../issues"; 

  const getAuthHeader = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const res = await API.get(`${BASE_URL}/${id}`);
      setIssue(res.data.issue || res.data); 
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!token) return alert("Please login first! ✋");
    try {

      const res = await API.patch(`${BASE_URL}/${id}/upvote`, {}, getAuthHeader());
      setIssue(res.data);
    } catch (err) {
      console.error(err.response?.data);
      alert("Upvote failed ❌");
    }
  };

  const handleToggleResolved = async () => {
    try {
      const res = await API.patch(`${BASE_URL}/${id}/resolve`, {}, getAuthHeader());
      setIssue(res.data);
      alert("Status updated! ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleUpdateIssue = async () => {
    try {
      const res = await API.patch(`${BASE_URL}/${id}`, 
        { description: editedDescription, photo: editedPhoto }, 
        getAuthHeader()
      );
      setIssue(res.data);
      setIsEditingIssue(false);
      alert("Issue updated! ✨");
    } catch { alert("Update failed"); }
  };

  const handleDeleteIssue = async () => {
    if (!window.confirm("Delete this report permanently?")) return;
    try {
      await API.delete(`${BASE_URL}/${id}`, getAuthHeader());
      navigate("/");
    } catch { alert("Delete failed"); }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await API.post(`${BASE_URL}/${id}/comments`, { text: newComment }, getAuthHeader());
      setNewComment("");
      fetchIssue(); 
    } catch { alert("Failed to post comment"); }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await API.patch(`${BASE_URL}/${id}/comments/${commentId}`, 
        { text: editedCommentText }, 
        getAuthHeader()
      );
      setEditingCommentId(null);
      fetchIssue();
    } catch { alert("Comment edit failed"); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete comment?")) return;
    try {
      await API.delete(`${BASE_URL}/${id}/comments/${commentId}`, getAuthHeader());
      fetchIssue();
    } catch { alert("Delete failed"); }
  };

  if (loading) return <div style={styles.loader}>Loading...</div>;
  if (!issue) return <div style={styles.loader}>Issue not found.</div>;

  const isOwner = String(issue.createdBy?._id || issue.createdBy) === String(storedUserId);

  return (
    <div style={styles.wrapper}>
      <div style={styles.postCard}>
        <div style={styles.header}>
          <div style={styles.userInfo}>
            <div style={styles.initialsAvatar}>
  {issue.createdBy?.username
    ? issue.createdBy.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "CF"} 
</div>
            <div>
              <div style={styles.username}>{issue.createdBy?.username || "Citizen"}</div>
              <span>{issue.location || "Location not provided"}</span>
            </div>
          </div>

          {isOwner && (
            <div style={styles.ownerActions}>
              <button onClick={() => { setIsEditingIssue(true); setEditedDescription(issue.description); setEditedPhoto(issue.photo || ""); }} style={styles.iconBtn}>✏️</button>
              <button onClick={handleToggleResolved} style={styles.iconBtn}>{issue.resolved ? "✅" : "⏳"}</button>
              <button onClick={handleDeleteIssue} style={styles.iconBtn}>🗑️</button>
            </div>
          )}
        </div>

        <div style={{ ...styles.badge, background: issue.resolved ? "#dcfce7" : "#fee2e2", color: issue.resolved ? "#15803d" : "#e11d48" }}>
          {issue.resolved ? "Resolved" : "Unresolved"}
        </div>

        <p style={styles.descriptionText}>{issue.description}</p>
        {issue.photo && <img src={issue.photo} alt="issue" style={styles.mainImage} />}

        <div style={styles.actions}>
          {/* <button onClick={handleUpvote} style={styles.upvoteBtn}>
            👍 {issue.upvotes?.length || 0} Upvotes
          </button> */}
          {/* <span style={styles.commentCount}>💬 {comments.length} Comments</span> */}
        </div>
      </div>

      <div style={styles.commentsContainer}>
        <h3 style={styles.sectionTitle}>Discussion</h3>
        <div style={styles.commentInputBox}>
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." style={styles.textArea} />
          <button onClick={handleAddComment} style={styles.postBtn}>Post</button>
        </div>

        {comments.map((c) => (
          <div key={c._id} style={styles.commentItem}>
            <div style={{ flex: 1 }}>
              <div style={styles.commentUser}>{c.createdBy?.username || "User"}</div>
              {editingCommentId === c._id ? (
                <div style={styles.editRow}>
                  <input value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} style={styles.miniInput} />
                  <button onClick={() => handleUpdateComment(c._id)} style={styles.saveBtn}>Save</button>
                </div>
              ) : (
                <div style={styles.commentText}>{c.text}</div>
              )}
            </div>
            {String(c.createdBy?._id || c.createdBy) === String(storedUserId) && (
              <div style={styles.commentIcons}>
                
                <button onClick={() => handleDeleteComment(c._id)} style={styles.tinyBtn}>🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditingIssue && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ margin: 0 }}>Edit Report</h3>
            <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} style={styles.modalInput} />
            <input value={editedPhoto} onChange={(e) => setEditedPhoto(e.target.value)} style={styles.modalInput} placeholder="Photo URL" />
            <div style={styles.modalActions}>
              <button onClick={handleUpdateIssue} style={styles.saveBtn}>Update</button>
              <button onClick={() => setIsEditingIssue(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { maxWidth: "700px", margin: "40px auto", padding: "0 20px", fontFamily: "'Inter', sans-serif" },
  postCard: { background: "#fff", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", marginBottom: "30px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  userInfo: { display: "flex", gap: "12px", alignItems: "center" },
  avatar: { width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover" },
  username: { fontWeight: "700", color: "#1e293b" },
  area: { fontSize: "13px", color: "#64748b" },
  ownerActions: { display: "flex", gap: "8px" },
  iconBtn: { background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer" },
  badge: { display: "inline-block", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", marginBottom: "20px" },
  descriptionText: { fontSize: "18px", lineHeight: "1.6", color: "#334155", marginBottom: "20px" },
  mainImage: { width: "100%", borderRadius: "16px", marginBottom: "20px", objectFit: "cover", maxHeight: "500px" },
  actions: { display: "flex", gap: "25px", borderTop: "1px solid #f1f5f9", paddingTop: "20px", alignItems: "center" },
  upvoteBtn: { background: "#f1f5f9", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
  commentCount: { color: "#64748b", fontWeight: "500", fontSize: "14px" },
  commentsContainer: { background: "#fff", borderRadius: "24px", padding: "30px", border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "20px", color: "#0f172a" },
  commentInputBox: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" },
  textArea: { padding: "15px", borderRadius: "14px", border: "1px solid #e2e8f0", fontFamily: "inherit", minHeight: "80px", outline: "none" },
  postBtn: { alignSelf: "flex-end", padding: "10px 20px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  commentItem: { display: "flex", justifyContent: "space-between", padding: "15px", borderRadius: "16px", background: "#f8fafc", marginBottom: "12px" },
  commentUser: { fontWeight: "700", fontSize: "14px", color: "#1e293b", marginBottom: "4px" },
  commentText: { fontSize: "15px", color: "#475569", lineHeight: "1.5" },
  commentIcons: { display: "flex", gap: "5px" },
  tinyBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "14px" },
  editRow: { display: "flex", gap: "8px", marginTop: "5px" },
  miniInput: { flex: 1, padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" },
  saveBtn: { background: "#6366f1", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  cancelBtn: { background: "#e2e8f0", color: "#475569", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: "blur(4px)" },
  modal: { background: "#fff", padding: "30px", borderRadius: "24px", width: "450px", display: "flex", flexDirection: "column", gap: "15px" },
  modalInput: { padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontFamily: "inherit" },
  modalActions: { display: "flex", gap: "10px", marginTop: "10px" },
  loader: { padding: "100px", textAlign: "center", fontWeight: "700", color: "#6366f1" }, 
  initialsAvatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#ff4500", 
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
    marginRight: "12px"
  },

};

export default IssueDetails;