document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function setActiveNavLink() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', function() {
        updateNavbarBackground();
        setActiveNavLink();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close navbar collapse on link click if on mobile
            if (window.innerWidth <= 991) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarToggler.classList.add('collapsed');
            }
        });
    });
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            // Close the mobile menu when a nav item is clicked
            if (window.innerWidth <= 991) {
                navbarCollapse.classList.remove('show');
                navbarCollapse.classList.remove('text-center'); // Remove centering class
            }
        });
    });

    setInterval(changeSlide, 4000);

    const animateElems = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    };

    const elemObserver = new IntersectionObserver(animateElems, {
        threshold: 0.32,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.slide-in-left, .slide-in-right, .feature-item, .service-content, .service-image, .product-item, .faq-item, .fade-in, .partner-form, .product-info').forEach(elem => {
        elemObserver.observe(elem);
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Logo responsiveness
    window.addEventListener("scroll", function() {
        const logo = document.querySelector('.logo-image');
        if (window.scrollY > 0) {
            logo.classList.add('no-glow');
        } else {
            logo.classList.remove('no-glow');
        }
    });

    // Initial navbar background update
    updateNavbarBackground();
});