(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = n => "$" + n.toLocaleString("en-AU", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const byId = id => PRODUCTS.find(p => p.id === id);

  /* Placeholder fees — replace with real rates when the payment gateway goes live. */
  const DELIVERY_FEE = 149;
  const INSTALL_STATES = ["NSW", "QLD", "SA"];

  const KEY = "cableco-cart";
  let cart = [];
  try { cart = (JSON.parse(localStorage.getItem(KEY)) || []).filter(i => byId(i.id)); } catch (_) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (_) {} };

  const form = $("[data-form]");
  const grid = $("[data-checkout-grid]");
  let discount = 0;

  $("[data-year]").textContent = new Date().getFullYear();

  function totals() {
    const subtotal = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
    const fulfil = form.fulfil.value;
    const delivery = fulfil === "deliver" ? DELIVERY_FEE : 0;
    const off = Math.round(subtotal * discount);
    const total = subtotal - off + delivery;
    return { subtotal, delivery, off, total, gst: total / 11, fulfil };
  }

  function render() {
    if (!cart.length) { grid.hidden = true; $("[data-empty]").hidden = false; return; }
    $("[data-lines]").innerHTML = cart.map(i => {
      const p = byId(i.id);
      return `<div class="co-line">
        <div class="co-line-img">${productArt(p.art, p.color)}<span class="co-qty-badge">${i.qty}</span></div>
        <div class="co-line-info"><p>${p.name}</p>
          <div class="qty"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Decrease">−</button><span>${i.qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Increase">+</button></div>
        </div>
        <strong>${money(p.price * i.qty)}</strong>
      </div>`;
    }).join("");

    const t = totals();
    $("[data-subtotal]").textContent = money(t.subtotal) + (t.off ? ` (−${money(t.off)})` : "");
    $("[data-delivery]").textContent = t.fulfil === "deliver" ? money(t.delivery) : t.fulfil === "collect" ? "Free" : "Included in quote";
    $("[data-install]").closest("div").hidden = t.fulfil !== "install";
    $("[data-total]").textContent = money(t.total);
    $("[data-total-btn]").textContent = money(t.total);
    $("[data-gst]").textContent = money(Math.round(t.gst * 100) / 100);
    $("[data-office]").hidden = t.fulfil !== "collect";
  }

  document.addEventListener("click", e => {
    const q = e.target.closest("[data-qty]");
    if (!q) return;
    const line = cart.find(i => i.id === q.dataset.id);
    line.qty += +q.dataset.qty;
    if (line.qty < 1) cart = cart.filter(i => i !== line);
    save(); render();
  });

  form.addEventListener("change", e => {
    if (e.target.name === "state") {
      const ok = !e.target.value || INSTALL_STATES.includes(e.target.value);
      $("[data-state-hint]").hidden = ok;
      const install = $('input[value="install"]');
      install.disabled = !ok;
      if (!ok && install.checked) $('input[value="deliver"]').checked = true;
    }
    $$(".option").forEach(o => o.classList.toggle("selected", $("input", o).checked));
    render();
  });

  $("[data-promo]").addEventListener("submit", e => {
    e.preventDefault();
    const msg = $("[data-promo-msg]");
    msg.hidden = false;
    msg.textContent = e.target.code.value.trim() ? "That code isn't valid." : "Enter a discount code.";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    $$("input, select, textarea", form).forEach(el => {
      const bad = !el.disabled && !el.checkValidity();
      el.closest(".field, .check")?.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });
    $("[data-error]").hidden = valid;
    if (!valid) { $(".invalid", form)?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }

    // TODO: send cart + customer details to the payment gateway (e.g. create a Stripe Checkout session) here.
    const ref = "CC-" + Date.now().toString(36).toUpperCase().slice(-6);
    $("[data-done-name]").textContent = form.first.value.trim();
    $("[data-done-ref]").textContent = ref;
    cart = []; save();
    grid.hidden = true; $(".co-back").hidden = true;
    $("[data-done]").hidden = false;
    window.scrollTo({ top: 0 });
  });

  $$(".option").forEach(o => o.classList.toggle("selected", $("input", o).checked));
  render();
})();
