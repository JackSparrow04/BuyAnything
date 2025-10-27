import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminPanel(){
  const [products,setProducts] = useState([]);
  const [form,setForm] = useState({ title:'', description:'', price:0, images:[], stock:0 });

  useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)).catch(()=>{}); },[]);

  async function create(){
    await api.post('/products', form);
    const r = await api.get('/products'); setProducts(r.data);
  }
  async function del(id){ await api.delete('/products/'+id); setProducts(prev=>prev.filter(p=>p._id!==id)); }

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div className="admin-form">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
        <input placeholder="Image URL (comma separated)" onChange={e=>setForm({...form,images:e.target.value.split(',')})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button onClick={create}>Create</button>
      </div>
      <ul>
        {products.map(p=>(
          <li key={p._id}>{p.title} - ₹{p.price} <button onClick={()=>del(p._id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}
