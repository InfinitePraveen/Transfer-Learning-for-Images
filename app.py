import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageFont
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
            model.classifier[6] = nn.Linear(num_ftrs, app.config['NUM_CLASSES'])
        elif model_name == 'resnet50':
            model = models.resnet50(weights=None)
            num_ftrs = model.fc.in_features
            model.fc = nn.Linear(num_ftrs, app.config['NUM_CLASSES'])
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

def enhance_image(image, enhance_quality=True, add_watermark=False):
    """
    Enhance image quality for better predictions
    - Auto-enhance contrast and brightness
    - Reduce noise and sharpen
    - Optionally add a watermark
    """
    try:
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        if enhance_quality:
            # Enhance contrast
            contrast_enhancer = ImageEnhance.Contrast(image)
            image = contrast_enhancer.enhance(1.3)  # 30% more contrast
            
            # Enhance brightness
            brightness_enhancer = ImageEnhance.Brightness(image)
            image = brightness_enhancer.enhance(1.1)  # 10% brighter
            
            # Enhance sharpness
            sharpness_enhancer = ImageEnhance.Sharpness(image)
            image = sharpness_enhancer.enhance(1.5)  # 50% more sharpness
            
            # Reduce noise with slight blur then sharpen
            image = image.filter(ImageFilter.MedianFilter(size=3))
            
            # Enhance color/saturation if available
            try:
                color_enhancer = ImageEnhance.Color(image)
                image = color_enhancer.enhance(1.2)  # 20% more saturated
            except:
                pass
        
        if add_watermark:
            # Add watermark/signature stamp
            image = add_watermark_stamp(image)
        
        return image
    except Exception as e:
        print(f"Error enhancing image: {e}")
        return image

def add_watermark_stamp(image):
    """
    Add a watermark stamp to the image
    """
    try:
        # Create a copy to avoid modifying the original
        watermarked = image.copy()
        draw = ImageDraw.Draw(watermarked, 'RGBA')
        
        # Add a semi-transparent stamp in the corner
        width, height = watermarked.size
        stamp_text = "Transfer Learning"
        
        # Try to use a nice font, fallback to default if not available
        try:
            font = ImageFont.truetype("arial.ttf", int(height * 0.05))
        except:
            font = ImageFont.load_default()
        
        # Calculate position (bottom-right corner with padding)
        bbox = draw.textbbox((0, 0), stamp_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = width - text_width - 20
        y = height - text_height - 20
        
        # Draw semi-transparent background for text
        padding = 5
        draw.rectangle(
            [(x - padding, y - padding), (x + text_width + padding, y + text_height + padding)],
            fill=(255, 255, 255, 100)  # Semi-transparent white
        )
        
        # Draw the text
        draw.text((x, y), stamp_text, fill=(0, 0, 0, 200), font=font)  # Semi-transparent black text
        
        return watermarked
    except Exception as e:
        print(f"Error adding watermark: {e}")
        return image

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def get_class_name(class_idx):
    """Get class name safely, with fallback for missing names"""
    if class_idx < len(app.config['CLASS_NAMES']):
        return app.config['CLASS_NAMES'][class_idx]
    else:
        return f"Flower Class {class_idx + 1}"

def predict_image(image_path, model_name, enhance=True, add_watermark=False):
    model = load_model(model_name)
    img = Image.open(image_path).convert('RGB')
    
    # Enhance the image for better predictions
    if enhance:
        img = enhance_image(img, enhance_quality=True, add_watermark=add_watermark)
        # Save enhanced image for display
        enhanced_path = os.path.splitext(image_path)[0] + '_enhanced.png'
        img.save(enhanced_path)
    
    img_tensor = preprocess(img).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        conf, pred = torch.max(probabilities, 0)
    
    class_name = get_class_name(pred.item())
    confidence = conf.item() * 100
    all_probs = {get_class_name(idx): prob.item()*100 for idx, prob in enumerate(probabilities)}
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
            enhance = request.form.get('enhance', 'on') == 'on'
            add_watermark = request.form.get('watermark', 'off') == 'on'
            
            try:
                class_name, confidence, all_probs = predict_image(filepath, model_name, enhance=enhance, add_watermark=add_watermark)
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

@app.route('/documentation')
def documentation():
    return render_template('documentation.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle contact form submission
        flash('Thank you for your message. We will get back to you soon!')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)