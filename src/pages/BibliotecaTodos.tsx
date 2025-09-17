import { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import AudiolibroCard from '../components/AudiolibroCard';
import { useAudiolibros } from '../hooks/useAudiolibros';
import { FiltrosBusqueda } from '../types/audiobook';

const BibliotecaTodos = () => {
  const { 
    obtenerTodosLosAudiolibros, 
    buscarAudiolibros, 
    datos, 
    cargando 
  } = useAudiolibros();

  const [vistaLista, setVistaLista] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosBusqueda>({
    texto: '',
    autor: [],
    genero: [],
    duracionMin: 0,
    duracionMax: 1000,
    ordenarPor: 'vistas',
    ordenDireccion: 'desc'
  });

  const audiolibros = buscarAudiolibros(filtros);
  const todosLosAutores = datos ? Object.keys(datos.estadisticas_generales.audiolibros.por_autor) : [];
  const todosLosGeneros = datos ? Object.keys(datos.estadisticas_generales.audiolibros.por_genero) : [];

  const handleFiltroTexto = (texto: string) => {
    setFiltros(prev => ({ ...prev, texto }));
  };

  const handleFiltroAutor = (autor: string) => {
    setFiltros(prev => ({
      ...prev,
      autor: prev.autor.includes(autor)
        ? prev.autor.filter(a => a !== autor)
        : [...prev.autor, autor]
    }));
  };

  const handleFiltroGenero = (genero: string) => {
    setFiltros(prev => ({
      ...prev,
      genero: prev.genero.includes(genero)
        ? prev.genero.filter(g => g !== genero)
        : [...prev.genero, genero]
    }));
  };

  const handleOrdenamiento = (campo: FiltrosBusqueda['ordenarPor']) => {
    setFiltros(prev => ({
      ...prev,
      ordenarPor: campo,
      ordenDireccion: prev.ordenarPor === campo && prev.ordenDireccion === 'desc' ? 'asc' : 'desc'
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      texto: '',
      autor: [],
      genero: [],
      duracionMin: 0,
      duracionMax: 1000,
      ordenarPor: 'vistas',
      ordenDireccion: 'desc'
    });
  };

  const formatearNombreGenero = (genero: string) => {
    return genero.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#D7AA4E] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-200 text-lg">Cargando biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Biblioteca Completa
          </h1>
          <p className="text-lg text-gray-300">
            Explora nuestra colección completa de {audiolibros.length} audiolibros de dominio público
          </p>
          {datos && datos.estadisticas_generales && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-[#D7AA4E]">{datos.estadisticas_generales.resumen_general.total_audiolibros}</div>
                <div className="text-sm text-gray-400">Audiolibros</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">{Math.round(datos.estadisticas_generales.resumen_general.duracion_total_horas)}</div>
                <div className="text-sm text-gray-400">Horas</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">{Object.keys(datos.estadisticas_generales.audiolibros.por_autor).length}</div>
                <div className="text-sm text-gray-400">Autores</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">{Object.keys(datos.estadisticas_generales.audiolibros.por_genero).length}</div>
                <div className="text-sm text-gray-400">Géneros</div>
              </div>
            </div>
          )}
        </div>

        {/* Barra de búsqueda y controles */}
        <div className="bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-[#D7AA4E]/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por título o autor..."
                value={filtros.texto}
                onChange={(e) => handleFiltroTexto(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-[#D7AA4E]/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#D7AA4E] focus:border-transparent"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`px-4 py-3 rounded-lg border flex items-center space-x-2 transition-colors duration-200 ${
                  mostrarFiltros ? 'bg-purple-700 border-[#D7AA4E]/50 text-[#D7AA4E]' : 'border-[#D7AA4E]/30 text-gray-300 hover:bg-purple-700/50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>

              <div className="flex border border-[#D7AA4E]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setVistaLista(false)}
                  className={`p-3 ${!vistaLista ? 'bg-[#D7AA4E] text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-purple-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setVistaLista(true)}
                  className={`p-3 ${vistaLista ? 'bg-[#D7AA4E] text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-purple-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel de filtros */}
          {mostrarFiltros && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Filtro por autor */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Por Autor</h3>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {todosLosAutores.map((autor) => (
                      <label key={autor} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filtros.autor.includes(autor)}
                          onChange={() => handleFiltroAutor(autor)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">{autor}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por género */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Por Género</h3>
                  <div className="space-y-2">
                    {todosLosGeneros.map((genero) => (
                      <label key={genero} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filtros.genero.includes(genero)}
                          onChange={() => handleFiltroGenero(genero)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">
                          {formatearNombreGenero(genero)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por duración */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Por Duración</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">
                        Duración mínima: {Math.round(filtros.duracionMin / 60 * 10) / 10}h
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="800"
                        step="30"
                        value={filtros.duracionMin}
                        onChange={(e) => setFiltros(prev => ({ ...prev, duracionMin: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">
                        Duración máxima: {Math.round(filtros.duracionMax / 60 * 10) / 10}h
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="800"
                        step="30"
                        value={filtros.duracionMax}
                        onChange={(e) => setFiltros(prev => ({ ...prev, duracionMax: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={limpiarFiltros}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Limpiar filtros
                </button>
                <span className="text-sm text-gray-600">
                  {audiolibros.length} audiolibro{audiolibros.length !== 1 ? 's' : ''} encontrado{audiolibros.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Barra de ordenamiento */}
        <div className="bg-card rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Ordenar por:</span>
            {[
              { key: 'titulo', label: 'Título' },
              { key: 'vistas', label: 'Popularidad' },
              { key: 'duracion', label: 'Duración' }
            ].map((opcion) => (
              <button
                key={opcion.key}
                onClick={() => handleOrdenamiento(opcion.key as FiltrosBusqueda['ordenarPor'])}
                className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                  filtros.ordenarPor === opcion.key
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {opcion.label}
                {filtros.ordenarPor === opcion.key && (
                  filtros.ordenDireccion === 'desc' ? 
                    <SortDesc className="w-3 h-3 ml-1" /> : 
                    <SortAsc className="w-3 h-3 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de audiolibros */}
        {audiolibros.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron audiolibros
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros de búsqueda o explora otras categorías.
            </p>
          </div>
        ) : (
          <div className={vistaLista ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
            {audiolibros.map((audiolibro, index) => (
              <AudiolibroCard
                key={`${audiolibro.titulo}-${index}`}
                audiolibro={audiolibro}
                mostrarAutor={true}
                tamano={vistaLista ? 'pequeno' : 'mediano'}
              />
            ))}
          </div>
        )}

        {/* Paginación simple */}
        {audiolibros.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Mostrando {audiolibros.length} de {obtenerTodosLosAudiolibros().length} audiolibros
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaTodos;
