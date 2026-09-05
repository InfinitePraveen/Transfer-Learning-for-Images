/* 
* Cookie Consent JavaScript for Transfer Learning for Images
* Manages cookie consent banner and preferences
*/

$(document).ready(function () {
    // Initialize cookie consent
    initCookieConsent();
});

// Cookie consent initialization
function initCookieConsent() {
    // Check if user has already made a choice
    if (!hasCookieConsent()) {
        showCookieBanner();
    }
}

// Check if user has consented
function hasCookieConsent() {
    return getCookie('cookie_consent') !== null;
}

// Show cookie consent banner
function showCookieBanner() {
    var banner = $(
        '<div id="cookieConsent" class="cookie-consent">' +
        '<div class="cookie-consent-content">' +
        '<div class="cookie-icon">' +
        '<i class="fas fa-cookie-bite"></i>' +
        '</div>' +
        '<div class="cookie-text">' +
        '<h5>We use cookies</h5>' +
        '<p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
        '<button class="btn btn-primary btn-sm" id="acceptCookies">Accept</button>' +
        '<button class="btn btn-outline-secondary btn-sm" id="declineCookies">Decline</button>' +
        '<button class="btn btn-link btn-sm" id="cookiePreferences">Preferences</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    $('body').append(banner);

    // Add styles dynamically
    $('<style>')
        .text(`
            .cookie-consent {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                z-index: 9999;
                transform: translateY(100%);
                transition: transform 0.5s ease;
            }
            
            .cookie-consent.show {
                transform: translateY(0);
            }
            
            .cookie-consent-content {
                display: flex;
                align-items: center;
                max-width: 1200px;
                margin: 0 auto;
                padding: 1rem;
                gap: 1rem;
            }
            
            .cookie-icon {
                font-size: 2rem;
                color: #8B4513;
            }
            
            .cookie-text {
                flex: 1;
            }
            
            .cookie-text h5 {
                margin-bottom: 0.25rem;
                color: #333;
            }
            
            .cookie-text p {
                margin-bottom: 0;
                color: #666;
                font-size: 0.9rem;
            }
            
            .cookie-actions {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }
            
            @media (max-width: 768px) {
                .cookie-consent-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .cookie-actions {
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }
        `)
        .appendTo('head');

    // Show banner after delay
    setTimeout(function () {
        banner.addClass('show');
    }, 1000);

    // Handle accept
    $('#acceptCookies').on('click', function () {
        setCookie('cookie_consent', 'accepted', 365);
        hideCookieBanner();
        trackCookieChoice('accepted');
    });

    // Handle decline
    $('#declineCookies').on('click', function () {
        setCookie('cookie_consent', 'declined', 365);
        hideCookieBanner();
        trackCookieChoice('declined');
    });

    // Handle preferences
    $('#cookiePreferences').on('click', function () {
        showCookiePreferences();
    });
}

// Hide cookie banner
function hideCookieBanner() {
    var banner = $('#cookieConsent');
    banner.removeClass('show');

    setTimeout(function () {
        banner.remove();
    }, 500);
}

// Show cookie preferences modal
function showCookiePreferences() {
    var modal = $(
        '<div class="modal fade" id="cookiePreferencesModal" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title">Cookie Preferences</h5>' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<h6>Essential Cookies</h6>' +
        '<p>These cookies are necessary for the website to function and cannot be switched off.</p>' +
        '<div class="custom-control custom-switch">' +
        '<input type="checkbox" class="custom-control-input" id="essentialCookies" checked disabled>' +
        '<label class="custom-control-label" for="essentialCookies">Always Active</label>' +
        '</div>' +
        '<hr>' +
        '<h6>Analytics Cookies</h6>' +
        '<p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>' +
        '<div class="custom-control custom-switch">' +
        '<input type="checkbox" class="custom-control-input" id="analyticsCookies">' +
        '<label class="custom-control-label" for="analyticsCookies">Enable Analytics</label>' +
        '</div>' +
        '<hr>' +
        '<h6>Functional Cookies</h6>' +
        '<p>These cookies enable the website to provide enhanced functionality and personalization.</p>' +
        '<div class="custom-control custom-switch">' +
        '<input type="checkbox" class="custom-control-input" id="functionalCookies">' +
        '<label class="custom-control-label" for="functionalCookies">Enable Functional Cookies</label>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
        '<button type="button" class="btn btn-primary" id="saveCookiePreferences">Save Preferences</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    $('body').append(modal);
    modal.modal('show');

    // Load existing preferences
    var preferences = getCookiePreferences();
    if (preferences) {
        $('#analyticsCookies').prop('checked', preferences.analytics);
        $('#functionalCookies').prop('checked', preferences.functional);
    }

    // Handle save
    $('#saveCookiePreferences').on('click', function () {
        var preferences = {
            essential: true,
            analytics: $('#analyticsCookies').is(':checked'),
            functional: $('#functionalCookies').is(':checked')
        };

        setCookie('cookie_preferences', JSON.stringify(preferences), 365);
        setCookie('cookie_consent', 'customized', 365);

        modal.modal('hide');
        hideCookieBanner();
        trackCookieChoice('customized');
    });

    // Clean up on modal close
    modal.on('hidden.bs.modal', function () {
        modal.remove();
    });
}

// Get cookie preferences
function getCookiePreferences() {
    var preferences = getCookie('cookie_preferences');
    return preferences ? JSON.parse(preferences) : null;
}

// Track cookie choice
function trackCookieChoice(choice) {
    console.log('Cookie consent:', choice);

    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cookie_consent', {
            'event_category': 'consent',
            'event_label': choice
        });
    }
}

// Cookie utility functions
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}