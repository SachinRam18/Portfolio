/* ═══════════════════════════════════════════════════════
   PORTFOLIO — Scroll-Driven Animation Engine
   ═══════════════════════════════════════════════════════ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsScrollTimeline = CSS.supports("animation-timeline: view()");

/* ── Scroll Progress Bar ──────────────────────────────── */
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.prepend(progressBar);

// JS fallback for scroll progress if no scroll-timeline support
if (!supportsScrollTimeline) {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ── Custom Cursor Glow ──────────────────────────────── */
if (!prefersReducedMotion && window.innerWidth > 760) {
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

/* ═══════════════════════════════════════════════════════
   JS SCROLL-DRIVEN FALLBACK
   For browsers without animation-timeline support,
   we use IntersectionObserver + scroll listeners
   ═══════════════════════════════════════════════════════ */

if (!supportsScrollTimeline) {
    /* ── Scroll-Triggered Reveals (Multi-Direction) ─── */
    const revealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .reveal-flip");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = prefersReducedMotion ? "0ms" : `${Math.min(index * 60, 400)}ms`;
        revealObserver.observe(item);
    });

    /* ── Staggered Grid Children ─────────────────────── */
    const staggerContainers = document.querySelectorAll(".stagger-children");
    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const children = entry.target.children;
                Array.from(children).forEach((child, i) => {
                    child.style.transitionDelay = `${i * 120}ms`;
                    child.classList.add("stagger-visible");
                });
                staggerObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.15 }
    );
    staggerContainers.forEach((el) => staggerObserver.observe(el));

    /* ── Smooth Section 3D Perspective on Scroll ────── */
    if (!prefersReducedMotion && window.innerWidth > 760) {
        const allSections = document.querySelectorAll("section");

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const ratio = entry.intersectionRatio;
                    const el = entry.target;
                    if (ratio > 0 && ratio < 1) {
                        const scale = 0.95 + ratio * 0.05;
                        const translateZ = (1 - ratio) * -30;
                        el.style.transform = `perspective(1200px) translateZ(${translateZ}px) scale(${scale})`;
                        el.style.opacity = 0.6 + ratio * 0.4;
                    } else if (ratio >= 1) {
                        el.style.transform = "perspective(1200px) translateZ(0) scale(1)";
                        el.style.opacity = "1";
                    }
                });
            },
            { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
        );

        allSections.forEach((sec) => sectionObserver.observe(sec));
    }

    /* ── Parallax Scroll Layers ──────────────────────── */
    if (!prefersReducedMotion) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;

            // Float cards parallax
            const floatCards = document.querySelectorAll(".float-card");
            floatCards.forEach((card, i) => {
                const speed = i % 2 === 0 ? 0.03 : -0.02;
                card.style.transform = `translateY(${scrollY * speed}px)`;
            });

            // Ambient orbs follow scroll
            const ambients = document.querySelectorAll(".ambient");
            ambients.forEach((orb, i) => {
                const speed = i === 0 ? 0.04 : -0.03;
                orb.style.transform = `translateY(${scrollY * speed}px) scale(${1 + scrollY * 0.0001})`;
            });
        }, { passive: true });
    }
}

/* ═══════════════════════════════════════════════════════
   SCROLL-DRIVEN ENHANCEMENTS (work in all browsers)
   These complement CSS scroll-driven animations
   ═══════════════════════════════════════════════════════ */

