# Contributing to Transfer Learning for Images

First off, thank you for considering contributing to this project! 🎉

The following is a set of guidelines for contributing to Transfer Learning for Images. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Setup](#development-setup)
4. [Style Guidelines](#style-guidelines)
5. [Commit Messages](#commit-messages)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [your-email@example.com].

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include details about your configuration and environment**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the behavior you expected**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the Python style guide
- Include thoughtfully-worded, well-structured tests
- Document new code based on the Documentation Styleguide
- End all files with a newline

## Development Setup

### Prerequisites

- Python 3.7 or higher
- Git
- pip package manager
- CUDA-capable GPU (optional, for faster training)

### Installation

```bash
# Clone the repository
git clone [https://github.com/your-username/transfer-learning-images.git](https://github.com/your-username/transfer-learning-images.git)
cd transfer-learning-images

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt  # if available

# Download dataset
python download_dataset.py

# Download fonts and images
python download_fonts.py
python download_images.py
```

### Environment Variables

Create a `.env` file with:

```env
SECRET_KEY=your-secret-key-here
UPLOAD_FOLDER=static/uploads
MAX_CONTENT_LENGTH=5242880
```

## Style Guidelines

### Python Style
Follow PEP 8 guidelines:

```python
# Good
def calculate_accuracy(predictions, labels):
    """Calculate model accuracy."""
    correct = sum(p == l for p, l in zip(predictions, labels))
    return correct / len(labels)

# Bad
def calcAcc(p, l):
    return sum([1 for i in range(len(p)) if p[i]==l[i]])/len(p)
```

### JavaScript Style
Follow Airbnb JavaScript Style Guide:

```javascript
// Good
const calculateAccuracy = (predictions, labels) => {
  return predictions.filter((pred, index) => pred === labels[index]).length / labels.length;
};

// Bad
function acc(p,l){return p.filter((x,i)=>x==l[i]).length/l.length}
```

### CSS Style
Follow BEM methodology:

```css
/* Good */
.card__title--large { font-size: 2rem; }
.card__button--primary { background: blue; }

/* Bad */
.card .title.large { font-size: 2rem; }
.card .button.blue { background: blue; }
```

### Notebook Style
- Clear notebook title and description
- Section headers using markdown
- Comments for complex operations
- Display outputs for visualization
- Avoid unnecessary print statements
- Use relative paths

## Commit Messages

Follow Conventional Commits:

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(model): add ResNet50 training script
fix(webapp): resolve file upload bug
docs(readme): update installation instructions
test(model): add unit tests for data loader
perf(inference): optimize batch processing
```

### Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style (formatting, missing semi-colons, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks
- **perf**: Performance improvements
- **ci**: CI/CD changes

## Pull Request Process

- Fork the repository and create your branch from `main`
- Update the `README.md` with details of changes if needed
- Update the `CHANGELOG.md` following the established format
- Increase version numbers in any examples files if needed
- Run tests to ensure all pass
- Create Pull Request with a clear title and description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests passed
- [ ] Integration tests passed
- [ ] Manual testing performed

## Screenshots (if applicable)
Add screensshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Testing

### Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_model.py

# Run with coverage
pytest --cov=app tests/
```

### Writing Tests

```python
import unittest
from app import predict_image

class TestPrediction(unittest.TestCase):
    def setUp(self):
        self.test_image = 'test_image.jpg'

    def test_prediction_returns_dict(self):
        result = predict_image(self.test_image, 'vgg16')
        self.assertIsInstance(result, dict)

    def test_confidence_range(self):
        result = predict_image(self.test_image, 'resnet50')
        self.assertTrue(0 <= result['confidence'] <= 100)
```

## Documentation

- Use Markdown for all documentation
- Include code examples where helpful
- Keep documentation up-to-date with code changes
- Use relative links for internal references
- Include screenshots for UI changes

### Documentation Style

```markdown
# Function Name

Brief description of what it does.

## Parameters
- `param1` (type): Description
- `param2` (type): Description

## Returns
- `return_value` (type): Description

## Example
\`\`\`python
result = function_name(param1, param2)
\`\`\`

## Notes
Any additional notes or warnings.
```

## Questions?

Feel free to contact the maintainers:
- Email: hellopraveensales@gmail.com
- LinkedIn: [Praveen Kumar](https://www.linkedin.com/in/infinitepraveen/)
- GitHub: [InfinitePraveen](https://github.com/InfinitePraveen)

---

Thank you for contributing! 🚀