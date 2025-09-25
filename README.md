# 🏔️ RockSafe AI

<div align="center">

> **Advanced AI-Powered Rockfall Prediction & Emergency Alert System**  
> *Protecting Lives Through Intelligent Mining Safety Technology*

![Mining Safety](https://img.shields.io/badge/Mining-Safety-orange?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-Frontend-cyan?style=for-the-badge)
![SMS Alerts](https://img.shields.io/badge/SMS-Alerts-red?style=for-the-badge)

</div>

---

## ✨ **Key Features**

### 🤖 **AI-Powered Risk Assessment**
- **Advanced Machine Learning**: Voting Classifier with Random Forest + SVM
- **30+ Feature Analysis**: Geological, environmental, and sensor data fusion
- **Real-time Processing**: Sub-100ms prediction response time
- **Probability Scoring**: Confidence-based risk assessment (0-100%)
- **Automated Preprocessing**: Feature scaling and normalization
- **Location Intelligence**: GPS-based categorical encoding

### 🚨 **Emergency Alert System**
- **🔴 CRITICAL Alerts** (>75%): Immediate evacuation SMS alerts
- **🟠 HIGH Risk Alerts** (50-75%): Urgent safety protocol SMS notifications  
- **📱 Twilio Integration**: Professional SMS delivery service
- **📞 Multi-Contact Support**: Broadcast alerts to emergency teams
- **⚡ Real-time Notifications**: Instant alert delivery
- **📋 Alert Tracking**: SMS delivery status and reporting

### 🎯 Prediction Interface
- Real-time risk assessment dashboard
- Interactive risk visualization
- Dual input modes:
  - Form-based input with parameter validation
  - Direct JSON input for batch processing
- Animated risk level indicators with status alerts

### 📊 Monitoring & Analytics
- Dynamic risk mapping
- Real-time sensor data integration
- Historical trend analysis
- Alert management system
- Interactive data visualizations

### 🛠️ Technical Stack
- **Frontend**: React + TypeScript
- **Backend**: FastAPI + Python
- **ML Stack**: scikit-learn, NumPy, Pandas
- **UI Components**: shadcn/ui + Tailwind CSS
- **Data Visualization**: Recharts

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- Python >= 3.10
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rockfall-ai.git
cd rockfall-ai

# Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

# Frontend Setup
cd ../ui
npm install
npm run dev
```

## 📚 Usage

1. Navigate to `http://localhost:8080`
2. Access the Prediction Center
3. Input geological parameters or paste JSON data
4. View real-time risk assessment
5. Monitor alerts and notifications

## 🔧 Configuration

### Environment Variables
```env
PORT=8080
BACKEND_URL=http://localhost:8000
MODEL_PATH=./models/model.pkl
```

## 🛡️ Risk Levels

| Level | Range | Action |
|-------|--------|---------|
| 🔴 Critical | >75% | Immediate evacuation |
| 🟠 High | 50-75% | Urgent assessment |
| 🟡 Moderate | 25-50% | Enhanced monitoring |
| 🟢 Low | <25% | Regular monitoring |

## 📈 Performance

- Model Accuracy: 92%
- Response Time: <100ms
- Real-time Processing: Enabled
- Continuous Learning: Supported

## 🤝 Contributing
Pull requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License
This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🌟 Acknowledgements
- Mining Safety Standards Association
- Geological Survey Department
- AI Safety Initiative

---
Made for mining safety!