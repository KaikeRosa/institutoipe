// Auth Page Specific JavaScript

// Tab Switching
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form-page');
    const registerForm = document.getElementById('register-form-page');

    // Garante que o formulário de login está visível no carregamento inicial
    // SEM animação para evitar o "piscar"
    if (loginForm) {
        // Remove a classe initial-load após um pequeno delay para permitir transições futuras
        setTimeout(() => {
            loginForm.classList.remove('initial-load');
        }, 100);
    }
    
    if (registerForm && registerForm.classList.contains('active')) {
        registerForm.classList.remove('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding form com animação apenas quando trocar de aba
            if (targetTab === 'login') {
                registerForm.classList.remove('active', 'animate', 'initial-load');
                // Pequeno delay para garantir que o display: none seja aplicado antes
                setTimeout(() => {
                    loginForm.classList.remove('initial-load');
                    loginForm.classList.add('active', 'animate');
                }, 10);
            } else {
                loginForm.classList.remove('active', 'animate', 'initial-load');
                setTimeout(() => {
                    registerForm.classList.remove('initial-load');
                    registerForm.classList.add('active', 'animate');
                }, 10);
            }
        });
    });
}

// Password Toggle
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-password');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);

            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = `
                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                `;
            } else {
                input.type = 'password';
                btn.innerHTML = `
                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                `;
            }
        });
    });
}

// Password Strength Meter
function initPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (!passwordInput) return;

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;

        // Calculate strength
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 15;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 10;

        // Update UI
        strengthFill.style.width = `${strength}%`;

        if (strength < 40) {
            strengthFill.style.background = 'var(--neon-red)';
            strengthText.textContent = 'Senha fraca';
            strengthText.style.color = 'var(--neon-red)';
        } else if (strength < 70) {
            strengthFill.style.background = 'var(--neon-yellow)';
            strengthText.textContent = 'Senha média';
            strengthText.style.color = 'var(--neon-yellow)';
        } else {
            strengthFill.style.background = 'var(--neon-green)';
            strengthText.textContent = 'Senha forte';
            strengthText.style.color = 'var(--neon-green)';
        }
    });
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formType) {
    const form = document.getElementById(`${formType}-form-page`);
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        const wrapper = input.closest('.input-wrapper') || input.parentElement;

        // Remove previous error state
        wrapper.style.borderColor = '';

        if (!input.value.trim()) {
            isValid = false;
            if (wrapper.classList.contains('input-wrapper')) {
                input.style.borderColor = 'var(--neon-red)';
            }
        }

        // Email validation
        if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            isValid = false;
            input.style.borderColor = 'var(--neon-red)';
        }
    });

    // Password match validation for register
    if (formType === 'register') {
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            isValid = false;
            document.getElementById('register-confirm-password').style.borderColor = 'var(--neon-red)';
            showNotification('As senhas não coincidem!', 'error');
        }
    }

    return isValid;
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                ${type === 'success' 
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                    : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                background: linear-gradient(135deg, rgba(61, 240, 255, 0.1), rgba(164, 61, 255, 0.1));
                border: 1px solid rgba(61, 240, 255, 0.5);
                border-radius: 0.75rem;
                box-shadow: 0 0 30px rgba(61, 240, 255, 0.3);
                z-index: 10000;
                animation: slide-in 0.3s ease, slide-out 0.3s ease 2.7s;
                backdrop-filter: blur(10px);
            }

            .notification-error {
                border-color: rgba(255, 61, 90, 0.5);
                box-shadow: 0 0 30px rgba(255, 61, 90, 0.3);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--pure-white);
            }

            .notification-success svg {
                stroke: var(--neon-green);
            }

            .notification-error svg {
                stroke: var(--neon-red);
            }

            @keyframes slide-in {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slide-out {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => notification.remove(), 3000);
}

