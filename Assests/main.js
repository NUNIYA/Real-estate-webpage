
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
           
            if (window.innerWidth <= 991) {
                navbarCollapse.classList.remove('show');
                navbarCollapse.classList.remove('text-center'); 
            }
        });
    });

   
    navbarToggler.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
            navbarCollapse.classList.toggle('text-center');
        }
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
});