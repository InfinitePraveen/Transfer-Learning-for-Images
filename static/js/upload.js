/* 
* Upload JavaScript for Transfer Learning for Images
* Handles file upload with drag & drop functionality
*/

$(document).ready(function () {
    // Initialize file upload functionality
    initFileUpload();

    // Initialize drag and drop
    initDragAndDrop();

    // Initialize image preview
    initImagePreview();
});

// File upload initialization
function initFileUpload() {
    var fileInput = $('#file');
    if (fileInput.length === 0) return;

    fileInput.on('change', function () {
        var file = this.files[0];
        if (file) {
            validateAndPreviewFile(file);
        }
    });
}

// Drag and drop functionality
function initDragAndDrop() {
    var uploadArea = $('.upload-area, .drop-zone');
    if (uploadArea.length === 0) return;

    uploadArea.on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('dragover');
    });

    uploadArea.on('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');
    });

    uploadArea.on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');

        var files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0];
            validateAndPreviewFile(file);

            // Update file input
            var fileInput = $('#file')[0];
            if (fileInput) {
                var dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;
            }
        }
    });

    // Click to upload
    uploadArea.on('click', function () {
        $('#file').trigger('click');
    });
}

// Image preview
function initImagePreview() {
    var previewContainer = $('#imagePreview');
    if (previewContainer.length === 0) return;

    previewContainer.hide();
}

// Validate and preview file
function validateAndPreviewFile(file) {
    // Check file type
    var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.indexOf(file.type) === -1) {
        showUploadError('Please upload a valid image file (JPG, JPEG, or PNG)');
        return false;
    }

    // Check file size (5MB max)
    var maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showUploadError('File size must be less than 5MB');
        return false;
    }

    // Preview image
    var reader = new FileReader();
    reader.onload = function (e) {
        var preview = $('#imagePreview');
        if (preview.length > 0) {
            preview.attr('src', e.target.result).show();
            preview.addClass('active');
        }

        // Show file info
        var fileInfo = $('#fileInfo');
        if (fileInfo.length > 0) {
            fileInfo.html(
                '<strong>File:</strong> ' + file.name + '<br>' +
                '<strong>Size:</strong> ' + formatFileSize(file.size) + '<br>' +
                '<strong>Type:</strong> ' + file.type
            ).show();
        }
    };
    reader.readAsDataURL(file);

    // Update file input label
    var fileLabel = $('.custom-file-label');
    if (fileLabel.length > 0) {
        fileLabel.text(file.name).addClass('selected');
    }

    return true;
}

// Show upload error
function showUploadError(message) {
    var errorContainer = $('#uploadError');
    if (errorContainer.length > 0) {
        errorContainer.html(
            '<div class="alert alert-danger alert-dismissible fade show">' +
            '<i class="fas fa-exclamation-circle"></i> ' + message +
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '</div>'
        ).show();

        setTimeout(function () {
            errorContainer.fadeOut('slow');
        }, 5000);
    } else {
        alert(message);
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Upload progress
function uploadWithProgress(url, file, onProgress, onComplete) {
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    if (onProgress) onProgress(percent);
                }
            }, false);
            return xhr;
        },
        success: function (response) {
            if (onComplete) onComplete(null, response);
        },
        error: function (xhr, status, error) {
            if (onComplete) onComplete(error);
        }
    });
}

// Initialize upload progress
$(document).ready(function () {
    var uploadProgress = $('#uploadProgress');
    if (uploadProgress.length > 0) {
        var progressBar = uploadProgress.find('.progress-bar');

        $('#predictForm').on('submit', function (e) {
            e.preventDefault();

            var fileInput = $('#file')[0];
            if (fileInput && fileInput.files[0]) {
                uploadProgress.show();

                uploadWithProgress(
                    '/predict',
                    fileInput.files[0],
                    function (percent) {
                        progressBar.css('width', percent + '%');
                        progressBar.text(percent + '%');
                    },
                    function (error, response) {
                        if (error) {
                            showUploadError('Upload failed. Please try again.');
                        } else {
                            window.location.href = response.redirect || '/result';
                        }
                    }
                );
            }
        });
    }
});