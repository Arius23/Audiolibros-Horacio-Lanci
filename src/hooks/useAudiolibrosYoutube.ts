import { useState, useEffect, useMemo, useCallback } from 'react'
import { Audiolibro, FiltrosBusqueda, DatosCompletos } from '../types/audiobook'
import YoutubeService from '../services/youtubeService'
import { YoutubeVideo } from '../lib/supabase'

// Imagen hero fija por género (ajustar nombres a los archivos reales en public/images)
const IMAGEN_HERO_POR_GENERO: Record<string, string> = {
  'misterio-detective': 'images/hero-genero-misterio.jpg',
  'poesia-espiritualidad': 'images/hero-genero-poesia.jpg',
  'clasica-filosofica': 'images/hero-genero-clasica.jpg',
  'terror-gotico': 'images/hero-genero-terror.jpg',
  'ciencia-ficcion-fantastico': 'images/hero-genero-ciencia.jpg',
  'aventuras': 'images/hero-genero-aventuras.jpg',
  'distopia-critica-social': 'images/hero-genero-distopia.jpg',
  'historia-ensayo': 'images/hero-genero-historia.jpg',
  'biografia-testimonio': 'images/hero-genero-biografia.jpg',
  'infantil-juvenil': 'images/hero-genero-infantil.jpg'
}

