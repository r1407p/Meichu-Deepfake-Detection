let analysisData = { histogram: [0, 0, 0], donut: [0, 0] };

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'imageAnalysisData') {
        analysisData = message.data;
        console.log('received data:', analysisData);
    } else if (message.type === 'getAnalysisData') {
        console.log('send data:', analysisData);
        sendResponse(analysisData);
    }
    return true; 
});
