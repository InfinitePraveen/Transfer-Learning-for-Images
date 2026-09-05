import os
import urllib.request
import tarfile
import scipy.io
import shutil
from pathlib import Path

def download_file(url, filename):
    """Download file from url to filename"""
    if not os.path.exists(filename):
        print(f"Downloading {filename}...")
        urllib.request.urlretrieve(url, filename)
        print(f"Downloaded {filename}")
    else:
        print(f"{filename} already exists")

def extract_tar(filename, extract_path):
    """Extract tar file"""
    if not os.path.exists(extract_path):
        print(f"Extracting {filename}...")
        with tarfile.open(filename, 'r') as tar:
            tar.extractall(extract_path)
        print(f"Extracted to {extract_path}")
    else:
        print(f"{extract_path} already exists")

def organize_dataset():
    """Organize Oxford 102 flowers into train/val/test folders"""
    
    # URLs for dataset files
    base_url = "https://www.robots.ox.ac.uk/~vgg/data/flowers/102/"
    files = {
        "images": "102flowers.tgz",
        "labels": "imagelabels.mat",
        "splits": "setid.mat"
    }
    
    # Create directories
    raw_dir = Path("data/raw")
    raw_dir.mkdir(parents=True, exist_ok=True)
    
    # Download files
    for key, filename in files.items():
        url = base_url + filename
        download_file(url, raw_dir / filename)
    
    # Extract images
    images_dir = raw_dir / "jpg"
    if not images_dir.exists():
        extract_tar(raw_dir / "102flowers.tgz", raw_dir)
    
    # Load labels and splits using scipy
    import scipy.io as sio
    
    labels = sio.loadmat(raw_dir / "imagelabels.mat")['labels'][0]
    splits = sio.loadmat(raw_dir / "setid.mat")
    
    train_ids = splits['trnid'][0]
    val_ids = splits['valid'][0]
    test_ids = splits['tstid'][0]
    
    # Create organized directory structure
    data_dir = Path("data/flowers")
    for split in ['train', 'val', 'test']:
        for class_id in range(1, 103):
            (data_dir / split / str(class_id)).mkdir(parents=True, exist_ok=True)
    
    # Organize images
    print("Organizing images into train/val/test folders...")
    
    def copy_images(ids, split):
        for img_id in ids:
            img_name = f"image_{img_id:05d}.jpg"
            src = images_dir / img_name
            dst_class = str(labels[img_id - 1])
            dst = data_dir / split / dst_class / img_name
            if src.exists():
                shutil.copy2(src, dst)
            else:
                print(f"Warning: {img_name} not found")
    
    copy_images(train_ids, 'train')
    print("Training images organized")
    copy_images(val_ids, 'val')
    print("Validation images organized")
    copy_images(test_ids, 'test')
    print("Test images organized")
    
    # Print statistics
    print("\nDataset organization complete!")
    print(f"Total training images: {len(train_ids)}")
    print(f"Total validation images: {len(val_ids)}")
    print(f"Total test images: {len(test_ids)}")
    print(f"Number of classes: 102")

if __name__ == "__main__":
    organize_dataset()