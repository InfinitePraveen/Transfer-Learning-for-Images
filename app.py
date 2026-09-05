import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from werkzeug.utils import secure_filename
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load models (do this once at startup)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
models_cache = {}

def load_model(model_name):
    if model_name not in models_cache:
        if model_name == 'vgg16':
            model = models.vgg16(weights=None)
            num_ftrs = model.classifier[6].in_features
            model.classifier[6] = nn.Linear(num_ftrs, len(app.config['CLASS_NAMES']))
        elif model_name == 'resnet50':
            model = models.resnet50(weights=None)
            num_ftrs = model.fc.in_features
            model.fc = nn.Linear(num_ftrs, len(app.config['CLASS_NAMES']))
        else:
            raise ValueError("Invalid model name")
        
        model_path = app.config['MODEL_PATHS'].get(model_name)
        if os.path.exists(model_path):
            model.load_state_dict(torch.load(model_path, map_location=device))
        model.to(device)
        model.eval()
        models_cache[model_name] = model
    return models_cache[model_name]

# Preprocessing for inference
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def predict_image(image_path, model_name):
    model = load_model(model_name)
    img = Image.open(image_path).convert('RGB')
    img_tensor = preprocess(img).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        conf, pred = torch.max(probabilities, 0)
    
    class_name = app.config['CLASS_NAMES'][pred.item()]
    confidence = conf.item() * 100
    all_probs = {cls: prob.item()*100 for cls, prob in zip(app.config['CLASS_NAMES'], probabilities)}
    return class_name, confidence, all_probs

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            model_name = request.form.get('model', 'vgg16')
            try:
                class_name, confidence, all_probs = predict_image(filepath, model_name)
                return render_template('result.html',
                                       filename=filename,
                                       class_name=class_name,
                                       confidence=confidence,
                                       all_probs=all_probs,
                                       model_name=model_name)
            except Exception as e:
                flash(f'Error during prediction: {str(e)}')
                return redirect(request.url)
        else:
            flash('Allowed file types: png, jpg, jpeg')
            return redirect(request.url)
    return render_template('predict.html')

@app.route('/gallery')
def gallery():
    # You can dynamically load sample images from static/images/
    return render_template('gallery.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)