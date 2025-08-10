// 性能监控工具
export const performanceMonitor = {
  // 记录页面加载时间
  recordPageLoad: (pageName: string, startTime: number) => {
    const loadTime = performance.now() - startTime;
    console.log(`📊 ${pageName} 加载时间: ${loadTime.toFixed(2)}ms`);

    // 可以在这里添加性能数据上报逻辑
    if (loadTime > 2000) {
      console.warn(`⚠️ ${pageName} 加载时间过长: ${loadTime.toFixed(2)}ms`);
    }
  },

  // 记录缓存命中率
  recordCacheHit: (cacheType: string, hit: boolean) => {
    console.log(`💾 缓存${hit ? "命中" : "未命中"}: ${cacheType}`);
  },

  // 记录API请求时间
  recordApiRequest: (apiName: string, startTime: number) => {
    const requestTime = performance.now() - startTime;
    console.log(`🌐 ${apiName} 请求时间: ${requestTime.toFixed(2)}ms`);
  },

  // 记录预加载效果
  recordPreloadEffect: (
    documentAlias: string,
    preloadTime: number,
    actualLoadTime: number,
  ) => {
    const improvement = preloadTime - actualLoadTime;
    console.log(
      `⚡ 预加载效果 - ${documentAlias}: 提升 ${improvement.toFixed(2)}ms`,
    );
  },
};

// React Hook 用于性能监控
export function usePerformanceMonitor(pageName: string) {
  const startTime = performance.now();

  const recordLoad = () => {
    performanceMonitor.recordPageLoad(pageName, startTime);
  };

  const recordApiCall = (apiName: string, startTime: number) => {
    performanceMonitor.recordApiRequest(apiName, startTime);
  };

  return {
    recordLoad,
    recordApiCall,
    startTime,
  };
}
