import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)).catch(()=>{}); },[]);
  return (
    <div className="container">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p=> <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
