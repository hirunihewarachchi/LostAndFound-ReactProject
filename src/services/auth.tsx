import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simple localStorage 'backend' for users
const USERS_KEY = 'laf_users_v1';
const AUTH_KEY = 'laf_auth_v1';

interface AuthContextValue { user: User | null; signin: (email:string,password:string)=>Promise<void>; signup: (data:{name:string,email:string,password:string,role:'admin'|'user'})=>Promise<void>; signout: ()=>void }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readUsers(){
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function writeUsers(u:any){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [user,setUser] = useState<User|null>(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(()=> { if(user) localStorage.setItem(AUTH_KEY, JSON.stringify(user)); else localStorage.removeItem(AUTH_KEY); }, [user]);

  const signin = async (email:string, password:string) => {
    const users = readUsers();
    const found = users.find((u:any)=>u.email===email && u.password===password);
    if(!found) throw new Error('Invalid credentials');
    const token = 'fake-jwt-' + uuidv4();
    const u = { id: found.id, name: found.name, email: found.email, role: found.role, token };
    setUser(u);
  };

  const signup = async (data:{name:string,email:string,password:string,role:'admin'|'user'}) => {
    const users = readUsers();
    if(users.find((u:any)=>u.email===data.email)) throw new Error('Email already exists');
    const id = uuidv4();
    users.push({ id, name: data.name, email: data.email, password: data.password, role: data.role });
    writeUsers(users);
    const token = 'fake-jwt-' + uuidv4();
    const u = { id, name: data.name, email: data.email, role: data.role, token };
    setUser(u);
  };

  const signout = () => { setUser(null); };

  return <AuthContext.Provider value={{ user, signin, signup, signout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const c = useContext(AuthContext);
  if(!c) throw new Error('useAuth must be used inside AuthProvider');
  return c;
};