import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { formStyles as styles } from "../styles/formStyles";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/register", form);
    console.log("Registration Success:", res.data);
    alert("Registered successfully! 🎉");
    navigate("/login");
  } catch (err) {
    console.error("Registration Error Details:", err.response?.data);

    const errorMsg = err.response?.data?.message || err.response?.data?.error || "Registration failed";
    alert(errorMsg + " ❌");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Join CrowdFix</h2>
          <p style={styles.subtitle}>Create an account to start improving your community today.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              placeholder="johndoe"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;