export const useAudiolibrosYoutube = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true)
        const videosData = await YoutubeService.getVideos()
        setVideos(videosData)

        const stats = await YoutubeService.getStatistics()
        if (stats) setUltimaActualizacion(stats.last_sync_at)
      } catch (err) {
        console.error('Error cargando datos de YouTube:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [])

  // Mapear videos -> audiolibros
  const obtenerTodosLosAudiolibros = useMemo((): Audiolibro[] => {
    if (!videos || videos.length === 0) return []
    try {
      return videos.map(video => YoutubeService.youtubeToAudiolibro(video))
    } catch (error) {
      console.error('Error convirtiendo videos a audiolibros:', error)
      return []
    }
  }, [videos])

  // Destacados
  const obtenerAudiolibrosDestacados = useMemo((): Audiolibro[] => {
    try {
      return obtenerTodosLosAudiolibros
        .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
        .slice(0, 6)
    } catch {
      return []
    }
  }, [obtenerTodosLosAudiolibros])

  // Autores populares
  const obtenerAutoresPopulares = useMemo(() => {
    try {
      const audiolibros = obtenerTodosLosAudiolibros
      if (!audiolibros.length) return []

      const autoresCuenta: Record<string, number> = {}
      const autoresAudiolibros: Record<string, Audiolibro[]> = {}

      audiolibros.forEach(libro => {
        const autor = libro.autor || 'Autor Desconocido'
        autoresCuenta[autor] = (autoresCuenta[autor] || 0) + 1
        if (!autoresAudiolibros[autor]) autoresAudiolibros[autor] = []
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
    } catch {
      return []
    }
  }, [obtenerTodosLosAudiolibros])

  // Géneros con info
  const obtenerGeneros = useMemo(() => {
    const audiolibros = obtenerTodosLosAudiolibros
    if (!audiolibros.length) return []

    const generosCuenta: Record<string, number> = {}
    const generosAudiolibros: Record<string, Audiolibro[]> = {}

    audiolibros.forEach(libro => {
      const genero = libro.genero
      generosCuenta[genero] = (generosCuenta[genero] || 0) + 1
      if (!generosAudiolibros[genero]) generosAudiolibros[genero] = []
      generosAudiolibros[genero].push(libro)
    })

    const generosInfo = {
      'misterio-detective': {
        nombre: '🕵️ MISTERIO Y DETECTIVE',
        descripcion: 'Casos enigmáticos, pistas y giros; investigaciones que mantienen la tensión hasta la última página.',
        icono: '🕵️'
      },
      'poesia-espiritualidad': {
        nombre: '📝 POESÍA / ESPIRITUALIDAD',
        descripcion: 'Versos, meditación y búsqueda interior; voces que exploran la belleza, el silencio y el asombro.',
        icono: '📝'
      },
      'clasica-filosofica': {
        nombre: '📚 LITERATURA CLÁSICA / FILOSÓFICA',
        descripcion: 'Obras maestras y pensamiento crítico; ideas que forjaron la historia de la cultura occidental.',
        icono: '📚'
      },
      'terror-gotico': {
        nombre: '👻 TERROR / GÓTICO',
        descripcion: 'Sombras, casas antiguas y presencias inquietantes; atmósferas densas que susurran miedos profundos.',
        icono: '👻'
      },
      'ciencia-ficcion-fantastico': {
        nombre: '🚀 CIENCIA FICCIÓN / FANTÁSTICO',
        descripcion: 'Ucronías, viajes y magia; mundos posibles donde la imaginación reescribe las reglas.',
        icono: '🚀'
      },
      'aventuras': {
        nombre: '🗺️ AVENTURAS',
        descripcion: 'Travesías peligrosas, mapas y tesoros; héroes que cruzan mares y montañas en busca de lo imposible.',
        icono: '🗺️'
      },
      'distopia-critica-social': {
        nombre: '🏛️ DISTOPÍA / CRÍTICA SOCIAL',
        descripcion: 'Sociedades límite y control; espejos deformantes que cuestionan poder, libertad y futuro.',
        icono: '🏛️'
      },
      'historia-ensayo': {
        nombre: '📚 HISTORIA / ENSAYO',
        descripcion: 'Acontecimientos, ideas y contextos; textos que iluminan el pasado y analizan el presente.',
        icono: '📚'
      },
      'biografia-testimonio': {
        nombre: '📖 BIOGRAFÍA / TESTIMONIO',
        descripcion: 'Vidas reales, diarios y memorias; relatos íntimos que revelan decisiones, conflictos y legado.',
        icono: '📖'
      },
      'infantil-juvenil': {
        nombre: '👨‍👩‍👧‍👦 LITERATURA INFANTIL / JUVENIL',
        descripcion: 'Aventuras formativas y humor; historias que despiertan curiosidad y empatía temprana.',
        icono: '👨‍👩‍👧‍👦'
      }
    } as const

    return Object.entries(generosCuenta)
      .sort(([, a], [, b]) => b - a)
      .map(([genero, cantidad]) => ({
        genero,
        cantidad,
        info: (generosInfo as any)[genero] || {
          nombre: genero.replace(/-/g, ' '),
          descripcion: 'Contenido literario variado',
          icono: '📚'
        },
        audiolibros: generosAudiolibros[genero] || []
      }))
  }, [obtenerTodosLosAudiolibros])

  // Búsqueda con filtros
  const buscarAudiolibros = useCallback((filtros: FiltrosBusqueda): Audiolibro[] => {
    let audiolibros = [...obtenerTodosLosAudiolibros]

    if (filtros.texto) {
      const texto = filtros.texto.toLowerCase()
      audiolibros = audiolibros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto) ||
        libro.autor?.toLowerCase().includes(texto)
      )
    }

    if (filtros.autor.length > 0) {
      audiolibros = audiolibros.filter(libro =>
        filtros.autor.includes(libro.autor || '')
      )
    }

    if (filtros.genero.length > 0) {
      audiolibros = audiolibros.filter(libro =>
        filtros.genero.includes(libro.genero)
      )
    }

    audiolibros = audiolibros.filter(libro =>
      libro.duracion_minutos >= filtros.duracionMin &&
      libro.duracion_minutos <= filtros.duracionMax
    )

    audiolibros.sort((a, b) => {
      let comparacion = 0
      switch (filtros.ordenarPor) {
        case 'titulo':   comparacion = a.titulo.localeCompare(b.titulo); break
        case 'vistas':   comparacion = (a.vistas || 0) - (b.vistas || 0); break
        case 'duracion': comparacion = a.duracion_minutos - b.duracion_minutos; break
        case 'fecha':    comparacion = (a.vistas || 0) - (b.vistas || 0); break
      }
      return filtros.ordenDireccion === 'desc' ? -comparacion : comparacion
    })

    return audiolibros
  }, [obtenerTodosLosAudiolibros])

  // Por duración
  const obtenerAudiolibrosPorDuracion = useMemo(() => {
    const todos = obtenerTodosLosAudiolibros
    if (!todos.length) {
      return {
        cortos: { titulo: 'Audiolibros Cortos', descripcion: '', duracion: '30min - 2h', icono: '⚡', color: 'green', audiolibros: [] },
        medios: { titulo: 'Audiolibros Medios', descripcion: '', duracion: '2h - 5h', icono: '⏰', color: 'blue', audiolibros: [] },
        largos: { titulo: 'Audiolibros Largos', descripcion: '', duracion: '5h+', icono: '📚', color: 'purple', audiolibros: [] }
      }
    }

    const cortos = todos.filter(l => l.duracion_minutos >= 30 && l.duracion_minutos < 120)
    const medios = todos.filter(l => l.duracion_minutos >= 120 && l.duracion_minutos < 300)
    const largos = todos.filter(l => l.duracion_minutos >= 300)

    return {
      cortos:  { titulo: 'Audiolibros Cortos',  descripcion: 'Perfectos para viajes cortos o pausas de trabajo', duracion: '30min - 2h', icono: '⚡', color: 'green',  audiolibros: cortos.sort((a,b)=>(b.vistas||0)-(a.vistas||0)) },
      medios:  { titulo: 'Audiolibros Medios',  descripcion: 'Ideales para sesiones de escucha relajada',        duracion: '2h - 5h',   icono: '⏰', color: 'blue',   audiolibros: medios.sort((a,b)=>(b.vistas||0)-(a.vistas||0)) },
      largos:  { titulo: 'Audiolibros Largos',  descripcion: 'Experiencias inmersivas para verdaderos amantes',  duracion: '5h+',       icono: '📚', color: 'purple', audiolibros: largos.sort((a,b)=>(b.vistas||0)-(a.vistas||0)) }
    }
  }, [obtenerTodosLosAudiolibros])

  // Utilidades
  const formatearDuracion = (minutos: number): string => {
    const horas = Math.floor(minutos / 60)
    const minutosRestantes = Math.round(minutos % 60)
    if (horas === 0) return `${minutosRestantes}m`
    return minutosRestantes > 0 ? `${horas}h ${minutosRestantes}m` : `${horas}h`
  }

  const extraerIdYoutube = (url: string): string => {
    if (!url || typeof url !== 'string') return ''
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]
    for (const p of patterns) {
      const m = url.match(p)
      if (m && m[1]) return m[1]
    }
    return ''
  }

  const obtenerThumbnailYoutube = (url: string): string => {
    const videoId = extraerIdYoutube(url)
    if (!videoId) return 'images/genero-placeholder.jpg'
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const obtenerImagenAutorDesdeCanal = useCallback((autor: string): string => {
    if (!obtenerTodosLosAudiolibros.length) return 'images/genero-placeholder.jpg'
    const lista = obtenerTodosLosAudiolibros.filter(l => l.autor === autor)
    if (lista.length) {
      const masVisto = lista.slice().sort((a,b)=>(b.vistas||0)-(a.vistas||0))[0]
      return obtenerThumbnailYoutube(masVisto.url)
    }
    return 'images/genero-placeholder.jpg'
  }, [obtenerTodosLosAudiolibros])

  const obtenerImagenGeneroDesdeCanal = useCallback((genero: string): string => {
    if (!obtenerTodosLosAudiolibros.length) return 'images/genero-placeholder.jpg'
    const lista = obtenerTodosLosAudiolibros.filter(l => l.genero === genero)
    if (lista.length) {
      const masVisto = lista.slice().sort((a,b)=>(b.vistas||0)-(a.vistas||0))[0]
      return obtenerThumbnailYoutube(masVisto.url)
    }
    return 'images/genero-placeholder.jpg'
  }, [obtenerTodosLosAudiolibros])

  // Imagen hero preferida por género
  const obtenerHeroGenero = useCallback((genero: string): string => {
    const fija = IMAGEN_HERO_POR_GENERO[genero]
    if (fija) return fija
    return obtenerImagenGeneroDesdeCanal(genero)
  }, [obtenerImagenGeneroDesdeCanal])

  // Datos compatibles
  const crearDatosCompatibles = useMemo((): DatosCompletos | null => {
    if (!videos || videos.length === 0) return null
    try {
      const estadisticas = YoutubeService.calculateStatistics(videos)
      const audiolibros = obtenerTodosLosAudiolibros

      const porAutor: Record<string, Audiolibro[]> = {}
      audiolibros.forEach(libro => {
        const autor = libro.autor || 'Autor Desconocido'
        if (!porAutor[autor]) porAutor[autor] = []
        porAutor[autor].push(libro)
      })

      const porGenero: Record<string, Audiolibro[]> = {}
      audiolibros.forEach(libro => {
        if (!porGenero[libro.genero]) porGenero[libro.genero] = []
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
          por_duracion: {}
        }
      }
    } catch {
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
    obtenerImagenAutorDesdeCanal,
    obtenerHeroGenero
  }
}

export default useAudiolibrosYoutube
