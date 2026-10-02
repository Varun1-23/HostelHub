import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import StudentPortal from "./pages/StudentPortal.jsx";
import WardenPortal from "./pages/WardenPortal.jsx";
import { useState } from "react";


function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar user={user} onLogout={handleLogout}/>
        <Routes>
          <Route 
            path="/login"
            element={
              user
              ? <Navigate to={user.role === "Warden" ? '/warden' : '/student'} replace/>
              : <LoginPage onLoginSuccess={handleLoginSuccess}/>
            }
          />
          <Route
            path="/register"
            element={
              user
              ? <Navigate to={user.role === "Warden" ? '/warden' : '/student'} replace/>
              : <RegisterPage onLoginSuccess={handleLoginSuccess}/>
            }
          />
          <Route
            path="/student"
            element={
              user
              ? <StudentPortal user={user}/>
              : <Navigate to='/login' replace/>
            }
          />

          <Route
            path="/warden"
            element={
              user
              ? (user.role === 'Warden' ? <WardenPortal user={user}/> : <Navigate to="/student" replace/>)
                : <Navigate to="/login" replace/>
            }
          />
          <Route
            path="*"
            element={
              <Navigate 
                to={user ? (user.role === "Warden" ? "/warden" : "/student") : "/login"}  
                replace
              />
            }
          />
        </Routes>

      </div>
    
    </BrowserRouter>
  )

}

export default App;