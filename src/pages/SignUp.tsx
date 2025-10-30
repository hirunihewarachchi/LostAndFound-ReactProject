import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function SignUp(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [role,setRole]=useState<'admin'|'user'>('user');
  const [err,setErr]=useState(''); const { signup } = useAuth(); const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({ name, email, password, role });
      nav('/items');
    } catch (ex:any) {
      setErr(ex.message || 'Sign up failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Sign Up</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={e=>setRole(e.target.value as 'admin'|'user')}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="btn btn-success">Sign Up</button>
        </form>
      </div>
    </div>
  );
}