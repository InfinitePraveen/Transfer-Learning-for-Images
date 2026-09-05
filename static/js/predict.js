/* 
* Predict JavaScript for Transfer Learning for Images
* Handles prediction form and model selection
*/

$(document).ready(function () {
    // Initialize model selection
    initModelSelection();

    // Initialize prediction form
    initPredictionForm();

    // Initialize example images
    initExampleImages();
});

// Model selection functionality
function initModelSelection() {
    var modelOptions = $('.model-option');
    if (modelOptions.length === 0) return;

    modelOptions.on('click', function () {
        modelOptions.removeClass('selected');
        $(this).addClass('selected');

        var modelValue = $(this).data('model');
        $('input[name="model"][value="' + modelValue + '"]').prop('checked', true);

        // Update model info
        updateModelInfo(modelValue);
    });

    // Initialize with default selection
    var selectedModel = $('input[name="model"]:checked').val();
    if (selectedModel) {
        $('.model-option[data-model="' + selectedModel + '"]').addClass('selected');
        updateModelInfo(selectedModel);
    }
}

// Update model information display
function updateModelInfo(modelName) {
    var modelInfo = $('#modelInfo');
    if (modelInfo.length === 0) return;

    var modelDetails = {
        'vgg16': {
            name: 'VGG16',
            description: '16-layer deep convolutional neural network',
            accuracy: '85-90%',
            speed: 'Moderate',
            params: '138M'
        },
        'resnet50': {
            name: 'ResNet50',
            description: '50-layer residual network',
            accuracy: '90-95%',
            speed: 'Fast',
            params: '25M'
        }
    };

    var details = modelDetails[modelName];
    if (details) {
        modelInfo.html(
            '<strong>' + details.name + '</strong><br>' +
            '<small class="text-muted">' + details.description + '</small><br>' +
            '<div class="mt-2">' +
            '<span class="badge badge-info mr-2">Accuracy: ' + details.accuracy + '</span>' +
            '<span class="badge badge-success mr-2">Speed: ' + details.speed + '</span>' +
            '<span class="badge badge-warning">Params: ' + details.params + '</span>' +
            '</div>'
        ).show();
    }
}

// Prediction form functionality
function initPredictionForm() {
    var predictForm = $('#predictForm');
    if (predictForm.length === 0) return;

    predictForm.on('submit', function (e) {
        e.preventDefault();

        // Validate file selection
        var fileInput = $('#file')[0];
        if (!fileInput || !fileInput.files[0]) {
            showError('Please select an image file');
            return;
        }

        // Validate model selection
        var modelSelected = $('input[name="model"]:checked').length > 0;
        if (!modelSelected) {
            showError('Please select a model');
            return;
        }

        // Show loading state
        showLoadingState();

        // Submit form
        this.submit();
    });

    // Reset button functionality
    $('#resetBtn').on('click', function () {
        $('#imagePreview').hide().removeClass('active');
        $('#fileInfo').hide();
        $('.custom-file-label').text('Choose file...').removeClass('selected');
        $('.model-option').removeClass('selected').first().addClass('selected');
    });
}

// Example images functionality
function initExampleImages() {
    var exampleImages = $('.example-image');
    if (exampleImages.length === 0) return;

    exampleImages.on('click', function () {
        var imageUrl = $(this).data('image');
        var imageName = $(this).data('name');

        // Create a new file input with the selected example
        $.get(imageUrl, function (blob) {
            var file = new File([blob], imageName, { type: 'image/jpeg' });

            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            var fileInput = $('#file')[0];
            if (fileInput) {
                fileInput.files = dataTransfer.files;

                // Update preview
                if (validateAndPreviewFile) {
                    validateAndPreviewFile(file);
                }
            }
        });
    });
}

// Show loading state
function showLoadingState() {
    var predictBtn = $('#predictBtn');
    var loadingOverlay = $('#loadingOverlay');

    if (predictBtn.length > 0) {
        predictBtn.html('<span class="spinner-border spinner-border-sm mr-2"></span>Processing...');
        predictBtn.prop('disabled', true);
    }

    if (loadingOverlay.length === 0) {
        loadingOverlay = $('<div>')
            .attr('id', 'loadingOverlay')
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': 'rgba(255, 255, 255, 0.9)',
                'z-index': '9999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            })
            .html(
                '<div class="text-center">' +
                '<div class="loading-spinner mb-3"></div>' +
                '<h5 class="mb-2">Processing Image</h5>' +
                '<p class="text-muted">Running inference using selected model...</p>' +
                '</div>'
            );

        $('body').append(loadingOverlay);
    }
}

// Show error message
function showError(message) {
    var errorContainer = $('#errorMessages');
    if (errorContainer.length === 0) {
        errorContainer = $('<div>').attr('id', 'errorMessages');
        $('#predictForm').before(errorContainer);
    }

    errorContainer.html(
        '<div class="alert alert-danger alert-dismissible fade show">' +
        '<i class="fas fa-exclamation-circle"></i> ' + message +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '</div>'
    );

    setTimeout(function () {
        errorContainer.fadeOut('slow', function () {
            $(this).empty().show();
        });
    }, 5000);
}