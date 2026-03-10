import { useState } from "react";
import axios from "axios";
import API from "../api"; 
import { useNavigate, Link } from "react-router-dom";
import { formStyles as styles } from "../styles/formStyles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (!token) {
        alert("No token received from server");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id || user._id);
      localStorage.setItem("username", user.username);
      
      alert("Login successful ✅");
      window.location.href = "/issues"; 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to report and track civic issues.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <p style={styles.footerText}>
          New to CrowdFix? <Link to="/register" style={styles.link}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;