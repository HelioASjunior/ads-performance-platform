# Ismael Rodrigues — Landing Page

Landing page profissional para **Ismael Rodrigues**, gestor estratégico de tráfego pago com foco em pequenos e médios negócios.

## Visão Geral

Site institucional de página única (SPA-like) desenvolvido com HTML, CSS e JavaScript puros — sem dependências de frameworks ou bibliotecas externas. O design segue uma identidade visual **high-tech minimalista**, com tipografia expressiva, animações sutis e foco em performance.

## Funcionalidades

- **Animações de entrada** — fade-in na Hero e ScrollReveal baseado em `IntersectionObserver` para as demais seções
- **Cursor customizado** — substituição do cursor nativo por um cursor interativo de alto contraste
- **Navegação sticky** — navbar com efeito glassmorphism ao rolar a página
- **Menu mobile** — hambúrguer responsivo com acessibilidade (ARIA)
- **Smooth scroll** — ancoragem suave entre as seções
- **Hover interativo** — cards de pilares e serviços com efeito de elevação
- **Totalmente responsivo** — breakpoints para mobile, tablet e desktop

## Estrutura do Projeto

```
Landing Page - Ismael/
├── index.html          # Documento principal com toda a estrutura semântica
├── style.css           # Estilos: design tokens, layout, animações, responsividade
├── app.js              # Orquestrador: inicializa os módulos após o DOM carregar
├── modules/
│   ├── UIController.js # ScrollReveal + LandingPage (nav, hero, menu, scroll)
│   └── CustomCursor.js # Lógica do cursor customizado
├── logo.png            # Logo principal de Ismael Rodrigues
└── pi.jpg              # Foto do profissional (seção "Quem sou eu")
```

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura acessível e SEO-friendly |
| CSS3 (Custom Properties) | Design tokens, layout com Grid/Flexbox, animações |
| JavaScript ES Modules | Módulos nativos sem bundler |
| IntersectionObserver API | Animações de scroll performáticas |
| Google Fonts | Plus Jakarta Sans + Space Grotesk |

## Seções

| Seção | ID | Descrição |
|---|---|---|
| Navegação | `#nav` | Sticky com glassmorphism |
| Hero | `#hero` | Identidade visual e chamada principal |
| Quem sou eu | `#quem-sou` | Apresentação e especialidades |
| Posicionamento | `#posicionamento` | Diferencial estratégico |
| Método | `#pilares` | Os 5 pilares do método |
| Serviços | `#servicos` | 4 ofertas detalhadas |
| Contato | `#contato` | CTA WhatsApp + redes sociais |

## Como Executar

O projeto é 100% estático. Por usar ES Modules (`type="module"`), é necessário servir os arquivos por um servidor HTTP local — abrir o `index.html` diretamente no navegador não funciona.

### Com VS Code (Live Server)
```bash
# Instale a extensão "Live Server" e clique em "Go Live" na barra inferior
```

### Com Node.js
```bash
npx serve .
```

### Com Python
```bash
python -m http.server 8080
```

Acesse `http://localhost:8080` (ou a porta indicada).

## Personalização

### Cores e tokens
Todos os valores de design estão centralizados em variáveis CSS no início do `style.css`:

```css
:root {
  --color-primary:    #009DDD;
  --color-highlight:  #05D3F8;
  --color-bg:         #0e0e0e;
  --color-text:       #F4F4F4;
  /* ... */
}
```

### Número do WhatsApp
No `index.html`, altere o link do botão principal:

```html
<a href="https://wa.me/55XXXXXXXXXXX" class="btn btn--whatsapp" ...>
```

Substitua `55XXXXXXXXXXX` pelo DDD + número com código do país.

### Redes sociais
Localize os links na seção `#contato` e substitua o `href="#"` pela URL real:

```html
<a href="https://instagram.com/seuuser" class="contact__social-link" ...>
<a href="https://linkedin.com/in/seuuser" class="contact__social-link" ...>
```

## Acessibilidade

- Estrutura semântica com `<nav>`, `<section>`, `<article>`, `<footer>`
- Atributos ARIA: `aria-label`, `aria-expanded`, `aria-controls`, `aria-live`
- Respeita `prefers-reduced-motion` (animações desativadas se o usuário preferir)
- Navegação funcional por teclado (Tab + Enter/Space)
- Contraste de cores adequado (WCAG AA)

## Desenvolvimento

Desenvolvido por [Hélio Júnior](https://www.linkedin.com/in/heliojunior1218/).
