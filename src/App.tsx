import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
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
            
            {/* Ruta 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Página no encontrada
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Lo sentimos, la página que buscas no existe.
                  </p>
                  <a
                    href="/"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors duration-200"
                  >
                    Volver al inicio
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
