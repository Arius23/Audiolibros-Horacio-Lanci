import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Headphones, Book, User, Music, ChevronDown } from 'lucide-react';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenuBiblioteca, setSubmenuBiblioteca] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const menuItems = [
    { nombre: 'Inicio', ruta: '/', icono: Headphones },
    {
      nombre: 'Audioteca',
      ruta: '/biblioteca',
      icono: Book,
      submenu: [
        { nombre: 'Por Autor', ruta: '/biblioteca/autores' },
        { nombre: 'Por Género', ruta: '/biblioteca/generos' },
        { nombre: 'Por Duración', ruta: '/biblioteca/duracion' },
        { nombre: 'Todos los Audiolibros', ruta: '/biblioteca/todos' }
      ]
    },
    { nombre: 'Colecciones', ruta: '/colecciones', icono: Music },
    { nombre: 'Sobre los Audiolibros', ruta: '/sobre-audiolibros', icono: Book },
    { nombre: 'Sobre Horacio', ruta: '/sobre-horacio', icono: User }
  ];

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSubmenuBiblioteca(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuBiblioteca(false);
    }, 150); // 150ms delay para evitar cierres accidentales
  };

  const isActiveRoute = (ruta: string) => {
    if (ruta === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(ruta);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y título */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-[#D7AA4E]">
                <img 
                  src="images/horacio-avatar.jpg" 
                  alt="Horacio Lanci" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Music className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-white group-hover:text-[#D7AA4E] transition-colors duration-300">
                Horacio Lanci
              </h1>
              <p className="text-sm text-gray-300">Audiolibros de Dominio Público</p>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.nombre} className="relative group">
                {item.submenu ? (
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={item.ruta}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActiveRoute(item.ruta)
                          ? 'bg-secondary text-primary-foreground'
                          : 'text-gray-100 hover:bg-secondary hover:text-white'
                      }`}
                    >
                      <item.icono className="w-4 h-4 mr-2 text-[#D7AA4E]" />
                      {item.nombre}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Link>
                    
                    {submenuBiblioteca && (
                      <div className="absolute top-full left-0 w-56 bg-gray-900 rounded-lg shadow-xl border border-[#D7AA4E]/30 py-2 z-50">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.nombre}
                            to={subitem.ruta}
                            className="block px-4 py-2 text-gray-200 hover:bg-secondary hover:text-primary transition-colors duration-200"
                          >
                            {subitem.nombre}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.ruta}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.ruta)
                        ? 'bg-secondary text-primary-foreground'
                        : 'text-gray-100 hover:bg-secondary hover:text-white'
                    }`}
                  >
                    <item.icono className="w-4 h-4 mr-2 text-[#D7AA4E]" />
                    {item.nombre}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Botón menú móvil */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-100 hover:bg-secondary hover:text-white transition-colors duration-200"
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="lg:hidden py-4 border-t border-[#D7AA4E]/30">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.nombre}>
                  <Link
                    to={item.ruta}
                    onClick={() => setMenuAbierto(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.ruta)
                        ? 'bg-secondary text-primary-foreground'
                        : 'text-gray-100 hover:bg-secondary hover:text-white'
                    }`}
                  >
                    <item.icono className="w-5 h-5 mr-3 text-[#D7AA4E]" />
                    {item.nombre}
                  </Link>
                  
                  {item.submenu && isActiveRoute(item.ruta) && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.nombre}
                          to={subitem.ruta}
                          onClick={() => setMenuAbierto(false)}
                          className="block px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-secondary transition-colors duration-200"
                        >
                          {subitem.nombre}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
