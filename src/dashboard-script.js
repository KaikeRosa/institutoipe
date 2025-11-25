// Dashboard Specific JavaScript
const DASHBOARD_DIMENSIONS = ['D', 'I', 'S', 'C'];
const RADAR_CENTER = 100;
const RADAR_RADIUS = 90;
let dashboardData = null;

// Mobile Sidebar Toggle
function initMobileSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const main = document.querySelector('.dashboard-main');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Close sidebar when clicking nav items on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    });
}

// Animate Progress Bars
function animateProgressBars() {
    const percentageItems = document.querySelectorAll('.disc-percentages .percentage-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const value = item.getAttribute('data-percentage') || item.dataset.percentage || 0;
                const color = item.getAttribute('data-color');
                const fill = item.querySelector('.percentage-bar-fill');

                setTimeout(() => {
                    fill.style.width = `${value}%`;
                    fill.style.background = `linear-gradient(90deg, ${color}, ${color}88)`;
                    fill.style.boxShadow = `0 0 20px ${color}`;
                }, index * 150);

                observer.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    percentageItems.forEach(item => observer.observe(item));
}

function buildRadarPoints(percentages = {}) {
    const dY = RADAR_CENTER - ((percentages.D || 0) / 100) * RADAR_RADIUS;
    const iX = RADAR_CENTER + ((percentages.I || 0) / 100) * RADAR_RADIUS;
    const sY = RADAR_CENTER + ((percentages.S || 0) / 100) * RADAR_RADIUS;
    const cX = RADAR_CENTER - ((percentages.C || 0) / 100) * RADAR_RADIUS;

    return `${RADAR_CENTER},${dY} ${iX},100 ${RADAR_CENTER},${sY} ${cX},100`;
}

// Animate Stats on Load
function animateDashboardStats() {
    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach(stat => {
        const text = stat.textContent.trim();
        
        // Skip non-numeric stats
        if (text.includes('-') || text.length < 2) {
            return;
        }

        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/\D/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 60;
        const duration = 1000;
        const steps = 60;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }

            let display = Math.floor(current);
            if (hasPercent) display += '%';
            if (hasPlus) display += '+';

            stat.textContent = display;
        }, stepTime);
    });
}

// Radar Chart Animation
function animateRadarChart(finalPoints) {
    const polygon = document.getElementById('disc-polygon');
    if (!polygon || !finalPoints) return;
    
    polygon.style.transition = 'none';
    polygon.setAttribute('points', '100,100 100,100 100,100 100,100');
    
    requestAnimationFrame(() => {
        polygon.style.transition = 'all 1s ease-out';
        polygon.setAttribute('points', finalPoints);
    });
}

// Download PDF Functionality
function initDownloadPDF() {
    const downloadBtn = document.querySelector('[title="Download PDF"]');
    
    downloadBtn?.addEventListener('click', () => {
        showDashboardNotification('Gerando PDF do seu relatório...', 'success');
        
        // Simulate PDF generation
        setTimeout(() => {
            showDashboardNotification('PDF baixado com sucesso!', 'success');
        }, 2000);
    });
}

