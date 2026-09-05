/* 
* Form Validation JavaScript
* Client-side validation for all forms
*/

$(document).ready(function () {
    // Custom validation methods
    $.validator.addMethod("customEmail", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    }, "Please enter a valid email address");

    $.validator.addMethod("phoneUS", function (value, element) {
        return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
    }, "Please enter a valid phone number");

    $.validator.addMethod("noSpecialChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s]+$/.test(value);
    }, "Special characters are not allowed");

    // Contact form validation
    if ($('#contactForm').length) {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50,
                    noSpecialChars: true
                },
                email: {
                    required: true,
                    customEmail: true
                },
                subject: {
                    required: true
                },
                message: {
                    required: true,
                    minlength: 10,
                    maxlength: 1000
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Name must be at least 2 characters long",
                    maxlength: "Name cannot exceed 50 characters"
                },
                email: {
                    required: "Please enter your email address",
                    email: "Please enter a valid email address"
                },
                subject: {
                    required: "Please select a subject"
                },
                message: {
                    required: "Please enter your message",
                    minlength: "Message must be at least 10 characters long",
                    maxlength: "Message cannot exceed 1000 characters"
                }
            },
            errorElement: 'div',
            errorClass: 'invalid-feedback',
            highlight: function (element) {
                $(element).addClass('is-invalid').removeClass('is-valid');
            },
            unhighlight: function (element) {
                $(element).removeClass('is-invalid').addClass('is-valid');
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
            submitHandler: function (form) {
                // Handle form submission
                submitContactForm(form);
            }
        });
    }

    // Predict form validation
    if ($('#predictForm').length) {
        $('#predictForm').validate({
            rules: {
                file: {
                    required: true,
                    extension: "jpg|jpeg|png"
                },
                model: {
                    required: true
                }
            },
            messages: {
                file: {
                    required: "Please select an image file",
                    extension: "Please upload a valid image file (JPG, JPEG, or PNG)"
                },
                model: {
                    required: "Please select a model"
                }
            },
            errorElement: 'div',
            errorClass: 'invalid-feedback',
            highlight: function (element) {
                $(element).addClass('is-invalid').removeClass('is-valid');
            },
            unhighlight: function (element) {
                $(element).removeClass('is-invalid').addClass('is-valid');
            },
            submitHandler: function (form) {
                // Show loading state
                showLoadingState();
                form.submit();
            }
        });
    }
});

// Submit contact form via AJAX
function submitContactForm(form) {
    var formData = $(form).serialize();
    var submitBtn = $(form).find('button[type="submit"]');
    var originalText = submitBtn.html();

    submitBtn.html('<span class="spinner-border spinner-border-sm mr-2"></span>Sending...');
    submitBtn.prop('disabled', true);

    $.ajax({
        url: '/contact',
        type: 'POST',
        data: formData,
        success: function (response) {
            // Show success message
            var successMsg = $('<div>')
                .addClass('alert alert-success')
                .html('<i class="fas fa-check-circle"></i> Your message has been sent successfully!');

            $(form).before(successMsg);
            $(form)[0].reset();

            // Auto dismiss after 5 seconds
            setTimeout(function () {
                successMsg.fadeOut('slow', function () {
                    $(this).remove();
                });
            }, 5000);
        },
        error: function (xhr, status, error) {
            // Show error message
            var errorMsg = $('<div>')
                .addClass('alert alert-danger')
                .html('<i class="fas fa-exclamation-circle"></i> An error occurred. Please try again.');

            $(form).before(errorMsg);
        },
        complete: function () {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }
    });
}

// Show loading state for prediction form
function showLoadingState() {
    var predictBtn = $('#predictBtn');
    if (predictBtn.length) {
        predictBtn.html('<span class="spinner-border spinner-border-sm mr-2"></span>Processing...');
        predictBtn.prop('disabled', true);

        // Add loading overlay
        var overlay = $('<div>')
            .attr('id', 'loadingOverlay')
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': 'rgba(255, 255, 255, 0.8)',
                'z-index': '9999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            })
            .html('<div class="text-center"><div class="loading-spinner mb-3"></div><h5>Processing image...</h5></div>');

        $('body').append(overlay);
    }
}