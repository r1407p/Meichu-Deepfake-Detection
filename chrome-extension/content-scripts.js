console.log("Content script loaded");

// set the minimum width and height for images to be checked
const minWidth = 200; 
const minHeight = 200; 

// Function to check all existing images on the page
function checkAllMedia() {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video source[type="video/mp4"]');
    console.log(`Found ${images.length} images and ${videos.length} videos on the page.`);

    // Collect all image URLs in a list that meet the size criteria
    const imageElements = Array.from(images).filter(img => img.naturalWidth > minWidth && img.naturalHeight > minHeight);
    const imageUrls = imageElements.map(img => img.src);
    console.log(`Checking image URLs: ${imageUrls}`);

    // Collect all video URLs
    const videoUrls = Array.from(videos).map(video => video.src);
    console.log(`Checking video URLs: ${videoUrls}`);

    // Send the list of image and video URLs to the API
    checkMediaWithAPI(imageUrls, videoUrls, imageElements);
}

// Function to observe changes in the DOM
function observeNewMedia() {
    const observer = new MutationObserver(mutations => {
        let newImageUrls = [];
        let newImageElements = [];
        let newVideoUrls = [];

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    node.addEventListener('load', () => {
                        if (node.naturalWidth > minWidth && node.naturalHeight > minHeight) {
                            newImageUrls.push(node.src);
                            newImageElements.push(node);
                            console.log(`New image found: ${node.src}`);
                            checkMediaWithAPI(newImageUrls, [], newImageElements);
                        }
                    });
                }
                if (node.tagName === 'VIDEO') {
                    const source = node.querySelector('source[type="video/mp4"]');
                    if (source && source.src) {
                        newVideoUrls.push(source.src);
                        console.log(`New video found: ${source.src}`);
                        checkMediaWithAPI([], newVideoUrls, []);
                    }
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the initial image check and start observing for new images
checkAllMedia();
observeNewMedia();

// Function to check a list of images with the API and update the image elements
async function checkMediaWithAPI(imageUrls, videoUrls, imgElements) {
    try {
        const response = await fetch(`https://{ip}:7000/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrls: imageUrls, videoUrls: videoUrls }),
        });

        const result = await response.json();
        console.log('Media analysis result:', result);

        // Loop through the response and update image elements
        imgElements.forEach((imgElement, index) => {
            console.log(result.data[index]);
            console.log(result.data[index].isAIgenerated);
            if (result.data[index] && result.data[index].isAIgenerated) {
                imgElement.style.border = '2px solid red';
                imgElement.title = 'This image is AI-generated';
                
            }
        });

        // Send the analysis data to the background script
        //  chrome.runtime.sendMessage({ type: 'imageAnalysisData', data: result });
         chrome.storage.local.set({ analysisData: result }, () => {
                console.log('Analysis data saved to local storage from content script:', result);
            });
         console.log('Sent analysis data to popup:', result);
    } catch (error) {
        console.error('Error checking images:', error);
    }
}
