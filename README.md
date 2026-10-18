# Ismael Rodrigues — Landing Page

Landing page profissional para **Ismael Rodrigues**, gestor estratégico de tráfego pago com foco em pequenos e médios negócios.

## Visão Geral

Site de página única em HTML puro, sem frameworks nem build. Todo o CSS, o JavaScript e as imagens ficam embutidos no próprio `index.html` (imagens em WebP/base64), então o site não depende de arquivos externos além das fontes do Google.

## Estrutura do Projeto

```
├── index.html               # Página completa (HTML + CSS + JS + imagens embutidas)
├── favicon.ico              # Favicon (16/32/48 px)
├── favicon-512.png          # Favicon 512x512
├── apple-touch-icon.png     # Ícone para iPhone (180x180)
├── og-image.jpg             # Prévia de compartilhamento (1200x630)
├── robots.txt               # Regras para buscadores + link do sitemap
├── sitemap.xml              # Sitemap do domínio ismaelrodrigues.com.br
└── vercel.json              # Configuração de deploy na Vercel
```

## Seções

| Seção | ID |
|---|---|
| Sobre | `#sobre` |
| Árvore de talentos | `#talentos` |
| IA | `#ia` |
| Método | `#metodo` |
| Planos | `#planos` |
| Dado | `#dado` |
| Dúvidas | `#duvidas` |
| Contato | `#contato` |

## Como Executar

O projeto é 100% estático: basta abrir o `index.html` no navegador ou servir a pasta com qualquer servidor HTTP.

```bash
npx serve .
# ou
python -m http.server 8080
```

## Personalização

- **Cores:** variáveis CSS no `:root`, no início do `<style>` do `index.html`.
- **WhatsApp:** links `https://wa.me/5537999344500?...` no `index.html`.
- **Domínio:** se mudar, atualize `canonical`/`og:url`/`og:image` no `index.html`, o `robots.txt` e o `sitemap.xml`.

## Desenvolvimento

Desenvolvido por [Hélio Júnior](https://www.linkedin.com/in/heliojunior1218/).
