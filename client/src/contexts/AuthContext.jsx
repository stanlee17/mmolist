import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Create the AuthContext [CREATES THE WRAPPER/PROVIDER]
const AuthContext = createContext();

// Create useAuth function to access AuthContext values [ACCESS THE WRAPPER]
export function useAuth() {
  return useContext(AuthContext);
}

// Create the AuthProvider [DEFINES THE WRAPPER/PROVIDER]
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  // User Authenticator
  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  // Register & Login
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("token", JSON.stringify(token));
    setUser(jwtDecode(token));
  };

  // Obtain current user function
  function getCurrentUser() {
    try {
      let token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (err) {
      return null;
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // "Exported" User Props "Store" (this can be acceseed by ANY component)
  const value = {
    user,
    loginSaveUser,
    getCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
