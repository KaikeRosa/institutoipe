// Particles Background Animation
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return; // Canvas não existe nesta página

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#3DF0FF', '#A43DFF', '#00E5F6'];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#3DF0FF';
                    ctx.globalAlpha = 0.2 * (1 - distance / 150);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// DISC Card Hover Effects
function initDiscCards() {
    const discCards = document.querySelectorAll('.disc-card');
    discCards.forEach(card => {
        const color = card.getAttribute('data-color');
        
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 0 40px ${color}`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

// Floating Neurons Animation
function initNeurons() {
    const container = document.getElementById('neurons-container');
    if (!container) return; // Container não existe nesta página

    const colors = ['#3DF0FF', '#A43DFF'];
    const neuronCount = 6;

    for (let i = 0; i < neuronCount; i++) {
        const neuron = document.createElement('div');
        neuron.style.position = 'absolute';
        neuron.style.width = '16px';
        neuron.style.height = '16px';
        neuron.style.borderRadius = '50%';
        neuron.style.background = colors[i % 2];
        neuron.style.boxShadow = `0 0 20px ${colors[i % 2]}`;
        neuron.style.top = `${20 + i * 12}%`;
        neuron.style.left = `${10 + (i % 3) * 30}%`;
        neuron.style.animation = `neuron-float-${i} 3s infinite`;
        
        container.appendChild(neuron);
    }

    // Add keyframes dynamically
    const style = document.createElement('style');
    let keyframes = '';
    for (let i = 0; i < neuronCount; i++) {
        keyframes += `
            @keyframes neuron-float-${i} {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                50% { transform: translate(0, -20px) scale(1.5); opacity: 1; }
            }
        `;
    }
    style.textContent = keyframes;
    document.head.appendChild(style);
}

// Progress Bar Fill Animation
function initProgressBar() {
    const percentageItems = document.querySelectorAll('.percentage-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const value = item.getAttribute('data-value');
                const color = item.getAttribute('data-color');
                const fill = item.querySelector('.percentage-bar-fill');
                
                fill.style.width = `${value}%`;
                fill.style.background = `linear-gradient(90deg, ${color}, ${color}88)`;
                fill.style.boxShadow = `0 0 20px ${color}`;
            }
        });
    }, { threshold: 0.5 });

    percentageItems.forEach(item => observer.observe(item));
}

// Auth Form Toggle + integração
function initAuthForms() {
    const toggleBtns = document.querySelectorAll('.auth-toggle-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTitle = document.getElementById('auth-title');
    const authDescription = document.getElementById('auth-description');
    const authAltText = document.getElementById('auth-alt-text');
    const authAltLink = document.getElementById('auth-alt-link');

    if (!loginForm || !registerForm || !toggleBtns.length) {
        return;
    }

    function showLogin() {
        toggleBtns[0].classList.add('active');
        toggleBtns[1].classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        authTitle.textContent = 'Acessar sua conta';
        authDescription.textContent = 'Entre para acessar seus resultados salvos';
        authAltText.innerHTML = 'Ainda não tem conta? <a href="#" id="auth-alt-link">Cadastre-se</a>';
        setupAltLink();
    }

    function showRegister() {
        toggleBtns[1].classList.add('active');
        toggleBtns[0].classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        authTitle.textContent = 'Criar nova conta';
        authDescription.textContent = 'Cadastre-se para salvar e acompanhar sua evolução';
        authAltText.innerHTML = 'Já tem uma conta? <a href="#" id="auth-alt-link">Faça login</a>';
        setupAltLink();
    }

    function setupAltLink() {
        const altLink = document.getElementById('auth-alt-link');
        altLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm.classList.contains('active')) {
                showRegister();
            } else {
                showLogin();
            }
        });
    }

    toggleBtns[0].addEventListener('click', showLogin);
    toggleBtns[1].addEventListener('click', showRegister);
    setupAltLink();

    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitLandingAuthForm(loginForm, 'login');
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitLandingAuthForm(registerForm, 'register');
    });
}

async function submitLandingAuthForm(form, type) {
    const submitBtn = form.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);

    try {
        const formData = Object.fromEntries(new FormData(form).entries());

        if (type === 'register' && formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        const payload =
            type === 'login'
                ? {
                      email: formData.email?.trim(),
                      password: formData.password,
                  }
                : {
                      name: formData.name?.trim(),
                      email: formData.email?.trim(),
                      password: formData.password,
                  };

        const authResponse =
            type === 'login' ? await AuthAPI.login(payload) : await AuthAPI.register(payload);

        AuthSession.save(authResponse);
        const synced = await syncPendingTestAfterAuth();
        if (synced) {
            alert('Seu teste foi salvo automaticamente e estará no dashboard ao acessar.');
        }
        window.location.href = getAuthRedirectTarget();
    } catch (error) {
        alert(error.message || 'Não foi possível concluir a ação. Tente novamente.');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

function setButtonLoading(button, isLoading) {
    if (!button) return;
    button.disabled = isLoading;
    button.classList.toggle('is-loading', isLoading);
}

function getDefaultAuthenticatedPath() {
    if (window.AuthSession?.getHomePath) {
        return window.AuthSession.getHomePath();
    }
    return 'dashboard.html';
}

function getAuthRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect') || getDefaultAuthenticatedPath();
}

async function syncPendingTestAfterAuth() {
    if (!window.PendingTest) return false;

    try {
        return await PendingTest.submit();
    } catch (error) {
        console.warn('Não foi possível sincronizar o teste pendente:', error);
        alert('Você está logado, mas não conseguimos salvar o teste pendente automaticamente. Tente novamente pelo dashboard.');
        return false;
    }
}

// Scroll to Top Button
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) {
        // Elemento não existe nesta página, não faz nada
        return;
    }
    
    // Verifica novamente antes de usar
    if (!scrollTopBtn || typeof scrollTopBtn.addEventListener !== 'function') {
        console.warn('Elemento scroll-top não está disponível');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (!scrollTopBtn) return;
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial state
    if (scrollTopBtn && scrollTopBtn.style) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
        scrollTopBtn.style.transition = 'opacity 0.3s ease';
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Benefit Cards Animation on Hover
function initBenefitCards() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.benefit-icon');
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'float 3s infinite ease-in-out';
            }, 10);
        });
    });
}

// Option Button Selection
function initOptionButtons() {
    const optionBtns = document.querySelectorAll('.option-btn');
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selection from all buttons
            optionBtns.forEach(b => {
                const radio = b.querySelector('.radio');
                radio.style.background = 'transparent';
            });
            
            // Add selection to clicked button
            const radio = btn.querySelector('.radio');
            radio.style.background = 'var(--neon-blue)';
        });
    });
}

// Intersection Observer for Fade-in Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.disc-card, .benefit-card, .feature-item, .value-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    if (!heroContent && floatingOrbs.length === 0) return; // Elementos não existem nesta página
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
        
        floatingOrbs.forEach((orb, index) => {
            orb.style.transform = `translate(${scrolled * 0.1 * (index + 1)}px, ${scrolled * 0.15}px)`;
        });
    });
}

// Input Focus Effects
function initInputEffects() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper) {
                wrapper.style.boxShadow = '0 0 20px rgba(61, 240, 255, 0.3)';
            }
        });
        
        input.addEventListener('blur', () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper) {
                wrapper.style.boxShadow = 'none';
            }
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return; // Formulário não existe nesta página
    
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    
    if (!input || !button) return;
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value) {
            alert(`Obrigado por se inscrever: ${input.value}`);
            input.value = '';
        }
    });
}

// Add Glow Effect to Cards on Scroll
function initCardGlow() {
    // Não aplica em elementos dentro de .auth-form-wrapper para evitar movimento
    const cards = document.querySelectorAll('.holographic-card:not(.auth-form-wrapper):not(.auth-form-wrapper *)');
    
    if (cards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Verifica se não é o auth-form-wrapper
                if (!entry.target.closest('.auth-form-wrapper')) {
                    entry.target.style.animation = 'glow-pulse-box 4s infinite';
                }
            }
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));
}

// Animated Counter for Stats
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    let display = Math.floor(current);
                    if (hasPercent) display += '%';
                    if (hasPlus) {
                        if (number >= 1000) {
                            display = Math.floor(current / 1000) + 'k+';
                        } else {
                            display += '+';
                        }
                    }
                    target.textContent = display;
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => observer.observe(stat));
}

// Add Ripple Effect to Buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Loading Animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialize All Functions
document.addEventListener('DOMContentLoaded', () => {
    // Detecta se está na página do dashboard ou admin
    const isDashboard = document.body.classList.contains('dashboard-body') || 
                        window.location.pathname.includes('dashboard');
    const isAdminPage = window.location.pathname.includes('admin');
    
    // Funções que devem rodar em todas as páginas
    // initAuthForms() só roda na página inicial, não na página de login dedicada
    const isLoginPage = window.location.pathname.includes('login.html');
    if (!isLoginPage) {
        initAuthForms();
    }
    initSmoothScroll();
    initInputEffects();
    
    // Funções específicas da página inicial (não dashboard, não admin e não login)
    if (!isDashboard && !isAdminPage && !isLoginPage) {
        initParticles();
        initDiscCards();
        initNeurons();
        initProgressBar();
        initScrollTop();
        initBenefitCards();
        initOptionButtons();
        initScrollAnimations();
        initParallax();
        initNewsletterForm();
        initCardGlow();
        initStatCounters();
        initRippleEffect();
        initLoadingAnimation();
    } else if (isDashboard || isAdminPage) {
        // Dashboard e Admin reutilizam o background de partículas
        initParticles();
    } else if (isLoginPage) {
        // Na página de login, apenas inicializa particles (sem loading animation e sem card glow)
        initParticles();
        // NÃO inicializa initCardGlow() para evitar animações no formulário
    }
    
    console.log('🚀 Instituto IPÊ - Sistema inicializado com sucesso!');
});

// Add cursor trail effect
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listeners
const optimizedScrollHandler = debounce(() => {
    // Scroll-dependent animations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
