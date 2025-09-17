import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';
import { useAudiolibrosOrganizados } from '../hooks/useAudiolibrosOrganizados';

const BibliotecaGeneros = () => {
  const { datos, cargando: cargandoBase } = useAudiolibros();
  const { 
    obtenerGenerosReorganizados, 
    obtenerImagenGeneroDesdeCanal,
    formatearNombreGenero,
    obtenerDescripcionGenero,
    cargando: cargandoOrganizados 
  } = useAudiolibrosOrganizados();
  
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [searchParams] = useSearchParams();

  const generos = obtenerGenerosReorganizados;
  const cargando = cargandoBase || cargandoOrganizados;

  // Detectar género en URL y pre-seleccionar
  useEffect(() => {
    const generoParam = searchParams.get('genero');
    if (generoParam && generos.length > 0) {
      // Verificar que el género existe en los datos reorganizados
      const generoEncontrado = generos.find(g => g.genero === generoParam);
      
      if (generoEncontrado) {
        setGeneroSeleccionado(generoEncontrado.genero);
        // Scroll suave al contenido después de un breve delay
        setTimeout(() => {
          const elemento = document.querySelector('.lg\\:col-span-2');
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  }, [generos, searchParams]);

  const obtenerImagenGenero = (genero: string): string => {
    return obtenerImagenGeneroDesdeCanal(genero);
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando géneros...</p>
        </div>
      </div>
    );
  }

  if (!datos || generos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Error al cargar los datos</p>
      </div>
    );
  }

  const generosFiltrados = generos.filter(generoData => 
    generoData.info.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const audiolibrosGeneroSeleccionado = generoSeleccionado 
    ? generos.find(g => g.genero === generoSeleccionado)?.audiolibros || []
    : [];
    
  const generoSeleccionadoInfo = generos.find(g => g.genero === generoSeleccionado);

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead
        title="Audiolibros por Género - Biblioteca de Horacio Lanci"
        description="Explora 10 géneros literarios únicos con 40 audiolibros clásicos. Desde Misterio y Detective hasta Literatura Infantil, encuentra tu género favorito."
        keywords="audiolibros por género, misterio detective, ciencia ficción, literatura clásica, terror gótico, aventuras, distopía, poesía espiritualidad, historia biografía"
        url="/biblioteca/generos"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explorar por Género
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubre los {generosFiltrados.length} géneros literarios con {generos.reduce((total, g) => total + g.cantidad, 0)} audiolibros disponibles en nuestra biblioteca
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar género..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de géneros */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Géneros ({generosFiltrados.length})
              </h2>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {generosFiltrados.map((generoData) => {
                  const isSelected = generoSeleccionado === generoData.genero;
                  
                  return (
                    <button
                      key={generoData.genero}
                      onClick={() => setGeneroSeleccionado(isSelected ? null : generoData.genero)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={obtenerImagenGenero(generoData.genero)}
                            alt={generoData.info.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold truncate ${
                            isSelected ? 'text-blue-900' : 'text-foreground'
                          }`}>
                            {generoData.info.nombre}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{generoData.cantidad} audiolibro{generoData.cantidad !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{generoData.info.icono}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detalles del género y audiolibros */}
          <div className="lg:col-span-2">
            {generoSeleccionado ? (
              <div className="space-y-8">
                {/* Información del género */}
                <div className="bg-card rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={obtenerImagenGeneroDesdeCanal(generoSeleccionado)}
                      alt={formatearNombreGenero(generoSeleccionado)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {formatearNombreGenero(generoSeleccionado)}
                      </h2>
                      <p className="text-white/90">
                        {generoSeleccionadoInfo?.cantidad || 0} audiolibro{(generoSeleccionadoInfo?.cantidad || 0) !== 1 ? 's' : ''} disponible{(generoSeleccionadoInfo?.cantidad || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {obtenerDescripcionGenero(generoSeleccionado)}
                    </p>
                    
                    {/* Estadísticas del género */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(() => {
                        const audiolibros = audiolibrosGeneroSeleccionado;
                        const totalMinutos = audiolibros.reduce((acc, libro) => acc + libro.duracion_minutos, 0);
                        const totalVistas = audiolibros.reduce((acc, libro) => acc + libro.vistas, 0);
                        const totalHoras = Math.round(totalMinutos / 60 * 10) / 10;
                        
                        return [
                          { valor: audiolibros.length, etiqueta: 'Audiolibros', icono: '📚' },
                          { valor: `${totalHoras}h`, etiqueta: 'Duración Total', icono: '⏱️' },
                          { valor: totalVistas.toLocaleString(), etiqueta: 'Total de Vistas', icono: '👁️' }
                        ].map((stat, index) => (
                          <div key={index} className="text-center p-4 bg-background rounded-lg">
                            <div className="text-2xl mb-2">{stat.icono}</div>
                            <div className="text-xl font-bold text-foreground">{stat.valor}</div>
                            <div className="text-sm text-muted-foreground">{stat.etiqueta}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Lista de audiolibros del género */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Audiolibros de {generoSeleccionadoInfo?.info.nombre || formatearNombreGenero(generoSeleccionado)}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {audiolibrosGeneroSeleccionado.map((audiolibro, index) => (
                      <AudiolibroCard
                        key={`${audiolibro.titulo}-${index}`}
                        audiolibro={audiolibro}
                        mostrarAutor={true}
                        tamano="mediano"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Estado inicial - sin género seleccionado */
              <div className="bg-card rounded-xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Selecciona un Género
                </h3>
                <p className="text-muted-foreground mb-6">
                  Elige un género literario de la lista para ver todos los audiolibros disponibles de esa categoría.
                </p>
                
                {/* Géneros más populares */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {generos.slice(0, 6).map((generoData) => (
                    <button
                      key={generoData.genero}
                      onClick={() => setGeneroSeleccionado(generoData.genero)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden mx-auto mb-2 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={obtenerImagenGeneroDesdeCanal(generoData.genero)}
                          alt={generoData.info.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1 group-hover:text-blue-900">
                        {generoData.info.nombre}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {generoData.cantidad} obra{generoData.cantidad !== 1 ? 's' : ''}
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

export default BibliotecaGeneros;