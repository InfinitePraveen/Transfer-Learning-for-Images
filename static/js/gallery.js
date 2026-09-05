/* 
* Gallery JavaScript for Transfer Learning for Images
* Handles gallery filtering, lightbox, and interactions
*/

$(document).ready(function () {
    // Initialize gallery
    initGallery();

    // Initialize filters
    initGalleryFilters();

    // Initialize lightbox
    initLightbox();

    // Initialize lazy loading
    initLazyLoading();
});

// Gallery initialization
function initGallery() {
    var galleryItems = $('.gallery-item');
    if (galleryItems.length === 0) return;

    // Add animation classes
    galleryItems.each(function (index) {
        $(this).addClass('fade-in');
        $(this).css('animation-delay', (index * 100) + 'ms');
    });
}

// Gallery filters
function initGalleryFilters() {
    var filterButtons = $('.filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.on('click', function () {
        filterButtons.removeClass('active');
        $(this).addClass('active');

        var filter = $(this).data('filter');
        filterGallery(filter);
    });
}

// Filter gallery items
function filterGallery(filter) {
    var galleryItems = $('.gallery-item');

    galleryItems.each(function () {
        var $item = $(this);
        var category = $item.data('category');

        if (filter === 'all' || category === filter) {
            $item.fadeIn(300);
        } else {
            $item.fadeOut(300);
        }
    });

    // Update gallery count
    var visibleCount = galleryItems.filter(':visible').length;
    var totalCount = galleryItems.length;

    var countElement = $('#galleryCount');
    if (countElement.length > 0) {
        countElement.text('Showing ' + visibleCount + ' of ' + totalCount + ' images');
    }
}

// Lightbox functionality
function initLightbox() {
    var galleryItems = $('.gallery-item');
    if (galleryItems.length === 0) return;

    galleryItems.on('click', function () {
        var imageUrl = $(this).find('img').attr('src');
        var title = $(this).find('.gallery-title').text();
        var description = $(this).find('.gallery-description').text();

        openLightbox(imageUrl, title, description);
    });
}

// Open lightbox
function openLightbox(imageUrl, title, description) {
    var lightbox = $('#galleryLightbox');

    if (lightbox.length === 0) {
        lightbox = $(
            '<div id="galleryLightbox" class="gallery-lightbox">' +
            '<div class="lightbox-content">' +
            '<span class="close-lightbox">&times;</span>' +
            '<img src="" alt="Gallery Image">' +
            '<div class="lightbox-caption">' +
            '<h4 class="lightbox-title"></h4>' +
            '<p class="lightbox-description"></p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

        $('body').append(lightbox);

        // Close on click
        lightbox.find('.close-lightbox').on('click', closeLightbox);
        lightbox.on('click', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Close on ESC key
        $(document).on('keyup', function (e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Set content
    lightbox.find('img').attr('src', imageUrl);
    lightbox.find('.lightbox-title').text(title);
    lightbox.find('.lightbox-description').text(description);

    // Show lightbox
    lightbox.addClass('active');
    $('body').css('overflow', 'hidden');
}

// Close lightbox
function closeLightbox() {
    var lightbox = $('#galleryLightbox');
    if (lightbox.length > 0) {
        lightbox.removeClass('active');
        $('body').css('overflow', '');
    }
}

// Lazy loading
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        var lazyImages = $('.gallery-item img[data-src]');

        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.each(function () {
            imageObserver.observe(this);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        $('.gallery-item img[data-src]').each(function () {
            $(this).attr('src', $(this).data('src'));
            $(this).removeAttr('data-src');
        });
    }
}

// Gallery navigation (previous/next)
$(document).ready(function () {
    $('#prevImageBtn').on('click', function () {
        navigateGallery(-1);
    });

    $('#nextImageBtn').on('click', function () {
        navigateGallery(1);
    });
});

function navigateGallery(direction) {
    var visibleItems = $('.gallery-item:visible');
    if (visibleItems.length === 0) return;

    var currentIndex = visibleItems.index($('.gallery-item.active'));
    var newIndex = currentIndex + direction;

    if (newIndex < 0) {
        newIndex = visibleItems.length - 1;
    } else if (newIndex >= visibleItems.length) {
        newIndex = 0;
    }

    var newItem = visibleItems.eq(newIndex);
    var imageUrl = newItem.find('img').attr('src');
    var title = newItem.find('.gallery-title').text();
    var description = newItem.find('.gallery-description').text();

    openLightbox(imageUrl, title, description);

    visibleItems.removeClass('active');
    newItem.addClass('active');
}