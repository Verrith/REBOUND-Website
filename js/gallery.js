document.addEventListener('DOMContentLoaded', () => {
    const shieldData = [
        {
            name: 'Tower',
            image: 'images/ShieldBase_Tower.png',
            alt: 'Tower shield',
            description: 'A wall-sized shield with a wider parry window, built for deliberate defense.',
            stats: [
                ['Parry Window', '0,20s', 'neutral'],
                ['Wall Slide Length', '-0,50', 'bad'],
                ['Slide Control', '-15,00', 'bad'],
                ['Air Control', '-15,00', 'bad']
            ],
            tilt: '-2deg'
        },
        {
            name: 'Buckler',
            image: 'images/ShieldBase_Buckler.png',
            alt: 'Buckler shield',
            description: 'Small, sharp, and made for aggressive movement with a tighter parry.',
            stats: [
                ['Max Health', '-10', 'bad'],
                ['Parry Window', '-0,10s', 'bad'],
                ['Parry Force', '+5,00', 'good'],
                ['Parry Cone', '-10,00', 'bad'],
                ['Move Speed', '+5,00', 'good'],
                ['Jump Force', '+2,00', 'good'],
                ['Wall Slide Speed', '+1,00', 'good'],
                ['Wall Slide Length', '0,50', 'neutral'],
                ['Slide Jump Force', '+2,00', 'good'],
                ['Slide Control', '+20,00', 'good'],
                ['Air Control', '+20,00', 'good']
            ],
            tilt: '5deg'
        },
        {
            name: 'Holy',
            image: 'images/ShieldBase_Holy.png',
            alt: 'Holy shield',
            description: 'A risky relic that trades health and cone size for force and sustain.',
            stats: [
                ['Max Health', '-10', 'bad'],
                ['Parry Window', '0,05s', 'neutral'],
                ['Parry Force', '+3,00', 'good'],
                ['Parry Cone', '-3,00', 'bad'],
                ['Heal on Kill', '+5,00', 'good']
            ],
            tilt: '-4deg'
        },
        {
            name: 'Heater',
            image: 'images/ShieldBase_Heater.png',
            alt: 'Heater shield',
            description: 'A clean all-rounder with health, force, and a little extra movement.',
            stats: [
                ['Max Health', '+10', 'good'],
                ['Parry Force', '+3,00', 'good'],
                ['Move Speed', '+2,00', 'good']
            ],
            tilt: '2deg'
        },
        {
            name: 'Barbarian',
            image: 'images/ShieldBase_Barbarian.png',
            alt: 'Barbarian shield',
            description: 'Huge health and parry force, with heavy movement penalties.',
            stats: [
                ['Max Health', '+100', 'good'],
                ['Parry Force', '+3,00', 'good'],
                ['Move Speed', '-5,00', 'bad'],
                ['Slide Control', '-45,00', 'bad'],
                ['Air Control', '-45,00', 'bad']
            ],
            tilt: '4deg'
        }
    ];

    const forge = document.querySelector('.shield-forge');
    const shieldPreview = document.querySelector('.shield-preview');
    const shieldName = document.querySelector('.shield-name');
    const shieldDescription = document.querySelector('.shield-description');
    const shieldChoices = document.querySelectorAll('.shield-choice');
    const shieldStats = document.querySelector('.shield-stats');
    let strikeTimer;
    let bounceAnimation;
    let currentShieldIndex = 0;

    function getShieldText(index) {
        const shield = shieldData[index];

        if (window.reboundTranslations) {
            return window.reboundTranslations.getShieldText(index, shield);
        }

        return shield;
    }

    function strikeForge() {
        if (!forge) return;
        forge.classList.remove('is-striking');
        window.requestAnimationFrame(() => {
            forge.classList.add('is-striking');
            window.clearTimeout(strikeTimer);
            strikeTimer = window.setTimeout(() => forge.classList.remove('is-striking'), 900);
        });
    }

    function selectShield(index) {
        const shield = shieldData[index];
        const shieldText = getShieldText(index);
        if (!shield || !shieldPreview || !shieldName || !shieldDescription) return;

        shieldPreview.src = shield.image;
        shieldPreview.alt = shieldText.alt || shield.alt;
        shieldPreview.style.setProperty('--shield-tilt', shield.tilt);
        shieldName.textContent = shieldText.name;
        shieldDescription.textContent = shieldText.description;
        currentShieldIndex = index;

        if (shieldStats) {
            shieldStats.innerHTML = '';
            shieldText.stats.forEach(([label, value, tone]) => {
                const item = document.createElement('li');
                const labelElement = document.createElement('span');
                const valueElement = document.createElement('strong');

                labelElement.textContent = `${label}:`;
                valueElement.textContent = value;
                valueElement.className = `stat-${tone}`;
                item.append(labelElement, valueElement);
                shieldStats.appendChild(item);
            });
        }

        shieldChoices.forEach(choice => choice.classList.remove('active'));
        if (shieldChoices[index]) {
            shieldChoices[index].classList.add('active');
        }

        strikeForge();
    }

    function bounceShield() {
        if (!shieldPreview || !forge) return;

        const stage = shieldPreview.closest('.shield-stage');
        if (!stage) return;

        if (bounceAnimation) {
            bounceAnimation.cancel();
        }

        const stageRect = stage.getBoundingClientRect();
        const shieldRect = shieldPreview.getBoundingClientRect();
        const limitX = Math.max(24, (stageRect.width - shieldRect.width) / 2 - 18);
        const limitY = Math.max(24, (stageRect.height - shieldRect.height) / 2 - 18);
        const tilt = shieldPreview.style.getPropertyValue('--shield-tilt') || '-2deg';

        shieldPreview.classList.add('is-bouncing');
        strikeForge();

        bounceAnimation = shieldPreview.animate([
            { transform: `translate(0, 0) rotate(${tilt}) scale(1)` },
            { transform: `translate(${limitX * 0.88}px, ${-limitY * 0.74}px) rotate(18deg) scale(1.03)`, offset: 0.16 },
            { transform: `translate(${-limitX * 0.72}px, ${-limitY * 0.92}px) rotate(-24deg) scale(0.98)`, offset: 0.34 },
            { transform: `translate(${limitX * 0.96}px, ${limitY * 0.68}px) rotate(26deg) scale(1.02)`, offset: 0.52 },
            { transform: `translate(${-limitX * 0.9}px, ${limitY * 0.82}px) rotate(-18deg) scale(1)` , offset: 0.7 },
            { transform: `translate(${limitX * 0.28}px, ${-limitY * 0.22}px) rotate(10deg) scale(1.01)`, offset: 0.86 },
            { transform: `translate(0, 0) rotate(${tilt}) scale(1)` }
        ], {
            duration: 1450,
            easing: 'cubic-bezier(0.2, 0.8, 0.22, 1)',
            fill: 'both'
        });

        bounceAnimation.addEventListener('finish', () => {
            shieldPreview.classList.remove('is-bouncing');
            bounceAnimation = null;
        }, { once: true });

        bounceAnimation.addEventListener('cancel', () => {
            shieldPreview.classList.remove('is-bouncing');
        }, { once: true });
    }

    shieldChoices.forEach((choice) => {
        choice.addEventListener('click', () => selectShield(Number(choice.dataset.shield)));
    });

    if (shieldPreview) {
        shieldPreview.addEventListener('click', bounceShield);
    }

    window.addEventListener('rebound:languagechange', () => {
        selectShield(currentShieldIndex);
    });

    if (forge) {
        selectShield(0);
        window.setTimeout(strikeForge, 400);
    }

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

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const swipeThreshold = 50;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
            return;
        }

        if (deltaX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    updateGallery();
});
