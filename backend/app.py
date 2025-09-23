from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import joblib, json, os, numpy as np

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

def load_if_exists(name):
    p = os.path.join(MODEL_DIR, name)
    return joblib.load(p) if os.path.exists(p) else None

model = load_if_exists("model.pkl")
preproc = load_if_exists("preproc.pkl")
label_encoder = load_if_exists("label_encoder.pkl")

with open(os.path.join(MODEL_DIR, "feature_cols.json"), "r") as f:
    FEATURE_COLS = json.load(f)

with open(os.path.join(MODEL_DIR, "metadata.json"), "r") as f:
    METADATA = json.load(f)

app = FastAPI(title="RockSafe Local API")

# Configure CORS with more permissive settings
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
    max_age=3600,
)

class PredictByArray(BaseModel):
    features: List[float]         # must be exactly len(FEATURE_COLS)

class PredictByMap(BaseModel):
    feature_map: Dict[str, Any]  # dict of feature_name -> value

class PredictResponse(BaseModel):
    prediction: int
    probability: Optional[float] = None
    used_threshold: float
    raw_score: Optional[float] = None
    message: Optional[str] = None

@app.get("/metadata")
def metadata():
    return {
        "model_loaded": model is not None,
        "n_expected_features": len(FEATURE_COLS),
        "feature_cols_sample": FEATURE_COLS[:10],
        "metadata": METADATA
    }

def prepare_array_from_map(fmap):
    """
    Build ordered array matching FEATURE_COLS.
    If label_encoder exists and a feature is 'location_encoded' but fmap contains 'location_id',
    attempt to encode it.
    """
    arr = []
    for col in FEATURE_COLS:
        if col in fmap:
            arr.append(fmap[col])
        elif col == "location_encoded" and "location_id" in fmap and label_encoder is not None:
            try:
                enc = int(label_encoder.transform([fmap["location_id"]])[0])
            except Exception:
                enc = 0
            arr.append(enc)
        elif col in fmap:
            arr.append(fmap[col])
        else:
            # missing feature -> default 0
            arr.append(0)
    return np.array(arr, dtype=float).reshape(1, -1)

@app.post("/predict", response_model=PredictResponse)
@app.options("/predict")  # Add an options endpoint to handle preflight
async def predict_by_array(payload: PredictByArray = None, payload_map: PredictByMap = None):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server.")

    # Choose input mode
    if payload and payload.features:
        x = np.array(payload.features, dtype=float).reshape(1, -1)
        if x.shape[1] != len(FEATURE_COLS):
            raise HTTPException(status_code=400, detail=f"Expected {len(FEATURE_COLS)} features, got {x.shape[1]}")
    elif payload_map and payload_map.feature_map:
        x = prepare_array_from_map(payload_map.feature_map)
    else:
        raise HTTPException(status_code=400, detail="Send either 'features' (ordered list) or 'feature_map' (dict).")

    # apply preprocessing if exists
    try:
        if preproc is not None:
            x_proc = preproc.transform(x)
        else:
            x_proc = x
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Preprocessing failed: {e}")

    # get probability if available
    raw_score = None
    prob = None
    try:
        if hasattr(model, "predict_proba"):
            prob = float(model.predict_proba(x_proc)[0, 1])
            raw_score = prob
        else:
            # some models might give decision_function
            if hasattr(model, "decision_function"):
                raw_score = float(model.decision_function(x_proc)[0])
                # optional: convert to 0-1 using sigmoid
                prob = 1 / (1 + np.exp(-raw_score))
            else:
                pred = int(model.predict(x_proc)[0])
                return PredictResponse(prediction=pred, probability=None, used_threshold=METADATA.get("cost_threshold", 0.5), raw_score=None)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {e}")

    threshold = float(METADATA.get("cost_threshold", 0.5))
    pred_binary = int(prob > threshold)

    return PredictResponse(prediction=pred_binary, probability=prob, used_threshold=threshold, raw_score=raw_score)
