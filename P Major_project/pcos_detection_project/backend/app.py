from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import torch
import numpy as np
from PIL import Image
import io
import base64
import sys
import traceback

# Add the ml_models directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml_models'))

# Import dummy model to use as fallback
try:
    from dummy_model import predict_pcos_clinical, predict_pcos_image, predict_pcos_fusion
    DUMMY_MODEL_AVAILABLE = True
except ImportError:
    print("WARNING: Dummy model not available. Application will have limited fallback capabilities.")
    DUMMY_MODEL_AVAILABLE = False

# Flag to track if PyTorch models are available
PYTORCH_MODELS_AVAILABLE = True

# Try to import the model scripts, but don't fail if they're not available
try:
    from test_mlp import PCOS_MLP, preprocess_pcos_test_data
    from cnn_testing import PCOS_CNN, preprocess_single_image
    from fusion_testing import PCOS_Multimodal
except ImportError as e:
    print(f"WARNING: Failed to import PyTorch models: {e}")
    PYTORCH_MODELS_AVAILABLE = False

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define paths to model weights
MLP_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml_models', 'MLP_model2.pth')
CNN_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml_models', 'CNN_model.pth')
FUSION_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml_models', 'FUSION_model.pth')

# Check for model existence and print warning if missing
def check_model_exists(model_path, model_name):
    if not os.path.exists(model_path):
        print(f"WARNING: {model_name} file not found at {model_path}")
        return False
    return True

# Check model files and print status
MLP_MODEL_AVAILABLE = check_model_exists(MLP_MODEL_PATH, "MLP Model")
CNN_MODEL_AVAILABLE = check_model_exists(CNN_MODEL_PATH, "CNN Model")
FUSION_MODEL_AVAILABLE = check_model_exists(FUSION_MODEL_PATH, "Fusion Model")

# Define the clinical features used by the models
CLINICAL_FEATURES = [
    'Weight (Kg)', 'Cycle(R/I)', 'Cycle length(days)', 'beta-HCG(mIU/mL)', 'FSH(mIU/mL)',
    'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)',
    'Vit D3 (ng/mL)', 'Weight gain(Y/N)', 'hair growth(Y/N)', 'Skin darkening (Y/N)',
    'Fast food (Y/N)', 'Follicle No. (L)', 'Follicle No. (R)', 'Avg. F size (L) (mm)',
    'Avg. F size (R) (mm)'
]

# Global variables to store loaded models
mlp_model = None
cnn_model = None
fusion_model = None
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_mlp_model():
    """Load the MLP model for clinical data prediction"""
    global mlp_model
    
    # If PyTorch is not available or MLP model file doesn't exist, don't attempt to load
    if not PYTORCH_MODELS_AVAILABLE or not MLP_MODEL_AVAILABLE:
        print("Using dummy MLP model")
        return None
    
    if mlp_model is None:
        try:
            input_dim = len(CLINICAL_FEATURES)
            mlp_model = PCOS_MLP(input_dim).to(device)
            mlp_model.load_state_dict(torch.load(MLP_MODEL_PATH, map_location=device))
            mlp_model.eval()
            print("Successfully loaded MLP model")
        except Exception as e:
            print(f"ERROR loading MLP model: {e}")
            traceback.print_exc()
            return None
            
    return mlp_model

def load_cnn_model():
    """Load the CNN model for ultrasound image prediction"""
    global cnn_model
    
    # If PyTorch is not available or CNN model file doesn't exist, don't attempt to load
    if not PYTORCH_MODELS_AVAILABLE or not CNN_MODEL_AVAILABLE:
        print("Using dummy CNN model")
        return None
    
    if cnn_model is None:
        try:
            cnn_model = PCOS_CNN().to(device)
            cnn_model.load_state_dict(torch.load(CNN_MODEL_PATH, map_location=device))
            cnn_model.eval()
            print("Successfully loaded CNN model")
        except Exception as e:
            print(f"ERROR loading CNN model: {e}")
            traceback.print_exc()
            return None
            
    return cnn_model

