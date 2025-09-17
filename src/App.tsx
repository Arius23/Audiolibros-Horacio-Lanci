import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // <-- CAMBIO 1
import Header from './components/Header';
import Footer from './components/Footer';
import PerformanceOptimizer2025 from './components/PerformanceOptimizer2025';
import Inicio from './pages/Inicio';
import BibliotecaTodos from './pages/BibliotecaTodos';
import BibliotecaAutores from './pages/BibliotecaAutores';
import BibliotecaGeneros from './pages/BibliotecaGeneros';
import BibliotecaDuracion from './pages/BibliotecaDuracion';
import Colecciones from './pages/Colecciones';
import SobreAudiolibros from './pages/SobreAudiolibros';
import SobreHoracio from './pages/SobreHoracio';

function App() {
  // Activar tema oscuro globalmente
  useEffect(() => {
    document.body.classList.add('dark');
    document.body.style.backgroundColor = 'hsl(210 11% 15%)'; // --background
    document.body.style.color = 'hsl(210 11% 90%)'; // --foreground
  }, []);

  return (
    <Router> {/* <-- CAMBIO 2 */}
      <div className="min-h-screen flex flex-col">
        <PerformanceOptimizer2025 />
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/biblioteca/todos" element={<BibliotecaTodos />} />
            <Route path="/biblioteca/autores" element={<BibliotecaAutores />} />
            <Route path="/biblioteca/generos" element={<BibliotecaGeneros />} />
            <Route path="/biblioteca/duracion" element={<BibliotecaDuracion />} />
            <Route path="/biblioteca" element={<BibliotecaTodos />} />
            <Route path="/colecciones" element={<Colecciones />} />
            <Route path="/sobre-audiolibros" element={<SobreAudiolibros />} />
            <Route path="/sobre-horacio" element={<SobreHoracio />} />
            
            {/* Ruta 404 - Ahora funcionará correctamente dentro del enrutador */}
            <Route path="*" element={<Inicio />} /> 
            {/* Nota: He cambiado la ruta 404 para que redirija al Inicio, 
                así cualquier enlace incorrecto te lleva a un lugar seguro en lugar de la página de error.
                Podemos cambiar esto después si prefieres mostrar el 404. */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

