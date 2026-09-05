#!/usr/bin/env python3
"""
Simple font downloader using multiple verified sources
"""

import os
import urllib.request
from pathlib import Path

def download_font(url, filename, target_dir='static/fonts'):
    """Download a font file"""
    Path(target_dir).mkdir(parents=True, exist_ok=True)
    filepath = Path(target_dir) / filename
    
    if filepath.exists() and filepath.stat().st_size > 1000:
        print(f"✓ {filename} already exists")
        return True
    
    try:
        print(f"Downloading {filename}...")
        
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        size = filepath.stat().st_size
        print(f"  ✓ Downloaded ({size/1024:.1f} KB)")
        return True
        
    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return False

def main():
    fonts = {
        # Using jsdelivr CDN (most reliable)
        'Roboto-Regular.ttf': 'https://cdn.jsdelivr.net/gh/googlefonts/roboto@main/src/hinted/Roboto-Regular.ttf',
        'Roboto-Bold.ttf': 'https://cdn.jsdelivr.net/gh/googlefonts/roboto@main/src/hinted/Roboto-Bold.ttf',
        'OpenSans-Regular.ttf': 'https://cdn.jsdelivr.net/gh/googlefonts/opensans@main/fonts/ttf/OpenSans-Regular.ttf',
        'OpenSans-Bold.ttf': 'https://cdn.jsdelivr.net/gh/googlefonts/opensans@main/fonts/ttf/OpenSans-Bold.ttf',
    }
    
    print("Downloading fonts...")
    for filename, url in fonts.items():
        download_font(url, filename)

if __name__ == "__main__":
    main()