def load_fusion_model():
    """Load the fusion model for combined prediction"""
    global fusion_model
    
    # If PyTorch is not available or Fusion model file doesn't exist, don't attempt to load
    if not PYTORCH_MODELS_AVAILABLE or not FUSION_MODEL_AVAILABLE:
        print("Using dummy Fusion model")
        return None
    
    if fusion_model is None:
        try:
            tabular_input_dim = len(CLINICAL_FEATURES)
            fusion_model = PCOS_Multimodal(tabular_input_dim).to(device)
            fusion_model.load_state_dict(torch.load(FUSION_MODEL_PATH, map_location=device))
            fusion_model.eval()
            print("Successfully loaded Fusion model")
        except Exception as e:
            print(f"ERROR loading Fusion model: {e}")
            traceback.print_exc()
            return None
            
    return fusion_model

def decode_image(base64_string):
    """Convert base64 string to image"""
    if "base64," in base64_string:
        base64_string = base64_string.split("base64,")[1]
    image_bytes = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_bytes))
    return image

def save_temp_image(image):
    """Save image temporarily for processing"""
    temp_path = os.path.join(os.path.dirname(__file__), 'temp_image.jpg')
    image.save(temp_path)
    return temp_path

@app.route('/predict_mlp', methods=['POST'])
def predict_mlp():
    try:
        # Get clinical data from request
        data = request.json
        
        # Convert clinical data into the format expected by the model
        clinical_data = {}
        for feature in CLINICAL_FEATURES:
            clinical_data[feature] = float(data.get(feature, 0))
        
        # Try to use the PyTorch model if available
        model = load_mlp_model()
        
        if model is not None:
            # Create a DataFrame for the clinical data
            import pandas as pd
            df = pd.DataFrame([clinical_data])
            
            # Preprocess data
            input_tensor = torch.tensor(df[CLINICAL_FEATURES].values, dtype=torch.float32).to(device)
            
            # Make prediction
            with torch.no_grad():
                try:
                    output = model(input_tensor)
                    prediction_prob = output.cpu().numpy().item() if isinstance(output.cpu().numpy(), np.ndarray) else output.cpu().numpy()[0][0]
                    prediction = 1 if prediction_prob >= 0.5 else 0
                    
                    result = {
                        'prediction': int(prediction),
                        'probability': float(prediction_prob),
                        'pcos_detected': bool(prediction == 1),
                        'model_type': 'pytorch'
                    }
                except Exception as model_error:
                    print(f"Error during MLP inference: {model_error}")
                    if DUMMY_MODEL_AVAILABLE:
                        # Fall back to dummy model
                        result = predict_pcos_clinical(clinical_data)
                        result['model_type'] = 'fallback'
                    else:
                        raise
        elif DUMMY_MODEL_AVAILABLE:
            # Use dummy model if PyTorch model is not available
            result = predict_pcos_clinical(clinical_data)
            result['model_type'] = 'fallback'
        else:
            return jsonify({'error': 'No prediction model available'}), 500
        
        # Return result
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in predict_mlp: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/predict_cnn', methods=['POST'])
def predict_cnn():
    try:
        # Get image from request
        data = request.json
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Decode and save image
        image = decode_image(image_data)
        temp_path = save_temp_image(image)
        
        # Try to use the PyTorch model if available
        model = load_cnn_model()
        
        if model is not None and PYTORCH_MODELS_AVAILABLE:
            try:
                # Preprocess image
                image_tensor = preprocess_single_image(temp_path)
                image_tensor = image_tensor.unsqueeze(0).to(device)  # Add batch dimension
                
                # Make prediction
                with torch.no_grad():
                    features = model(image_tensor)
                    # The CNN model outputs features, we need to add a classifier to get prediction
                    output = torch.sigmoid(model.classifier(features))
                    prediction_prob = output.cpu().numpy().item() if isinstance(output.cpu().numpy(), np.ndarray) else output.cpu().numpy()[0][0]
                    prediction = 1 if prediction_prob >= 0.5 else 0
                    
                    result = {
                        'prediction': int(prediction),
                        'probability': float(prediction_prob),
                        'pcos_detected': bool(prediction == 1),
                        'model_type': 'pytorch'
                    }
            except Exception as model_error:
                print(f"Error during CNN inference: {model_error}")
                traceback.print_exc()
                if DUMMY_MODEL_AVAILABLE:
                    # Fall back to dummy model
                    result = predict_pcos_image(temp_path)
                    result['model_type'] = 'fallback'
                else:
                    raise
        elif DUMMY_MODEL_AVAILABLE:
            # Use dummy model if PyTorch model is not available
            result = predict_pcos_image(temp_path)
            result['model_type'] = 'fallback'
        else:
            return jsonify({'error': 'No prediction model available'}), 500
        
        # Clean up temp file
        try:
            os.remove(temp_path)
        except:
            pass
        
        # Return result
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in predict_cnn: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/predict_fusion', methods=['POST'])
def predict_fusion():
    try:
        # Get data from request
        data = request.json
        image_data = data.get('image')
        clinical_data = data.get('clinical_data')
        
        if not image_data or not clinical_data:
            return jsonify({'error': 'Both image and clinical data required'}), 400
        
        # Decode and save image
        image = decode_image(image_data)
        temp_path = save_temp_image(image)
        
        # Process clinical data
        clinical_features = {}
        for feature in CLINICAL_FEATURES:
            clinical_features[feature] = float(clinical_data.get(feature, 0))
        
        # Try to use the PyTorch model if available
        model = load_fusion_model()
        
        if model is not None and PYTORCH_MODELS_AVAILABLE:
            try:
                # Preprocess image
                image_tensor = preprocess_single_image(temp_path)
                image_tensor = image_tensor.unsqueeze(0).to(device)  # Add batch dimension
                
                # Preprocess clinical data
                import pandas as pd
                df = pd.DataFrame([clinical_features])
                clinical_tensor = torch.tensor(df[CLINICAL_FEATURES].values, dtype=torch.float32).to(device)
                
                # Make prediction
                with torch.no_grad():
                    output = model(clinical_tensor, image_tensor)
                    prediction_prob = output.cpu().numpy().item() if isinstance(output.cpu().numpy(), np.ndarray) else output.cpu().numpy()[0][0]
                    prediction = 1 if prediction_prob >= 0.5 else 0
                    
                    result = {
                        'prediction': int(prediction),
                        'probability': float(prediction_prob),
                        'pcos_detected': bool(prediction == 1),
                        'model_type': 'pytorch'
                    }
            except Exception as model_error:
                print(f"Error during Fusion inference: {model_error}")
                traceback.print_exc()
                if DUMMY_MODEL_AVAILABLE:
                    # Fall back to dummy model
                    result = predict_pcos_fusion(clinical_features, temp_path)
                    result['model_type'] = 'fallback'
                else:
                    raise
        elif DUMMY_MODEL_AVAILABLE:
            # Use dummy model if PyTorch model is not available
            result = predict_pcos_fusion(clinical_features, temp_path)
            result['model_type'] = 'fallback'
        else:
            return jsonify({'error': 'No prediction model available'}), 500
        
        # Clean up temp file
        try:
            os.remove(temp_path)
        except:
            pass
        
        # Return result
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in predict_fusion: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# Add new routes for the unified API endpoints
@app.route('/api/predict', methods=['POST'])
def predict():
    """Unified endpoint for clinical-based prediction"""
    try:
        # Forward to the MLP prediction function
        return predict_mlp()
    except Exception as e:
        print(f"Error in /api/predict: {str(e)}")
        traceback.print_exc()
        
        # Provide fallback result if dummy model is available
        if DUMMY_MODEL_AVAILABLE:
            try:
                clinical_data = {}
                for feature in CLINICAL_FEATURES:
                    clinical_data[feature] = float(request.json.get(feature, 0))
                    
                fallback_result = predict_pcos_clinical(clinical_data)
                fallback_result['model_type'] = 'fallback'
                
                return jsonify({
                    'error': str(e),
                    'message': 'Using fallback prediction model',
                    'fallback_result': fallback_result
                }), 200
            except Exception as fallback_error:
                print(f"Error in fallback prediction: {fallback_error}")
                
        return jsonify({'error': str(e), 'message': 'Failed to make prediction'}), 500

