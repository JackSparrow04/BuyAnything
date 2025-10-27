import { Link } from 'react-router-dom';
export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <Link to="/"><h1>My Shop</h1></Link>
        <nav>
          <Link to="/cart">Cart</Link> | <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
