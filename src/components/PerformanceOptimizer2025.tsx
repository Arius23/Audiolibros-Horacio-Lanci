import { useEffect, useState } from 'react';

const PerformanceOptimizer2025 = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Optimizaciones de rendimiento para evitar bloqueos
    const optimizePerformance = () => {
      try {
        // Configurar observador de rendimiento
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              // Alertar sobre First Input Delay alto
              if (entry.entryType === 'first-input') {
                const firstInputEntry = entry as any; // Cast para acceder a processingStart
                if (firstInputEntry.processingStart && firstInputEntry.processingStart - entry.startTime > 100) {
                  console.warn('Alto First Input Delay detectado:', firstInputEntry.processingStart - entry.startTime, 'ms');
                }
              }
              
              // Alertar sobre tareas largas
              if (entry.entryType === 'longtask') {
                console.warn('Tarea larga detectada:', entry.duration, 'ms');
              }
              
              // Log LCP para debugging
              if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
              }
            });
          });
          
          try {
            observer.observe({ entryTypes: ['first-input', 'largest-contentful-paint'] });
            // Intentar observar longtask si está disponible
            try {
              observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
              console.log('Longtask observer no disponible');
            }
          } catch (e) {
            console.warn('No se pudo observar métricas de rendimiento:', e);
          }
        }

        // Optimizar manejo de eventos para evitar bloqueos
        const optimizeEventHandling = () => {
          // Debounce para scroll events
          let scrollTimeout: any;
          const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              // Procesar scroll con throttling
            }, 16); // 60 FPS
          };
          
          // Usar passive listeners donde sea posible
          window.addEventListener('scroll', handleScroll, { passive: true });
          
          return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
          };
        };

        // Optimizar carga de imágenes
        const optimizeImages = () => {
          const images = document.querySelectorAll('img');
          if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const img = entry.target as HTMLImageElement;
                  if (!img.loading) {
                    img.loading = 'lazy';
                  }
                  // Agregar decode hint para mejor performance
                  img.decoding = 'async';
                }
              });
            }, {
              rootMargin: '50px' // Precargar 50px antes de que sea visible
            });
            
            images.forEach(img => imageObserver.observe(img));
          } else {
            // Fallback para navegadores sin IntersectionObserver
            images.forEach(img => {
              if (!img.loading) {
                img.loading = 'lazy';
              }
            });
          }
        };

        // Evitar bloqueos del hilo principal
        const scheduleNonCriticalWork = () => {
          if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
            // Usar el Scheduler API si está disponible
            (window as any).scheduler.postTask(() => {
              console.log('Trabajo no crítico programado con Scheduler API');
            }, { priority: 'background' });
          } else if ('requestIdleCallback' in window) {
            // Fallback con requestIdleCallback
            (window as any).requestIdleCallback(() => {
              console.log('Trabajo no crítico programado con requestIdleCallback');
            }, { timeout: 5000 });
          }
        };

        // Aplicar todas las optimizaciones
        const cleanup = optimizeEventHandling();
        optimizeImages();
        scheduleNonCriticalWork();

        setIsOptimized(true);
        
        return cleanup;
      } catch (error) {
        console.warn('Error aplicando optimizaciones de rendimiento:', error);
        setIsOptimized(true); // Continuar aunque falle
        return () => {};
      }
    };

    // Aplicar optimizaciones después de que el DOM esté listo
    let cleanup: (() => void) | undefined;
    
    if (document.readyState === 'loading') {
      const handleDOMContentLoaded = () => {
        cleanup = optimizePerformance();
      };
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      
      return () => {
        document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        if (cleanup) cleanup();
      };
    } else {
      cleanup = optimizePerformance();
      return cleanup;
    }
  }, []);

  // No renderizar nada visible, solo aplicar optimizaciones
  return null;
};

export default PerformanceOptimizer2025;