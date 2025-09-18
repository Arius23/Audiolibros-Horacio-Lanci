import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Users, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/HeroSection';
import EstadisticasYoutube from '../components/EstadisticasYoutube';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';
import { useAudiolibrosOrganizados } from '../hooks/useAudiolibrosOrganizados';

const Inicio = () => {
  const { 
    obtenerAudiolibrosDestacados, 
    obtenerAutoresPopulares, 
    obtenerImagenAutorDesdeCanal,
    cargando: cargandoBase 
  } = useAudiolibros();

  const {
    obtenerGenerosReorganizados,
    obtenerImagenGeneroDesdeCanal,
    cargando: cargandoOrganizados
  } = useAudiolibrosOrganizados();

  const audiolibrosDestacados = obtenerAudiolibrosDestacados();
  const autoresPopulares = obtenerAutoresPopulares();
  const generos = obtenerGenerosReorganizados;
  const cargando = cargandoBase || cargandoOrganizados;

  // Usar las funciones dinámicas del hook en lugar de imágenes estáticas
  const obtenerImagenAutor = obtenerImagenAutorDesdeCanal;
  const obtenerImagenGenero = obtenerImagenGeneroDesdeCanal;

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Audiolibros de Dominio Público Gratis - Horacio Lanci | 77+ Clásicos"
        description="Descubre 77+ audiolibros clásicos gratis narrados profesionalmente por Horacio Lanci. Sherlock Holmes, Julio Verne, George Orwell y más. 258+ horas de literatura de calidad, 100% dominio público. Actualización automática desde YouTube."
        keywords="audiolibros gratis, dominio público, Sherlock Holmes, Julio Verne, George Orwell, literatura clásica, narración profesional, audiobooks español, libros gratis, Horacio Lanci, Edgar Allan Poe, Ray Bradbury"
        image="images/og-homepage.jpg" // <-- ESTA ES LA LÍNEA QUE HE CORREGIDO
        url="/"
        type="website"
      />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Estadísticas de YouTube */}
      <EstadisticasYoutube />

      {/* Audiolibros Destacados */}
      <section className="py-16" style={{backgroundColor: '#2d3a4e'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Audiolibros Más Populares
              </h2>
            </div>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Los audiolibros más escuchados por nuestra comunidad. 
              Grandes clásicos que han cautivado a miles de oyentes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {audiolibrosDestacados.slice(0, 6).map((audiolibro, index) => (
              <AudiolibroCard 
                key={`${audiolibro.titulo}-${index}`} 
                audiolibro={audiolibro} 
                mostrarAutor={true}
              />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/biblioteca/todos"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              Ver Todos los Audiolibros
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Autores Populares */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#D7AA4E] mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Autores Más Narrados
              </h2>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Los grandes maestros de la literatura cuyas obras forman 
              el corazón de nuestra biblioteca.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {autoresPopulares.map((autor, index) => (
              <Link
                key={autor.nombre}
                to={`/biblioteca/autores?autor=${encodeURIComponent(autor.nombre)}`}
                className="group bg-gray-800 hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-700"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={obtenerImagenAutor(autor.nombre)}
                    alt={autor.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-center mb-2 group-hover:text-[#D7AA4E] transition-colors duration-200">
                    {autor.nombre}
                  </h3>
                  <div className="text-center">
                    <span className="bg-[#7f40b7] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {autor.cantidad} audiolibro{autor.cantidad !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/biblioteca/autores"
              className="inline-flex items-center bg-[#D7AA4E] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#E1B555] transition-colors duration-200"
            >
              Explorar por Autor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Géneros Literarios */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#7f40b7] mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Explora por Género
              </h2>
            </div>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Desde emocionantes aventuras hasta profundas reflexiones filosóficas. 
              Encuentra el género que más te apasione.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {generos.slice(0, 6).map((generoData) => (
              <Link
                key={generoData.genero}
                to={`/biblioteca/generos?genero=${encodeURIComponent(generoData.genero)}`}
                className="group relative bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-600"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={obtenerImagenGenero(generoData.genero)}
                    alt={generoData.info.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{generoData.info.icono}</span>
                    <h3 className="font-bold text-lg text-white">
                      {generoData.info.nombre}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                    {generoData.info.descripcion}
                  </p>
                  <span className="bg-[#7f40b7] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                    {generoData.cantidad} audiolibro{generoData.cantidad !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <TrendingUp className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/biblioteca/generos"
              className="inline-flex items-center bg-[#7f40b7] text-white px-6 py-3 rounded-lg hover:bg-[#8a4bc7] transition-colors duration-200"
            >
              Ver Todos los Géneros
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Llamada a la acción final */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar tu viaje literario?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Únete a miles de oyentes que ya disfrutan de los mejores audiolibros 
            de dominio público, narrados profesionalmente por Horacio Lanci.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/biblioteca/todos"
              className="bg-gradient-to-r from-[#D7AA4E] to-[#B8934A] text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:from-[#E1B555] hover:to-[#C9A450] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explorar Audioteca</span>
            </Link>
            
            <a
              href="https://www.youtube.com/@HoracioLanci"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Visitar Canal</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
