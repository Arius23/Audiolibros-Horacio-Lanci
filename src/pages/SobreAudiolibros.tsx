import { useState, useEffect } from 'react';
import { BookOpen, Users, Gavel, Heart, Clock, Award, Lightbulb, Globe } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const SobreAudiolibros = () => {
  const [contenidoEducativo, setContenidoEducativo] = useState<string>('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        const response = await fetch('/data/contenido_educativo_audiolibros.md');
        const texto = await response.text();
        setContenidoEducativo(texto);
      } catch (error) {
        console.error('Error al cargar contenido educativo:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarContenido();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Cargando información educativa...</p>
        </div>
      </div>
    );
  }

  const secciones = [
    {
      titulo: '¿Qué son los Audiolibros de Dominio Público?',
      icono: BookOpen,
      descripcion: 'Comprende qué significa "dominio público" y por qué estas obras son libres para todos.',
      imagen: '/images/audiolibros_dominio_publico.png',
      seccionId: 'definicion-conceptos',
      colorIcono: '#D7AA4E'
    },
    {
      titulo: 'Marco Legal Internacional',
      icono: Gavel,
      descripcion: 'Conoce las leyes internacionales que protegen y liberan las obras literarias.',
      imagen: '/images/marco_legal_internacional.png',
      seccionId: 'marco-legal',
      colorIcono: '#D7AA4E'
    },
    {
      titulo: 'Historia y Evolución',
      icono: Clock,
      descripcion: 'Descubre cómo han evolucionado los audiolibros desde sus inicios hasta hoy.',
      imagen: '/images/historia_evolucion.png',
      seccionId: 'historia-evolucion',
      colorIcono: '#D7AA4E'
    },
    {
      titulo: 'Beneficios de Escuchar Literatura',
      icono: Heart,
      descripcion: 'Explora los beneficios cognitivos, emocionales y educativos de los audiolibros.',
      imagen: '/images/beneficios_escuchar.png',
      seccionId: 'beneficios-literatura',
      colorIcono: '#D7AA4E'
    },
    {
      titulo: 'El Proceso de Selección',
      icono: Award,
      descripcion: 'Conoce cómo Horacio Lanci selecciona y prepara cada obra para su narración.',
      imagen: '/images/proceso_seleccion.png',
      seccionId: 'proceso-seleccion',
      colorIcono: '#D7AA4E'
    },
    {
      titulo: 'Guía por Géneros Literarios',
      icono: Lightbulb,
      descripcion: 'Aprende sobre los diferentes géneros literarios disponibles en nuestra biblioteca.',
      imagen: '/images/guia_generos.png',
      seccionId: 'guia-generos',
      colorIcono: '#D7AA4E'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura del menú fijo
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="¿Qué son los Audiolibros de Dominio Público? | Guía Completa"
        description="Descubre todo sobre los audiolibros de dominio público: qué son, marco legal, historia, beneficios y proceso de creación. Guía educativa completa por Horacio Lanci."
        keywords="audiolibros dominio público, qué es dominio público, audiolibros gratis legales, marco legal audiolibros, historia audiolibros, beneficios escuchar literatura, Horacio Lanci educativo"
        image="/images/og-educativo.jpg"
        url="/sobre-audiolibros"
        type="article"
        author="Horacio Lanci"
      />
      
      {/* Hero Section con fondo */}
      <section className="relative bg-gradient-to-br from-yellow-800 via-amber-900 to-yellow-900 text-white py-20">
        {/* Fondo con imagen */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background home books.jpg"
            alt="Fondo vintage library"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-800/80 via-amber-900/75 to-yellow-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Todo Sobre los Audiolibros de Dominio Público
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Una guía completa para entender y apreciar la literatura clásica en formato de audio
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
              📚 Educativo
            </span>
            <span className="bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full">
              🌍 Acceso Universal
            </span>
            <span className="bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full">
              💫 Cultura Libre
            </span>
          </div>
        </div>
      </section>

      {/* Navegación de secciones */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Explora Nuestras Secciones Educativas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secciones.map((seccion, index) => {
              const IconComponent = seccion.icono;
              
              return (
                <div
                  key={index}
                  onClick={() => scrollToSection(seccion.seccionId)}
                  className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border border-border cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={seccion.imagen}
                      alt={seccion.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <IconComponent className="w-8 h-8 mb-2" style={{color: seccion.colorIcono}} />
                      <h3 className="font-bold text-lg">{seccion.titulo}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {seccion.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Definición y conceptos básicos */}
          <div id="definicion-conceptos" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 relative h-64 md:h-auto">
                <img
                  src="/images/audiolibros_dominio_publico.png"
                  alt="Audiolibros de Dominio Público"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>
              
              <div className="md:order-2 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 text-primary" />
                  ¿Qué son los Audiolibros de Dominio Público?
                </h2>
                
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p className="mb-6">
                    Los audiolibros de dominio público representan un tesoro cultural invaluable en la era digital. 
                    Cuando hablamos de <strong>"dominio público"</strong> nos referimos a aquellas obras literarias 
                    cuyos derechos de autor han expirado, permitiendo que cualquier persona pueda utilizarlas, 
                    reproducirlas, adaptarlas o distribuirlas libremente sin necesidad de solicitar permiso o 
                    realizar pagos por derechos de autor.
                  </p>
                  
                  <p className="mb-6">
                    En el contexto de los audiolibros, esto significa que las grabaciones de obras clásicas como 
                    las de Julio Verne, Arthur Conan Doyle o Edgar Allan Poe pueden ser narradas, compartidas y 
                    disfrutadas por todos, contribuyendo así a la democratización del conocimiento y la cultura.
                  </p>
                  
                  <div className="bg-primary/10 border-l-4 border-primary p-6 my-6">
                    <blockquote className="text-lg italic" style={{color: '#D7AA4E'}}>
                      "El dominio público no es simplemente la ausencia de derechos de autor; es la presencia 
                      de libertad cultural y la garantía de acceso universal al conocimiento."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marco legal */}
          <div id="marco-legal" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Gavel className="w-8 h-8 mr-3 text-secondary" />
                  Marco Legal Internacional
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Legislación por Países</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Convenio de Berna:</strong> 50 años tras la muerte del autor (mínimo)</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" />
                        <span><strong>Unión Europea:</strong> 70 años post-mortem</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>México:</strong> 100 años post-mortem</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>Argentina y España:</strong> 70 años post-mortem</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Nuestro Compromiso</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Aproximadamente el <strong>90% de nuestros audiolibros</strong> corresponden a obras 
                      confirmadas en dominio público a nivel global, lo que garantiza su libre difusión y 
                      uso educativo sin restricciones legales.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:order-2 relative h-64 md:h-auto">
                <img
                  src="/images/marco_legal_internacional.png"
                  alt="Marco Legal Internacional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>

          {/* Beneficios */}
          <div id="beneficios-literatura" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 relative h-64 md:h-auto">
                <img
                  src="/images/beneficios_escuchar.png"
                  alt="Beneficios de Escuchar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>
              
              <div className="md:order-2 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Heart className="w-8 h-8 mr-3 text-accent" />
                  Beneficios de Escuchar Literatura
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Cognitivos</h3>
                      <p className="text-muted-foreground text-sm">
                        Mejora la concentración, memoria y comprensión auditiva. Estimula la imaginación y creatividad.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Sociales</h3>
                      <p className="text-muted-foreground text-sm">
                        Acceso universal sin barreras. Ideal para personas con dificultades de lectura tradicional.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Prácticos</h3>
                      <p className="text-muted-foreground text-sm">
                        Multitarea posible. Perfecto para viajes, ejercicio o relajación. Aprovecha tiempos muertos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* El proceso de Horacio */}
          <div id="proceso-seleccion" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Award className="w-8 h-8 mr-3 text-primary" />
                  El Proceso de Selección y Grabación
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Selección Cuidadosa</h3>
                      <p className="text-muted-foreground">
                        Cada obra es elegida por su valor literario, relevancia cultural y potencial de 
                        impacto en el oyente. Se priorizan obras confirmadas en dominio público.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Preparación Profunda</h3>
                      <p className="text-muted-foreground">
                        Estudio exhaustivo del texto, investigación del contexto histórico y cultural, 
                        y preparación vocal específica para cada personaje y situación narrativa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Narración Profesional</h3>
                      <p className="text-muted-foreground">
                        Grabación en estudio con equipo profesional, utilizando técnicas teatrales 
                        para dar vida a los personajes y transmitir la emoción original de la obra.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Distribución Libre</h3>
                      <p className="text-muted-foreground">
                        Publicación gratuita en plataformas digitales para garantizar el acceso 
                        universal a la literatura clásica, cumpliendo con la misión de democratización cultural.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:order-2 relative h-48 md:h-48">
                <img
                  src="/images/proceso_seleccion.png"
                  alt="Proceso de Selección"
                  className="w-full h-full object-cover object-bottom"
                  style={{objectPosition: '50% 85%'}}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>

          {/* Historia y Evolución - Expandido */}
          <div id="historia-evolucion" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 relative h-64 md:h-auto">
                <img
                  src="/images/historia_evolucion.png"
                  alt="Historia y Evolución"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>
              
              <div className="md:order-2 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Clock className="w-8 h-8 mr-3" style={{color: '#D7AA4E'}} />
                  Historia y Evolución de los Audiolibros
                </h2>
                
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Orígenes de los Audiolibros</h3>
                  <p className="mb-6">
                    La historia de los audiolibros tiene raíces más profundas de lo que muchos imaginan:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>1877:</strong> Thomas Edison inventa el fonógrafo y visualiza "libros fonográficos" para personas ciegas</li>
                    <li><strong>1932:</strong> La American Foundation for the Blind establece el primer estudio de grabación dedicado a "libros hablados"</li>
                    <li><strong>1952:</strong> Caedmon Records publica el primer audiolibro comercial: "A Child's Christmas in Wales" narrado por Dylan Thomas</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">Impacto en la Accesibilidad Cultural</h3>
                  <p className="mb-4">
                    Los audiolibros han transformado el acceso a la literatura para personas con discapacidad visual, dislexia, adultos mayores 
                    y comunidades lingüísticas minoritarias, eliminando barreras físicas, cognitivas y económicas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guía por Géneros - Expandido */}
          <div id="guia-generos" className="bg-card rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="md:order-1 p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <Lightbulb className="w-8 h-8 mr-3" style={{color: '#7f40b7'}} />
                  Guía por Géneros Literarios
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p className="mb-6">
                    Nuestra biblioteca abarca múltiples géneros literarios, cada uno ofreciendo experiencias únicas 
                    que enriquecen la comprensión cultural y literaria del oyente:
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-bold text-foreground mb-2" style={{color: '#D7AA4E'}}>Misterio y Detective</h4>
                      <p className="text-sm">
                        Desde los casos de Sherlock Holmes hasta Agatha Christie. Género que desarrolla 
                        el pensamiento lógico y la atención a los detalles.
                      </p>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-bold text-foreground mb-2" style={{color: '#7f40b7'}}>Ciencia Ficción</h4>
                      <p className="text-sm">
                        Verne, Wells y Asimov nos transportan a mundos futuros. Estimula la imaginación 
                        y reflexión sobre el progreso tecnológico y social.
                      </p>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-bold text-foreground mb-2" style={{color: '#D7AA4E'}}>Literatura Clásica</h4>
                      <p className="text-sm">
                        Obras maestras que han resistido el paso del tiempo, desde Cervantes hasta Tolstoy. 
                        Perfectas para comprender los fundamentos de la literatura occidental.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">Cómo Elegir el Género Adecuado</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Para principiantes:</strong> Comienza con aventuras clásicas como Julio Verne</li>
                    <li><strong>Para desarrollar concentración:</strong> Misterios de Arthur Conan Doyle</li>
                    <li><strong>Para reflexión profunda:</strong> Distopías como "1984" de George Orwell</li>
                    <li><strong>Para relajación:</strong> Poesía y literatura espiritual</li>
                  </ul>
                </div>
              </div>
              
              <div className="md:order-2 relative h-64 md:h-auto">
                <img
                  src="/images/guia_generos.png"
                  alt="Guía de Géneros"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Únete a la Revolución de la Cultura Libre
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Descubre cómo los audiolibros de dominio público están democratizando 
            el acceso a la literatura clásica para todos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/biblioteca/todos"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-6 h-6" />
              <span>Explorar Biblioteca</span>
            </a>
            
            <a
              href="/sobre-horacio"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-card/10 hover:border-white/50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-6 h-6" />
              <span>Conocer a Horacio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreAudiolibros;