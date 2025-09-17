// Hook de compatibilidad que ahora usa la nueva organización de géneros
import { useCallback, useMemo } from 'react';
import { Audiolibro, FiltrosBusqueda, DatosCompletos } from '../types/audiobook';
import { useAudiolibrosYoutube } from './useAudiolibrosYoutube';
import { useAudiolibrosOrganizados, GeneroOrganizado } from './useAudiolibrosOrganizados';

export const useAudiolibros = () => {
  const {
    obtenerTodosLosAudiolibros: obtenerTodosLosAudiolibrosSinOrganizar,
    obtenerAudiolibrosDestacados: obtenerAudiolibrosDestacadosYT,
    obtenerAutoresPopulares: obtenerAutoresPopularesYT,
    obtenerAudiolibrosPorDuracion: obtenerAudiolibrosPorDuracionYT,
    buscarAudiolibros,
    formatearDuracion,
    extraerIdYoutube,
    obtenerThumbnailYoutube,
    obtenerImagenAutorDesdeCanal,
    cargando: cargandoYoutube,
    error: errorYoutube,
    ultimaActualizacion,
    videos
  } = useAudiolibrosYoutube();
  
  const {
    obtenerGenerosReorganizados,
    obtenerEstadisticasGeneros,
    obtenerAudiolibrosPorGenero,
    formatearNombreGenero,
    obtenerDescripcionGenero,
    obtenerImagenGeneroDesdeCanal,
    cargando: cargandoOrganizados,
    error: errorOrganizados
  } = useAudiolibrosOrganizados();
  
  const cargando = cargandoYoutube || cargandoOrganizados;
  const error = errorYoutube || errorOrganizados;
  
  // Funciones envueltas para mantener compatibilidad
  const obtenerTodosLosAudiolibros = useCallback(() => {
    return obtenerTodosLosAudiolibrosSinOrganizar;
  }, [obtenerTodosLosAudiolibrosSinOrganizar]);
  
  const obtenerAudiolibrosDestacados = useCallback(() => {
    return obtenerAudiolibrosDestacadosYT;
  }, [obtenerAudiolibrosDestacadosYT]);
  
  const obtenerAutoresPopulares = useCallback(() => {
    return obtenerAutoresPopularesYT;
  }, [obtenerAutoresPopularesYT]);
  
  const obtenerAudiolibrosPorDuracion = useCallback(() => {
    return obtenerAudiolibrosPorDuracionYT;
  }, [obtenerAudiolibrosPorDuracionYT]);
  
  // Función para obtener géneros usando la nueva organización
  const obtenerGeneros = useCallback((): GeneroOrganizado[] => {
    return obtenerGenerosReorganizados;
  }, [obtenerGenerosReorganizados]);
  
  // Crear datos compatibles con la estructura anterior
  const datos = useMemo((): DatosCompletos | null => {
    if (cargando) return null;
    
    try {
      const audiolibros = obtenerTodosLosAudiolibrosSinOrganizar;
      const estadisticasGeneros = obtenerEstadisticasGeneros;
      const audiolibrosPorGenero = obtenerAudiolibrosPorGenero;
      
      if (!audiolibros || audiolibros.length === 0) return null;
      
      // Calcular estadísticas generales
      const totalMinutos = audiolibros.reduce((acc, libro) => acc + libro.duracion_minutos, 0);
      const totalHoras = Math.round(totalMinutos / 60 * 10) / 10;
      
      // Organizar por autor
      const porAutor: Record<string, Audiolibro[]> = {};
      audiolibros.forEach(libro => {
        const autor = libro.autor || 'Autor Desconocido';
        if (!porAutor[autor]) {
          porAutor[autor] = [];
        }
        porAutor[autor].push(libro);
      });
      
      // Calcular estadísticas por autor
      const estadisticasPorAutor: Record<string, number> = {};
      Object.keys(porAutor).forEach(autor => {
        estadisticasPorAutor[autor] = porAutor[autor].length;
      });
      
      return {
        metadata: {
          fecha_analisis: ultimaActualizacion || new Date().toISOString(),
          total_videos_analizados: videos?.length || 0,
          fuente_datos: 'YouTube API via Supabase con reorganización de géneros'
        },
        estadisticas_generales: {
          resumen_general: {
            total_videos: videos?.length || 0,
            total_audiolibros: audiolibros.length,
            total_visualizaciones: audiolibros.reduce((acc, libro) => acc + libro.vistas, 0),
            duracion_total_horas: totalHoras,
            promedio_vistas_por_video: Math.round(audiolibros.reduce((acc, libro) => acc + libro.vistas, 0) / audiolibros.length),
            video_mas_visto: {
              titulo: audiolibros.reduce((prev, current) => 
                (prev.vistas > current.vistas) ? prev : current
              ).titulo,
              vistas: audiolibros.reduce((prev, current) => 
                (prev.vistas > current.vistas) ? prev : current
              ).vistas
            }
          },
          audiolibros: {
            por_autor: estadisticasPorAutor,
            por_genero: estadisticasGeneros,
            duracion_promedio_minutos: Math.round(totalMinutos / audiolibros.length),
            total_horas_contenido: totalHoras,
            obras_multivolumen: audiolibros.filter(libro => 
              libro.titulo.toLowerCase().includes('vol') || 
              libro.titulo.toLowerCase().includes('parte')
            ).length,
            autores_unicos: Object.keys(porAutor).length,
            audiolibro_mas_largo: {
              titulo: audiolibros.reduce((prev, current) => 
                (prev.duracion_minutos > current.duracion_minutos) ? prev : current
              ).titulo,
              duracion_horas: Math.round(
                audiolibros.reduce((prev, current) => 
                  (prev.duracion_minutos > current.duracion_minutos) ? prev : current
                ).duracion_minutos / 60 * 10
              ) / 10
            }
          }
        },
        catalogos_estructurados: {
          por_autor: porAutor,
          por_genero: audiolibrosPorGenero,
          por_duracion: {} // Se puede implementar si es necesario
        }
      };
    } catch (error) {
      console.error('Error creando datos compatibles:', error);
      return null;
    }
  }, [obtenerTodosLosAudiolibrosSinOrganizar, obtenerEstadisticasGeneros, obtenerAudiolibrosPorGenero, ultimaActualizacion, videos, cargando]);
  
  return {
    datos,
    cargando,
    error,
    ultimaActualizacion,
    videos,
    obtenerTodosLosAudiolibros,
    obtenerAudiolibrosDestacados,
    obtenerAutoresPopulares,
    obtenerGeneros,
    obtenerAudiolibrosPorDuracion,
    buscarAudiolibros,
    formatearDuracion,
    extraerIdYoutube,
    obtenerThumbnailYoutube,
    obtenerImagenGeneroDesdeCanal,
    obtenerImagenAutorDesdeCanal,
    formatearNombreGenero,
    obtenerDescripcionGenero
  };
};

export default useAudiolibros;