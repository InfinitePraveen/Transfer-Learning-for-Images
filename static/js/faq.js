/* 
* FAQ JavaScript for Transfer Learning for Images
* Handles FAQ accordion and search functionality
*/

$(document).ready(function () {
    // Initialize FAQ search
    initFAQSearch();

    // Initialize accordion
    initAccordion();

    // Initialize category filtering
    initCategoryFilter();
});

// FAQ search functionality
function initFAQSearch() {
    var searchInput = $('#faqSearch');
    if (searchInput.length === 0) return;

    searchInput.on('input', debounce(function () {
        var query = $(this).val().toLowerCase().trim();
        searchFAQs(query);
    }, 300));
}

// Search FAQs
function searchFAQs(query) {
    var faqItems = $('.faq-item, .card');
    var resultsFound = false;

    faqItems.each(function () {
        var $item = $(this);
        var faqText = $item.text().toLowerCase();

        if (query === '' || faqText.indexOf(query) !== -1) {
            $item.show();
            resultsFound = true;
        } else {
            $item.hide();
        }
    });

    // Show/hide "no results" message
    var noResults = $('#noResults');
    if (noResults.length > 0) {
        if (resultsFound) {
            noResults.hide();
        } else {
            noResults.show();
        }
    }

    // Update result count
    var resultCount = $('#resultCount');
    if (resultCount.length > 0) {
        var visibleCount = faqItems.filter(':visible').length;
        resultCount.text(visibleCount);
    }
}

// Initialize accordion
function initAccordion() {
    var accordionCards = $('#accordion .card');
    if (accordionCards.length === 0) return;

    // Store original state
    accordionCards.each(function () {
        $(this).data('original-state', $(this).find('.collapse').hasClass('show'));
    });

    // Handle accordion behavior
    accordionCards.find('.btn-link').on('click', function () {
        var target = $(this).data('target');
        var collapse = $(target);

        if (collapse.hasClass('show')) {
            collapse.collapse('hide');
        } else {
            // Close all other items
            accordionCards.find('.collapse').collapse('hide');
            collapse.collapse('show');
        }
    });
}

// Initialize category filtering
function initCategoryFilter() {
    var categoryButtons = $('.faq-category-btn');
    if (categoryButtons.length === 0) return;

    categoryButtons.on('click', function () {
        categoryButtons.removeClass('active');
        $(this).addClass('active');

        var category = $(this).data('category');
        filterFAQsByCategory(category);
    });
}

// Filter FAQs by category
function filterFAQsByCategory(category) {
    var faqItems = $('.faq-item');

    faqItems.each(function () {
        var $item = $(this);
        var itemCategory = $item.data('category');

        if (category === 'all' || itemCategory === category) {
            $item.show();
        } else {
            $item.hide();
        }
    });
}

// Expand/collapse all
function expandAllFAQs() {
    $('#accordion .collapse').collapse('show');
}

function collapseAllFAQs() {
    $('#accordion .collapse').collapse('hide');
}

// Initialize expand/collapse buttons
$(document).ready(function () {
    $('#expandAllBtn').on('click', expandAllFAQs);
    $('#collapseAllBtn').on('click', collapseAllFAQs);
});

// Track FAQ interactions
$(document).ready(function () {
    $('.faq-question').on('click', function () {
        var question = $(this).text().trim();
        console.log('FAQ clicked:', question);

        // Track interaction (analytics integration)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_click', {
                'event_category': 'engagement',
                'event_label': question
            });
        }
    });
});