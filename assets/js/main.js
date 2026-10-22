(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = n => "$" + n.toLocaleString("en-AU");
  const byId = id => PRODUCTS.find(p => p.id === id);

  /* ---------- Rendering ---------- */
  const stars = n => `<span class="stars" aria-label="${n} out of 5 stars">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;

  const card = p => `
    <article class="card">
      <a href="#" class="card-img">${productArt(p.art, p.color)}${p.badge ? `<span class="badge">${p.badge}</span>` : ""}</a>
      <h3 class="card-title">${p.name}</h3>
      <div class="card-meta">
        <span class="price">${p.from ? "From " : ""}${money(p.price)}${p.was ? ` <s>${money(p.was)}</s>` : ""}</span>
        <span class="rating">${stars(p.rating)} <small>${p.reviews} reviews</small></span>
      </div>
      <button class="btn btn-grad btn-sm" data-add="${p.id}">Add to cart</button>
    </article>`;

  $$("[data-products]").forEach(track => {
    const tag = track.dataset.products;
    track.innerHTML = PRODUCTS.filter(p => p.tags.includes(tag)).map(card).join("");
  });

  $("[data-categories]").innerHTML = CATEGORIES.map(c => `
    <a href="#best-sellers" class="cat-tile">
      ${productArt(c.art, c.tint)}
      <span class="cat-label">${c.name}</span>
    </a>`).join("");

  const capRow = $("[data-capacities]"), capResults = $("[data-cap-results]");
  capRow.innerHTML = CAPACITIES.map(c => `
    <button class="cap" style="--shade:${c.shade}" data-cap="${c.tag}"><span class="dot"></span><span>${c.label}</span></button>`).join("");
  capRow.addEventListener("click", e => {
    const btn = e.target.closest("[data-cap]");
    if (!btn) return;
    const active = btn.classList.contains("active");
    $$(".cap", capRow).forEach(b => b.classList.remove("active"));
    if (active) { capResults.hidden = true; return; }
    btn.classList.add("active");
    const list = PRODUCTS.filter(p => p.tags.includes(btn.dataset.cap));
    capResults.innerHTML = list.map(card).join("");
    capResults.hidden = false;
  });

  const projects = [
    { title: "10.2kWh battery retrofit · Newcastle NSW", product: "pc-10", bg: "#ece6f4" },
    { title: "Hybrid inverter + 13.5kWh · Gold Coast QLD", product: "pc-135", bg: "#fbe6ec" },
    { title: "7kW EV charger install · Adelaide SA", product: "ev-7", bg: "#e7eef9" }
  ];
  $("[data-projects]").innerHTML = projects.map((pr, i) => {
    const p = byId(pr.product);
    return `<figure class="proj ${i === 1 ? "tall" : ""}">
      <div class="proj-img">${productArt(p.art, pr.bg)}</div>
      <figcaption><span class="mini">${productArt(p.art, "#fff")}</span><span><strong>${pr.title}</strong><br><small>${p.name} · ${money(p.price)}</small></span></figcaption>
    </figure>`;
  }).join("");

  /* ---------- Carousels ---------- */
  $$("[data-carousel]").forEach(c => {
    const track = $(".car-track", c);
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 280) + 24;
    $("[data-prev]", c).addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    $("[data-next]", c).addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  });

  /* ---------- Cart (client-side until the payment gateway is connected) ---------- */
  const KEY = "cableco-cart";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (_) {} };

  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    $("[data-cart-count]").textContent = count;
    $("[data-cart-count]").classList.toggle("show", count > 0);
    const body = $("[data-cart-items]");
    body.innerHTML = cart.length ? cart.map(i => {
      const p = byId(i.id);
      return `<div class="cart-line">
        <div class="cl-img">${productArt(p.art, p.color)}</div>
        <div class="cl-info"><p>${p.name}</p><strong>${money(p.price * i.qty)}</strong>
          <div class="qty"><button data-qty="-1" data-id="${p.id}" aria-label="Decrease">−</button><span>${i.qty}</span><button data-qty="1" data-id="${p.id}" aria-label="Increase">+</button></div>
        </div>
        <button class="cl-remove" data-remove="${p.id}" aria-label="Remove">×</button>
      </div>`;
    }).join("") : `<p class="empty">Your cart is empty.</p>`;
    $("[data-cart-subtotal]").textContent = money(cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0));
    $("[data-checkout]").disabled = !cart.length;
  }

  const drawer = $(".cart-drawer");
  const openCart = () => { document.body.classList.add("cart-open"); drawer.setAttribute("aria-hidden", "false"); };
  const closeCart = () => { document.body.classList.remove("cart-open"); drawer.setAttribute("aria-hidden", "true"); };

  let toastTimer;
  function toast(msg) {
    const t = $("[data-toast]");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const line = cart.find(i => i.id === add.dataset.add);
      line ? line.qty++ : cart.push({ id: add.dataset.add, qty: 1 });
      save(); renderCart(); toast("Added to cart"); openCart();
      return;
    }
    const q = e.target.closest("[data-qty]");
    if (q) {
      const line = cart.find(i => i.id === q.dataset.id);
      line.qty += +q.dataset.qty;
      if (line.qty < 1) cart = cart.filter(i => i !== line);
      save(); renderCart(); return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) { cart = cart.filter(i => i.id !== rm.dataset.remove); save(); renderCart(); return; }
    if (e.target.closest("[data-cart-open]")) { openCart(); return; }
    if (e.target.closest("[data-cart-close]")) { closeCart(); return; }
    if (e.target.closest("[data-checkout]")) { location.href = "/checkout"; return; }
    if (e.target.closest("[data-menu-toggle]")) { document.body.classList.toggle("menu-open"); return; }
    if (e.target.closest("[data-menu] a")) document.body.classList.remove("menu-open");
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

  $("[data-newsletter]").addEventListener("submit", e => {
    e.preventDefault(); e.target.reset(); toast("Thanks — you're on the list");
  });
  $("[data-year]").textContent = new Date().getFullYear();

  renderCart();
})();
