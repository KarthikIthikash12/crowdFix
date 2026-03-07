import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyIssues from "./pages/MyIssues";
import CreateIssue from "./pages/CreateIssue"; 
import LandingPage from "./pages/LandingPage";

import About from "./pages/About";
import Help from "./pages/Help";
import Developer from "./pages/Developer";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Issues />} />
                    <Route path="/issues" element={<Issues />} />
                    <Route path="/issues/:id" element={<IssueDetails />} />
                    <Route path="/issues/my" element={<MyIssues />} />
                    <Route path="/create" element={<CreateIssue />} />

                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/developer" element={<Developer />} />

                    <Route path="*" element={<Navigate to="/issues" />} />
                  </Routes>
                </Layout>
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;