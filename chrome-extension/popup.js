// popup.js

// Function to fetch and display image analysis data
function displayImageAnalysisData() {
    chrome.storage.local.get('imageAnalysisData', (data) => {
        const histogramLabel = document.getElementById('histogram-label');
        const histogramContainer = document.getElementById('histogramData');
        const imageAnalysisData = data.imageAnalysisData;
        const image_ai = imageAnalysisData.image_ai;
    
        if (imageAnalysisData && image_ai) {
            histogramContainer.innerHTML = '';

            let group0 = 0; // 0~0.1
            let group1 = 0; // 0.1~0.5
            let group2 = 0; // 0.5~1.0
            image_ai.forEach(item => {
                const probability = item.isAIgenerated_prob;
                if (probability <= 0.1) {
                    group0++;
                } else if (probability > 0.1 && probability <= 0.5) {
                    group1++;
                } else if (probability > 0.5 && probability <= 1.0) {
                    group2++;
                }
            });

            const histogramData = [group0, group1, group2];
            const labels = ['< 0.1', '0.1~0.5', '0.5~1'];
            histogramLabel.textContent = `< 10%　10~50%   50~100%`;
            const maxValue = Math.max(...histogramData);

            histogramData.forEach(value => {

                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${(value / maxValue) * 100}%`;
                bar.textContent = value;
                histogramContainer.appendChild(bar);
            });
        } else {
            histogramContainer.textContent = 'No histogram data found.';
        }
    });
}

// Function to fetch and display video analysis data
function displayVideoAnalysisData() {
    const isFake = document.getElementById('fake');
    const noVideo = document.getElementById('noVideo');
    chrome.storage.local.get('videoAnalysisData', (data) => {
        const donutContainer = document.getElementById('donutData');
        const videoAnalysisData = data.videoAnalysisData;
        const ai_percentage = videoAnalysisData.audio_ai_percentage;
        console.log(`audio_ai: ${videoAnalysisData.audio_ai}`);
        if (videoAnalysisData.audio_ai.length > 0) {
            donutContainer.innerHTML = `${ai_percentage}%`;
            isFake.textContent = 'is fake';
            noVideo.textContent = '';
        } else {
            donutContainer.textContent = '';
            isFake.textContent = '';
            noVideo.textContent = 'There is no video in this news.';
        }
    });
}

// Function to fetch and display text analysis data
function displaytextAnalysisData() {
    chrome.storage.local.get('textAnalysisData', (data) => {
        const summaryElement = document.getElementById('articleSummary');
        summaryElement.innerHTML = '';

        const textAnalysisData = data.textAnalysisData;
        const articleArray = textAnalysisData.text_summary;

        if (textAnalysisData) {
            // textContainer.innerHTML = `<pre>${JSON.stringify(textAnalysisData, null, 2)}</pre>`;
            for (let i = 0; i < articleArray.length; i++) {
                const paragraph = document.createElement('li');
                paragraph.style.fontSize = '10px';
                paragraph.style.marginTop = '4px';
                paragraph.style.marginBottom = '4px';
                paragraph.textContent = articleArray[i];
                summaryElement.appendChild(paragraph);
            }
        } else {
            textContainer.textContent = 'No text analysis data found.';
        }
    });
}

// Call the functions to fetch and display data
displayImageAnalysisData();
displayVideoAnalysisData();
displaytextAnalysisData();
