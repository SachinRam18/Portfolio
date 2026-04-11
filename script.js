/* ===========================================
   SACHIN RAM ES — PORTFOLIO ENGINE
   Rich Animations · Smooth Interactions
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════
    // PAGE LOADER
    // ═══════════════════════════════════════════
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('loaded'), 400);
        });
        // Fallback: always remove loader after 2s
        setTimeout(() => loader.classList.add('loaded'), 2000);
    }

    // ═══════════════════════════════════════════
    // HERO LETTER ANIMATION
    // ═══════════════════════════════════════════
    function animateHeroLetters() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = '';

        // Split "SACHIN" and "RAM ES" parts
        const parts = text.split(/\s+/);
        parts.forEach((word, wi) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            [...word].forEach((char, ci) => {
                const span = document.createElement('span');
                span.className = 'hero-letter';
                span.textContent = char;
                span.style.animationDelay = `${(wi * word.length + ci) * 0.04 + 0.3}s`;
                if (wi > 0) {
                    // Style the second word differently
                    span.classList.add('text-transparent');
                    span.style.backgroundImage = 'linear-gradient(to right, #fff, #a8a8a8, #666)';
                    span.style.webkitBackgroundClip = 'text';
                    span.style.backgroundClip = 'text';
                    span.style.webkitTextFillColor = 'transparent';
                }
                wordSpan.appendChild(span);
            });

            heroTitle.appendChild(wordSpan);

            // Add space between words
            if (wi < parts.length - 1) {
                const space = document.createTextNode(' ');
                heroTitle.appendChild(space);
            }
        });
    }
    animateHeroLetters();

    // ═══════════════════════════════════════════
    // SCROLL-REVEAL SYSTEM
    // ═══════════════════════════════════════════
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealEls = document.querySelectorAll(revealSelectors);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    // ═══════════════════════════════════════════
    // ANIMATED SKILL PROGRESS BARS
    // ═══════════════════════════════════════════
    const progressBars = document.querySelectorAll('.proficiency-progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetWidth = target.getAttribute('data-width') || target.style.width;
                target.style.width = '0%';
                // Use rAF for smooth animation start
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        target.style.width = targetWidth;
                    });
                });
                progressObserver.unobserve(target);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        // Store target width and reset to 0
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // ═══════════════════════════════════════════
    // COUNTER ANIMATION FOR STATS
    // ═══════════════════════════════════════════
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 1500;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterEls = document.querySelectorAll('.counter-value');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));

    // ═══════════════════════════════════════════
    // PROFICIENCY TITLE ANIMATION
    // ═══════════════════════════════════════════
    const profTitle = document.querySelector('.proficiencies-title');
    if (profTitle) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });
        titleObserver.observe(profTitle);
    }

    // ═══════════════════════════════════════════
    // NAVIGATION — SCROLL SPY & EFFECTS
    // ═══════════════════════════════════════════
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id], header[id]');

    // Scroll spy
    function onScroll() {
        const scrollPos = window.scrollY + 180;

        // Nav background on scroll
        if (nav) {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('active', isActive);

                    if (isActive) {
                        link.classList.add('text-primary');
                        link.classList.remove('text-stone-400');
                        link.style.fontWeight = '800';
                    } else {
                        link.classList.remove('text-primary');
                        link.classList.add('text-stone-400');
                        link.style.fontWeight = '';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ═══════════════════════════════════════════
    // SMOOTH SCROLLING
    // ═══════════════════════════════════════════
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const offset = 90;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // ═══════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
            }
        });
    }

    // ═══════════════════════════════════════════
    // ID CARD — 3D TILT EFFECT
    // ═══════════════════════════════════════════
    const idCard = document.querySelector('.id-card');
    if (idCard) {
        const wrapper = idCard.closest('.id-card-wrapper') || idCard.parentElement;

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            idCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            idCard.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
        });
    }

    // ═══════════════════════════════════════════
    // PROFICIENCY CARDS — MOUSE GLOW FOLLOW
    // ═══════════════════════════════════════════
    const profCards = document.querySelectorAll('.proficiency-card');
    profCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.card-glow-effect');
            if (glow) {
                glow.style.setProperty('--mouse-x', `${x}%`);
                glow.style.setProperty('--mouse-y', `${y}%`);
            }
        });
    });

    // ═══════════════════════════════════════════
    // CURSOR FOLLOWER
    // ═══════════════════════════════════════════
    const cursor = document.querySelector('.cursor-follower');
    if (cursor && window.matchMedia('(hover: hover)').matches) {
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.classList.add('visible');
        });

        function updateCursor() {
            followerX += (cursorX - followerX) * 0.12;
            followerY += (cursorY - followerY) * 0.12;
            cursor.style.transform = `translate(${followerX - 12}px, ${followerY - 12}px)`;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .proficiency-card, .id-card, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });

        document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
    }

    // ═══════════════════════════════════════════
    // HERO PARTICLES
    // ═══════════════════════════════════════════
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.7 ? '227, 38, 54' : '255, 255, 255';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const count = Math.min(60, Math.floor(canvas.width * canvas.height / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(227, 38, 54, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            animId = requestAnimationFrame(animateParticles);
        }

        // Only animate when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateParticles();
                } else {
                    cancelAnimationFrame(animId);
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(canvas.parentElement);
    }

    // ═══════════════════════════════════════════
    // PARALLAX ON SCROLL (subtle)
    // ═══════════════════════════════════════════
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length > 0) {
        function updateParallax() {
            const scrollY = window.scrollY;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                const rect = el.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const viewCenter = window.innerHeight / 2;
                const offset = (centerY - viewCenter) * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        }
        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    // ═══════════════════════════════════════════
    // TYPING EFFECT FOR HERO SUBTITLE
    // ═══════════════════════════════════════════
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        const words = ['real-world impact.', 'scalable solutions.', 'intelligent systems.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 40;
        const pauseTime = 2000;

        function typeEffect() {
            const current = words[wordIndex];

            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === current.length) {
                nextDelay = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                nextDelay = 300;
            }

            setTimeout(typeEffect, nextDelay);
        }

        setTimeout(typeEffect, 1800);
    }

    // ═══════════════════════════════════════════
    // FORM INTERACTION
    // ═══════════════════════════════════════════
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = '✓ Message Sent!';
                btn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.background = '';
                    form.reset();
                }, 2500);
            }
        });
    }

});
