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