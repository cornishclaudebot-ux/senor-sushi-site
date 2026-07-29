/* ============================================================
   SEÑOR SUSHI PHOENIX — shared app logic + data
   Every value below traces to a real source:
   the live senorsushiphoenix.com site, the printed menu scans on it,
   their Facebook about page, review platforms, or a delivery
   platform page verified live 2026-07-29.
   ============================================================ */
const CONFIG = {
  name: "Señor Sushi Phoenix",
  // --- ORDERING (all verified live 2026-07-29 against 4324 W Indian School Rd) ---
  direct: "https://senorsushi1.netwaiter.com/", // their own NetWaiter ordering portal
  grubhub: "https://grubhub.com/restaurant/seor-sushi-phoenix-4324-w-indian-school-rd-phoenix/2041196?classicAffiliateId=%2Fr%2Fw%2F2041196%2F&utm_source=kitchen.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=2041196",
  uber: "https://www.ubereats.com/store/senor-sushi/yJClZDA_RPu3c7Et_yGQow",
  doordash: "https://www.doordash.com/store/senor-sushi-phoenix-137484/", // delivery only
  postmates: "https://postmates.com/store/senor-sushi/yJClZDA_RPu3c7Et_yGQow",
  seamless: "https://www.seamless.com/menu/seor-sushi-phoenix-4324-w-indian-school-rd-phoenix/2041196",
  // --- CONTACT ---
  phone: "(623) 849-9312",
  phoneRaw: "+16238499312",
  email: "info@senorsushiphoenix.com",
  address: "4324 W Indian School Rd, Phoenix, AZ 85031",
  // --- SOCIALS ---
  ig: "https://www.instagram.com/senorsushiofficial",
  fb: "https://www.facebook.com/senorsushiaz/",
  // --- HAPPY HOUR (printed happy-hour menu) ---
  happyHour: "Monday to Friday, 2:00 PM to 7:00 PM",
  // --- HOURS (consensus of Yelp, Restaurantji, NetWaiter, Restaurant Guru
  //     and the Uber Eats store listing, all read 2026-07-29; 0=Sun..6=Sat) ---
  hours: [
    {open:11, close:22}, {open:11, close:22}, {open:11, close:22}, {open:11, close:22},
    {open:11, close:22}, {open:11, close:23}, {open:11, close:23}
  ],
  // --- THE FAMILY (printed menu footer: all three locations) ---
  locations: [
    { name: "Señor Sushi Phoenix", addr: "4324 W Indian School Rd", city: "Phoenix, AZ 85031", tel: "(623) 849-9312", telRaw: "+16238499312" },
    { name: "Señor Sushi Mesa",    addr: "1356 W Southern Ave",     city: "Mesa, AZ 85202",    tel: "(480) 629-4731", telRaw: "+14806294731" },
    { name: "Señor Sushi Peoria",  addr: "10738 N 75th Ave",        city: "Peoria, AZ 85345",  tel: "(623) 248-1508", telRaw: "+16232481508" }
  ]
};
CONFIG.mapGoogle = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.address);
CONFIG.mapApple  = "https://maps.apple.com/?q=" + encodeURIComponent(CONFIG.address);
CONFIG.locations.forEach(l => {
  const q = encodeURIComponent(l.name + ", " + l.addr + ", " + l.city);
  l.mapGoogle = "https://www.google.com/maps/search/?api=1&query=" + q;
  l.mapApple  = "https://maps.apple.com/?q=" + q;
});

