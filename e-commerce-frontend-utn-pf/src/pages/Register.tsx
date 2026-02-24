import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generatePopup } from '../../utils/popup';
import { Eye, EyeOff } from 'lucide-react';
import '../css/Login.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { authContextRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
          const res = await authContextRegister({ name, email, password });
      const json = await res.json();

      if (res.ok && json.success) {
        generatePopup({ 
          textTitle: "¡Cuenta creada con éxito!", 
          textContent: `Bienvenido/a ${name}. Ahora ya podés iniciar sesión.`,
          icon: "success" 
        });
        navigate('/login'); 
      } else {
        generatePopup({
          textTitle: "Error en el registro",
          textContent: json.message || "No se pudo completar el registro.",
          icon: "error"
        });
      }
    } catch (error) {
      generatePopup({
        textTitle: "Error de conexión",
        textContent: "No se pudo conectar con el servidor.",
        icon: "error"
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-icon">✨</div>
          <h1>NUEVO USUARIO</h1>
          <p>Sumate al equipo de Sneakers Shop</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <div className="input-wrapper">
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Corporativo</label>
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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login">
            REGISTRARME
          </button>
        </form>

        <div className="login-footer">
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export { Register };