import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WorkoutsPage from './pages/WorkoutsPage';
import DietPlansPage from './pages/DietPlansPage';
import CalorieCalculator from './pages/CalorieCalculator';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import WorkoutTimer from './pages/WorkoutTimer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        {user && <Navbar />}
        <main className={user ? 'pt-16' : ''}>
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <LoginPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <SignupPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={user ? <HomePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/workouts" 
              element={user ? <WorkoutsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/diet-plans/:category" 
              element={user ? <DietPlansPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/calorie-calculator" 
              element={user ? <CalorieCalculator /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
            />
            <Route 
              path="/workout-timer/:workoutId" 
              element={user ? <WorkoutTimer /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;