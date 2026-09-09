# Transfer Learning for Images

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-ee4c2c?logo=pytorch)](https://pytorch.org/)
[![TorchVision](https://img.shields.io/badge/TorchVision-0.15%2B-orange)](https://pytorch.org/vision/stable/index.html)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Dataset](https://img.shields.io/badge/Dataset-Oxford%20102%20Flowers-yellow)](https://www.robots.ox.ac.uk/~vgg/data/flowers/102/)

A deep learning project demonstrating **transfer learning and fine-tuning of pretrained convolutional neural networks** for automated flower species classification.

The project compares **VGG16** and **ResNet50**, both initialized with ImageNet-pretrained weights and fine-tuned on the **Oxford 102 Flower Dataset**.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Objectives](#-objectives)
* [Key Features](#-key-features)
* [Models](#-models)
* [Dataset](#-dataset)
* [Transfer Learning Approach](#-transfer-learning-approach)
* [Project Workflow](#-project-workflow)
* [Repository Structure](#-repository-structure)
* [Installation](#-installation)
* [Dataset Setup](#-dataset-setup)
* [Training](#-training)
* [Inference](#-inference)
* [Web Application](#-web-application)
* [Model Performance](#-model-performance)
* [Model Comparison](#-model-comparison)
* [Example Prediction](#-example-prediction)
* [Model Limitations](#-model-limitations)
* [Hardware Requirements](#-hardware-requirements)
* [Docker](#-docker)
* [Testing](#-testing)
* [Future Improvements](#-future-improvements)
* [Use Cases](#-use-cases)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)
* [Acknowledgements](#-acknowledgements)

---

## 🔎 Overview

Training a deep neural network from scratch generally requires a large dataset, significant computational resources, and considerable training time.

**Transfer learning** provides an efficient alternative.

Instead of learning visual features from random initialization, this project starts with CNN models pretrained on ImageNet. The pretrained networks already contain useful low-level and high-level visual representations such as:

* Edges
* Shapes
* Textures
* Patterns
* Object structures

These learned representations are then adapted to the flower classification problem.

This project implements transfer learning using:

* **VGG16**
* **ResNet50**
* **PyTorch**
* **TorchVision**
* **Oxford 102 Flower Dataset**

The models are evaluated using multiple classification metrics and compared based on both accuracy and computational efficiency.

---

## 🎯 Objectives

The main objectives of this project are to:

1. Understand transfer learning for computer vision.
2. Use ImageNet-pretrained CNN architectures.
3. Adapt pretrained models to a new classification task.
4. Compare VGG16 and ResNet50.
5. Implement feature extraction.
6. Implement fine-tuning.
7. Apply image preprocessing and augmentation.
8. Evaluate classification performance.
9. Analyze model errors and confusion between visually similar classes.
10. Deploy the trained model through a web application.
11. Provide reproducible training and inference workflows.

---

## ✨ Key Features

* Image classification using deep learning.
* ImageNet-pretrained VGG16.
* ImageNet-pretrained ResNet50.
* Two-stage transfer learning strategy.
* Feature extraction.
* Fine-tuning of pretrained layers.
* Image augmentation.
* 102-class flower classification.
* Top-1 and Top-5 accuracy evaluation.
* Precision, recall and F1-score.
* Confusion analysis.
* CPU and GPU inference comparison.
* Cross-validation analysis.
* Flask-based prediction interface.
* Docker support.
* Model documentation and model card.
* Automated model-loading test.

---

## 🧠 Models

### VGG16

VGG16 is a convolutional neural network containing:

* 13 convolutional layers
* 5 max-pooling layers
* 3 fully connected layers
* Approximately 138 million parameters

The final classification layer is replaced with a custom classifier containing **102 output classes**.

### ResNet50

ResNet50 uses residual connections to make deep neural networks easier to optimize.

The model contains:

* 50 layers
* Residual blocks
* Bottleneck architecture
* Global average pooling
* Approximately 25.6 million parameters

Its final classification layer is adapted for the 102 flower categories.

---

## 📊 Dataset

This project uses the **Oxford 102 Flower Dataset**.

The dataset contains:

* **102 flower categories**
* **8,189 images**
* Different flower species and visual characteristics

### Dataset Split

| Split      |    Images |
| ---------- | --------: |
| Training   |     1,020 |
| Validation |     1,020 |
| Test       |     6,149 |
| **Total**  | **8,189** |

The training and validation sets use 10 images per class, while the remaining images are used for testing.

---

## 🔄 Transfer Learning Approach

The project follows a two-phase training strategy.

### Phase 1 — Feature Extraction

During the first phase:

1. Load ImageNet-pretrained model.
2. Freeze pretrained convolutional layers.
3. Replace the original classifier.
4. Train only the new classification head.

Configuration:

```text
Optimizer: Adam
Learning Rate: 0.001
Epochs: 10
Batch Size: 32
Loss: CrossEntropyLoss
```

This allows the new classifier to learn how to map pretrained visual representations to flower categories.

---

### Phase 2 — Fine-Tuning

After feature extraction:

1. Unfreeze selected deeper layers.
2. Continue training the model.
3. Use a smaller learning rate.
4. Adapt pretrained features to the flower domain.

Configuration:

```text
Learning Rate: 0.0001
Epochs: 10
Optimizer: Adam
Scheduler: StepLR
Learning Rate Decay: 0.1
Decay Step: 5 epochs
```

Fine-tuning allows the model to learn flower-specific representations while preserving useful ImageNet features.

---

## 🖼️ Image Preprocessing

Input images are processed using the following pipeline:

```text
Original Image
      ↓
Resize to 256 × 256
      ↓
Center Crop to 224 × 224
      ↓
Convert to Tensor
      ↓
ImageNet Normalization
      ↓
Model
```

Training images additionally use augmentation such as:

* Random resized crop
* Random rotation
* Random horizontal flip
* Color jitter

These transformations help reduce overfitting and improve generalization.

---

## 🔬 Project Workflow

```text
                ┌─────────────────────┐
                │ Oxford 102 Dataset  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Data Preprocessing  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Data Augmentation   │
                └──────────┬──────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │ ImageNet Pretrained CNN │
              └────────────┬─────────────┘
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
             ┌─────────┐       ┌─────────┐
             │ VGG16   │       │ ResNet50│
             └────┬────┘       └────┬────┘
                  │                 │
                  ▼                 ▼
           Feature Extraction  Feature Extraction
                  │                 │
                  ▼                 ▼
             Fine-Tuning       Fine-Tuning
                  │                 │
                  └────────┬────────┘
                           ▼
                   Model Evaluation
                           │
                           ▼
                    Model Comparison
                           │
                           ▼
                    Flask Web App
```

---

## 📁 Repository Structure

```text
Transfer-Learning-for-Images/
│
├── data/
│   └── ...
│
├── models/
│   └── ...
│
├── notebooks/
│   └── ...
│
├── static/
│   └── ...
│
├── templates/
│   └── ...
│
├── .env.example
├── .gitattributes
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTE.md
├── Dockerfile
├── FIX_SUMMARY.md
├── Procfile
├── README.md
├── app.py
├── config.py
├── dataset_license.md
├── docker-compose.yml
├── download_dataset.py
├── download_fonts.py
├── download_images.py
├── model_card.md
├── requirements.txt
├── runtime.txt
└── test_model_loading.py
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/InfinitePraveen/Transfer-Learning-for-Images.git
```

```bash
cd Transfer-Learning-for-Images
```

### 2. Create a virtual environment

#### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

#### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 📥 Dataset Setup

Download and prepare the Oxford 102 Flower Dataset using the repository's dataset utility:

```bash
python download_dataset.py
```

The dataset should be placed under:

```text
data/
```

The project also contains dataset licensing information in:

```text
dataset_license.md
```

---

## 📓 Jupyter Notebooks

The `notebooks/` directory contains the experimentation and machine learning workflow.

The notebooks cover areas such as:

* Dataset exploration
* Data preprocessing
* Exploratory analysis
* Model preparation
* Transfer learning
* Fine-tuning
* Model evaluation
* Prediction

Run Jupyter Notebook with:

```bash
jupyter notebook
```

or:

```bash
jupyter lab
```

---

## 🏋️ Training

The general training process is:

```text
Load Dataset
     ↓
Preprocess Images
     ↓
Load ImageNet Model
     ↓
Replace Classifier
     ↓
Freeze Backbone
     ↓
Train Classifier
     ↓
Unfreeze Selected Layers
     ↓
Fine-Tune
     ↓
Evaluate
     ↓
Save Model
```

The trained models can then be used by the inference application.

---

## 🔮 Inference

The trained models accept RGB images resized to:

```text
224 × 224
```

The output is a probability distribution over:

```text
102 flower classes
```

A prediction consists of:

* Predicted flower class
* Classification probability
* Top predictions

For best results, use images that are:

* Clear
* Well-lit
* Centered
* Focused on a single flower
* Similar to the training-domain images

---

# 🌐 Web Application

The project includes a Flask-based web application for image classification.

Start the application with:

```bash
python app.py
```

The application provides an interface where a user can upload an image and obtain a flower classification prediction.

The application uses the trained deep learning model for inference.

---

## 📈 Model Performance

The trained models achieved the following reported results:

| Metric          |  VGG16 |  ResNet50 |
| --------------- | -----: | --------: |
| Top-1 Accuracy  |  85.2% | **92.7%** |
| Top-5 Accuracy  |  95.8% | **97.3%** |
| Macro Precision |  84.6% | **92.1%** |
| Macro Recall    |  83.9% | **91.8%** |
| Macro F1        |  84.2% | **91.9%** |
| CPU Inference   | 120 ms | **45 ms** |
| GPU Inference   |   8 ms |  **3 ms** |
| Model Size      | 528 MB | **98 MB** |

Based on these results, **ResNet50 provides the better overall trade-off between classification performance, model size, and inference speed**.

---

## 🏆 Model Comparison

### VGG16

**Advantages**

* Simple and easy to understand.
* Well-established architecture.
* Strong baseline for transfer learning.
* Useful for educational purposes.

**Disadvantages**

* Large number of parameters.
* Large model size.
* Slower inference.
* Higher computational requirements.

### ResNet50

**Advantages**

* Higher classification accuracy.
* Significantly smaller model.
* Faster inference.
* Residual connections make deeper networks easier to train.
* Better overall efficiency.

**Disadvantages**

* More complex architecture.
* Requires more understanding of residual networks.

### Overall Winner

**ResNet50** is the recommended model for this project based on the reported evaluation results.

---

## 🔍 Cross-Validation

The project also evaluates model stability using 5-fold cross-validation.

| Fold     |     VGG16 |  ResNet50 |
| -------- | --------: | --------: |
| 1        |     84.1% |     91.8% |
| 2        |     85.3% |     92.4% |
| 3        |     84.8% |     92.1% |
| 4        |     86.1% |     93.2% |
| 5        |     85.7% |     92.9% |
| **Mean** | **85.2%** | **92.5%** |
| **Std**  |  **0.7%** |  **0.5%** |

The relatively small standard deviations indicate consistent performance across the folds.

---

## 🔬 Error Analysis

Some flower species are visually very similar and can therefore be confused by the models.

Reported examples include:

| Class Pair                 | Confusion |
| -------------------------- | --------: |
| Rose vs Peony              |       23% |
| Azalea vs Rhododendron     |       18% |
| Carnation vs Sweet William |       15% |

This demonstrates an important challenge in fine-grained image classification: visually similar categories may require more specialized features.

---

## ⚠️ Limitations

The model has several limitations.

### 1. Limited Number of Classes

The model recognizes only the 102 flower categories represented in the training dataset.

It should not be assumed to recognize arbitrary flower species.

### 2. Image Quality

Performance may decrease with:

* Blur
* Poor lighting
* Low resolution
* Extreme image angles

### 3. Multiple Flowers

The model performs best when the image contains a single dominant flower.

### 4. Background Sensitivity

Complex backgrounds may negatively affect predictions.

### 5. Dataset Bias

The training dataset has limitations related to:

* Geographic distribution
* Photography conditions
* Lighting
* Backgrounds
* Unequal class representation

---

## 💻 Hardware Requirements

### Minimum

```text
CPU: 4 cores
RAM: 4 GB
Storage: 2 GB
```

### Recommended

```text
GPU: NVIDIA T4 or equivalent
RAM: 8 GB+
Storage: 5 GB+
CUDA: 11.8
```

GPU acceleration is recommended for model training and experimentation.

---

## 🐳 Docker

The repository includes Docker configuration for containerized execution.

Build the image:

```bash
docker build -t transfer-learning-images .
```

Run the container:

```bash
docker run -p 5000:5000 transfer-learning-images
```

You can also use Docker Compose:

```bash
docker-compose up --build
```

---

## 🧪 Testing

The repository contains a model-loading test:

```bash
python test_model_loading.py
```

This helps verify that the trained model can be loaded correctly before running inference.

---

## 📋 Model Card

Detailed model information is available in:

```text
model_card.md
```

The model card documents:

* Model architecture
* Dataset
* Training procedure
* Hyperparameters
* Evaluation metrics
* Limitations
* Bias considerations
* Environmental impact
* Hardware requirements
* Intended use
* Out-of-scope use

---

## 🚀 Future Improvements

Potential improvements include:

* Add EfficientNet.
* Add Vision Transformer (ViT).
* Implement automated hyperparameter optimization.
* Increase training data through augmentation.
* Address class imbalance.
* Add Grad-CAM visualizations.
* Add explainable AI features.
* Improve the web interface.
* Add batch prediction.
* Add confidence thresholding.
* Add model versioning.
* Add experiment tracking.
* Deploy the application using a cloud platform.
* Add automated CI/CD testing.
* Add API endpoints for programmatic inference.

---

## 💡 Use Cases

This project can be used for:

* Computer vision learning.
* Transfer learning demonstrations.
* Deep learning portfolio projects.
* Flower species classification.
* Fine-grained image classification research.
* Educational demonstrations.
* Model comparison experiments.
* Interview and technical discussion preparation.

---

## 📚 Technologies Used

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| Python              | Machine learning development |
| PyTorch             | Deep learning framework      |
| TorchVision         | Computer vision utilities    |
| Jupyter Notebook    | Experimentation              |
| NumPy               | Numerical computing          |
| Pandas              | Data processing              |
| Matplotlib          | Visualization                |
| Flask               | Web application              |
| Docker              | Containerization             |
| HTML/CSS/JavaScript | Web interface                |

---

## 🔗 Project Repository

**GitHub:**
https://github.com/InfinitePraveen/Transfer-Learning-for-Images

---

## 🤝 Contributing

Contributions are welcome!

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test your changes.
5. Commit your work.

```bash
git add .
git commit -m "Add your feature"
```

6. Push the branch.

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

Please read [`CONTRIBUTE.md`](CONTRIBUTE.md) before making substantial changes.

---

## 📄 License

This project is released under the **MIT License**.

See the [`LICENSE`](LICENSE) file for complete license information.

Dataset usage is subject to the applicable dataset terms described in:

```text
dataset_license.md
```

---

## 👨‍💻 Author

### Praveen Kumar

Data Science | Machine Learning | Deep Learning | Python

**GitHub:**
https://github.com/InfinitePraveen

**LinkedIn:**
https://www.linkedin.com/in/infinitepraveen/

---

## 🙏 Acknowledgements

Special thanks to:

* The Oxford Visual Geometry Group for the Oxford 102 Flower Dataset.
* The PyTorch team for the PyTorch deep learning framework.
* The TorchVision team for pretrained computer vision models.
* The ImageNet project for pretrained model weights.
* The open-source machine learning community.

---

## ⭐ Support

If you found this project useful or educational, consider giving the repository a ⭐ on GitHub.

**Repository:**
https://github.com/InfinitePraveen/Transfer-Learning-for-Images

---

## 📌 Project Summary

> **Transfer Learning for Images** demonstrates how pretrained deep learning models can be adapted to a specialized image classification problem with significantly less training data and computational effort than training a CNN from scratch.

The project compares **VGG16 and ResNet50**, applies a two-stage transfer-learning strategy, evaluates multiple performance metrics, and exposes the trained models through a web application.

**Key result:** ResNet50 achieves the strongest overall performance in the reported experiments, reaching **92.7% Top-1 accuracy** and **97.3% Top-5 accuracy** on the Oxford 102 Flower classification task.
