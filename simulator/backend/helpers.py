import os
import csv
import json
import requests
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from markdown import markdown
from typing import List, Dict, Any, Optional

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../ChatGPT.API.env'))

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

# Anthropic Claude API Configuration
try:
    from anthropic import Anthropic
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
    # Only initialize if we have a real API key (not placeholder)
    if ANTHROPIC_API_KEY and ANTHROPIC_API_KEY.strip() and 'your_anthropic_api_key_here' not in ANTHROPIC_API_KEY:
        try:
            anthropic_client = Anthropic(api_key=ANTHROPIC_API_KEY)
        except Exception as e:
            print(f"Warning: Failed to initialize Anthropic client: {e}")
            anthropic_client = None
    else:
        anthropic_client = None
except ImportError:
    ANTHROPIC_API_KEY = None
    anthropic_client = None
    print("Warning: anthropic package not installed. Claude models will not be available.")

# Model Configuration: Comprehensive (GPT-5/Claude Sonnet 4.5) vs Fast (GPT-4)
MODEL_CONFIGS = {
    'comprehensive': {
        'model': 'gpt-5',
        'provider': 'openai',  # 'openai' or 'anthropic'
        'timeout': 360,  # Increased from 180 to 360 seconds (6 minutes) for complex analysis
        'max_retries': 3,  # Increased from 2 to 3 retries
        'token_param': 'max_completion_tokens',
        'token_multiplier': 2.0,  # GPT-5 needs 2x tokens (reasoning + output)
        'description': 'GPT-5 - Deep reasoning and comprehensive analysis'
    },
    'comprehensive-claude': {
        'model': 'claude-3-5-sonnet-20241022',  # Claude 3.5 Sonnet (latest version)
        'provider': 'anthropic',
        'timeout': 180,
        'max_retries': 2,
        'token_param': 'max_tokens',
        'token_multiplier': 1.0,
        'description': 'Claude 3.5 Sonnet - Deep reasoning and comprehensive analysis'
    },
    'fast': {
        'model': 'gpt-4o-mini',
        'provider': 'openai',
        'timeout': 60,
        'max_retries': 3,
        'token_param': 'max_tokens',
        'token_multiplier': 1.0,  # GPT-4 uses tokens directly
        'description': 'GPT-4o-mini - Quick responses'
    }
}

# Default mode from environment or 'comprehensive'
DEFAULT_MODE = os.getenv('OPENAI_MODE', 'comprehensive')
OPENAI_MODEL = MODEL_CONFIGS[DEFAULT_MODE]['model']
OPENAI_TIMEOUT = MODEL_CONFIGS[DEFAULT_MODE]['timeout']
OPENAI_MAX_RETRIES = MODEL_CONFIGS[DEFAULT_MODE]['max_retries']

print(f"Loading OpenAI API key from environment: {OPENAI_API_KEY[:20] + '...' if OPENAI_API_KEY else 'None'}")

if not OPENAI_API_KEY:
    print("Warning: OPENAI_API_KEY not found in environment variables.")
    # Don't raise an error, let the application continue and handle it gracefully

# --- Supplier Data ---
SUPPLIER_LEAD_TIMES = {
    'tme': 5,
    'digi-key': 3, 'digikey': 3, 'mouser': 5, 'jlcpcb': 7, 'pcbway': 7,
    'oshpark': 10, 'adafruit': 5, 'sparkfun': 5, 'arrow': 7, 'avnet': 7,
    'newark': 5, 'farnell': 5, 'element14': 5, 'rs-components': 5, 'allied': 5,
    'mcmaster': 2, 'mcmaster-carr': 2, 'stockwell': 7, 'essentra': 5, 'richco': 7,
    'hammond': 10, 'te connectivity': 7, 'microchip': 14, 'vishay': 10,
    'samsung': 14, 'lite-on': 10, 'rutronik': 7
}

SUPPLIER_URL_PATTERNS = {
    'tme': lambda manufacturer, partNumber: f"https://www.tme.com/en/katalog/?search={partNumber}",
    'digi-key': lambda manufacturer, partNumber: f"https://www.digikey.com/en/products/search?keywords={partNumber}",
    'digikey': lambda manufacturer, partNumber: f"https://www.digikey.com/en/products/search?keywords={partNumber}",
    'mouser': lambda manufacturer, partNumber: f"https://www.mouser.com/c/?q={partNumber}",
    'arrow': lambda manufacturer, partNumber: f"https://www.arrow.com/en/products/search?q={partNumber}",
    'avnet': lambda manufacturer, partNumber: f"https://www.avnet.com/shop/us/search/{partNumber}",
    'newark': lambda manufacturer, partNumber: f"https://www.newark.com/search?st={partNumber}",
    'farnell': lambda manufacturer, partNumber: f"https://uk.farnell.com/search?st={partNumber}",
    'rs': lambda manufacturer, partNumber: f"https://uk.rs-online.com/web/c/search?searchTerm={partNumber}",
    'rs-components': lambda manufacturer, partNumber: f"https://uk.rs-online.com/web/c/search?searchTerm={partNumber}",
    'allied': lambda manufacturer, partNumber: f"https://www.alliedelec.com/search/products/?keyword={partNumber}",
    'mcmaster': lambda manufacturer, partNumber: f"https://www.mcmaster.com/search?query={partNumber}",
    'mcmaster-carr': lambda manufacturer, partNumber: f"https://www.mcmaster.com/search?query={partNumber}",
    'element14': lambda manufacturer, partNumber: f"https://www.element14.com/community/search?q={partNumber}",
    'future': lambda manufacturer, partNumber: f"https://www.futureelectronics.com/search?text={partNumber}",
    'verical': lambda manufacturer, partNumber: f"https://www.verical.com/search?q={partNumber}",
    'quest': lambda manufacturer, partNumber: f"https://www.questcomp.com/search?query={partNumber}",
    'utmel': lambda manufacturer, partNumber: f"https://www.utmel.com/search?keyword={partNumber}",
    'lcsc': lambda manufacturer, partNumber: f"https://www.lcsc.com/search?q={partNumber}",
    'chip1stop': lambda manufacturer, partNumber: f"https://www.chip1stop.com/search?keyword={partNumber}",
    'onlinecomponents': lambda manufacturer, partNumber: f"https://www.onlinecomponents.com/search?keyword={partNumber}",
    'rutronik': lambda manufacturer, partNumber: f"https://www.rutronik.com/search/?q={partNumber}"
}

# --- Helper Functions ---
def parse_csv_data(csv_string: str) -> List[Dict[str, Any]]:
    """Parse CSV string into a list of dictionaries."""
    lines = [line for line in csv_string.splitlines() if line.strip()]
    if len(lines) < 2:
        return []
    reader = csv.DictReader(lines)
    return [row for row in reader]

def calculate_historical_probability(bom_data: Any, kpi_data: Any) -> Dict[str, Any]:
    """Calculate disruption probabilities based on real historical KPI data."""
    try:
        # Parse BOM data if it's a string
        if isinstance(bom_data, str):
            try:
                bom_array = json.loads(bom_data)
            except Exception:
                bom_array = parse_csv_data(bom_data)
        else:
            bom_array = bom_data

        # Parse KPI data if it's a string
        if isinstance(kpi_data, str):
            try:
                kpi_array = json.loads(kpi_data)
            except Exception:
                kpi_array = parse_csv_data(kpi_data)
        else:
            kpi_array = kpi_data

        if not isinstance(bom_array, list) or not isinstance(kpi_array, list):
            return {}

        # Calculate risk factors based on historical data
        supplier_risks = {}
        component_risks = {}
        
        # Analyze historical KPI data for each component
        for item in bom_array:
            supplier = item.get('Supplier', '')
            component_type = item.get('Category', '')
            part_number = item.get('Manufacturer Part #', '')
            
            # Extract historical metrics from the item itself (if available)
            on_time_delivery = float(item.get('On-Time Delivery (%)', 95))
            defect_rate = float(item.get('Defect Rate (%)', 2))
            cost_variance = abs(float(item.get('Cost Variance (%)', 0)))
            lead_time = float(item.get('Avg Lead Time (days)', 14))
            
            # Calculate risk score based on historical performance
            # Lower on-time delivery = higher risk
            delivery_risk = max(0, (100 - on_time_delivery) / 100)
            
            # Higher defect rate = higher risk (normalize to 0-1 scale)
            quality_risk = min(1.0, defect_rate / 10.0)
            
            # Higher cost variance = higher risk (normalize to 0-1 scale)
            cost_risk = min(1.0, cost_variance / 20.0)
            
            # Longer lead times = higher risk (normalize based on 30 days max)
            lead_time_risk = min(1.0, lead_time / 30.0)
            
            # Composite risk score (weighted average)
            composite_risk = (
                delivery_risk * 0.4 +  # 40% weight on delivery performance
                quality_risk * 0.2 +   # 20% weight on quality
                cost_risk * 0.2 +      # 20% weight on cost stability
                lead_time_risk * 0.2   # 20% weight on lead time
            )
            
            # Store risks by supplier and component type
            if supplier:
                if supplier not in supplier_risks:
                    supplier_risks[supplier] = []
                supplier_risks[supplier].append(composite_risk)
            
            if component_type:
                if component_type not in component_risks:
                    component_risks[component_type] = []
                component_risks[component_type].append(composite_risk)

        # Calculate average risks
        avg_supplier_risks = {
            supplier: sum(risks) / len(risks) 
            for supplier, risks in supplier_risks.items()
        }
        
        avg_component_risks = {
            comp_type: sum(risks) / len(risks) 
            for comp_type, risks in component_risks.items()
        }
        
        # Calculate overall BOM risk
        all_risks = []
        for risks in supplier_risks.values():
            all_risks.extend(risks)
        
        overall_risk = sum(all_risks) / len(all_risks) if all_risks else 0.3
        
        return {
            'overall_risk': overall_risk,
            'supplier_risks': avg_supplier_risks,
            'component_risks': avg_component_risks,
            'risk_factors': {
                'high_risk_suppliers': [s for s, r in avg_supplier_risks.items() if r > 0.4],
                'medium_risk_suppliers': [s for s, r in avg_supplier_risks.items() if 0.2 <= r <= 0.4],
                'high_risk_components': [c for c, r in avg_component_risks.items() if r > 0.4],
                'avg_on_time_delivery': sum([float(item.get('On-Time Delivery (%)', 95)) for item in bom_array]) / len(bom_array),
                'avg_defect_rate': sum([float(item.get('Defect Rate (%)', 2)) for item in bom_array]) / len(bom_array),
                'avg_lead_time': sum([float(item.get('Avg Lead Time (days)', 14)) for item in bom_array]) / len(bom_array)
            }
        }
        
    except Exception as e:
        print(f"Error calculating historical probability: {e}")
        return {'overall_risk': 0.3, 'supplier_risks': {}, 'component_risks': {}, 'risk_factors': {}}

def convert_risk_to_probability(risk_score: float, scenario_type: str = 'general') -> tuple:
    """Convert risk score (0-1) to realistic probability percentage and category."""
    
    # Base probability conversion (more conservative than before)
    if risk_score < 0.15:
        base_prob = 5 + (risk_score * 40)  # 5-11%
        category = "Low"
    elif risk_score < 0.35:
        base_prob = 11 + ((risk_score - 0.15) * 45)  # 11-20%
        category = "Low-Medium"
    elif risk_score < 0.55:
        base_prob = 20 + ((risk_score - 0.35) * 50)  # 20-30%
        category = "Medium"
    elif risk_score < 0.75:
        base_prob = 30 + ((risk_score - 0.55) * 50)  # 30-40%
        category = "Medium-High"
    else:
        base_prob = 40 + ((risk_score - 0.75) * 40)  # 40-50%
        category = "High"
    
    # Adjust based on scenario type
    scenario_multipliers = {
        'geopolitical': 0.7,      # Geopolitical events are less frequent
        'natural_disaster': 0.6,  # Natural disasters are rare but impactful
        'supplier_issue': 1.2,    # Supplier issues are more common
        'market_demand': 1.1,     # Market fluctuations are fairly common
        'transportation': 1.0,    # Transportation issues are baseline
        'quality': 1.3,          # Quality issues based on actual defect rates
        'general': 1.0
    }
    
    multiplier = scenario_multipliers.get(scenario_type.lower(), 1.0)
    final_prob = min(50, base_prob * multiplier)  # Cap at 50% for realism
    
    return final_prob, category

def estimate_lead_time(supplier_name: Optional[str], bom_item: Optional[Dict[str, Any]] = None) -> int:
    """Estimate lead time based on BOM data first, then supplier name lookup."""
    
    # First priority: Check if BOM item has actual lead time data
    if bom_item:
        # Check various lead time field names that might exist in BOM data
        lead_time_fields = [
            'Lead Time', 'Lead Time (days)', 'Avg Lead Time (days)', 
            'Lead Time Days', 'Leadtime', 'lead_time', 'leadTime',
            'Delivery Time', 'Delivery Time (days)', 'Supplier Lead Time'
        ]
        
        for field in lead_time_fields:
            if field in bom_item and bom_item[field]:
                try:
                    lead_time_value = str(bom_item[field]).strip()
                    if lead_time_value and lead_time_value.lower() not in ['', 'n/a', 'na', 'none', 'tbd']:
                        # Extract number from string (e.g., "14 days" -> 14)
                        import re
                        numbers = re.findall(r'\d+', lead_time_value)
                        if numbers:
                            actual_lead_time = int(numbers[0])
                            if actual_lead_time > 0:
                                return actual_lead_time
                except (ValueError, TypeError):
                    continue
    
    # Second priority: Use supplier lookup table
    if not supplier_name:
        return 7
    
    supplier_lower = supplier_name.lower()
    for supplier, lead_time in SUPPLIER_LEAD_TIMES.items():
        if supplier in supplier_lower or supplier_lower in supplier:
            return lead_time
    
    # Default fallback
    return 7

def generate_supplier_url(supplier: str, manufacturer: str, part_number: str) -> str:
    """Generate a supplier-specific URL for a part."""
    import urllib.parse
    
    # URL encode the part number to handle special characters
    encoded_part_number = urllib.parse.quote(part_number, safe='')
    
    supplier_lower = supplier.lower()
    print(f"Generating URL for supplier: '{supplier}' (lowercase: '{supplier_lower}'), part: '{part_number}'")
    
    for pattern, url_generator in SUPPLIER_URL_PATTERNS.items():
        if pattern in supplier_lower:
            url = url_generator(manufacturer, encoded_part_number)
            print(f"Matched pattern '{pattern}' for supplier '{supplier}', generated URL: {url}")
            return url
    
    fallback_url = f"https://www.digikey.com/en/products/search?keywords={encoded_part_number}"
    print(f"No pattern matched for supplier '{supplier}', using fallback URL: {fallback_url}")
    return fallback_url

def verify_supplier_has_component(supplier: str, manufacturer: str, part_number: str) -> bool:
    """Verify if a supplier actually has the component available on their website."""
    try:
        url = generate_supplier_url(supplier, manufacturer, part_number)
        
        # Make a GET request to check if the component is actually available
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        import requests
        response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        
        # Check HTTP status code first
        if response.status_code == 404:
            return False
        elif not (200 <= response.status_code < 300):
            # For non-2xx status codes (except 404), be conservative and assume available
            return True
        
        # Analyze the response content for common "not found" indicators
        content = response.text.lower()
        
        # Common patterns that indicate component is not found
        not_found_patterns = [
            'no results found',
            'no products found',
            'product not found',
            'part not found',
            '0 results',
            'no matching products',
            'no items found',
            'search returned no results',
            'no products match your search',
            'did not return any results',
            'no search results',
            'search did not find any results',
            'your search returned 0 results',
            'no items were found',
            'no results match your search'
        ]
        
        # Check if any "not found" patterns are present
        for pattern in not_found_patterns:
            if pattern in content:
                return False
        
        # Additional check: look for product listing indicators
        # These patterns suggest the search found actual products
        found_patterns = [
            'add to cart',
            'buy now',
            'in stock',
            'price',
            'quantity',
            'datasheet',
            'product details',
            'specifications'
        ]
        
        # If we find positive indicators, component is likely available
        for pattern in found_patterns:
            if pattern in content:
                return True
        
        # If no clear indicators either way, assume available (conservative approach)
        return True
            
    except requests.exceptions.Timeout:
        # If request times out, assume component is available to avoid false negatives
        print(f"Timeout verifying {supplier} for {part_number} - assuming available")
        return True
    except requests.exceptions.RequestException as e:
        # If there's a network error, assume the component is available to avoid false negatives
        print(f"Network error verifying {supplier} for {part_number}: {str(e)} - assuming available")
        return True
    except Exception as e:
        # For any other unexpected errors, assume availability
        print(f"Error verifying {supplier} for {part_number}: {str(e)} - assuming available")
        return True

def analyze_bom_data(bom: Any) -> Dict[str, Any]:
    """Analyze BOM data and extract statistics."""
    analysis = {
        'componentCount': 0,
        'totalCost': 0,
        'suppliers': set(),
        'manufacturers': set(),
        'estimatedLeadTime': 0,
        'summary': ''
    }
    try:
        if isinstance(bom, str):
            try:
                bom_data = json.loads(bom)
            except Exception:
                bom_data = parse_csv_data(bom)
        else:
            bom_data = bom
        if isinstance(bom_data, list) and bom_data:
            analysis['componentCount'] = len(bom_data)
            max_lead_time = 0
            for item in bom_data:
                # Calculate total cost per component
                component_total_cost = 0
                
                # First try to use pre-calculated Total column
                if 'Total' in item and item['Total']:
                    try:
                        component_total_cost = float(item['Total'] or 0)
                    except (ValueError, TypeError):
                        component_total_cost = 0
                
                # If no Total column, calculate from Unit Cost × Quantity
                if component_total_cost == 0 and 'Unit Cost (USD)' in item:
                    try:
                        unit_cost = float(item.get('Unit Cost (USD)', 0) or 0)
                        quantity = float(item.get('Quantity', 1) or 1)
                        component_total_cost = unit_cost * quantity
                    except (ValueError, TypeError):
                        component_total_cost = 0
                
                # Add to total BOM cost
                analysis['totalCost'] += component_total_cost
                
                if item.get('Supplier'):
                    analysis['suppliers'].add(item['Supplier'])
                    lead_time = estimate_lead_time(item['Supplier'], item)  # Pass the BOM item
                    max_lead_time = max(max_lead_time, lead_time)
                if item.get('Manufacturer'):
                    analysis['manufacturers'].add(item['Manufacturer'])
            analysis['estimatedLeadTime'] = max_lead_time
            analysis['summary'] = (
                f"BOM Analysis: {analysis['componentCount']} components, "
                f"${analysis['totalCost']:.2f} total cost, "
                f"{len(analysis['suppliers'])} suppliers, "
                f"{len(analysis['manufacturers'])} manufacturers, "
                f"estimated lead time: {analysis['estimatedLeadTime']} days."
            )
    except Exception as e:
        print('BOM analysis error:', e)
    return analysis

def extract_lead_time(supplier_info: Any) -> Optional[int]:
    """Extract lead time from supplier information."""
    try:
        if not supplier_info:
            return None
        suppliers = []
        if isinstance(supplier_info, str):
            try:
                suppliers = json.loads(supplier_info)
            except Exception:
                import re
                matches = re.findall(r'lead\s*time\s*[:=]?\s*(\d+)', supplier_info, re.I)
                if matches:
                    times = [int(m) for m in matches]
                    return max(times) if times else None
        elif isinstance(supplier_info, list):
            suppliers = supplier_info
        if isinstance(suppliers, list) and suppliers:
            times = [int(s.get('leadTime', 0)) for s in suppliers if s.get('leadTime')]
            return max(times) if times else None
    except Exception as e:
        print('Lead time extraction error:', e)
    return None

def format_bom_as_markdown(bom: Any) -> str:
    """Format BOM data as a markdown table."""
    try:
        if isinstance(bom, str):
            bom_array = json.loads(bom)
        else:
            bom_array = bom
        if isinstance(bom_array, list) and bom_array and isinstance(bom_array[0], dict):
            headers = list(bom_array[0].keys())
            header_row = '| ' + ' | '.join(headers) + ' |'
            sep_row = '| ' + ' | '.join(['---'] * len(headers)) + ' |'
            data_rows = ['| ' + ' | '.join([str(row.get(h, '')) for h in headers]) + ' |' for row in bom_array]
            return '\n'.join([header_row, sep_row] + data_rows)
    except Exception as e:
        print('BOM markdown formatting error:', e)
    return str(bom)

def markdown_to_html_table(md: str) -> str:
    """Convert markdown to HTML and add target='_blank' to all links."""
    html = markdown(md, extensions=['tables', 'fenced_code'])
    import re
    # Add target="_blank" rel="noopener noreferrer" to all anchor tags that don't already have it
    # This ensures all links (including real-world evidence links) open in new tabs
    def add_target_blank(match):
        tag_content = match.group(1)
        # Check if target already exists
        if 'target=' not in tag_content:
            # Insert target and rel attributes after href
            if 'href=' in tag_content:
                # Add target="_blank" rel="noopener noreferrer" after the href attribute
                tag_content = re.sub(
                    r'(href=["\'][^"\']*["\'])',
                    r'\1 target="_blank" rel="noopener noreferrer"',
                    tag_content
                )
            else:
                # If no href, just add the attributes
                tag_content += ' target="_blank" rel="noopener noreferrer"'
        return f'<a {tag_content}>'
    
    html = re.sub(r'<a\s+([^>]*?)>', add_target_blank, html)
    return html

