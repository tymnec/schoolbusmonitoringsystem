import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Registration/RegistrationPage";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Login from "./pages/Login/LoginPage";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/Home/HomePage";
import Testing from "./pages/Testing/Testing";
import OnBus from "./pages/OnBus/OnBus";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const [timeActive, setTimeActive] = useState(false);
  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/verify-email" element={<VerifyEmail/>} />
          <Route exact path="/testing" element={<Testing/>}/>
          <Route exact path="/onbus" element={<OnBus/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;