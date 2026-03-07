import { useNavigate } from "react-router-dom";

function FloatingCreateButton() {
  const navigate = useNavigate();

  return (
    <button style={styles.button} onClick={() => navigate("/create")}>
      ＋
    </button>
  );
}

export default FloatingCreateButton;

const styles = {
  button: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    fontSize: "30px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    zIndex: 999
  }
};