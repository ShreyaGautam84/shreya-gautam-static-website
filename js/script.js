/* ================================================
   Shreya Gautam — Portfolio  |  script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing Effect ---------- */
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Student Developer.',
    'Web Designer.',
    'Creative Coder.',
    'UI/UX Enthusiast.',
    'Lifelong Learner.'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      typedEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, pauseStart);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      typedEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  type();

  /* ---------- Navbar Scroll ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  function onScroll() {
    // Glass background
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Menu ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ---------- Cursor Glow ---------- */
  const glow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function moveGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(moveGlow);
  })();

  /* ---------- Reveal on Scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Skill Bars Animate ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------- Hero Particles ---------- */
  const particlesContainer = document.getElementById('hero-particles');

  function createParticle() {
    const particle = document.createElement('span');
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:rgba(139,92,246,${Math.random() * .25 + .08});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:floatParticle ${Math.random() * 6 + 6}s ease-in-out infinite;
      pointer-events:none;
    `;
    particlesContainer.appendChild(particle);
  }

  for (let i = 0; i < 30; i++) createParticle();

  // Inject keyframes for particles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes floatParticle {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: .6; }
      25%      { transform: translate(${rand()}px, ${rand()}px) scale(1.3); opacity: 1; }
      50%      { transform: translate(${rand()}px, ${rand()}px) scale(.8); opacity: .4; }
      75%      { transform: translate(${rand()}px, ${rand()}px) scale(1.1); opacity: .9; }
    }
  `;
  document.head.appendChild(styleSheet);

  function rand() { return Math.floor(Math.random() * 80 - 40); }

  /* ---------- Contact Form ---------- */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation visual
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.borderColor = '#ef4444';
        valid = false;
      } else {
        inp.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate send
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      submitBtn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #2dd4bf, #14b8a6)';
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
