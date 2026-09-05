# Model Card: Flower Classification Models

## Model Details

### Overview
This repository contains two fine-tuned convolutional neural networks (CNNs) for flower species classification:

| Model | Architecture | Parameters | Top-1 Accuracy | Top-5 Accuracy |
|-------|-------------|------------|----------------|----------------|
| VGG16 | VGG-16 | 138M | 85.2% | 95.8% |
| ResNet50 | ResNet-50 | 25.6M | 92.7% | 97.3% |

### Model Description
Both models use transfer learning from ImageNet-pretrained weights and are fine-tuned on the Oxford 102 Flower Dataset.

**Input:** RGB images (224x224 pixels)
**Output:** Probability distribution over 102 flower classes

### Model Architecture

#### VGG16
- 13 convolutional layers
- 5 max-pooling layers
- 3 fully connected layers
- Final layer: 102 neurons (softmax)

#### ResNet50
- 50 layers with residual connections
- Bottleneck architecture
- Global average pooling
- Final layer: 102 neurons (softmax)

## Intended Use

### Primary Uses
- Flower species identification
- Educational demonstrations of transfer learning
- Computer vision research
- Botanical classification assistance

### Out-of-Scope Uses
- Medical diagnosis
- Safety-critical applications
- Commercial production without validation
- Non-flower image classification

## Training Data

### Dataset
- **Name:** Oxford 102 Flower Dataset
- **Images:** 8,189 total
- **Classes:** 102 flower categories
- **Split:**
  - Training: 1,020 images (10 per class)
  - Validation: 1,020 images (10 per class)
  - Test: 6,149 images

### Preprocessing
- Resize to 256x256
- Center crop to 224x224
- Normalize with ImageNet statistics
- Data augmentation (training only):
  - Random rotation (±20°)
  - Random horizontal flip
  - Color jitter
  - Random resized crop

## Training Procedure

### Two-Phase Training

#### Phase 1: Feature Extraction
- Freeze all pretrained layers
- Train only new classifier head
- Learning rate: 0.001
- Optimizer: Adam
- Epochs: 10
- Batch size: 32

#### Phase 2: Fine-Tuning
- Unfreeze last 2-3 blocks
- Reduce learning rate to 0.0001
- Continue training for 10 epochs
- Learning rate decay: 0.1 every 5 epochs

### Hyperparameters

| Parameter | Value |
|-----------|-------|
| Optimizer | Adam |
| Initial LR (Phase 1) | 0.001 |
| Initial LR (Phase 2) | 0.0001 |
| LR Scheduler | StepLR |
| LR Decay | 0.1 |
| LR Decay Step | 5 epochs |
| Batch Size | 32 |
| Loss Function | CrossEntropyLoss |
| Weight Initialization | ImageNet pretrained |
| Dropout | 0.5 (VGG16 only) |

## Evaluation Results

### Performance Metrics

| Metric | VGG16 | ResNet50 |
|--------|-------|----------|
| Top-1 Accuracy | 85.2% | 92.7% |
| Top-5 Accuracy | 95.8% | 97.3% |
| Precision (Macro) | 84.6% | 92.1% |
| Recall (Macro) | 83.9% | 91.8% |
| F1-Score (Macro) | 84.2% | 91.9% |
| Inference Time (CPU) | 120ms | 45ms |
| Inference Time (GPU) | 8ms | 3ms |
| Model Size | 528MB | 98MB |

### Confusion Analysis
**Most Confused Classes:**
1. Class 76 (Rose) vs Class 84 (Peony) - 23% confusion
2. Class 22 (Azalea) vs Class 48 (Rhododendron) - 18% confusion
3. Class 17 (Carnation) vs Class 65 (Sweet William) - 15% confusion

### Cross-Validation Results (5-fold)

| Fold | VGG16 | ResNet50 |
|------|-------|----------|
| 1 | 84.1% | 91.8% |
| 2 | 85.3% | 92.4% |
| 3 | 84.8% | 92.1% |
| 4 | 86.1% | 93.2% |
| 5 | 85.7% | 92.9% |
| **Mean** | **85.2%** | **92.5%** |
| **Std** | **0.7%** | **0.5%** |

## Limitations and Biases

### Known Limitations
1. **Limited to 102 Classes:** Models cannot classify flowers outside the training set
2. **Image Quality Dependent:** Performance degrades with poor lighting or blur
3. **Single Flower Focus:** Models perform best with single, centered flowers
4. **Background Sensitivity:** Complex backgrounds can affect accuracy
5. **Seasonal Variations:** Some flowers look different across seasons

### Potential Biases
1. **Geographic Bias:** Dataset primarily contains flowers common in the UK
2. **Photography Bias:** Images are professionally photographed
3. **Lighting Bias:** Most images taken in natural daylight
4. **Background Bias:** Typically simple, blurred backgrounds

### Failure Cases
- Multiple flowers in one image
- Partial occlusion
- Unusual angles
- Different growth stages
- Artificial/dried flowers

## Fairness Considerations

### Demographic Parity
- Dataset is botanical (non-human)
- No demographic information involved
- Equal representation across classes in training

### Performance Disparities
- Some classes have fewer examples (40 vs 258 images)
- Rare species may have lower accuracy
- Visually similar species may be confused

## Recommendations

### For Users
- Use clear, well-lit images
- Center the flower in frame
- Avoid multiple flowers
- Provide scale reference if possible

### For Developers
- Fine-tune on target domain if different
- Consider data augmentation for rare classes
- Monitor for class imbalance
- Regular model updates

## Environmental Impact

### Training Carbon Footprint

| Model | Training Time | GPU | Estimated CO2 |
|-------|--------------|-----|---------------|
| VGG16 | 2 hours | NVIDIA T4 | 0.15 kg |
| ResNet50 | 1.5 hours | NVIDIA T4 | 0.11 kg |

### Inference Energy

| Model | Power (CPU) | Power (GPU) |
|-------|-------------|-------------|
| VGG16 | 15W | 75W |
| ResNet50 | 8W | 60W |

## Technical Specifications

### Software Dependencies
```text
Python: 3.8+
PyTorch: 2.0+
TorchVision: 0.15+
CUDA: 11.8 (GPU)
```

### Hardware Requirements

**Minimum:**
- CPU: 4 cores
- RAM: 4GB
- Storage: 2GB

**Recommended:**
- GPU: NVIDIA T4 or equivalent
- RAM: 8GB
- Storage: 5GB

## Citation

```bibtex
@software{transfer_learning_images,
  author = {Praveen Kumar},
  title = {Transfer Learning for Images},
  year = {2024},
  url = {[https://github.com/InfinitePraveen/Transfer-Learning-for-Images](https://github.com/InfinitePraveen/Transfer-Learning-for-Images)}
}
```

## License
This model is released under the MIT License. See LICENSE file for details.