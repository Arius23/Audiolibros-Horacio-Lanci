import { supabase, YoutubeVideo, YoutubeStatistics } from '../lib/supabase'
import { Audiolibro } from '../types/audiobook'

// Servicio para manejar la comunicación con Supabase
export class YoutubeService {
  // Obtener todos los videos de YouTube
  static async getVideos(): Promise<YoutubeVideo[]> {
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('view_count', { ascending: false })
    
    if (error) {
      console.error('Error obteniendo videos:', error)
      throw error
    }
    
    return data || []
  }

  // Obtener estadísticas agregadas
  static async getStatistics(): Promise<YoutubeStatistics | null> {
    const { data, error } = await supabase
      .from('youtube_statistics')
      .select('*')
      .maybeSingle()
    
    if (error) {
      console.error('Error obteniendo estadísticas:', error)
      throw error
    }
    
    return data
  }

  // Convertir video de YouTube a formato Audiolibro
  static youtubeToAudiolibro(video: YoutubeVideo): Audiolibro {
    // Extraer autor del título
    const autor = this.extractAuthorFromTitle(video.title)
    
    // Extraer género basado en palabras clave en el título
    const genero = this.extractGenreFromTitle(video.title)
    
    return {
      titulo: this.cleanTitle(video.title),
      duracion_minutos: Math.round(video.duration_seconds / 60),
      vistas: video.view_count,
      url: `https://www.youtube.com/watch?v=${video.video_id}`,
      genero: genero,
      es_multivolumen: this.isMultiVolume(video.title),
      volumen: this.extractVolumeNumber(video.title),
      autor: autor
    }
  }

  // Limpiar título removiendo emojis y texto innecesario
  private static cleanTitle(title: string): string {
    if (!title) return '';
    
    return title
      // Limpiar entidades HTML primero
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      // Normalizar Unicode
      .normalize('NFD')
      // Remover emojis comunes
      .replace(/[🎙️📚🔍🕵🏻👽🦑🐷🏝️⚓🌋🎄🤚👁️🪐🐎🌕⭐🚀⌛🔪🐺🎅🏻🎯🚣🏻🌊]/g, '')
      // Remover palabras clave comunes
      .replace(/AUDIOLIBRO|COMPLETO|ESPAÑOL|LATINO|VOZ|HUMANA|LANCI/gi, '')
      // Remover todo después de |
      .replace(/\|.*$/, '')
      // Normalizar espacios
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Extraer autor del título
  private static extractAuthorFromTitle(title: string): string {
    // Patrones comunes para extraer autores
    const patterns = [
      /de\s+([^|\n]+?)\s*\|/i, // "de Arthur Conan Doyle |"
      /de\s+([^|\n]+?)\s*COMPLETO/i, // "de Arthur Conan Doyle COMPLETO"
      /por\s+([^|\n]+?)\s*\|/i, // "por H. Lanci"
    ]
    
    for (const pattern of patterns) {
      const match = title.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
    
    // Autores conocidos del canal
    const knownAuthors = [
      'Arthur Conan Doyle',
      'Julio Verne', 
      'George Orwell',
      'Edgar Allan Poe',
      'Ray Bradbury',
      'H. G. Wells',
      'Charles Dickens',
      'Oscar Wilde',
      'Franz Kafka',
      'Khalil Gibran',
      'Pierre Teilhard de Chardin',
      'Cervantes',
      'Rabindranath Tagore',
      'Adolfo Bioy Casares',
      'Jorge Luis Borges',
      'Horacio Quiroga',
      'Ana Frank',
      'Felipe Pigna',
      'Félix Luna'
    ]
    
    const foundAuthor = knownAuthors.find(author => 
      title.toLowerCase().includes(author.toLowerCase())
    )
    
    return foundAuthor || 'Autor Desconocido'
  }

  // Extraer género basado en palabras clave
  private static extractGenreFromTitle(title: string): string {
    const genreKeywords = {
      'misterio_detective': ['sherlock', 'holmes', 'detective', 'misterio', 'crimen', 'investigación'],
      'ciencia_ficcion': ['marcian', 'tiempo', 'submarino', 'tierra', 'espacio', 'futuro', 'máquina'],
      'literatura_terror': ['edgar', 'poe', 'terror', 'corazón', 'usher', 'morgue'],
      'distopia': ['1984', 'rebelión', 'granja', 'orwell'],
      'poesia_espiritualidad': ['profeta', 'gibran', 'himno', 'universo', 'espiritual', 'poesía'],
      'literatura_clasica': ['quijote', 'sancho', 'metamorfosis', 'kafka', 'dorian', 'gray'],
      'historia_biografia': ['ana frank', 'diario', 'historia', 'biografía'],
      'literatura_argentina': ['borges', 'quiroga', 'bioy casares', 'argentina'],
      'aventura': ['isla', 'viaje', 'aventura', 'chancellor']
    }
    
    const titleLower = title.toLowerCase()
    
    for (const [genre, keywords] of Object.entries(genreKeywords)) {
      if (keywords.some(keyword => titleLower.includes(keyword))) {
        return genre
      }
    }
    
    return 'literatura_general'
  }

  // Verificar si es multivolumen
  private static isMultiVolume(title: string): boolean {
    return /\b(vol|volumen|parte)\s*[\d\w]+/i.test(title)
  }

  // Extraer número de volumen
  private static extractVolumeNumber(title: string): number | null {
    const match = title.match(/\b(?:vol|volumen|parte)\s*([\d]+)/i)
    return match ? parseInt(match[1], 10) : null
  }

  // Obtener estadísticas calculadas
  static calculateStatistics(videos: YoutubeVideo[]) {
    const totalHours = videos.reduce((sum, video) => sum + video.duration_seconds, 0) / 3600
    const totalViews = videos.reduce((sum, video) => sum + video.view_count, 0)
    const totalLikes = videos.reduce((sum, video) => sum + video.like_count, 0)
    
    // Agrupar por autor
    const porAutor: Record<string, number> = {}
    videos.forEach(video => {
      const autor = this.extractAuthorFromTitle(video.title)
      porAutor[autor] = (porAutor[autor] || 0) + 1
    })
    
    // Agrupar por género
    const porGenero: Record<string, number> = {}
    videos.forEach(video => {
      const genero = this.extractGenreFromTitle(video.title)
      porGenero[genero] = (porGenero[genero] || 0) + 1
    })
    
    const videoMasVisto = videos.reduce((max, video) => 
      video.view_count > max.view_count ? video : max
    )
    
    return {
      total_videos: videos.length,
      total_audiolibros: videos.length,
      total_visualizaciones: totalViews,
      duracion_total_horas: totalHours,
      promedio_vistas_por_video: totalViews / videos.length,
      video_mas_visto: {
        titulo: this.cleanTitle(videoMasVisto.title),
        vistas: videoMasVisto.view_count
      },
      por_autor: porAutor,
      por_genero: porGenero,
      duracion_promedio_minutos: videos.reduce((sum, v) => sum + v.duration_seconds, 0) / videos.length / 60,
      total_horas_contenido: totalHours,
      obras_multivolumen: videos.filter(v => this.isMultiVolume(v.title)).length,
      autores_unicos: Object.keys(porAutor).length,
      audiolibro_mas_largo: {
        titulo: this.cleanTitle(
          videos.reduce((max, video) => 
            video.duration_seconds > max.duration_seconds ? video : max
          ).title
        ),
        duracion_horas: Math.max(...videos.map(v => v.duration_seconds)) / 3600
      }
    }
  }
}

export default YoutubeService