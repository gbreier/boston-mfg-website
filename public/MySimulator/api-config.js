/**
 * API Configuration for MySimulator
 * This script updates all API calls to use either local backend or Next.js API routes
 */

(function() {
  'use strict';
  
  // Check if we should use local simulator (set by ai-analysis page)
  const useLocalSimulator = localStorage.getItem('useLocalSimulator') === 'true';
  
  // Base API URL - use local backend if available, otherwise Next.js API routes
  const API_BASE = useLocalSimulator ? 'http://localhost:8000/api' : '/api/MySimulator';
  
  // Override fetch to intercept API calls
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // If it's an API call (starts with /api/), update it to use appropriate route
    if (typeof url === 'string' && url.startsWith('/api/')) {
      if (useLocalSimulator) {
        // Use local backend directly
        const apiPath = url.replace(/^\/api\//, '');
        url = `http://localhost:8000/api/${apiPath}`;
      } else {
        // Use Next.js proxy
        const apiPath = url.replace(/^\/api\//, '');
        url = `/api/MySimulator/${apiPath}`;
      }
    }
    
    return originalFetch.call(this, url, options);
  };
  
  // Also handle XMLHttpRequest if needed
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.startsWith('/api/')) {
      if (useLocalSimulator) {
        const apiPath = url.replace(/^\/api\//, '');
        url = `http://localhost:8000/api/${apiPath}`;
      } else {
        const apiPath = url.replace(/^\/api\//, '');
        url = `/api/MySimulator/${apiPath}`;
      }
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
  
  console.log('MySimulator API configuration loaded. API calls will use:', API_BASE);
  if (useLocalSimulator) {
    console.log('Using LOCAL backend at localhost:8000');
  }
})();

