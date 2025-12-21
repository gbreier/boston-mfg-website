# AI Supply Chain Simulator

This is the integrated AI Supply Chain Analysis Simulator for Boston Manufacturing Group.

## Quick Start

### Option 1: Using the Startup Script (Recommended)

From the project root:
```bash
./start-simulator.sh
```

### Option 2: Manual Start

1. **Navigate to the simulator directory:**
   ```bash
   cd simulator
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `env.example` to `ChatGPT.API.env`
   - Add your OpenAI API key: `OPENAI_API_KEY=your_api_key_here`

5. **Start the server:**
   ```bash
   python start.py
   ```

The simulator will be available at: **http://localhost:8000**

## Accessing the Simulator

Once the simulator is running, you can access it from:
- The AI Supply Chain Analysis page: `/ai-analysis`
- Direct URL: `http://localhost:8000`

## Features

- **Supplier Discovery**: Find suppliers for electronic and mechanical components
- **Disruption Analysis**: Generate realistic supply chain disruption scenarios
- **BOM Analysis**: Upload and analyze Bill of Materials (BOM) files
- **Mitigation Planning**: Develop detailed action plans for supply chain disruptions
- **Real-time Risk Assessment**: Evaluate supplier risks and lead times

## Project Structure

```
simulator/
├── backend/          # Python FastAPI backend
│   ├── main.py      # Main API server
│   ├── config.py    # Configuration settings
│   └── helpers.py   # Helper functions
├── frontend/         # HTML/CSS/JS frontend
│   ├── index.html   # Main application page
│   ├── disruption.html
│   └── ...
├── data/            # Sample BOM data
├── start.py         # Startup script
└── requirements.txt # Python dependencies
```

## Configuration

The simulator uses environment variables from `ChatGPT.API.env`:
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: Model to use (default: gpt-5)
- `PORT`: Server port (default: 8000)

## Troubleshooting

- **Port 8000 already in use**: Change the port in `backend/config.py` or stop the conflicting service
- **API key not working**: Verify your OpenAI API key in `ChatGPT.API.env`
- **Dependencies not installing**: Make sure you're using Python 3.9 or higher

## Support

For issues or questions, contact: contact@boston-mfg.com

