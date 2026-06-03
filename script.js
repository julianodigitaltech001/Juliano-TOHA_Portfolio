
/* ============================
   THEME TOGGLE
============================ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

function applyTheme(dark) {
    isDark = dark;
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('mjt-theme', dark ? 'dark' : 'light');
}
// Restore saved theme
const saved = localStorage.getItem('mjt-theme');
if (saved === 'light') applyTheme(false);

themeToggle.addEventListener('click', () => applyTheme(!isDark));

/* ============================
   NAVBAR
============================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
    if (window.scrollY > 80) {
        navbar.classList.replace('transparent', 'solid') || navbar.classList.add('solid');
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.remove('solid');
        navbar.classList.add('transparent');
    }

    // Active link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ============================
   HAMBURGER
============================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});
mobLinks.forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
}));

/* ============================
   TYPED TEXT EFFECT
============================ */
const roles = ['Développeur Web', 'Graphiste', 'Maintenancier', 'Designer UI/UX', 'Analyste Programmeur', 'Monteur Vidéo'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    const word = roles[ri];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let speed = deleting ? 45 : 90;
    if (!deleting && ci > word.length) { deleting = true; speed = 1600; }
    else if (deleting && ci < 0)  { deleting = false; ri = (ri + 1) % roles.length; speed = 400; }
    setTimeout(type, speed);
}
setTimeout(type, 800);

/* ============================
   SCROLL REVEAL
============================ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            const delay = (e.target.closest('[data-delay]')?.dataset.delay || 0) + i * 60;
            setTimeout(() => e.target.classList.add('active'), delay > 500 ? 0 : delay);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ============================
   PROGRESS BARS
============================ */
const progFills = document.querySelectorAll('.prog-fill');
const progObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const w = e.target.dataset.w;
            setTimeout(() => { e.target.style.width = w + '%'; }, 300);
            progObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
progFills.forEach(f => progObserver.observe(f));

/* ============================
   PORTFOLIO
============================ */
const projects = [
    { id:1, title:'Site vitrine – NOANA Beauty', cat:'web', tags:['HTML','CSS','JavaScript'], desc:'Création d\'un site vitrine complet pour NOANA Beauty une entreprie locale.', bg:'linear-gradient(135deg, #667eea, #764ba2)', icon:'🛒' },
    { id:2, title:'Identité Visuelle – LIB ONG', cat:'design', tags:['Illustrator','Photoshop','Branding'], desc:'Création d\'une charte graphique complète pour LIB ONG une ONG locale : logo, couleurs, typographies et supports print.', bg:'linear-gradient(135deg, #f093fb, #f5576c)', icon:'🎨' },
    { id:3, title:'Application de Gestion de mots de passe', cat:'web', tags:['PHP','MySQL','Bootstrap'], desc:'Développement d\'une application web de gestion de mots de passe pour mon apprentissage.', bg:'linear-gradient(135deg, #4facfe, #00f2fe)', icon:'📊' },
    { id:4, title:'Parc Informatique – CPET Les Palmiers', cat:'ISI', tags:['Installation matériel et logiciel'], desc:'Mise en place du Parc Informatique du CPET Les Palmiers', bg:'linear-gradient(135deg, #43e97b, #38f9d7)', icon:'🌐' },
    { id:5, title:'Pub Vidéo – NOANA Beauty', cat:'video', tags:['CapCut','Motion Graphics'], desc:'Réalisation d\'une publicité vidéo professionnelle pour NOANA Beauty avec effets motion graphics.', bg:'linear-gradient(135deg, #fa709a, #fee140)', icon:'🎬' },
    { id:6, title:'Portfolio Personnel Moderne', cat:'web', tags:['HTML5','CSS3','JavaScript'], desc:'Conception et développement d\'un portfolio personnel moderne avec animations et design glassmorphism.', bg:'linear-gradient(135deg, #a18cd1, #fbc2eb)', icon:'💼' },
];

const grid = document.getElementById('portfolioGrid');
const modal = document.getElementById('portModal');
const closeModal = document.getElementById('closeModal');

