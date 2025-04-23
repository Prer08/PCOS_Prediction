"""
Simple rule-based dummy model for PCOS prediction 
when the main model files aren't available.

This will be used as a fallback to ensure the application works.
"""
import numpy as np
import pandas as pd

def predict_pcos_clinical(clinical_data):
    """
    Simple rule-based PCOS prediction based on clinical features
    
    Args:
        clinical_data: dict containing clinical features
        
    Returns:
        dict with prediction results
    """
    # Convert to pandas Series
    if isinstance(clinical_data, dict):
        data = pd.Series(clinical_data)
    else:
        data = clinical_data
    
    # Define scoring system (higher score = higher PCOS probability)
    score = 0.0
    
    # 1. Menstrual irregularity
    if data.get('Cycle(R/I)', 0) >= 1:  # Irregular
        score += 1.5
    
    if data.get('Cycle length(days)', 0) > 35:
        score += 1.0
    
    # 2. Hormone levels
    if data.get('FSH/LH', 0) < 1.0:  # LH higher than FSH is a PCOS indicator
        score += 1.0
    
    if data.get('LH(mIU/mL)', 0) > 10:
        score += 0.5
    
    # 3. Follicle count and size
    if data.get('Follicle No. (L)', 0) > 12 or data.get('Follicle No. (R)', 0) > 12:
        score += 1.0
    
    # 4. Clinical signs
    if data.get('hair growth(Y/N)', 0) == 1:  # Hirsutism
        score += 0.75
    
    if data.get('Skin darkening (Y/N)', 0) == 1:  # Acanthosis nigricans
        score += 0.5
    
    if data.get('Weight gain(Y/N)', 0) == 1:
        score += 0.5
    
    # Normalize score to [0,1] range - max possible score is around 6.75
    probability = min(1.0, score / 6.75)
    
    # Decision threshold
    prediction = 1 if probability >= 0.5 else 0
    
    return {
        'prediction': int(prediction),
        'probability': float(probability),
        'pcos_detected': bool(prediction == 1)
    }

def predict_pcos_image(image_path=None):
    """
    Dummy image prediction - returns a neutral prediction
    
    Args:
        image_path: Path to image file (not actually used)
        
    Returns:
        dict with prediction results
    """
    # Return a neutral prediction with slight negative bias when we don't have an image model
    return {
        'prediction': 0,
        'probability': 0.45,
        'pcos_detected': False
    }

def predict_pcos_fusion(clinical_data, image_path=None):
    """
    Fusion prediction - combines clinical and image data
    
    Args:
        clinical_data: dict containing clinical features
        image_path: Path to image file
        
    Returns:
        dict with prediction results
    """
    # Get clinical prediction with higher weight
    clinical_result = predict_pcos_clinical(clinical_data)
    
    # Weight for clinical vs image (70% clinical, 30% fixed neutral)
    clinical_weight = 0.7
    image_weight = 0.3
    
    # Combined probability
    probability = (clinical_result['probability'] * clinical_weight) + (0.45 * image_weight)
    
    # Decision
    prediction = 1 if probability >= 0.5 else 0
    
    return {
        'prediction': int(prediction),
        'probability': float(probability),
        'pcos_detected': bool(prediction == 1)
    } 