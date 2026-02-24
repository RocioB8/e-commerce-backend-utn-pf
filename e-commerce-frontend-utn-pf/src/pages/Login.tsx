import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generatePopup } from '../../utils/popup';
import { Eye, EyeOff } from 'lucide-react';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { authContextLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await authContextLogin({ email, password });

    if (response) {
      generatePopup({
        textTitle: `¡Hola!`,
        textContent: "Ingreso exitoso al panel de control.",
        icon: "success"
      });

      navigate('/catalog');
    } else {
      generatePopup({
        textTitle: "Error de acceso",
        textContent: "Credenciales incorrectas. Revisá tu email y contraseña.",
        icon: "error"
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-icon">👟</div>
          <h1>SNEAKERS SHOP</h1>
          <p>Gestión de Inventario</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email corporativo</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="nombre@tienda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login">
            ENTRAR AL PANEL
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes acceso? <Link to="/register">Solicitar registro</Link></p>
        </div>
      </div>
    </div>
  );
};

export { Login };