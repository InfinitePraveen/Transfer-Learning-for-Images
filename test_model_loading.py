#!/usr/bin/env python
"""Test script to verify model loading works correctly"""

import torch
import torch.nn as nn
from torchvision import models
from config import Config

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Test VGG16 model loading
print("\n" + "="*50)
print("Testing VGG16 Model Loading")
print("="*50)

try:
    model = models.vgg16(weights=None)
    num_ftrs = model.classifier[6].in_features
    print(f"Original output layer: {model.classifier[6]}")
    print(f"Input features: {num_ftrs}")
    print(f"Target num classes: {Config.NUM_CLASSES}")
    
    model.classifier[6] = nn.Linear(num_ftrs, Config.NUM_CLASSES)
    print(f"Modified output layer: {model.classifier[6]}")
    
    model_path = Config.MODEL_PATHS.get('vgg16')
    print(f"Loading model from: {model_path}")
    
    if torch.cuda.is_available():
        model.load_state_dict(torch.load(model_path, map_location=device))
    else:
        model.load_state_dict(torch.load(model_path, map_location='cpu'))
    
    model.to(device)
    model.eval()
    print("✓ VGG16 model loaded successfully!")
    
except Exception as e:
    print(f"✗ Error loading VGG16: {str(e)}")

# Test ResNet50 model loading
print("\n" + "="*50)
print("Testing ResNet50 Model Loading")
print("="*50)

try:
    model = models.resnet50(weights=None)
    num_ftrs = model.fc.in_features
    print(f"Original output layer: {model.fc}")
    print(f"Input features: {num_ftrs}")
    print(f"Target num classes: {Config.NUM_CLASSES}")
    
    model.fc = nn.Linear(num_ftrs, Config.NUM_CLASSES)
    print(f"Modified output layer: {model.fc}")
    
    model_path = Config.MODEL_PATHS.get('resnet50')
    print(f"Loading model from: {model_path}")
    
    if torch.cuda.is_available():
        model.load_state_dict(torch.load(model_path, map_location=device))
    else:
        model.load_state_dict(torch.load(model_path, map_location='cpu'))
    
    model.to(device)
    model.eval()
    print("✓ ResNet50 model loaded successfully!")
    
except Exception as e:
    print(f"✗ Error loading ResNet50: {str(e)}")

# Test class names
print("\n" + "="*50)
print("Testing Class Names Configuration")
print("="*50)
print(f"Number of class names: {len(Config.CLASS_NAMES)}")
print(f"NUM_CLASSES config: {Config.NUM_CLASSES}")
print(f"Match: {len(Config.CLASS_NAMES) == Config.NUM_CLASSES}")
print(f"\nFirst 5 class names: {Config.CLASS_NAMES[:5]}")
print(f"Last 5 class names: {Config.CLASS_NAMES[-5:]}")

if len(Config.CLASS_NAMES) == Config.NUM_CLASSES:
    print("✓ Class names configuration is correct!")
else:
    print(f"✗ Warning: Class names ({len(Config.CLASS_NAMES)}) != NUM_CLASSES ({Config.NUM_CLASSES})")

print("\n" + "="*50)
print("Testing complete!")
print("="*50)
