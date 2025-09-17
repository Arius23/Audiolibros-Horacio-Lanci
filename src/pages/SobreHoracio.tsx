import { Users, Mic, BookOpen, Heart, Youtube, Clock, Award, Star } from 'lucide-react';
import { useAudiolibros } from '../hooks/useAudiolibros';

const SobreHoracio = () => {
  const { datos, cargando } = useAudiolibros();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sobre-horacio-header">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/horacio-sobre.jpg"
              alt="Maestro Horacio Lanci"
              className="w-96 h-96 rounded-full mx-auto mb-6 border-4 border-primary shadow-xl object-cover"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Maestro Horacio Lanci
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Narrador Profesional • Especialista en Bibliotecas Parlantes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                📚 45+ Audiolibros Narrados
              </span>
              <span className="bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎭 Experiencia Teatral
              </span>
              <span className="bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎯 Dominio Público Especialista
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Información Principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Una Pasión por la Literatura con imagen */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 relative h-64 md:h-auto">
                <img
                  src="/images/pasion_literatura_horacio.png"
                  alt="Una Pasión por la Literatura"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>
              
              <div className="md:order-2 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Users className="w-8 h-8 mr-3 text-blue-600" />
                  Una Pasión por la Literatura
                </h2>
                
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p className="mb-6">
                    El <strong>Maestro Horacio Lanci</strong> es un narrador profesional argentino con una 
                    profunda vocación por democratizar el acceso a la literatura clásica. Su trabajo en 
                    bibliotecas parlantes lo ha convertido en una voz reconocida y respetada en el mundo 
                    de los audiolibros en español.
                  </p>
                  
                  <p className="mb-6">
                    Con una formación sólida en técnicas de narración y una sensibilidad especial para 
                    la literatura de dominio público, Horacio ha dedicado años a seleccionar cuidadosamente 
                    las obras más significativas de la literatura universal para compartirlas con audiencias 
                    de habla hispana.
                  </p>
                  
                  <p className="mb-6">
                    Su filosofía es simple pero poderosa: <em>"La literatura clásica debe estar disponible 
                    para todos, en un formato accesible y de calidad profesional"</em>. Esta convicción 
                    lo ha llevado a crear una biblioteca de audiolibros que abarca desde los misterios 
                    de Arthur Conan Doyle hasta las aventuras extraordinarias de Julio Verne.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiencia y Formación con imagen */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Mic className="w-6 h-6 mr-2 text-blue-600" />
                  Experiencia Profesional y Especialidades
                </h2>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Experiencia Profesional</h3>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                      <li className="flex items-start">
                        <Award className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Especialista en Bibliotecas Parlantes</span>
                      </li>
                      <li className="flex items-start">
                        <BookOpen className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Narrator certificado en técnicas de lectura dramatizada</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Experiencia en radio y medios audiovisuales</span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Voluntario en programas de alfabetización</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Especialidades</h3>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary/100 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Literatura clásica universal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Novelas de misterio y suspense</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Ciencia ficción clásica</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:order-2 relative h-64 md:h-auto">
                <img
                  src="/images/experiencia_profesional_horacio.png"
                  alt="Experiencia Profesional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>

          {/* Estadísticas del Canal */}
          {datos && (
            <div className="bg-gradient-to-r from-[#7f40b7] to-[#652996] rounded-2xl text-white p-8 mb-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                <Heart className="w-8 h-8 mr-3 text-yellow-300" />
                Impacto en la Comunidad
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">{datos.estadisticas_generales.resumen_general.total_audiolibros}</div>
                  <div className="text-purple-100">Audiolibros</div>
                </div>
                <div>
                  <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">{Math.round(datos.estadisticas_generales.resumen_general.duracion_total_horas)}</div>
                  <div className="text-purple-100">Horas de Contenido</div>
                </div>
                <div>
                  <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">{(datos.estadisticas_generales.resumen_general.total_visualizaciones / 1000000).toFixed(1)}M</div>
                  <div className="text-purple-100">Reproducciones</div>
                </div>
                <div>
                  <Heart className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">{datos.estadisticas_generales.audiolibros.autores_unicos}</div>
                  <div className="text-purple-100">Autores Narrados</div>
                </div>
              </div>
            </div>
          )}

          {/* Filosofía y Misión con imagen */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 relative h-64 md:h-auto">
                <img
                  src="/images/filosofia_mision_horacio.png"
                  alt="Filosofía y Misión"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>
              
              <div className="md:order-2 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Heart className="w-8 h-8 mr-3 text-red-500" />
                  Filosofía y Misión
                </h2>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Nuestra Misión</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Democratizar el acceso a la literatura clásica mediante narraciones profesionales 
                      de alta calidad, preservando la riqueza cultural de las obras de dominio público 
                      para las generaciones actuales y futuras.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4">💡 Nuestra Visión</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Ser la principal referencia en audiolibros de dominio público en español, 
                      creando un puente entre la literatura clásica y las nuevas generaciones de oyentes.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-primary/10 rounded-xl border-l-4 border-primary">
                    <blockquote className="text-lg italic text-[#D7AA4E]">
                      "Cada audiolibro es una invitación a redescubrir los tesoros de la literatura. 
                      Mi objetivo es que cada palabra cobre vida y que cada historia encuentre su camino 
                      al corazón del oyente."
                    </blockquote>
                    <cite className="block mt-4 text-right text-muted-foreground font-semibold">
                      — Maestro Horacio Lanci
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proceso de Trabajo con imagen */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  El Proceso Creativo
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">1. Selección Cuidadosa</h3>
                      <p className="text-muted-foreground text-sm">
                        Cada obra es elegida por su valor literario, relevancia cultural y potencial de impacto en el oyente.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mic className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">2. Preparación Técnica</h3>
                      <p className="text-muted-foreground text-sm">
                        Estudio profundo del texto, investigación histórica y preparación vocal para cada personaje y situación.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">3. Narración Apasionada</h3>
                      <p className="text-muted-foreground text-sm">
                        Cada grabación se realiza con dedicación total, transmitiendo la emoción y el espíritu de la obra original.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:order-2 relative h-64 md:h-auto">
                <img
                  src="/images/proceso_creativo_horacio.png"
                  alt="El Proceso Creativo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Únete a Nuestra Comunidad Literaria
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Descubre el placer de escuchar los grandes clásicos de la literatura universal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@HoracioLanci"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Youtube className="w-6 h-6" />
              <span>Suscribirse al Canal</span>
            </a>
            
            <a
              href="/biblioteca/todos"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-card/10 hover:border-white/50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-6 h-6" />
              <span>Explorar Biblioteca</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreHoracio;
