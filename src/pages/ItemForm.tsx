import React, { useState } from 'react';
import { createItem } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ItemForm(){
  const [title,setTitle]=useState(''); const [description,setDescription]=useState(''); const [foundAt,setFoundAt]=useState('');
  const nav = useNavigate();

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    await createItem({ title, description, foundAt });
    nav('/items');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Add Lost/Found Item</h3>
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={e=>setDescription(e.target.value)} required />
          </div>
          <div className="mb-3"><label className="form-label">Found At (location)</label>
            <input className="form-control" value={foundAt} onChange={e=>setFoundAt(e.target.value)} />
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}