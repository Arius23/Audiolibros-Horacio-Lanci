import { Audiolibro } from '../types/audiobook';

interface AudiolibroSchemaProps {
  audiolibro: Audiolibro;
}

const AudiolibroSchema = ({ audiolibro }: AudiolibroSchemaProps) => {
  // Validación defensiva: verificar que el audiolibro tenga las propiedades básicas requeridas
  if (!audiolibro || !audiolibro.titulo) {
    return null;
  }

  // Función para formatear duración al formato ISO 8601
  const formatearDuracionISO = (duracionMinutos: number): string => {
    const minutos = Math.max(0, duracionMinutos || 0);
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `PT${horas}H${minutosRestantes}M`;
  };

  // Función para obtener el año de publicación aproximado (para obras clásicas)
  const obtenerAnoPublicacion = (autor: string | undefined): string => {
    if (!autor) return '1800';
    
    const añosAutores: Record<string, string> = {
      'Arthur Conan Doyle': '1887',
      'Julio Verne': '1864',
      'George Orwell': '1945',
      'Edgar Allan Poe': '1845',
      'Ray Bradbury': '1950',
      'H.G. Wells': '1895',
      'Charles Dickens': '1843',
      'Oscar Wilde': '1890',
      'Khalil Gibran': '1923',
      'Rabindranath Tagore': '1910'
    };
    
    return añosAutores[autor] || '1800';
  };

  // Función para mapear géneros a categorías de Schema.org
  const mapearGenero = (genero: string): string[] => {
    const mapeoGeneros: Record<string, string[]> = {
      'misterio_detective': ['Mystery', 'Crime'],
      'ciencia_ficcion': ['Science Fiction'],
      'literatura_clasica': ['Classic Literature', 'Fiction'],
      'poesia_espiritualidad': ['Poetry', 'Philosophy'],
      'literatura_terror': ['Horror', 'Thriller'],
      'distopia': ['Dystopian Fiction', 'Science Fiction'],
      'aventura': ['Adventure', 'Fiction']
    };
    
    return mapeoGeneros[genero] || ['Literature', 'Fiction'];
  };

  // Función auxiliar para crear URL de Wikipedia de forma segura
  const crearUrlWikipedia = (autor: string | undefined): string => {
    if (!autor || typeof autor !== 'string') {
      return 'https://es.wikipedia.org/wiki/Literatura_cl%C3%A1sica';
    }
    try {
      return `https://es.wikipedia.org/wiki/${encodeURIComponent(autor.replace(/ /g, '_'))}`;
    } catch (error) {
      console.warn('Error al crear URL de Wikipedia:', error);
      return 'https://es.wikipedia.org/wiki/Literatura_cl%C3%A1sica';
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": audiolibro.titulo || 'Audiolibro sin título',
    "author": {
      "@type": "Person",
      "name": audiolibro.autor || 'Autor desconocido',
      "sameAs": crearUrlWikipedia(audiolibro.autor)
    },
    "narrator": {
      "@type": "Person",
      "name": "Horacio Lanci",
      "description": "Narrador profesional especializado en audiolibros de dominio público",
      "sameAs": "https://www.youtube.com/@horaciolanci"
    },
    "bookFormat": "AudioBook",
    "abridged": false,
    "inLanguage": {
      "@type": "Language",
      "name": "Spanish",
      "alternateName": "es"
    },
    "genre": mapearGenero(audiolibro.genero || 'literatura_clasica'),
    "url": audiolibro.url || '#',
    "sameAs": audiolibro.url || '#',
    "duration": formatearDuracionISO(audiolibro.duracion_minutos || 0),
    "datePublished": obtenerAnoPublicacion(audiolibro.autor),
    "publisher": {
      "@type": "Organization",
      "name": "Audiolibros Horacio Lanci",
      "url": "https://audiolibros-horacio-lanci.com",
      "logo": "https://audiolibros-horacio-lanci.com/images/logo.png"
    },
    "copyrightNotice": "Dominio Público",
    "license": "https://creativecommons.org/publicdomain/mark/1.0/",
    "isAccessibleForFree": true,
    "accessMode": ["auditory"],
    "accessModeSufficient": ["auditory"],
    "accessibilityFeature": [
      "audioDescription",
      "fullAudioDescription"
    ],
    "accessibilityHazard": "none",
    "accessibilitySummary": "Audiolibro completo narrado profesionalmente, accesible para personas con discapacidad visual",
    "contentRating": "General Audiences",
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "educationalFramework": "Literatura Universal",
      "targetDescription": "Estudiantes de literatura, amantes de los clásicos, personas interesadas en cultura general"
    },
    "learningResourceType": "Audio Book",
    "typicalAgeRange": "16-99",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": audiolibro.vistas || 0
    },
    "thumbnailUrl": `https://img.youtube.com/vi/${audiolibro.url.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`,
    "embedUrl": audiolibro.url,
    "potentialAction": {
      "@type": "ConsumeAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": audiolibro.url,
        "inLanguage": "es",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      },
      "expectsAcceptanceOf": {
        "@type": "Offer",
        "category": "free",
        "eligibleRegion": {
          "@type": "Country",
          "name": "Worldwide"
        }
      }
    }
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

export default AudiolibroSchema;