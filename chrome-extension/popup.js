
// get the image analysis data from local storage
chrome.storage.local.get('imageAnalysisData', (data) => {
    console.log('Analysis data received in popup:', data);
    const resultContainer = document.getElementById('resultContainer');
    const imageAnalysisData = data.imageAnalysisData;

    if (imageAnalysisData && imageAnalysisData.data) {
        resultContainer.innerHTML = '';
        imageAnalysisData.data.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.textContent = `Image ${index + 1}: ${result.isAIgenerated ? 'AI-generated' : 'Not AI-generated'}`;
            resultContainer.appendChild(resultItem);
        });
    } else {
        resultContainer.textContent = 'No analysis data found.';
    }
});