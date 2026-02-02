'use client';

import { useEffect } from 'react';

/**
 * Performance Monitor Component
 * Logs performance metrics in development mode
 */
export function PerformanceMonitor() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            // Monitor page load performance
            if (typeof window !== 'undefined' && 'performance' in window) {
                window.addEventListener('load', () => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    const renderTime = perfData.domComplete - perfData.domLoading;

                    console.log('🚀 Performance Metrics:');
                    console.log(`📊 Total Page Load Time: ${pageLoadTime}ms`);
                    console.log(`🔌 Server Connection Time: ${connectTime}ms`);
                    console.log(`🎨 DOM Render Time: ${renderTime}ms`);

                    // Warning if page load is too slow
                    if (pageLoadTime > 3000) {
                        console.warn('⚠️ WARNING: Page load time exceeds 3 seconds!');
                    }
                });
            }

            // Monitor API calls (RTK Query)
            const originalFetch = window.fetch;
            let apiCallCount = 0;

            window.fetch = async (...args) => {
                apiCallCount++;
                const startTime = performance.now();

                try {
                    const response = await originalFetch(...args);
                    const endTime = performance.now();
                    const duration = endTime - startTime;

                    console.log(`🌐 API Call #${apiCallCount}: ${args[0]} (${duration.toFixed(2)}ms)`);

                    if (apiCallCount > 20) {
                        console.warn(`⚠️ WARNING: ${apiCallCount} API calls detected! This may cause performance issues.`);
                    }

                    return response;
                } catch (error) {
                    console.error(`❌ API Call Failed: ${args[0]}`, error);
                    throw error;
                }
            };
        }
    }, []);

    return null; // This component doesn't render anything
}
