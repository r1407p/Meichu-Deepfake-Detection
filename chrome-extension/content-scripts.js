console.log("Content script loaded");

// Function to check all existing images on the page
function checkAllImages() {
    const images = document.querySelectorAll('img');
    console.log(`Found ${images.length} images on the page.`);
    images.forEach(img => {
        const imageUrl = img.src;
        console.log(`Checking image URL: ${imageUrl}`);
        checkImageWithAPI(imageUrl, img);
    });
}

// Function to observe changes in the DOM
function observeNewImages() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    const imageUrl = node.src;
                    console.log(`New image found: ${imageUrl}`);
                    checkImageWithAPI(imageUrl, node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the initial image check and start observing for new images
checkAllImages();
observeNewImages();

async function checkImageWithAPI(imageUrl, imgElement) {
    try {
        const response = await fetch(`https://{ip}:7000/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: imageUrl }),
        });

        const result = await response.json();

        if (result.isAIgenerated) {
            imgElement.style.border = '2px solid red';
            imgElement.title = 'This image is AI-generated';
        }
    } catch (error) {
        console.error('Error checking image:', error);
    }
}