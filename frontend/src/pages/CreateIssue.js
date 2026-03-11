import { useState } from "react";
import axios from "axios";
import { formStyles as styles } from "../styles/formStyles";
import API from "../api"; 

function CreateIssue() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); 

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first ✋");
        setLoading(true); 
        return;
      }

      if (!description.trim() || !location.trim()) {
        setMessage("Description and location are required");
        setLoading(false);
        return;
      }
      if (!req.file) {
        return res.status(400).json({ message: "A photo is required to report an issue! 📸" });
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", location);
      if (photo) formData.append("photo", photo);

      await API.post("https://crowdfix-backend-z5cn.onrender.com/issues", formData);

      setMessage("Issue created successfully ✅");
      setDescription("");
      setLocation("");
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create issue ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={localStyles.container}>
      <div style={localStyles.card}>
        <div style={localStyles.header}>
          <h2 style={localStyles.title}>Report an Issue</h2>
          <p style={localStyles.subtitle}>Help your community by providing clear details and a photo.</p>
        </div>

        <form onSubmit={handleSubmit} style={localStyles.form}>
          <div style={localStyles.inputGroup}>
            <label style={localStyles.label}>Location / Area</label>
            <input
              type="text"
              placeholder="e.g. MG Road, Near Central Park"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={localStyles.inputGroup}>
            <label style={localStyles.label}>Issue Description</label>
            <textarea
              placeholder="What's the problem? Be as specific as possible..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={{ ...styles.input, resize: "none" }}
            />
          </div>

          <div style={localStyles.inputGroup}>
            <label style={localStyles.label}>Upload Evidence (Optional)</label>
            <div style={localStyles.fileUploadWrapper}>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                style={localStyles.fileInput}
                accept="image/*"
              />
              <label htmlFor="file-upload" style={localStyles.fileLabel}>
                {photo ? "📸 Change Photo" : "📷 Select a Photo"}
              </label>
            </div>
          </div>

          {preview && (
            <div style={localStyles.previewWrapper}>
              <img src={preview} alt="Preview" style={localStyles.previewImage} />
              <button 
                type="button" 
                onClick={() => { setPhoto(null); setPreview(null); }}
                style={localStyles.removeBtn}
              >✕</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

          {message && (
            <div style={{
              ...localStyles.message,
              color: message.includes("successfully") ? "#059669" : "#e11d48",
              backgroundColor: message.includes("successfully") ? "#ecfdf5" : "#fff1f2",
            }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const localStyles = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.02em" },
  subtitle: { fontSize: "15px", color: "#64748b", lineHeight: "1.5" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#475569", marginLeft: "4px" },
  
  // Custom File Upload Styling
  fileUploadWrapper: { position: "relative", width: "100%" },
  fileInput: { display: "none" },
  fileLabel: {
    display: "block",
    padding: "12px",
    textAlign: "center",
    backgroundColor: "#f1f5f9",
    border: "2px dashed #cbd5e1",
    borderRadius: "12px",
    cursor: "pointer",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  
  previewWrapper: { position: "relative", marginTop: "10px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" },
  previewImage: { width: "100%", display: "block", maxHeight: "200px", objectFit: "cover" },
  removeBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "rgba(15, 23, 42, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    fontSize: "12px"
  },
  
  message: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center"
  }
};

export default CreateIssue;