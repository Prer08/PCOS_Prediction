from flask import Flask, request, jsonify
import os
from flask_cors import CORS
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
PYTORCH_MODELS_AVAILABLE = False

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the clinical features used by the models
CLINICAL_FEATURES = [
    'Weight (Kg)', 'Cycle(R/I)', 'Cycle length(days)', 'beta-HCG(mIU/mL)', 'FSH(mIU/mL)',
    'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)',
    'Vit D3 (ng/mL)', 'Weight gain(Y/N)', 'hair growth(Y/N)', 'Skin darkening (Y/N)',
    'Fast food (Y/N)', 'Follicle No. (L)', 'Follicle No. (R)', 'Avg. F size (L) (mm)',
    'Avg. F size (R) (mm)'
]

@app.route('/api/predict_mlp', methods=['POST'])
def predict_mlp():
    try:
        # Get clinical data from request
        data = request.json
        
        # Convert clinical data into the format expected by the model
        clinical_data = {}
        for feature in CLINICAL_FEATURES:
            clinical_data[feature] = float(data.get(feature, 0))
        
        # Use dummy model
        if DUMMY_MODEL_AVAILABLE:
            result = predict_pcos_clinical(clinical_data)
            result['model_type'] = 'fallback'
            return jsonify(result)
        else:
            return jsonify({'error': 'No prediction model available'}), 500
    
    except Exception as e:
        print(f"Error in predict_mlp: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict_cnn', methods=['POST'])
def predict_cnn():
    try:
        # Use dummy model
        if DUMMY_MODEL_AVAILABLE:
            result = predict_pcos_image()
            result['model_type'] = 'fallback'
            return jsonify(result)
        else:
            return jsonify({'error': 'No prediction model available'}), 500
    
    except Exception as e:
        print(f"Error in predict_cnn: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict_fusion', methods=['POST'])
def predict_fusion():
    try:
        # Get data from request
        data = request.json
        clinical_data = data.get('clinical_data')
        
        # Process clinical data
        clinical_features = {}
        for feature in CLINICAL_FEATURES:
            clinical_features[feature] = float(clinical_data.get(feature, 0))
        
        # Use dummy model
        if DUMMY_MODEL_AVAILABLE:
            result = predict_pcos_fusion(clinical_features, None)
            result['model_type'] = 'fallback'
            return jsonify(result)
        else:
            return jsonify({'error': 'No prediction model available'}), 500
    
    except Exception as e:
        print(f"Error in predict_fusion: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    print("\n\n===== OvaDetect Backend =====")
    print(f"Fallback models: {'✓' if DUMMY_MODEL_AVAILABLE else '✗'}")
    print("=========================================\n")
    app.run(debug=True, port=5000) 