@app.route('/api/predict-image', methods=['POST'])
def predict_image():
    """Unified endpoint for image-based prediction"""
    try:
        # Get image from request
        image_file = request.files.get('image')
        
        if not image_file:
            return jsonify({'error': 'No image provided'}), 400
        
        # Save image temporarily
        temp_path = os.path.join(os.path.dirname(__file__), 'temp_upload.jpg')
        image_file.save(temp_path)
        
        # Create image data in the format expected by predict_cnn
        with open(temp_path, 'rb') as f:
            image_bytes = f.read()
            base64_image = base64.b64encode(image_bytes).decode('utf-8')
            
        # Call the existing CNN prediction with the encoded image
        data = {'image': f"data:image/jpeg;base64,{base64_image}"}
        
        # Try to use the PyTorch model
        model = load_cnn_model()
        
        if model is not None and PYTORCH_MODELS_AVAILABLE:
            try:
                # Preprocess image
                image_tensor = preprocess_single_image(temp_path)
                image_tensor = image_tensor.unsqueeze(0).to(device)  # Add batch dimension
                
                # Make prediction
                with torch.no_grad():
                    features = model(image_tensor)
                    # The CNN model outputs features, we need to add a classifier to get prediction
                    output = torch.sigmoid(model.classifier(features))
                    prediction_prob = output.cpu().numpy().item() if isinstance(output.cpu().numpy(), np.ndarray) else output.cpu().numpy()[0][0]
                    prediction = 1 if prediction_prob >= 0.5 else 0
                    
                    result = {
                        'prediction': int(prediction),
                        'probability': float(prediction_prob),
                        'pcos_detected': bool(prediction == 1),
                        'model_type': 'pytorch'
                    }
            except Exception as model_error:
                print(f"Error during CNN inference: {model_error}")
                traceback.print_exc()
                if DUMMY_MODEL_AVAILABLE:
                    # Fall back to dummy model
                    result = predict_pcos_image(temp_path)
                    result['model_type'] = 'fallback'
                else:
                    raise
        elif DUMMY_MODEL_AVAILABLE:
            # Use dummy model if PyTorch model is not available
            result = predict_pcos_image(temp_path)
            result['model_type'] = 'fallback'
        else:
            return jsonify({'error': 'No prediction model available'}), 500
        
        # Clean up
        try:
            os.remove(temp_path)
        except:
            pass
            
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in /api/predict-image: {str(e)}")
        traceback.print_exc()
        
        # Provide fallback result if dummy model is available
        if DUMMY_MODEL_AVAILABLE:
            try:
                fallback_result = predict_pcos_image()
                fallback_result['model_type'] = 'fallback'
                
                return jsonify({
                    'error': str(e),
                    'message': 'Using fallback prediction model',
                    'fallback_result': fallback_result
                }), 200
            except Exception as fallback_error:
                print(f"Error in fallback prediction: {fallback_error}")
                
        return jsonify({'error': str(e), 'message': 'Failed to process image'}), 500