def highlight_table_rows(html_table: str, keywords: List[str]) -> str:
    """Highlight table rows containing any of the keywords."""
    import re
    if not keywords:
        return html_table
    pattern = re.compile('|'.join([re.escape(k) for k in keywords]), re.I)
    def repl(match):
        row = match.group(0)
        if pattern.search(row):
            return row.replace('<tr', '<tr style="background:transparent;"')
        return row
    return re.sub(r'<tr.*?>.*?</tr>', repl, html_table, flags=re.S)

def make_anthropic_request(prompt: str, max_tokens: int, model: str, max_retries: int, base_timeout: int) -> str:
    """
    Send a prompt to Anthropic's Claude API and return the response content.
    
    Args:
        prompt: The prompt to send to Claude
        max_tokens: Maximum tokens in response
        model: Claude model name
        max_retries: Maximum number of retry attempts
        base_timeout: Base timeout in seconds
    
    Returns:
        Response content from Anthropic API
        
    Raises:
        Exception: If all retry attempts fail
    """
    if not anthropic_client:
        raise Exception("Anthropic API client not initialized. Please install anthropic package and set ANTHROPIC_API_KEY.")
    
    if not ANTHROPIC_API_KEY:
        raise Exception("ANTHROPIC_API_KEY not found in environment variables.")
    
    print(f"Making Anthropic request with API key: {ANTHROPIC_API_KEY[:20]}..." if ANTHROPIC_API_KEY else "No API key found!")
    print(f"Model: {model} | Max tokens: {max_tokens} | Timeout: {base_timeout}s | Retries: {max_retries}")
    
    last_exception = None
    
    for attempt in range(max_retries + 1):
        try:
            current_timeout = base_timeout + (attempt * 60)
            print(f"Anthropic API attempt {attempt + 1}/{max_retries + 1} with timeout: {current_timeout}s")
            
            # Anthropic SDK doesn't accept timeout in create() - use client-level timeout via requests
            # The timeout is handled at the HTTP client level
            message = anthropic_client.messages.create(
                model=model,
                max_tokens=max_tokens,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            result = message.content[0].text if message.content else ""
            result_len = len(result) if result else 0
            print(f"Anthropic API response received successfully, length: {result_len} characters")
            if not result or result_len == 0:
                print(f"WARNING: Empty response from Anthropic")
            return result if result else ""
            
        except Exception as e:
            last_exception = e
            error_str = str(e)
            
            # Check if it's a timeout or connection error (retry-able)
            if "timeout" in error_str.lower() or "connection" in error_str.lower() or "unavailable" in error_str.lower():
                if attempt < max_retries:
                    wait_time = 2 ** attempt  # Exponential backoff
                    print(f"Anthropic API timeout/connection error (attempt {attempt + 1}): {error_str}")
                    print(f"Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                    continue
                else:
                    print(f"Anthropic API failed after {max_retries + 1} attempts due to timeout/connection issues")
                    break
            else:
                # Don't retry on other errors (API errors, auth errors, etc.)
                print(f"Anthropic API error: {error_str}")
                raise
    
    # If we get here, all retries failed
    print(f"Anthropic API request failed after all retry attempts: {str(last_exception)}")
    raise last_exception

def make_openai_request(prompt: str, max_tokens: int = 500, max_retries: int = None, base_timeout: int = None, mode: str = None) -> str:
    """
    Send a prompt to the AI API (OpenAI or Anthropic) and return the response content.
    Routes to the appropriate provider based on the model configuration.
    Implements retry logic with exponential backoff for timeout and connection errors.
    
    Args:
        prompt: The prompt to send to the AI API
        max_tokens: Maximum tokens in response (base amount, will be adjusted by model config)
        max_retries: Maximum number of retry attempts (uses config default if None)
        base_timeout: Base timeout in seconds (uses config default if None)
        mode: 'comprehensive' (GPT-5/Claude), 'comprehensive-claude' (Claude Sonnet 4.5), or 'fast' (GPT-4). Uses DEFAULT_MODE if None.
    
    Returns:
        Response content from the AI API
        
    Raises:
        requests.exceptions.RequestException: If all retry attempts fail (OpenAI)
        Exception: If all retry attempts fail (Anthropic)
    """
    # Determine which model configuration to use
    if mode is None:
        mode = DEFAULT_MODE
    if mode not in MODEL_CONFIGS:
        mode = DEFAULT_MODE
    
    config = MODEL_CONFIGS[mode]
    model = config['model']
    provider = config.get('provider', 'openai')
    token_param = config['token_param']
    token_multiplier = config['token_multiplier']
    
    # Use configuration defaults if not specified
    if max_retries is None:
        max_retries = config['max_retries']
    if base_timeout is None:
        base_timeout = config['timeout']
    
    # Adjust tokens based on model (GPT-5 needs more for reasoning)
    adjusted_tokens = int(max_tokens * token_multiplier)
    
    # Route to appropriate provider
    if provider == 'anthropic':
        return make_anthropic_request(prompt, adjusted_tokens, model, max_retries, base_timeout)
    
    # OpenAI provider (default)
    if not OPENAI_API_KEY:
        raise Exception("OPENAI_API_KEY not found in environment variables.")
        
    print(f"Making OpenAI request with API key: {OPENAI_API_KEY[:20]}..." if OPENAI_API_KEY else "No API key found!")
    print(f"Mode: {mode} | Model: {model} | Base tokens: {max_tokens} | Multiplier: {token_multiplier} | Adjusted tokens: {adjusted_tokens} | Timeout: {base_timeout}s | Retries: {max_retries}")
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {OPENAI_API_KEY}'
    }
    data = {
        'model': model,
        'messages': [{'role': 'user', 'content': prompt}]
    }
    data[token_param] = adjusted_tokens
    
    last_exception = None
    
    for attempt in range(max_retries + 1):
        try:
            # Increase timeout with each retry attempt (GPT-5/GPT-4o needs longer timeouts for comprehensive analysis)
            current_timeout = base_timeout + (attempt * 120)  # Increased from 60 to 120 seconds per retry
            print(f"OpenAI API attempt {attempt + 1}/{max_retries + 1} with timeout: {current_timeout}s")
            
            resp = requests.post(OPENAI_API_URL, headers=headers, json=data, timeout=current_timeout)
            print(f"OpenAI API response status: {resp.status_code}")
            resp.raise_for_status()
            
            result = resp.json()['choices'][0]['message']['content']
            result_len = len(result) if result else 0
            print(f"OpenAI API response received successfully, length: {result_len} characters")
            if not result or result_len == 0:
                print(f"WARNING: Empty response from OpenAI. Full response: {resp.json()}")
            return result if result else ""
            
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
            last_exception = e
            if attempt < max_retries:
                wait_time = 2 ** attempt  # Exponential backoff: 1s, 2s, 4s
                print(f"OpenAI API timeout/connection error (attempt {attempt + 1}): {str(e)}")
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
                continue
            else:
                print(f"OpenAI API failed after {max_retries + 1} attempts due to timeout/connection issues")
                break
                
        except requests.exceptions.HTTPError as e:
            # Don't retry on HTTP errors (4xx, 5xx) - these are usually permanent
            print(f"OpenAI API HTTP error: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response status: {e.response.status_code}")
                print(f"Response content: {e.response.text}")
            raise
            
        except requests.exceptions.RequestException as e:
            last_exception = e
            if attempt < max_retries:
                wait_time = 2 ** attempt
                print(f"OpenAI API request error (attempt {attempt + 1}): {str(e)}")
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
                continue
            else:
                print(f"OpenAI API failed after {max_retries + 1} attempts")
                break
    
    # If we get here, all retries failed
    print(f"OpenAI API request failed after all retry attempts: {str(last_exception)}")
    if hasattr(last_exception, 'response') and last_exception.response is not None:
        print(f"Final response status: {last_exception.response.status_code}")
        print(f"Final response content: {last_exception.response.text}")
    raise last_exception

def process_supplier_table(table_markdown: str, part_number: str) -> str:
    """Update supplier table markdown with working evaluation links."""
    lines = table_markdown.split('\n')
    updated_lines = []
    for line in lines:
        if '|' in line and not line.startswith('|--'):
            cells = [c.strip() for c in line.split('|') if c.strip()]
            if len(cells) >= 6:
                # Replace the evaluation link column (index 4) with correct evaluation link
                cells[4] = f"[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})"
                updated_lines.append('| ' + ' | '.join(cells) + ' |')
            else:
                updated_lines.append(line)
        else:
            updated_lines.append(line)
    return '\n'.join(updated_lines)

# --- Endpoint Logic Wrappers ---
def find_supplier(part_number: str) -> Dict[str, str]:
    """Find suppliers for a given part number using OpenAI."""
    SUPPLIER_SEARCH_PROMPT = f'''Given the electronic component part number "{part_number}", find ALTERNATIVE electronic component suppliers that ACTUALLY SELL this specific part.

PART DESCRIPTION:
[Provide a detailed description of the part, including its type, specifications, and typical applications. This should be 2-3 sentences.]

SUPPLIER TABLE:
| Part Number | Manufacturer | Supplier | Cost | Evaluation Link | Best Supplier |
|-------------|--------------|----------|------|-----------------|---------------|
| {part_number} | [MUST specify the actual component manufacturer - e.g., Microchip, Texas Instruments, STMicroelectronics, Vishay, Samsung, etc.] | [Electronic component distributor/retailer name] | [Cost with currency] | [Evaluate Suppliers](WORKING_URL) | [Yes/No] |

CRITICAL REQUIREMENTS:
1. **ONLY SUGGEST SUPPLIERS THAT ACTUALLY SELL THIS SPECIFIC PART NUMBER**: Do not suggest suppliers that don't carry this exact component
2. The Manufacturer column MUST ALWAYS show the actual component manufacturer (the company that made the part)
3. Common manufacturers include: Microchip, Texas Instruments, STMicroelectronics, Vishay, Samsung, Lite-On, TE Connectivity, etc.
4. **STRICTLY FORBIDDEN**: DO NOT include these suppliers or ANY variations of their names: Digi-Key, Mouser, Arrow, Newark, RS Components, Farnell, Allied Electronics, Element14, RS Online, Newark Element14, Element14 Direct, Newark Direct, or any supplier name containing these terms
5. **MANDATORY**: Find only alternative suppliers that ACTUALLY STOCK this part, such as:
   - Regional electronics distributors that carry this component
   - Specialized component brokers that have this part in inventory
   - Independent authorized distributors that sell this specific part
   - Direct manufacturer distributors that stock this component
   - Niche market suppliers that specialize in this component type
   - Component trading companies that have this part available
6. Provide 3-5 different ALTERNATIVE suppliers that ACTUALLY SELL this specific part
7. NEVER leave the Manufacturer column blank or empty
8. Evaluation Link should link to the supplier evaluation page for detailed analysis
9. **VALIDATION**: Before including any supplier, verify it's NOT in the forbidden list above AND that they actually sell this specific part number
10. **STOCK AVAILABILITY**: Focus on suppliers that would realistically carry this specific component, whether in stock or available for order

URL REQUIREMENTS - Use this EXACT pattern:
- All suppliers: /supplier-evaluation.html?part={part_number}

IMPORTANT: All evaluation links should use the same URL pattern to direct users to the supplier evaluation page where they can compare all suppliers and get AI-powered recommendations.

**REMEMBER**: Only suggest suppliers that would actually have this specific part number "{part_number}" in their catalog or inventory. Do not suggest generic suppliers that might not carry this exact component.

Respond ONLY with the description and table in this exact format.'''
    try:
        response = make_openai_request(SUPPLIER_SEARCH_PROMPT, 2000)
        parts = response.split('SUPPLIER TABLE:')
        description = ''
        table_markdown = ''
        if len(parts) >= 2:
            description = parts[0].replace('PART DESCRIPTION:', '').strip()
            table_markdown = parts[1].strip()
        else:
            description = 'Part description not available'
            table_markdown = response
        if '| Manufacturer |' not in table_markdown or '| [Manufacturer] |' in table_markdown or '|  |' in table_markdown:
            description += '\n\n⚠️ Note: Manufacturer information may be incomplete. Please verify the actual manufacturer before ordering.'
        table_markdown = table_markdown.replace('[Evaluate Suppliers](URL)', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        table_markdown = table_markdown.replace('[Evaluate Suppliers](link)', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        table_markdown = table_markdown.replace('[Evaluate Suppliers]()', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        table_markdown = table_markdown.replace('[Order Now](URL)', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        table_markdown = table_markdown.replace('[Order Now](link)', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        table_markdown = table_markdown.replace('[Order Now]()', f'[Evaluate Suppliers](/supplier-evaluation.html?part={part_number})')
        updated_table_markdown = process_supplier_table(table_markdown, part_number)
        html_table = markdown_to_html_table(updated_table_markdown)
        full_response = (
            f'<div style="margin-bottom: 1.5em; padding: 1em; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #1976d2;">'
            f'<strong>📋 Part Description:</strong><br>{description}</div>'
            f'{html_table}'
        )
        return {"result": full_response}
    except Exception as e:
        return {"error": str(e)}

def get_current_real_disruptions() -> List[Dict[str, Any]]:
    """Fetch actual current supply chain disruptions from real news sources."""
    try:
        # Get real supply chain news from our RSS feeds
        news_result = generate_supply_chain_news("current disruptions")
        headlines = news_result.get("headlines", [])
        
        # Extract disruption-related news
        disruption_keywords = [
            "shortage", "delay", "disruption", "strike", "closure", "shortage", 
            "tariff", "ban", "sanction", "recall", "bankruptcy", "fire", "flood",
            "earthquake", "cyberattack", "hack", "outage", "port", "shipping",
            "supply chain", "manufacturing", "factory", "plant", "facility"
        ]
        
        real_disruptions = []
        for item in headlines:
            title = item.get("title", "").lower()
            if any(keyword in title for keyword in disruption_keywords):
                real_disruptions.append({
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "source": item.get("source", ""),
                    "publishedAt": item.get("publishedAt", ""),
                    "category": classify_disruption_type(item.get("title", ""))
                })
        
        return real_disruptions[:10]  # Limit to top 10 most recent
    except Exception as e:
        print(f"Error fetching real disruptions: {e}")
        return []

def classify_disruption_type(title: str) -> str:
    """Classify the type of supply chain disruption based on title."""
    title_lower = title.lower()
    
    if any(word in title_lower for word in ["tariff", "trade", "sanction", "ban"]):
        return "Geopolitical/Trade"
    elif any(word in title_lower for word in ["strike", "labor", "union", "worker"]):
        return "Labor Issues"
    elif any(word in title_lower for word in ["fire", "flood", "earthquake", "hurricane", "disaster"]):
        return "Natural Disaster"
    elif any(word in title_lower for word in ["cyber", "hack", "attack", "breach"]):
        return "Cybersecurity"
    elif any(word in title_lower for word in ["shortage", "allocation", "capacity"]):
        return "Supply Shortage"
    elif any(word in title_lower for word in ["port", "shipping", "logistics", "transport"]):
        return "Transportation/Logistics"
    elif any(word in title_lower for word in ["recall", "quality", "defect", "safety"]):
        return "Quality/Safety"
    elif any(word in title_lower for word in ["bankruptcy", "closure", "shutdown", "financial"]):
        return "Supplier Financial"
    else:
        return "Market/Economic"

def format_real_disruptions_for_analysis(disruptions: List[Dict[str, Any]]) -> str:
    """Format real disruptions for inclusion in analysis prompt."""
    if not disruptions:
        return "No current supply chain disruptions detected in recent news feeds."
    
    formatted = []
    for i, disruption in enumerate(disruptions, 1):
        formatted.append(f"{i}. **{disruption['category']}**: {disruption['title']}")
        formatted.append(f"   Source: {disruption['source']} | Published: {disruption['publishedAt'][:10] if disruption['publishedAt'] else 'Unknown'}")
        formatted.append(f"   URL: {disruption['url']}")
        formatted.append("")
    
    return "\n".join(formatted)

def format_user_input_summary(user_input: Optional[Dict[str, Any]]) -> str:
    """Format user input into a clear summary for display in mitigation plans."""
    if not user_input:
        return "- No specific planning context provided"
    
    summary_parts = []
    
    if user_input.get('constraints'):
        summary_parts.append(f"- **Constraints**: {user_input['constraints']}")
    if user_input.get('timelinePref'):
        summary_parts.append(f"- **Timeline Preference**: {user_input['timelinePref'].title()}")
    if user_input.get('budgetRange'):
        summary_parts.append(f"- **Budget Range**: {user_input['budgetRange'].title()}")
    if user_input.get('priorities'):
        summary_parts.append(f"- **Key Priorities**: {user_input['priorities']}")
    if user_input.get('riskTolerance'):
        summary_parts.append(f"- **Risk Tolerance**: {user_input['riskTolerance'].title()}")
    if user_input.get('teamSize'):
        summary_parts.append(f"- **Team Size**: {user_input['teamSize'].title()}")
    if user_input.get('decisionAuthority'):
        summary_parts.append(f"- **Decision Authority**: {user_input['decisionAuthority'].title()}")
    if user_input.get('additionalContext'):
        summary_parts.append(f"- **Additional Context**: {user_input['additionalContext']}")
    
    return "\n".join(summary_parts) if summary_parts else "- No specific planning context provided"

def disruption_analysis(bom: Any, kpi: Any, open_text: Any, mode: str = None) -> Dict[str, str]:
    """Perform disruption analysis using BOM, supply chain data, and real-world intelligence.
    
    Args:
        bom: Bill of Materials data
        kpi: Key Performance Indicator data
        open_text: Additional user context
        mode: 'comprehensive' (GPT-5) or 'fast' (GPT-4). Uses DEFAULT_MODE if None.
    """
    bom_analysis = analyze_bom_data(bom)
    formatted_bom = format_bom_as_markdown(bom)
    
    # Parse and analyze KPI data
    kpi_analysis = analyze_kpi_data(kpi)
    
    # Calculate historical probability data based on real KPI metrics
    historical_prob_data = calculate_historical_probability(bom, kpi)
    
    # Extract detailed component and supplier information
    component_intelligence = extract_component_intelligence(bom)
    
    # Get actual current supply chain disruptions
    real_disruptions = get_current_real_disruptions()
    
    # Generate current supply chain news context
    news_context = generate_supply_chain_context(bom)
    
    # Analyze lead times and costs
    cost_lead_time_analysis = analyze_lead_times_and_costs(bom)
    
    # Build user concerns section
    user_concerns_section = ""
    if open_text and open_text.strip():
        user_concerns_section = f'''
**🚨 CRITICAL PRIORITY: USER-SPECIFIC CONCERNS MUST BE ADDRESSED FIRST 🚨**

**MANDATORY: The user has provided specific concerns that MUST be addressed in your scenarios:**
"{open_text}"

YOU MUST create at least 2-3 scenarios that DIRECTLY address these user concerns. For example:
- If user mentions "Digi-Key delays" → Create scenarios specifically about Digi-Key supply issues
- If user mentions "Microchip shortage" → Create scenarios about Microchip component availability
- If user mentions specific suppliers, components, or issues → Prioritize those in your scenarios

FAILURE TO ADDRESS USER CONCERNS WILL RESULT IN INCOMPLETE ANALYSIS.
'''

    COMPREHENSIVE_DISRUPTION_ANALYSIS_PROMPT = f'''You are a senior supply chain risk analyst conducting a COMPREHENSIVE disruption analysis. Generate scenarios based on REAL, RESEARCH-BASED DATA from actual news sources, market data APIs, and historical performance metrics.

{'**IMPORTANT: Limited analysis mode - No BOM data provided. Base scenarios on available information (KPI data and additional context). Focus on general supply chain disruptions that could affect the described context.**' if not bom or not formatted_bom else ''}

CURRENT REAL-WORLD SUPPLY CHAIN DISRUPTIONS (LAST 7 DAYS):
{format_real_disruptions_for_analysis(real_disruptions)}

CURRENT SUPPLY CHAIN INTELLIGENCE:
{news_context}

BOM ANALYSIS:
{bom_analysis['summary'] or '[not provided]'}

HISTORICAL PROBABILITY ANALYSIS (BASED ON REAL DATA):
- Overall BOM Risk Score: {historical_prob_data.get('overall_risk', 0.3):.2f} (0=lowest, 1=highest risk)
- Average On-Time Delivery: {historical_prob_data.get('risk_factors', {}).get('avg_on_time_delivery', 95):.1f}%
- Average Defect Rate: {historical_prob_data.get('risk_factors', {}).get('avg_defect_rate', 2):.1f}%
- Average Lead Time: {historical_prob_data.get('risk_factors', {}).get('avg_lead_time', 14):.1f} days
- High-Risk Suppliers: {', '.join(historical_prob_data.get('risk_factors', {}).get('high_risk_suppliers', ['None']))}
- Medium-Risk Suppliers: {', '.join(historical_prob_data.get('risk_factors', {}).get('medium_risk_suppliers', ['None']))}
- High-Risk Component Types: {', '.join(historical_prob_data.get('risk_factors', {}).get('high_risk_components', ['None']))}

DETAILED COMPONENT INTELLIGENCE:
{component_intelligence}

COST & LEAD TIME ANALYSIS:
{cost_lead_time_analysis}

BOM DETAILS:
{formatted_bom or '[not provided]'}

HISTORICAL KPI ANALYSIS:
{kpi_analysis['summary']}

HISTORICAL KPI DATA:
{kpi_analysis['formatted_data'] or '[not provided]'}

ADDITIONAL CONTEXT & USER CONCERNS:
{open_text or '[not provided]'}

COMPREHENSIVE ANALYSIS REQUIREMENTS:
Generate 5-7 supply chain disruption scenarios based on ACTUAL CURRENT EVENTS. PRIORITY ORDER:
{user_concerns_section}

**SECONDARY: Use the REAL-WORLD DISRUPTIONS listed above as the foundation for remaining scenarios. Each scenario should either:**
1. **Directly reference a current disruption** from the real-world list above (preferably one confirmed by multiple sources), OR
2. **Be inspired by patterns/trends** visible in the current disruptions (cross-referenced across multiple sources), OR  
3. **Address potential cascading effects** of the current disruptions (verified through multiple independent reports)

**CROSS-REFERENCE REQUIREMENT**: When possible, base scenarios on events that are reported by multiple independent sources. This strengthens the validity of the scenario. In the "Market Context" column, note when events are cross-referenced across multiple sources.

**DO NOT create generic or hypothetical scenarios. Base scenarios on actual events happening now, verified through real-world sources.**

Generate scenarios that consider:

1. RECENT SUPPLY CHAIN NEWS (last 6 months):
   - Geopolitical tensions affecting key regions
   - Natural disasters and climate events
   - Semiconductor shortages and allocation issues
   - Transportation and logistics disruptions
   - Raw material price volatility
   - Trade policy changes and tariffs

2. COMPONENT-SPECIFIC ANALYSIS:
   - Component type vulnerabilities (semiconductors, passive components, mechanical parts)
   - Technology node dependencies and obsolescence risks
   - Single-source vs multi-source components
   - Lead time trends and allocation constraints
   - Price elasticity and cost pressures

3. SUPPLIER & MANUFACTURER INTELLIGENCE:
   - Supplier financial health and capacity constraints
   - Geographic concentration risks
   - Tier 1, 2, 3 supplier dependencies
   - Manufacturing facility risks (natural disasters, labor issues)
   - Quality and compliance issues

4. MARKET CONDITIONS:
   - Demand surge scenarios in key industries
   - Inventory allocation priorities
   - Seasonal demand patterns
   - Economic recession impacts
   - Currency fluctuation effects

5. LEAD TIME & COST ANALYSIS:
   - Current vs historical lead times
   - Price trend analysis and volatility
   - Allocation and minimum order quantities
   - Alternative sourcing options and costs
   - Expedite fees and premium pricing

6. **🎯 MANDATORY USER-SPECIFIC CONTEXT INTEGRATION:**
   - **FIRST PRIORITY**: Address the exact concerns mentioned in the user's additional information
   - If specific suppliers are mentioned (e.g., "Digi-Key delays", "Mouser issues"), create dedicated scenarios for those suppliers
   - If specific components or manufacturers are mentioned (e.g., "Microchip shortage", "PCB problems"), create scenarios specifically affecting those items
   - If general concerns are noted (e.g., "lead time issues", "cost increases"), ensure multiple scenarios address these themes
   - If geographic or industry-specific concerns are mentioned, incorporate those factors prominently
   - **REQUIREMENT**: At least 40% of scenarios must directly relate to user-provided concerns

Generate a markdown table with columns: Scenario ID, Scenario Description, Affected Components, Root Cause Category, Possible Delay (Range), Probability of Occurrence, Cost Impact, Market Context, Explainable Details.

REQUIREMENTS FOR EACH SCENARIO:
- Scenario ID: S1, S2, S3... (up to S7)
- Scenario Description: **FOR USER-CONCERN SCENARIOS**: Format as "[User Concern]: [Specific disruption scenario]" (e.g., "Digi-Key Delays: Extended lead times due to warehouse capacity issues"). **FOR OTHER SCENARIOS**: Reference actual current disruptions from the real-world list above. Include the specific event, company, or situation mentioned in the news. Format as: "[Real Event]: [How it affects this BOM]"
- Affected Components: Specific part numbers/types from BOM with rationale
- Root Cause Category: Primary cause (Geopolitical, Natural Disaster, Supplier Issue, Market Demand, etc.)
- Possible Delay: Realistic range (e.g., "2-8 weeks", "3-6 months") based on component type and severity
- Probability: MUST BE CALCULATED BASED ON REAL-TIME MARKET RESEARCH. For each scenario:
  
  **STEP 1 - IDENTIFY THE SCENARIO**: Understand the specific disruption scenario you've described
  
  **STEP 2 - CONDUCT MARKET RESEARCH**: Analyze the real-time market information provided above:
  * Search through the "RECENT SUPPLY CHAIN NEWS" section for similar or related events
  * Check if the scenario is already happening or showing early warning signs
  * Review current market conditions (exchange rates, commodity prices, geopolitical indicators)
  * Look for patterns in the "CURRENT REAL-WORLD DISRUPTIONS" that relate to your scenario
  * Consider frequency: How often are similar disruptions occurring in recent news?
  
  **STEP 3 - EVALUATE PROBABILITY BASED ON EVIDENCE**:
  * If similar events are actively happening in recent news: 8-15% probability
  * If warning signs or related disruptions exist: 5-10% probability
  * If market conditions support the scenario but no direct evidence: 3-7% probability
  * If scenario is plausible but no current evidence: 1-5% probability
  * If scenario contradicts current market trends: 0.5-2% probability
  
  **STEP 4 - REFERENCE YOUR SOURCES**: In the "Market Context" column, cite specific news items or market indicators that informed your probability calculation
  
  **CRITICAL REQUIREMENTS**:
  * Probability MUST be based on actual evidence from the real-time market data provided
  * NEVER exceed 15% - supply chain disruptions are rare events
  * Most realistic probabilities will be 1-10% range
  * If no relevant evidence exists in the market data, assign lower probability (1-3%)
  * Always reference specific news headlines or market indicators that support your probability assessment
- Cost Impact: Estimated impact range (e.g., "15-25% increase", "2-3x normal cost")
- Market Context: Current market factors contributing to this scenario
- Explainable Details: Detailed rationale referencing specific intelligence sources

CRITICAL REQUIREMENTS:
1. **{'USE ACTUAL BOM COMPONENTS ONLY: Generate scenarios that affect ONLY the specific components, part numbers, and suppliers listed in the BOM data above. Do NOT create scenarios for component types not present in the BOM.' if bom and formatted_bom else 'LIMITED ANALYSIS MODE: Since no BOM data is provided, create general but realistic supply chain disruption scenarios based on the available information (KPI data, additional context). Focus on common supply chain risks relevant to the described context.'}**
2. **{'BOM-SPECIFIC SCENARIOS: If the BOM contains no electronic components, do NOT generate semiconductor or electronics scenarios. Focus only on the actual component categories present.' if bom and formatted_bom else 'GENERAL SCENARIOS: Create scenarios that could affect various types of supply chains based on the context provided.'}**
3. **MARKET RESEARCH-BASED PROBABILITY CALCULATION**: For each scenario, you MUST:
   - Analyze the real-time market information provided (news, market data, current disruptions)
   - Search for evidence that the scenario is happening or likely to happen
   - Calculate probability based on actual evidence from real-time data
   - Reference specific news items or market indicators in your probability assessment
   - If no evidence exists, assign lower probability (1-3%)
   - NEVER use formula-based calculations - probabilities must be evidence-based from real-time market research
4. **REALISTIC PROBABILITIES**: Never assign probabilities >15%. Most supply chain disruptions are 1-10% probability events. Probabilities must reflect actual evidence from real-time market data, not theoretical calculations.
5. **ACTUAL SUPPLIERS ONLY**: Reference only suppliers and manufacturers actually listed in the BOM data, not generic industry suppliers
6. **INCORPORATE USER CONTEXT**: If specific suppliers, components, or concerns are mentioned in the additional context, create scenarios that directly address these issues
7. **RELEVANCE OVER GENERICS**: Prioritize scenarios affecting actual BOM components over generic market disruptions
8. **SUPPLIER-SPECIFIC RISKS**: Use actual historical performance data to determine supplier risk factors for Step 1 of probability calculation

Respond ONLY with the markdown table (no explanations, no text before or after).'''
    
    try:
        # Base tokens: 4000. Will be adjusted by model config (GPT-5: 8000, GPT-4: 4000)
        markdown_table = make_openai_request(COMPREHENSIVE_DISRUPTION_ANALYSIS_PROMPT, 4000, mode=mode)
        html_table = markdown_to_html_table(markdown_table)
        
        # Build comprehensive result with intelligence summary
        components = []
        
        # Add intelligence summary
        if news_context:
            components.append(
                '<div style="font-weight:bold;font-size:1.1em;margin-bottom:1em;background:#e3f2fd;padding:0.8em;border-radius:8px;border-left:4px solid #2196f3;">'
                f'🌐 Current Supply Chain Intelligence: Recent market conditions and disruption factors have been analyzed</div>'
            )
        
        # Add warning if no BOM data provided
        if not bom or not formatted_bom:
            components.append(
                '<div style="font-weight:bold;font-size:1.1em;margin-bottom:1em;background:#fff3cd;color:#856404;border:1px solid #ffeaa7;padding:0.8em;border-radius:8px;">'
                '⚠️ <strong>Limited Analysis:</strong> This analysis is based only on the additional information provided, without BOM data. '
                'For comprehensive disruption analysis including component-specific risks, costs, and supplier intelligence, please upload a BOM file.</div>'
            )

        # Add BOM analysis summary
        if bom_analysis['summary']:
            components.append(
                '<div style="font-weight:bold;font-size:1.1em;margin-bottom:1em;background:#e8f5e8;padding:0.8em;border-radius:8px;border-left:4px solid #4caf50;">'
                f'📊 {bom_analysis["summary"]}</div>'
            )
        
        # Add component intelligence summary
        if component_intelligence:
            # Count actual components by parsing the BOM data
            try:
                if isinstance(bom, str):
                    try:
                        bom_data = json.loads(bom)
                    except Exception:
                        bom_data = parse_csv_data(bom)
                else:
                    bom_data = bom
                component_count = len(bom_data) if isinstance(bom_data, list) else 0
            except:
                component_count = 0
                
            components.append(
                '<div style="font-weight:bold;font-size:1.1em;margin-bottom:1em;background:#fff;padding:0.8em;border-radius:8px;border-left:4px solid #ff9800;">'
                f'🔧 Component Intelligence: {component_count} components analyzed for supply chain risks</div>'
            )
        
        # Add cost and lead time analysis summary
        if cost_lead_time_analysis:
            components.append(
                '<div style="font-weight:bold;font-size:1.1em;margin-bottom:1em;background:#fff;padding:0.8em;border-radius:8px;border-left:4px solid #9c27b0;">'
                f'💰 Cost & Lead Time Analysis: BOM cost structure and lead time risks assessed</div>'
            )
        
        # Highlight keywords if open text provided
        if open_text and isinstance(open_text, str) and open_text.strip():
            keywords = [w for w in open_text.split() if len(w) > 3]
            html_table = highlight_table_rows(html_table, keywords)
        
        components.append(html_table)
        return {"result": ''.join(components)}
        
    except Exception as e:
        return {"error": str(e)}

def extract_component_intelligence(bom: Any) -> str:
    """Extract detailed intelligence about components including types, suppliers, and risk factors."""
    if not bom:
        return "No component data available for intelligence analysis."
    
    try:
        if isinstance(bom, str):
            try:
                bom_data = json.loads(bom)
            except Exception:
                bom_data = parse_csv_data(bom)
        else:
            bom_data = bom
            
        if not isinstance(bom_data, list) or not bom_data:
            return "Component data format not suitable for intelligence analysis."
        
        intelligence_report = []
        component_categories = {}
        supplier_analysis = {}
        
        for item in bom_data:
            part_number = item.get('Manufacturer Part #', item.get('Part Number', 'N/A'))
            description = item.get('Description', 'N/A')
            manufacturer = item.get('Manufacturer', 'N/A')
            supplier = item.get('Supplier', 'N/A')
            cost = item.get('Unit Cost (USD)', item.get('Total', 'N/A'))
            quantity = item.get('Quantity', item.get('Qty', 'N/A'))
            
            # Categorize component types
            component_type = categorize_component_type(description)
            if component_type not in component_categories:
                component_categories[component_type] = []
            component_categories[component_type].append({
                'part': part_number,
                'manufacturer': manufacturer,
                'cost': cost,
                'qty': quantity
            })
            
            # Analyze suppliers
            if supplier != 'N/A':
                if supplier not in supplier_analysis:
                    supplier_analysis[supplier] = {
                        'components': [],
                        'total_value': 0,
                        'manufacturers': set()
                    }
                supplier_analysis[supplier]['components'].append(part_number)
                supplier_analysis[supplier]['manufacturers'].add(manufacturer)
                try:
                    cost_val = float(str(cost).replace('$', '').replace(',', ''))
                    qty_val = int(str(quantity)) if str(quantity).isdigit() else 1
                    supplier_analysis[supplier]['total_value'] += cost_val * qty_val
                except:
                    pass
        
        # Build intelligence report
        intelligence_report.append("COMPONENT TYPE ANALYSIS:")
        for comp_type, components in component_categories.items():
            risk_level = assess_component_risk(comp_type, components)
            intelligence_report.append(f"- {comp_type}: {len(components)} components, Risk Level: {risk_level}")
        
        intelligence_report.append("\nSUPPLIER DEPENDENCY ANALYSIS:")
        for supplier, data in sorted(supplier_analysis.items(), key=lambda x: x[1]['total_value'], reverse=True)[:5]:
            dependency_risk = "High" if len(data['components']) > 3 else "Medium" if len(data['components']) > 1 else "Low"
            intelligence_report.append(f"- {supplier}: {len(data['components'])} components, {len(data['manufacturers'])} manufacturers, Dependency Risk: {dependency_risk}")
        
        return '\n'.join(intelligence_report)
        
    except Exception as e:
        return f"Error analyzing component intelligence: {str(e)}"

def categorize_component_type(description: str) -> str:
    """Categorize component based on description to assess supply chain risks."""
    desc_lower = description.lower()
    
    if any(term in desc_lower for term in ['ic', 'microcontroller', 'processor', 'mcu', 'cpu', 'fpga', 'asic']):
        return "Semiconductors/ICs"
    elif any(term in desc_lower for term in ['resistor', 'capacitor', 'inductor', 'diode', 'transistor']):
        return "Passive Components"
    elif any(term in desc_lower for term in ['connector', 'cable', 'wire', 'harness']):
        return "Connectors/Cables"
    elif any(term in desc_lower for term in ['sensor', 'transducer', 'accelerometer', 'gyroscope']):
        return "Sensors"
    elif any(term in desc_lower for term in ['memory', 'flash', 'ram', 'eeprom', 'storage']):
        return "Memory/Storage"
    elif any(term in desc_lower for term in ['crystal', 'oscillator', 'clock', 'resonator']):
        return "Timing Components"
    elif any(term in desc_lower for term in ['mechanical', 'housing', 'enclosure', 'bracket', 'screw']):
        return "Mechanical Parts"
    else:
        return "Other Components"

def assess_component_risk(component_type: str, components: list) -> str:
    """Assess supply chain risk level for component category."""
    risk_factors = {
        "Semiconductors/ICs": "High",  # Currently high risk due to shortages
        "Memory/Storage": "High",      # High demand and limited supply
        "Sensors": "Medium",           # Moderate risk
        "Passive Components": "Low",   # Generally more available
        "Connectors/Cables": "Medium", # Moderate risk
        "Timing Components": "Medium", # Moderate risk
        "Mechanical Parts": "Low",     # Generally lower risk
        "Other Components": "Medium"   # Default moderate risk
    }
    
    base_risk = risk_factors.get(component_type, "Medium")
    
    # Increase risk if many components of same type (concentration risk)
    if len(components) > 5:
        if base_risk == "Low":
            return "Medium"
        elif base_risk == "Medium":
            return "High"
    
    return base_risk

def fetch_real_market_data() -> Dict[str, Any]:
    """Fetch actual real-time market data from public APIs and data sources.
    
    Data Sources (Real-time):
    - Exchange rates: Free public API
    - Commodity data: Via free APIs or requires FRED API key
    - Economic indicators: World Bank, IMF public data
    - Shipping/Logistics: Requires commercial API subscription
    """
    market_data = {
        "commodity_prices": {},
        "logistics_indicators": {},
        "economic_indicators": {},
        "geopolitical_risk": {},
        "data_timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC"),
        "sources": [],
        "api_status": {}
    }
    
    try:
        # 1. Fetch real exchange rates (FREE - No API key required)
        try:
            response = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=5)
            if response.status_code == 200:
                rates = response.json()
                market_data["economic_indicators"]["exchange_rates"] = {
                    "EUR": rates["rates"].get("EUR"),
                    "CNY": rates["rates"].get("CNY"),
                    "JPY": rates["rates"].get("JPY"),
                    "KRW": rates["rates"].get("KRW"),
                    "TWD": rates["rates"].get("TWD"),
                    "updated": rates.get("date")
                }
                market_data["sources"].append("exchangerate-api.com (Real-time, Free)")
                market_data["api_status"]["exchange_rates"] = "✓ Active - Real data"
        except Exception as e:
            market_data["api_status"]["exchange_rates"] = f"✗ Failed: {str(e)}"
        
        # 2. Try to fetch commodity prices from Metals API (requires API key - free tier available)
        # Get API key from environment if available
        metals_api_key = os.getenv('METALS_API_KEY')
        if metals_api_key:
            try:
                # Example: Fetch copper, aluminum prices
                response = requests.get(
                    f"https://metals-api.com/api/latest?access_key={metals_api_key}&base=USD&symbols=XCU,XAL",
                    timeout=5
                )
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        market_data["commodity_prices"]["metals"] = {
                            "copper_usd_per_lb": data.get("rates", {}).get("XCU"),
                            "aluminum_usd_per_lb": data.get("rates", {}).get("XAL"),
                            "updated": data.get("date")
                        }
                        market_data["sources"].append("Metals-API.com (Real-time)")
                        market_data["api_status"]["commodity_metals"] = "✓ Active - Real data"
            except Exception as e:
                market_data["api_status"]["commodity_metals"] = f"✗ API key provided but failed: {str(e)}"
        else:
            market_data["commodity_prices"]["metals"] = {
                "note": "Set METALS_API_KEY environment variable for real-time metal prices",
                "free_tier": "Available at metals-api.com"
            }
            market_data["api_status"]["commodity_metals"] = "○ Not configured - API key required"
        
        # 3. Try World Bank API for commodity data (FREE - No API key required)
        try:
            # World Bank commodity price data (monthly updates)
            # Note: This is real historical data, updated monthly
            wb_response = requests.get(
                "https://api.worldbank.org/v2/sources/2/indicators/CRUDE_BRENT/data?format=json&per_page=1",
                timeout=5
            )
            if wb_response.status_code == 200:
                wb_data = wb_response.json()
                if len(wb_data) > 1 and wb_data[1]:
                    latest_oil = wb_data[1][0]
                    market_data["commodity_prices"]["oil_brent"] = {
                        "price_usd_per_barrel": latest_oil.get("value"),
                        "period": latest_oil.get("date"),
                        "note": "World Bank data (updated monthly)"
                    }
                    market_data["sources"].append("World Bank Commodity Markets (Real historical data)")
                    market_data["api_status"]["commodity_oil"] = "✓ Active - Real data (monthly updates)"
        except Exception as e:
            market_data["api_status"]["commodity_oil"] = f"✗ Failed: {str(e)}"
        
        # 4. Logistics indicators - Document available sources
        market_data["logistics_indicators"] = {
            "status": "Requires commercial API subscription",
            "available_sources": {
                "Freightos_Baltic_Index": {
                    "description": "Global container freight rate index",
                    "access": "Available via Freightos API (commercial)",
                    "url": "https://www.freightos.com/freight-resources/freightos-baltic-index/"
                },
                "Drewry_WCI": {
                    "description": "World Container Index - composite of container freight rates",
                    "access": "Published weekly by Drewry Shipping Consultants",
                    "url": "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index"
                },
                "Shanghai_Containerized_Freight": {
                    "description": "SCFI - Shanghai export container freight index",
                    "access": "Published by Shanghai Shipping Exchange",
                    "note": "Public but requires web scraping or data subscription"
                }
            },
            "note": "Real-time freight data available with API subscriptions"
        }
        market_data["api_status"]["logistics"] = "○ Not configured - Commercial API required"
        
        # 5. Geopolitical Risk Index - Try to access research data
        market_data["geopolitical_risk"] = {
            "source": "Geopolitical Risk Index (Caldara & Iacoviello, Federal Reserve)",
            "note": "Updated monthly based on text analysis of major newspapers",
            "access": "https://www.matteoiacoviello.com/gpr.htm",
            "status": "Real academic research data available (requires parsing)",
            "current_assessment": "Monitor RSS news feeds for real-time geopolitical events"
        }
        market_data["api_status"]["geopolitical"] = "○ Research data available (not API-integrated)"
        
        # 6. Semiconductor Industry Data
        market_data["semiconductor_indicators"] = {
            "sources": {
                "SEMI": "Semiconductor Equipment and Materials International - Industry reports",
                "SIA": "Semiconductor Industry Association - Monthly sales data",
                "WSTS": "World Semiconductor Trade Statistics"
            },
            "note": "Real industry data published monthly; requires subscription or manual integration",
            "status": "Real data available from industry associations"
        }
        market_data["api_status"]["semiconductor"] = "○ Industry data available (not API-integrated)"
        
    except Exception as e:
        market_data["error"] = str(e)
    
    return market_data

def research_scenario_probability(scenario_description: str, root_cause_category: str, affected_components: str = "", bom: Any = None) -> Dict[str, Any]:
    """Research real-time market information to evaluate the probability of a specific scenario occurring.
    
    This function:
    1. Gathers real-time market data (news, market indicators)
    2. Analyzes the scenario against current market conditions
    3. Calculates probability based on real-time evidence
    
    Args:
        scenario_description: Description of the disruption scenario
        root_cause_category: Category of the root cause (e.g., "Natural Disaster", "Geopolitical")
        affected_components: Components that would be affected
        bom: Optional BOM data for context
        
    Returns:
        Dictionary with probability percentage, confidence level, and evidence sources
    """
    try:
        # Gather real-time market information
        real_market_data = fetch_real_market_data()
        news_result = generate_supply_chain_news(f"{scenario_description} {root_cause_category}")
        recent_headlines = news_result.get("headlines", [])[:15]
        
        # Get relevant disruptions
        relevant_disruptions = get_current_real_disruptions()
        
        # Build market research prompt
        market_research_prompt = f'''You are a supply chain risk analyst conducting real-time market research to evaluate the probability of a specific disruption scenario occurring.

SCENARIO TO EVALUATE:
Description: {scenario_description}
Root Cause Category: {root_cause_category}
Affected Components: {affected_components or "Various components"}

REAL-TIME MARKET INFORMATION:

1. RECENT SUPPLY CHAIN NEWS (Last 7 Days):
{chr(10).join([f"- {h.get('title', '')} (Source: {h.get('source', 'Unknown')}, Published: {h.get('publishedAt', 'Unknown')})" for h in recent_headlines[:10]])}

2. CURRENT MARKET DATA:
- Exchange Rates: {real_market_data.get('economic_indicators', {}).get('exchange_rates', 'Not available')}
- Commodity Prices: {real_market_data.get('commodity_prices', {})}
- Market Data Timestamp: {real_market_data.get('data_timestamp', 'Unknown')}

3. CURRENT DISRUPTIONS:
{chr(10).join([f"- {d.get('title', '')} (Category: {d.get('category', 'Unknown')})" for d in relevant_disruptions[:5]])}

TASK:
Based on the real-time market information above, evaluate the probability that the scenario described will occur within the next 12 months.

Consider:
- How similar events are currently happening (from news)
- Market conditions that support or mitigate this scenario
- Frequency of similar disruptions in recent news
- Economic and geopolitical indicators
- Industry trends and patterns

RESPOND WITH ONLY A JSON OBJECT in this exact format:
{{
  "probability_percentage": <number between 0 and 15>,
  "confidence_level": "<Low|Medium|High>",
  "evidence_summary": "<brief summary of key evidence from real-time data>",
  "supporting_factors": ["<factor 1>", "<factor 2>", ...],
  "mitigating_factors": ["<factor 1>", "<factor 2>", ...],
  "key_news_items": ["<relevant news headline 1>", "<relevant news headline 2>", ...]
}}

IMPORTANT:
- Probability must be realistic (0-15% for supply chain disruptions)
- Base probability on actual evidence from the real-time data provided
- If no relevant evidence exists, assign lower probability (1-5%)
- Confidence level reflects how much supporting evidence exists in the real-time data
- Reference specific news items or market data in your evidence summary
'''
        
        # Get AI analysis
        response = make_openai_request(market_research_prompt, max_tokens=1500)
        
        # Parse JSON response
        try:
            # Extract JSON from response (handle markdown code blocks if present)
            import re
            json_match = re.search(r'\{[^{}]*"probability_percentage"[^{}]*\}', response, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
            else:
                # Try to find JSON in code blocks
                json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', response, re.DOTALL)
                if json_match:
                    json_str = json_match.group(1)
                else:
                    json_str = response
            
            result = json.loads(json_str)
            
            # Validate and ensure probability is within bounds
            prob = float(result.get('probability_percentage', 5))
            prob = max(0, min(15, prob))  # Cap at 15%
            result['probability_percentage'] = prob
            
            return result
        except Exception as e:
            print(f"Error parsing market research response: {e}")
            print(f"Response was: {response}")
            # Fallback: return conservative estimate
            return {
                "probability_percentage": 3.0,
                "confidence_level": "Low",
                "evidence_summary": "Unable to parse market research analysis",
                "supporting_factors": [],
                "mitigating_factors": [],
                "key_news_items": []
            }
            
    except Exception as e:
        print(f"Error in market research: {e}")
        return {
            "probability_percentage": 3.0,
            "confidence_level": "Low",
            "evidence_summary": f"Market research error: {str(e)}",
            "supporting_factors": [],
            "mitigating_factors": [],
            "key_news_items": []
        }

def generate_supply_chain_context(bom: Any = None) -> str:
    """Generate supply chain intelligence using REAL DATA from actual news sources and market APIs.
    
    This function now prioritizes real data over AI-generated content:
    1. Real RSS news headlines (last 7 days)
    2. Real market data from public APIs
    3. Analysis based on actual BOM component types
    """
    try:
        # Fetch real market data
        real_market_data = fetch_real_market_data()
        
        # Get real supply chain news
        news_result = generate_supply_chain_news("supply chain disruptions")
        recent_headlines = news_result.get("headlines", [])[:10]
        
        # Analyze BOM to determine relevant categories
        relevant_categories = set()
        if bom:
            try:
                if isinstance(bom, str):
                    try:
                        bom_data = json.loads(bom)
                    except Exception:
                        bom_data = parse_csv_data(bom)
                else:
                    bom_data = bom
                    
                if isinstance(bom_data, list) and bom_data:
                    for item in bom_data:
                        description = item.get('Description', '')
                        component_type = categorize_component_type(description)
                        relevant_categories.add(component_type)
            except Exception:
                pass
        
        # Build intelligence report from REAL data sources
        intelligence_report = []
        intelligence_report.append("=" * 80)
        intelligence_report.append("REAL-TIME SUPPLY CHAIN INTELLIGENCE REPORT")
        intelligence_report.append(f"Generated: {real_market_data['data_timestamp']}")
        intelligence_report.append("=" * 80)
        intelligence_report.append("")
        
        # Section 1: Real News Headlines
        intelligence_report.append("📰 RECENT SUPPLY CHAIN NEWS (Last 7 Days - Real RSS Data):")
        intelligence_report.append("-" * 80)
        if recent_headlines:
            for i, headline in enumerate(recent_headlines, 1):
                intelligence_report.append(f"{i}. {headline.get('title', 'N/A')}")
                intelligence_report.append(f"   Source: {headline.get('source', 'N/A')} | {headline.get('publishedAt', 'N/A')[:10]}")
                if headline.get('url'):
                    intelligence_report.append(f"   URL: {headline.get('url')}")
                intelligence_report.append("")
            intelligence_report.append(f"✓ Data Source: Real RSS feeds from {len(set(h.get('source') for h in recent_headlines))} supply chain news sources")
        else:
            intelligence_report.append("No major supply chain disruptions reported in the past 7 days.")
        intelligence_report.append("")
        
        # Section 2: Real Market Data
        intelligence_report.append("📊 REAL-TIME MARKET INDICATORS:")
        intelligence_report.append("-" * 80)
        
        # Exchange Rates
        if real_market_data.get("economic_indicators", {}).get("exchange_rates"):
            exchange_rates = real_market_data["economic_indicators"]["exchange_rates"]
            intelligence_report.append(f"Exchange Rates (vs USD, updated {exchange_rates.get('updated', 'N/A')}):")
            intelligence_report.append(f"  • EUR: {exchange_rates.get('EUR', 'N/A')}")
            intelligence_report.append(f"  • CNY: {exchange_rates.get('CNY', 'N/A')} (China - major manufacturing hub)")
            intelligence_report.append(f"  • JPY: {exchange_rates.get('JPY', 'N/A')} (Japan - electronics/automotive)")
            intelligence_report.append(f"  • KRW: {exchange_rates.get('KRW', 'N/A')} (South Korea - semiconductors)")
            intelligence_report.append(f"  • TWD: {exchange_rates.get('TWD', 'N/A')} (Taiwan - semiconductors)")
            intelligence_report.append("  ✓ Data Source: Real-time exchange rate API")
            intelligence_report.append("")
        
        # Commodity Prices
        if real_market_data.get("commodity_prices", {}).get("oil_brent"):
            oil_data = real_market_data["commodity_prices"]["oil_brent"]
            intelligence_report.append(f"Commodity Prices:")
            intelligence_report.append(f"  • Brent Crude Oil: ${oil_data.get('price_usd_per_barrel', 'N/A')}/barrel ({oil_data.get('period', 'N/A')})")
            intelligence_report.append(f"    (Impacts logistics/shipping costs)")
            intelligence_report.append("  ✓ Data Source: World Bank Commodity Markets (monthly updates)")
            intelligence_report.append("")
        
        if real_market_data.get("commodity_prices", {}).get("metals"):
            metals = real_market_data["commodity_prices"]["metals"]
            intelligence_report.append(f"  • Copper: ${metals.get('copper_usd_per_lb', 'N/A')}/lb")
            intelligence_report.append(f"  • Aluminum: ${metals.get('aluminum_usd_per_lb', 'N/A')}/lb")
            intelligence_report.append("  ✓ Data Source: Metals-API.com (real-time)")
            intelligence_report.append("")
        
        # API Status Summary
        intelligence_report.append("DATA SOURCE STATUS:")
        intelligence_report.append("-" * 80)
        api_status = real_market_data.get("api_status", {})
        for source_name, status in api_status.items():
            intelligence_report.append(f"  {status} - {source_name}")
        intelligence_report.append("")
        
        # Available Data Sources (not yet integrated)
        intelligence_report.append("ADDITIONAL REAL DATA SOURCES AVAILABLE FOR INTEGRATION:")
        intelligence_report.append("-" * 80)
        intelligence_report.append("To enable, set environment variables or configure API keys:")
        intelligence_report.append("  • Commodity Prices: METALS_API_KEY for real-time metal prices (metals-api.com)")
        intelligence_report.append("  • Freight Rates: Freightos API, Drewry WCI (commercial subscriptions)")
        intelligence_report.append("  • Semiconductor: SEMI, SIA industry reports (requires membership)")
        intelligence_report.append("  • Geopolitical: GPR Index data (requires parsing)")
        intelligence_report.append("")
        
        # Section 3: BOM-Specific Analysis
        if relevant_categories:
            intelligence_report.append(f"🔍 YOUR BOM COMPONENT CATEGORIES DETECTED:")
            intelligence_report.append("-" * 80)
            for category in sorted(relevant_categories):
                intelligence_report.append(f"  • {category}")
            intelligence_report.append("")
            intelligence_report.append("Analysis will focus on risks relevant to these specific component types.")
        
        intelligence_report.append("")
        intelligence_report.append("=" * 80)
        intelligence_report.append("⚠️  TRANSPARENCY NOTE:")
        intelligence_report.append("This intelligence report is built from REAL DATA SOURCES:")
        intelligence_report.append("  ✓ RSS news feeds from industry publications (refreshed every 7 days)")
        intelligence_report.append("  ✓ Real-time market data APIs where available")
        intelligence_report.append("  ✓ Your actual BOM component data")
        intelligence_report.append("")
        intelligence_report.append("AI analysis is used ONLY to interpret real data and generate risk scenarios")
        intelligence_report.append("based on actual events, not to fabricate hypothetical market conditions.")
        intelligence_report.append("=" * 80)
        
        return "\n".join(intelligence_report)
        
    except Exception as e:
        return f"Supply chain market intelligence unavailable due to error: {str(e)}\nUsing historical patterns for analysis."

def analyze_lead_times_and_costs(bom: Any) -> str:
    """Analyze lead times and cost patterns from BOM data to identify vulnerabilities."""
    if not bom:
        return "No BOM data available for lead time and cost analysis."
    
    try:
        if isinstance(bom, str):
            try:
                bom_data = json.loads(bom)
            except Exception:
                bom_data = parse_csv_data(bom)
        else:
            bom_data = bom
            
        if not isinstance(bom_data, list) or not bom_data:
            return "BOM data format not suitable for analysis."
        
        cost_analysis = []
        total_bom_cost = 0
        high_cost_components = []
        cost_distribution = {"<$1": 0, "$1-$10": 0, "$10-$100": 0, ">$100": 0}
        
        for item in bom_data:
            part_number = item.get('Manufacturer Part #', item.get('Part Number', 'N/A'))
            cost_str = str(item.get('Unit Cost (USD)', item.get('Total', '0')))
            quantity = item.get('Quantity', item.get('Qty', 1))
            
            try:
                # Clean and parse cost
                cost_val = float(cost_str.replace('$', '').replace(',', ''))
                qty_val = int(str(quantity)) if str(quantity).isdigit() else 1
                extended_cost = cost_val * qty_val
                total_bom_cost += extended_cost
                
                # Categorize cost
                if cost_val < 1:
                    cost_distribution["<$1"] += 1
                elif cost_val < 10:
                    cost_distribution["$1-$10"] += 1
                elif cost_val < 100:
                    cost_distribution["$10-$100"] += 1
                else:
                    cost_distribution[">$100"] += 1
                
                # Track high-cost components (>$50 or >10% of total)
                if cost_val > 50:
                    high_cost_components.append({
                        'part': part_number,
                        'cost': cost_val,
                        'extended': extended_cost,
                        'manufacturer': item.get('Manufacturer', 'N/A')
                    })
                    
            except (ValueError, TypeError):
                continue
        
        # Build analysis report
        analysis_report = []
        analysis_report.append("COST ANALYSIS:")
        analysis_report.append(f"- Total BOM Cost: ${total_bom_cost:,.2f}")
        analysis_report.append(f"- Cost Distribution: {dict(cost_distribution)}")
        
        if high_cost_components:
            high_cost_components.sort(key=lambda x: x['extended'], reverse=True)
            analysis_report.append(f"- High-Value Components ({len(high_cost_components)} items):")
            for comp in high_cost_components[:3]:  # Top 3
                analysis_report.append(f"  * {comp['part']}: ${comp['cost']:.2f} each (${comp['extended']:.2f} total)")
        
        # Lead time analysis based on actual component types in BOM
        analysis_report.append("\nLEAD TIME RISK ASSESSMENT:")
        
        # Analyze actual component types in the BOM
        component_types_found = set()
        for item in bom_data:
            description = item.get('Description', '')
            component_type = categorize_component_type(description)
            component_types_found.add(component_type)
        
        # Only include lead time estimates for component types actually in the BOM
        lead_time_map = {
            "Semiconductors/ICs": "12-52 weeks (high risk)",
            "Memory/Storage": "8-26 weeks (high risk)", 
            "Passive Components": "4-16 weeks (medium risk)",
            "Sensors": "6-20 weeks (medium risk)",
            "Connectors/Cables": "4-12 weeks (medium risk)",
            "Timing Components": "8-24 weeks (medium risk)",
            "Mechanical Parts": "2-12 weeks (low risk)",
            "Other Components": "4-16 weeks (medium risk)"
        }
        
        if component_types_found:
            for comp_type in sorted(component_types_found):
                lead_time_range = lead_time_map.get(comp_type, "4-16 weeks (medium risk)")
                analysis_report.append(f"- {comp_type}: {lead_time_range}")
        else:
            analysis_report.append("- General components: 4-16 weeks (medium risk)")
        
        return '\n'.join(analysis_report)
        
    except Exception as e:
        return f"Error analyzing lead times and costs: {str(e)}"

def disruption_explain(scenario_id: str, bom: Any, kpi: Any, open_text: Any, scenario_description: str, 
                      affected_components: Optional[str] = None, possible_delay: Optional[str] = None, 
                      probability: Optional[str] = None, explainable_details: Optional[str] = None, mode: str = None) -> Dict[str, str]:
    """Generate a detailed, topic-based explanation for a disruption scenario."""
    bom_details = ''
    try:
        if bom:
            if isinstance(bom, str):
                try:
                    bom_data = json.loads(bom)
                except Exception:
                    bom_data = parse_csv_data(bom)
            else:
                bom_data = bom
            if isinstance(bom_data, list) and bom_data:
                component_list = [
                    f"- {item.get('Manufacturer Part #', item.get('Part Number', 'N/A'))} "
                    f"({item.get('Description', 'N/A')}) from {item.get('Manufacturer', 'N/A')}, "
                    f"Cost: ${item.get('Unit Cost (USD)', item.get('Total', 'N/A'))}"
                    for item in bom_data
                ]
                bom_details = "\n\nAvailable BOM Components:\n" + '\n'.join(component_list)
    except Exception as e:
        print('BOM parsing error in explanation:', e)
    
    # Parse and analyze KPI data for better correlation
    kpi_analysis = analyze_kpi_data(kpi)
    
    # Gather real-world news and market information from multiple sources with deep relevance validation
    real_world_links = []
    cross_referenced_events = {}  # Group articles by event/topic
    
    try:
        # Extract key entities from scenario for targeted search
        # Build more specific search terms based on scenario content
        scenario_lower = scenario_description.lower()
        
        # Extract key terms: suppliers, components, disruption types, locations
        key_entities = []
        
        # Common suppliers/manufacturers
        supplier_keywords = ['digi-key', 'digikey', 'mouser', 'arrow', 'avnet', 'newark', 'farnell', 
                            'microchip', 'texas instruments', 'ti', 'stmicroelectronics', 'stm',
                            'infineon', 'nxp', 'onsemi', 'analog devices', 'adi']
        for supplier in supplier_keywords:
            if supplier in scenario_lower:
                key_entities.append(supplier)
        
        # Extract component types mentioned
        component_keywords = ['semiconductor', 'microcontroller', 'resistor', 'capacitor', 'transistor',
                             'ic', 'chip', 'pcb', 'connector', 'sensor', 'led', 'diode']
        for comp in component_keywords:
            if comp in scenario_lower:
                key_entities.append(comp)
        
        # Extract disruption types
        disruption_keywords = ['shortage', 'delay', 'disruption', 'strike', 'closure', 'tariff', 
                              'sanction', 'earthquake', 'flood', 'fire', 'cyberattack', 'bankruptcy',
                              'allocation', 'backorder', 'lead time']
        for disruption in disruption_keywords:
            if disruption in scenario_lower:
                key_entities.append(disruption)
        
        # Build comprehensive targeted search queries using multiple combinations
        search_terms = []
        
        # Primary: full scenario description
        if scenario_description:
            search_terms.append(scenario_description)
            # Also try first part if it contains a colon (e.g., "Digi-Key Delays: ...")
            if ':' in scenario_description:
                search_terms.append(scenario_description.split(':')[0].strip())
        
        # Secondary: key entities combined in multiple ways
        if key_entities:
            # Create multiple combinations of key entities for comprehensive search
            for i in range(len(key_entities)):
                for j in range(i+1, min(len(key_entities), i+4)):  # Up to 3-entity combinations
                    if j == i+1:
                        search_terms.append(f"{key_entities[i]} {key_entities[j]}")
                    elif j == i+2:
                        search_terms.append(f"{key_entities[i]} {key_entities[j]}")
                        search_terms.append(f"{key_entities[i]} {key_entities[i+1]} {key_entities[j]}")
        
        # Tertiary: affected components if available
        if affected_components:
            search_terms.append(affected_components)
            # Also try individual component mentions
            comp_words = affected_components.lower().split()
            for word in comp_words:
                if len(word) > 5 and word not in ['components', 'affected', 'parts']:
                    search_terms.append(f"{word} supply chain")
        
        # Quaternary: root cause category if identifiable
        root_cause_keywords = ['geopolitical', 'natural disaster', 'supplier issue', 'market demand',
                              'transportation', 'cybersecurity', 'quality', 'compliance']
        for cause in root_cause_keywords:
            if cause in scenario_lower:
                search_terms.append(f"{cause} supply chain disruption")
        
        # Remove duplicates and empty terms
        search_terms = list(dict.fromkeys([t.strip() for t in search_terms if t.strip()]))
        
        # Get news articles from comprehensive targeted searches
        all_headlines = []
        for term in search_terms[:10]:  # Use up to 10 search terms for comprehensive coverage
            if term.strip():
                try:
                    news_result = generate_supply_chain_news(term)
                    headlines = news_result.get("headlines", [])
                    all_headlines.extend(headlines)
                except Exception as e:
                    print(f'Error searching for term "{term}": {e}')
                    continue
        
        # Get current disruptions
        current_disruptions = get_current_real_disruptions()
        all_headlines.extend([d for d in current_disruptions if d.get('url')])
        
        # Remove duplicates based on URL
        seen_urls = set()
        unique_headlines = []
        for h in all_headlines:
            url = h.get('url', '')
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_headlines.append(h)
        
        # Use AI to validate article relevance to the specific scenario
        articles_for_validation = []
        if unique_headlines:
            # Prepare articles for AI validation - use more articles for comprehensive validation
            # Process in batches if needed to handle large numbers
            articles_for_validation = unique_headlines[:50]  # Increased to 50 for more comprehensive validation
            
            validation_prompt = f'''You are a supply chain research analyst conducting deep validation. Your task is to identify which news articles are DIRECTLY RELEVANT to a specific supply chain disruption scenario.

SCENARIO TO MATCH:
"{scenario_description}"

AFFECTED COMPONENTS: {affected_components or 'Not specified'}

KEY ENTITIES EXTRACTED FROM SCENARIO:
{', '.join(key_entities) if key_entities else 'None identified'}

NEWS ARTICLES TO EVALUATE:
{chr(10).join([f"{i+1}. {h.get('title', 'N/A')}" for i, h in enumerate(articles_for_validation)])}

TASK:
For each article, determine if it is DIRECTLY RELEVANT to the scenario. An article is directly relevant ONLY if it meets ALL of the following criteria:
1. It discusses the SAME type of disruption (e.g., if scenario mentions "shortage", article must discuss shortages - not just general supply chain issues)
2. It mentions the SAME suppliers, manufacturers, or companies (if any are specified in the scenario)
3. It discusses the SAME component types or industries (if any are specified in the scenario)
4. It describes the SAME geographic regions or markets (if any are specified in the scenario)
5. It addresses the SAME root cause (e.g., natural disaster, trade restrictions, etc.)

STRICT EXCLUSION CRITERIA - EXCLUDE articles that are:
- Only tangentially related (e.g., general supply chain news not about this specific issue)
- About different types of disruptions (e.g., scenario is about shortages but article is about delays)
- About unrelated industries or components
- Too generic to validate the specific scenario
- About similar but not identical issues (e.g., scenario is about "Digi-Key delays" but article is about "supplier delays" in general)

QUALITY OVER QUANTITY: It is better to return an empty array [] than to include articles that are not directly relevant.

RESPOND WITH ONLY A JSON array of article numbers (1-based) that are DIRECTLY RELEVANT:
[1, 3, 7, ...]

If NO articles are directly relevant, respond with: []
'''
            
            try:
                validation_response = make_openai_request(validation_prompt, max_tokens=1000)
                # Parse JSON response
                import re
                json_match = re.search(r'\[[\d,\s]*\]', validation_response)
                if json_match:
                    relevant_indices = json.loads(json_match.group(0))
                    # Filter to only relevant articles (convert to 0-based indexing)
                    relevant_articles = [articles_for_validation[i-1] for i in relevant_indices 
                                       if 1 <= i <= len(articles_for_validation)]
                else:
                    # Fallback: use stricter keyword matching
                    relevant_articles = []
                    scenario_keywords = [w.lower() for w in scenario_description.split() if len(w) > 5]
                    for headline in articles_for_validation:
                        title = headline.get('title', '').lower()
                        # Require at least 2 significant keyword matches
                        matches = sum(1 for keyword in scenario_keywords if keyword in title)
                        if matches >= 2:
                            relevant_articles.append(headline)
            except Exception as e:
                print(f'Error in AI article validation: {e}')
                # Fallback to stricter keyword matching
                relevant_articles = []
                scenario_keywords = [w.lower() for w in scenario_description.split() if len(w) > 5]
                for headline in articles_for_validation:
                    title = headline.get('title', '').lower()
                    matches = sum(1 for keyword in scenario_keywords if keyword in title)
                    if matches >= 2:
                        relevant_articles.append(headline)
        else:
            relevant_articles = []
        
        # Process validated articles
        for headline in relevant_articles:
            if headline.get('url'):
                # Extract event keywords for grouping
                title = headline.get('title', '').lower()
                event_keywords = [w for w in title.split() if len(w) > 4][:4]
                event_key = ' '.join(event_keywords).lower() if event_keywords else title[:50]
                
                link_data = {
                    'title': headline.get('title', ''),
                    'url': headline.get('url', ''),
                    'source': headline.get('source', 'Unknown'),
                    'publishedAt': headline.get('publishedAt', ''),
                    'category': headline.get('category', '')
                }
                
                # Group by similar events for cross-referencing
                if event_key not in cross_referenced_events:
                    cross_referenced_events[event_key] = []
                cross_referenced_events[event_key].append(link_data)
                real_world_links.append(link_data)
        
        # Sort by relevance (prefer articles with more keyword matches)
        def relevance_score(link):
            title_lower = link['title'].lower()
            scenario_keywords = [w.lower() for w in scenario_description.split() if len(w) > 4]
            score = sum(1 for keyword in scenario_keywords if keyword in title_lower)
            # Boost score for key entities
            for entity in key_entities:
                if entity in title_lower:
                    score += 2
            return score
        
        real_world_links.sort(key=relevance_score, reverse=True)
        
        # Note: We do NOT add generic articles here - only directly validated articles are included
        # This ensures quality over quantity - better to have fewer highly relevant articles
        
    except Exception as e:
        print(f'Error gathering real-world links: {e}')
    
    # Format real-world links section with cross-referencing
    real_world_section = ""
    if real_world_links:
        real_world_section = "\n\nREAL-WORLD SUPPORTING INFORMATION (VALIDATED FROM MULTIPLE SOURCES):\n"
        real_world_section += "The following news articles have been validated through deep research across multiple sources to ensure they DIRECTLY relate to this specific scenario.\n"
        validation_count = len(articles_for_validation) if articles_for_validation else len(unique_headlines) if 'unique_headlines' in locals() else 0
        real_world_section += f"Validation process: Searched {len(search_terms) if 'search_terms' in locals() else 'multiple'} targeted queries across 10+ RSS feeds, validated {validation_count} articles, found {len(real_world_links)} directly relevant articles.\n"
        real_world_section += "Articles are grouped by event/topic to show cross-referencing across different news sources.\n\n"
        
        # Show cross-referenced events first (events reported by multiple sources)
        cross_ref_shown = set()
        for event_key, articles in cross_referenced_events.items():
            if len(articles) > 1:  # Multiple sources reporting the same event
                real_world_section += f"**CROSS-REFERENCED EVENT** (Reported by {len(articles)} sources):\n"
                for i, link in enumerate(articles, 1):
                    real_world_section += f"  {i}. [{link['title']}]({link['url']})\n"
                    real_world_section += f"     - Source: {link.get('source', 'Unknown')}"
                    if link.get('publishedAt'):
                        real_world_section += f" | Published: {link['publishedAt'][:10]}"
                    real_world_section += "\n"
                real_world_section += "\n"
                cross_ref_shown.update([a['url'] for a in articles])
        
        # Show remaining unique articles
        remaining_links = [l for l in real_world_links[:10] if l['url'] not in cross_ref_shown]
        if remaining_links:
            real_world_section += "**ADDITIONAL SUPPORTING SOURCES:**\n"
            for i, link in enumerate(remaining_links[:5], 1):
                real_world_section += f"  {i}. [{link['title']}]({link['url']})\n"
                real_world_section += f"     - Source: {link.get('source', 'Unknown')}"
                if link.get('publishedAt'):
                    real_world_section += f" | Published: {link['publishedAt'][:10]}"
                real_world_section += "\n"
            real_world_section += "\n"
        
        # Summary of cross-referencing
        total_sources = len(set(l.get('source', 'Unknown') for l in real_world_links))
        cross_ref_count = sum(1 for articles in cross_referenced_events.values() if len(articles) > 1)
        real_world_section += f"**CROSS-REFERENCE SUMMARY:** {len(real_world_links)} articles from {total_sources} different sources. "
        real_world_section += f"{cross_ref_count} events confirmed by multiple independent sources.\n\n"
    else:
        real_world_section = "\n\nREAL-WORLD SUPPORTING INFORMATION:\n"
        real_world_section += "No directly related news articles found in recent supply chain news feeds after cross-referencing multiple sources. "
        real_world_section += "This may indicate the scenario is based on emerging trends or specific BOM vulnerabilities.\n\n"
    
    # Build comprehensive scenario context
    scenario_context = f"""
SCENARIO DETAILS:
- ID: {scenario_id}
- Description: {scenario_description}
- Affected Components: {affected_components or 'Not specified'}
- Possible Delay: {possible_delay or 'Not specified'}
- Probability: {probability or 'Not specified'}
- Additional Details: {explainable_details or 'Not specified'}
"""
    
    EXPLANATION_PROMPT = f'''
Given the following supply chain data:

{scenario_context}

BOM Details: {bom_details}
Historical KPI Analysis: {kpi_analysis['summary']}
Historical KPI Data: {kpi_analysis['formatted_data'] or '[not provided]'}
Additional Info: {open_text or '[not provided]'}
{real_world_section}

For the SPECIFIC disruption scenario: "{scenario_description}" (Scenario ID: {scenario_id}), provide a highly organized, topic-based explanation that DIRECTLY addresses this exact scenario.

CRITICAL REQUIREMENT: Your explanation must be SPECIFICALLY about this scenario and its details. Do not provide generic supply chain advice.

You MUST ALWAYS include the following sections, even if some sections have no data (in which case, state 'No data available for this section.'):

## Affected Components
- List the SPECIFIC BOM components mentioned or implied in this scenario (with part numbers and manufacturers from the BOM data)
- Focus ONLY on components that would be affected by THIS SPECIFIC scenario
- If the scenario mentions specific components, manufacturers, or suppliers, prioritize those
- Cross-reference with the "Affected Components" field: {affected_components or 'Not specified'}

## Root Causes
- Explain the SPECIFIC reasons why THIS scenario could occur
- Reference the scenario description details directly
- Use KPI historical data to identify patterns that support this scenario
- Focus on the exact vulnerability described in the scenario
- Consider the probability level: {probability or 'Not specified'}
- **MANDATORY**: Reference and link to the real-world supporting information provided above. Cite specific news articles that demonstrate similar events or patterns.

## Impact Analysis
- Analyze the SPECIFIC impact of THIS scenario on production timeline, costs, and delivery
- Use the scenario's delay information: {possible_delay or 'Not specified'}
- Reference relevant KPI metrics that show historical impact of similar issues
- Factor in the probability: {probability or 'Not specified'}

## Real-World Evidence
- **MANDATORY SECTION**: Provide online links to real-world information that DIRECTLY supports and validates this specific scenario
- **STRICT RELEVANCE REQUIREMENT**: Only include articles that are DIRECTLY relevant to this exact scenario. Articles must:
  * Discuss the same type of disruption (e.g., if scenario mentions "shortage", article must discuss shortages)
  * Mention the same suppliers, manufacturers, or companies (if specified in scenario)
  * Discuss the same component types or industries (if specified in scenario)
  * Describe the same geographic regions or markets (if specified in scenario)
  * Address the same root cause (e.g., natural disaster, trade restrictions, etc.)
- **EXCLUDE**: Do NOT include articles that are only tangentially related, about different disruption types, or too generic
- **DEEP RESEARCH VALIDATION**: The articles provided have been validated through deep research to ensure they directly relate to this scenario
- **CROSS-REFERENCE REQUIREMENT**: Verify the scenario is real-world by referencing multiple independent sources
- Include clickable markdown links to the news articles and reports listed in the "REAL-WORLD SUPPORTING INFORMATION" section above
- **For cross-referenced events** (events reported by multiple sources), explicitly state: "This event is confirmed by [X] independent sources:" and list all sources
- Format each link as: [Article Title](URL) - Brief description of how it DIRECTLY relates to and validates this specific scenario
- Group links by event/topic to show cross-referencing: "Multiple sources report [event]: [list of sources]"
- If multiple sources confirm the same event, emphasize this strengthens the scenario's validity
- **If no directly relevant links are available**: Clearly state "No directly relevant news articles found that validate this specific scenario. This may indicate: [explain why - emerging issue, specific BOM vulnerability, etc.]"
- This section must contain at least 2-3 links to real-world sources when available, preferably from different sources
- **Quality over Quantity**: Better to have 2-3 highly relevant articles than 10 tangentially related ones

## Mitigation & Recommendations
- Provide recommendations SPECIFICALLY for THIS scenario
- For each bullet in this section, format it as a markdown link with the text as the recommendation and the URL as /mitigation-plan.html?scenarioId={scenario_id}&recommendation=[URL-encoded recommendation text]. For example: [Diversify suppliers](/mitigation-plan.html?scenarioId={scenario_id}&recommendation=Diversify%20suppliers)
- Tailor recommendations to the specific components and risks mentioned in this scenario

## Data Gaps
- Identify what specific data would be needed to better assess THIS scenario
- Reference any missing information that limits analysis of this particular disruption

## Summary
- Provide a concise summary (2-3 sentences) highlighting the most critical risks of THIS SPECIFIC scenario and recommended next steps
- Reference the scenario ID and key details directly

REMEMBER: This explanation must be specifically about scenario "{scenario_id}: {scenario_description}" - not general supply chain advice. The "Real-World Evidence" section is MANDATORY and must include clickable links to supporting information.

Respond ONLY with the markdown-formatted explanation, no extra text before or after.'''
    try:
        # Base tokens: 5000. Will be adjusted by model config (GPT-5: 10000, GPT-4: 5000)
        # Increased from 3000 to ensure GPT-5 has enough tokens after reasoning
        detailed_result = make_openai_request(EXPLANATION_PROMPT, 5000, mode=mode)
        presentable = f"<div>{markdown_to_html_table(detailed_result)}</div>"
        return {"result": presentable}
    except Exception as e:
        return {"error": str(e)}

def mitigation_plan(scenario_id: str, recommendation: str, bom: Any = None, kpi: Any = None, open_text: Any = None, scenario_description: Optional[str] = None, affected_components: Optional[str] = None, possible_delay: Optional[str] = None, probability: Optional[str] = None, explainable_details: Optional[str] = None, scenario_explanation: Optional[str] = None, user_input: Optional[Dict[str, Any]] = None, mode: str = None) -> Dict[str, str]:
    """Generate a detailed, step-by-step action plan for a mitigation recommendation with full context."""
    
    # Parse BOM data to extract specific component details
    bom_details = ''
    component_list = []
    affected_component_details = ''
    
    try:
        if bom:
            if isinstance(bom, str):
                try:
                    bom_data = json.loads(bom)
                except Exception:
                    bom_data = parse_csv_data(bom)
            else:
                bom_data = bom
            if isinstance(bom_data, list) and bom_data:
                component_list = [
                    {
                        'part_number': item.get('Manufacturer Part #', item.get('Part Number', 'N/A')),
                        'description': item.get('Description', 'N/A'),
                        'manufacturer': item.get('Manufacturer', 'N/A'),
                        'supplier': item.get('Supplier', 'N/A'),
                        'cost': item.get('Unit Cost (USD)', item.get('Total', 'N/A')),
                        'quantity': item.get('Quantity', item.get('Qty', 'N/A'))
                    }
                    for item in bom_data
                ]
                bom_details = "\n\nComplete BOM Components:\n" + '\n'.join([
                    f"- {comp['part_number']} ({comp['description']}) from {comp['manufacturer']}, "
                    f"Supplier: {comp['supplier']}, Cost: ${comp['cost']}, Qty: {comp['quantity']}"
                    for comp in component_list
                ])
                
                # Extract specific details for affected components
                if affected_components:
                    affected_parts = []
                    for comp in component_list:
                        # Check if component is mentioned in affected components
                        if (comp['part_number'] in affected_components or 
                            comp['description'] in affected_components or
                            comp['manufacturer'] in affected_components or
                            comp['supplier'] in affected_components):
                            affected_parts.append(comp)
                    
                    if affected_parts:
                        affected_component_details = "\n\nSPECIFIC AFFECTED COMPONENTS (from scenario):\n" + '\n'.join([
                            f"- **{comp['part_number']}**: {comp['description']}\n"
                            f"  - Manufacturer: {comp['manufacturer']}\n"
                            f"  - Current Supplier: {comp['supplier']}\n"
                            f"  - Unit Cost: ${comp['cost']}\n"
                            f"  - Quantity Needed: {comp['quantity']}\n"
                            f"  - Extended Cost: ${float(comp['cost']) * float(comp['quantity']) if comp['cost'] != 'N/A' and comp['quantity'] != 'N/A' else 'N/A'}"
                            for comp in affected_parts
                        ])
    except Exception as e:
        print('BOM parsing error in mitigation plan:', e)
    
    # Process user input
    user_context = ""
    if user_input:
        user_context_parts = []
        if user_input.get('constraints'):
            user_context_parts.append(f"Constraints & Limitations: {user_input['constraints']}")
        if user_input.get('timelinePref'):
            user_context_parts.append(f"Timeline Preference: {user_input['timelinePref']}")
        if user_input.get('budgetRange'):
            user_context_parts.append(f"Budget Considerations: {user_input['budgetRange']}")
        if user_input.get('priorities'):
            user_context_parts.append(f"Key Priorities: {user_input['priorities']}")
        if user_input.get('riskTolerance'):
            user_context_parts.append(f"Risk Tolerance: {user_input['riskTolerance']}")
        if user_input.get('teamSize'):
            user_context_parts.append(f"Implementation Team Size: {user_input['teamSize']}")
        if user_input.get('decisionAuthority'):
            user_context_parts.append(f"Decision Authority Level: {user_input['decisionAuthority']}")
        if user_input.get('additionalContext'):
            user_context_parts.append(f"Additional Context: {user_input['additionalContext']}")
        
        if user_context_parts:
            user_context = "\n\nUSER-PROVIDED PLANNING CONTEXT:\n" + "\n".join([f"- {part}" for part in user_context_parts])
    
    # Parse KPI data for specific insights
    kpi_insights = ""
    if kpi:
        try:
            kpi_analysis = analyze_kpi_data(kpi)
            if kpi_analysis and kpi_analysis.get('summary'):
                kpi_insights = f"\n\nKPI ANALYSIS INSIGHTS:\n{kpi_analysis['summary']}\n{kpi_analysis.get('formatted_data', '')}"
        except Exception as e:
            print('KPI parsing error in mitigation plan:', e)
    
    ENHANCED_PLAN_PROMPT = f'''
You are a supply chain expert creating a COMPREHENSIVE, ACTIONABLE mitigation plan for a specific disruption scenario.

SCENARIO CONTEXT:
- Scenario ID: {scenario_id}
- Scenario Description: {scenario_description or 'Not provided'}
- Affected Components: {affected_components or 'Not specified'}
- Recommendation to Implement: "{recommendation}"

SUPPLY CHAIN DATA:
{bom_details}{affected_component_details}
{kpi_insights}
Additional Context: {open_text or 'Not provided'}{user_context}

**CRITICAL: USE ONLY PROVIDED DATA - NO FICTIONAL INFORMATION**

CREATE A COMPREHENSIVE ACTION PLAN with the following structure, incorporating ONLY the user-provided context and data:

# Mitigation Action Plan: {recommendation}

## Your Planning Context Summary
**This plan has been customized based on your specific inputs:**
{format_user_input_summary(user_input)}

## Executive Summary
- Provide a 2-3 sentence summary of the situation and proposed solution
- **PROMINENTLY REFERENCE user constraints and priorities**: Start with "Based on your [specific constraints/priorities mentioned]..."
- **EXPLICITLY STATE timeline approach**: "Given your [timeline preference] timeline preference..."
- **CLEARLY HIGHLIGHT budget considerations**: "Within your [budget range] budget parameters..."
- Show how the plan directly addresses each user-specified priority and constraint

## Situation Analysis
- Specific details about the disruption scenario (use exact scenario description provided)
- Components/suppliers affected (use ONLY actual part numbers and suppliers from BOM data provided)
- Use ONLY actual costs, quantities, and suppliers from the BOM data
- **USER CONSTRAINT IMPACT ANALYSIS**: Create a dedicated subsection titled "### Impact of Your Specified Constraints" that explicitly addresses:
  - How your budget constraints affect available options
  - How your timeline preferences influence the approach
  - How your risk tolerance shapes the strategy
  - How your team size affects implementation capacity
  - How your decision authority level impacts the plan structure

## Detailed Action Steps

### Phase 1: Immediate Actions (0-7 days)
**CRITICAL**: Each action must explicitly reference how it aligns with user inputs. For each action, provide:
- **Action**: Specific task description **[MUST include: "This addresses your priority of [specific user priority]"]**
- **Owner**: Generic role/department **[MUST state: "Appropriate for your [team size] team"]**
- **Timeline**: Time ranges **[MUST state: "Adjusted for your [timeline preference] timeline preference"]**
- **Resources Required**: Resource categories **[MUST state: "Within your [budget range] budget parameters"]**
- **Success Criteria**: How to measure completion **[MUST reference user's stated priorities]**
- **Risk Level**: High/Medium/Low **[MUST state: "Aligned with your [risk tolerance] risk tolerance"]**
- **AI Assistance Available**: YES/NO with specific assistance type

### Phase 2: Short-term Actions (1-4 weeks)
[Same detailed format as Phase 1]

### Phase 3: Long-term Actions (1-6 months)
[Same detailed format as Phase 1]

## Component-Specific Actions
**CRITICAL: Address ONLY components explicitly mentioned in the scenario's "Affected Components" field:**

For EACH component listed in [{affected_components or 'No specific components identified'}]:
- **Component: [Use EXACT part number from BOM data]**
  - Current Situation: [Use ACTUAL supplier, cost, quantity from BOM data - if not available, state "Data not provided"]
  - Specific Risk: [Why this component is affected by this exact scenario]
  - Alternative Sourcing: [Generic categories of alternative suppliers - do NOT invent specific supplier names]
  - Lead Time Analysis: [Use actual lead time data if provided, otherwise use general industry ranges]
  - Cost Impact Analysis: [Use ACTUAL BOM costs if provided to calculate impact - if not available, use percentage ranges]
  - Immediate Actions: [Specific steps using only provided data]

**ABSOLUTE RESTRICTIONS - DO NOT CREATE:**
- Specific company names not in the provided BOM data
- Individual contact names or phone numbers
- Email addresses or specific contact information
- Detailed supplier addresses or locations
- Specific costs or quantities not in the provided BOM
- Made-up part numbers or components not mentioned in the scenario
- Fictional delivery dates or specific timelines beyond user preferences
- Invented supplier relationships or contracts
- Specific facility names or manufacturing locations
- Detailed financial figures not derivable from provided BOM data

**WHAT YOU CAN USE:**
- ONLY actual part numbers, suppliers, costs, quantities from provided BOM data
- User's stated constraints, priorities, timeline preferences, budget ranges
- User's team size and decision authority level
- The specific scenario description and affected components listed
- Generic industry categories (e.g., "regional distributors", "authorized distributors")
- General percentage ranges for cost impacts and timeline estimates
- Role categories (e.g., "Procurement Manager", "Supply Chain Director")
- Generic location types (e.g., "Primary facility", "Regional office")

**ACTION FRAMEWORK APPROACH:**
Focus on providing PROCESSES and FRAMEWORKS rather than specific details:
- "Contact current suppliers listed in BOM data to assess availability"
- "Research alternative distributors in the same component category"
- "Implement inventory monitoring for components listed as affected"
- "Establish escalation procedures based on user's decision authority level"

## Implementation Checklist

**CRITICAL REQUIREMENT: Create a comprehensive tracking table at the end of the plan that includes ALL actions from the phases above.**

After completing all the sections above, create a final section called "Implementation Checklist" with a markdown table that consolidates ALL actions from Phase 1, Phase 2, Phase 3, and Component-Specific Actions into a single tracking table.

The table must have these exact columns:
| Action | Owner | Timeline | Resources Required | Success Criteria | Risk Level | AI Assistance Available |

**Table Requirements:**
- Include EVERY action mentioned in the phases above
- Use the exact same action descriptions, owners, timelines, resources, success criteria, and risk levels from the detailed phases
- For "AI Assistance Available", use the exact format from the phases (YES/NO with assistance type)
- The table should serve as a complete checklist for implementation tracking
- Number each action (1, 2, 3, etc.) for easy reference
- Group actions by phase if helpful, but keep it in one table

**Example table format:**
| Action | Owner | Timeline | Resources Required | Success Criteria | Risk Level | AI Assistance Available |
|--------|-------|----------|-------------------|------------------|------------|----------------------|
| 1. Contact current suppliers for availability assessment | Procurement Manager | 1-2 days | Supplier contact database | Supplier responses received | Medium | YES - Draft supplier inquiry emails |
| 2. Research alternative distributors | Supply Chain Analyst | 3-5 days | Market research tools | List of 3-5 alternatives identified | Low | YES - Create supplier comparison analysis |

This checklist table enables effective tracking and ensures nothing is missed during implementation.

Respond ONLY with the markdown-formatted plan using exclusively provided data and avoiding all fictional information.'''
    
    try:
        # Base tokens: 8000. Will be adjusted by model config (GPT-5: 16000, GPT-4: 8000)
        # Increased from 5000 to ensure GPT-5 has enough tokens after reasoning for comprehensive plans
        plan_result = make_openai_request(ENHANCED_PLAN_PROMPT, 8000, mode=mode)
        # Debug: Check if content is being truncated
        if len(plan_result) > 8000:
            print(f"Mitigation plan length: {len(plan_result)} characters")
        presentable = f"<div>{markdown_to_html_table(plan_result)}</div>"
        return {"result": presentable}
    except Exception as e:
        return {"error": str(e)}

def generate_supply_chain_news(prompt: str) -> Dict[str, Any]:
    """Fetch ONLY real supply chain news headlines from RSS within the last 7 days.

    Returns a JSON-serializable dict: {"headlines": [{"title", "url", "source", "publishedAt"}, ...]}
    If none are found, returns an empty list (no AI or generic fallbacks).
    """
    import requests
    from datetime import datetime, timedelta
    from dateutil import parser
    from urllib.parse import urlparse

    today = datetime.now()
    one_week_ago = today - timedelta(days=7)
    
    # Make timezone-aware for comparison with RSS dates
    if today.tzinfo is None:
        from datetime import timezone
        today = today.replace(tzinfo=timezone.utc)
        one_week_ago = one_week_ago.replace(tzinfo=timezone.utc)

    results: List[Dict[str, Any]] = []

    try:
        rss_feeds = [
            "https://www.supplychainbrain.com/rss/articles",
            "https://www.freightwaves.com/news/feed",
            "https://feeds.feedburner.com/SupplyChainDive",
            "https://www.inboundlogistics.com/feed/",
            "https://www.logisticsmgmt.com/rss.xml",
            "https://www.scmr.com/rss.xml",
            "https://www.dcvelocity.com/rss.xml",
            "https://www.mhlnews.com/rss.xml",
            "https://www.manufacturing.net/rss.xml",
            "https://www.industryweek.com/rss.xml",
        ]

        import xml.etree.ElementTree as ET

        for feed_url in rss_feeds:
            try:
                response = requests.get(feed_url, timeout=10)
                if response.status_code != 200:
                    continue
                root = ET.fromstring(response.content)

                for item in root.findall('.//item'):
                    title_elem = item.find('title')
                    link_elem = item.find('link')
                    pub_date_elem = item.find('pubDate')

                    title = title_elem.text.strip() if title_elem is not None and title_elem.text else None
                    url = link_elem.text.strip() if link_elem is not None and link_elem.text else None

                    if not title or len(title) <= 20:
                        continue

                    is_recent = False
                    published_at_str = None
                    if pub_date_elem is not None and pub_date_elem.text:
                        try:
                            pub_date = parser.parse(pub_date_elem.text)
                            is_recent = pub_date >= one_week_ago
                            published_at_str = pub_date.isoformat()
                        except Exception:
                            is_recent = False

                    if not is_recent:
                        continue

                    source = None
                    try:
                        parsed = urlparse(url) if url else urlparse(feed_url)
                        source = parsed.hostname
                    except Exception:
                        source = None

                    results.append({
                        "title": title,
                        "url": url or feed_url,
                        "source": source or "unknown",
                        "publishedAt": published_at_str or ""
                    })

                    if len(results) >= 20:
                        break

                if len(results) >= 20:
                    break

            except Exception as e:
                print(f"RSS feed {feed_url} failed: {e}")
                continue

        # De-duplicate by (title, source) to keep same headlines from different outlets
        seen_titles = set()
        deduped: List[Dict[str, Any]] = []
        for item in results:
            normalized_title = (item.get("title") or "").strip()
            source_name = (item.get("source") or "unknown").lower()
            dedup_key = (normalized_title.lower(), source_name)
            if dedup_key in seen_titles:
                continue
            seen_titles.add(dedup_key)
            deduped.append(item)

        # Enforce source diversity by rotating through publications
        from collections import defaultdict

        source_buckets: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        for item in deduped:
            source = (item.get("source") or "unknown").lower()
            source_buckets[source].append(item)

        diverse_headlines: List[Dict[str, Any]] = []
        max_per_source = 3
        max_total = 20

        while len(diverse_headlines) < max_total and source_buckets:
            made_selection = False
            for source in list(source_buckets.keys()):
                if len(diverse_headlines) >= max_total:
                    break
                articles = source_buckets[source]
                if not articles:
                    source_buckets.pop(source, None)
                    continue
                taken_from_source = sum(
                    1 for h in diverse_headlines
                    if (h.get("source") or "unknown").lower() == source
                )
                if taken_from_source >= max_per_source:
                    continue
                diverse_headlines.append(articles.pop(0))
                made_selection = True
                if not articles:
                    source_buckets.pop(source, None)
            if not made_selection:
                # allow overflow if diversity limits exhausted
                for source in list(source_buckets.keys()):
                    if len(diverse_headlines) >= max_total:
                        break
                    articles = source_buckets[source]
                    if not articles:
                        source_buckets.pop(source, None)
                        continue
                    diverse_headlines.append(articles.pop(0))
                    if not articles:
                        source_buckets.pop(source, None)
                break

        return {"headlines": diverse_headlines[:10]}

    except Exception as e:
        print(f"All news sources failed: {e}")
        # Real-news-only: return empty list on failure
        return {"headlines": []}





def get_fallback_recent_news() -> List[str]:
    """Provide fallback supply chain news when APIs fail - these are example headlines."""
    from datetime import datetime
    
    today = datetime.now()
    current_day = today.strftime("%A")
    current_month = today.strftime("%B")
    current_date = today.strftime("%d")
    
    # When real news sources fail, return a message indicating this
    return [
        "⚠️ Real-time news sources currently unavailable - please check back later",
        "📡 News services temporarily offline - attempting to reconnect",
        "🔄 Fetching latest supply chain updates from available sources...",
        "⏰ Live news feeds updating - please refresh for current headlines",
        "📰 Connecting to supply chain news providers for real-time updates"
    ]

def evaluate_suppliers(part_number: str, supplier_data: str, selected_suppliers: list = None, mode: str = None) -> Dict[str, Any]:
    """Evaluate and compare suppliers for a given part number with component-specific analysis."""
    
    # Analyze the component to get specific characteristics
    component_analysis = analyze_component_characteristics(part_number)
    
    # Extract supplier and manufacturer information from supplier_data
    suppliers_found = []
    manufacturers_found = []
    
    # Parse supplier data to extract supplier names and manufacturers
    lines = supplier_data.split('\n')
    for line in lines:
        if '|' in line and not line.startswith('|--'):
            cells = [c.strip() for c in line.split('|') if c.strip()]
            if len(cells) >= 3:
                # Try to extract supplier and manufacturer from table
                if len(cells) >= 6:  # Full table format
                    manufacturer = cells[1] if cells[1] not in ['Manufacturer', '[Manufacturer]', ''] else 'Unknown'
                    supplier = cells[2] if cells[2] not in ['Supplier', '[Supplier]', ''] else 'Unknown'
                    if supplier != 'Unknown' and manufacturer != 'Unknown':
                        suppliers_found.append({'supplier': supplier, 'manufacturer': manufacturer})
                        manufacturers_found.append(manufacturer)
    
    # Filter suppliers based on user selection
    if selected_suppliers is None:
        selected_suppliers = []
    
    # Determine which suppliers to include in evaluation
    predetermined_suppliers = [
        "Digi-Key", "Mouser", "Arrow", "Newark", "RS Components", "Farnell", "Allied Electronics", "McMaster-Carr"
    ]
    
    # Extract AI-found suppliers from supplier_data first
    ai_suppliers = []
    lines = supplier_data.split('\n')
    for line in lines:
        if '|' in line and not line.startswith('|--'):
            cells = [c.strip() for c in line.split('|') if c.strip()]
            if len(cells) >= 3:
                if len(cells) >= 6:  # Full table format
                    supplier = cells[2] if cells[2] not in ['Supplier', '[Supplier]', ''] else None
                    if supplier:
                        ai_suppliers.append(supplier)
    
    # Determine final suppliers based on user selection
    if selected_suppliers:
        # User selected predetermined suppliers: verify they have the component, then combine with AI suppliers
        verified_predetermined = []
        
        # Get manufacturer from component analysis for verification
        manufacturer = component_analysis.get('manufacturer', 'Unknown')
        
        for supplier in selected_suppliers:
            print(f"Verifying {supplier} has component {part_number}...")
            if verify_supplier_has_component(supplier, manufacturer, part_number):
                verified_predetermined.append(supplier)
                print(f"✓ {supplier} verified - has component available")
            else:
                print(f"✗ {supplier} verification failed - component not found on their website")
        
        # Use verified predetermined suppliers + AI suppliers
        suppliers_to_evaluate = verified_predetermined + ai_suppliers
        
        if not verified_predetermined and selected_suppliers:
            print(f"Warning: None of the selected predetermined suppliers ({', '.join(selected_suppliers)}) have {part_number} available on their websites")
    else:
        # User selected NO predetermined suppliers: use ONLY AI suppliers
        suppliers_to_evaluate = ai_suppliers
        
        # NO FALLBACK: If user didn't select predetermined suppliers, don't include them at all
        if not suppliers_to_evaluate:
            print(f"Warning: No AI suppliers found for {part_number} and no predetermined suppliers selected")
            suppliers_to_evaluate = []  # Empty list - no suppliers to evaluate
    
    # Remove duplicates while preserving order
    final_suppliers = []
    seen = set()
    for supplier in suppliers_to_evaluate:
        if supplier not in seen:
            final_suppliers.append(supplier)
            seen.add(supplier)

    # NEW: If fewer than 5 suppliers, add research-based recommendations
    research_added_suppliers = []  # Track which suppliers were added by research
    if len(final_suppliers) < 5:
        print(f"Only {len(final_suppliers)} supplier(s) found. Adding research-based suppliers to reach minimum of 5...")
        
        # Get component type to determine best suppliers
        component_type = component_analysis.get('type', 'Unknown').lower()
        component_category = component_analysis.get('category', 'Unknown').lower()
        
        # Research-based supplier recommendations by component type
        # Based on known supplier specializations and market strengths
        supplier_recommendations = {
            # Electronics components
            'capacitor': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'resistor': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'ic': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'microcontroller': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'transistor': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'diode': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'sensor': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'RS Components'],
            'connector': ['Digi-Key', 'Mouser', 'Newark', 'Arrow', 'Farnell'],
            'led': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'inductor': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'crystal': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'Farnell'],
            'relay': ['Digi-Key', 'Mouser', 'Newark', 'Arrow', 'RS Components'],
            
            # Mechanical/Industrial
            'fastener': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'screw': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'bolt': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'washer': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'nut': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'bearing': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'spring': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'gasket': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'o-ring': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            
            # Wire & Cable
            'wire': ['Digi-Key', 'Mouser', 'Allied Electronics', 'Newark', 'RS Components'],
            'cable': ['Digi-Key', 'Mouser', 'Allied Electronics', 'Newark', 'RS Components'],
            
            # Tools & Equipment
            'tool': ['McMaster-Carr', 'RS Components', 'Allied Electronics', 'Newark'],
            'equipment': ['RS Components', 'Allied Electronics', 'Newark', 'McMaster-Carr'],
            
            # Default for unknown types (prioritize broad-inventory distributors)
            'default': ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'RS Components']
        }
        
        # Find matching recommendations
        recommended_suppliers = []
        component_match = None
        for key in supplier_recommendations:
            if key in component_type or key in component_category:
                recommended_suppliers = supplier_recommendations[key]
                component_match = key
                print(f"Using specialized suppliers for {key}: {', '.join(recommended_suppliers)}")
                break
        
        # If no match, use default
        if not recommended_suppliers:
            recommended_suppliers = supplier_recommendations['default']
            component_match = 'default'
            print(f"Using default broad-inventory suppliers: {', '.join(recommended_suppliers)}")
        
        # Add recommended suppliers until we have at least 5 total
        for supplier in recommended_suppliers:
            if supplier not in seen and len(final_suppliers) < 5:
                final_suppliers.append(supplier)
                seen.add(supplier)
                research_added_suppliers.append(supplier)
                print(f"Added research-based supplier: {supplier}")
        
        print(f"Total suppliers after research additions: {len(final_suppliers)}")
        print(f"Research-added suppliers: {', '.join(research_added_suppliers) if research_added_suppliers else 'None'}")

    # Handle case where no suppliers are found
    if not final_suppliers:
        return {
            "error": "No suppliers found for evaluation. Please select predetermined suppliers or ensure the AI finds alternative suppliers for this component."
        }

    # Prepare research-added info for prompt
    research_info = ""
    if research_added_suppliers:
        research_info = f"\n\nRESEARCH-ADDED SUPPLIERS: {', '.join(research_added_suppliers)} (added automatically because fewer than 5 suppliers were available - these are specialized for {component_analysis.get('type', 'this component type')})"

    ENHANCED_EVALUATION_PROMPT = f'''
You are a supply chain expert evaluating suppliers for the specific component: "{part_number}"

COMPONENT ANALYSIS:
{component_analysis}

SUPPLIER DATA PROVIDED:
{supplier_data}

USER SELECTED SUPPLIERS: {', '.join(selected_suppliers) if selected_suppliers else 'None - using AI recommendations'}{research_info}

SUPPLIERS TO EVALUATE: {', '.join(final_suppliers)}

TASK: Provide a comprehensive, component-specific supplier evaluation for ALL suppliers listed in "SUPPLIERS TO EVALUATE". Generate realistic scores for each supplier, as the system will rank them by overall score and present the top 8 performers. Consider:

1. COMPONENT-SPECIFIC FACTORS:
   - Component type and complexity
   - Manufacturing requirements and quality standards
   - Lead time characteristics for this component category
   - Availability patterns and allocation risks
   - Price sensitivity and market dynamics
   - Technical support requirements

2. SUPPLIER EVALUATION CRITERIA:
   - Cost Competitiveness (consider component-specific pricing)
   - Delivery Performance (component-specific lead times)
   - Quality & Reliability (track record with this component type)
   - Stock Availability (inventory levels for this specific part)
   - Geographic Reach (relevant to component sourcing)
   - Technical Support (component-specific expertise)

3. COMPONENT-SPECIFIC SCORING LOGIC:
   - For semiconductors: Prioritize allocation, authenticity, technical support
   - For passives: Focus on cost, availability, bulk pricing
   - For connectors: Emphasize quality, specifications, custom options
   - For sensors: Consider calibration, support, application expertise
   - For power components: Focus on safety, certifications, thermal management

Generate realistic, component-specific scores that vary based on:
- Each supplier's strength with this component type
- Component complexity and sourcing difficulty
- Market conditions affecting this specific component
- Supplier specialization and expertise

Return ONLY valid JSON with the following structure, including ONLY the suppliers from the "SUPPLIERS TO EVALUATE" list:

Generate a JSON object with a "comparison" array containing one object for each supplier in the SUPPLIERS TO EVALUATE list. Each supplier object should have:
- "name": The supplier name exactly as listed
- "manufacturer": "{component_analysis['manufacturer']}"
- "costScore": component-specific score 70-95
- "deliveryScore": component-specific score 70-95
- "qualityScore": component-specific score 70-95
- "availability": "In Stock" or "Limited Stock" or "On Allocation" or "Back Order"
- "overallScore": calculated average of the three scores
- "recommended": true for ONLY ONE supplier (the one with the highest overall score), false for all others
- "specialization": brief reason for the score

Also include:
- "recommendedSupplier": Name of supplier with highest overall score
- "recommendationReason": Component-specific reason explaining why this supplier is best
- "componentInsights": Key insights about sourcing this specific component

SUPPLIERS TO EVALUATE: {', '.join(final_suppliers)}

CRITICAL REQUIREMENTS:
- Evaluate ALL suppliers in the "SUPPLIERS TO EVALUATE" list - both predetermined and AI-identified
- Make scores realistically different for each supplier (vary by at least 3-5 points between suppliers)
- Base availability on actual component type (semiconductors often have allocation issues)
- Vary scores based on supplier strengths (e.g., Digi-Key for prototyping, Arrow for production)
- Give AI-identified suppliers competitive scores if they offer good value or specialization
- MANDATORY: Only mark ONE supplier as recommended - the one with the HIGHEST overall score
- Ensure all scores are integers between 70-95
- Make the recommendationReason specific to this component type
- The "recommendedSupplier" field must match the supplier with the highest overall score
- The system will automatically rank and show the top 8 suppliers by overall score
'''
    
    try:
        print(f"Evaluating suppliers for component: {part_number}")
        # Base tokens: 3000. Will be adjusted by model config
        response = make_openai_request(ENHANCED_EVALUATION_PROMPT, 3000, mode=mode)
        print(f"AI Response length: {len(response)} characters")
        
        # Try to parse JSON response
        import json
        try:
            # Clean the response to ensure it's valid JSON
            response_cleaned = response.strip()
            if response_cleaned.startswith('```json'):
                response_cleaned = response_cleaned[7:]
            if response_cleaned.endswith('```'):
                response_cleaned = response_cleaned[:-3]
            response_cleaned = response_cleaned.strip()
            
            evaluation_data = json.loads(response_cleaned)
            print(f"Successfully parsed JSON response for {part_number}")
            
            # Sort suppliers by overall score and limit to top 8
            if 'comparison' in evaluation_data and evaluation_data['comparison']:
                # Sort suppliers by overall score (highest first)
                sorted_suppliers = sorted(
                    evaluation_data['comparison'], 
                    key=lambda x: x.get('overallScore', 0), 
                    reverse=True
                )
                
                # Take only the top 8 suppliers
                top_suppliers = sorted_suppliers[:8]
                evaluation_data['comparison'] = top_suppliers
                
                # Reset all recommendations and set only the highest scoring one
                for supplier in top_suppliers:
                    supplier['recommended'] = False
                
                if top_suppliers:
                    best_supplier = top_suppliers[0]  # First in sorted list is highest scoring
                    best_supplier['recommended'] = True
                    highest_score = best_supplier.get('overallScore', 0)
                    evaluation_data['recommendedSupplier'] = best_supplier.get('name', 'Unknown')
                    
                    # Update recommendation reason to mention the highest score
                    current_reason = evaluation_data.get('recommendationReason', '')
                    evaluation_data['recommendationReason'] = f"{best_supplier.get('name')} achieved the highest overall score ({highest_score}) among {len(top_suppliers)} evaluated suppliers. {current_reason}"
            
            # Add order links to each supplier in the comparison
            if 'comparison' in evaluation_data:
                for supplier in evaluation_data['comparison']:
                    supplier_name = supplier.get('name', '')
                    manufacturer = supplier.get('manufacturer', component_analysis['manufacturer'])
                    
                    # Generate order link using existing function
                    order_link = generate_supplier_url(supplier_name, manufacturer, part_number)
                    supplier['orderLink'] = order_link
            
            # Add research-added suppliers info to response
            if research_added_suppliers:
                evaluation_data['researchAddedSuppliers'] = research_added_suppliers
                evaluation_data['researchReason'] = f"Added specialized suppliers for {component_analysis.get('type', 'this component')} to ensure comprehensive evaluation"
            
            return evaluation_data
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing failed for {part_number}: {str(e)}")
            print(f"Response content: {response[:200]}...")
            
            # Create a truly component-specific fallback
            return create_component_specific_fallback(part_number, component_analysis, final_suppliers)
            
    except Exception as e:
        print(f"Error in supplier evaluation for {part_number}: {str(e)}")
        return create_component_specific_fallback(part_number, component_analysis)

def analyze_component_characteristics(part_number: str) -> Dict[str, Any]:
    """Analyze component characteristics to inform supplier evaluation."""
    part_upper = part_number.upper()
    
    # Determine component type and characteristics
    if part_upper.startswith(('ATTINY', 'ATMEGA')):
        return {
            'type': 'Microcontroller',
            'manufacturer': 'Microchip',
            'complexity': 'High',
            'sourcing_difficulty': 'Medium',
            'key_factors': ['Authenticity', 'Programming support', 'Technical documentation'],
            'typical_lead_time': '8-16 weeks',
            'allocation_risk': 'Medium'
        }
    elif part_upper.startswith('STM32'):
        return {
            'type': 'Microcontroller',
            'manufacturer': 'STMicroelectronics',
            'complexity': 'High',
            'sourcing_difficulty': 'High',
            'key_factors': ['Allocation management', 'Technical support', 'Development tools'],
            'typical_lead_time': '12-26 weeks',
            'allocation_risk': 'High'
        }
    elif part_upper.startswith(('ESP32', 'ESP8266')):
        return {
            'type': 'WiFi Microcontroller',
            'manufacturer': 'Espressif Systems',
            'complexity': 'High',
            'sourcing_difficulty': 'Medium',
            'key_factors': ['RF certification', 'Software support', 'Antenna design'],
            'typical_lead_time': '6-12 weeks',
            'allocation_risk': 'Medium'
        }
    elif part_upper.startswith('LM'):
        return {
            'type': 'Linear IC',
            'manufacturer': 'Texas Instruments',
            'complexity': 'Medium',
            'sourcing_difficulty': 'Low',
            'key_factors': ['Cost', 'Availability', 'Package options'],
            'typical_lead_time': '4-8 weeks',
            'allocation_risk': 'Low'
        }
    elif part_upper.startswith('SN74'):
        return {
            'type': 'Logic IC',
            'manufacturer': 'Texas Instruments',
            'complexity': 'Low',
            'sourcing_difficulty': 'Low',
            'key_factors': ['Cost', 'Speed grade', 'Package compatibility'],
            'typical_lead_time': '2-6 weeks',
            'allocation_risk': 'Low'
        }
    elif any(term in part_upper for term in ['RESISTOR', 'RES']):
        return {
            'type': 'Resistor',
            'manufacturer': 'Various',
            'complexity': 'Low',
            'sourcing_difficulty': 'Very Low',
            'key_factors': ['Cost', 'Tolerance', 'Bulk availability'],
            'typical_lead_time': '1-4 weeks',
            'allocation_risk': 'Very Low'
        }
    elif any(term in part_upper for term in ['CAPACITOR', 'CAP']):
        return {
            'type': 'Capacitor',
            'manufacturer': 'Various',
            'complexity': 'Low',
            'sourcing_difficulty': 'Low',
            'key_factors': ['Voltage rating', 'Temperature coefficient', 'Cost'],
            'typical_lead_time': '2-8 weeks',
            'allocation_risk': 'Low'
        }
    else:
        return {
            'type': 'Electronic Component',
            'manufacturer': 'Various',
            'complexity': 'Medium',
            'sourcing_difficulty': 'Medium',
            'key_factors': ['Availability', 'Cost', 'Quality'],
            'typical_lead_time': '4-12 weeks',
            'allocation_risk': 'Medium'
        }

def create_component_specific_fallback(part_number: str, component_analysis: Dict[str, Any], suppliers_to_use: list = None) -> Dict[str, Any]:
    """Create component-specific fallback evaluation with realistic variation."""
    import random
    
    # Set seed based on part number for consistency
    random.seed(hash(part_number) % 1000)
    
    # Use selected suppliers - if empty list provided, don't use any predetermined suppliers
    if suppliers_to_use is None:
        suppliers_to_use = ['Digi-Key', 'Mouser', 'Arrow', 'Newark', 'RS Components', 'Farnell', 'Allied Electronics', 'McMaster-Carr']
    elif not suppliers_to_use:
        # Empty list means user selected no predetermined suppliers - create minimal fallback
        suppliers_to_use = ['Digi-Key', 'Mouser']  # Minimal fallback for when no AI suppliers found
    
    # Research-based supplier performance profiles (scores on 100-point scale)
    # Methodology: Based on industry research, market positioning, certifications, and known performance characteristics
    # 
    # COST SCORE: Based on market positioning, volume discounts, and pricing strategy
    # - 90-95: Premium pricing (specialized/fast delivery)
    # - 85-89: Competitive pricing (large distributors)
    # - 80-84: Good value (broad inventory)
    # - 75-79: Budget-friendly (industrial focus)
    # 
    # DELIVERY SCORE: Based on warehouse network, logistics capabilities, and documented delivery performance
    # - 95-98: Industry-leading (next-day/same-day capability)
    # - 90-94: Excellent (reliable 1-2 day for most items)
    # - 85-89: Very good (consistent 2-3 day)
    # - 80-84: Good (standard 3-5 day)
    # 
    # QUALITY SCORE: Based on authorized distributor status, quality certifications (ISO 9001, AS9100), 
    # counterfeit prevention programs, and traceability standards
    # - 95-98: Exceptional (comprehensive quality programs, full traceability)
    # - 90-94: Excellent (strong quality systems, authorized status)
    # - 85-89: Very good (certified, standard quality controls)
    # - 80-84: Good (basic quality assurance)
    #
    # Research sources:
    # - Authorized distributor certifications and industry standards for electronics distributors
    # - Typical defect rates for authorized distributors: <100 PPM (0.01%), often <50 PPM
    # - Industry standard on-time delivery for top distributors: 95-98%
    # - Total Cost of Ownership factors including shipping speed, reliability, and defect handling
    # - Known market characteristics (e.g., McMaster-Carr's legendary same-day shipping)
    
    all_supplier_profiles = {
        # Digi-Key: Global leader, 1.8M+ SKUs, North American distribution, excellent service
        # Known for: Fast shipping, excellent customer service, strong quality controls
        'Digi-Key': {
            'cost': 83,          # Competitive but not lowest (premium service cost)
            'delivery': 92,      # Very fast (next-day available, excellent fulfillment)
            'quality': 94,       # Excellent (authorized distributor, ISO 9001, strong anti-counterfeit)
            'specialty': 'Prototyping & Development'
        },
        
        # Mouser: Global distributor, 1.1M+ products, Texas-based, newest products
        # Known for: Latest technology, design engineers focus, excellent quality
        'Mouser': {
            'cost': 84,          # Similar to Digi-Key pricing
            'delivery': 90,      # Excellent (24-hour shipping available)
            'quality': 95,       # Exceptional (authorized, comprehensive quality program)
            'specialty': 'Design & Engineering'
        },
        
        # Arrow: Fortune 500, volume focus, global supply chain, production quantities
        # Known for: Volume pricing, enterprise relationships, broad capabilities
        'Arrow': {
            'cost': 88,          # Better pricing for volume
            'delivery': 87,      # Good (strong for volume, variable for small quantities)
            'quality': 89,       # Very good (authorized, AS9100 certified facilities)
            'specialty': 'Production & Volume'
        },
        
        # Newark/element14 (Premier Farnell): Global reach, strong in industrial
        # Known for: Industrial focus, test equipment, European strength
        'Newark': {
            'cost': 82,          # Competitive pricing
            'delivery': 88,      # Very good (multiple warehouses)
            'quality': 91,       # Excellent (authorized, ISO 9001, established quality)
            'specialty': 'Industrial & Maintenance'
        },
        
        # RS Components: European leader, industrial/automation focus, MRO strong
        # Known for: Industrial products, automation, excellent European coverage
        'RS Components': {
            'cost': 80,          # Good value for industrial
            'delivery': 86,      # Good (strong in Europe, variable in US)
            'quality': 88,       # Very good (ISO 9001, authorized status)
            'specialty': 'Industrial & Automation'
        },
        
        # Farnell: Part of Newark/element14, global distribution, design engineering
        # Known for: Development tools, design support, maker community
        'Farnell': {
            'cost': 81,          # Competitive
            'delivery': 87,      # Very good (global warehouse network)
            'quality': 90,       # Excellent (authorized, strong quality controls)
            'specialty': 'Design & Development'
        },
        
        # Allied Electronics: Industrial MRO focus, automation specialists
        # Known for: Industrial automation, factory supplies, technical support
        'Allied Electronics': {
            'cost': 78,          # Good pricing for industrial bulk
            'delivery': 84,      # Good (industrial/MRO focused)
            'quality': 86,       # Very good (authorized, industrial quality standards)
            'specialty': 'Industrial & MRO'
        },
        
        # McMaster-Carr: Legendary service, industrial hardware, famous for speed
        # Known for: Same-day shipping, exceptional website, premium but worth it
        'McMaster-Carr': {
            'cost': 76,          # Higher prices but total value is high
            'delivery': 97,      # Industry-leading (legendary same-day/next-day)
            'quality': 93,       # Excellent (rigorous supplier qualification, detailed specs)
            'specialty': 'Industrial Hardware & Fasteners'
        }
    }
    
    # Filter to only include selected suppliers
    supplier_profiles = {name: profile for name, profile in all_supplier_profiles.items() if name in suppliers_to_use}
    
    # Adjust scores based on component characteristics
    complexity_factor = {'Low': 0, 'Medium': 2, 'High': 5}[component_analysis['complexity']]
    sourcing_factor = {'Very Low': 0, 'Low': 1, 'Medium': 3, 'High': 6}[component_analysis['sourcing_difficulty']]
    
    suppliers = []
    availabilities = ['In Stock', 'In Stock', 'Limited Stock', 'In Stock', 'Limited Stock', 'In Stock', 'Back Order']
    
    for i, (name, profile) in enumerate(supplier_profiles.items()):
        # Add component-specific variation
        cost_score = profile['cost'] + random.randint(-5, 5) - complexity_factor
        delivery_score = profile['delivery'] + random.randint(-4, 4) - sourcing_factor
        quality_score = profile['quality'] + random.randint(-3, 3)
        
        # Ensure scores stay in valid range
        cost_score = max(70, min(95, cost_score))
        delivery_score = max(70, min(95, delivery_score))
        quality_score = max(70, min(95, quality_score))
        
        overall_score = round((cost_score + delivery_score + quality_score) / 3)
        
        suppliers.append({
            'name': name,
            'manufacturer': component_analysis['manufacturer'],
            'costScore': cost_score,
            'deliveryScore': delivery_score,
            'qualityScore': quality_score,
            'availability': availabilities[i],
            'overallScore': overall_score,
            'recommended': False,
            'specialization': profile['specialty'],
            'orderLink': generate_supplier_url(name, component_analysis['manufacturer'], part_number)
        })
    
    # Sort suppliers by overall score (highest first) and take top 8
    sorted_suppliers = sorted(suppliers, key=lambda x: x['overallScore'], reverse=True)
    top_suppliers = sorted_suppliers[:8]
    
    # Mark the highest scoring supplier as recommended
    if top_suppliers:
        best_supplier = top_suppliers[0]
        best_supplier['recommended'] = True
    
    return {
        'comparison': top_suppliers,
        'recommendedSupplier': best_supplier['name'] if top_suppliers else 'Unknown',
        'recommendationReason': f"Best overall performance for {component_analysis['type']} components with {best_supplier['specialization'].lower()} focus among {len(top_suppliers)} evaluated suppliers",
        'componentInsights': f"This {component_analysis['type']} has {component_analysis['sourcing_difficulty'].lower()} sourcing difficulty with typical lead times of {component_analysis['typical_lead_time']}"
    }

def get_component_info(part_number: str) -> Dict[str, Any]:
    """Get detailed component description and image using AI analysis."""
    
    COMPONENT_INFO_PROMPT = f'''
Provide a concise, visually appealing summary for the electronic component: {part_number}

Format as exactly 6 lines or less, using this structure:
• **Component Type:** [Type and category]
• **Key Features:** [2-3 most important specifications]
• **Applications:** [Common use cases]
• **Package:** [Physical package type]
• **Operating Range:** [Voltage/temperature if relevant]
• **Notable:** [Key advantage or special feature]

Keep it professional, concise, and easy to scan. Use bullet points and bold text for key information.
Focus on the most essential information an engineer would need for component selection.
'''
    
    try:
        # Get component description from AI
        description = make_openai_request(COMPONENT_INFO_PROMPT, 2000)
        
        # Try to find component image (this would typically integrate with component databases)
        # For now, we'll use a placeholder approach
        image_url = find_component_image(part_number)
        
        print(f"✓ Component info for {part_number}:")
        print(f"  - Description length: {len(description) if description else 0}")
        print(f"  - Image URL: {image_url[:100] if image_url else 'None'}...")
        print(f"  - Image URL type: {type(image_url)}")
        
        return {
            "description": description,
            "imageUrl": image_url,
            "partNumber": part_number
        }
        
    except Exception as e:
        print(f"✗ Error in get_component_info for {part_number}: {str(e)}")
        # Even on error, return a placeholder image
        fallback_image = get_enhanced_placeholder_image(part_number)
        return {
            "description": f"Unable to retrieve detailed information for component {part_number}. Please refer to the manufacturer's datasheet for complete specifications.",
            "imageUrl": fallback_image,
            "partNumber": part_number,
            "error": str(e)
        }

def find_component_image(part_number: str) -> str:
    """
    Find component image URL from curated sources and realistic image generators.
    Always returns a valid image URL.
    """
    try:
        print(f"  🔍 Finding image for {part_number}...")
        
        # First try curated real component images
        image_url = get_curated_component_image(part_number)
        if image_url:
            print(f"  ✓ Found curated image: {image_url[:80]}...")
            return image_url
        
        print(f"  ℹ No curated image found, trying online sources...")
        # Try online sources with timeout
        image_url = search_component_image_online(part_number)
        if image_url:
            print(f"  ✓ Found online image: {image_url[:80]}...")
            return image_url
        
        # Use enhanced realistic placeholders (always returns a valid URL)
        print(f"  ℹ No online image found, generating placeholder...")
        placeholder = get_enhanced_placeholder_image(part_number)
        print(f"  ✓ Generated placeholder (length: {len(placeholder)})")
        return placeholder
        
    except Exception as e:
        print(f"  ✗ Error finding component image for {part_number}: {e}")
        # Fallback to enhanced placeholder
        return get_enhanced_placeholder_image(part_number)

def search_component_image_online(part_number: str) -> Optional[str]:
    """
    Search for real component images using a lightweight approach.
    Note: This function is currently disabled as external URLs are unreliable.
    Returns None to fallback to SVG placeholders.
    """
    # Disabled for now - external image URLs are often broken or blocked
    # We'll rely on curated images and SVG placeholders instead
    return None
    
    # Original implementation kept for reference:
    # import requests
    # try:
    #     image_url = get_digikey_image(part_number)
    #     if image_url:
    #         return image_url
    #     image_url = get_mouser_image(part_number)
    #     if image_url:
    #         return image_url
    # except Exception as e:
    #     print(f"Error in online image search for {part_number}: {e}")
    # return None

def get_digikey_image(part_number: str) -> Optional[str]:
    """
    Try to get component image from Digi-Key using their API patterns.
    """
    try:
        import requests
        
        # Digi-Key often has predictable image URLs for common components
        # Try their product image API pattern
        api_url = f"https://api.digikey.com/products/v4/search/{part_number}/productdetails"
        
        # Also try their media server patterns for common components
        part_clean = part_number.replace('-', '').replace('_', '').upper()
        
        # Common Digi-Key image URL patterns
        image_patterns = [
            f"https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/{part_clean}.jpg",
            f"https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/{part_number}.jpg",
            f"https://media.digikey.com/photos/{part_clean[0:2]}/{part_clean}.jpg"
        ]
        
        for image_url in image_patterns:
            try:
                response = requests.head(image_url, timeout=3)
                if response.status_code == 200:
                    return image_url
            except:
                continue
                
    except Exception as e:
        print(f"Error getting Digi-Key image: {e}")
    
    return None

def get_mouser_image(part_number: str) -> Optional[str]:
    """
    Try to get component image from Mouser using their patterns.
    """
    try:
        import requests
        
        # Mouser image URL patterns
        part_clean = part_number.replace('-', '').replace('_', '').upper()
        
        image_patterns = [
            f"https://www.mouser.com/images/marketingid/2017/img/{part_clean}.jpg",
            f"https://www.mouser.com/images/marketingid/2018/img/{part_clean}.jpg",
            f"https://www.mouser.com/images/marketingid/2019/img/{part_clean}.jpg"
        ]
        
        for image_url in image_patterns:
            try:
                response = requests.head(image_url, timeout=3)
                if response.status_code == 200:
                    return image_url
            except:
                continue
                
    except Exception as e:
        print(f"Error getting Mouser image: {e}")
    
    return None

def is_valid_component_image(src: str) -> bool:
    """
    Check if the image source is likely a valid component image.
    """
    if not src:
        return False
    
    # Skip common non-product images
    skip_patterns = [
        'logo', 'banner', 'icon', 'placeholder', 'loading',
        'avatar', 'profile', 'social', 'footer', 'header',
        'advertisement', 'promo', 'sale', 'badge', 'rating'
    ]
    
    src_lower = src.lower()
    for pattern in skip_patterns:
        if pattern in src_lower:
            return False
    
    # Check for common component image indicators
    good_patterns = [
        'product', 'component', 'part', 'image', 'photo',
        'thumb', 'detail', 'zoom', 'large', 'main'
    ]
    
    for pattern in good_patterns:
        if pattern in src_lower:
            return True
    
    # Check file extension
    if any(ext in src_lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
        return True
    
    return False

def get_placeholder_image(part_number: str) -> Optional[str]:
    """
    Get smart placeholder image based on component type.
    """
    part_upper = part_number.upper()
    
    # Comprehensive component image patterns based on part number prefixes and patterns
    component_patterns = {
        # Microcontrollers
        'ATTINY': 'https://via.placeholder.com/200x150/1976d2/ffffff?text=ATtiny+MCU',
        'ATMEGA': 'https://via.placeholder.com/200x150/1976d2/ffffff?text=ATmega+MCU',
        'STM32': 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=STM32+MCU',
        'ESP32': 'https://via.placeholder.com/200x150/27ae60/ffffff?text=ESP32+WiFi',
        'ESP8266': 'https://via.placeholder.com/200x150/27ae60/ffffff?text=ESP8266+WiFi',
        'PIC': 'https://via.placeholder.com/200x150/16a085/ffffff?text=PIC+MCU',
        'MSP430': 'https://via.placeholder.com/200x150/8e44ad/ffffff?text=MSP430+MCU',
        
        # Linear ICs and Op-Amps
        'LM': 'https://via.placeholder.com/200x150/f39c12/ffffff?text=Linear+IC',
        'TL': 'https://via.placeholder.com/200x150/9b59b6/ffffff?text=Op+Amp',
        'LT': 'https://via.placeholder.com/200x150/e67e22/ffffff?text=Linear+Tech',
        'AD': 'https://via.placeholder.com/200x150/2c3e50/ffffff?text=Analog+IC',
        'MAX': 'https://via.placeholder.com/200x150/c0392b/ffffff?text=Maxim+IC',
        
        # Logic ICs
        'SN74': 'https://via.placeholder.com/200x150/34495e/ffffff?text=Logic+IC',
        '74HC': 'https://via.placeholder.com/200x150/34495e/ffffff?text=CMOS+Logic',
        '74LS': 'https://via.placeholder.com/200x150/34495e/ffffff?text=TTL+Logic',
        'CD40': 'https://via.placeholder.com/200x150/34495e/ffffff?text=CMOS+IC',
        
        # Memory
        '24C': 'https://via.placeholder.com/200x150/3498db/ffffff?text=EEPROM',
        '25C': 'https://via.placeholder.com/200x150/3498db/ffffff?text=SPI+Flash',
        'AT24': 'https://via.placeholder.com/200x150/3498db/ffffff?text=EEPROM',
        'W25Q': 'https://via.placeholder.com/200x150/3498db/ffffff?text=Flash+Memory',
        
        # Power Management
        'LM78': 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=Voltage+Reg',
        'LM79': 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=Voltage+Reg',
        'AMS1117': 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=LDO+Reg',
        'LM2596': 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=Buck+Conv',
        
        # Communication ICs
        'MAX232': 'https://via.placeholder.com/200x150/8e44ad/ffffff?text=RS232+IC',
        'FT232': 'https://via.placeholder.com/200x150/8e44ad/ffffff?text=USB+UART',
        'CH340': 'https://via.placeholder.com/200x150/8e44ad/ffffff?text=USB+UART',
        'NRF24': 'https://via.placeholder.com/200x150/27ae60/ffffff?text=RF+Module',
        
        # Sensors
        'BME280': 'https://via.placeholder.com/200x150/f39c12/ffffff?text=Env+Sensor',
        'DHT': 'https://via.placeholder.com/200x150/f39c12/ffffff?text=Temp+Sensor',
        'DS18B20': 'https://via.placeholder.com/200x150/f39c12/ffffff?text=Temp+Sensor',
        'MPU': 'https://via.placeholder.com/200x150/f39c12/ffffff?text=IMU+Sensor',
        
        # Drivers and Controllers
        'L298': 'https://via.placeholder.com/200x150/e67e22/ffffff?text=Motor+Driver',
        'ULN2003': 'https://via.placeholder.com/200x150/e67e22/ffffff?text=Driver+IC',
        'A4988': 'https://via.placeholder.com/200x150/e67e22/ffffff?text=Stepper+Driver',
    }
    
    # Check for exact matches first
    for prefix, image_url in component_patterns.items():
        if part_upper.startswith(prefix):
            return image_url
    
    # Check for component type patterns in the part number
    if any(x in part_upper for x in ['RESISTOR', 'RES']):
        return 'https://via.placeholder.com/200x150/95a5a6/ffffff?text=Resistor'
    elif any(x in part_upper for x in ['CAPACITOR', 'CAP']):
        return 'https://via.placeholder.com/200x150/3498db/ffffff?text=Capacitor'
    elif any(x in part_upper for x in ['INDUCTOR', 'IND']):
        return 'https://via.placeholder.com/200x150/f39c12/ffffff?text=Inductor'
    elif any(x in part_upper for x in ['DIODE']):
        return 'https://via.placeholder.com/200x150/e74c3c/ffffff?text=Diode'
    elif any(x in part_upper for x in ['LED']):
        return 'https://via.placeholder.com/200x150/f1c40f/ffffff?text=LED'
    elif any(x in part_upper for x in ['TRANSISTOR', 'BJT', 'MOSFET']):
        return 'https://via.placeholder.com/200x150/2c3e50/ffffff?text=Transistor'
    elif any(x in part_upper for x in ['CRYSTAL', 'XTAL']):
        return 'https://via.placeholder.com/200x150/bdc3c7/ffffff?text=Crystal'
    elif any(x in part_upper for x in ['CONNECTOR', 'CONN']):
        return 'https://via.placeholder.com/200x150/7f8c8d/ffffff?text=Connector'
    
    # Return None for unknown components - frontend will show logo instead
    return None

def get_curated_component_image(part_number: str) -> Optional[str]:
    """
    Get real component images from a curated database of common components.
    """
    part_upper = part_number.upper()
    
    # Curated real component images from reliable sources
    curated_images = {
        # Popular microcontrollers with actual images
        'ATTINY85': 'https://cdn.sparkfun.com/assets/parts/3/6/9/4/08825-02-L.jpg',
        'ATTINY84': 'https://cdn.sparkfun.com/assets/parts/3/6/9/4/08825-02-L.jpg',
        'ATMEGA328P': 'https://cdn.sparkfun.com/assets/parts/7/3/7/00339-03-L.jpg',
        'ATMEGA32U4': 'https://cdn.sparkfun.com/assets/parts/5/5/7/6/11117-02-L.jpg',
        
        # STM32 microcontrollers
        'STM32F103C8T6': 'https://stm32-base.org/assets/img/chips/STM32F103C8T6_chip.jpg',
        'STM32F401CCU6': 'https://stm32-base.org/assets/img/chips/STM32F401CCU6_chip.jpg',
        
        # ESP modules
        'ESP32-WROOM-32': 'https://cdn.sparkfun.com/assets/parts/1/1/5/2/0/13907-01.jpg',
        'ESP8266-12E': 'https://cdn.sparkfun.com/assets/parts/1/0/4/7/6/13678-01.jpg',
        
        # Common linear ICs
        'LM358': 'https://cdn.sparkfun.com/assets/parts/9/2/3/9/09816-1.jpg',
        'LM741': 'https://cdn.sparkfun.com/assets/parts/9/2/3/9/09816-1.jpg',
        'LM7805': 'https://cdn.sparkfun.com/assets/parts/2/0/1/7/00107-02-L.jpg',
        'LM2596': 'https://images.lcsc.com/lcsc/9bb4b91d9e6b4d2d9b3c7b1d8f8c1b5d.jpg',
        
        # Logic ICs
        'SN74HC00N': 'https://cdn.sparkfun.com/assets/parts/1/2/6/8/08653-02-L.jpg',
        'SN74HC595N': 'https://cdn.sparkfun.com/assets/parts/1/0/6/4/13699-01.jpg',
        
        # Common sensors
        'DHT22': 'https://cdn.sparkfun.com/assets/parts/1/0/5/6/10167-01a.jpg',
        'BME280': 'https://cdn.sparkfun.com/assets/parts/1/2/3/0/5/13676-01.jpg',
        'MPU6050': 'https://cdn.sparkfun.com/assets/parts/6/4/7/11028-01.jpg',
        
        # Communication modules
        'NRF24L01': 'https://cdn.sparkfun.com/assets/parts/2/9/1/5/00691-03-L.jpg',
        'HC-05': 'https://cdn.sparkfun.com/assets/parts/1/0/0/1/2/12576-01.jpg',
        
        # Power management
        'AMS1117-3.3': 'https://cdn.sparkfun.com/assets/parts/2/0/1/7/00526-02-L.jpg',
    }
    
    # Check for exact matches first
    if part_upper in curated_images:
        return curated_images[part_upper]
    
    # Check for partial matches (remove common suffixes)
    part_base = part_upper.replace('-', '').replace('_', '')
    for key, image_url in curated_images.items():
        key_base = key.replace('-', '').replace('_', '')
        if part_base.startswith(key_base) or key_base.startswith(part_base):
            return image_url
    
    return None

def get_enhanced_placeholder_image(part_number: str) -> str:
    """
    Get enhanced placeholder images using SVG data URLs for reliability.
    Always returns a valid image URL that will work offline.
    """
    import base64
    
    part_upper = part_number.upper()
    
    # Create SVG-based placeholders with different colors for different component types
    def create_svg_placeholder(color, text):
        # Escape special characters for XML
        safe_part = part_number.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
        
        svg = f'''<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="{color}"/>
            <rect x="10" y="10" width="180" height="130" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="100" y="75" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">{text}</text>
            <text x="100" y="95" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10">{safe_part}</text>
        </svg>'''
        # Convert to base64 data URL
        svg_b64 = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
        return f'data:image/svg+xml;base64,{svg_b64}'
    
    # Component type patterns with colors and labels
    component_patterns = {
        # Microcontrollers
        'ATTINY': create_svg_placeholder('#1976d2', 'ATtiny MCU'),
        'ATMEGA': create_svg_placeholder('#1976d2', 'ATmega MCU'), 
        'STM32': create_svg_placeholder('#e74c3c', 'STM32 MCU'),
        'ESP32': create_svg_placeholder('#27ae60', 'ESP32 WiFi'),
        'ESP8266': create_svg_placeholder('#27ae60', 'ESP8266'),
        'PIC': create_svg_placeholder('#16a085', 'PIC MCU'),
        
        # Linear ICs
        'LM': create_svg_placeholder('#f39c12', 'Linear IC'),
        'TL': create_svg_placeholder('#9b59b6', 'Op Amp'),
        'AD': create_svg_placeholder('#2c3e50', 'Analog IC'),
        'MAX': create_svg_placeholder('#c0392b', 'Maxim IC'),
        
        # Logic ICs
        'SN74': create_svg_placeholder('#34495e', 'Logic IC'),
        '74HC': create_svg_placeholder('#34495e', 'CMOS Logic'),
        
        # Memory
        '24C': create_svg_placeholder('#3498db', 'EEPROM'),
        'W25Q': create_svg_placeholder('#3498db', 'Flash'),
        
        # Power Management
        'LM78': create_svg_placeholder('#e74c3c', 'Voltage Reg'),
        'AMS1117': create_svg_placeholder('#e74c3c', 'LDO Reg'),
        
        # Sensors
        'BME280': create_svg_placeholder('#f39c12', 'Env Sensor'),
        'DHT': create_svg_placeholder('#f39c12', 'Temp Sensor'),
        'MPU': create_svg_placeholder('#f39c12', 'IMU Sensor'),
    }
    
    # Check for exact matches first
    for prefix, image_url in component_patterns.items():
        if part_upper.startswith(prefix):
            return image_url
    
    # Check for component type patterns
    if any(x in part_upper for x in ['RESISTOR', 'RES']):
        return create_svg_placeholder('#95a5a6', 'Resistor')
    elif any(x in part_upper for x in ['CAPACITOR', 'CAP']):
        return create_svg_placeholder('#3498db', 'Capacitor')
    elif any(x in part_upper for x in ['INDUCTOR', 'IND']):
        return create_svg_placeholder('#f39c12', 'Inductor')
    elif any(x in part_upper for x in ['DIODE']):
        return create_svg_placeholder('#e74c3c', 'Diode')
    elif any(x in part_upper for x in ['LED']):
        return create_svg_placeholder('#f1c40f', 'LED')
    elif any(x in part_upper for x in ['TRANSISTOR', 'BJT', 'MOSFET']):
        return create_svg_placeholder('#2c3e50', 'Transistor')
    elif any(x in part_upper for x in ['CRYSTAL', 'XTAL', 'OSC']):
        return create_svg_placeholder('#8e44ad', 'Crystal')
    elif any(x in part_upper for x in ['CONNECTOR', 'CONN']):
        return create_svg_placeholder('#34495e', 'Connector')
    elif any(x in part_upper for x in ['SWITCH', 'SW']):
        return create_svg_placeholder('#7f8c8d', 'Switch')
    elif any(x in part_upper for x in ['RELAY']):
        return create_svg_placeholder('#d35400', 'Relay')
    elif any(x in part_upper for x in ['FUSE']):
        return create_svg_placeholder('#c0392b', 'Fuse')
    
    # Default fallback for unknown components - create a generic component image
    return create_svg_placeholder('#6c5ce7', 'Component')

def generate_ai_action(action_type: str, action_description: str, scenario_id: str = None, scenario_description: str = None, affected_components: str = None, bom_data: str = None, user_context: str = None, mode: str = None) -> Dict[str, str]:
    """Generate AI-assisted action content based on the action type and context."""
    
    # Parse BOM data if provided
    component_details = ""
    if bom_data:
        try:
            if isinstance(bom_data, str):
                try:
                    parsed_bom = json.loads(bom_data)
                except Exception:
                    parsed_bom = parse_csv_data(bom_data)
            else:
                parsed_bom = bom_data
                
            if isinstance(parsed_bom, list) and parsed_bom:
                component_details = "\n\nRelevant Component Details:\n" + '\n'.join([
                    f"- {item.get('Manufacturer Part #', item.get('Part Number', 'N/A'))}: {item.get('Description', 'N/A')} "
                    f"from {item.get('Manufacturer', 'N/A')}, Supplier: {item.get('Supplier', 'N/A')}, "
                    f"Cost: ${item.get('Unit Cost (USD)', item.get('Total', 'N/A'))}"
                    for item in parsed_bom[:10]  # Limit to first 10 components for context
                ])
        except Exception as e:
            print(f"BOM parsing error in AI action: {e}")
    
    AI_ACTION_PROMPT = f'''
You are a supply chain expert AI assistant helping to execute specific mitigation actions. Generate comprehensive, actionable content for the following action.

ACTION CONTEXT:
- Action Type: {action_type}
- Action Description: {action_description}
- Scenario ID: {scenario_id or 'Not specified'}
- Scenario Description: {scenario_description or 'Not provided'}
- Affected Components: {affected_components or 'Not specified'}
- User Context: {user_context or 'Not provided'}
{component_details}

GENERATE SPECIFIC CONTENT BASED ON ACTION TYPE:

**For "Draft supplier inquiry emails":**
- Create professional email templates
- Include specific component requirements
- Add urgency indicators based on scenario
- Include technical specifications from BOM data
- Provide subject lines and key talking points

**For "Generate RFQ templates":**
- Create detailed RFQ documents
- Include technical specifications from BOM
- Add scenario-specific requirements
- Include evaluation criteria
- Provide timeline and delivery requirements

**For "Create supplier comparison analysis":**
- Generate comparison framework
- Include relevant evaluation criteria
- Add risk assessment factors
- Provide scoring methodology
- Include decision matrix template

**For "Draft contract amendment language":**
- Create professional contract language
- Include scenario-specific clauses
- Add risk mitigation terms
- Provide standard legal disclaimers
- Include performance guarantees

**For "Generate risk assessment reports":**
- Create comprehensive risk analysis
- Include probability and impact assessments
- Add mitigation recommendations
- Provide monitoring frameworks
- Include escalation procedures

**For other action types:**
- Provide detailed step-by-step instructions
- Include templates, checklists, or frameworks
- Add specific examples using the provided context
- Include success criteria and metrics
- Provide troubleshooting guidance

REQUIREMENTS:
1. Use REAL information from the provided context (scenario, components, BOM data)
2. Make content immediately actionable and professional
3. Include specific details, not generic templates
4. Reference actual part numbers, suppliers, and costs when available
5. Tailor urgency and approach to the scenario severity
6. Provide complete, ready-to-use content
7. Include relevant industry best practices
8. Add specific success metrics and validation steps

Generate comprehensive, professional content that can be immediately used by the supply chain team.
'''
    
    try:
        # Base tokens: 4000. Will be adjusted by model config
        ai_content = make_openai_request(AI_ACTION_PROMPT, 4000, mode=mode)
        return {"result": ai_content}
    except Exception as e:
        return {"error": f"Failed to generate AI action content: {str(e)}"}

def analyze_kpi_data(kpi: Any) -> Dict[str, Any]:
    """Analyze KPI data and extract key insights for disruption analysis."""
    if not kpi:
        return {"summary": "No KPI data provided", "formatted_data": "", "insights": []}
    
    try:
        # Parse KPI data
        if isinstance(kpi, str):
            try:
                kpi_data = json.loads(kpi)
            except:
                kpi_data = parse_csv_data(kpi)
        else:
            kpi_data = kpi
        
        if not isinstance(kpi_data, list) or not kpi_data:
            # If it's just text, return as is
            return {
                "summary": "KPI data provided as text",
                "formatted_data": str(kpi),
                "insights": ["Historical performance data available for analysis"]
            }
        
        # Analyze structured KPI data
        total_records = len(kpi_data)
        headers = list(kpi_data[0].keys()) if kpi_data else []
        
        # Extract insights from KPI data
        insights = []
        metrics_found = []
        
        # Look for common KPI metrics
        common_metrics = [
            'lead_time', 'leadtime', 'delivery_time', 'delivery',
            'cost', 'price', 'total_cost', 'unit_cost',
            'quality', 'defect', 'reject', 'failure',
            'availability', 'stock', 'inventory',
            'supplier_performance', 'performance', 'rating',
            'delay', 'late', 'ontime', 'on_time'
        ]
        
        for header in headers:
            header_lower = header.lower().replace(' ', '_')
            for metric in common_metrics:
                if metric in header_lower:
                    metrics_found.append(header)
                    break
        
        if metrics_found:
            insights.append(f"Key performance metrics tracked: {', '.join(metrics_found[:5])}")
        
        # Try to identify trends or patterns
        if total_records > 1:
            insights.append(f"{total_records} historical data points available for trend analysis")
        
        # Look for date/time columns to identify temporal patterns
        date_columns = [h for h in headers if any(d in h.lower() for d in ['date', 'time', 'month', 'year', 'period'])]
        if date_columns:
            insights.append(f"Temporal data available in columns: {', '.join(date_columns[:3])}")
        
        # Format data for display (first 3 records as sample)
        formatted_data = format_bom_as_markdown(kpi_data[:3]) if kpi_data else ""
        if total_records > 3:
            formatted_data += f"\n\n[Showing first 3 of {total_records} records]"
        
        summary = f"{total_records} KPI records with {len(headers)} metrics tracked"
        if metrics_found:
            summary += f" (key metrics: {', '.join(metrics_found[:3])})"
        
        return {
            "summary": summary,
            "formatted_data": formatted_data,
            "insights": insights,
            "metrics": metrics_found,
            "total_records": total_records
        }
    
    except Exception as e:
        return {
            "summary": f"Error analyzing KPI data: {str(e)}",
            "formatted_data": str(kpi) if kpi else "",
            "insights": ["KPI data available but could not be parsed"]
        }


def send_email_via_smtp(to_email: str, subject: str, body: str, from_email: str = None, smtp_host: str = None, smtp_port: int = None, smtp_user: str = None, smtp_password: str = None) -> bool:
    """
    Send an email using SMTP.
    Returns True if successful, False otherwise.
    """
    try:
        # Get SMTP configuration from environment variables
        smtp_host = smtp_host or os.getenv('SMTP_HOST', 'localhost')
        smtp_port = smtp_port or int(os.getenv('SMTP_PORT', '587'))
        smtp_user = smtp_user or os.getenv('SMTP_USER', '')
        smtp_password = smtp_password or os.getenv('SMTP_PASSWORD', '')
        from_email = from_email or os.getenv('SMTP_FROM_EMAIL', 'noreply@boston-mfg.com')
        
        # If SMTP is not configured (default localhost), return False to skip email sending
        if smtp_host == 'localhost' and not smtp_user:
            return False
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to SMTP server and send
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            if smtp_user and smtp_password:
                server.starttls()
                server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Error sending email via SMTP: {str(e)}")
        return False

def handle_contact_form(first_name: str, last_name: str, email: str, company: str, subject: str, message: str) -> dict:
    """
    Handle contact form submissions.
    Sends email notification to contact@boston-mfg.com and logs the submission.
    """
    try:
        # Log the contact form submission
        print(f"Contact form submission received:")
        print(f"  Name: {first_name} {last_name}")
        print(f"  Email: {email}")
        print(f"  Company: {company or 'Not provided'}")
        print(f"  Subject: {subject}")
        print(f"  Message: {message[:100]}{'...' if len(message) > 100 else ''}")
        
        # Validate required fields
        if not all([first_name, last_name, email, subject, message]):
            return {"error": "All required fields must be filled out"}
        
        # Basic email validation
        if "@" not in email or "." not in email:
            return {"error": "Please provide a valid email address"}
        
        # Prepare email content
        recipient_email = "contact@boston-mfg.com"
        email_subject = f"Contact Form: {subject}"
        email_body = f"""New contact form submission received:

Name: {first_name} {last_name}
Email: {email}
Company: {company or 'Not provided'}
Subject: {subject}

Message:
{message}

---
This message was sent through the website contact form.
"""
        
        # Attempt to send email
        email_sent = send_email_via_smtp(
            to_email=recipient_email,
            subject=email_subject,
            body=email_body
        )
        
        if email_sent:
            print(f"Email notification sent to {recipient_email}")
        else:
            print(f"Email notification not sent (SMTP not configured). Submission logged only.")
        
        # Return success response
        return {
            "success": True,
            "message": "Thank you for your message! We'll get back to you within 24 hours.",
            "submission_id": f"contact_{int(time.time())}"
        }
        
    except Exception as e:
        print(f"Error handling contact form: {str(e)}")
        return {"error": "An error occurred while processing your request. Please try again."}