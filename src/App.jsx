import React, { useState, useEffect } from "react";
import AdminLogin from "./components/AdminLogin";
import MainMenu from "./components/MainMenu";
import ChildRegistration from "./components/ChildRegistration";
import ChildAccessPrompt from "./components/ChildAccessPrompt";
import ChildDashboard from "./components/ChildDashboard";

function App() {
  // Load initial state from localStorage or use defaults
  const [view, setView] = useState(
    () => localStorage.getItem("view") || "login"
  );

  const [children, setChildren] = useState(() => {
    const saved = localStorage.getItem("children");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentChild, setCurrentChild] = useState(() => {
    const saved = localStorage.getItem("currentChild");
    return saved ? JSON.parse(saved) : null;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem("children", JSON.stringify(children));
  }, [children]);

  useEffect(() => {
    if (currentChild) {
      localStorage.setItem("currentChild", JSON.stringify(currentChild));
    } else {
      localStorage.removeItem("currentChild");
    }
  }, [currentChild]);

  const handleLoginSuccess = () => setView("menu");

  const handleRegisterChild = (child) => {
    setChildren([...children, child]);
    setView("menu");
  };

  const handleAccessChild = (code) => {
    const foundChild = children.find((c) => c.uniqueCode === code);
    if (foundChild) {
      setCurrentChild(foundChild);
      setView("childDashboard");
    } else {
      alert("Child not found. Please try again.");
    }
  };

  // ✅ NEW: Handle logout - resets to login screen
  const handleLogout = () => {
    setView("login");
    setCurrentChild(null);
    // Clear login session from localStorage
    localStorage.removeItem("view");
  };

  return (
    <>
      {view === "login" && <AdminLogin onSuccess={handleLoginSuccess} />}
      {view === "menu" && (
        <MainMenu
          onRegister={() => setView("register")}
          onAccess={() => setView("access")}
          onLogout={handleLogout} // ✅ Pass logout handler
        />
      )}
      {view === "register" && (
        <ChildRegistration
          onRegister={handleRegisterChild}
          onCancel={() => setView("menu")}
        />
      )}
      {view === "access" && (
        <ChildAccessPrompt
          onAccess={handleAccessChild}
          onCancel={() => setView("menu")}
        />
      )}
      {view === "childDashboard" && currentChild && (
        <>
          <ChildDashboard child={currentChild} onBack={() => setView("menu")} />
        </>
      )}
    </>
  );
}

export default App;
