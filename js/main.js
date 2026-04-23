let isDragging = false;

// Inicia o arraste (quando segura o clique)
function startDragging(e, container) {
    isDragging = true;
    // Se estava travado, destrava ao começar a arrastar
    container.classList.remove('locked');
}

// Para o arraste (quando solta o clique)
function stopDragging(e, container) {
    isDragging = false;
}

// Alterna o modo "Travado" (no clique rápido)
function toggleLock(container) {
    container.classList.toggle('locked');
}

// Função que executa o movimento visual
function doMove(e, container) {
    // Só move se estiver segurando o mouse OU se NÃO estiver travado
    const isLocked = container.classList.contains('locked');

    if (isDragging || !isLocked) {
        updateSlider(e, container);
    }
}

function updateSlider(e, container) {
    const rect = container.getBoundingClientRect();

    // Pega a posição X (suporte para Mouse e Touch)
    let xPos;
    if (e.type.includes('touch')) {
        xPos = e.touches[0].pageX;
    } else {
        xPos = e.pageX;
    }

    const x = xPos - rect.left;
    let position = (x / rect.width) * 100;

    // Limites de 0% a 100%
    if (position < 0) position = 0;
    if (position > 100) position = 100;

    const afterImg = container.querySelector('.video-after');
    const divider = container.querySelector('.slider-divider');

    if (afterImg && divider) {
        afterImg.style.clipPath = `inset(0 0 0 ${position}%)`;
        divider.style.left = `${position}%`;
    }
}

document.querySelector('.scroll-indicator').addEventListener('click', function(e) {
    e.preventDefault(); // Impede o pulo instantâneo
    
    const targetId = this.getAttribute('href'); // Pega o #portfolio
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth', // O segredo do deslize
            block: 'start'      // Alinha o topo da seção no topo da tela
        });
    }
});