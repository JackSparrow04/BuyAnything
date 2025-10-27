import { useEffect, useState } from 'react';
import api from '../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({clientSecret}){
  const stripe = useStripe();
  const elements = useElements();
  const [msg,setMsg] = useState('');
  async function handleSubmit(e){
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const res = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
    if(res.error) setMsg(res.error.message);
    else setMsg('Payment successful');
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
      <div>{msg}</div>
    </form>
  );
}

export default function Checkout(){
  const [clientSecret,setClientSecret] = useState(null);
  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem('cart')||'[]');
    // map to server expected shape
    const payload = items.map(it=>({ product: it.productId, price: it.price, quantity: it.quantity }));
    api.post('/orders/create-payment-intent', { items: payload }).then(r=>setClientSecret(r.data.clientSecret)).catch(err=>console.error(err));
  },[]);
  if(!clientSecret) return <div className="container">Preparing payment...</div>;
  return (
    <div className="container">
      <h2>Pay</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}
