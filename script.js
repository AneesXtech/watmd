// Initialize Particles.js for hero and footer
document.addEventListener('DOMContentLoaded', () => {
    
    // Popup logic
    const popup = document.querySelector('.event-popup');
    const closePopup = document.querySelector('.close-popup');
    if (closePopup && popup) {
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
            document.body.classList.remove('popup-active');
        });
        
        // Auto show popup after 3 seconds
        setTimeout(() => {
            if(!sessionStorage.getItem('popupShown')) {
                popup.classList.add('active');
                document.body.classList.add('popup-active');
                sessionStorage.setItem('popupShown', 'true');
            }
        }, 3000);
    }
    
    // Particles config
    const particlesConfig = {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00BFFF", "#E60000", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#00BFFF", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    };
    
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', particlesConfig);
    }
    if (document.getElementById('footer-particles')) {
        particlesConfig.particles.number.value = 40;
        particlesJS('footer-particles', particlesConfig);
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep it scrolled style or just add logic
            if (window.scrollY === 0) navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Vanilla Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal
    const tlHero = gsap.timeline();
    tlHero.from(".sub-headline", { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
          .from(".main-headline", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".hero-desc, .hero-location", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.4")
          .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4");
          
    // Hero Parallax
    gsap.to(".hero-bg-overlay", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // General Reveal
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach(el => {
        let delay = 0;
        if(el.classList.contains('delay-1')) delay = 0.2;
        if(el.classList.contains('delay-2')) delay = 0.4;
        
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power1.out",
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                    }
                });
            }
        });
    });

    // Belt Progression Animation
    const beltSection = document.querySelector('.belt-section');
    if (beltSection) {
        ScrollTrigger.create({
            trigger: beltSection,
            start: "top 70%",
            onEnter: () => {
                let isMobile = window.innerWidth <= 768;
                if(isMobile) {
                    document.querySelector('.progress-fill').style.height = '100%';
                    document.querySelector('.progress-fill').style.width = '100%';
                } else {
                    document.querySelector('.progress-fill').style.width = '100%';
                }
            }
        });
    }

    // Schedule Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const scheduleClasses = document.querySelectorAll('.schedule-class');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            scheduleClasses.forEach(cls => {
                if (filterValue === 'all' || cls.classList.contains(filterValue)) {
                    cls.style.display = 'flex';
                    gsap.from(cls, { opacity: 0, y: 10, duration: 0.3 });
                } else {
                    cls.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(++currentSlide));
        prevBtn.addEventListener('click', () => showSlide(--currentSlide));
        
        // Auto slide
        setInterval(() => {
            showSlide(++currentSlide);
        }, 5000);
    }

    // Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            if(lightboxImg && lightbox) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            }
        });
    });

    if(lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    }
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    // Form Submission UI
    const trialForm = document.getElementById('trial-form');
    if (trialForm) {
        trialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = trialForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            btn.classList.add('btn-outline');
            btn.classList.remove('btn-primary');
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                trialForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            }, 1500);
        });
    }
});
