document.addEventListener('DOMContentLoaded', () => {

    console.log("JS carregado 🚀");

    // ============================================
    // ANIMAÇÃO DE ENTRADA - PAGE LOAD INTRO
    // ============================================

    function createPageLoadIntro() {
        // Cria o overlay de entrada
        const intro = document.createElement('div');
        intro.className = 'page-load-intro';
        intro.innerHTML = `
            <div class="intro-logo">
                <img src="logomarca-rodape-removebg-preview.png" alt="Roguim Imobiliária">
            </div>
            <div class="intro-text">
                <h1>Bem-vindo</h1>
                <p>Isabel Residencial</p>
                <div class="intro-progress">
                    <div class="intro-progress-bar"></div>
                </div>
            </div>
        `;
        document.body.insertBefore(intro, document.body.firstChild);

        // Remove o intro após 3 segundos
        setTimeout(() => {
            intro.classList.add('hide');
            document.body.classList.add('loaded');
        }, 3000);
    }

    // Inicia o intro na primeira visita
    if (!sessionStorage.getItem('pageLoaded')) {
        createPageLoadIntro();
        sessionStorage.setItem('pageLoaded', 'true');
    } else {
        document.body.classList.add('loaded');
    }

    // ============================================
    // ANIMAÇÃO DE NAVEGAÇÃO - LINK TRANSITION
    // ============================================

    function createTransitionElements() {
        // Cria slide transition (elegante e suave)
        const slideTop = document.createElement('div');
        slideTop.className = 'transition-slide-top';
        document.body.appendChild(slideTop);

        // Cria circle expand (moderno)
        const circle = document.createElement('div');
        circle.className = 'transition-circle';
        document.body.appendChild(circle);

        // Cria split fade (clássico)
        const splitLeft = document.createElement('div');
        splitLeft.className = 'transition-split-left';
        document.body.appendChild(splitLeft);

        const splitRight = document.createElement('div');
        splitRight.className = 'transition-split-right';
        document.body.appendChild(splitRight);

        // Cria diagonal sweep (dinâmico)
        const diagonal = document.createElement('div');
        diagonal.className = 'transition-diagonal';
        document.body.appendChild(diagonal);

        // Cria animação de saída do site
        const exitAnimation = document.createElement('div');
        exitAnimation.className = 'exit-animation';
        exitAnimation.style.display = 'none';
        document.body.appendChild(exitAnimation);
    }

    createTransitionElements();

    // Animação ao clicar em links de navegação
    function setupNavigationAnimation() {
        const navLinks = document.querySelectorAll('nav a, .btn, a');
        
        // Escolha o tipo de transição aqui:
        // 'slide-top' | 'circle' | 'split' | 'diagonal'
        const transitionType = 'diagonal';

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Se for um link âncora (hash) - navegação interna
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    // Inicia a transição selecionada (animação interna sutil)
                    activateTransition('slide-top');

                    // Navega enquanto a animação está rodando
                    setTimeout(() => {
                        window.location.hash = href;
                    }, 300);
                    
                    // Aguarda a animação completar (0.6s) antes de remover a classe
                    setTimeout(() => {
                        deactivateTransition('slide-top');
                    }, 600);
                } 
                // Se for um link externo ou novo aba - sair do site
                else if (href && (href.startsWith('http') || href.startsWith('www'))) {
                    // Verifica se é target="_blank" (abre em nova aba)
                    const target = this.getAttribute('target');
                    
                    if (!target || target !== '_blank') {
                        // Se for sair do site na mesma aba
                        e.preventDefault();
                        
                        // Animação de saída (mais dramática)
                        activateTransition('circle');
                        
                        // Abre o link após a animação
                        setTimeout(() => {
                            window.location.href = href;
                        }, 400);
                    }
                }
            });
        });

        // Funções de ativação/desativação das transições
        function activateTransition(type) {
            switch(type) {
                case 'slide-top':
                    const slideTop = document.querySelector('.transition-slide-top');
                    slideTop.classList.add('active');
                    break;
                case 'circle':
                    const circle = document.querySelector('.transition-circle');
                    circle.classList.add('active');
                    break;
                case 'split':
                    const splitLeft = document.querySelector('.transition-split-left');
                    const splitRight = document.querySelector('.transition-split-right');
                    splitLeft.classList.add('active');
                    splitRight.classList.add('active');
                    break;
                case 'diagonal':
                    const diagonal = document.querySelector('.transition-diagonal');
                    diagonal.classList.add('active');
                    break;
                case 'exit':
                    const exitAnimation = document.querySelector('.exit-animation');
                    exitAnimation.style.display = 'block';
                    break;
            }
        }

        function deactivateTransition(type) {
            switch(type) {
                case 'slide-top':
                    const slideTop = document.querySelector('.transition-slide-top');
                    if (slideTop) slideTop.classList.remove('active');
                    break;
                case 'circle':
                    const circle = document.querySelector('.transition-circle');
                    if (circle) circle.classList.remove('active');
                    break;
                case 'split':
                    const splitLeft = document.querySelector('.transition-split-left');
                    const splitRight = document.querySelector('.transition-split-right');
                    if (splitLeft) splitLeft.classList.remove('active');
                    if (splitRight) splitRight.classList.remove('active');
                    break;
                case 'diagonal':
                    const diagonal = document.querySelector('.transition-diagonal');
                    if (diagonal) diagonal.classList.remove('active');
                    break;
            }
        }
    }

    setupNavigationAnimation();

    // ============================================
    // ANIMAÇÕES DE PÁGINA LOAD
    // ============================================
    
    // Marca o body como loaded para ativar animações de entrada
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
    }

    // Anima elementos do header na entrada
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach((link, index) => {
        link.style.animation = `slideDown 0.6s ease forwards`;
        link.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    // ============================================
    // INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
    // ============================================

    // Configuração do observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Adiciona classe visible
                element.classList.add('visible');

                // Anima diferentes tipos de seções
                if (element.id === 'aboutus' || element.id === 'description') {
                    animateSection(element, 'fade-up');
                } else if (element.id === 'description-apartament') {
                    animateColumns(element.querySelectorAll('.column'));
                } else if (element.id === 'photo-box') {
                    animatePhotoBox(element.querySelectorAll('.photo-item'));
                } else if (element.id === 'contato') {
                    animateContactSection(element);
                } else {
                    animateSection(element, 'fade-up');
                }

                // Para de observar após animação
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observa todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // FUNÇÕES DE ANIMAÇÃO PERSONALIZADAS
    // ============================================

    // Anima seção com fade-up
    function animateSection(element, type = 'fade-up') {
        const heading = element.querySelector('h2, h3, dt');
        const paragraphs = element.querySelectorAll('p, dd');

        if (heading) {
            heading.style.animation = 'fadeInDown 0.7s ease 0.3s forwards';
            heading.style.opacity = '0';
        }

        paragraphs.forEach((p, index) => {
            p.style.animation = `fadeInUp 0.7s ease ${0.4 + index * 0.1}s forwards`;
            p.style.opacity = '0';
        });
    }

    // Anima colunas com stagger
    function animateColumns(columns) {
        columns.forEach((column, index) => {
            column.style.animation = `scaleInUp 0.6s ease ${0.1 * index}s forwards`;
            column.style.opacity = '0';

            // Adiciona hover effect
            column.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'translateY(-8px)';
            });

            column.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Anima galeria de fotos
    function animatePhotoBox(photos) {
        photos.forEach((photo, index) => {
            photo.style.animation = `fadeInUp 0.7s ease ${0.1 * (index + 1)}s forwards`;
            photo.style.opacity = '0';

            // Efeito ao passar mouse
            photo.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.15)';
            });

            photo.addEventListener('mouseleave', function() {
                this.style.filter = '';
            });
        });
    }

    // Anima seção de contato
    function animateContactSection(element) {
        const card = element.querySelector('.contact-card');
        const form = element.querySelector('.contact-form');

        if (card) {
            card.style.animation = 'slideInLeft 0.7s ease forwards';
            card.style.opacity = '0';
        }

        if (form) {
            form.style.animation = 'slideInRight 0.7s ease 0.2s forwards';
            form.style.opacity = '0';
        }

        // Anima labels e inputs
        const labels = element.querySelectorAll('label');
        const inputs = element.querySelectorAll('input, textarea');

        labels.forEach((label, index) => {
            label.style.animation = `fadeInUp 0.5s ease ${0.3 + index * 0.1}s forwards`;
            label.style.opacity = '0';
        });

        inputs.forEach((input, index) => {
            input.style.animation = `fadeInUp 0.5s ease ${0.4 + index * 0.1}s forwards`;
            input.style.opacity = '0';
        });
    }

    // ============================================
    // EFEITOS DE CLIQUE
    // ============================================

    // Adiciona efeito ripple ao clicar em botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out forwards;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // ANIMAÇÃO RIPPLE
    // ============================================

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }

        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // EFEITOS DE INPUT/TEXTAREA
    // ============================================

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.animation = 'glow 0.6s ease-in-out forwards';
        });

        input.addEventListener('blur', function() {
            this.style.animation = '';
        });
    });

    // ============================================
    // SCROLL REVEAL - Elementos com data-animate
    // ============================================

    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => {
        animateObserver.observe(el);
    });

    // ============================================
    // EMAILJS - FORMULÁRIO DE CONTATO
    // ============================================

    console.log("✅ Animações carregadas com sucesso!");

    // 🔍 Verifica EmailJS
    if (typeof emailjs === "undefined") {
        console.error("❌ EmailJS NÃO carregou");
        alert("Erro: EmailJS não carregou!");
        return;
    }

    console.log("✅ EmailJS carregado");

    // 🔑 CONFIGURE AQUI
    const PUBLIC_KEY = "3eeA93KVPjbDiy0cR";
    const SERVICE_ID = "service_5fg7mer";
    const TEMPLATE_ID = "template_411y4x5";

    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ Formulário não encontrado");
        return;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("📨 Tentando enviar...");

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        const params = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        };

        console.log("📦 PARAMS:", params);

        emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then((res) => {
            console.log("✅ SUCESSO:", res);
            alert("Mensagem enviada com sucesso!");
            
            // Anima o envio com sucesso
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "✓ Enviado!";
            submitBtn.style.animation = 'pulse 0.6s ease';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                form.reset();
            }, 2000);
        })
        .catch((err) => {
            console.error("❌ ERRO COMPLETO:", err);
            alert("Erro ao enviar. Veja o console (F12).");
        });

    }); // ✅ FECHADO CORRETAMENTE

}); // ✅ FECHAMENTO FINAL
