import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/layout/Navbar'
import Footer from './components/landing/Footer'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<PublicRoute> <Home /> </PublicRoute>} />
        <Route path='/signup' element={<PublicRoute> <Signup /> </PublicRoute>} />
        <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
