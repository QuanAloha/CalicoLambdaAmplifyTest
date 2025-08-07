from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from mangum import Mangum
import logging
from typing import List, Dict, Any

from models import CalicoFact, CatBreed, GalleryItem
from data.calico_data import CALICO_FACTS, CAT_BREEDS, GALLERY_ITEMS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Calico Cat Encyclopedia API",
    description="A comprehensive API for learning about Calico cats",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/", response_model=Dict[str, str])
async def root():
    """Health check endpoint"""
    return {
        "message": "🐱 Welcome to the Calico Cat Encyclopedia API!",
        "status": "healthy",
        "version": "1.0.0"
    }

# API endpoints
@app.get("/api/facts", response_model=List[CalicoFact])
async def get_calico_facts():
    """Get all calico cat facts"""
    try:
        logger.info("Fetching calico facts")
        return CALICO_FACTS
    except Exception as e:
        logger.error(f"Error fetching facts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch calico facts")

@app.get("/api/facts/{fact_id}", response_model=CalicoFact)
async def get_calico_fact(fact_id: int):
    """Get a specific calico cat fact by ID"""
    try:
        fact = next((fact for fact in CALICO_FACTS if fact["id"] == fact_id), None)
        if not fact:
            raise HTTPException(status_code=404, detail="Fact not found")
        return fact
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching fact {fact_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch calico fact")

@app.get("/api/breeds", response_model=List[CatBreed])
async def get_cat_breeds():
    """Get all cat breeds that can have calico patterns"""
    try:
        logger.info("Fetching cat breeds")
        return CAT_BREEDS
    except Exception as e:
        logger.error(f"Error fetching breeds: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch cat breeds")

@app.get("/api/breeds/{breed_name}", response_model=CatBreed)
async def get_cat_breed(breed_name: str):
    """Get a specific cat breed by name"""
    try:
        breed = next((breed for breed in CAT_BREEDS if breed["name"].lower() == breed_name.lower()), None)
        if not breed:
            raise HTTPException(status_code=404, detail="Breed not found")
        return breed
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching breed {breed_name}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch cat breed")

@app.get("/api/gallery", response_model=List[GalleryItem])
async def get_gallery_items():
    """Get all gallery items (calico patterns)"""
    try:
        logger.info("Fetching gallery items")
        return GALLERY_ITEMS
    except Exception as e:
        logger.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery items")

@app.get("/api/gallery/{pattern_type}", response_model=List[GalleryItem])
async def get_gallery_by_type(pattern_type: str):
    """Get gallery items filtered by pattern type"""
    try:
        filtered_items = [item for item in GALLERY_ITEMS if item["type"].lower() == pattern_type.lower()]
        if not filtered_items:
            raise HTTPException(status_code=404, detail="No items found for this pattern type")
        return filtered_items
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching gallery for type {pattern_type}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery items")

@app.get("/api/stats", response_model=Dict[str, Any])
async def get_calico_stats():
    """Get interesting statistics about calico cats"""
    try:
        stats = {
            "total_facts": len(CALICO_FACTS),
            "total_breeds": len(CAT_BREEDS),
            "total_gallery_items": len(GALLERY_ITEMS),
            "fact_categories": list(set(fact["category"] for fact in CALICO_FACTS)),
            "pattern_types": list(set(item["type"] for item in GALLERY_ITEMS)),
            "interesting_facts": {
                "female_percentage": "99.9%",
                "male_calico_rarity": "1 in 3,000",
                "x_chromosomes_needed": 2,
                "breeds_with_calicos": "12+"
            }
        }
        return stats
    except Exception as e:
        logger.error(f"Error generating stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate statistics")

# Error handler
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "🙀 Oops! This calico cat information couldn't be found."}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "😿 Something went wrong with our calico cat database."}
    )

# Mangum handler for AWS Lambda
handler = Mangum(app)

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)