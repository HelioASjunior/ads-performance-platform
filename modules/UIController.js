/**
 * UIController.js
 * Exporta duas classes:
 *  - ScrollReveal  → observa e anima seções ao rolar a página
 *  - LandingPage   → orquestra todos os comportamentos de interface
 */

// ─────────────────────────────────────────────────────────────────────────────
// ScrollReveal
// Usa IntersectionObserver para revelar elementos .reveal com fade-up
// ao entrar na viewport. Suporta stagger via data-reveal-delay (ms).
// ─────────────────────────────────────────────────────────────────────────────
export class ScrollReveal {
  /** @type {IntersectionObserver} */
  #observer;

  /**
   * @param {string} selector - Seletor CSS dos elementos a observar.
   * @param {IntersectionObserverInit} [options]
   */
  constructor(selector = '.reveal', options = {}) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const config = {
      threshold:   0.12,
      rootMargin: '0px 0px -48px 0px',
      ...options,
    };

    this.#observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const delay = Number(el.dataset.revealDelay ?? 0);

        setTimeout(() => el.classList.add('is-revealed'), delay);
        this.#observer.unobserve(el);
      });
    }, config);

    document.querySelectorAll(selector).forEach((el) => this.#observer.observe(el));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LandingPage
// Gerencia: fade-in da Hero, scroll indicator, nav sticky, menu mobile,
// smooth anchor links e interações de hover nos cards.
// ─────────────────────────────────────────────────────────────────────────────
export class LandingPage {
  /** @type {NodeListOf<HTMLElement>} */
  #fadeElements;
  /** @type {HTMLElement | null} */
  #scrollIndicator;
  /** @type {HTMLElement | null} */
  #nav;
  /** @type {HTMLButtonElement | null} */
  #navToggle;
  /** @type {HTMLElement | null} */
  #navLinks;
  /** @type {IntersectionObserver | null} */
  #fadeObserver = null;

  constructor() {
    this.#fadeElements    = document.querySelectorAll('.fade-in');
    this.#scrollIndicator = document.getElementById('scrollIndicator');
    this.#nav             = document.getElementById('nav');
    this.#navToggle       = document.getElementById('navToggle');
    this.#navLinks        = document.getElementById('navLinks');
  }

  /** Ponto de entrada: inicializa todos os comportamentos. */
  init() {
    this.#initFadeIn();
    this.#initScrollIndicator();
    this.#initNavScroll();
    this.#initMobileMenu();
    this.#initSmoothAnchorLinks();
    this.#initCardHover();
  }

  // ── Fade In da Hero ────────────────────────────────────────────────────────
  #initFadeIn() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.#fadeElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    this.#fadeElements.forEach((el) => {
      const delay = el.dataset.delay ?? 0;
      el.style.transitionDelay = `${delay}ms`;
    });

    // Elementos da Hero ficam visíveis imediatamente (sem IntersectionObserver)
    document.querySelectorAll('.hero .fade-in').forEach((el) => {
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));
    });

    // Demais elementos .fade-in fora da Hero
    this.#fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.#fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.#fadeElements.forEach((el) => {
      if (!el.closest('.hero')) this.#fadeObserver.observe(el);
    });
  }

  // ── Scroll Indicator ───────────────────────────────────────────────────────
  #initScrollIndicator() {
    if (!this.#scrollIndicator) return;

    const scrollToNext = () => {
      const hero = document.getElementById('hero');
      hero?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
    };

    this.#scrollIndicator.addEventListener('click', scrollToNext);
    this.#scrollIndicator.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToNext(); }
    });
  }

  // ── Nav Sticky (glassmorphism ao scrollar) ─────────────────────────────────
  #initNavScroll() {
    if (!this.#nav) return;

    const update = () => this.#nav.classList.toggle('is-scrolled', window.scrollY > 80);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ── Menu Mobile ────────────────────────────────────────────────────────────
  #initMobileMenu() {
    if (!this.#navToggle || !this.#navLinks) return;

    const open  = () => {
      this.#navLinks.classList.add('is-open');
      this.#navToggle.setAttribute('aria-expanded', 'true');
      this.#navToggle.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
      this.#navToggle.classList.add('is-active');
    };

    const close = () => {
      this.#navLinks.classList.remove('is-open');
      this.#navToggle.setAttribute('aria-expanded', 'false');
      this.#navToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
      this.#navToggle.classList.remove('is-active');
    };

    this.#navToggle.addEventListener('click', () => {
      this.#navLinks.classList.contains('is-open') ? close() : open();
    });

    // Fecha ao clicar em link ou fora do menu
    this.#navLinks.querySelectorAll('.nav__link').forEach((link) =>
      link.addEventListener('click', close)
    );

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.#navLinks.classList.contains('is-open')) close();
    });
  }

  // ── Smooth Anchor Links (com offset da nav) ────────────────────────────────
  #initSmoothAnchorLinks() {
    const NAV_HEIGHT =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id     = anchor.getAttribute('href');
        const target = id && id !== '#' ? document.querySelector(id) : null;
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── Card Hover (borda ciano via classe JS) ─────────────────────────────────
  /**
   * Adiciona/remove `.is-hovered` nos cards ao entrar/sair com mouse ou foco.
   * A classe habilita a transição de borda definida no CSS.
   */
  #initCardHover() {
    const cards = document.querySelectorAll('.pillar-card, .service-card');

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
      card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
      card.addEventListener('focusin',    () => card.classList.add('is-hovered'));
      card.addEventListener('focusout',   () => card.classList.remove('is-hovered'));
    });
  }
}
