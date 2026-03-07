import { layoutStyles as styles } from "../styles/layoutStyles";

function Rightbar() {
  return (
    <div style={styles.rightbar}>
      <h3>🔥 Trending</h3>
      <p style={{ color: "#777" }}>
        Trending issues will appear here.
      </p>
    </div>
  );
}

export default Rightbar;