from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import logging

from models import CalicoFact, CatBreed, GalleryItem
from data.calico_data import CALICO_FACTS, CAT_BREEDS, GALLERY_ITEMS

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["calico"])

@router.get("/facts/search")
async def search_facts(
    category: Optional[str] = Query(None, description="Filter by category"),
    keyword: Optional[str] = Query(None, description="Search in title or description")
):
    """Search calico facts by category or keyword"""
    try:
        facts = CALICO_FACTS
        
        if category:
            facts = [fact for fact in facts if fact["category"].lower() == category.lower()]
            
        if keyword:
            keyword = keyword.lower()
            facts = [
                fact for fact in facts 
                if keyword in fact["title"].lower() or keyword in fact["description"].lower()
            ]
            
        return facts
    except Exception as e:
        logger.error(f"Error searching facts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search facts")

@router.get("/breeds/search")  
async def search_breeds(
    temperament: Optional[str] = Query(None, description="Filter by temperament"),
    keyword: Optional[str] = Query(None, description="Search in name or description")
):
    """Search cat breeds by temperament or keyword"""
    try:
        breeds = CAT_BREEDS
        
        if temperament:
            temperament = temperament.lower()
            breeds = [
                breed for breed in breeds 
                if temperament in breed["temperament"].lower()
            ]
            
        if keyword:
            keyword = keyword.lower()
            breeds = [
                breed for breed in breeds
                if keyword in breed["name"].lower() or keyword in breed["description"].lower()
            ]
            
        return breeds
    except Exception as e:
        logger.error(f"Error searching breeds: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search breeds")

@router.get("/random/fact")
async def get_random_fact():
    """Get a random calico fact"""
    try:
        import random
        return random.choice(CALICO_FACTS)
    except Exception as e:
        logger.error(f"Error getting random fact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get random fact")

@router.get("/random/breed") 
async def get_random_breed():
    """Get a random cat breed"""
    try:
        import random
        return random.choice(CAT_BREEDS)
    except Exception as e:
        logger.error(f"Error getting random breed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get random breed")