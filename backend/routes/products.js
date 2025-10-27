const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/', async (req,res)=>{
  const products = await Product.find().sort({ createdAt:-1 });
  res.json(products);
});

router.get('/:id', async (req,res)=>{
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).json({ msg:'Not found' });
  res.json(product);
});

router.post('/', auth, async (req,res)=>{
  const token = req.header('Authorization')?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded.user.isAdmin) return res.status(403).json({ msg:'Admin only' });
  const { title, description, price, images, stock } = req.body;
  const p = new Product({ title, description, price, images, stock });
  await p.save();
  res.json(p);
});

router.put('/:id', auth, async (req,res)=>{
  const token = req.header('Authorization')?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded.user.isAdmin) return res.status(403).json({ msg:'Admin only' });
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(updated);
});

router.delete('/:id', auth, async (req,res)=>{
  const token = req.header('Authorization')?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded.user.isAdmin) return res.status(403).json({ msg:'Admin only' });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg:'Deleted' });
});

module.exports = router;
