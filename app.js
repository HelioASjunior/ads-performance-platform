/**
 * app.js — Orquestrador da Landing Page
 * Importa e inicializa todos os módulos após o DOM estar pronto.
 */

import { LandingPage, ScrollReveal } from './modules/UIController.js';
import { CustomCursor }              from './modules/CustomCursor.js';

document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
  new ScrollReveal();

  const app = new LandingPage();
  app.init();
});
