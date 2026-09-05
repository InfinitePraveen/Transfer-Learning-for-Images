/* 
* Result JavaScript for Transfer Learning for Images
* Handles result display and visualization
*/

$(document).ready(function () {
    // Initialize result page
    initResultPage();

    // Initialize confidence bars
    initConfidenceBars();

    // Initialize charts
    initResultCharts();
});

// Initialize result page
function initResultPage() {
    // Animate confidence value
    animateConfidence();

    // Animate progress bars
    animateProgressBars();

    // Add animation classes
    $('.result-card').addClass('fade-in-up');
}

// Animate confidence value
function animateConfidence() {
    var confidenceElement = $('.confidence-value');
    if (confidenceElement.length === 0) return;

    var targetValue = parseFloat(confidenceElement.text());
    var currentValue = 0;
    var duration = 2000;
    var startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        var percentage = Math.min(progress / duration, 1);

        currentValue = targetValue * percentage;
        confidenceElement.text(currentValue.toFixed(2) + '%');

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            confidenceElement.text(targetValue.toFixed(2) + '%');
        }
    }

    requestAnimationFrame(animate);
}

// Animate progress bars
function animateProgressBars() {
    $('.confidence-bar-fill, .prediction-bar-fill').each(function () {
        var $this = $(this);
        var targetWidth = $this.data('width') || $this.css('width');

        $this.css('width', '0%');

        setTimeout(function () {
            $this.css('width', targetWidth);
        }, 100);
    });
}

// Initialize confidence bars
function initConfidenceBars() {
    var bars = $('.prediction-bar-fill');
    if (bars.length === 0) return;

    bars.each(function () {
        var $this = $(this);
        var confidence = parseFloat($this.data('confidence'));

        // Set color based on confidence
        if (confidence >= 80) {
            $this.addClass('bg-success');
        } else if (confidence >= 50) {
            $this.addClass('bg-warning');
        } else {
            $this.addClass('bg-danger');
        }

        // Add tooltip
        if (typeof $.fn.tooltip === 'function') {
            $this.tooltip({
                title: confidence.toFixed(2) + '% confidence',
                placement: 'top'
            });
        }
    });
}

// Initialize result charts
function initResultCharts() {
    var chartCanvas = $('#confidenceChart');
    if (chartCanvas.length === 0) return;

    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        return;
    }

    // Get data from data attributes
    var labels = JSON.parse(chartCanvas.data('labels') || '[]');
    var values = JSON.parse(chartCanvas.data('values') || '[]');

    // Create horizontal bar chart
    var ctx = chartCanvas[0].getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence',
                data: values,
                backgroundColor: [
                    'rgba(40, 167, 69, 0.7)',
                    'rgba(0, 123, 255, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(108, 117, 125, 0.7)',
                    'rgba(23, 162, 184, 0.7)'
                ],
                borderColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(0, 123, 255, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(108, 117, 125, 1)',
                    'rgba(23, 162, 184, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[0].label + ': ' + tooltipItem.xLabel.toFixed(2) + '%';
                    }
                }
            }
        }
    });
}

// Handle retry button
$(document).ready(function () {
    $('#retryBtn').on('click', function () {
        window.location.href = '/predict';
    });
});

// Print functionality
$(document).ready(function () {
    $('#printBtn').on('click', function () {
        window.print();
    });
});

// Share functionality
$(document).ready(function () {
    $('#shareBtn').on('click', function () {
        if (navigator.share) {
            navigator.share({
                title: 'Image Classification Result',
                text: 'Check out this image classification result!',
                url: window.location.href
            }).then(function () {
                console.log('Shared successfully');
            }).catch(function (error) {
                console.error('Error sharing:', error);
            });
        } else {
            // Fallback to copy to clipboard
            var dummy = $('<input>').val(window.location.href).appendTo('body').select();
            document.execCommand('copy');
            dummy.remove();

            alert('Link copied to clipboard!');
        }
    });
});