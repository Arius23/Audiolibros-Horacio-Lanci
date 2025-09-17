import { Play, Clock, Eye, User, ExternalLink } from 'lucide-react';
import { Audiolibro } from '../types/audiobook';
import { useAudiolibros } from '../hooks/useAudiolibros';
import AudiolibroSchema from './AudiolibroSchema';

interface AudiolibroCardProps {
  audiolibro: Audiolibro;
  mostrarAutor?: boolean;
  tamano?: 'pequeno' | 'mediano' | 'grande';
}

const AudiolibroCard = ({ audiolibro, mostrarAutor = true, tamano = 'mediano' }: AudiolibroCardProps) => {
  const { formatearDuracion, extraerIdYoutube } = useAudiolibros();
  
  const youtubeId = extraerIdYoutube(audiolibro.url);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  
  const formatearVistas = (vistas: number): string => {
    if (vistas >= 1000000) {
      return `${(vistas / 1000000).toFixed(1)}M`;
    } else if (vistas >= 1000) {
      return `${(vistas / 1000).toFixed(1)}K`;
    }
    return vistas.toString();
  };

  const obtenerImagenGenero = (genero: string): string => {
    const imagenesGenero: Record<string, string> = {
      'misterio_detective': '/images/mystery-genre.jpg',
      'ciencia_ficcion': '/images/scifi-genre.jpg',
      'literatura_clasica': '/images/classic-books.jpg',
      'poesia_espiritualidad': '/images/poetry-genre.jpg',
      'literatura_terror': '/images/poe-cover.jpg',
      'distopia': '/images/orwell-cover.jpg',
      'aventura': '/images/verne-cover.jpg',
      'default': '/images/classic-books.jpg'
    };
    
    return imagenesGenero[genero] || imagenesGenero.default;
  };

  const obtenerClasesCard = () => {
    switch (tamano) {
      case 'pequeno':
        return 'max-w-sm';
      case 'grande':
        return 'max-w-lg';
      default:
        return 'max-w-md';
    }
  };

  const obtenerClasesImagen = () => {
    switch (tamano) {
      case 'pequeno':
        return 'h-48';
      case 'grande':
        return 'h-64';
      default:
        return 'h-56';
    }
  };

  const handlePlayClick = () => {
    window.open(audiolibro.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`${obtenerClasesCard()} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group`} style={{backgroundColor: '#ffffff'}}>
      {/* Imagen del audiolibro */}
      <div className={`relative ${obtenerClasesImagen()} overflow-hidden`}>
        <img
          src={thumbnailUrl}
          alt={`Audiolibro: ${audiolibro.titulo} por ${audiolibro.autor} - Narrado por Horacio Lanci | Duración: ${formatearDuracion(audiolibro.duracion_minutos)} | ${audiolibro.genero || 'Literatura clásica'}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = obtenerImagenGenero(audiolibro.genero || 'default');
            target.alt = `Portada de ${audiolibro.genero || 'Literatura clásica'} - ${audiolibro.titulo} por ${audiolibro.autor}`;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </button>
        </div>
        
        {/* Badge de duración */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
          {formatearDuracion(audiolibro.duracion_minutos)}
        </div>
        
        {/* Badge de multivolumen */}
        {audiolibro.es_multivolumen && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            Vol. {audiolibro.volumen}
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 transition-colors duration-200 audiobook-title-hover">
          {audiolibro.titulo}
        </h3>
        
        {mostrarAutor && audiolibro.autor && (
          <div className="flex items-center text-gray-600 mb-2">
            <User className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{audiolibro.autor}</span>
          </div>
        )}

        {/* Estadísticas */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{formatearVistas(audiolibro.vistas)} vistas</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatearDuracion(audiolibro.duracion_minutos)}</span>
          </div>
        </div>

        {/* Género con máximo contraste para YouTube */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium capitalize" style={{backgroundColor: '#652996', color: '#ffffff'}}>
            {audiolibro.genero ? audiolibro.genero.replace('_', ' ') : 'Literatura General'}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-2">
          <button
            onClick={handlePlayClick}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            <span>Escuchar</span>
          </button>
          <a
            href={audiolibro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      {/* Structured Data para SEO */}
      <AudiolibroSchema audiolibro={audiolibro} />
    </div>
  );
};

export default AudiolibroCard;
