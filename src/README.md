# Instituto IPÊ - Plataforma DISC Futurista 🚀

Website futurista com estética neon azul/roxo para análise DISC comportamental. Desenvolvido com HTML, CSS e JavaScript puro.

## 🎨 Características Visuais

### Paleta de Cores Neon
- **Azul Neon**: `#3DF0FF`
- **Roxo Neon**: `#A43DFF`
- **Ciano**: `#00E5F6`
- **Preto Profundo**: `#050505`
- **Branco Puro**: `#FFFFFF`
- **Vermelho Neon**: `#FF3D5A`
- **Amarelo Neon**: `#FFE83D`
- **Verde Neon**: `#3DFFB8`

### Efeitos Visuais
✨ Partículas animadas em Canvas  
🌟 Glow neon pulsante  
🎭 Cards holográficos com backdrop-filter  
🎪 Animações 3D hover  
🌊 Parallax suave  
⚡ Microinterações  
💫 Linhas digitais e ondas luminosas  

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial (landing page)
├── login.html              # Página de Login/Cadastro
├── dashboard.html          # Dashboard com relatórios DISC
├── styles.css              # Estilos globais
├── auth-styles.css         # Estilos da página de autenticação
├── dashboard-styles.css    # Estilos do dashboard
├── script.js               # JavaScript global
├── auth-script.js          # JavaScript da autenticação
└── dashboard-script.js     # JavaScript do dashboard
```

## 📄 Páginas

### 1. **index.html** - Landing Page
9 seções completas:
1. **Hero Futurista** - Background com partículas, título neon, CTAs
2. **O que é o DISC** - 4 cards (D, I, S, C) com cores específicas
3. **Benefícios** - 6 cards com ícones e animações
4. **Psicologia** - Explicação científica com visual
5. **Como Funciona** - Mockup do teste interativo
6. **Resultados** - Gráfico radar SVG animado
7. **Cadastro/Login** - Formulários com toggle
8. **Sobre o Instituto IPÊ** - Missão, valores e estatísticas
9. **Rodapé** - Links, redes sociais, newsletter

### 2. **login.html** - Autenticação
- Split layout (info + formulário)
- Toggle entre Login e Cadastro
- Validação de senha com medidor de força
- Social login (Google, Microsoft)
- Animações suaves
- Mobile responsive

### 3. **dashboard.html** - Painel do Usuário
**Sidebar**:
- Navegação por seções
- Ícones neon
- Estado ativo visual

**Conteúdo Principal**:
- Cards de estatísticas rápidas
- Gráfico radar DISC interativo
- Análise detalhada do perfil
- Pontos fortes e áreas de desenvolvimento
- Carreiras ideais
- Histórico de testes
- Recomendações personalizadas

## 🎯 Funcionalidades JavaScript

### Global (script.js)
```javascript
- Partículas animadas com Canvas
- Scroll suave
- Animações ao scroll (Intersection Observer)
- Parallax no hero
- Botão scroll-to-top
- Efeitos hover em cards
- Counters animados
- Ripple effect em botões
```

### Autenticação (auth-script.js)
```javascript
- Toggle entre Login/Cadastro
- Validação de formulários
- Medidor de força de senha
- Toggle visibility de senha
- Sistema de notificações
- Atalhos de teclado (Alt+L, Alt+R)
- Animação de stats
```

### Dashboard (dashboard-script.js)
```javascript
- Sidebar mobile toggle
- Animação de barras de progresso
- Animação do gráfico radar
- Download PDF (simulado)
- Refresh de dados
- Notificações toast
- Atalhos de teclado (Ctrl+D, Ctrl+N, Ctrl+R, Ctrl+P)
- Relógio em tempo real no header
- Auto-refresh a cada 5 minutos
```

## 🎨 Componentes Principais

### Cards Holográficos
```css
.holographic-card {
    background: linear-gradient(135deg, rgba(61, 240, 255, 0.1), rgba(164, 61, 255, 0.1));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(61, 240, 255, 0.3);
    border-radius: 1.5rem;
}
```

### Texto Neon
```css
.neon-text {
    text-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 30px var(--neon-cyan);
    animation: glow-pulse 3s infinite;
}
```

### Botões
- **btn-primary**: Gradiente azul→roxo com glow
- **btn-secondary**: Transparente com borda neon

## ⌨️ Atalhos de Teclado

### Dashboard
- `Ctrl/Cmd + D` - Ir para Dashboard
- `Ctrl/Cmd + N` - Novo Teste
- `Ctrl/Cmd + R` - Atualizar dados
- `Ctrl/Cmd + P` - Imprimir relatório

### Login
- `Alt + L` - Tab Login
- `Alt + R` - Tab Registro

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Ajustes Mobile
- Sidebar colapsável
- Grid adaptativo (1 coluna)
- Fonte reduzida
- Espaçamentos otimizados
- Botões full-width

## 🚀 Como Usar

1. **Abra `index.html`** no navegador para ver a landing page
2. **Clique em "Iniciar Teste DISC"** ou "Entrar / Cadastrar" para ir para `login.html`
3. **Faça login/cadastro** (simulado) e será redirecionado para `dashboard.html`
4. **Explore o dashboard** com todas as funcionalidades interativas

## 🔧 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Animações, Grid, Flexbox, Custom Properties
- **JavaScript ES6+** - Vanilla JS, sem frameworks
- **Canvas API** - Partículas animadas
- **SVG** - Gráficos e ícones
- **Intersection Observer** - Animações ao scroll
- **LocalStorage** (futuro) - Salvar dados do usuário

## 🎨 Fontes

- **Orbitron** - Títulos e números (estilo futurista)
- **Rajdhani** - Corpo de texto (clean e moderno)

Importadas via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📊 Gráfico DISC

O gráfico radar é criado com SVG puro e animado via CSS/JS:
- 4 eixos (D, I, S, C)
- Cores específicas por dimensão
- Animação de preenchimento progressivo
- Pontos pulsantes
- Gradiente neon

## 🔐 Segurança (Simulada)

- Validação de e-mail
- Verificação de força de senha
- Confirmação de senha
- Mensagens de erro/sucesso
- Criptografia mencionada (visual)

## 🎯 Próximos Passos (Sugestões)

- [ ] Implementar backend real (Node.js, Python, PHP)
- [ ] Conectar banco de dados (MySQL, PostgreSQL, MongoDB)
- [ ] API REST para testes DISC
- [ ] Geração real de PDF com relatórios
- [ ] Sistema de autenticação OAuth
- [ ] Múltiplos idiomas (i18n)
- [ ] Testes unitários
- [ ] PWA (Progressive Web App)
- [ ] Dark mode toggle

## 📄 Licença

Projeto desenvolvido para o Instituto IPÊ.  
© 2025 Instituto IPÊ. Todos os direitos reservados.

---

**Desenvolvido com tecnologia de ponta e muito ⚡ neon!**
