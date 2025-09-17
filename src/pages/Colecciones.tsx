import { Star, Crown, TrendingUp, BookOpen } from 'lucide-react';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';

const Colecciones = () => {
  const { datos, cargando } = useAudiolibros();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Cargando colecciones...</p>
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

  // Crear colecciones especiales basadas en los datos
  const getAudiolibrosAutor = (autor: string) => {
    try {
      if (!datos || !datos.catalogos_estructurados || !datos.catalogos_estructurados.por_autor) {
        return [];
      }
      const audiolibros = datos.catalogos_estructurados.por_autor[autor];
      return Array.isArray(audiolibros) ? audiolibros : [];
    } catch (error) {
      console.warn(`Error al obtener audiolibros de ${autor}:`, error);
      return [];
    }
  };

  const getAudiolibrosGenero = (genero: string) => {
    try {
      if (!datos || !datos.catalogos_estructurados || !datos.catalogos_estructurados.por_genero) {
        return [];
      }
      const audiolibros = datos.catalogos_estructurados.por_genero[genero];
      return Array.isArray(audiolibros) ? audiolibros : [];
    } catch (error) {
      console.warn(`Error al obtener audiolibros de género ${genero}:`, error);
      return [];
    }
  };

  const colecciones = [
    {
      titulo: 'Sherlock Holmes Completo',
      descripcion: 'La colección completa del detective más famoso de la literatura',
      icono: '🔍',
      color: 'primary',
      audiolibros: getAudiolibrosAutor('Arthur Conan Doyle')
    },
    {
      titulo: 'Julio Verne: Viajes Extraordinarios',
      descripcion: 'Aventuras épicas y exploraciones científicas del maestro de la ciencia ficción',
      icono: '🚀',
      color: 'secondary',
      audiolibros: getAudiolibrosAutor('Julio Verne')
    },
    {
      titulo: 'Clásicos Imprescindibles',
      descripcion: 'Las obras más importantes que todo amante de la literatura debe conocer',
      icono: '👑',
      color: 'accent',
      audiolibros: [
        ...getAudiolibrosAutor('George Orwell'),
        ...getAudiolibrosAutor('Edgar Allan Poe').slice(0, 2),
        ...getAudiolibrosAutor('Oscar Wilde')
      ].filter(libro => libro) // Filtrar elementos undefined
    },
    {
      titulo: 'Literatura de Terror',
      descripcion: 'Cuentos escalofriantes para los amantes del suspense y el horror',
      icono: '🌙',
      color: 'accent',
      audiolibros: getAudiolibrosGenero('literatura_terror')
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Colecciones Especiales
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestras colecciones cuidadosamente curadas que agrupan los mejores 
            audiolibros por tema, autor o género literario.
          </p>
        </div>

        {/* Estadísticas de colecciones */}
        <div className="bg-card rounded-xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Crown className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{colecciones.length}</div>
              <div className="text-sm text-muted-foreground">Colecciones Especiales</div>
            </div>
            <div>
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {colecciones.reduce((acc, col) => acc + col.audiolibros.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Audiolibros Incluidos</div>
            </div>
            <div>
              <Star className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold text-foreground">
                {Math.max(...colecciones.map(col => col.audiolibros.length))}
              </div>
              <div className="text-sm text-muted-foreground">Mayor Colección</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Gratuito</div>
            </div>
          </div>
        </div>

        {/* Lista de colecciones */}
        <div className="space-y-16">
          {colecciones.map((coleccion, index) => {
            if (coleccion.audiolibros.length === 0) return null;
            
            const colorClasses = {
              primary: 'from-primary to-secondary',
              secondary: 'from-secondary to-accent',
              accent: 'from-accent to-primary',
              gray: 'from-gray-700 to-gray-800'
            };

            return (
              <div key={index} className="bg-card rounded-2xl shadow-lg overflow-hidden">
                {/* Header de la colección */}
                <div className={`bg-gradient-to-r ${colorClasses[coleccion.color as keyof typeof colorClasses]} text-white p-8`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{coleccion.icono}</span>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                          {coleccion.titulo}
                        </h2>
                        <p className="text-lg opacity-90 mb-2">
                          {coleccion.descripcion}
                        </p>
                        <div className="flex items-center text-sm opacity-75">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{coleccion.audiolibros.length} audiolibro{coleccion.audiolibros.length !== 1 ? 's' : ''}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {Math.round(coleccion.audiolibros.reduce((acc, libro) => acc + (libro.duracion_minutos || 0), 0) / 60 * 10) / 10}h total
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {coleccion.audiolibros.reduce((acc, libro) => acc + (libro.vistas || 0), 0).toLocaleString()}
                      </div>
                      <div className="text-sm opacity-75">reproducciones totales</div>
                    </div>
                  </div>
                </div>

                {/* Contenido de la colección */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coleccion.audiolibros
                      .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
                      .map((audiolibro, audioIndex) => (
                        <AudiolibroCard
                          key={`${audiolibro.titulo}-${audioIndex}`}
                          audiolibro={audiolibro}
                          mostrarAutor={coleccion.titulo !== 'Sherlock Holmes Completo' && coleccion.titulo !== 'Julio Verne: Viajes Extraordinarios'}
                          tamano="mediano"
                        />
                      ))}
                  </div>

                  {/* Estadísticas de la colección */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-foreground">
                          {coleccion.audiolibros.length}
                        </div>
                        <div className="text-sm text-muted-foreground">Audiolibros</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">
                          {Math.round(coleccion.audiolibros.reduce((acc, libro) => acc + (libro.duracion_minutos || 0), 0) / 60 * 10) / 10}h
                        </div>
                        <div className="text-sm text-muted-foreground">Duración Total</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">
                          {Math.round(coleccion.audiolibros.reduce((acc, libro) => acc + (libro.vistas || 0), 0) / coleccion.audiolibros.length).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Promedio de Vistas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Llamada a la acción */}
        <div className="mt-16 bg-gradient-to-r from-muted via-card to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl text-foreground dark:text-white p-8 text-center border border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Tienes una sugerencia para una nueva colección?
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-200 mb-6">
            Nos encanta conocer las preferencias de nuestra comunidad. 
            Comparte tus ideas para futuras colecciones temáticas.
          </p>
          <a
            href="https://www.youtube.com/@HoracioLanci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-secondary transition-colors duration-200"
          >
            <span>Contáctanos en YouTube</span>
            <BookOpen className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Colecciones;
