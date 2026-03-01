document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos
    const navbar = document.getElementById('navbar');
    const heroLogo = document.getElementById('hero-logo');
    const philosophyVideo = document.getElementById('philosophy-video');

    // 2. Lógica de Scroll (Navbar, Logo y Paralaje)
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // --- Navbar (Blanco a Negro) ---
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // --- Logo Hero (Desvanecimiento + Blur) ---
        if (heroLogo) {
            const progress = Math.min(scrollY / 500, 1);
            const opacity = 1 - progress;
            const scale = 1 + (progress * 0.1);
            const blur = progress * 10;

            heroLogo.style.opacity = opacity;
            heroLogo.style.filter = `blur(${blur}px)`;
            heroLogo.style.transform = `scale(${scale})`;
            heroLogo.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
        }

        // --- Efecto Paralaje para el Video de Filosofía ---
        if (philosophyVideo) {
            const section = document.querySelector('.about-video-section');
            const rect = section.getBoundingClientRect();
            
            // Si la sección está visible, movemos el video un poco más lento
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.2; // Ajusta la intensidad del paralaje
                const yPos = -(rect.top * speed);
                philosophyVideo.style.transform = `translateY(${yPos}px)`;
            }
        }
    });

    // 3. Sistema de Aparición (Fade-in)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
});