async function loadDashboardData(showToast = false) {
    try {
        console.log('📊 Carregando dados do dashboard...');
        const data = await apiRequest('/api/dashboard/summary');
        console.log('📊 Dados recebidos:', data);
        
        if (!data) {
            throw new Error('Nenhum dado recebido do servidor');
        }
        
        dashboardData = data;
        renderDashboard(data);

        if (showToast) {
            showDashboardNotification('Dados atualizados!', 'success');
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dashboard:', error);
        const message = error.message || 'Não foi possível carregar o dashboard.';
        showDashboardNotification(message, 'error');

        if (error.status === 401 || error.message?.includes('login')) {
            console.warn('🔒 Sessão expirada, redirecionando para login...');
            AuthSession.clear();
            setTimeout(() => {
                AuthSession.requireAuth('dashboard.html');
            }, 2000);
        }
    }
}

function renderDashboard(data) {
    console.log('🎨 Renderizando dashboard com dados:', data);
    
    try {
        updateUserHeader(data.user, data.latestTest);
        updateStats(data.summary || {}, data.latestTest);
        updatePercentages(data.latestTest?.percentages || {});
        updateRadarChart(data.latestTest?.percentages || {});
        updateAnalysis(data.latestTest?.insights);
        renderTestsList(data.history || []);
        renderRecommendations(data.recommendations || []);

        // Animações devem ser chamadas após um pequeno delay para garantir que o DOM foi atualizado
        setTimeout(() => {
            animateDashboardStats();
            animateProgressBars();
            initScrollReveal();
        }, 100);
        
        console.log('✅ Dashboard renderizado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao renderizar dashboard:', error);
        showDashboardNotification('Erro ao renderizar dados. Tente atualizar a página.', 'error');
    }
}

function updateUserHeader(user = {}, latestTest) {
    console.log('👤 Atualizando header do usuário:', { user, latestTest });
    
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const userNameEl = document.getElementById('dashboard-user-name');
    const userRoleEl = document.getElementById('dashboard-user-role');

    // Se não houver dados do usuário, tenta pegar do localStorage
    if (!user || !user.name) {
        const session = AuthSession.getSession();
        if (session?.user) {
            user = session.user;
            console.log('👤 Usando dados do localStorage:', user);
        }
    }

    if (userNameEl) {
        userNameEl.textContent = user?.name || 'Usuário IPÊ';
    }

    if (userRoleEl) {
        if (user?.role === 'admin') {
            userRoleEl.textContent = 'Administrador';
        } else {
            userRoleEl.textContent = latestTest?.insights?.profileLabel || latestTest?.profile || 'Perfil DISC';
        }
    }

    if (welcomeTitle) {
        if (user?.name) {
            const firstName = user.name.split(' ')[0];
            welcomeTitle.textContent = `Bem-vindo, ${firstName}!`;
        } else {
            welcomeTitle.textContent = 'Bem-vindo de volta!';
        }
    }

    if (welcomeSubtitle) {
        welcomeSubtitle.textContent = latestTest
            ? `Último teste em ${formatFullDate(latestTest.createdAt)}`
            : 'Realize seu primeiro teste para desbloquear insights.';
    }
}

function updateStats(summary = {}, latestTest) {
    setTextContent('stat-tests', summary.totalTests ?? 0);
    setTextContent(
        'stat-profile',
        latestTest?.insights?.profileLabel || latestTest?.profile || '--',
    );
    setTextContent('stat-confidence', `${summary.confidence ?? 0}%`);

    const evolution = summary.evolution ?? 0;
    const prefix = evolution > 0 ? '+' : '';
    setTextContent('stat-evolution', `${prefix}${evolution}%`);
}

function updatePercentages(percentages = {}) {
    console.log('📊 Atualizando percentuais:', percentages);
    DASHBOARD_DIMENSIONS.forEach((dimension) => {
        const value = percentages[dimension] ?? 0;
        const item = document.querySelector(`.percentage-item[data-dimension="${dimension}"]`);
        if (!item) {
            console.warn(`⚠️ Elemento não encontrado para dimensão ${dimension}`);
            return;
        }

        item.dataset.percentage = value;
        item.setAttribute('data-percentage', value);

        // Atualiza o valor no label
        const label = item.querySelector(`[data-dimension-value="${dimension}"]`) || item.querySelector('.percentage-value');
        if (label) {
            label.textContent = `${value}%`;
        }

        // Reseta a barra para animação
        const fill = item.querySelector('.percentage-bar-fill');
        if (fill) {
            fill.style.width = '0';
        }
    });
}

function updateRadarChart(percentages = {}) {
    const polygon = document.getElementById('disc-polygon');
    if (!polygon) return;

    const finalPoints = buildRadarPoints(percentages);
    animateRadarChart(finalPoints);
}

function updateAnalysis(insights) {
    const profileEl = document.getElementById('analysis-profile');
    const summaryEl = document.getElementById('analysis-summary');

    if (insights) {
        if (profileEl) profileEl.textContent = insights.profileLabel;
        if (summaryEl) summaryEl.textContent = insights.summary || '';
        renderList('strengths-list', insights.strengths);
        renderList('development-list', insights.development);
        renderCareers('careers-list', insights.careers);
    } else {
        if (profileEl) profileEl.textContent = 'Conclua um teste para ver seu perfil';
        if (summaryEl) {
            summaryEl.textContent =
                'Assim que você finalizar um teste DISC, sua análise completa aparecerá aqui.';
        }
        renderList('strengths-list', []);
        renderList('development-list', []);
        renderCareers('careers-list', []);
    }
}

function renderList(elementId, items = []) {
    const list = document.getElementById(elementId);
    if (!list) return;

    if (!items.length) {
        list.innerHTML = '<li>Disponível após o próximo teste.</li>';
        return;
    }

    list.innerHTML = '';
    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function renderCareers(elementId, careers = []) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (!careers.length) {
        container.innerHTML = '<span class="career-tag">Sem recomendações ainda</span>';
        return;
    }

    container.innerHTML = '';
    careers.forEach((career) => {
        const span = document.createElement('span');
        span.className = 'career-tag';
        span.textContent = career;
        container.appendChild(span);
    });
}

function renderTestsList(tests) {
    const list = document.getElementById('tests-list');
    const emptyState = document.getElementById('tests-empty');

    if (!list) return;
    list.innerHTML = '';

    if (!tests.length) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tests.forEach((test) => {
        const { day, month } = formatDateParts(test.createdAt);
        const item = document.createElement('div');
        item.className = 'test-item';
        item.innerHTML = `
            <div class="test-date">
                <div class="date-badge">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
            </div>
            <div class="test-info">
                <h4>${test.insights?.profileLabel || test.profile}</h4>
                <p>Confiança: ${test.confidence}%</p>
            </div>
            <button class="test-action" aria-label="Ver detalhes do teste">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
        `;

        const actionBtn = item.querySelector('.test-action');
        actionBtn?.addEventListener('click', () => {
            showDashboardNotification(
                `Teste ${formatFullDate(test.createdAt)} — ${test.insights?.profileLabel || test.profile}`,
                'success',
            );
        });

        list.appendChild(item);
    });
}

function renderRecommendations(recommendations) {
    const container = document.getElementById('recommendations-list');
    if (!container) return;

    container.innerHTML = '';

    if (!recommendations.length) {
        container.innerHTML = '<p class="empty-state">Sem recomendações. Execute um novo teste.</p>';
        return;
    }

    recommendations.forEach((recommendation) => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `
            <div class="recommendation-icon" style="background: linear-gradient(135deg, #3DF0FF22, #A43DFF22);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
            <div class="recommendation-content">
                <h4>${recommendation.title}</h4>
                <p>${recommendation.description}</p>
            </div>
        `;

        item.addEventListener('click', () => {
            showDashboardNotification(recommendation.description, 'success');
        });

        container.appendChild(item);
    });
}

