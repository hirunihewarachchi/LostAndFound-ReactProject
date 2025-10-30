import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function SignIn(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState(''); const { signin } = useAuth(); const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signin(email, password);
      nav('/items');
    } catch (ex:any) {
      setErr(ex.message || 'Sign in failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Sign In</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}