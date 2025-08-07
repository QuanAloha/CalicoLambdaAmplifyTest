from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class FactCategory(str, Enum):
    GENETICS = "genetics"
    CULTURE = "culture"
    HISTORY = "history"
    PERSONALITY = "personality"
    GENERAL = "general"

class PatternType(str, Enum):
    TRADITIONAL = "traditional"
    DILUTE = "dilute"
    CALIBY = "caliby"

class CalicoFact(BaseModel):
    id: int = Field(..., description="Unique identifier for the fact")
    title: str = Field(..., description="Title of the fact")
    description: str = Field(..., description="Detailed description of the fact")
    category: FactCategory = Field(..., description="Category of the fact")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "title": "Almost Always Female",
                "description": "About 99.9% of calico cats are female due to X-chromosome genetics.",
                "category": "genetics"
            }
        }

class CatBreed(BaseModel):
    name: str = Field(..., description="Name of the cat breed")
    description: str = Field(..., description="Description of the breed")
    temperament: str = Field(..., description="Typical temperament of the breed")
    characteristics: List[str] = Field(..., description="Key physical characteristics")

    class Config:
        schema_extra = {
            "example": {
                "name": "American Shorthair",
                "description": "Medium to large cats with muscular builds and strong hunting instincts.",
                "temperament": "Independent, intelligent, friendly",
                "characteristics": ["Sturdy build", "Round face", "Dense coat"]
            }
        }

class GalleryItem(BaseModel):
    id: int = Field(..., description="Unique identifier for the gallery item")
    type: PatternType = Field(..., description="Type of calico pattern")
    name: str = Field(..., description="Name of the pattern")
    description: str = Field(..., description="Description of the pattern")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "type": "traditional",
                "name": "Traditional Calico",
                "description": "Classic white base with distinct black and orange patches."
            }
        }

class HealthResponse(BaseModel):
    message: str
    status: str
    version: str

class StatsResponse(BaseModel):
    total_facts: int
    total_breeds: int
    total_gallery_items: int
    fact_categories: List[str]
    pattern_types: List[str]
    interesting_facts: dict