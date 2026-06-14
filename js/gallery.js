document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const totalItems = items.length;

    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery-dot');

    function updateGallery() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateGallery();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGallery();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGallery();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    updateGallery();
});