/**
 * CustomCursor.js
 * Cursor tecnológico com:
 *  - Ponto preciso que segue o mouse exatamente
 *  - Anel lag com interpolação linear (lerp) via rAF
 *  - Estado "is-hovering" em elementos interativos (expande o anel)
 *  - Estado "is-clicking" no mousedown (contrai)
 *  - Desativado em dispositivos touch (pointer: coarse)
 */

export class CustomCursor {
  /** @type {HTMLElement} */
  #dot;
  /** @type {HTMLElement} */
  #ring;

  #mouseX = window.innerWidth / 2;
  #mouseY = window.innerHeight / 2;
  #ringX  = window.innerWidth / 2;
  #ringY  = window.innerHeight / 2;

  /** @type {number} */
  #rafId = null;

  /** Fator de interpolação do anel (0–1). Menor = mais lag. */
  static #LERP = 0.10;

  /** Seletores de elementos que disparam o estado hover no anel. */
  static #INTERACTIVE = 'a, button, [tabindex], .pillar-card, .service-card, label, input, textarea, select';

  constructor() {
    // Só inicializa em dispositivos com ponteiro de precisão (mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');
    this.#createElements();
    this.#bindEvents();
    this.#startLoop();
  }

  // ── Criação dos elementos DOM ──────────────────────────────────────────────
  #createElements() {
    this.#dot = document.createElement('div');
    this.#dot.className = 'cursor-dot';
    this.#dot.setAttribute('aria-hidden', 'true');

    this.#ring = document.createElement('div');
    this.#ring.className = 'cursor-ring';
    this.#ring.setAttribute('aria-hidden', 'true');

    document.body.append(this.#dot, this.#ring);
  }

  // ── Eventos ────────────────────────────────────────────────────────────────
  #bindEvents() {
    // Posição do mouse — ponto segue diretamente via transform
    window.addEventListener('mousemove', (e) => {
      this.#mouseX = e.clientX;
      this.#mouseY = e.clientY;
      this.#dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      // Revela o cursor ao primeiro movimento
      this.#dot.classList.remove('is-hidden');
      this.#ring.classList.remove('is-hidden');
    }, { passive: true });

    // Hover em elementos interativos → expande anel
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(CustomCursor.#INTERACTIVE)) {
        this.#ring.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(CustomCursor.#INTERACTIVE)) {
        this.#ring.classList.remove('is-hovering');
      }
    });

    // Click — pulso de contração
    window.addEventListener('mousedown', () => this.#ring.classList.add('is-clicking'));
    window.addEventListener('mouseup',   () => this.#ring.classList.remove('is-clicking'));
    window.addEventListener('blur',      () => this.#ring.classList.remove('is-clicking'));

    // Sai da janela — esconde cursor
    document.addEventListener('mouseleave', () => {
      this.#dot.classList.add('is-hidden');
      this.#ring.classList.add('is-hidden');
      this.#ring.classList.remove('is-clicking');
    });

    document.addEventListener('mouseenter', () => {
      this.#dot.classList.remove('is-hidden');
      this.#ring.classList.remove('is-hidden');
    });
  }

  // ── rAF Loop — lerp do anel ────────────────────────────────────────────────
  #startLoop() {
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      this.#ringX = lerp(this.#ringX, this.#mouseX, CustomCursor.#LERP);
      this.#ringY = lerp(this.#ringY, this.#mouseY, CustomCursor.#LERP);
      this.#ring.style.transform = `translate(${this.#ringX}px, ${this.#ringY}px)`;
      this.#rafId = requestAnimationFrame(loop);
    };

    this.#rafId = requestAnimationFrame(loop);
  }

  /** Para o loop de animação (para limpeza de memória se necessário). */
  destroy() {
    if (this.#rafId) cancelAnimationFrame(this.#rafId);
    document.documentElement.classList.remove('has-custom-cursor');
    this.#dot?.remove();
    this.#ring?.remove();
  }
}
