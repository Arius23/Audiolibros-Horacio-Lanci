// Configuración específica de géneros y orden de obras según requerimientos
// Total: 40 audiolibros distribuidos en 10 categorías

export interface GenreInfo {
  nombre: string;
  descripcion: string;
  icono: string;
  color?: string;
  obras: string[]; // Lista ordenada de títulos exactos
}

export const GENEROS_CONFIGURACION: Record<string, GenreInfo> = {
  'misterio_detective': {
    nombre: 'Misterio y Detective',
    descripcion: 'Historias de suspense, crímenes e investigación. Desde los casos de Sherlock Holmes hasta intrigantes misterios por resolver.',
    icono: '🕵️',
    color: 'blue',
    obras: [
      'Un estudio en escarlata',
      'El signo de los cuatro',
      'Las aventuras de Sherlock Holmes',
      'Las memorias de Sherlock Holmes',
      'El sabueso de los Baskerville',
      'El regreso de Sherlock Holmes (2 partes)',
      'El Valle del Terror',
      'Su última reverencia',
      'Los crímenes de la calle Morgue'
    ]
  },
  'poesia_espiritualidad': {
    nombre: 'Poesía / Espiritualidad',
    descripcion: 'Reflexiones profundas sobre la vida, el alma y la condición humana. Belleza literaria y contemplación espiritual.',
    icono: '📝',
    color: 'purple',
    obras: [
      'Selección de POESÍAS',
      'El profeta',
      'Ofrenda lírica (Gitánjali)',
      '7 Sonetos medicinales y selección de poesías',
      'La luna nueva',
      'Himno del universo',
      'Altazor o el viaje en paracaídas'
    ]
  },
  'literatura_clasica': {
    nombre: 'Literatura Clásica / Filosófica',
    descripcion: 'Obras maestras de la literatura universal que han resistido el paso del tiempo y siguen siendo relevantes.',
    icono: '📚',
    color: 'amber',
    obras: [
      'El retrato de Dorian Gray',
      'La metamorfosis',
      'El hacedor',
      'Vida de Don Quijote y Sancho (2 partes)',
      'En Memoria de Paulina'
    ]
  },
  'literatura_terror': {
    nombre: 'Terror / Gótico',
    descripcion: 'Cuentos escalofriantes y atmósferas inquietantes. Maestros del horror psicológico y el suspenso sobrenatural.',
    icono: '👻',
    color: 'gray',
    obras: [
      'La caída de la casa Usher',
      'El corazón delator',
      'El extraño caso del Dr. Jekyll y Mr. Hyde',
      'El fantasma de Canterville',
      'Cuentos de amor, de locura y de muerte'
    ]
  },
  'ciencia_ficcion': {
    nombre: 'Ciencia Ficción / Fantástico',
    descripcion: 'Aventuras futuristas y mundos imaginarios. Exploración del espacio, tecnología avanzada y sociedades del futuro.',
    icono: '🚀',
    color: 'green',
    obras: [
      'Crónicas marcianas',
      'La máquina del tiempo',
      'La guerra de los mundos',
      'La invención de Morel'
    ]
  },
  'aventuras': {
    nombre: 'Aventuras',
    descripcion: 'Viajes extraordinarios y expediciones emocionantes. Exploración de lugares remotos y desafíos épicos.',
    icono: '🗺️',
    color: 'orange',
    obras: [
      '20.000 Leguas de Viaje Submarino (2 volúmenes)',
      'La isla misteriosa (2 volúmenes)',
      'Viaje al centro de la tierra',
      'El Chancellor'
    ]
  },
  'distopia': {
    nombre: 'Distopía / Crítica Social',
    descripcion: 'Visiones críticas del futuro y la sociedad. Reflexiones sobre el poder, la libertad y los peligros del totalitarismo.',
    icono: '🏛️',
    color: 'red',
    obras: [
      'Rebelión en la granja',
      '1984 (3 partes)'
    ]
  },
  'historia_ensayo': {
    nombre: 'Historia / Ensayo',
    descripcion: 'Relatos históricos y análisis de figuras y eventos que marcaron su época.',
    icono: '📚',
    color: 'indigo',
    obras: [
      'La vida por la patria (2 volúmenes)',
      'Sarmiento y sus fantasmas'
    ]
  },
  'biografia_testimonio': {
    nombre: 'Biografía / Testimonio',
    descripcion: 'Relatos íntimos y testimoniales que revelan experiencias humanas extraordinarias.',
    icono: '📖',
    color: 'teal',
    obras: [
      'El diario de Ana Frank'
    ]
  },
  'literatura_infantil': {
    nombre: 'Literatura Infantil / Juvenil',
    descripcion: 'Historias que tocan el corazón y despiertan la imaginación de lectores de todas las edades.',
    icono: '👨‍👩‍👧‍👦',
    color: 'pink',
    obras: [
      'El Principito'
    ]
  }
};

