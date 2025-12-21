// Next.js API route that proxies requests to the Python FastAPI backend
// This allows the simulator to work at /MySimulator while using the Python backend

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path || '';
  
  // Get the base URL for the Python backend
  // In production, set SIMULATOR_BACKEND_URL environment variable
  // For local development, defaults to localhost:8000
  const backendUrl = process.env.SIMULATOR_BACKEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'http://localhost:8000'  // Update this for production
      : 'http://localhost:8000');
  
  // Construct the full URL
  const url = `${backendUrl}/api/${apiPath}`;
  
  try {
    // Forward the request to the Python backend
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    
    // Forward the response
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying to simulator backend:', error);
    console.error('Backend URL attempted:', url);
    
    // Provide helpful error message
    const errorMessage = error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')
      ? 'The simulator backend is not running. Please start it first.'
      : error.message;
    
    res.status(503).json({ 
      error: 'Failed to connect to simulator backend',
      message: errorMessage,
      hint: 'To start the backend, run: cd simulator && python start.py',
      backendUrl: url,
      troubleshooting: {
        step1: 'Make sure Python 3 is installed',
        step2: 'Navigate to the simulator directory: cd simulator',
        step3: 'Install dependencies: pip install -r requirements.txt',
        step4: 'Set up your OpenAI API key in ChatGPT.API.env',
        step5: 'Start the backend: python start.py'
      }
    });
  }
}