/* ---- dishes: their own photography, names and prices off the printed menu ---- */
const FEATURED = [
  {n:"Culichi Roll",      p:"$18.75", img:"assets/food/culichi-roll.jpg"},
  {n:"Carne Asada Roll",  p:"$16.75", img:"assets/food/carne-asada-roll.jpg"},
  {n:"Bomba",             p:"$17.25", img:"assets/food/bomba.jpg"},
  {n:"Guamuchilito Roll", p:"$16.95", img:"assets/food/guamuchilito-roll.jpg"},
  {n:"Mexican Roll",      p:"$15.75", img:"assets/food/mexican-roll.jpg"},
  {n:"Caramelo Roll",     p:"$15.95", img:"assets/food/caramelo-roll.jpg"}
];
const FAVORITES = [
  {n:"Rainbow Roll",           p:"$16.95", img:"assets/food/rainbow-roll.jpg"},
  {n:"Fire Cracker Jalapenos", p:"$13.25", img:"assets/food/fire-cracker-jalapenos.jpg"},
  {n:"Rock and Roll",          p:"$18.25", img:"assets/food/rock-and-roll.jpg"},
  {n:"Poison Ivy Roll",        p:"$16.25", img:"assets/food/poison-ivy-roll.jpg"},
  {n:"Las Vegas Roll",         p:"$12.95", img:"assets/food/las-vegas-roll.jpg"},
  {n:"Teriyaki Chicken",       p:"$12.95", img:"assets/food/teriyaki-chicken.jpg"}
];

/* ---- real guest reviews, quoted exactly (sources read 2026-07-29) ---- */
const REVIEWS = [
  {q:"Best Mexican Sushi in Phoenix! We go at least once a week, the Jalapeno Poppers are amazing.", s:"TripAdvisor review"},
  {q:"MASSIVE rolls! Could probably have ordered half and had more than enough still. Every staffer was amazing.", s:"Google review"},
  {q:"Very tasty, very fun, this place will definitely change your mind forever about Sushi options.", s:"TripAdvisor review"}
];

/* ---- menu-page hover photos ---- */
const MENU_PHOTOS = {
  culichiroll:"assets/food/culichi-roll.jpg", carneasadaroll:"assets/food/carne-asada-roll.jpg",
  bomba:"assets/food/bomba.jpg", guamuchilitoroll:"assets/food/guamuchilito-roll.jpg",
  mexicanroll:"assets/food/mexican-roll.jpg", rainbowroll:"assets/food/rainbow-roll.jpg",
  firecrackerjalapenos:"assets/food/fire-cracker-jalapenos.jpg",
  carameloroll:"assets/food/caramelo-roll.jpg", lasvegasroll:"assets/food/las-vegas-roll.jpg",
  greenmussels:"assets/food/green-mussels.jpg", calamaritempura:"assets/food/calamari-tempura.jpg",
  poisonivyroll:"assets/food/poison-ivy-roll.jpg", rockandroll:"assets/food/rock-and-roll.jpg",
  teriyakichicken:"assets/food/teriyaki-chicken.jpg", grilledsalmonwithfriedrice:"assets/food/grilled-salmon-fried-rice.jpg",
  grilledsalmonwithvegetables:"assets/food/grilled-salmon-vegetables.jpg", grilledchickensalad:"assets/food/grilled-chicken-salad.jpg",
  bonelesschickenwingsonabedoffries:"assets/food/boneless-wings-fries.jpg", lilburgers:"assets/food/lil-burgers.jpg"
};

/* ---- icons (inline SVG, house rule: no emojis) ---- */
const IC = {
  ig:'<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 5 5 .06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.2 3.3-1.7 4.8-5 5-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-3.3-.2-4.8-1.7-5-5C2.04 15.6 2 15.2 2 12s0-3.6.07-4.9c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.4a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>',
  fb:'<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0022 12z"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm1 11h5v2h-7V6h2z"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.24 1z"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zm2 4 6 4 6-4"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  bar:'<svg viewBox="0 0 24 24"><path d="M5 3h14a1 1 0 011 1v7a8 8 0 01-16 0V4a1 1 0 011-1zm2 16h10v2H7z"/></svg>',
  family:'<svg viewBox="0 0 24 24"><path d="M16 11a4 4 0 10-4-4 4 4 0 004 4zm-8 0a4 4 0 10-4-4 4 4 0 004 4zm0 2c-2.7 0-8 1.3-8 4v3h10v-3c0-1 .4-1.9 1-2.6A13 13 0 008 13zm8 0c-.4 0-.8 0-1.3.05A5 5 0 0118 17v3h6v-3c0-2.7-5.3-4-8-4z"/></svg>',
  kids:'<svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 015 5c0 1.7-.8 3.2-2.1 4.1A7 7 0 0119 17v5h-2v-5a5 5 0 00-10 0v5H5v-5a7 7 0 014.1-5.9A5 5 0 017 7a5 5 0 015-5zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>'
};

