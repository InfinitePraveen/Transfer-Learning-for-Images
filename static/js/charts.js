/* 
* Charts JavaScript for Transfer Learning for Images
* Chart initialization and configuration using Chart.js
*/

// Check if Chart.js is loaded
if (typeof Chart === 'undefined') {
    console.warn('Chart.js is not loaded. Charts will not be available.');
}

// Global chart configuration
Chart.defaults.global.defaultFontFamily = "'Open Sans', -apple-system, sans-serif";
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = '#333';
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

// Color palette
const CHART_COLORS = {
    blue: 'rgba(0, 123, 255, 0.7)',
    blueBorder: 'rgba(0, 123, 255, 1)',
    green: 'rgba(40, 167, 69, 0.7)',
    greenBorder: 'rgba(40, 167, 69, 1)',
    red: 'rgba(220, 53, 69, 0.7)',
    redBorder: 'rgba(220, 53, 69, 1)',
    orange: 'rgba(255, 193, 7, 0.7)',
    orangeBorder: 'rgba(255, 193, 7, 1)',
    purple: 'rgba(111, 66, 193, 0.7)',
    purpleBorder: 'rgba(111, 66, 193, 1)',
    cyan: 'rgba(23, 162, 184, 0.7)',
    cyanBorder: 'rgba(23, 162, 184, 1)'
};

// Initialize confidence chart
function initConfidenceChart(canvasId, labels, data) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence',
                data: data,
                backgroundColor: generateColors(data.length),
                borderColor: generateBorderColors(data.length),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        callback: function (value) {
                            return value + '%';
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Confidence (%)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Class'
                    }
                }]
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize pie chart
function initPieChart(canvasId, labels, data) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: generateColors(data.length),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Initialize line chart for training history
function initTrainingChart(canvasId, epochs, trainLoss, valLoss, trainAcc, valAcc) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: epochs,
            datasets: [
                {
                    label: 'Training Loss',
                    data: trainLoss,
                    borderColor: CHART_COLORS.blueBorder,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Validation Loss',
                    data: valLoss,
                    borderColor: CHART_COLORS.redBorder,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Loss'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Epoch'
                    }
                }]
            }
        }
    });
}

// Generate colors for charts
function generateColors(count) {
    var colors = [];
    var baseColors = [
        'rgba(0, 123, 255, 0.7)',
        'rgba(40, 167, 69, 0.7)',
        'rgba(220, 53, 69, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(111, 66, 193, 0.7)',
        'rgba(23, 162, 184, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)'
    ];

    for (var i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }

    return colors;
}

// Generate border colors for charts
function generateBorderColors(count) {
    var colors = [];
    var baseColors = [
        'rgba(0, 123, 255, 1)',
        'rgba(40, 167, 69, 1)',
        'rgba(220, 53, 69, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(111, 66, 193, 1)',
        'rgba(23, 162, 184, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
    ];

    for (var i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }

    return colors;
}

// Export charts
window.chartFunctions = {
    initConfidenceChart: initConfidenceChart,
    initPieChart: initPieChart,
    initTrainingChart: initTrainingChart,
    CHART_COLORS: CHART_COLORS
};