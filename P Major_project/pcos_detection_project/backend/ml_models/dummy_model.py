"""
Simple rule-based models to be used as fallbacks when the trained ML models are not available.
These are not meant to be accurate but provide some basic functionality for testing.
"""

import random

def predict_pcos_clinical(clinical_data):
    """
    Simple rule-based prediction based on clinical data.
    This is not medically accurate and should only be used for testing when ML models are unavailable.
    
    Returns a dict with prediction results.
    """
    # Calculate risk based on some common PCOS indicators
    risk_score = 0.0
    
    # Menstrual irregularities
    if clinical_data.get('Cycle(R/I)') == 1:  # Irregular cycle
        risk_score += 0.2
    
    # Hormone levels indicating PCOS
    if clinical_data.get('LH(mIU/mL)', 0) > 10:
        risk_score += 0.1
    
    # FSH/LH ratio less than 1 is a PCOS indicator
    if clinical_data.get('FSH/LH', 0) < 1:
        risk_score += 0.15
    
    # Polycystic ovaries (based on follicle counts)
    if clinical_data.get('Follicle No. (L)', 0) > 12 or clinical_data.get('Follicle No. (R)', 0) > 12:
        risk_score += 0.2
    
    # Clinical symptoms
    if clinical_data.get('Weight gain(Y/N)') == 1:
        risk_score += 0.05
    
    if clinical_data.get('hair growth(Y/N)') == 1:
        risk_score += 0.1
    
    if clinical_data.get('Skin darkening (Y/N)') == 1:
        risk_score += 0.05
    
    # Add some randomization to simulate model variance (within ±10%)
    risk_score = max(0.0, min(1.0, risk_score + (random.random() - 0.5) * 0.2))
    
    # Binary prediction (PCOS or not)
    prediction = 1 if risk_score >= 0.5 else 0
    
    return {
        'prediction': prediction,
        'probability': float(risk_score),
        'pcos_detected': bool(prediction == 1)
    }

def predict_pcos_image(image_path=None):
    """
    Dummy prediction for ultrasound images.
    Since we can't actually analyze the image without ML, we return a random prediction.
    
    Returns a dict with prediction results.
    """
    # Generate a random probability with 40% chance of PCOS detection
    probability = random.random() * 0.8 + 0.1  # Value between 0.1 and 0.9
    prediction = 1 if probability >= 0.5 else 0
    
    return {
        'prediction': prediction,
        'probability': float(probability),
        'pcos_detected': bool(prediction == 1)
    }

def predict_pcos_fusion(clinical_data, image_path=None):
    """
    Dummy fusion model that combines clinical and image data.
    Simply weights the clinical prediction more heavily than the image prediction.
    
    Returns a dict with prediction results.
    """
    clinical_result = predict_pcos_clinical(clinical_data)
    image_result = predict_pcos_image(image_path)
    
    # Weight clinical data (70%) more than image data (30%)
    combined_probability = clinical_result['probability'] * 0.7 + image_result['probability'] * 0.3
    prediction = 1 if combined_probability >= 0.5 else 0
    
    return {
        'prediction': prediction,
        'probability': float(combined_probability),
        'pcos_detected': bool(prediction == 1)
    } 