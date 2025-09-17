import { Link } from 'react-router-dom';
import { Youtube, Headphones, Book, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información principal */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D7AA4E] to-[#B8934A] rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Horacio Lanci</h3>
                <p className="text-gray-300">Audiolibros de Dominio Público</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Maestro Horacio Lanci comparte su pasión por la literatura a través de 
              narraciones profesionales de obras clásicas de dominio público. 
              Más de 45 audiolibros y 238+ horas de contenido gratuito para todos.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.youtube.com/@HoracioLanci"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                <Youtube className="w-4 h-4 mr-2" />
                Canal de YouTube
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D7AA4E]">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Explorar por Autor
                </Link>
              </li>
              <li>
                <Link to="/biblioteca/generos" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Explorar por Género
                </Link>
              </li>
              <li>
                <Link to="/colecciones" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Colecciones Especiales
                </Link>
              </li>
              <li>
                <Link to="/sobre-audiolibros" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Sobre los Audiolibros
                </Link>
              </li>
              <li>
                <Link to="/sobre-horacio" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Sobre Horacio Lanci
                </Link>
              </li>
            </ul>
          </div>

          {/* Autores destacados */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D7AA4E]">Autores Destacados</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <Book className="w-3 h-3 mr-2" />
                  Arthur Conan Doyle
                </Link>
              </li>
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <Book className="w-3 h-3 mr-2" />
                  Julio Verne
                </Link>
              </li>
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <Book className="w-3 h-3 mr-2" />
                  George Orwell
                </Link>
              </li>
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <Book className="w-3 h-3 mr-2" />
                  Edgar Allan Poe
                </Link>
              </li>
              <li>
                <Link to="/biblioteca/autores" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <Book className="w-3 h-3 mr-2" />
                  Oscar Wilde
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Estadísticas destacadas */}
        <div className="border-t border-[#D7AA4E]/30 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-secondary/20 rounded-lg p-4 border border-primary/20">
              <div className="text-2xl font-bold text-[#D7AA4E]">45+</div>
              <div className="text-sm text-gray-300">Audiolibros</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4 border border-primary/20">
              <div className="text-2xl font-bold text-[#D7AA4E]">238+</div>
              <div className="text-sm text-gray-300">Horas de Contenido</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4 border border-primary/20">
              <div className="text-2xl font-bold text-[#D7AA4E]">1M+</div>
              <div className="text-sm text-gray-300">Reproducciones</div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4 border border-primary/20">
              <div className="text-2xl font-bold text-[#D7AA4E]">100%</div>
              <div className="text-sm text-gray-300">Gratuito</div>
            </div>
          </div>
        </div>

        {/* Información legal y créditos */}
        <div className="border-t border-[#D7AA4E]/30 mt-8 pt-8 text-center">
          <div className="mb-4">
            <p className="text-gray-300 text-sm mb-2">
              Todas las obras son de dominio público y se distribuyen sin fines de lucro.
            </p>
            <p className="text-gray-300 text-sm">
              Las narraciones y grabaciones son propiedad intelectual de Horacio Lanci.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {anioActual} Horacio Lanci. Audiolibros de Dominio Público.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>para la cultura libre</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
