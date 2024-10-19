// popup.js
chrome.storage.local.get('analysisData', (data) => {
    const histogramContainer = document.getElementById('histogramData');
    const donutContainer = document.getElementById('donutData');
    const analysisData = data.analysisData;

    if (analysisData) {
        if (analysisData.histogramData) {
            histogramContainer.innerHTML = `Histogram Data: ${analysisData.histogramData.join(', ')}`;
        } else {
            histogramContainer.textContent = 'No histogram data found.';
        }

        if (analysisData.donutData) {
            const { aiPercentage, nonAiPercentage } = analysisData.donutData;
            donutContainer.innerHTML = `AI Percentage: ${aiPercentage}%, Non-AI Percentage: ${nonAiPercentage}%`;
        } else {
            donutContainer.textContent = 'No donut chart data found.';
        }
    } else {
        histogramContainer.textContent = 'No analysis data found.';
        donutContainer.textContent = 'No analysis data found.';
    }
});
