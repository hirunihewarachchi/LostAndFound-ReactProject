import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Items from './pages/Items';
import ItemForm from './pages/ItemForm';
import { AuthProvider, useAuth } from './services/auth';

function Protected({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to='/' replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/items' element={
            <Protected><Items /></Protected>
          } />
          <Route path='/items/new' element={
            <Protected roles={["admin"]}><ItemForm /></Protected>
          } />
          <Route path='*' element={<h3>Page not found</h3>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}