export const navbarStyles = {
  navbar: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    background: "var(--card-bg)",
    position: "sticky",
    top: 0,
    zIndex: 10
  },

  logo: {
    fontSize: window.innerWidth > 768 ? "20px" : "16px", 
    fontWeight: "bold",
    textDecoration: "none",
    color: "#ff4500"
  },

  searchForm: {
    flex: 1,
    display: window.innerWidth > 600 ? "flex" : "none", 
    justifyContent: "center",
    margin: "0 10px"
  },

  searchInput: {
    width: "100%", 
    maxWidth: "400px",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid rgba(0,0,0,0.15)",
    outline: "none"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: window.innerWidth > 768 ? "12px" : "5px" 
  }
};