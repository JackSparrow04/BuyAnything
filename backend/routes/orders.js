const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req,res)=>{
  const { items, currency='inr' } = req.body;
  // compute amount server-side:
  const amount = items.reduce((sum,it)=> sum + (it.price||0) * (it.quantity||1), 0);
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    });
    const order = new Order({ user: req.user.id, items, total: amount, paymentIntent: paymentIntent.id });
    await order.save();
    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  }catch(err){
    console.error('Stripe error', err?.raw || err);
    res.status(500).send('Stripe error');
  }
});

module.exports = router;
