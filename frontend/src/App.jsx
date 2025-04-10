import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Routes
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public Pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import ForgotPassword from "./pages/public/ForgotPassword";
import ResetPassword from "./pages/public/ResetPassword";
import NotFound from './pages/public/NotFound';

// Admin Pages
import Dashboard from "./pages/dashboard/Dashboard";
import MyStorage from './pages/dashboard/MyStorage';
import Recents from './pages/dashboard/Recents';
import Favorites from './pages/dashboard/Favorites';
import Trash from './pages/dashboard/Trash';
import ImageStudio from './pages/dashboard/ImageStudio';
import DocuScan from './pages/dashboard/DocuScan';
import AudioForge from './pages/dashboard/AudioForge';

// context
import { useAuth } from './contexts/AuthContext';


const App = () => {
  const { isAuthenticated, isLoading  } = useAuth();
  if (isLoading) {
    return <div className="text-white p-8">Loading...</div>; // or spinner
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            {/* Not Found Routes  */}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/storage" element={<MyStorage />} />
            <Route path="/recents" element={<Recents />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/image-studio" element={<ImageStudio />} />
            <Route path="/docuscan" element={<DocuScan />} />
            <Route path="/audio-forge" element={<AudioForge />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