// Form Submissions
function initFormSubmissions() {
    const loginForm = document.getElementById('login-form-page');
    const registerForm = document.getElementById('register-form-page');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm('login')) {
            const email = loginForm.querySelector('input[name="email"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value;

            await submitAuthRequest('login', { email, password }, loginForm);
        } else {
            showNotification('Por favor, preencha todos os campos corretamente!', 'error');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm('register')) {
            const name = registerForm.querySelector('input[name="name"]').value.trim();
            const email = registerForm.querySelector('input[name="email"]').value.trim();
            const password = registerForm.querySelector('input[name="password"]').value;

            await submitAuthRequest('register', { name, email, password }, registerForm);
        } else {
            showNotification('Por favor, preencha todos os campos corretamente!', 'error');
        }
    });
}

async function submitAuthRequest(type, payload, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    setFormButtonState(submitBtn, true);

    try {
        const response =
            type === 'login' ? await AuthAPI.login(payload) : await AuthAPI.register(payload);

        AuthSession.save(response);

        const synced = await syncPendingTestAfterAuth();
        showNotification(
            type === 'login'
                ? 'Login realizado com sucesso!'
                : 'Cadastro realizado com sucesso!',
            'success',
        );

        if (synced) {
            showNotification('Seu teste DISC foi salvo e já está no dashboard!', 'success');
        }

        setTimeout(() => {
            window.location.href = getRedirectTarget();
        }, 800);
    } catch (error) {
        showNotification(error.message || 'Não foi possível completar a ação.', 'error');
    } finally {
        setFormButtonState(submitBtn, false);
    }
}

function setFormButtonState(button, isLoading) {
    if (!button) return;
    button.disabled = isLoading;
    button.classList.toggle('is-loading', isLoading);
}

function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect')) {
        return params.get('redirect');
    }

    if (window.AuthSession?.getHomePath) {
        return window.AuthSession.getHomePath();
    }

    return 'dashboard.html';
}

async function syncPendingTestAfterAuth() {
    if (!window.PendingTest) return false;

    try {
        return await PendingTest.submit();
    } catch (error) {
        showNotification(error.message || 'Não foi possível sincronizar o teste pendente.', 'error');
        return false;
    }
}

// Social Login Buttons
function initSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');

    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.classList.contains('google') ? 'Google' : 'Microsoft';
            showNotification(`Login com ${provider} em desenvolvimento...`, 'success');
        });
    });
}

// Input Focus Effects
function initInputFocusEffects() {
    const inputs = document.querySelectorAll('.input-wrapper input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const icon = input.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.transform = 'translateY(-50%) scale(1.1)';
                icon.style.stroke = 'var(--neon-purple)';
            }
        });

        input.addEventListener('blur', () => {
            const icon = input.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.transform = 'translateY(-50%) scale(1)';
                icon.style.stroke = 'var(--neon-blue)';
            }
        });
    });
}

// Animate Stats on Load
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasK = text.includes('k');
        
        let number = parseInt(text.replace(/\D/g, ''));
        
        if (hasK) {
            number = number * 1000;
        }

        let current = 0;
        const increment = number / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }

            let display = Math.floor(current);
            
            if (hasK) {
                display = Math.floor(current / 1000) + 'k';
            }
            if (hasPercent) display += '%';
            if (hasPlus) display += '+';

            stat.textContent = display;
        }, 16);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o formulário de login está visível imediatamente
    const loginForm = document.getElementById('login-form-page');
    if (loginForm) {
        loginForm.style.display = 'block';
        loginForm.style.opacity = '1';
        loginForm.style.transform = 'translateY(0)';
    }
    
    // Remove qualquer animação do wrapper que possa causar movimento
    const formWrapper = document.querySelector('.auth-form-wrapper');
    if (formWrapper) {
        formWrapper.style.animation = 'none';
        formWrapper.style.transform = 'translate(0, 0)';
        formWrapper.style.willChange = 'auto';
    }
    
    initAuthTabs();
    initPasswordToggle();
    initPasswordStrength();
    initFormSubmissions();
    initSocialLogin();
    initInputFocusEffects();
    
    console.log('🔐 Auth page initialized!');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + L for Login tab
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        document.querySelector('[data-tab="login"]').click();
    }
    // Alt + R for Register tab
    if (e.altKey && e.key === 'r') {
        e.preventDefault();
        document.querySelector('[data-tab="register"]').click();
    }
});
