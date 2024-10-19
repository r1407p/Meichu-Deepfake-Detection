// popup.js

// Function to fetch and display image analysis data
function displayImageAnalysisData() {
    chrome.storage.local.get('imageAnalysisData', (data) => {
        const histogramContainer = document.getElementById('histogramData');
        const imageAnalysisData = data.imageAnalysisData;

        if (imageAnalysisData && imageAnalysisData.histogramData) {
            histogramContainer.innerHTML = `Histogram Data: ${imageAnalysisData.histogramData.join(', ')}`;
        } else {
            histogramContainer.textContent = 'No histogram data found.';
        }
    });
}

// Function to fetch and display video analysis data
function displayVideoAnalysisData() {
    chrome.storage.local.get('videoAnalysisData', (data) => {
        const donutContainer = document.getElementById('donutData');
        const videoAnalysisData = data.videoAnalysisData;

        if (videoAnalysisData && videoAnalysisData.donutData) {
            const { aiPercentage, nonAiPercentage } = videoAnalysisData.donutData;
            donutContainer.innerHTML = `AI Percentage: ${aiPercentage}%, Non-AI Percentage: ${nonAiPercentage}%`;
        } else {
            donutContainer.textContent = 'No donut chart data found.';
        }
    });
}

// Function to fetch and display text analysis data
function displaytextAnalysisData() {
    chrome.storage.local.get('textAnalysisData', (data) => {
        const textContainer = document.getElementById('textData');
        const textAnalysisData = data.textAnalysisData;

        if (textAnalysisData) {
            textContainer.innerHTML = `<pre>${JSON.stringify(textAnalysisData, null, 2)}</pre>`;
        } else {
            textContainer.textContent = 'No text analysis data found.';
        }
    });
}

// Call the functions to fetch and display data
displayImageAnalysisData();
displayVideoAnalysisData();
displaytextAnalysisData();
