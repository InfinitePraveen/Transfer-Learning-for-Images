# Dataset License Information

## Oxford 102 Flower Dataset

### Source
- **Dataset Name:** Oxford 102 Category Flower Dataset
- **Source URL:** https://www.robots.ox.ac.uk/~vgg/data/flowers/102/
- **Download Date:** January 2024

### Dataset Description
The Oxford 102 Flower Dataset is a collection of flower images created by the Visual Geometry Group at the University of Oxford. It consists of 8,189 images of flowers belonging to 102 different categories.

### Dataset Statistics

| Split | Images | Per Class | Total |
|-------|--------|-----------|-------|
| Training | 10 | 102 | 1,020 |
| Validation | 10 | 102 | 1,020 |
| Test | ~20+ | 102 | 6,149 |
| **Total** | - | - | **8,189** |

### License Terms

#### Original Dataset License
The Oxford 102 Flower Dataset is released under the following terms:

1. **Research Use:** The dataset is freely available for academic and research purposes.
2. **Attribution:** When using this dataset, please cite:
   > Nilsback, M-E. and Zisserman, A. Automated flower classification over a large number of classes. In Proceedings of the Indian Conference on Computer Vision, Graphics and Image Processing, 2008.
3. **Commercial Use:** For commercial use, please contact the dataset creators:
   - Visual Geometry Group
   - Department of Engineering Science
   - University of Oxford
   - Email: vgg@robots.ox.ac.uk
4. **Redistribution:** The dataset should not be redistributed without permission. Users should download it from the original source.
5. **Modification:** Modified versions of the dataset should clearly state the changes made and reference the original source.

### Image Copyright
- Images in the dataset are collected from the internet
- Copyright belongs to the original image owners
- Images are provided for research purposes under fair use
- Users are responsible for ensuring their use complies with applicable laws

### Citation

```bibtex
@inproceedings{nilsback2008automated,
  title={Automated flower classification over a large number of classes},
  author={Nilsback, Maria-Elena and Zisserman, Andrew},
  booktitle={2008 Sixth Indian Conference on Computer Vision, Graphics \& Image Processing},
  pages={722--729},
  year={2008},
  organization={IEEE}
}
```

## Supplementary Data

### Image Segmentations
- **File:** `102segmentations.tgz`
- **Purpose:** Ground truth segmentation masks
- **License:** Same as the main dataset
- **Usage:** For segmentation tasks (not required for classification)

### Distance Matrices
- **File:** `distancemat102.mat`
- **Purpose:** Pre-computed χ2 distances between images
- **License:** Same as the main dataset
- **Usage:** For similarity-based learning tasks

## Usage in This Project

### How We Use the Dataset
- **Download:** Script downloads from official source
- **Organization:** Images organized into class-based folders
- **Preprocessing:** Images resized and normalized for model input
- **Training:** Used to fine-tune pretrained models
- **Evaluation:** Test split used for model performance metrics

### Data Privacy
- Dataset contains flower images only
- No personal information or sensitive data
- Images may contain incidental background elements
- No human subjects involved

### Fair Use Statement
This project uses the dataset for:
- Academic research purposes
- Educational demonstrations
- Non-commercial use
- Machine learning model development

## Other Datasets Used

### ImageNet (for Pretrained Models)
- **Source:** https://www.image-net.org/
- **License:** Academic and non-commercial use
- **Usage:** Pretrained weights for VGG16 and ResNet50

### Citation

```bibtex
@inproceedings{deng2009imagenet,
  title={Imagenet: A large-scale hierarchical image database},
  author={Deng, Jia and Dong, Wei and Socher, Richard and Li, Li-Jia and Li, Kai and Fei-Fei, Li},
  booktitle={2009 IEEE conference on computer vision and pattern recognition},
  pages={248--255},
  year={2009},
  organization={Ieee}
}
```

## Third-Party Assets

### Fonts
- **Open Sans:** Licensed under Apache License 2.0
- **Roboto:** Licensed under Apache License 2.0
- **Source:** Google Fonts

### Images (Sample/Gallery)
- **Unsplash Images:** Free to use under Unsplash License
- **Source:** https://unsplash.com/license

### Icons
- **Font Awesome:** Licensed under CC BY 4.0 (free version)
- **Source:** https://fontawesome.com/license/free

## Compliance

By using this project, you agree to:
- Respect the original dataset licenses
- Provide proper attribution where required
- Not redistribute datasets without permission
- Use the data for legitimate research purposes
- Contact dataset owners for commercial use

## Contact

For questions about dataset licensing:
- **Dataset Owner:** Visual Geometry Group, University of Oxford
- **Email:** vgg@robots.ox.ac.uk
- **Website:** https://www.robots.ox.ac.uk/~vgg/

## Disclaimer

The dataset and associated files are provided "as is" without warranty of any kind. The dataset creators and this project's maintainers are not responsible for any misuse of the data.

*Last Updated: January 2024*