/* ============================================================
   BUILD shared chrome (nav + footer)
   ============================================================ */
document.documentElement.classList.add('js');
const path = location.pathname.split('/').pop() || 'index.html';
const isHome = path === '' || path === 'index.html';
const home = isHome ? '' : 'index.html';

function buildNav(){
  const mount = document.getElementById('nav-mount'); if(!mount) return;
  const active = (h)=> (h===path || (isHome && h==='index.html')) ? ' class="active"' : '';
  const NAV = [
    {h:'menu.html', t:'Menu'},
    {h:'specials.html', t:'Happy Hour'},
    {h:'contact.html', t:'Contact'}
  ];
  mount.outerHTML = `
  <header class="site" id="header">
    <nav class="nav">
      <a href="index.html" class="brand" aria-label="Senor Sushi Phoenix home"><img src="assets/brand/logo.png" alt="Señor Sushi Phoenix"></a>
      <div class="nav-pill">
        ${NAV.map(l=>`<a href="${l.h}"${active(l.h)}>${l.t}</a>`).join('')}
        <a href="${CONFIG.direct}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">Order online</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </nav>
  </header>
  <div class="mobile-menu" id="mobileMenu">
    <a href="index.html">Home</a>
    ${NAV.map(l=>`<a href="${l.h}">${l.t}</a>`).join('')}
    <a href="${CONFIG.direct}" target="_blank" rel="noopener" class="btn btn-gold">Order online</a>
    <div class="mm-social">
      <a href="${CONFIG.ig}" target="_blank" rel="noopener" aria-label="Instagram">${IC.ig}</a>
      <a href="${CONFIG.fb}" target="_blank" rel="noopener" aria-label="Facebook">${IC.fb}</a>
    </div>
  </div>`;
}

function buildFooter(){
  const mount = document.getElementById('footer-mount'); if(!mount) return;
  const locs = CONFIG.locations.map(l=>`<a href="${l.mapGoogle}" target="_blank" rel="noopener">${l.name.replace('Señor Sushi ','')} · ${l.addr}</a>`).join('');
  mount.outerHTML = `
  <footer class="site">
    <div class="foot-inner">
      <div class="foot-brand">
        <img src="assets/brand/logo.png" alt="Señor Sushi">
        <p>A Mexican-Japanese blend, made locally in Phoenix for a one-of-a-kind fusion experience. Since 2012.</p>
        <div class="socials" style="margin-top:16px">
          <a href="${CONFIG.ig}" target="_blank" rel="noopener" aria-label="Instagram">${IC.ig}</a>
          <a href="${CONFIG.fb}" target="_blank" rel="noopener" aria-label="Facebook">${IC.fb}</a>
        </div>
      </div>
      <div class="foot-col"><h5>Explore</h5>
        <a href="menu.html">The Menu</a><a href="specials.html">Happy Hour</a><a href="contact.html">Contact</a><a href="${home}#order">Order</a>
      </div>
      <div class="foot-col"><h5>Order Online</h5>
        <a href="${CONFIG.direct}" target="_blank" rel="noopener">Order Direct</a>
        <a href="${CONFIG.grubhub}" target="_blank" rel="noopener">Grubhub</a>
        <a href="${CONFIG.uber}" target="_blank" rel="noopener">Uber Eats</a>
        <a href="${CONFIG.doordash}" target="_blank" rel="noopener">DoorDash</a>
      </div>
      <div class="foot-col"><h5>Three Valley Locations</h5>
        ${locs}
        <a href="tel:${CONFIG.phoneRaw}">Phoenix · ${CONFIG.phone}</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Señor Sushi Phoenix · 4324 W Indian School Rd, Phoenix, AZ</span>
      <span>This is... Señor Sushi</span>
    </div>
  </footer>`;
}

