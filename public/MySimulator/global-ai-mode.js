/**
 * Global AI Mode Management
 * This script provides functions to get and set the global AI analysis mode
 * across all pages of the application.
 */

// Get the current global AI mode (comprehensive or fast)
function getGlobalAIMode() {
  return localStorage.getItem('globalAIMode') || 'comprehensive';
}

// Set the global AI mode
function setGlobalAIMode(mode) {
  if (mode !== 'comprehensive' && mode !== 'fast') {
    console.warn('Invalid AI mode:', mode, '- defaulting to comprehensive');
    mode = 'comprehensive';
  }
  localStorage.setItem('globalAIMode', mode);
  console.log('Global AI mode set to:', mode);
  return mode;
}

// Initialize mode selector on any page
function initGlobalModeSelector(selectId = 'globalAIMode') {
  const select = document.getElementById(selectId);
  if (select) {
    const savedMode = getGlobalAIMode();
    select.value = savedMode;
    
    // Add change listener if not already added
    if (!select.dataset.listenerAdded) {
      select.addEventListener('change', (e) => {
        setGlobalAIMode(e.target.value);
      });
      select.dataset.listenerAdded = 'true';
    }
  }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initGlobalModeSelector();
  });
}

