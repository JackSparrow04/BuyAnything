import { Link } from 'react-router-dom';
export default function ProductCard({product}){
  return (
    <div className="card">
      <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <Link to={'/product/'+product._id}>View</Link>
    </div>
  );
}
