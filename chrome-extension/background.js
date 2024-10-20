
// background.js

// Listener for messages received from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check the message type to determine how to handle the data
    switch (message.type) {
        case 'imageAnalysisData':
            // Handle the image analysis data
            console.log('Received image analysis data:', message.data);
            storeAnalysisData('imageAnalysisData', message.data);
            break;
        
        case 'videoAnalysisData':
            // Handle the video analysis data
            console.log('Received video analysis data:', message.data);
            storeAnalysisData('videoAnalysisData', message.data);
            break;
        
        case 'textAnalysisData':
            // Handle the text analysis data
            console.log('Received text analysis data:', message.data);
            storeAnalysisData('textAnalysisData', message.data);
            break;
        
        default:
            console.warn('Received unknown message type:', message.type);
            break;
    }

    // Send a success response back to the sender
    sendResponse({ status: 'success' });
});

// Helper function to store the analysis data in chrome.storage.local
function storeAnalysisData(key, data) {
    chrome.storage.local.set({ [key]: data }, () => {
        console.log(`${key} saved to local storage`);
    });
}

