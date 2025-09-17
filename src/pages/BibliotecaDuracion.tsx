import { Clock, TrendingUp } from 'lucide-react';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';

const BibliotecaDuracion = () => {
  const { datos, cargando, obtenerAudiolibrosPorDuracion } = useAudiolibros();

  if (cargando) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#f8d65c] border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Cargando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Error al cargar los datos</p>
      </div>
    );
  }

  const audiolibrosPorDuracion = obtenerAudiolibrosPorDuracion();
  
  const categorias = [
    audiolibrosPorDuracion.cortos,
    audiolibrosPorDuracion.medios,
    audiolibrosPorDuracion.largos
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explorar por Duración
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el audiolibro perfecto según el tiempo que tengas disponible. 
            Desde lecturas rápidas hasta experiencias literarias completas.
          </p>
        </div>

        {/* Estadísticas generales */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-[#f8d65c]" />
            Estadísticas de Duración
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-700/30 rounded-lg">
              <div className="text-3xl font-bold text-emerald-300 mb-2">
                {audiolibrosPorDuracion.cortos.audiolibros.length}
              </div>
              <div className="text-emerald-400 font-medium mb-1">Audiolibros Cortos</div>
              <div className="text-sm text-emerald-500">30min - 2h</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-[#f8d65c]/20 to-[#d5b136]/20 border border-[#f8d65c]/30 rounded-lg">
              <div className="text-3xl font-bold text-[#f8d65c] mb-2">
                {audiolibrosPorDuracion.medios.audiolibros.length}
              </div>
              <div className="text-[#f8d65c] font-medium mb-1">Audiolibros Medios</div>
              <div className="text-sm text-[#d5b136]">2h - 5h</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-violet-900/30 to-violet-800/30 border border-violet-700/30 rounded-lg">
              <div className="text-3xl font-bold text-violet-200 mb-2">
                {audiolibrosPorDuracion.largos.audiolibros.length}
              </div>
              <div className="text-violet-200 font-medium mb-1">Audiolibros Largos</div>
              <div className="text-sm text-violet-300">5h+</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center text-muted-foreground">
              <Clock className="w-5 h-5 mr-2 text-[#f8d65c]" />
              <span>Duración promedio: {Math.round(datos.estadisticas_generales.audiolibros.duracion_promedio_minutos / 60 * 10) / 10} horas</span>
            </div>
          </div>
        </div>

        {/* Categorías por duración */}
        <div className="space-y-16">
          {categorias.map((categoria, index) => {
            if (categoria.audiolibros.length === 0) return null;
            
            return (
              <div key={index}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center mb-4">
                    <span className="text-4xl mr-3">{categoria.icono}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {categoria.titulo}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">
                    {categoria.descripcion}
                  </p>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${
                    categoria.color === 'green' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-700/30' :
                    categoria.color === 'blue' ? 'bg-[#f8d65c]/20 text-[#f8d65c] border-[#f8d65c]/30' :
                    'bg-violet-900/30 text-violet-200 border-violet-700/30'
                  }`}>
                    {categoria.duracion} • {categoria.audiolibros.length} audiolibro{categoria.audiolibros.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoria.audiolibros
                    .sort((a, b) => b.vistas - a.vistas)
                    .slice(0, 8)
                    .map((audiolibro, audioIndex) => (
                      <AudiolibroCard
                        key={`${audiolibro.titulo}-${audioIndex}`}
                        audiolibro={audiolibro}
                        mostrarAutor={true}
                        tamano="mediano"
                      />
                    ))}
                </div>

                {categoria.audiolibros.length > 8 && (
                  <div className="text-center mt-6">
                    <button className="text-[#f8d65c] hover:text-[#d5b136] font-medium transition-colors duration-200">
                      Ver todos los {categoria.audiolibros.length} audiolibros →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Recomendaciones */}
        <div className="mt-16 bg-gradient-to-r from-[#f8d65c] to-[#d5b136] rounded-2xl text-gray-900 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            💡 Recomendaciones de Escucha
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🚶‍♂️</div>
              <h3 className="font-bold mb-2">Para Caminar</h3>
              <p className="text-gray-800 text-sm">
                Audiolibros cortos (30min-2h) son perfectos para paseos y ejercicio ligero.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold mb-2">En Casa</h3>
              <p className="text-gray-800 text-sm">
                Audiolibros medios (2h-5h) ideales para tardes relajadas o tareas domésticas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">✈️</div>
              <h3 className="font-bold mb-2">Viajes Largos</h3>
              <p className="text-gray-800 text-sm">
                Audiolibros largos (5h+) perfectos para viajes largos y experiencias inmersivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaDuracion;
