// popup.js

// Function to render histograms
function renderHistograms(data) {
    const histogram1 = new Chart(document.getElementById('histogram1'), {
        type: 'bar',
        data: {
            labels: ['Category 1'],
            datasets: [{
                label: 'Count',
                data: [data.histogram[0]], // Data for histogram 1
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true },
                x: { display: false } // Hide x-axis
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    const histogram2 = new Chart(document.getElementById('histogram2'), {
        type: 'bar',
        data: {
            labels: ['Category 2'],
            datasets: [{
                label: 'Count',
                data: [data.histogram[1]], // Data for histogram 2
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true },
                x: { display: false }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    const histogram3 = new Chart(document.getElementById('histogram3'), {
        type: 'bar',
        data: {
            labels: ['Category 3'],
            datasets: [{
                label: 'Count',
                data: [data.histogram[2]], // Data for histogram 3
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true },
                x: { display: false }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Function to render the donut chart
function renderDonutChart(data) {
    const donutChart = new Chart(document.getElementById('donutChart'), {
        type: 'doughnut',
        data: {
            labels: ['AI Generated', 'Not AI Generated'],
            datasets: [{
                data: data.donut, // [percentage of AI, percentage of not AI]
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Show percentage
                        }
                    }
                }
            }
        }
    });
}

// Fetch data from the background script
chrome.runtime.getBackgroundPage((backgroundPage) => {
    const data = backgroundPage.getAnalysisData(); // Assumes you have this function to get data

    // Render the charts with the fetched data
    renderHistograms(data);
    renderDonutChart(data);
});