@app.route('/model_status', methods=['GET'])
def model_status():
    """Endpoint to check the status of the models"""
    return jsonify({
        "mlp_model": {
            "file_exists": MLP_MODEL_AVAILABLE,
            "pytorch_available": PYTORCH_MODELS_AVAILABLE,
            "fallback_available": DUMMY_MODEL_AVAILABLE
        },
        "cnn_model": {
            "file_exists": CNN_MODEL_AVAILABLE,
            "pytorch_available": PYTORCH_MODELS_AVAILABLE,
            "fallback_available": DUMMY_MODEL_AVAILABLE
        },
        "fusion_model": {
            "file_exists": FUSION_MODEL_AVAILABLE,
            "pytorch_available": PYTORCH_MODELS_AVAILABLE,
            "fallback_available": DUMMY_MODEL_AVAILABLE
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    print("\n\n===== PCOS Detection System Backend =====")
    print(f"PyTorch models available: {PYTORCH_MODELS_AVAILABLE}")
    print(f"MLP model file: {'✓' if MLP_MODEL_AVAILABLE else '✗'}")
    print(f"CNN model file: {'✓' if CNN_MODEL_AVAILABLE else '✗'}")
    print(f"Fusion model file: {'✓' if FUSION_MODEL_AVAILABLE else '✗'}")
    print(f"Fallback models: {'✓' if DUMMY_MODEL_AVAILABLE else '✗'}")
    print("=========================================\n")
    app.run(debug=True) 