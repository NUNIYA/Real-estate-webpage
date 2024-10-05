// This script manages the navigation behavior, smooth scrolling, slide show, animations on sections, and FAQ toggling on a webpage.

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
                correspondingNavLink.classList.add('active');
            }
        });
    }

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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
            // Close the mobile menu when a nav item is clicked
            if (window.innerWidth <= 991) {
                navbarCollapse.classList.remove('show');
                navbarCollapse.classList.remove('text-center'); // Remove centering class
            }
        });
    });

    // Center align nav items on mobile when menu is open
    navbarToggler.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
            navbarCollapse.classList.toggle('text-center');
        }
    });

    // Start the slide show
    setInterval(changeSlide, 4000); // Change slide every 4 seconds

    // Animation for various sections
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

    // Observing elements for animations
    document.querySelectorAll('.slide-in-left, .slide-in-right, .feature-item, .service-content, .service-image, .product-item, .faq-item, .fade-in, .partner-form').forEach(elem => {
        elemObserver.observe(elem);
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });
});