/* 
* Animation JavaScript for Transfer Learning for Images
* Scroll animations and dynamic effects
*/

$(document).ready(function () {
    // Initialize scroll reveal animations
    initScrollReveal();

    // Initialize counter animations
    initCounters();

    // Initialize typing effects
    initTypingEffect();

    // Initialize parallax effects
    initParallax();
});

// Scroll Reveal Animation
function initScrollReveal() {
    var elements = $('.scroll-reveal, .fade-in-up, .slide-in-left, .slide-in-right');

    if (elements.length === 0) return;

    function checkVisibility() {
        elements.each(function () {
            var element = $(this);
            if (isElementInViewport(element) && !element.hasClass('animated')) {
                element.addClass('animated');
                element.css('animation-delay', element.data('delay') || '0s');
            }
        });
    }

    // Check on scroll
    $(window).on('scroll', throttle(checkVisibility, 100));

    // Check on load
    checkVisibility();
}

// Check if element is in viewport
function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Counter Animation
function initCounters() {
    $('.counter').each(function () {
        var $this = $(this);
        var target = parseInt($this.data('target'));
        var duration = $this.data('duration') || 2000;
        var startTime = null;

        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var current = Math.min(progress / duration, 1);
            var value = Math.floor(current * target);

            $this.text(formatNumber(value));

            if (progress < duration) {
                requestAnimationFrame(animateCounter);
            } else {
                $this.text(formatNumber(target));
            }
        }

        // Start counter when in viewport
        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animateCounter);
                observer.disconnect();
            }
        });

        observer.observe($this[0]);
    });
}

// Typing Effect
function initTypingEffect() {
    $('.typing-effect').each(function () {
        var $this = $(this);
        var text = $this.data('text') || $this.text();
        var speed = $this.data('speed') || 100;
        var index = 0;

        $this.text('');

        function typeNextChar() {
            if (index < text.length) {
                $this.append(text.charAt(index));
                index++;
                setTimeout(typeNextChar, speed);
            }
        }

        typeNextChar();
    });
}

// Parallax Effect
function initParallax() {
    $(window).on('scroll', throttle(function () {
        $('.parallax').each(function () {
            var $this = $(this);
            var speed = $this.data('speed') || 0.5;
            var scrolled = $(window).scrollTop();
            var offset = $this.offset().top;
            var distance = (scrolled - offset) * speed;
            $this.css('transform', 'translateY(' + distance + 'px)');
        });
    }, 16));
}

// Particle Background
function createParticles(containerId, numParticles = 50) {
    var container = $('#' + containerId);
    if (container.length === 0) return;

    container.css({
        'position': 'relative',
        'overflow': 'hidden'
    });

    for (var i = 0; i < numParticles; i++) {
        var particle = $('<div>')
            .addClass('particle')
            .css({
                'position': 'absolute',
                'width': Math.random() * 10 + 5 + 'px',
                'height': Math.random() * 10 + 5 + 'px',
                'background': 'rgba(255, 255, 255, 0.3)',
                'border-radius': '50%',
                'left': Math.random() * 100 + '%',
                'top': Math.random() * 100 + '%',
                'animation': 'float ' + (Math.random() * 3 + 2) + 's ease-in-out infinite'
            });

        container.append(particle);
    }
}

// Smooth page transitions
$(document).ready(function () {
    $('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])').on('click', function (e) {
        var href = $(this).attr('href');
        if (href && href !== '#' && !href.startsWith('javascript:')) {
            e.preventDefault();
            $('main').fadeOut(200, function () {
                window.location.href = href;
            });
        }
    });
});