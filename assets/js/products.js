/*
 * Product catalogue (placeholder data).
 * Swap this for the store / payment-gateway product feed when checkout is wired up.
 * Prices are AUD, GST inclusive.
 */
window.CATEGORIES = [
  { id: "batteries",  name: "Home Batteries",    art: "battery",  tint: "#efe9f7" },
  { id: "inverters",  name: "Hybrid Inverters",  art: "inverter", tint: "#fbe6ec" },
  { id: "ev",         name: "EV Charging",       art: "charger",  tint: "#e7eef9" },
  { id: "monitoring", name: "Monitoring",        art: "meter",    tint: "#f3e9f5" },
  { id: "backup",     name: "Backup & Safety",   art: "gateway",  tint: "#eaf0f3" },
  { id: "mounting",   name: "Cables & Mounting", art: "cable",    tint: "#fbe6ec" }
];

window.PRODUCTS = [
  { id: "pc-5",    cat: "batteries",  name: "PowerCell 5 Home Battery – 5.1kWh",          price: 4290,  rating: 5, reviews: 18, art: "battery",  color: "#e9e3f3", tags: ["best", "5"] },
  { id: "pc-10",   cat: "batteries",  name: "PowerCell 10 Home Battery – 10.2kWh",        price: 7490,  was: 8190, rating: 5, reviews: 42, art: "battery", color: "#f8e1e8", tags: ["best", "trend", "10"], badge: "Sale" },
  { id: "pc-135",  cat: "batteries",  name: "PowerCell 13.5 Whole-Home Battery",          price: 9890,  rating: 5, reviews: 27, art: "battery",  color: "#dfe6f2", tags: ["best", "13.5"] },
  { id: "ps-mod",  cat: "batteries",  name: "PowerStack Modular Battery – 15 to 30kWh",   price: 11990, from: true, rating: 4, reviews: 9, art: "stack", color: "#e6e1ef", tags: ["trend", "15", "20", "30"], badge: "New" },
  { id: "inv-5",   cat: "inverters",  name: "Hybrid Inverter 5kW – Single Phase",         price: 2190,  rating: 5, reviews: 21, art: "inverter", color: "#e6e3f1", tags: ["best"] },
  { id: "inv-10",  cat: "inverters",  name: "Hybrid Inverter 10kW – Three Phase",         price: 3690,  rating: 4, reviews: 11, art: "inverter", color: "#e3e9f1", tags: ["trend"] },
  { id: "ev-7",    cat: "ev",         name: "Smart EV Charger 7kW – Tethered",            price: 1290,  rating: 5, reviews: 33, art: "charger",  color: "#e6ecf6", tags: ["best", "trend"] },
  { id: "mon-1",   cat: "monitoring", name: "Smart Energy Monitor + App",                 price: 349,   rating: 5, reviews: 56, art: "meter",    color: "#efe6f4", tags: ["trend"] },
  { id: "gw-1",    cat: "backup",     name: "Backup Gateway – Blackout Protection",       price: 1190,  rating: 5, reviews: 14, art: "gateway",  color: "#e5edf1", tags: ["best"] },
  { id: "iso-kit", cat: "backup",     name: "DC Isolator & Surge Protection Kit",         price: 189,   rating: 4, reviews: 8,  art: "isolator", color: "#f8e1e8", tags: ["trend"] },
  { id: "mnt-kit", cat: "mounting",   name: "Battery Wall Mount & Bollard Kit",           price: 249,   rating: 5, reviews: 12, art: "bracket",  color: "#ebe7f1", tags: [] },
  { id: "cbl-6",   cat: "mounting",   name: "Solar DC Cable 6mm² – 100m Roll",            price: 229,   rating: 5, reviews: 19, art: "cable",    color: "#f6e4ec", tags: ["trend"] },
  { id: "enc-1",   cat: "backup",     name: "Weatherproof Battery Enclosure",             price: 890,   rating: 4, reviews: 6,  art: "enclosure",color: "#e2e8ef", tags: [] }
];

window.CAPACITIES = [
  { label: "5kWh",   tag: "5",    shade: "#cfc3e6" },
  { label: "10kWh",  tag: "10",   shade: "#b39ad6" },
  { label: "13.5kWh",tag: "13.5", shade: "#9a78c6" },
  { label: "15kWh",  tag: "15",   shade: "#c56aa3" },
  { label: "20kWh",  tag: "20",   shade: "#e8456b" },
  { label: "30kWh+", tag: "30",   shade: "#16243f" }
];

