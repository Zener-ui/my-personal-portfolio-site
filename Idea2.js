// Floating particles
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 18 : 34;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 18 + 18}s`;
    particle.style.animationDelay = `-${Math.random() * 24}s`;
    particle.style.opacity = Math.random() * 0.35 + 0.18;

    container.appendChild(particle);
  }
}

// Reveal on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach(item => observer.observe(item));
}

// Mobile nav
function mobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}

window.addEventListener('load', () => {
  createParticles();
  revealOnScroll();
  mobileMenu();
});

// Custom cursor
function customCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  const spotlight = document.querySelector('.spotlight');

  if (!dot || !outline || !spotlight) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    spotlight.style.left = `${mouseX}px`;
    spotlight.style.top = `${mouseY}px`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  }

  animateOutline();

  const hoverTargets = document.querySelectorAll('a, button, .project-card, .featured-project, .process-card');

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '58px';
      outline.style.height = '58px';
      outline.style.borderColor = 'rgba(0, 245, 200, 0.65)';
    });

    el.addEventListener('mouseleave', () => {
      outline.style.width = '38px';
      outline.style.height = '38px';
      outline.style.borderColor = 'rgba(0, 245, 200, 0.35)';
    });
  });
}

// Active nav on scroll
function activeNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  function activateLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activateLink);
  activateLink();
}

// Magnetic buttons
function magneticButtons() {
  const magnetics = document.querySelectorAll('.btn, .social-links a, .icon-btn');

  magnetics.forEach(item => {
    item.classList.add('magnetic');

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });
}

// Soft tilt for hero card
function heroTilt() {
  const card = document.querySelector('.hero-card');
  if (!card || window.innerWidth < 980) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -6;

    card.style.transform = `
      perspective(1200px)
      rotateY(${rotateY}deg)
      rotateX(${rotateX}deg)
      translateY(-4px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateY(-6deg) rotateX(2deg)';
  });
}

window.addEventListener('load', () => {
  customCursor();
  activeNavOnScroll();
  magneticButtons();
  heroTilt();
});