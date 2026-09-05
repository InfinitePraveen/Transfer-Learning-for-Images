/* 
* Main JavaScript for Transfer Learning for Images
* Global functions and initialization
*/

$(document).ready(function () {
    // Initialize tooltips
    if (typeof $.fn.tooltip === 'function') {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Initialize popovers
    if (typeof $.fn.popover === 'function') {
        $('[data-toggle="popover"]').popover();
    }

    // Auto-dismiss alerts after 5 seconds
    setTimeout(function () {
        $('.alert').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 5000);

    // Add smooth scrolling to all links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
            }
        }
    });

    // Add active class to current nav item
    var currentPath = window.location.pathname;
    $('.navbar-nav .nav-link').each(function () {
        var href = $(this).attr('href');
        if (href === currentPath) {
            $(this).addClass('active');
        }
    });

    // Add fade-in animation to main content
    $('main').addClass('fade-in');

    // Back to top button
    var backToTopBtn = $('<button>')
        .attr('id', 'backToTopBtn')
        .addClass('btn btn-primary')
        .html('<i class="fas fa-arrow-up"></i>')
        .css({
            'position': 'fixed',
            'bottom': '20px',
            'right': '20px',
            'display': 'none',
            'z-index': '1000',
            'border-radius': '50%',
            'width': '50px',
            'height': '50px',
            'padding': '10px'
        })
        .click(function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });

    $('body').append(backToTopBtn);

    // Show/hide back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            backToTopBtn.fadeIn();
        } else {
            backToTopBtn.fadeOut();
        }
    });

    // Add loading spinner to forms
    $('form').on('submit', function () {
        var submitBtn = $(this).find('button[type="submit"]');
        if (submitBtn.length && !submitBtn.hasClass('no-loading')) {
            var originalText = submitBtn.html();
            submitBtn.html('<span class="spinner-border spinner-border-sm mr-2"></span>Loading...');
            submitBtn.prop('disabled', true);

            // Restore button after 10 seconds (in case of error)
            setTimeout(function () {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }, 10000);
        }
    });

    // Console message
    console.log('%cTransfer Learning for Images', 'font-size: 20px; font-weight: bold; color: #007bff;');
    console.log('%cDeveloped with ❤️ using PyTorch and Flask', 'font-size: 14px; color: #666;');
});

// Global utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

function formatPercentage(num, decimals = 2) {
    return num.toFixed(decimals) + '%';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error handler
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo);
    return false;
};