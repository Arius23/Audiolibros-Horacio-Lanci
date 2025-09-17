import { useMemo } from 'react';
import { Audiolibro } from '../types/audiobook';
import { useAudiolibrosYoutube } from './useAudiolibrosYoutube';
import { 
  GENEROS_CONFIGURACION, 
  mapearTituloAGenero, 
  obtenerOrdenObraEnGenero,
  obtenerGenerosOrdenados,
  obtenerConfigGenero 
} from '../data/genreConfig';

export interface GeneroOrganizado {
  genero: string;
  cantidad: number;
  info: {
    nombre: string;
    descripcion: string;
    icono: string;
    color?: string;
  };
  audiolibros: Audiolibro[];
}

export const useAudiolibrosOrganizados = () => {
  const { 
    obtenerTodosLosAudiolibros: obtenerTodosYT, 
    obtenerImagenGeneroDesdeCanal, 
    obtenerImagenAutorDesdeCanal,
    cargando, 
    error 
  } = useAudiolibrosYoutube();

  // Reorganizar géneros según la nueva configuración
  const obtenerGenerosReorganizados = useMemo((): GeneroOrganizado[] => {
    const todosLosAudiolibros = obtenerTodosYT;
    if (!todosLosAudiolibros || todosLosAudiolibros.length === 0) return [];
    
    // Crear estructura de géneros organizados
    const generosOrganizados: Record<string, Audiolibro[]> = {};
    
    // Inicializar todos los géneros con arrays vacíos
    obtenerGenerosOrdenados().forEach(generoKey => {
      generosOrganizados[generoKey] = [];
    });
    
    // Clasificar audiolibros en géneros según la nueva configuración
    todosLosAudiolibros.forEach(audiolibro => {
      const generoMapeado = mapearTituloAGenero(audiolibro.titulo);
      
      if (generoMapeado && generosOrganizados[generoMapeado]) {
        generosOrganizados[generoMapeado].push(audiolibro);
      }
    });
    
    // Ordenar audiolibros dentro de cada género según el orden especificado
    Object.keys(generosOrganizados).forEach(generoKey => {
      generosOrganizados[generoKey].sort((a, b) => {
        const ordenA = obtenerOrdenObraEnGenero(a.titulo, generoKey);
        const ordenB = obtenerOrdenObraEnGenero(b.titulo, generoKey);
        return ordenA - ordenB;
      });
    });
    
    // Convertir a formato GeneroOrganizado en el orden especificado
    return obtenerGenerosOrdenados()
      .map(generoKey => {
        const generoConfig = obtenerConfigGenero(generoKey);
        const audiolibrosDelGenero = generosOrganizados[generoKey] || [];
        
        if (!generoConfig) return null;
        
        return {
          genero: generoKey,
          cantidad: audiolibrosDelGenero.length,
          info: {
            nombre: generoConfig.nombre,
            descripcion: generoConfig.descripcion,
            icono: generoConfig.icono,
            color: generoConfig.color || 'blue'
          },
          audiolibros: audiolibrosDelGenero
        };
      })
      .filter((genero): genero is NonNullable<typeof genero> => genero !== null && genero.cantidad > 0);
  }, [obtenerTodosYT]);
  
  // Obtener estadísticas por género reorganizado
  const obtenerEstadisticasGeneros = useMemo(() => {
    const generos = obtenerGenerosReorganizados;
    const estadisticas: Record<string, number> = {};
    
    generos.forEach(genero => {
      estadisticas[genero.genero] = genero.cantidad;
    });
    
    return estadisticas;
  }, [obtenerGenerosReorganizados]);
  
  // Obtener audiolibros por género específico
  const obtenerAudiolibrosPorGenero = useMemo(() => {
    const generos = obtenerGenerosReorganizados;
    const porGenero: Record<string, Audiolibro[]> = {};
    
    generos.forEach(genero => {
      porGenero[genero.genero] = genero.audiolibros;
    });
    
    return porGenero;
  }, [obtenerGenerosReorganizados]);
  
  // Función para formatear nombre de género
  const formatearNombreGenero = (genero: string): string => {
    const config = obtenerConfigGenero(genero);
    return config?.nombre || genero.replace('_', ' ');
  };
  
  // Función para obtener descripción de género
  const obtenerDescripcionGenero = (genero: string): string => {
    const config = obtenerConfigGenero(genero);
    return config?.descripcion || 'Descubre estos fascinantes audiolibros de este género literario.';
  };
  
  return {
    cargando,
    error,
    obtenerGenerosReorganizados,
    obtenerEstadisticasGeneros,
    obtenerAudiolibrosPorGenero,
    formatearNombreGenero,
    obtenerDescripcionGenero,
    obtenerImagenGeneroDesdeCanal,
    obtenerImagenAutorDesdeCanal
  };
};

export default useAudiolibrosOrganizados;