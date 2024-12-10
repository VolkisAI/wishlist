export const measurePerformance = () => {
  if (typeof window !== 'undefined') {
    // Basic Performance Metrics
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    const paintTiming = performance.getEntriesByType('paint');
    
    console.log('Page Load Metrics:', {
      loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
      firstPaint: paintTiming.find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paintTiming.find(entry => entry.name === 'first-contentful-paint')?.startTime
    });

    // Memory Usage (Chrome only)
    if (performance.memory) {
      console.log('Memory Usage:', {
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
        jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
      });
    }
  }
}; 