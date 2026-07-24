document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. Form handling
  const form = document.getElementById('call-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Запрос отправлен';
      btn.style.background = '#0F172A';
      
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#D97706';
      }, 3000);
    });
  }

  // 3. GSAP & ScrollTrigger Motion Engineering (Official GSAP Best Practices)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation Timeline
    const heroTitle = document.querySelector('.t-display');
    const heroEyebrow = document.querySelector('.t-eyebrow');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroActions = document.querySelector('.hero-actions');
    const heroSpecs = document.querySelector('.hero-specs');
    const heroImg = document.querySelector('.hero-image-wrapper img');

    if (heroImg) {
      gsap.fromTo(heroImg, 
        { scale: 1.15, filter: 'brightness(0.3)' },
        { scale: 1.05, filter: 'brightness(0.45)', duration: 2, ease: 'power2.out' }
      );
    }

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
    if (heroEyebrow) heroTl.fromTo(heroEyebrow, { opacity: 0, y: 25 }, { opacity: 1, y: 0, delay: 0.1 });
    if (heroTitle) heroTl.fromTo(heroTitle, { opacity: 0, y: 45 }, { opacity: 1, y: 0 }, '-=0.8');
    if (heroTagline) heroTl.fromTo(heroTagline, { opacity: 0, y: 35 }, { opacity: 1, y: 0 }, '-=0.8');
    if (heroActions) heroTl.fromTo(heroActions, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, '-=0.8');
    if (heroSpecs) heroTl.fromTo(heroSpecs, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, '-=0.6');

    // Hero Image Scrub Parallax
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-image-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Story Blocks Reveal & Card Scrub Animations
    const storyBlocks = document.querySelectorAll('.story-block');
    storyBlocks.forEach((block) => {
      const textCol = block.children[0];
      const imgGroup = block.querySelectorAll('.story-img-group img');

      gsap.fromTo(block,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      if (imgGroup.length > 0) {
        gsap.fromTo(imgGroup,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 78%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Photo Gallery Stagger Reveal
    const photoCards = document.querySelectorAll('.photo-card');
    if (photoCards.length > 0) {
      gsap.fromTo(photoCards,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.photo-gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Manifesto Text Scrub Effect
    const manifestoQuote = document.querySelector('.manifesto-section .t-quote');
    if (manifestoQuote) {
      gsap.fromTo(manifestoQuote,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.manifesto-section',
            start: 'top 85%',
            end: 'top 45%',
            scrub: true
          }
        }
      );
    }
  }
});