/* ── Scroll Velocity Tracker ─────────────────────────── */
if (!prefersReducedMotion) {
    let lastScroll = 0;
    let scrollVelocity = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {
        scrollVelocity = Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;

        if (!ticking) {
            requestAnimationFrame(() => {
                // Skew cards slightly based on scroll speed for a dynamic feel
                const skewAmount = Math.min(scrollVelocity * 0.04, 3);
                const direction = window.scrollY > lastScroll ? 1 : -1;

                document.querySelectorAll(".surface-card, .showcase-card, .experience-card").forEach(card => {
                    card.style.transform = `skewY(${skewAmount * direction * 0.3}deg)`;
                });

                // Reset skew after scrolling stops
                clearTimeout(window._skewResetTimer);
                window._skewResetTimer = setTimeout(() => {
                    document.querySelectorAll(".surface-card, .showcase-card, .experience-card").forEach(card => {
                        card.style.transform = "";
                    });
                }, 150);

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ── Scroll-Linked Section Depth (parallax layers) ──── */
if (!prefersReducedMotion && window.innerWidth > 760) {
    const depthElements = [
        { selector: ".hero-copy", speed: 0.02 },
        { selector: ".macbook", speed: -0.015 },
        { selector: ".band-heading", speed: 0.025 },
        { selector: ".section-heading", speed: 0.02 },
        { selector: ".contact-panel", speed: -0.01 },
    ];

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        depthElements.forEach(({ selector, speed }) => {
            const el = document.querySelector(selector);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
                const offset = (rect.top - window.innerHeight / 2) * speed;
                el.style.setProperty("--scroll-y", `${offset}px`);
            }
        });
    }, { passive: true });
}

/* ── 3D Tilt Effect on Cards ─────────────────────────── */
if (!prefersReducedMotion && window.innerWidth > 760) {
    const tiltCards = document.querySelectorAll(".tilt-3d");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

            // Dynamic shine effect
            const shine = card.querySelector(".card-shine");
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(125, 211, 252, 0.15), transparent 60%)`;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
            const shine = card.querySelector(".card-shine");
            if (shine) {
                shine.style.background = "transparent";
            }
        });
    });
}

/* ── Magnetic Button Effect ──────────────────────────── */
if (!prefersReducedMotion && window.innerWidth > 760) {
    const magneticBtns = document.querySelectorAll(".button, .contact-links a");

    magneticBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0, 0)";
        });
    });
}

/* ── Mobile menu toggle ────────────────────────────── */
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* ── Active nav link on scroll ─────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a, .mobile-menu a");

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    },
    { threshold: 0.3 }
);

sections.forEach((section) => navObserver.observe(section));

/* ── Typewriter Effect ──────────────────────────────── */
const typewriterEl = document.querySelector(".typewriter");
if (typewriterEl && !prefersReducedMotion) {
    const phrases = JSON.parse(typewriterEl.dataset.phrases || '["Developer", "Designer", "Engineer"]');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(typeLoop, delay);
    }
    typeLoop();
}

/* ── Counter Animation ──────────────────────────────── */
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = parseInt(entry.target.dataset.count);
            const suffix = entry.target.dataset.suffix || "";
            let current = 0;
            const increment = target / 60;
            const step = () => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + suffix;
                } else {
                    entry.target.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(step);
                }
            };
            step();
            counterObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.5 }
);
counters.forEach((c) => counterObserver.observe(c));

/* ── Particle System ─────────────────────────────────── */
if (!prefersReducedMotion && window.innerWidth > 760) {
    const particleCanvas = document.createElement("canvas");
    particleCanvas.className = "particle-canvas";
    document.body.appendChild(particleCanvas);

    const ctx = particleCanvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 195 : 150;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 72%, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
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
                    ctx.strokeStyle = `hsla(195, 80%, 72%, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        drawLines();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ── Smooth Anchor Scrolling ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

/* ── Topbar shrink on scroll ─────────────────────────── */
const topbar = document.querySelector(".topbar");
if (topbar) {
    window.addEventListener("scroll", () => {
        topbar.classList.toggle("topbar-scrolled", window.scrollY > 80);
    }, { passive: true });
}

/* ── Image Reveal on Scroll ──────────────────────────── */
const imageReveals = document.querySelectorAll(".showcase-media img, .desktop-card-image img, .sidebar-avatar img");
const imageObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("img-revealed");
                imageObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);
imageReveals.forEach((img) => imageObserver.observe(img));

/* ── Text Split Reveal Animation ─────────────────────── */
const splitTexts = document.querySelectorAll(".text-split-reveal");
splitTexts.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", text);
    const words = text.split(" ");
    words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "split-word";
        span.textContent = word + " ";
        span.style.transitionDelay = `${i * 60}ms`;
        el.appendChild(span);
    });
});

const splitObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("split-visible");
                splitObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);
document.querySelectorAll(".text-split-reveal").forEach((el) => splitObserver.observe(el));
