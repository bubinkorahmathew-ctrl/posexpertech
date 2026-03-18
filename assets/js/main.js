document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const icon = menuBtn ? menuBtn.querySelector('i') : null;
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Active Link State
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a.nav-item');
  navItems.forEach(item => {
    if(item.getAttribute('href') !== '#' && currentPath.includes(item.getAttribute('href'))) {
      item.classList.add('active');
    } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
        if (item.getAttribute('href') === 'index.html') item.classList.add('active');
    }
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        
        // Handle image reveals
        if (entry.target.classList.contains('image-reveal')) {
          entry.target.classList.add('revealed');
        }
        
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });

  // Language Toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let currentPath = window.location.pathname;
      let filename = currentPath.split('/').pop() || 'index.html';
      
      if (filename.includes('-ar.html')) {
        // Switch to English
        window.location.href = filename.replace('-ar.html', '.html');
      } else {
        // Switch to Arabic
        window.location.href = filename.replace('.html', '-ar.html');
      }
    });
  }

  // Sticky Navbar background change on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(3, 3, 3, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
      header.style.background = 'rgba(3, 3, 3, 0.8)';
      header.style.boxShadow = 'none';
    }
  });

  // Counters Animation (trigger when in view)
  const counters = document.querySelectorAll('.counter-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target + '+';
          }
        };
        updateCounter();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
});
