import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function Navbar(){
  const { user, signout } = useAuth();
  const nav = useNavigate();
  const onSignOut = () => { signout(); nav('/'); };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Lost & Found</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/items">Items</Link></li>}
            {user && user.role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/items/new">Add Item</Link></li>}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user && <>
              <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
            </>}
            {user && <>
              <li className="nav-item nav-link">Hello, {user.name} ({user.role})</li>
              <li className="nav-item"><button className="btn btn-outline-light" onClick={onSignOut}>Sign Out</button></li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  );
}