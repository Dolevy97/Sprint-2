'use strict';

document.querySelector('.btn-share').addEventListener('click', async () => {
    cleanFrame();

    gElCanvas.toBlob(async (blob) => {
        const file = new File([blob], 'canvas-image.jpg', { type: 'image/jpeg' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: 'My Meme',
                    text: `This was made using Dolev's Meme Generator!`,
                    files: [file]
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API or file sharing is not supported in your browser.');
        }
    }, 'image/jpeg');
});
