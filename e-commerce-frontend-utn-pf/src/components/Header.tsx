import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Home, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../css/Header.css';

const Header = () => {

  const { authContextLogout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authContextLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">👟 SNEAKERS SHOP</Link>
      </div>

      <nav>
        <ul className="header-links">


          <li>
            <Link to="/"><Home size={20} /> Inicio</Link>
          </li>

          {!token && (
            <li>
              <Link to="/login"><User size={20} /> Login</Link>
            </li>
          )}


          {token && (
            <>
              <li>
                <Link to="/catalog">🛒 Catalog</Link>
              </li>
              <li className="cart-icon">
                <ShoppingCart size={24} />
                <span className="cart-count">0</span>
              </li>
            </>
          )}
        </ul>
      </nav>


      {token && (
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Cerrar Sesión
        </button>
      )}
    </header>
  );
};

export { Header };