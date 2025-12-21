# Quick Start: MySimulator Backend

The simulator requires the Python backend to be running for the analysis to work.

## Start the Backend

### Option 1: Using the Startup Script (Easiest)

```bash
./start-simulator.sh
```

### Option 2: Manual Start

1. **Navigate to simulator directory:**
   ```bash
   cd simulator
   ```

2. **Create virtual environment (if not exists):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up API key:**
   ```bash
   # Copy the example file
   cp env.example ChatGPT.API.env
   
   # Edit ChatGPT.API.env and add your OpenAI API key:
   # OPENAI_API_KEY=your_api_key_here
   ```

5. **Start the backend:**
   ```bash
   python start.py
   ```

You should see:
```
🚀 Starting Supply Chain Simulator backend...
   Host: 0.0.0.0
   Port: 8000
🌐 Application will be available at:
   ➤ http://localhost:8000
```

## Verify It's Working

Once the backend is running, you can test it:

1. **Check if it's running:**
   ```bash
   curl http://localhost:8000/api/model-modes
   ```

2. **Or visit in browser:**
   - http://localhost:8000/api/model-modes

## Running Both Servers

You need **TWO terminals** running:

**Terminal 1 - Python Backend:**
```bash
cd simulator
python start.py
```

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

Then visit: http://localhost:3000/MySimulator

## Troubleshooting

### Port 8000 already in use
```bash
# Find what's using port 8000
lsof -ti:8000

# Kill it (replace PID with actual process ID)
kill -9 PID
```

### Python not found
```bash
# Check Python version
python3 --version  # Should be 3.8+

# Or try:
python --version
```

### Dependencies not installing
```bash
# Make sure you're in the virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt
```

### API Key Issues
- Make sure `ChatGPT.API.env` exists in the `simulator/` directory
- Check that `OPENAI_API_KEY=your_key_here` is set (no quotes needed)
- The file should be named exactly `ChatGPT.API.env` (not `.env`)

## Production Deployment

For production, you'll need to:
1. Deploy the Python backend separately (e.g., on a VPS, Heroku, Railway, etc.)
2. Set the `SIMULATOR_BACKEND_URL` environment variable in your Next.js deployment
3. Or convert the Python endpoints to Next.js API routes (future enhancement)

