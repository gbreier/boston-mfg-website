/**
 * API Configuration for MySimulator
 * This script updates all API calls to use the Next.js API routes
 */

(function() {
  'use strict';
  
  // Base API URL - use Next.js API routes
  const API_BASE = '/api/MySimulator';
  
  // Override fetch to intercept API calls
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // If it's an API call (starts with /api/), update it to use MySimulator route
    if (typeof url === 'string' && url.startsWith('/api/')) {
      // Remove leading /api/ and add our base
      const apiPath = url.replace(/^\/api\//, '');
      url = `${API_BASE}/${apiPath}`;
    }
    
    return originalFetch.call(this, url, options);
  };
  
  // Also handle XMLHttpRequest if needed
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.startsWith('/api/')) {
      const apiPath = url.replace(/^\/api\//, '');
      url = `${API_BASE}/${apiPath}`;
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
  
  console.log('MySimulator API configuration loaded. API calls will use:', API_BASE);
})();

