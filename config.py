import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    UPLOAD_FOLDER = os.path.join('static', 'uploads')
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    
    # Dataset configuration
    DATA_DIR = os.path.join('data', 'flowers')
    NUM_CLASSES = 102
    
    # Model paths
    MODEL_PATHS = {
        'vgg16': os.path.join('models', 'vgg16_flowers102.pth'),
        'resnet50': os.path.join('models', 'resnet50_flowers102.pth')
    }
    
    # Class names (example for first 10 classes - you'll need all 102)
    CLASS_NAMES = [
        'pink primrose', 'hard-leaved pocket orchid', 'canterbury bells',
        'sweet pea', 'english marigold', 'tiger lily', 'moon orchid',
        'bird of paradise', 'monkshood', 'globe thistle'
        # Add remaining class names from the dataset documentation
    ]