console.log("Content script loaded");

// set the minimum width and height for images to be checked
const minWidth = 300; 
const minHeight = 300; 

// Function to check all existing images on the page
function checkAllImages() {
    const images = document.querySelectorAll('img');
    console.log(`Found ${images.length} images on the page.`);

    // Collect all image URLs in a list that meet the size criteria
    const imageElements = Array.from(images).filter(img => img.naturalWidth > minWidth && img.naturalHeight > minHeight);
    const imageUrls = imageElements.map(img => img.src);
    console.log(`Checking image URLs: ${imageUrls}`);

    // Send the list of image URLs to the API
    checkImagesWithAPI(imageUrls, imageElements);
}

// Function to observe changes in the DOM
function observeNewImages() {
    const observer = new MutationObserver(mutations => {
        let newImageUrls = [];
        let newImageElements = [];

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    if (node.naturalWidth > minWidth && node.naturalHeight > minHeight) {
                        newImageUrls.push(node.src);
                        newImageElements.push(node);
                        console.log(`New image found: ${node.src}`);
                    }
                }
            });
        });

        // Send the new list of image URLs to the API if there are any new images
        if (newImageUrls.length > 0) {
            checkImagesWithAPI(newImageUrls, newImageElements);
            
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the initial image check and start observing for new images
checkAllImages();
observeNewImages();

// Function to check a list of images with the API and update the image elements
async function checkImagesWithAPI(imageUrls, imgElements) {
    try {
        const response = await fetch(`https://{ip}:7000/check`, {
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
            console.log(result.data[index]);
            console.log(result.data[index].isAIgenerated);
            if (result.data[index] && result.data[index].isAIgenerated) {
                imgElement.style.border = '2px solid red';
                imgElement.title = 'This image is AI-generated';
                
            }
        });

         // Send the analysis data to the background script
         chrome.runtime.sendMessage({ type: 'imageAnalysisData', data: result });
         chrome.storage.local.set({ imageAnalysisData: result }, () => {
                console.log('Analysis data saved to local storage from content script:', result);
            });
         console.log('Sent analysis data to popup:', result);
    } catch (error) {
        console.error('Error checking images:', error);
    }
}