// Mapeo de títulos a autores conocidos
export const TITULO_AUTOR_MAP: Record<string, string> = {
  'Un estudio en escarlata': 'Arthur Conan Doyle',
  'El signo de los cuatro': 'Arthur Conan Doyle',
  'Las aventuras de Sherlock Holmes': 'Arthur Conan Doyle',
  'Las memorias de Sherlock Holmes': 'Arthur Conan Doyle',
  'El sabueso de los Baskerville': 'Arthur Conan Doyle',
  'El regreso de Sherlock Holmes (2 partes)': 'Arthur Conan Doyle',
  'El Valle del Terror': 'Arthur Conan Doyle',
  'Su última reverencia': 'Arthur Conan Doyle',
  'Los crímenes de la calle Morgue': 'Edgar Allan Poe',
  'Selección de POESÍAS': 'Gabriela Mistral',
  'El profeta': 'Khalil Gibran',
  'Ofrenda lírica (Gitánjali)': 'Rabindranath Tagore',
  '7 Sonetos medicinales y selección de poesías': 'Almafuerte',
  'La luna nueva': 'Rabindranath Tagore',
  'Himno del universo': 'Pierre Teilhard de Chardin',
  'Altazor o el viaje en paracaídas': 'Vicente Huidobro',
  'El retrato de Dorian Gray': 'Oscar Wilde',
  'La metamorfosis': 'Franz Kafka',
  'El hacedor': 'Jorge Luis Borges',
  'Vida de Don Quijote y Sancho (2 partes)': 'Cervantes/Unamuno',
  'En Memoria de Paulina': 'Adolfo Bioy Casares',
  'La caída de la casa Usher': 'Edgar Allan Poe',
  'El corazón delator': 'Edgar Allan Poe',
  'El extraño caso del Dr. Jekyll y Mr. Hyde': 'R. L. Stevenson',
  'El fantasma de Canterville': 'Oscar Wilde',
  'Cuentos de amor, de locura y de muerte': 'Horacio Quiroga',
  'Crónicas marcianas': 'Ray Bradbury',
  'La máquina del tiempo': 'H. G. Wells',
  'La guerra de los mundos': 'H. G. Wells',
  'La invención de Morel': 'Adolfo Bioy Casares',
  '20.000 Leguas de Viaje Submarino (2 volúmenes)': 'Julio Verne',
  'La isla misteriosa (2 volúmenes)': 'Julio Verne',
  'Viaje al centro de la tierra': 'Julio Verne',
  'El Chancellor': 'Julio Verne',
  'Rebelión en la granja': 'George Orwell',
  '1984 (3 partes)': 'George Orwell',
  'La vida por la patria (2 volúmenes)': 'Felipe Pigna',
  'Sarmiento y sus fantasmas': 'Félix Luna',
  'El diario de Ana Frank': 'Ana Frank',
  'El Principito': 'Antoine de Saint-Exupéry'
};

// Función para obtener la configuración de un género
export const obtenerConfigGenero = (generoKey: string): GenreInfo | null => {
  return GENEROS_CONFIGURACION[generoKey] || null;
};

// Función para obtener todos los géneros en el orden especificado
export const obtenerGenerosOrdenados = (): string[] => {
  return Object.keys(GENEROS_CONFIGURACION);
};

// Función para mapear un título de audiolibro a su género correspondiente
export const mapearTituloAGenero = (titulo: string): string | null => {
  // Normalizar título para comparación más flexible
  const tituloNormalizado = titulo.toLowerCase().trim();
  
  for (const [generoKey, generoInfo] of Object.entries(GENEROS_CONFIGURACION)) {
    const obraEncontrada = generoInfo.obras.find(obra => {
      const obraNormalizada = obra.toLowerCase().trim();
      return tituloNormalizado.includes(obraNormalizada) || obraNormalizada.includes(tituloNormalizado);
    });
    
    if (obraEncontrada) {
      return generoKey;
    }
  }
  
  return null; // Si no se encuentra en ningún género específico
};

// Función para obtener el orden específico de una obra dentro de su género
export const obtenerOrdenObraEnGenero = (titulo: string, genero: string): number => {
  const generoInfo = obtenerConfigGenero(genero);
  if (!generoInfo) return 999;
  
  const tituloNormalizado = titulo.toLowerCase().trim();
  const indiceEncontrado = generoInfo.obras.findIndex(obra => {
    const obraNormalizada = obra.toLowerCase().trim();
    return tituloNormalizado.includes(obraNormalizada) || obraNormalizada.includes(tituloNormalizado);
  });
  
  return indiceEncontrado >= 0 ? indiceEncontrado : 999;
};