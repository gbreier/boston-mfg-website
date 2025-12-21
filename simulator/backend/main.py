from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
from . import helpers

app = FastAPI()

# Serve static files from the frontend directory
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), '../frontend'), html=True), name="static")

# Serve frontend HTML files
frontend_dir = os.path.join(os.path.dirname(__file__), '../frontend')

class FindSupplierRequest(BaseModel):
    partNumber: str

class DisruptionAnalysisRequest(BaseModel):
    bom: str = None
    kpi: str = None
    openText: str = None
    mode: str = None  # 'comprehensive' or 'fast'

class DisruptionExplainRequest(BaseModel):
    scenarioId: str
    scenarioDescription: str
    affectedComponents: str = None
    possibleDelay: str = None
    probability: str = None
    explainableDetails: str = None
    bom: str = None
    kpi: str = None
    openText: str = None
    mode: str = None  # 'comprehensive' or 'fast'

class MitigationPlanRequest(BaseModel):
    scenarioId: str
    recommendation: str
    bom: str = None
    kpi: str = None
    openText: str = None
    scenarioDescription: str = None
    affectedComponents: str = None
    possibleDelay: str = None
    probability: str = None
    explainableDetails: str = None
    scenarioExplanation: str = None
    userInput: dict = None
    mode: str = None  # 'comprehensive' or 'fast'

class NewsGenerationRequest(BaseModel):
    prompt: str

class SupplierEvaluationRequest(BaseModel):
    partNumber: str
    supplierData: str
    selectedSuppliers: list = []
    mode: str = None  # 'comprehensive' or 'fast'

class ComponentInfoRequest(BaseModel):
    partNumber: str

class AIActionRequest(BaseModel):
    actionType: str
    actionDescription: str
    scenarioId: str = None
    scenarioDescription: str = None
    affectedComponents: str = None
    bomData: str = None
    userContext: str = None
    mode: str = None  # 'comprehensive' or 'fast'

class ContactRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    company: str = None
    subject: str
    message: str

@app.get("/api/model-modes")
def get_model_modes():
    """API endpoint to get available AI model modes."""
    return {
        "modes": helpers.MODEL_CONFIGS,
        "default": helpers.DEFAULT_MODE
    }

@app.post("/api/find-supplier")
def find_supplier(req: FindSupplierRequest):
    """API endpoint to find suppliers for a part number."""
    try:
        return helpers.find_supplier(req.partNumber)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/disruption-analysis")
def disruption_analysis(req: DisruptionAnalysisRequest):
    """API endpoint for disruption analysis."""
    try:
        return helpers.disruption_analysis(req.bom, req.kpi, req.openText, req.mode)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/disruption-explain")
def disruption_explain(req: DisruptionExplainRequest):
    """API endpoint for detailed disruption scenario explanation."""
    try:
        return helpers.disruption_explain(
            req.scenarioId, 
            req.bom, 
            req.kpi, 
            req.openText, 
            req.scenarioDescription,
            req.affectedComponents,
            req.possibleDelay,
            req.probability,
            req.explainableDetails,
            req.mode
        )
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/mitigation-plan")
def mitigation_plan(req: MitigationPlanRequest):
    """API endpoint for detailed mitigation action plan."""
    try:
        return helpers.mitigation_plan(
            req.scenarioId, 
            req.recommendation, 
            req.bom, 
            req.kpi, 
            req.openText, 
            req.scenarioDescription, 
            req.affectedComponents,
            req.possibleDelay,
            req.probability,
            req.explainableDetails,
            req.scenarioExplanation,
            req.userInput,
            req.mode
        )
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/generate-supply-chain-news")
def generate_supply_chain_news(req: NewsGenerationRequest):
    """API endpoint for generating AI-powered supply chain news headlines."""
    try:
        return helpers.generate_supply_chain_news(req.prompt)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/evaluate-suppliers")
def evaluate_suppliers(req: SupplierEvaluationRequest):
    """API endpoint for evaluating and comparing suppliers."""
    try:
        return helpers.evaluate_suppliers(req.partNumber, req.supplierData, req.selectedSuppliers, req.mode)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/component-info")
def component_info(req: ComponentInfoRequest):
    """API endpoint for getting detailed component information and image."""
    try:
        return helpers.get_component_info(req.partNumber)
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/ai-action")
def ai_action(req: AIActionRequest):
    """API endpoint for generating AI-assisted action content."""
    try:
        return helpers.generate_ai_action(
            req.actionType,
            req.actionDescription,
            req.scenarioId,
            req.scenarioDescription,
            req.affectedComponents,
            req.bomData,
            req.userContext,
            req.mode
        )
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/contact")
def contact_form(req: ContactRequest):
    """API endpoint for handling contact form submissions."""
    try:
        return helpers.handle_contact_form(
            req.firstName,
            req.lastName,
            req.email,
            req.company,
            req.subject,
            req.message
        )
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/test-openai")
def test_openai():
    """Test endpoint to check OpenAI API connectivity."""
    try:
        # Test the OpenAI API directly
        result = helpers.make_openai_request("Say 'API test successful'", 50)
        return {
            "success": True,
            "message": "OpenAI API is working",
            "response": result,
            "api_key_prefix": helpers.OPENAI_API_KEY[:20] + "..." if helpers.OPENAI_API_KEY else "None"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "api_key_prefix": helpers.OPENAI_API_KEY[:20] + "..." if helpers.OPENAI_API_KEY else "None"
        }

@app.get("/")
def read_index():
    """Serve the login page as the default entry point."""
    return FileResponse(os.path.join(frontend_dir, "login.html"))

@app.get("/index.html")
def serve_index():
    """Serve the main index.html file."""
    return FileResponse(os.path.join(frontend_dir, "index.html"))

@app.get("/disruption.html")
def serve_disruption():
    """Serve the disruption.html page."""
    return FileResponse(os.path.join(frontend_dir, "disruption.html"))

@app.get("/disruption-result.html")
def serve_disruption_result():
    """Serve the disruption-result.html page."""
    return FileResponse(os.path.join(frontend_dir, "disruption-result.html"))

@app.get("/test-enhanced-scenarios.html")
def serve_test_enhanced_scenarios():
    """Serve the test-enhanced-scenarios.html page."""
    return FileResponse(os.path.join(frontend_dir, "test-enhanced-scenarios.html"))

@app.get("/mitigation-plan.html")
def serve_mitigation_plan():
    """Serve the mitigation-plan.html page."""
    return FileResponse(os.path.join(frontend_dir, "mitigation-plan.html"))

@app.get("/supplier-evaluation.html")
def serve_supplier_evaluation():
    """Serve the supplier-evaluation.html page."""
    return FileResponse(os.path.join(frontend_dir, "supplier-evaluation.html"))

@app.get("/contact.html")
def serve_contact():
    """Serve the contact.html page."""
    return FileResponse(os.path.join(frontend_dir, "contact.html"))

@app.get("/login.html")
def serve_login():
    """Serve the login.html page."""
    return FileResponse(os.path.join(frontend_dir, "login.html"))

@app.get("/chainvision-logo.svg")
def serve_logo():
    """Serve the ChainVision logo."""
    return FileResponse(os.path.join(frontend_dir, "chainvision-logo.svg"))

@app.get("/bmg-logo.svg")
def serve_old_logo():
    """Serve the old BMG logo (for backward compatibility)."""
    return FileResponse(os.path.join(frontend_dir, "bmg-logo.svg"))

# Mount frontend directory for any remaining static files
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend") 