/* ============================================================
   INIT
   ============================================================ */
buildNav(); buildFooter();

// resolve data-cfg links anywhere on the page
const mapApple = CONFIG.mapApple, mapGoogle = CONFIG.mapGoogle;
document.querySelectorAll('[data-cfg]').forEach(el=>{
  const k = el.getAttribute('data-cfg');
  const map = {direct:CONFIG.direct,grubhub:CONFIG.grubhub,uber:CONFIG.uber,doordash:CONFIG.doordash,postmates:CONFIG.postmates,seamless:CONFIG.seamless,
               ig:CONFIG.ig,fb:CONFIG.fb,map:mapGoogle,mapgoogle:mapGoogle,mapapple:mapApple};
  if(k in map) el.href = map[k];
  else if(k==='tel'){ el.href="tel:"+CONFIG.phoneRaw; if(!el.textContent.trim())el.textContent=CONFIG.phone; }
  else if(k==='mail'){ el.href="mailto:"+CONFIG.email; if(!el.textContent.trim())el.textContent=CONFIG.email; }
});

// header scroll state
const header=document.getElementById('header');
if(header) addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});

// mobile menu
const ham=document.getElementById('hamburger'), mm=document.getElementById('mobileMenu');
if(ham){ ham.addEventListener('click',()=>mm.classList.toggle('open'));
  mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open'))); }

// live open/closed pill (reads the sourced CONFIG.hours schedule)
(function(){
  const pillEl=document.getElementById('livePill'); if(!pillEl) return;
  const now=new Date(); const day=now.getDay(); const h=now.getHours()+now.getMinutes()/60;
  const today=CONFIG.hours[day];
  const txt=document.getElementById('liveText');
  const fmt=t=>{ const hr=t%12===0?12:t%12; return hr+(t>=12?' PM':' AM'); };
  if(h>=today.open && h<today.close){
    txt.textContent='Open now · til '+fmt(today.close);
  } else {
    const next=h<today.open?today:CONFIG.hours[(day+1)%7];
    txt.textContent='Opens '+fmt(next.open);
  }
})();

// accolade ticker (every phrase from their menus, listings or brand)
function fillMarquee(id, items){
  const t=document.getElementById(id); if(!t) return;
  const set=items.map(x=>`<span>${x}</span>`).join('');
  t.innerHTML=set+set;
}
fillMarquee('mq1',["Family Owned","Culichi Style","Since 2012","4324 W. Indian School Rd, Phoenix","Happy Hour Mon to Fri 2 to 7","Micheladas and Sake Bombers","Fresh Daily"]);

// dish card renderer
function dishCard(f, i, cls){
  return `<a class="dish reveal${i%4? ' d'+(i%4):''}" href="menu.html">
    <img src="${f.img}" alt="${f.n}, from the Señor Sushi menu" loading="lazy">
    <div class="d-meta"><h3>${f.n}</h3><span class="d-price">${f.p}</span></div>
  </a>`;
}
(function(){
  const feat=document.getElementById('featured-row');
  if(feat) feat.innerHTML=FEATURED.map((f,i)=>dishCard(f,i)).join('');
  const fav=document.getElementById('favorites-grid');
  if(fav) fav.innerHTML=FAVORITES.map((f,i)=>dishCard(f,i)).join('');
})();

// real reviews
(function(){
  const host=document.getElementById('t-grid'); if(!host) return;
  const stars='<div class="t-stars">'+IC.star.repeat(5)+'</div>';
  host.innerHTML=REVIEWS.map((r,i)=>`
    <article class="t-card reveal${i? ' d'+i:''}">
      ${stars}
      <p>"${r.q}"</p>
      <div class="t-src">${r.s}</div>
    </article>`).join('');
})();

// visit map deep link (auto-pick Apple on Apple platforms)
(function(){
  const mapEl=document.getElementById('visit-map'); if(!mapEl) return;
  const isApple=/Mac|iPhone|iPad|iPod/.test(navigator.platform||'') || /Mac OS X/.test(navigator.userAgent||'');
  const url=isApple?CONFIG.mapApple:CONFIG.mapGoogle;
  mapEl.addEventListener('click',()=>window.open(url,'_blank','noopener'));
})();

// location cards: whole card opens directions
document.querySelectorAll('.loc[data-loc]').forEach(card=>{
  const i=+card.getAttribute('data-loc');
  const l=CONFIG.locations[i]; if(!l) return;
  const isApple=/Mac|iPhone|iPad|iPod/.test(navigator.platform||'') || /Mac OS X/.test(navigator.userAgent||'');
  card.addEventListener('click',(e)=>{
    if(e.target.closest('a')) return;
    window.open(isApple?l.mapApple:l.mapGoogle,'_blank','noopener');
  });
});

// contact form: honest mailto compose + visible fallback
(function(){
  const form=document.getElementById('contactForm'); if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const g=id=>document.getElementById(id).value;
    const subject=`Website message from ${g('fName')}`;
    const body=`Name: ${g('fName')}\nEmail: ${g('fEmail')}\nPhone: ${g('fPhone')||"Not given"}\n\n${g('fMsg')}\n\nSent from the Señor Sushi Phoenix website`;
    window.location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.style.display='none';
    document.getElementById('formSuccess').classList.add('show');
  });
})();