/* Inline SVG product illustrations — stand-ins until real product photography is supplied. */
window.productArt = function (type, bg) {
  const navy = "#16243f", purple = "#6b4c9a", pink = "#e8456b";
  const grad = `<defs><linearGradient id="g-${type}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${purple}"/><stop offset="1" stop-color="${pink}"/></linearGradient></defs>`;
  const shadow = `<ellipse cx="100" cy="182" rx="56" ry="7" fill="${navy}" opacity=".08"/>`;
  const g = `url(#g-${type})`;
  const shapes = {
    battery: `
      <rect x="62" y="28" width="76" height="150" rx="14" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="62" y="28" width="76" height="150" rx="14" fill="url(#sheen)" opacity=".5"/>
      <rect x="97" y="58" width="6" height="70" rx="3" fill="${g}"/>
      <circle cx="100" cy="146" r="4" fill="${navy}" opacity=".25"/>`,
    stack: `
      <rect x="58" y="22" width="84" height="44" rx="10" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="58" y="72" width="84" height="44" rx="10" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="58" y="122" width="84" height="56" rx="10" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="74" y="42" width="52" height="4" rx="2" fill="${g}"/><rect x="74" y="92" width="52" height="4" rx="2" fill="${g}"/>
      <rect x="74" y="146" width="52" height="4" rx="2" fill="${g}"/>`,
    inverter: `
      <rect x="52" y="40" width="96" height="124" rx="12" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="72" y="62" width="56" height="30" rx="5" fill="${navy}"/>
      <path d="M80 80 l8-8 6 6 10-10 8 6" fill="none" stroke="${g}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <g fill="${navy}" opacity=".15"><rect x="72" y="110" width="56" height="3" rx="1.5"/><rect x="72" y="118" width="56" height="3" rx="1.5"/><rect x="72" y="126" width="56" height="3" rx="1.5"/></g>
      <circle cx="100" cy="146" r="5" fill="${g}"/>`,
    charger: `
      <rect x="66" y="34" width="68" height="100" rx="18" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <path d="M104 62 l-14 20 h12 l-6 18 16-24 h-12z" fill="${g}"/>
      <path d="M100 134 c0 30 -40 20 -40 44" fill="none" stroke="${navy}" stroke-width="6" stroke-linecap="round"/>
      <rect x="48" y="168" width="24" height="14" rx="4" fill="${navy}"/>`,
    meter: `
      <rect x="54" y="50" width="92" height="104" rx="16" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <path d="M72 120 a28 28 0 0 1 56 0" fill="none" stroke="${navy}" stroke-opacity=".1" stroke-width="8" stroke-linecap="round"/>
      <path d="M72 120 a28 28 0 0 1 46 -21" fill="none" stroke="${g}" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="140" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="700" fill="${navy}">4.2 kW</text>`,
    gateway: `
      <rect x="56" y="38" width="88" height="128" rx="12" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <path d="M100 66 l22 9 v18 c0 16 -10 26 -22 31 c-12 -5 -22 -15 -22 -31 v-18z" fill="${g}"/>
      <path d="M90 94 l7 7 14 -14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="80" y="140" width="40" height="4" rx="2" fill="${navy}" opacity=".15"/>`,
    isolator: `
      <rect x="62" y="56" width="76" height="96" rx="10" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <circle cx="100" cy="98" r="22" fill="${navy}" opacity=".06"/>
      <rect x="92" y="74" width="16" height="48" rx="6" fill="${g}" transform="rotate(-35 100 98)"/>
      <text x="100" y="140" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="9" font-weight="700" fill="${navy}" opacity=".5">ON  |  OFF</text>`,
    bracket: `
      <rect x="60" y="40" width="80" height="16" rx="4" fill="${navy}" opacity=".85"/>
      <rect x="66" y="56" width="10" height="100" rx="3" fill="${navy}" opacity=".7"/>
      <rect x="124" y="56" width="10" height="100" rx="3" fill="${navy}" opacity=".7"/>
      <rect x="86" y="120" width="28" height="56" rx="14" fill="${g}"/>
      <rect x="86" y="132" width="28" height="6" fill="#fff" opacity=".6"/><rect x="86" y="148" width="28" height="6" fill="#fff" opacity=".6"/>`,
    cable: `
      <circle cx="100" cy="104" r="56" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <circle cx="100" cy="104" r="44" fill="none" stroke="${g}" stroke-width="10"/>
      <circle cx="100" cy="104" r="30" fill="none" stroke="${navy}" stroke-width="8" opacity=".85"/>
      <circle cx="100" cy="104" r="14" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>`,
    enclosure: `
      <path d="M52 64 L100 36 L148 64 V170 H52Z" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="68" y="78" width="64" height="76" rx="8" fill="${navy}" opacity=".06"/>
      <rect x="82" y="88" width="36" height="58" rx="8" fill="#fff" stroke="${navy}" stroke-opacity=".12"/>
      <rect x="97" y="100" width="6" height="30" rx="3" fill="${g}"/>`
  };
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    ${grad}<defs><linearGradient id="sheen" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="${navy}" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <rect width="200" height="200" fill="${bg || "#f1eef6"}"/>${shadow}${shapes[type] || shapes.battery}</svg>`;
};
