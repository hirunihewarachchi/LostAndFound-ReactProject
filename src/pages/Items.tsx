import React, { useEffect, useState } from 'react';
import { getItems, toggleClaim, removeItem } from '../services/api';
import { Item } from '../types';
import { useAuth } from '../services/auth';

export default function Items(){
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useAuth();

  const load = async ()=> setItems(await getItems());
  useEffect(()=>{ load(); }, []);

  const onToggle = async (id:string) => { await toggleClaim(id); load(); };
  const onDelete = async (id:string) => { if(window.confirm('Delete item?')){ await removeItem(id); load(); } };

  return (
    <div>
      <h3>Lost & Found Items</h3>
      <table className="table">
        <thead><tr><th>Title</th><th>Description</th><th>Found At</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(it=>(
            <tr key={it.id}>
              <td>{it.title}</td>
              <td>{it.description}</td>
              <td>{it.foundAt}</td>
              <td>{it.claimed ? 'Claimed' : 'Available'}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>onToggle(it.id)}>
                  {it.claimed ? 'Mark Unclaimed' : 'Mark Claimed'}
                </button>
                {user?.role === 'admin' && <button className="btn btn-sm btn-danger" onClick={()=>onDelete(it.id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}