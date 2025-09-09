import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

import Courses from './pages/Courses';
import News from './pages/News';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/sobre" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/servicos" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <Services />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/cursos" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <Courses />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/noticias" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <News />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contato" element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Rotas Administrativas */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
