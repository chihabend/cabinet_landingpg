// ========================================
// NAVIGATION MOBILE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.why-item, .service-card, .contact-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensation pour la navbar sticky
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = '#ffffff';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ANIMATION DES CARDS AU HOVER (3D EFFECT)
// ========================================

document.querySelectorAll('.card-3d, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// ANIMATION DES BOUTONS
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Créer une onde de clic
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Ajouter le style pour l'effet ripple
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// COMPTER LES NUMÉROS (SI BESOIN)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// LAZY LOADING POUR LES IFRAMES
// ========================================

const lazyLoadIframes = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    iframe.src = iframe.dataset.src || iframe.src;
                    observer.unobserve(iframe);
                }
            });
        });
        observer.observe(iframe);
    }
};

// Exécuter au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadIframes);
} else {
    lazyLoadIframes();
}

// ========================================
// AMÉLIORATION DE L'ACCESSIBILITÉ
// ========================================

// Gestion du focus pour le clavier
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-primary)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ========================================
// FORMULAIRE DE CONTACT
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validation basique
        if (!name || !phone || !subject || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Créer le message WhatsApp ou email
        const whatsappMessage = `Bonjour,\n\nJe souhaite prendre rendez-vous.\n\nNom: ${name}\nTéléphone: ${phone}${email ? `\nEmail: ${email}` : ''}\nSujet: ${subject}\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/212523354781?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Option 1: Ouvrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Afficher un message de confirmation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✓</span> Message envoyé !';
        submitBtn.style.background = '#10B981';
        submitBtn.disabled = true;
        
        // Réinitialiser après 3 secondes
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            this.reset();
        }, 3000);
    });
}

// ========================================
// CONSOLE MESSAGE (OPTIONNEL)
// ========================================

// ========================================
// FOOTER - YEAR UPDATE
// ========================================

const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ========================================
// FOOTER - SCROLL ANIMATION
// ========================================

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

const footer = document.querySelector('.footer');
if (footer) {
    footerObserver.observe(footer);
}

// ========================================
// CONSOLE MESSAGE (OPTIONNEL)
// ========================================

console.log('%c👶 Cabinet Pédiatrie - Dr. BENATIYA ANDALOUSSI Wiame', 'font-size: 16px; color: #2563EB; font-weight: bold;');
console.log('%cSite développé avec soin pour la santé de vos enfants', 'font-size: 12px; color: #6b7280;');