/* ---------- menu item -> photo hover preview (their real shots) ---------- */
(function(){
  const list=[...document.querySelectorAll('.menu-list li')];
  if(!list.length) return;
  const PH=MENU_PHOTOS, keys=Object.keys(PH);
  const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'');
  function findPhoto(name){
    const n=norm(name); if(!n) return null;
    if(PH[n]) return PH[n];
    for(const k of keys){ if(k.length>=4 && (k.indexOf(n)===0 || n.indexOf(k)===0)) return PH[k]; }
    for(const k of keys){ if(k.length>=5 && (k.includes(n) || n.includes(k))) return PH[k]; }
    return null;
  }
  const prev=document.createElement('div'); prev.className='menu-preview'; prev.setAttribute('aria-hidden','true');
  prev.innerHTML='<img alt="">'; document.body.appendChild(prev);
  const pimg=prev.querySelector('img'); let touchOpen=false;
  list.forEach(li=>{
    const nameEl=li.querySelector('.mi-name'); if(!nameEl) return;
    const name=(nameEl.childNodes[0]&&nameEl.childNodes[0].textContent)||nameEl.textContent;
    const photo=findPhoto(name); if(!photo) return;
    li.classList.add('has-photo');
    li.addEventListener('mouseenter',()=>{ if(pimg.getAttribute('src')!==photo) pimg.src=photo; prev.classList.add('show'); });
    li.addEventListener('mousemove',(e)=>{
      const x=Math.min(e.clientX+22, innerWidth-258), y=Math.min(Math.max(e.clientY-90,12), innerHeight-200);
      prev.style.transform='translate('+x+'px,'+y+'px)';
    });
    li.addEventListener('mouseleave',()=>{ prev.classList.remove('show'); });
    li.addEventListener('click',()=>{ pimg.src=photo; touchOpen=!touchOpen; prev.classList.toggle('show',touchOpen); prev.style.transform='translate('+Math.round(innerWidth/2-118)+'px,'+Math.round(innerHeight/2-100)+'px)'; });
  });
})();

/* ---------- scroll reveal ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
},{threshold:.12,rootMargin:"0px 0px -8% 0px"});
function observeReveals(){document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));}
observeReveals();

console.log('%cSEÑOR SUSHI','font:700 22px Playfair Display;color:#E8B33C');
console.log('%cThis is... Señor Sushi','color:#b9b0a2');

window.SENOR = { CONFIG, FEATURED, FAVORITES, REVIEWS, MENU_PHOTOS, IC };
