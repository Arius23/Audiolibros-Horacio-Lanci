import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Clock, Eye, BookOpen, ArrowRight } from 'lucide-react';
import { useAudiolibros } from '../hooks/useAudiolibros';
import { YoutubeService } from '../services/youtubeService';
import { YoutubeStatistics } from '../lib/supabase';

const HeroSection = () => {
  const { datos, cargando, obtenerTodosLosAudiolibros, extraerIdYoutube } = useAudiolibros();
  const [estadisticaActual, setEstadisticaActual] = useState(0);
  const [estadisticasYoutube, setEstadisticasYoutube] = useState<YoutubeStatistics | null>(null);

  // Cargar estadísticas de YouTube
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const stats = await YoutubeService.getStatistics();
        setEstadisticasYoutube(stats);
      } catch (error) {
        console.error('Error cargando estadísticas de YouTube:', error);
      }
    };
    cargarEstadisticas();
  }, []);

  // Obtener el video más visto con URL
  const obtenerVideoMasVisto = () => {
    const todosLosAudiolibros = obtenerTodosLosAudiolibros();
    if (todosLosAudiolibros.length === 0) return null;
    
    return todosLosAudiolibros.sort((a, b) => b.vistas - a.vistas)[0];
  };

  // Formatear números para mostrar
  const formatearNumero = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  // Generar estadísticas dinámicas basadas en datos de YouTube
  const obtenerEstadisticasDinamicas = () => {
    if (!estadisticasYoutube) {
      // Datos de respaldo mientras cargan los reales
      return [
        { icono: BookOpen, valor: '48', descripcion: 'Audiolibros Disponibles' },
        { icono: Clock, valor: '240+', descripcion: 'Horas de Contenido' },
        { icono: Eye, valor: '1.1M+', descripcion: 'Reproducciones Totales' },
        { icono: Users, valor: '25+', descripcion: 'Autores Diferentes' }
      ];
    }

    const horasContenido = Math.round(estadisticasYoutube.total_duration_seconds / 3600);
    const autoresDiferentes = obtenerTodosLosAudiolibros().reduce((acc, libro) => {
      if (libro.autor && !acc.includes(libro.autor)) {
        acc.push(libro.autor);
      }
      return acc;
    }, [] as string[]).length;

    return [
      { icono: BookOpen, valor: `${estadisticasYoutube.total_videos}`, descripcion: 'Audiolibros Disponibles' },
      { icono: Clock, valor: `${horasContenido}+`, descripcion: 'Horas de Contenido' },
      { icono: Eye, valor: formatearNumero(estadisticasYoutube.total_views), descripcion: 'Reproducciones Totales' },
      { icono: Users, valor: `${autoresDiferentes}+`, descripcion: 'Autores Diferentes' }
    ];
  };

  const estadisticas = obtenerEstadisticasDinamicas();

  // Rotar estadísticas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setEstadisticaActual((prev) => (prev + 1) % estadisticas.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [estadisticas.length]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#D7AA4E] border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando biblioteca de audiolibros...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-background">
      {/* Fondo con imagen - overlay ligero como en Sobre Audiolibros */}
      <div className="absolute inset-0 z-0">
        <img
          src="images/background home books.jpg"
          alt="Fondo vintage library"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-gray-800/40 to-gray-900/50"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contenido de texto */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-[#D7AA4E] to-[#B8934A] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                ✨ Completamente Gratuito ✨
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Audiolibros de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7AA4E] via-[#C9A450] to-purple-400">
                  Dominio Público
                </span>
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed mb-8">
                <strong className="text-[#D7AA4E]">narrados por Horacio Lanci</strong>
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Disfruta de las obras maestras de la literatura universal, narradas con pasión y dedicación en cada detalle y personaje.
                Literatura clásica, ciencia ficción, misterio y mucho más, completamente gratis.
              </p>
            </div>

            {/* Estadísticas animadas */}
            <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 mb-8 border border-[#D7AA4E]/20 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {estadisticas.map((stat, index) => {
                  const IconComponent = stat.icono;
                  const isActive = index === estadisticaActual;
                  
                  return (
                    <div
                      key={index}
                      className={`text-center transition-all duration-500 ${
                        isActive ? 'scale-110 text-[#D7AA4E]' : 'text-gray-100'
                      }`}
                    >
                      <IconComponent className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'animate-pulse' : ''}`} />
                      <div className={`text-2xl font-bold ${isActive ? 'text-[#D7AA4E]' : 'text-white'}`}>
                        {stat.valor}
                      </div>
                      <div className="text-sm text-gray-300">{stat.descripcion}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/biblioteca/todos"
                className="bg-gradient-to-r from-[#D7AA4E] via-[#C9A450] to-[#D7AA4E] text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-[#E1B555] hover:to-[#C9A450] transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explorar Audioteca</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              {datos?.estadisticas_generales.resumen_general.video_mas_visto && (
                <Link
                  to="/biblioteca/todos"
                  className="border-2 border-purple-400/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-500/20 hover:border-purple-300/70 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  <span>Más Popular</span>
                </Link>
              )}
            </div>


          </div>

          {/* Imagen de Horacio Lanci */}
          <div className="flex justify-center lg:justify-end w-full lg:mt-0">
            <img
              src="images/horacio-home.png"
              alt="Maestro Horacio Lanci - Narrador profesional de audiolibros"
              className="w-full h-auto max-w-md lg:max-w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D7AA4E]/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D7AA4E]/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
