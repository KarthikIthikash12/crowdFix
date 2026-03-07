export const layoutStyles = {
app: {
minHeight: "100vh",
background: "var(--bg)",
display: "flex",
flexDirection: "column",
overflowX: "hidden" 
},
body: {
display: "flex",
gap: "20px",
padding: "20px",
maxWidth: "1600px",
margin: "0 auto",
alignItems: "start" 
},
content: {
flex: 1,
minWidth: 0,
overflow: "hidden"
},
sidebar: {
position: "sticky",
top: "80px",
height: "fit-content",
background: "var(--card-bg)",
border: "1px solid var(--border)",
borderRadius: "14px",
padding: "18px"
},
rightbar: {
position: "sticky",
top: "80px",
height: "fit-content",
background: "var(--card-bg)",
border: "1px solid var(--border)",
borderRadius: "14px",
padding: "18px"
}
};