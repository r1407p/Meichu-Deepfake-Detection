
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'imageAnalysisData') {
        console.log('Received analysis data in background:', message.data);

        // 可選: 將數據存儲在 chrome.storage.local 中
        chrome.storage.local.set({ analysisData: message.data }, () => {
            console.log('Analysis data saved to local storage');
        });
        
        sendResponse({ status: 'success' });
    }

});
