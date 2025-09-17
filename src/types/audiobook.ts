export interface Audiolibro {
  titulo: string;
  duracion_minutos: number;
  vistas: number;
  url: string;
  genero: string;
  es_multivolumen: boolean;
  volumen: number | null;
  autor?: string;
}

export interface AutorInfo {
  nombre: string;
  audiolibros: Audiolibro[];
  biografia?: string;
  imagen?: string;
}

export interface GeneroInfo {
  nombre: string;
  descripcion: string;
  icono: string;
  audiolibros: Audiolibro[];
}

export interface EstadisticasGenerales {
  total_videos: number;
  total_audiolibros: number;
  total_visualizaciones: number;
  duracion_total_horas: number;
  promedio_vistas_por_video: number;
  video_mas_visto: {
    titulo: string;
    vistas: number;
  };
}

export interface DatosCompletos {
  metadata: {
    fecha_analisis: string;
    total_videos_analizados: number;
    fuente_datos: string;
  };
  estadisticas_generales: {
    resumen_general: EstadisticasGenerales;
    audiolibros: {
      por_autor: Record<string, number>;
      por_genero: Record<string, number>;
      duracion_promedio_minutos: number;
      total_horas_contenido: number;
      obras_multivolumen: number;
      autores_unicos: number;
      audiolibro_mas_largo: {
        titulo: string;
        duracion_horas: number;
      };
    };
  };
  catalogos_estructurados: {
    por_autor: Record<string, Audiolibro[]>;
    por_genero: Record<string, Audiolibro[]>;
    por_duracion: Record<string, Audiolibro[]>;
  };
}

export interface FiltrosBusqueda {
  texto: string;
  autor: string[];
  genero: string[];
  duracionMin: number;
  duracionMax: number;
  ordenarPor: 'titulo' | 'vistas' | 'duracion' | 'fecha';
  ordenDireccion: 'asc' | 'desc';
}
