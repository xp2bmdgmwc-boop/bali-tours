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

  // 2. Simple form handling
  const form = document.getElementById('call-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Запрос отправлен';
      btn.style.background = 'var(--ink)';
      
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'var(--accent)';
      }, 3000);
    });
  }

  // 3. GSAP & ScrollTrigger Motion Engineering
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation
    const heroTitle = document.querySelector('.t-display');
    const heroEyebrow = document.querySelector('.t-eyebrow');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroActions = document.querySelector('.hero-actions');
    const heroSpecs = document.querySelector('.hero-specs');
    const heroImg = document.querySelector('.hero-image-wrapper img');

    if (heroImg) {
      gsap.fromTo(heroImg, 
        { scale: 1.15, filter: 'brightness(0.7)' },
        { scale: 1.0, filter: 'brightness(1)', duration: 1.8, ease: 'power2.out' }
      );
    }

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    if (heroEyebrow) heroTl.fromTo(heroEyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.2 });
    if (heroTitle) heroTl.fromTo(heroTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '-=0.6');
    if (heroTagline) heroTl.fromTo(heroTagline, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.6');
    if (heroActions) heroTl.fromTo(heroActions, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6');
    if (heroSpecs) heroTl.fromTo(heroSpecs, { opacity: 0 }, { opacity: 1 }, '-=0.4');

    // Hero Image Scroll Parallax
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.section-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Story Blocks (Timeline & Places of Power) Reveal & Scale-in
    const storyBlocks = document.querySelectorAll('.story-block');
    storyBlocks.forEach((block) => {
      const textCol = block.querySelector('div:first-child');
      const imgGroup = block.querySelectorAll('.story-img-group img');

      gsap.fromTo(textCol,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      if (imgGroup.length > 0) {
        gsap.fromTo(imgGroup,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Photo Gallery Grid Stagger Reveal
    const photoCards = document.querySelectorAll('.photo-card');
    if (photoCards.length > 0) {
      gsap.fromTo(photoCards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.photo-gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Asymmetric Grid / Author Section Reveal
    const gridAsym = document.querySelectorAll('.grid-asym');
    gridAsym.forEach((grid) => {
      const children = grid.children;
      if (children.length >= 2) {
        gsap.fromTo(children[0],
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        gsap.fromTo(children[1],
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Manifesto Text Scrub/Fade-in
    const manifestoQuote = document.querySelector('.manifesto-section .t-quote');
    if (manifestoQuote) {
      gsap.fromTo(manifestoQuote,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.manifesto-section',
            start: 'top 85%',
            end: 'top 40%',
            scrub: true
          }
        }
      );
    }
  }
});
