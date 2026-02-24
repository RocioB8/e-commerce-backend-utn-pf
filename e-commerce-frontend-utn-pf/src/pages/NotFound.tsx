import { useNavigate } from 'react-router-dom';
import '../css/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf-container">
      <div className="nf-content">
        <h1 className="nf-title">404</h1>
        <div className="nf-icon">👟💨</div>
        <h2>¡Ups! Te saliste del camino</h2>
        <p>Parece que este modelo no está en nuestro inventario o la página se esfumó.</p>
        
        <button className="nf-btn" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>
      
      
      <div className="nf-footprints">
        <span>👣</span>
        <span>👣</span>
        <span>👣</span>
      </div>
    </div>
  );
};

export { NotFound };