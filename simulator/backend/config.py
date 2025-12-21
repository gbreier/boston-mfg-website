"""
Configuration settings for the Supply Chain Simulator backend.
"""

import os
from typing import List
try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # OpenAI Configuration
    openai_api_key: str = ""
    openai_model: str = "gpt-5"
    openai_mode: str = "comprehensive"
    openai_max_tokens: int = 2000
    openai_timeout: int = 360  # Increased timeout for comprehensive analysis
    openai_max_retries: int = 3
    
    # Anthropic Configuration
    anthropic_api_key: str = ""
    
    # Server Configuration
    port: int = 8000
    host: str = "0.0.0.0"
    debug: bool = True
    log_level: str = "INFO"
    
    # CORS Configuration
    allowed_origins: str = "http://localhost:3000,http://localhost:8000,http://127.0.0.1:3000,http://127.0.0.1:8000"
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Parse allowed_origins string into a list."""
        if isinstance(self.allowed_origins, str):
            return [origin.strip() for origin in self.allowed_origins.split(',') if origin.strip()]
        return self.allowed_origins if isinstance(self.allowed_origins, list) else []
    
    # Supplier Configuration
    default_lead_time: int = 7
    
    # Supplier lead time estimates (in days)
    supplier_lead_times: dict = {
        'digi-key': 3, 'digikey': 3, 'mouser': 5, 'jlcpcb': 7, 'pcbway': 7,
        'oshpark': 10, 'adafruit': 5, 'sparkfun': 5, 'arrow': 7, 'avnet': 7,
        'newark': 5, 'farnell': 5, 'element14': 5, 'rs-components': 5, 'allied': 5,
        'mcmaster': 2, 'mcmaster-carr': 2, 'stockwell': 7, 'essentra': 5, 'richco': 7,
        'hammond': 10, 'te connectivity': 7, 'microchip': 14, 'vishay': 10,
        'samsung': 14, 'lite-on': 10, 'rutronik': 7
    }
    
    # Supplier URL patterns
    supplier_url_patterns: dict = {
        'tme': lambda manufacturer, part_number: f"https://www.tme.com/en/katalog/?search={part_number}",
        'digi-key': lambda manufacturer, part_number: f"https://www.digikey.com/en/products/search?keywords={part_number}",
        'digikey': lambda manufacturer, part_number: f"https://www.digikey.com/en/products/search?keywords={part_number}",
        'mouser': lambda manufacturer, part_number: f"https://www.mouser.com/c/?q={part_number}",
        'arrow': lambda manufacturer, part_number: f"https://www.arrow.com/en/products/search?q={part_number}",
        'avnet': lambda manufacturer, part_number: f"https://www.avnet.com/shop/us/search/{part_number}",
        'newark': lambda manufacturer, part_number: f"https://www.newark.com/search?st={part_number}",
        'farnell': lambda manufacturer, part_number: f"https://uk.farnell.com/search?st={part_number}",
        'rs': lambda manufacturer, part_number: f"https://uk.rs-online.com/web/c/search?searchTerm={part_number}",
        'rs-components': lambda manufacturer, part_number: f"https://uk.rs-online.com/web/c/search?searchTerm={part_number}",
        'allied': lambda manufacturer, part_number: f"https://www.alliedelec.com/search?keywords={part_number}",
        'mcmaster': lambda manufacturer, part_number: f"https://www.mcmaster.com/search?query={part_number}",
        'mcmaster-carr': lambda manufacturer, part_number: f"https://www.mcmaster.com/search?query={part_number}",
        'element14': lambda manufacturer, part_number: f"https://www.element14.com/community/search?q={part_number}",
        'future': lambda manufacturer, part_number: f"https://www.futureelectronics.com/search?text={part_number}",
        'verical': lambda manufacturer, part_number: f"https://www.verical.com/search?q={part_number}",
        'quest': lambda manufacturer, part_number: f"https://www.questcomp.com/search?query={part_number}",
        'utmel': lambda manufacturer, part_number: f"https://www.utmel.com/search?keyword={part_number}",
        'lcsc': lambda manufacturer, part_number: f"https://www.lcsc.com/search?q={part_number}",
        'chip1stop': lambda manufacturer, part_number: f"https://www.chip1stop.com/search?keyword={part_number}",
        'onlinecomponents': lambda manufacturer, part_number: f"https://www.onlinecomponents.com/search?keyword={part_number}",
        'rutronik': lambda manufacturer, part_number: f"https://www.rutronik.com/search/?q={part_number}"
    }
    
    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ChatGPT.API.env")
        env_file_encoding = "utf-8"
        case_sensitive = False
        extra = "ignore"  # Ignore extra fields in env file


# Global settings instance
settings = Settings()
print(f"Config loading API key: {settings.openai_api_key[:20] + '...' if settings.openai_api_key else 'None'}")
print(f"Config env_file path: {settings.Config.env_file}") 