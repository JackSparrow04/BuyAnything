import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Product(){
  const { id } = useParams();
  const [product,setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{ api.get('/products/'+id).then(r=>setProduct(r.data)).catch(()=>{}); },[id]);
  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    cart.push({ productId: product._id, title:product.title, price:product.price, quantity:1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  }
  if(!product) return <div className="container">Loading...</div>;
  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.images?.[0]||'https://via.placeholder.com/600'} alt={product.title} style={{maxWidth:400}}/>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
