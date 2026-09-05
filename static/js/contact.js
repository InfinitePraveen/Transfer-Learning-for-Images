/* 
* Contact JavaScript for Transfer Learning for Images
* Handles contact form submission and validation
*/

$(document).ready(function () {
    // Initialize contact form
    initContactForm();

    // Initialize contact info cards
    initContactCards();
});

// Contact form initialization
function initContactForm() {
    var contactForm = $('#contactForm');
    if (contactForm.length === 0) return;

    contactForm.on('submit', function (e) {
        e.preventDefault();

        if (validateContactForm()) {
            submitContactForm();
        }
    });

    // Real-time validation
    $('#name').on('input', function () {
        validateField($(this));
    });

    $('#email').on('input', function () {
        validateField($(this));
    });

    $('#message').on('input', function () {
        validateField($(this));
    });
}

// Validate individual field
function validateField(field) {
    var value = field.val().trim();
    var fieldName = field.attr('name');

    if (value === '') {
        field.addClass('is-invalid');
        return false;
    }

    if (fieldName === 'email') {
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(value)) {
            field.addClass('is-invalid');
            return false;
        }
    }

    field.removeClass('is-invalid').addClass('is-valid');
    return true;
}

// Validate entire contact form
function validateContactForm() {
    var isValid = true;

    var nameField = $('#name');
    if (!validateField(nameField)) {
        isValid = false;
    }

    var emailField = $('#email');
    if (!validateField(emailField)) {
        isValid = false;
    }

    var messageField = $('#message');
    if (!validateField(messageField)) {
        isValid = false;
    }

    return isValid;
}

// Submit contact form via AJAX
function submitContactForm() {
    var submitBtn = $('#contactForm button[type="submit"]');
    var originalText = submitBtn.html();

    // Show loading state
    submitBtn.html('<span class="spinner-border spinner-border-sm mr-2"></span>Sending...');
    submitBtn.prop('disabled', true);

    var formData = {
        name: $('#name').val().trim(),
        email: $('#email').val().trim(),
        subject: $('#subject').val(),
        message: $('#message').val().trim()
    };

    $.ajax({
        url: '/api/contact',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            showContactSuccess();
            $('#contactForm')[0].reset();
            $('.is-valid').removeClass('is-valid');
        },
        error: function (xhr, status, error) {
            showContactError('An error occurred. Please try again later.');
        },
        complete: function () {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }
    });
}

// Show success message
function showContactSuccess() {
    var successMsg = $(
        '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        '<i class="fas fa-check-circle"></i> ' +
        'Your message has been sent successfully! We will get back to you soon.' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>'
    );

    $('#contactForm').before(successMsg);

    setTimeout(function () {
        successMsg.fadeOut('slow', function () {
            $(this).remove();
        });
    }, 5000);
}

// Show error message
function showContactError(message) {
    var errorMsg = $(
        '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        '<i class="fas fa-exclamation-circle"></i> ' + message +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>'
    );

    $('#contactForm').before(errorMsg);
}

// Initialize contact info cards
function initContactCards() {
    var contactCards = $('.contact-info-item');
    if (contactCards.length === 0) return;

    contactCards.each(function () {
        $(this).hover(
            function () {
                $(this).addClass('shadow-lg');
            },
            function () {
                $(this).removeClass('shadow-lg');
            }
        );
    });
}