function renderProjects(filter) {
    const items = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
    grid.innerHTML = items.map(p => `
        <div class="port-item reveal" data-id="${p.id}">
            <div class="port-item-bg" style="background:${p.bg}">${p.icon}</div>
            <div class="port-overlay">
                <span class="port-cat">${p.cat}</span>
                <h3>${p.title}</h3>
                <div class="port-btns">
                    <button class="port-btn port-btn-view" onclick="openModal(${p.id})">Détails</button>
                    <button class="port-btn port-btn-more">Voir le projet</button>
                </div>
            </div>
        </div>
    `).join('');
    // Re-observe new elements
    grid.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

renderProjects('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

window.openModal = function(id) {
    const p = projects.find(x => x.id === id);
    document.getElementById('modalImgWrap').innerHTML = `<div class="modal-img-placeholder" style="background:${p.bg}">${p.icon}</div>`;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
    document.getElementById('modalDesc').textContent = p.desc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

function closeModalFn() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
closeModal.addEventListener('click', closeModalFn);
modal.addEventListener('click', e => { if (e.target === modal) closeModalFn(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalFn(); });

/* ============================
   TESTIMONIALS SLIDER (scroll-snap)
============================ */
(function() {
    const track   = document.getElementById('testiTrack');
    const navWrap = document.getElementById('testiNav');
    const btnPrev = document.getElementById('testiPrev');
    const btnNext = document.getElementById('testiNext');
    const allCards = track.querySelectorAll('.testi-card');
    const count = allCards.length;
    let autoTimer = null;

    /* --- Calcule le nombre de cartes visibles en lisant le CSS réel --- */
    function visibleCount() {
        if (!allCards[0]) return 1;
        const cardW = allCards[0].getBoundingClientRect().width;
        const trackW = track.getBoundingClientRect().width;
        return Math.max(1, Math.round(trackW / (cardW + 1)));
    }

    /* --- Nombre de "pages" (positions de snap) --- */
    function pageCount() {
        return Math.ceil(count / visibleCount());
    }

    /* --- Index de la page courante d'après la position de scroll --- */
    function currentPage() {
        if (!allCards[0]) return 0;
        const cardW = allCards[0].getBoundingClientRect().width + 24; // +gap
        return Math.round(track.scrollLeft / cardW / visibleCount());
    }

    /* --- Défilement vers une page --- */
    function goTo(page) {
        const vc   = visibleCount();
        const cardW = allCards[0] ? allCards[0].getBoundingClientRect().width + 24 : 0;
        track.scrollTo({ left: page * vc * cardW, behavior: 'smooth' });
    }

    /* --- Mise à jour des pastilles --- */
    function updateDots() {
        const pg = currentPage();
        const total = pageCount();

        // Re-génère les pastilles si le nombre de pages a changé (resize)
        if (navWrap.children.length !== total) {
            navWrap.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const d = document.createElement('button');
                d.className = 'testi-dot';
                d.setAttribute('aria-label', `Page ${i + 1}`);
                d.addEventListener('click', () => { goTo(i); resetAuto(); });
                navWrap.appendChild(d);
            }
        }
        [...navWrap.children].forEach((d, i) =>
            d.classList.toggle('active', i === pg)
        );

        // Boutons flèches
        btnPrev.disabled = pg <= 0;
        btnNext.disabled = pg >= pageCount() - 1;
    }

    /* --- Auto-avance --- */
    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            const next = (currentPage() + 1) % pageCount();
            goTo(next);
        }, 4500);
    }

    /* --- Événements --- */
    btnPrev.addEventListener('click', () => { goTo(currentPage() - 1); resetAuto(); });
    btnNext.addEventListener('click', () => { goTo(currentPage() + 1); resetAuto(); });

    // Mise à jour des dots au scroll (natif ou JS)
    track.addEventListener('scroll', updateDots, { passive: true });

    // Recalcul au resize (ex. rotation mobile)
    window.addEventListener('resize', () => { updateDots(); }, { passive: true });

    /* --- Init --- */
    updateDots();
    resetAuto();
})();

/* ============================
   CONTACT FORM
============================ */
document.getElementById('submitBtn').addEventListener('click', function() {
    const name = document.getElementById('cName');
    const email = document.getElementById('cEmail');
    const msg = document.getElementById('cMsg');
    let valid = true;

    function validate(input, groupId, errId, test) {
        const ok = test(input.value.trim());
        document.getElementById(groupId).classList.toggle('error', !ok);
        document.getElementById(errId).classList.toggle('show', !ok);
        if (!ok) valid = false;
    }

    validate(name, 'nameGroup', 'nameErr', v => v.length >= 2);
    validate(email, 'emailGroup', 'emailErr', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    validate(msg, 'msgGroup', 'msgErr', v => v.length >= 10);

    if (valid) {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        this.disabled = true;
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            this.disabled = false;
            document.getElementById('formSuccess').classList.add('show');
            [name, email, document.getElementById('cSubject'), msg].forEach(f => f.value = '');
            setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
        }, 1800);
    }
});

/* ============================
   DOWNLOAD CV
============================ */
document.getElementById('downloadCv').addEventListener('click', function(e) {
    e.preventDefault();
    // Créez votre CV et placez-le à: cv/Michel-Ange-TOHA-CV.pdf
    // Puis décommentez la ligne ci-dessous:
     window.open('cv/Michel-Ange-TOHA-CV.pdf');

    // Simulation temporaire
    const btn = this;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> CV prêt !';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-download"></i> Mon CV'; }, 2500);
    }, 1200);
});

/* ============================
   BACK TO TOP
============================ */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================
   FOOTER YEAR
============================ */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ============================
   SMOOTH LOADING
============================ */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
