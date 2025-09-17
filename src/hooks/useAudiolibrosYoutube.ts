import { useState, useEffect, useMemo, useCallback } from 'react'
import { Audiolibro, FiltrosBusqueda, DatosCompletos } from '../types/audiobook'
import YoutubeService from '../services/youtubeService'
import { YoutubeVideo } from '../lib/supabase'

export const useAudiolibrosYoutube = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true)
        
        // Cargar videos de YouTube desde Supabase
        const videosData = await YoutubeService.getVideos()
        setVideos(videosData)
        
        // Cargar estadísticas para obtener última actualización
        const stats = await YoutubeService.getStatistics()
        if (stats) {
          setUltimaActualizacion(stats.last_sync_at)
        }
        
      } catch (err) {
        console.error('Error cargando datos de YouTube:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  // Convertir videos de YouTube a audiolibros (memoizado para optimizar rendimiento)
  const obtenerTodosLosAudiolibros = useMemo((): Audiolibro[] => {
    if (!videos || videos.length === 0) return []
    try {
      return videos.map(video => YoutubeService.youtubeToAudiolibro(video))
    } catch (error) {
      console.error('Error convirtiendo videos a audiolibros:', error)
      return []
    }
  }, [videos])

  // Obtener audiolibros destacados (más vistos) - memoizado
  const obtenerAudiolibrosDestacados = useMemo((): Audiolibro[] => {
    try {
      return obtenerTodosLosAudiolibros
        .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
        .slice(0, 6)
    } catch (error) {
      console.error('Error obteniendo audiolibros destacados:', error)
      return []
    }
  }, [obtenerTodosLosAudiolibros])

  // Obtener autores populares - memoizado
  const obtenerAutoresPopulares = useMemo(() => {
    try {
      const audiolibros = obtenerTodosLosAudiolibros
      if (!audiolibros || audiolibros.length === 0) return []
      
      const autoresCuenta: Record<string, number> = {}
      const autoresAudiolibros: Record<string, Audiolibro[]> = {}
      
      audiolibros.forEach(libro => {
        const autor = libro.autor || 'Autor Desconocido'
        autoresCuenta[autor] = (autoresCuenta[autor] || 0) + 1
        
        if (!autoresAudiolibros[autor]) {
          autoresAudiolibros[autor] = []
        }
        autoresAudiolibros[autor].push(libro)
      })
      
      return Object.entries(autoresCuenta)
        .sort(([, a], [, b]) => (b || 0) - (a || 0))
        .slice(0, 5)
        .map(([nombre, cantidad]) => ({
          nombre,
          cantidad: cantidad || 0,
          audiolibros: autoresAudiolibros[nombre] || []
        }))
    } catch (error) {
      console.error('Error obteniendo autores populares:', error)
      return []
    }
  }, [obtenerTodosLosAudiolibros])

  // Obtener géneros - memoizado
  const obtenerGeneros = useMemo(() => {
    const audiolibros = obtenerTodosLosAudiolibros
    if (!audiolibros || audiolibros.length === 0) return []
    
    const generosCuenta: Record<string, number> = {}
    const generosAudiolibros: Record<string, Audiolibro[]> = {}
    
    audiolibros.forEach(libro => {
      const genero = libro.genero
      generosCuenta[genero] = (generosCuenta[genero] || 0) + 1
      
      if (!generosAudiolibros[genero]) {
        generosAudiolibros[genero] = []
      }
      generosAudiolibros[genero].push(libro)
    })
    
    const generosInfo = {
      'misterio_detective': {
        nombre: 'Misterio y Detective',
        descripcion: 'Historias de suspense, crímenes e investigación',
        icono: '🔍'
      },
      'ciencia_ficcion': {
        nombre: 'Ciencia Ficción',
        descripcion: 'Aventuras futuristas y mundos imaginarios',
        icono: '🚀'
      },
      'literatura_clasica': {
        nombre: 'Literatura Clásica',
        descripcion: 'Obras maestras de la literatura universal',
        icono: '📚'
      },
      'poesia_espiritualidad': {
        nombre: 'Poesía y Espiritualidad',
        descripcion: 'Reflexiones profundas y belleza literaria',
        icono: '✨'
      },
      'literatura_terror': {
        nombre: 'Literatura de Terror',
        descripcion: 'Cuentos escalofriantes y atmósferas inquietantes',
        icono: '🌙'
      },
      'distopia': {
        nombre: 'Distopía',
        descripcion: 'Visiones críticas del futuro y la sociedad',
        icono: '⚡'
      },
      'historia_biografia': {
        nombre: 'Historia y Biografía',
        descripcion: 'Relatos históricos y vidas extraordinarias',
        icono: '📜'
      },
      'literatura_argentina': {
        nombre: 'Literatura Argentina',
        descripcion: 'Grandes autores del Río de la Plata',
        icono: '🇦🇷'
      },
      'aventura': {
        nombre: 'Aventuras',
        descripcion: 'Expediciones épicas y viajes extraordinarios',
        icono: '⛵'
      },
      'literatura_general': {
        nombre: 'Literatura General',
        descripcion: 'Diversas obras de la literatura universal',
        icono: '📖'
      }
    }
    
    return Object.entries(generosCuenta)
      .sort(([, a], [, b]) => b - a)
      .map(([genero, cantidad]) => ({
        genero,
        cantidad,
        info: generosInfo[genero as keyof typeof generosInfo] || {
          nombre: genero.replace('_', ' '),
          descripcion: 'Contenido literario variado',
          icono: '📚'
        },
        audiolibros: generosAudiolibros[genero] || []
      }))
  }, [obtenerTodosLosAudiolibros])

  // Buscar audiolibros con filtros - optimizado con useCallback
  const buscarAudiolibros = useCallback((filtros: FiltrosBusqueda): Audiolibro[] => {
    let audiolibros = [...obtenerTodosLosAudiolibros]

    // Filtrar por texto
    if (filtros.texto) {
      const texto = filtros.texto.toLowerCase()
      audiolibros = audiolibros.filter(libro => 
        libro.titulo.toLowerCase().includes(texto) ||
        libro.autor?.toLowerCase().includes(texto)
      )
    }

    // Filtrar por autor
    if (filtros.autor.length > 0) {
      audiolibros = audiolibros.filter(libro => 
        filtros.autor.includes(libro.autor || '')
      )
    }

    // Filtrar por género
    if (filtros.genero.length > 0) {
      audiolibros = audiolibros.filter(libro => 
        filtros.genero.includes(libro.genero)
      )
    }

    // Filtrar por duración
    audiolibros = audiolibros.filter(libro => 
      libro.duracion_minutos >= filtros.duracionMin &&
      libro.duracion_minutos <= filtros.duracionMax
    )

    // Ordenar
    audiolibros.sort((a, b) => {
      let comparacion = 0
      
      switch (filtros.ordenarPor) {
        case 'titulo':
          comparacion = a.titulo.localeCompare(b.titulo)
          break
        case 'vistas':
          comparacion = (a.vistas || 0) - (b.vistas || 0)
          break
        case 'duracion':
          comparacion = a.duracion_minutos - b.duracion_minutos
          break
        case 'fecha':
          // Usar vistas como proxy de popularidad/fecha
          comparacion = (a.vistas || 0) - (b.vistas || 0)
          break
      }
      
      return filtros.ordenDireccion === 'desc' ? -comparacion : comparacion
    })

    return audiolibros
  }, [obtenerTodosLosAudiolibros])

  // Obtener audiolibros por duración - memoizado
  const obtenerAudiolibrosPorDuracion = useMemo(() => {
    const todosLosAudiolibros = obtenerTodosLosAudiolibros
    if (!todosLosAudiolibros || todosLosAudiolibros.length === 0) {
      return {
        cortos: { titulo: 'Audiolibros Cortos', descripcion: '', duracion: '30min - 2h', icono: '⚡', color: 'green', audiolibros: [] },
        medios: { titulo: 'Audiolibros Medios', descripcion: '', duracion: '2h - 5h', icono: '⏰', color: 'blue', audiolibros: [] },
        largos: { titulo: 'Audiolibros Largos', descripcion: '', duracion: '5h+', icono: '📚', color: 'purple', audiolibros: [] }
      }
    }
    
    const cortos = todosLosAudiolibros.filter(libro => libro.duracion_minutos >= 30 && libro.duracion_minutos < 120)
    const medios = todosLosAudiolibros.filter(libro => libro.duracion_minutos >= 120 && libro.duracion_minutos < 300)
    const largos = todosLosAudiolibros.filter(libro => libro.duracion_minutos >= 300)
    
    return {
      cortos: {
        titulo: 'Audiolibros Cortos',
        descripcion: 'Perfectos para viajes cortos o pausas de trabajo',
        duracion: '30min - 2h',
        icono: '⚡',
        color: 'green',
        audiolibros: cortos.sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
      },
      medios: {
        titulo: 'Audiolibros Medios',
        descripcion: 'Ideales para sesiones de escucha relajada',
        duracion: '2h - 5h',
        icono: '⏰',
        color: 'blue',
        audiolibros: medios.sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
      },
      largos: {
        titulo: 'Audiolibros Largos',
        descripcion: 'Experiencias inmersivas para verdaderos amantes de la literatura',
        duracion: '5h+',
        icono: '📚',
        color: 'purple',
        audiolibros: largos.sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
      }
    }
  }, [obtenerTodosLosAudiolibros])

  // Formatear duración
  const formatearDuracion = (minutos: number): string => {
    const horas = Math.floor(minutos / 60)
    const minutosRestantes = Math.round(minutos % 60)
    
    if (horas === 0) {
      return `${minutosRestantes}m`
    }
    
    return minutosRestantes > 0 ? `${horas}h ${minutosRestantes}m` : `${horas}h`
  }

  // Extraer ID de YouTube
  const extraerIdYoutube = (url: string): string => {
    if (!url || typeof url !== 'string') {
      console.warn('URL inválida o undefined:', url)
      return ''
    }
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      try {
        const match = url.match(pattern)
        if (match && match[1]) {
          return match[1]
        }
      } catch (error) {
        console.warn('Error procesando URL:', url, error)
      }
    }
    
    return ''
  }

  // Obtener thumbnail de YouTube
  const obtenerThumbnailYoutube = (url: string): string => {
    const videoId = extraerIdYoutube(url)
    if (!videoId) return '/images/classic-books.jpg'
    
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // Obtener imagen de autor desde canal - memoizado
  const obtenerImagenAutorDesdeCanal = useCallback((autor: string): string => {
    if (!obtenerTodosLosAudiolibros || obtenerTodosLosAudiolibros.length === 0) {
      return '/images/classic-books.jpg'
    }
    
    const audiolibrosDelAutor = obtenerTodosLosAudiolibros.filter(libro => libro.autor === autor)
    
    if (audiolibrosDelAutor.length > 0) {
      const masVisto = audiolibrosDelAutor.sort((a, b) => (b.vistas || 0) - (a.vistas || 0))[0]
      return obtenerThumbnailYoutube(masVisto.url)
    }
    
    return '/images/classic-books.jpg'
  }, [obtenerTodosLosAudiolibros])

  // Obtener imagen de género desde canal - memoizado
  const obtenerImagenGeneroDesdeCanal = useCallback((genero: string): string => {
    if (!obtenerTodosLosAudiolibros || obtenerTodosLosAudiolibros.length === 0) {
      return '/images/classic-books.jpg'
    }
    
    const audiolibrosDelGenero = obtenerTodosLosAudiolibros.filter(libro => libro.genero === genero)
    
    if (audiolibrosDelGenero.length > 0) {
      const masVisto = audiolibrosDelGenero.sort((a, b) => (b.vistas || 0) - (a.vistas || 0))[0]
      return obtenerThumbnailYoutube(masVisto.url)
    }
    
    return '/images/classic-books.jpg'
  }, [obtenerTodosLosAudiolibros])

  // Crear datos simulados para compatibilidad - memoizado
  const crearDatosCompatibles = useMemo((): DatosCompletos | null => {
    if (!videos || videos.length === 0) return null
    
    try {
      const estadisticas = YoutubeService.calculateStatistics(videos)
      const audiolibros = obtenerTodosLosAudiolibros
      
      // Organizar por autor
      const porAutor: Record<string, Audiolibro[]> = {}
      audiolibros.forEach(libro => {
        const autor = libro.autor || 'Autor Desconocido'
        if (!porAutor[autor]) {
          porAutor[autor] = []
        }
        porAutor[autor].push(libro)
      })
      
      // Organizar por género
      const porGenero: Record<string, Audiolibro[]> = {}
      audiolibros.forEach(libro => {
        if (!porGenero[libro.genero]) {
          porGenero[libro.genero] = []
        }
        porGenero[libro.genero].push(libro)
      })
      
      return {
        metadata: {
          fecha_analisis: ultimaActualizacion || new Date().toISOString(),
          total_videos_analizados: videos.length,
          fuente_datos: 'YouTube API via Supabase'
        },
        estadisticas_generales: {
          resumen_general: estadisticas,
          audiolibros: {
            por_autor: estadisticas.por_autor,
            por_genero: estadisticas.por_genero,
            duracion_promedio_minutos: estadisticas.duracion_promedio_minutos,
            total_horas_contenido: estadisticas.total_horas_contenido,
            obras_multivolumen: estadisticas.obras_multivolumen,
            autores_unicos: estadisticas.autores_unicos,
            audiolibro_mas_largo: estadisticas.audiolibro_mas_largo
          }
        },
        catalogos_estructurados: {
          por_autor: porAutor,
          por_genero: porGenero,
          por_duracion: {} // Se puede implementar si es necesario
        }
      }
    } catch (error) {
      console.error('Error creando datos compatibles:', error)
      return null
    }
  }, [videos, obtenerTodosLosAudiolibros, ultimaActualizacion])

  return {
    datos: crearDatosCompatibles,
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
    obtenerImagenAutorDesdeCanal
  }
}

export default useAudiolibrosYoutube