import React from "react";
import { Routes, Route } from "react-router-dom";

// HOOKS
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoutes from "./components/layout/PrivateRoutes";

// COMPONENTS
import Layout from "./components/layout/Layout";

// PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// PAGES: AUTH
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Auth/Dashboard";

// PAGES: GAMES
import Search from "./pages/Games/Search";
import AddGames from "./pages/Games/AddGames";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* AUTH */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />

          {/* PRIVATE AUTH ROUTES */}
          <Route element={<PrivateRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-games" element={<AddGames />} />
          </Route>

          {/* ERROR PAGES */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
