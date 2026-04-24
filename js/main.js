let isDragging = false;

function startDragging(e, container) {
    isDragging = true;
    container.classList.remove('locked');
}

function stopDragging(e, container) {
    isDragging = false;
}

function toggleLock(container) {
    container.classList.toggle('locked');
}

function doMove(e, container) {
    const isLocked = container.classList.contains('locked');
    if (isDragging || !isLocked) {
        updateSlider(e, container);
    }
}

function updateSlider(e, container) {
    const rect = container.getBoundingClientRect();
    let xPos = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    const x = xPos - rect.left;
    let position = (x / rect.width) * 100;

    if (position < 0) position = 0;
    if (position > 100) position = 100;

    const afterMedia = container.querySelector('.video-after');
    const divider = container.querySelector('.slider-divider');

    if (afterMedia && divider) {
        afterMedia.style.clipPath = `inset(0 0 0 ${position}%)`;
        divider.style.left = `${position}%`;
    }
}

// SINCRONIZAÇÃO DE VÍDEOS (Para não dar delay entre antes/depois)
const containers = document.querySelectorAll('.video-compare-container');
containers.forEach(container => {
    const vBefore = container.querySelector('.video-before');
    const vAfter = container.querySelector('.video-after');

    if (vBefore && vAfter) {
        // Quando um vídeo carregar, tenta dar play no outro
        vBefore.onplay = () => vAfter.play();
        vBefore.onpause = () => vAfter.pause();

        // Checagem de sincronia a cada 1 segundo
        setInterval(() => {
            if (Math.abs(vBefore.currentTime - vAfter.currentTime) > 0.1) {
                vAfter.currentTime = vBefore.currentTime;
            }
        }, 1000);
    }
});