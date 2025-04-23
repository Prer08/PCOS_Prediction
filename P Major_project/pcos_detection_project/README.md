# PCOS/PCOD Detection System

A full-stack web application for the detection of Polycystic Ovary Syndrome (PCOS) and Polycystic Ovarian Disease (PCOD) using machine learning models.

## Overview

This application integrates three different machine learning models for PCOS/PCOD detection:

1. **Clinical Features Model (MLP)**: Uses 20 clinical features to predict PCOS/PCOD
2. **Ultrasound Image Model (CNN)**: Analyzes ultrasound images to detect PCOS/PCOD
3. **Fusion Model**: Combines both clinical data and ultrasound images for a more comprehensive prediction

## Project Structure

```
pcos_detection_project/
│
├── backend/                     # Flask API for model inference
│   ├── app.py                   # Main Flask app
│   ├── ml_models/               # ML model files
│   │   ├── test_mlp.py          # MLP inference script (clinical)
│   │   ├── cnn_testing.py       # CNN inference script (image)
│   │   ├── fusion_testing.py    # Fusion model (clinical + image)
│   │   ├── MLP_model2.pth       # Trained model weights
│   ├── requirements.txt         # Python dependencies
│
├── frontend/                    # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClinicalForm.jsx # Form for clinical input
│   │   │   ├── ImageUpload.jsx  # Image upload for CNN model
│   │   │   ├── ResultDisplay.jsx # Component to show results
│   │   ├── App.jsx              # Main app logic
│   │   ├── api.js               # Handles API requests to backend
│   ├── package.json             # React dependencies
```

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd pcos_detection_project/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```
   python app.py
   ```
   The server will start at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd pcos_detection_project/frontend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will be available at http://localhost:3000

## Usage

1. Select a prediction model:
   - Clinical Features Model: Uses only patient clinical data
   - Ultrasound Image Model: Uses only ultrasound images
   - Fusion Model: Uses both clinical data and ultrasound images

2. Input the required data:
   - For Clinical Features Model: Fill out the clinical form with patient data
   - For Ultrasound Image Model: Upload an ultrasound image
   - For Fusion Model: Both clinical form and ultrasound image are required

3. Submit the data and view the prediction results

## Important Notes

- This application is for educational and research purposes only
- It is not a substitute for professional medical advice, diagnosis, or treatment
- Always consult with healthcare professionals for proper diagnosis and treatment

## Technologies Used

- **Backend**: Python, Flask, PyTorch, OpenCV, NumPy, Pandas
- **Frontend**: React, TailwindCSS, Axios

## License

This project is for educational purposes only. Not for commercial use. 