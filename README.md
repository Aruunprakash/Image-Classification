# 🏆 SportVision AI — Sports Celebrity Image Classification

![SportVision Banner](https://img.shields.io/badge/SportVision-AI%20Image%20Classification-1D4ED8?style=for-the-badge\&logo=opencv\&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live_Demo-sports--vision--ai.netlify.app-blue?style=flat\&logo=netlify)](https://sports-vision-ai.netlify.app)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat\&logo=python\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=flat\&logo=flask\&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=flat\&logo=opencv\&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-SVM-F7931E?style=flat\&logo=scikit-learn\&logoColor=white)
![License](https://img.shields.io/badge/License-Educational-green?style=flat)

---

# 📌 Overview

**SportVision AI** is a full-stack Computer Vision and Machine Learning web application that identifies famous sports personalities from uploaded images.

The system combines **OpenCV Haar Cascade Face Detection**, **Wavelet Transform Feature Extraction**, and a trained **Support Vector Machine (SVM)** classifier to accurately recognize athletes from facial images.

Users simply upload an image, and the application automatically detects the face, extracts features, predicts the celebrity, and displays prediction confidence for every supported class.

---

# 🌐 Live Demo

### 🚀 Frontend

https://sports-vision-ai.netlify.app

### ⚙️ Backend API

https://sportvision-sports-person-image.onrender.com

---

# ✨ Features

* 🧠 AI-powered sports celebrity recognition
* 📸 Automatic face detection using OpenCV Haar Cascades
* 👀 Detects faces only when **both eyes are visible**
* 🌊 Wavelet Transform based feature extraction
* 🎯 Support Vector Machine (SVM) classifier
* 📊 Prediction confidence for every class
* 🌐 Flask REST API backend
* 🎨 Responsive modern UI
* ☁️ Backend deployed on Render
* ⚡ Frontend deployed on Netlify
* 🔄 Real-time frontend–backend communication

---

# 🛠 Tech Stack

| Layer                    | Technology                    |
| ------------------------ | ----------------------------- |
| **Programming Language** | Python                        |
| **Computer Vision**      | OpenCV, Haar Cascade          |
| **Feature Extraction**   | Wavelet Transform             |
| **Machine Learning**     | Scikit-Learn, SVM             |
| **Model Serialization**  | Joblib                        |
| **Backend**              | Flask, Flask-CORS, Gunicorn   |
| **Frontend**             | HTML5, CSS3, JavaScript (ES6) |
| **Deployment**           | Render, Netlify               |
| **Version Control**      | Git & GitHub                  |

---

# 📁 Project Structure

```text
SportVision-Sports-person-image-classifier/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── server/
│   ├── __init__.py
│   ├── server.py
│   ├── util.py
│   ├── wavelet.py
│   ├── artifacts/
│   │     ├── model.pkl
│   │     └── class_dictionary.json
│   │
│   └── opencv/
│         └── haarcascades/
│
├── model/
│   ├── dataset/
│   ├── image_ds/
│   ├── celebrity_classifier.ipynb
│   └── training scripts
│
├── requirements.txt
├── .python-version
└── README.md
```

---

# 🧠 Machine Learning Workflow

## 1️⃣ Dataset Collection

* Sports celebrity images collected and organized class-wise
* Multiple images used per athlete

---

## 2️⃣ Face Detection

OpenCV Haar Cascade detects

* Face
* Eyes

Only faces with **at least two detected eyes** are retained for both training and prediction.

---

## 3️⃣ Image Preprocessing

Detected faces are

* Cropped
* Resized to **32 × 32**
* Converted into numerical arrays

---

## 4️⃣ Feature Engineering

Two feature vectors are generated.

### RGB Image Features

Original 32×32 color image

### Wavelet Features

Wavelet Transform extracts structural facial features and edges.

Both vectors are concatenated into one final feature vector.

---

## 5️⃣ Model Training

* Train/Test Split
* Support Vector Machine (SVM)
* Hyperparameter tuning using GridSearchCV
* Cross Validation
* Best model serialized using Joblib

---

# 🚀 Application Workflow

```text
Image Upload
      │
      ▼
Face Detection
(OpenCV Haar Cascade)
      │
      ▼
Eye Detection
(Requires 2 Eyes)
      │
      ▼
Crop Face
      │
      ▼
Resize (32×32)
      │
      ▼
Wavelet Transform
      │
      ▼
Combine RGB + Wavelet Features
      │
      ▼
Support Vector Machine
      │
      ▼
Prediction Probabilities
      │
      ▼
Display Result
```

---

# 🚀 Running Locally

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Start Backend

```bash
cd server
python server.py
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Run Frontend

Open

```
client/index.html
```

or

```bash
python -m http.server
```

---

# 🔌 API Endpoint

## POST `/classify_image`

Classifies the uploaded sports celebrity image.

### Request

Form Data

```
image_data = Base64 Encoded Image
```

---

### Sample Response

```json
[
    {
        "class": "virat_kohli",
        "class_probability": {
            "virat_kohli": 99.93,
            "messi": 0.01,
            "roger_federer": 0.01,
            "serena_williams": 0.05,
            "maria_sharapova": 0.00
        }
    }
]
```

---

# 👥 Supported Athletes

* 🏏 Virat Kohli
* ⚽ Lionel Messi
* 🎾 Roger Federer
* 🎾 Serena Williams
* 🎾 Maria Sharapova

---

# 📊 Model Highlights

* Face Detection using Haar Cascade
* Wavelet Feature Extraction
* RGB + Wavelet Feature Fusion
* Support Vector Machine Classification
* Real-time Prediction
* Probability-based Confidence Scores

---

# 🌍 Deployment

## Frontend

Netlify

https://sports-vision-ai.netlify.app

---

## Backend

Render

https://sportvision-sports-person-image.onrender.com

---

# 📷 Preview

> *(Add screenshots here)*

* Home Page
* Image Upload
* Prediction Result
* Probability Chart
* Mobile View

---

# 📈 Future Improvements

* Add more sports personalities
* Deep Learning (CNN/Transfer Learning) classifier
* Webcam-based live prediction
* Batch image classification
* Model confidence visualization
* User authentication & prediction history

---

# 📜 License

This project is developed for **educational and portfolio purposes**.

---

# 👨‍💻 Author

## Arun Prakash

**GitHub**

https://github.com/Aruunprakash

---

⭐ **If you found this project useful, don't forget to Star the repository!**
