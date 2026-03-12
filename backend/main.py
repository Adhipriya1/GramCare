from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Nabha Rural TeleHealth API")

# Add CORS Middleware so the React frontend can talk to it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# 1. Load the final optimized components
# Ensure these files are in the same directory as this script
try:
    model = joblib.load('final_optimized_model.pkl')
    features = joblib.load('final_features_list.pkl')
    le = joblib.load('final_label_encoder.pkl')
except FileNotFoundError:
    print("Error: Optimized model files not found. Please run the training script first.")

# 2. Define the Severity Mapping based on Nabha's medical needs
SEVERITY_MAP = {
    'Heart attack': 'High', 
    'Paralysis (brain hemorrhage)': 'High', 
    'Pneumonia': 'High', 
    'Tuberculosis': 'High', 
    'Dengue': 'High', 
    'AIDS': 'High',
    'Malaria': 'Medium', 
    'Typhoid': 'Medium', 
    'Jaundice': 'Medium', 
    'Diabetes ': 'Medium', 
    'Hypertension ': 'Medium',
    'Common Cold': 'Low', 
    'Fungal infection': 'Low', 
    'Acne': 'Low', 
    'Psoriasis': 'Low', 
    'Allergy': 'Low', 
    'Impetigo': 'Low'
}

# Translate complex medical terms to generalized, easy-to-understand terms
FRIENDLY_DIAGNOSIS_MAP = {
    'Paralysis (brain hemorrhage)': 'Stroke / Bleeding in Brain',
    'Hypertension ': 'High Blood Pressure',
    'Diabetes ': 'High Blood Sugar (Diabetes)',
    'GERD': 'Severe Acidity / Heartburn',
    'Impetigo': 'Skin Infection with Sores',
    'Psoriasis': 'Chronic Skin Rash',
    'Fungal infection': 'Skin Fungal Infection',
    'Acne': 'Skin Pimples',
    'Tuberculosis': 'Severe Lung Infection (TB)',
    'Pneumonia': 'Deep Lung Infection (Pneumonia)',
    'Jaundice': 'Liver Issue (Yellowing/Jaundice)',
    'Typhoid': 'Continuous Fever with Stomach Issues (Typhoid)',
    'Malaria': 'Fever with Chills (Malaria)',
    'Dengue': 'Severe Joint-pain Fever (Dengue)',
    'Allergy': 'Allergic Reaction',
    'Common Cold': 'Viral Cold or Fever',
    'Heart attack': 'Heart Attack / Emergency',
    'AIDS': 'Severe Immune System Weakness'
}

@app.get("/")
async def root():
    return {"message": "Nabha Rural TeleHealth API is running successfully! The React frontend can now connect to the /predict endpoint."}

class SymptomRequest(BaseModel):
    selected_symptoms: list[str]

@app.post("/predict")
async def predict_triage(data: SymptomRequest):
    # 3. Create input vector (Binary: 1 if symptom present, 0 if not)
    input_vector = np.zeros(len(features))
    for i, feature in enumerate(features):
        if feature in data.selected_symptoms:
            input_vector[i] = 1
            
    # 4. Inference
    prediction_idx = model.predict([input_vector])[0]
    diagnosis = le.inverse_transform([prediction_idx])[0]
    
    # Translate to rural-friendly diagnosis
    friendly_diagnosis = FRIENDLY_DIAGNOSIS_MAP.get(diagnosis, diagnosis)
    
    # 5. Severity Logic & Triage Instructions
    severity = SEVERITY_MAP.get(diagnosis, "Medium")
    
    if severity == "High":
        # Direct intervention for 173 villages
        recommendation = "EMERGENCY: Proceed to Nabha Civil Hospital immediately."
    elif severity == "Medium":
        # Remote support to assist the 11 doctors
        recommendation = "Consult a doctor remotely via Audio/Video call within 24 hours."
    else:
        # Self-care to reduce hospital burden
        recommendation = "Monitor symptoms at home. If they worsen, use the app to consult a pharmacist."

    return {
        "diagnosis": friendly_diagnosis,
        "severity": severity,
        "recommendation": recommendation,
        "offline_ready": True
    }
