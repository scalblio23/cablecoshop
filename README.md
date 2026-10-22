# Cable Co Shop

Static storefront for Cable Co solar batteries and accessories.

- `index.html` – home page (layout modelled on a modern DTC store: hero, categories, best sellers, promo, trending, shop by capacity, feature, USPs, projects, footer)
- `assets/js/products.js` – placeholder catalogue + inline SVG product art (swap for real product data/photos)
- `assets/js/main.js` – rendering, carousels, and a client-side cart drawer (localStorage)
- `assets/css/styles.css` – styles (Cable Co navy + purple→pink gradient)

Checkout currently shows a "coming soon" note. Next step: connect a payment gateway (e.g. Stripe Checkout or Shopify) using the cart contents.

Run locally: `npx serve .` (or any static server) and open http://localhost:3000.
