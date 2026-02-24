import { Header } from '../components/Header';
import { Footprints, History, Star, Users } from 'lucide-react';
import '../css/About.css';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      
      <main className="about-container">
        <section className="about-hero">
          <h1>Nuestra Pasión, Tus Pasos 👣</h1>
          <p>En <strong>Sneakers Shop 🛒</strong> no solo vendemos calzado, curamos cultura urbana desde 2026.</p>
        </section>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon"><History size={40} /></div>
            <h3>Nuestra Historia</h3>
            <p>Nacimos en un garage con un solo par de zapatillas y el sueño de digitalizar el stock más exclusivo del país.</p>
          </div>

          <div className="about-card">
            <div className="about-icon"><Star size={40} /></div>
            <h3>Calidad Premium</h3>
            <p>Cada modelo en nuestro catálogo pasa por un riguroso proceso de verificación de autenticidad y calidad.</p>
          </div>

          <div className="about-card">
            <div className="about-icon"><Users size={40} /></div>
            <h3>Comunidad</h3>
            <p>Más que clientes, somos una comunidad de sneakerheads que valoran el diseño y la comodidad.</p>
          </div>

          <div className="about-card">
            <div className="about-icon"><Footprints size={40} /></div>
            <h3>Sustentabilidad</h3>
            <p>Trabajamos con marcas que priorizan procesos de fabricación responsables con el medio ambiente.</p>
          </div>
        </div>

        <section className="about-footer-info">
          <h2>¿Listo para renovar tu estilo?</h2>
          <p>Explorá nuestro catálogo y encontrá ese par que estabas buscando.</p>
        </section>
      </main>
    </div>
  );
};

export { About };