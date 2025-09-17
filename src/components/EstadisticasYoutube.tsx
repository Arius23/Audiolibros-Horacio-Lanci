import { Clock, Play, Eye, Heart, RefreshCw, Database } from 'lucide-react'
import { useAudiolibros } from '../hooks/useAudiolibros'

const EstadisticasYoutube = () => {
  const { datos, ultimaActualizacion, cargando } = useAudiolibros()

  if (cargando) {
    return (
      <section className="py-12 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#D7AA4E] border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-300">Cargando estadísticas...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!datos) {
    return null
  }

  const formatearNumero = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatearHoras = (horas: number): string => {
    return Math.round(horas).toString()
  }

  const formatearFecha = (fecha: string | undefined): string => {
    if (!fecha) return 'Datos estáticos'
    
    try {
      const date = new Date(fecha)
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Fecha no disponible'
    }
  }

  const estadisticas = datos.estadisticas_generales.resumen_general

  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-[#D7AA4E] mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Estadísticas en Tiempo Real
            </h2>
          </div>
          <p className="text-gray-300">
            Datos sincronizados automáticamente desde el canal de YouTube
          </p>
          {ultimaActualizacion && (
            <div className="flex items-center justify-center mt-2 text-sm text-gray-400">
              <RefreshCw className="w-4 h-4 mr-1" />
              <span>Última actualización: {formatearFecha(ultimaActualizacion)}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total de Audiolibros */}
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <Play className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {estadisticas.total_audiolibros}
            </div>
            <div className="text-sm text-blue-200">
              Audiolibros
            </div>
          </div>

          {/* Total de Visualizaciones */}
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-md rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatearNumero(estadisticas.total_visualizaciones)}
            </div>
            <div className="text-sm text-green-200">
              Visualizaciones
            </div>
          </div>

          {/* Horas de Contenido */}
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatearHoras(estadisticas.duracion_total_horas)}
            </div>
            <div className="text-sm text-purple-200">
              Horas de Audio
            </div>
          </div>

          {/* Promedio de Vistas */}
          <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-md rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatearNumero(Math.round(estadisticas.promedio_vistas_por_video))}
            </div>
            <div className="text-sm text-yellow-200">
              Vistas Promedio
            </div>
          </div>
        </div>

        {/* Audiolibro Más Popular */}
        <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-md rounded-xl p-6 border border-gray-600/20">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Heart className="w-5 h-5 text-red-400 mr-2" />
            Audiolibro Más Popular
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">
                {estadisticas.video_mas_visto.titulo}
              </p>
              <p className="text-gray-400 text-sm">
                {formatearNumero(estadisticas.video_mas_visto.vistas)} visualizaciones
              </p>
            </div>
          </div>
        </div>

        {/* Nota sobre sincronización */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Las estadísticas se actualizan automáticamente cada día a las 6:00 AM
          </p>
        </div>
      </div>
    </section>
  )
}

export default EstadisticasYoutube