function setTextContent(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = value;
}

function formatDateParts(dateInput) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
        return { day: '--', month: '--' };
    }
    return {
        day: String(date.getDate()).padStart(2, '0'),
        month: date
            .toLocaleString('pt-BR', { month: 'short' })
            .toUpperCase()
            .replace('.', ''),
    };
}

function formatFullDate(dateInput) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
        return '--/--/----';
    }
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
// Refresh Data
function initRefreshData() {
    const refreshBtn = document.querySelector('[title="Atualizar"]');
    
    refreshBtn?.addEventListener('click', async () => {
        refreshBtn.style.animation = 'spin 1s linear infinite';
        await loadDashboardData(true);
            refreshBtn.style.animation = '';
    });

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Dashboard Notification System
function showDashboardNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `dashboard-notification notification-${type}`;
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

    // Add styles
    if (!document.getElementById('dashboard-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'dashboard-notification-styles';
        style.textContent = `
            .dashboard-notification {
                position: fixed;
                top: 6rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                background: linear-gradient(135deg, rgba(61, 240, 255, 0.15), rgba(164, 61, 255, 0.15));
                border: 1px solid rgba(61, 240, 255, 0.5);
                border-radius: 0.75rem;
                box-shadow: 0 0 30px rgba(61, 240, 255, 0.3);
                z-index: 10000;
                animation: slide-in-right 0.3s ease, slide-out-right 0.3s ease 2.7s;
                backdrop-filter: blur(10px);
            }

            .dashboard-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--pure-white);
            }

            .dashboard-notification svg {
                stroke: var(--neon-green);
                stroke-width: 2;
            }

            @keyframes slide-in-right {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slide-out-right {
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

// Test Item Actions
function initTestActions() {
    const testActions = document.querySelectorAll('.test-action');
    
    testActions.forEach(action => {
        action.addEventListener('click', () => {
            const testItem = action.closest('.test-item');
            const testTitle = testItem.querySelector('h4').textContent;
            showDashboardNotification(`Abrindo: ${testTitle}`, 'success');
        });
    });
}

// New Test Button
function initNewTestButton() {
    const newTestBtn = document.getElementById('new-test-btn');
    
    newTestBtn?.addEventListener('click', () => {
        window.location.href = 'disc.html';
    });
}

// Active Nav Item
function initActiveNav() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href') || '#';
            
            // Links que realmente navegam (dashboard/admin/etc.) devem seguir o fluxo normal
            const isRealNavigation = href && href !== '#';

            // Não intercepta logout nem links reais
            if (item.textContent.includes('Sair') || isRealNavigation) {
                return;
            }
            
            e.preventDefault();
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active to clicked
            item.classList.add('active');
            
            const page = item.textContent.trim();
            showDashboardNotification(`Navegando para: ${page}`, 'success');
        });
    });
}

// Hover Effects for Cards
function initCardHoverEffects() {
    const statCards = document.querySelectorAll('.stat-card');
    const reportCards = document.querySelectorAll('.report-card');
    
    [...statCards, ...reportCards].forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Recommendations Interaction
function initRecommendations() {
    const recommendations = document.querySelectorAll('.recommendation-item');
    
    recommendations.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            showDashboardNotification(`Saiba mais: ${title}`, 'success');
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const elements = document.querySelectorAll('.stat-card, .report-card, .test-item, .recommendation-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + D for Dashboard
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const dashboardLink = document.querySelector('.nav-item');
            dashboardLink?.click();
        }
        
        // Ctrl/Cmd + N for New Test
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            const newTestBtn = document.querySelector('.btn-primary');
            newTestBtn?.click();
        }
        
        // Ctrl/Cmd + R for Refresh
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            const refreshBtn = document.querySelector('[title="Atualizar"]');
            refreshBtn?.click();
        }
    });
}

// Real-time Clock in Header
function initHeaderClock() {
    const headerWelcome = document.querySelector('.header-welcome p');
    if (!headerWelcome) return;

    const originalText = headerWelcome.textContent;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        headerWelcome.textContent = `${originalText} • ${hours}:${minutes}`;
    }

    updateClock();
    setInterval(updateClock, 60000); // Update every minute
}

// User Profile Dropdown
function initUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    
    userProfile?.addEventListener('click', () => {
        showDashboardNotification('Perfil do usuário', 'success');
    });
}

// Notification Bell
function initNotificationBell() {
    const notificationBtn = document.querySelector('.header-btn');
    
    notificationBtn?.addEventListener('click', () => {
        const badge = notificationBtn.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
        showDashboardNotification('Você não tem novas notificações', 'success');
    });
}

function initLogout() {
    const logoutLink = document.getElementById('logout-link');
    logoutLink?.addEventListener('click', (e) => {
        e.preventDefault();
        AuthSession.clear();
        window.location.href = 'login.html';
    });
}

// Export Report Data (simulated)
function initExportData() {
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-secondary';
    exportBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        Exportar Dados
    `;
    exportBtn.style.marginTop = '1rem';
    
    exportBtn.addEventListener('click', () => {
        showDashboardNotification('Preparando exportação...', 'success');
        setTimeout(() => {
            showDashboardNotification('Dados exportados com sucesso!', 'success');
        }, 1500);
    });
}

// Print Report
function initPrintReport() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            showDashboardNotification('Preparando impressão...', 'success');
            setTimeout(() => {
                window.print();
            }, 500);
        }
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', async () => {
    // Verifica autenticação
    const token = AuthSession.getToken();
    if (!token) {
        console.warn('Usuário não autenticado, redirecionando...');
        AuthSession.requireAuth('dashboard.html');
        return;
    }

    const currentUser = AuthSession.getUser();
    if (currentUser?.role === 'admin') {
        const adminLink = document.getElementById('admin-link');
        if (adminLink) {
            adminLink.style.display = 'flex';
        }
    }

    console.log('🔐 Usuário autenticado, carregando dashboard...');

    // Inicializa componentes
        initMobileSidebar();
        initDownloadPDF();
        initRefreshData();
        initNewTestButton();
        initActiveNav();
        initCardHoverEffects();
        initScrollReveal();
        initKeyboardShortcuts();
        initHeaderClock();
        initUserProfile();
        initNotificationBell();
        initPrintReport();
    initLogout();

    // Carrega dados do dashboard
    try {
        await loadDashboardData();
        console.log('✅ Dashboard carregado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao carregar dashboard:', error);
        showDashboardNotification('Erro ao carregar dados do dashboard. Tente atualizar a página.', 'error');
    }
});

// Auto-refresh data every 5 minutes
setInterval(() => {
    loadDashboardData();
}, 300000);
