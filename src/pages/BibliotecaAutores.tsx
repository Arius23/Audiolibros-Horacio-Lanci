import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, User, BookOpen, Clock, Eye } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';

const BibliotecaAutores = () => {
  const { datos, cargando, formatearDuracion, obtenerImagenAutorDesdeCanal } = useAudiolibros();
  const [autorSeleccionado, setAutorSeleccionado] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [searchParams] = useSearchParams();

  // Detectar autor en URL y pre-seleccionar
  useEffect(() => {
    const autorParam = searchParams.get('autor');
    if (autorParam && datos) {
      // Verificar que el autor existe en los datos
      const autorEncontrado = Object.keys(datos.estadisticas_generales.audiolibros.por_autor)
        .find(autor => autor === autorParam);
      
      if (autorEncontrado) {
        setAutorSeleccionado(autorEncontrado);
        // Scroll suave al contenido después de un breve delay
        setTimeout(() => {
          const elemento = document.querySelector('.lg\\:col-span-2');
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  }, [datos, searchParams]);

  const obtenerImagenAutor = (autor: string): string => {
    // Usar función que obtiene thumbnails desde el canal de YouTube
    return obtenerImagenAutorDesdeCanal(autor);
  };

  const obtenerBiografiaAutor = (autor: string): string => {
    const biografias: Record<string, string> = {
      'Arthur Conan Doyle': 'Escritor británico, célebre por crear al detective Sherlock Holmes. Sus historias de misterio y deducción han influenciado el género detectivesco hasta hoy.',
      'Julio Verne': 'Pionero de la ciencia ficción, conocido por sus novelas de aventuras extraordinarias que anticiparon muchos avances tecnológicos del siglo XX.',
      'George Orwell': 'Escritor y ensayista británico, autor de obras distópicas fundamentales como "1984" y "Rebelión en la granja" que critican el totalitarismo.',
      'Edgar Allan Poe': 'Maestro del relato de terror y misterio, considerado el inventor del relato detectivesco moderno y pionero de la literatura de horror psicológico.',
      'Oscar Wilde': 'Dramaturgo, poeta y escritor irlandés, conocido por su ingenio, elegancia literaria y su única novela "El retrato de Dorian Gray".'
    };
    
    return biografias[autor] || 'Uno de los grandes maestros de la literatura universal cuyas obras han trascendido el tiempo.';
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Cargando autores...</p>
        </div>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Error al cargar los datos</p>
      </div>
    );
  }

  const autores = Object.entries(datos.estadisticas_generales.audiolibros.por_autor)
    .sort(([, a], [, b]) => b - a)
    .filter(([autor]) => autor.toLowerCase().includes(busqueda.toLowerCase()));

  const audiolibrosAutorSeleccionado = autorSeleccionado 
    ? datos.catalogos_estructurados.por_autor[autorSeleccionado] || []
    : [];

  const calcularEstadisticasAutor = (autor: string) => {
    const audiolibros = datos.catalogos_estructurados.por_autor[autor] || [];
    const totalMinutos = audiolibros.reduce((acc, libro) => acc + libro.duracion_minutos, 0);
    const totalVistas = audiolibros.reduce((acc, libro) => acc + libro.vistas, 0);
    const promedioVistas = audiolibros.length > 0 ? Math.round(totalVistas / audiolibros.length) : 0;
    
    return {
      totalHoras: Math.round(totalMinutos / 60 * 10) / 10,
      totalVistas,
      promedioVistas,
      audiolibros: audiolibros.length
    };
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead
        title="Biblioteca por Autores | Audiolibros Horacio Lanci"
        description="Explora audiolibros organizados por autor: Arthur Conan Doyle, Julio Verne, George Orwell, Edgar Allan Poe y más. 24+ autores clásicos narrados por Horacio Lanci."
        keywords="audiolibros por autor, Arthur Conan Doyle audiolibros, Julio Verne audiolibros, George Orwell audio, Edgar Allan Poe narrado, autores clásicos, Horacio Lanci biblioteca"
        image="/images/og-autores.jpg"
        url="/biblioteca/autores"
        type="website"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explorar por Autor
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubre los {autores.length} autores cuyas obras han sido narradas por Horacio Lanci
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar autor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de autores */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Autores ({autores.length})
              </h2>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {autores.map(([autor, cantidad]) => {
                  const estadisticas = calcularEstadisticasAutor(autor);
                  const isSelected = autorSeleccionado === autor;
                  
                  return (
                    <button
                      key={autor}
                      onClick={() => setAutorSeleccionado(isSelected ? null : autor)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary/10 border-2 border-primary/30'
                          : 'hover:bg-background border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={obtenerImagenAutor(autor)}
                          alt={autor}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold truncate ${
                            isSelected ? 'text-blue-900' : 'text-foreground'
                          }`}>
                            {autor}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{cantidad} audiolibro{cantidad !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{estadisticas.totalHoras}h</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detalles del autor y audiolibros */}
          <div className="lg:col-span-2">
            {autorSeleccionado ? (
              <div className="space-y-8">
                {/* Información del autor */}
                <div className="bg-card rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={obtenerImagenAutor(autorSeleccionado)}
                      alt={autorSeleccionado}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                      <h2 className="text-2xl font-bold text-white mb-1">{autorSeleccionado}</h2>
                      <p className="text-white/90">
                        {datos.estadisticas_generales.audiolibros.por_autor[autorSeleccionado]} audiolibro{datos.estadisticas_generales.audiolibros.por_autor[autorSeleccionado] !== 1 ? 's' : ''} disponible{datos.estadisticas_generales.audiolibros.por_autor[autorSeleccionado] !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {obtenerBiografiaAutor(autorSeleccionado)}
                    </p>
                    
                    {/* Estadísticas del autor */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const stats = calcularEstadisticasAutor(autorSeleccionado);
                        return [
                          { icono: BookOpen, valor: stats.audiolibros, etiqueta: 'Audiolibros' },
                          { icono: Clock, valor: `${stats.totalHoras}h`, etiqueta: 'Duración Total' },
                          { icono: Eye, valor: stats.totalVistas.toLocaleString(), etiqueta: 'Total de Vistas' },
                          { icono: User, valor: stats.promedioVistas.toLocaleString(), etiqueta: 'Promedio por Obra' }
                        ].map((stat, index) => (
                          <div key={index} className="text-center p-4 bg-background rounded-lg">
                            <stat.icono className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <div className="text-xl font-bold text-foreground">{stat.valor}</div>
                            <div className="text-sm text-muted-foreground">{stat.etiqueta}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Lista de audiolibros del autor */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Audiolibros de {autorSeleccionado}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {audiolibrosAutorSeleccionado
                      .sort((a, b) => b.vistas - a.vistas)
                      .map((audiolibro, index) => (
                        <AudiolibroCard
                          key={`${audiolibro.titulo}-${index}`}
                          audiolibro={{ ...audiolibro, autor: autorSeleccionado }}
                          mostrarAutor={false}
                          tamano="mediano"
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Estado inicial - sin autor seleccionado */
              <div className="bg-card rounded-xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Selecciona un Autor
                </h3>
                <p className="text-muted-foreground mb-6">
                  Elige un autor de la lista para ver su biografía y todos sus audiolibros disponibles.
                </p>
                
                {/* Autores más populares */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {autores.slice(0, 6).map(([autor, cantidad]) => (
                    <button
                      key={autor}
                      onClick={() => setAutorSeleccionado(autor)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-primary/10 transition-all duration-200 group"
                    >
                      <img
                        src={obtenerImagenAutor(autor)}
                        alt={autor}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-2 group-hover:scale-105 transition-transform duration-200"
                      />
                      <h4 className="font-semibold text-foreground text-sm mb-1 group-hover:text-blue-900">
                        {autor}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {cantidad} obra{cantidad !== 1 ? 's' : ''}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaAutores;
