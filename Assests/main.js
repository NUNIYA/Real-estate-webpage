document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

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
      });
  });
});





document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
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
        });
    });

    // Start the slide show
    setInterval(changeSlide, 4000); // Change slide every 5 seconds
});
document.addEventListener('DOMContentLoaded', function() {
  

    // New animations for About section
    const slideLeftElems = document.querySelectorAll('.slide-in-left');
    const slideRightElems = document.querySelectorAll('.slide-in-right');
    const aboutTitle = document.querySelector('#about h2');
    const featureItems = document.querySelectorAll('.feature-item');

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

    slideLeftElems.forEach(elem => elemObserver.observe(elem));
    slideRightElems.forEach(elem => elemObserver.observe(elem));

    // Animate the about title underline
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutTitle.classList.add('appear');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    titleObserver.observe(aboutTitle);

    // Animate feature list items
    featureItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.classList.add('appear');
                    }, index * 200); // Stagger the animation
                    itemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        itemObserver.observe(item);
    });

    // Continuous image shine effect
    const aboutImageContainer = document.querySelector('.about-image-container');
    setInterval(() => {
        aboutImageContainer.classList.remove('shine');
        void aboutImageContainer.offsetWidth; // Trigger reflow
        aboutImageContainer.classList.add('shine');
    }, 3000); // Repeat every 3 seconds
});









document.addEventListener('DOMContentLoaded', function() {
    const servicesTitle = document.querySelector('#services h2');
    const serviceElements = document.querySelectorAll('.service-content, .service-image');

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
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate the services title underline
    elemObserver.observe(servicesTitle);

    // Animate service elements
    serviceElements.forEach(elem => elemObserver.observe(elem));
});









document.addEventListener('DOMContentLoaded', function() {
    const productsTitle = document.querySelector('#products h2');
    const productItems = document.querySelectorAll('.product-item');
    const productInfo = document.querySelector('.product-info');

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
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate the products title underline
    elemObserver.observe(productsTitle);

    // Animate product items
    productItems.forEach(item => elemObserver.observe(item));

    // Animate product info section
    elemObserver.observe(productInfo);
});




document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTitle = document.querySelector('#faq h2');
    
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

    // Fade-in animation for FAQ items
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                faqObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    faqItems.forEach(item => faqObserver.observe(item));

    // Animate the FAQ title underline
    faqObserver.observe(faqTitle);
});







document.addEventListener('DOMContentLoaded', function () {
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.querySelector('.partner-form');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // stop observing once the animation is triggered
            }
        });
    }, { threshold: 0.1 }); // 10% visibility triggers the animation

    observer.observe(formContainer);
});
