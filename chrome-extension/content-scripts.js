console.log("Content script loaded");

// Set the minimum width and height for images to be checked
const minWidth = 200;
const minHeight = 200;

// Function to check all existing media on the page
function checkAllMedia() {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video source[type="video/mp4"]');
    const textNodes = getTextNodes();

    console.log(`Found ${images.length} images, ${videos.length} videos, and ${textNodes.length} text nodes on the page.`);

    // Collect image URLs that meet the size criteria
    const imageElements = Array.from(images).filter(img => img.naturalWidth > minWidth && img.naturalHeight > minHeight);
    const imageUrls = imageElements.map(img => img.src);
    console.log(`Checking image URLs: ${imageUrls}`);

    // Collect all video URLs
    const videoUrls = Array.from(videos).map(video => video.src);
    console.log(`Checking video URLs: ${videoUrls}`);

    // Collect all text content
    const textContents = textNodes.map(node => node.textContent);
    console.log(`Checking text content: ${textContents}`);

    // Send a single API request for each category
    checkImagesWithAPI(imageUrls, imageElements);
    checkVideosWithAPI(videoUrls);
    checkTextWithAPI(textContents);
}

// Function to observe changes in the DOM and check newly added media
function observeNewMedia() {
    const observer = new MutationObserver(mutations => {
        let newImageUrls = [];
        let newImageElements = [];
        let newVideoUrls = [];
        let newTextContents = [];

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    node.addEventListener('load', () => {
                        if (node.naturalWidth > minWidth && node.naturalHeight > minHeight) {
                            newImageUrls.push(node.src);
                            newImageElements.push(node);
                            console.log(`New image found: ${node.src}`);
                        }
                    });
                }
                if (node.tagName === 'VIDEO') {
                    const source = node.querySelector('source[type="video/mp4"]');
                    if (source && source.src) {
                        newVideoUrls.push(source.src);
                        console.log(`New video found: ${source.src}`);
                    }
                }
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    newTextContents.push(node.textContent.trim());
                    console.log(`New text found: ${node.textContent.trim()}`);
                }
            });
        });

        // Send a single API request for each category if there are new items
        if (newImageUrls.length > 0) checkImagesWithAPI(newImageUrls, newImageElements);
        if (newVideoUrls.length > 0) checkVideosWithAPI(newVideoUrls);
        // if (newTextContents.length > 0) checkTextWithAPI(newTextContents);
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the initial media check and start observing for new media
checkAllMedia();
observeNewMedia();

// Function to check images with the API and update image elements
async function checkImagesWithAPI(imageUrls, imgElements) {
    try {
        const response = await fetch(`https://103.156.185.2:7000/check_images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrls: imageUrls }),
        });

        const result = await response.json();
        console.log('Image analysis result:', result);

        // Loop through the response and update image elements
        imgElements.forEach((imgElement, index) => {
            if (result.image_ai[index] && result.image_ai[index].isAIgenerated) {
                imgElement.style.border = '2px solid red';
                imgElement.title = 'This image is AI-generated';
            }
        });

        chrome.storage.local.set({ imageAnalysisData: result }, () => {
            console.log('Image analysis data saved to local storage from content script:', result);
        });

    } catch (error) {
        console.error('Error checking images:', error);
    }
}

// Function to check videos with the API
async function checkVideosWithAPI(videoUrls) {
    try {
        const response = await fetch(`https://103.156.185.2:7000/check_audios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audioUrls: videoUrls }),
        });

        const result = await response.json();
        console.log('Video analysis result:', result);

        chrome.storage.local.set({ videoAnalysisData: result }, () => {
            console.log('Video analysis data saved to local storage from content script:', result);
        });

    } catch (error) {
        console.error('Error checking videos:', error);
    }
}

// Function to check text with the API
async function checkTextWithAPI(textContents) {
    try {
        console.log('Checking text:', textContents);
        const response = await fetch(`https://103.156.185.2:7000/summary_text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texts: textContents }),
        });

        const result = await response.json();
        console.log('Text analysis result:', result);

        chrome.storage.local.set({ textAnalysisData: result }, () => {
            console.log('Text analysis data saved to local storage from content script:', result);
        });

    } catch (error) {
        console.error('Error checking text:', error);
    }
}

// Helper function to get all visible text nodes on the page
function getTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
            return /\S/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    return textNodes;
}
