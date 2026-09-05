#!/usr/bin/env python3
"""
Download all required images for Transfer Learning for Images project
"""

import os
import urllib.request
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np

def create_directory_structure():
    """Create necessary directories"""
    directories = [
        'static/images',
        'static/uploads',
        'static/fonts'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {directory}")

def create_favicon():
    """Create a simple favicon"""
    img = Image.new('RGB', (64, 64), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw a simple flower pattern
    center = (32, 32)
    for i in range(8):
        angle = i * 45
        x = 32 + int(15 * np.cos(np.radians(angle)))
        y = 32 + int(15 * np.sin(np.radians(angle)))
        draw.ellipse([x-8, y-8, x+8, y+8], fill='#ffffff')
    
    draw.ellipse([24, 24, 40, 40], fill='#ffc107')
    
    img.save('static/images/favicon.ico', format='ICO')
    print("Created: favicon.ico")

def create_logo():
    """Create a simple logo"""
    img = Image.new('RGBA', (200, 200), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient circle
    draw.ellipse([20, 20, 180, 180], fill='#667eea')
    
    # Draw flower pattern
    center = (100, 100)
    for i in range(12):
        angle = i * 30
        x = 100 + int(50 * np.cos(np.radians(angle)))
        y = 100 + int(50 * np.sin(np.radians(angle)))
        draw.ellipse([x-15, y-15, x+15, y+15], fill='#ffffff')
    
    draw.ellipse([75, 75, 125, 125], fill='#ffc107')
    
    img.save('static/images/logo.png', 'PNG')
    print("Created: logo.png")

def create_upload_icon():
    """Create an upload icon"""
    img = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw cloud
    draw.ellipse([30, 50, 100, 90], fill='#007bff')
    draw.ellipse([20, 30, 70, 60], fill='#007bff')
    draw.ellipse([60, 25, 110, 55], fill='#007bff')
    draw.rectangle([40, 55, 90, 90], fill='#007bff')
    
    # Draw arrow
    draw.polygon([(64, 40), (54, 60), (74, 60)], fill='#ffffff')
    draw.rectangle([60, 55, 68, 90], fill='#ffffff')
    
    img.save('static/images/upload_icon.png', 'PNG')
    print("Created: upload_icon.png")

def create_loading_spinner():
    """Create loading spinner GIF"""
    frames = []
    size = (64, 64)
    
    for i in range(12):
        img = Image.new('RGBA', size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        
        angle = i * 30
        x = 32 + int(20 * np.cos(np.radians(angle)))
        y = 32 + int(20 * np.sin(np.radians(angle)))
        
        draw.ellipse([x-8, y-8, x+8, y+8], fill='#007bff')
        frames.append(img)
    
    frames[0].save('static/images/loading_spinner.gif', 
                   save_all=True, 
                   append_images=frames[1:], 
                   duration=100, 
                   loop=0)
    print("Created: loading_spinner.gif")

def create_sample_images():
    """Create sample flower images"""
    for i in range(1, 11):
        img = Image.new('RGB', (400, 400), 
                       color=(np.random.randint(200, 255), 
                              np.random.randint(200, 255), 
                              np.random.randint(200, 255)))
        draw = ImageDraw.Draw(img)
        
        # Draw a simple flower
        center = (200, 200)
        for j in range(8):
            angle = j * 45
            x = 200 + int(80 * np.cos(np.radians(angle)))
            y = 200 + int(80 * np.sin(np.radians(angle)))
            draw.ellipse([x-40, y-40, x+40, y+40], 
                        fill=(np.random.randint(100, 255), 
                              np.random.randint(100, 255), 
                              np.random.randint(100, 255)))
        
        draw.ellipse([160, 160, 240, 240], 
                    fill=(np.random.randint(200, 255), 
                          np.random.randint(200, 255), 
                          np.random.randint(0, 100)))
        
        img.save(f'static/images/sample_{i}.jpg', 'JPEG', quality=90)
        print(f"Created: sample_{i}.jpg")

def create_team_images():
    """Create placeholder team member images"""
    for i in range(1, 4):
        img = Image.new('RGB', (400, 400), color='#f0f0f0')
        draw = ImageDraw.Draw(img)
        
        # Draw simple avatar
        draw.ellipse([120, 50, 280, 210], fill='#cccccc')  # Head
        draw.ellipse([100, 180, 300, 380], fill='#999999')  # Body
        
        # Add initials
        initials = f'TM{i}'
        draw.text((160, 120), initials, fill='#666666', font=None)
        
        img.save(f'static/images/team_{i}.jpg', 'JPEG', quality=90)
        print(f"Created: team_{i}.jpg")

def create_gallery_images():
    """Create gallery images"""
    for i in range(1, 4):
        img = Image.new('RGB', (600, 400), 
                       color=(np.random.randint(150, 255), 
                              np.random.randint(150, 255), 
                              np.random.randint(150, 255)))
        draw = ImageDraw.Draw(img)
        
        # Draw flower-like pattern
        for j in range(5):
            x = np.random.randint(100, 500)
            y = np.random.randint(100, 300)
            size = np.random.randint(20, 50)
            draw.ellipse([x-size, y-size, x+size, y+size], 
                        fill=(np.random.randint(0, 255), 
                              np.random.randint(0, 255), 
                              np.random.randint(0, 255)))
        
        img.save(f'static/images/gallery_{i}.jpg', 'JPEG', quality=90)
        print(f"Created: gallery_{i}.jpg")

def create_background_pattern():
    """Create subtle background pattern"""
    img = Image.new('RGB', (100, 100), color='#f8f9fa')
    draw = ImageDraw.Draw(img)
    
    # Add subtle dots
    for i in range(10):
        for j in range(10):
            if (i + j) % 2 == 0:
                draw.ellipse([i*10, j*10, i*10+5, j*10+5], fill='#e9ecef')
    
    img.save('static/images/bg_pattern.png', 'PNG')
    print("Created: bg_pattern.png")

def download_real_flower_images():
    """Download real flower images from Unsplash (free to use)"""
    # URLs from Unsplash (free for commercial use)
    flower_urls = {
        'sample_1.jpg': 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop',
        'sample_2.jpg': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
        'sample_3.jpg': 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&h=400&fit=crop',
        'sample_4.jpg': 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop',
        'sample_5.jpg': 'https://images.unsplash.com/photo-1496857239036-1fb137683000?w=400&h=400&fit=crop',
        'sample_6.jpg': 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=400&h=400&fit=crop',
        'sample_7.jpg': 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop',
        'sample_8.jpg': 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop',
        'sample_9.jpg': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
        'sample_10.jpg': 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop',
        'gallery_1.jpg': 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&h=400&fit=crop',
        'gallery_2.jpg': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
        'gallery_3.jpg': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop'
    }
    
    print("\nAttempting to download real flower images from Unsplash...")
    for filename, url in flower_urls.items():
        try:
            urllib.request.urlretrieve(url, f'static/images/{filename}')
            print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Failed to download {filename}: {e}")

def download_team_photos():
    """Download placeholder team photos from RandomUser.me"""
    team_urls = {
        'team_1.jpg': 'https://randomuser.me/api/portraits/men/1.jpg',
        'team_2.jpg': 'https://randomuser.me/api/portraits/women/2.jpg',
        'team_3.jpg': 'https://randomuser.me/api/portraits/men/3.jpg'
    }
    
    print("\nAttempting to download team photos...")
    for filename, url in team_urls.items():
        try:
            urllib.request.urlretrieve(url, f'static/images/{filename}')
            print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Failed to download {filename}: {e}")

def main():
    print("=" * 60)
    print("Creating images for Transfer Learning for Images")
    print("=" * 60)
    
    # Create directory structure
    create_directory_structure()
    
    # Create basic images
    print("\nCreating basic images...")
    create_favicon()
    create_logo()
    create_upload_icon()
    create_loading_spinner()
    
    # Try to download real images
    print("\nDownloading real images...")
    download_real_flower_images()
    download_team_photos()
    
    # Create fallback images if downloads failed
    print("\nCreating fallback images...")
    create_sample_images()
    create_team_images()
    create_gallery_images()
    create_background_pattern()
    
    print("\n" + "=" * 60)
    print("Image creation complete!")
    print("Check the 'static/images' directory")
    print("=" * 60)

if __name__ == "__main__":
    main()