import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')||'[]'));
  const navigate = useNavigate();
  function checkout(){ navigate('/checkout'); }
  function remove(i){ cart.splice(i,1); setCart([...cart]); localStorage.setItem('cart', JSON.stringify(cart)); }
  return (
    <div className="container">
      <h2>Cart</h2>
      {cart.length===0 ? <p>Cart empty</p> : (
        <ul>
          {cart.map((it,idx)=>(
            <li key={idx}>{it.title} - ₹{it.price} x {it.quantity} <button onClick={()=>remove(idx)}>Remove</button></li>
          ))}
        </ul>
      )}
      <button onClick={checkout} disabled={cart.length===0}>Checkout</button>
    </div>
  );
}
