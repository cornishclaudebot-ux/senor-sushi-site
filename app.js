/* ============================================================
   SEÑOR SUSHI PHOENIX — shared app logic + data
   Every value below traces to a real source:
   the live senorsushiphoenix.com site, the printed menu scans on it,
   their Facebook about page, or a platform page verified live 2026-07-29.
   ============================================================ */
const CONFIG = {
  name: "Señor Sushi Phoenix",
  // --- ORDERING (all verified live 2026-07-29 against 4324 W Indian School Rd) ---
  direct: "https://senorsushi1.netwaiter.com/", // their own NetWaiter ordering portal, verified live for 4324 W Indian School Rd
  grubhub: "https://grubhub.com/restaurant/seor-sushi-phoenix-4324-w-indian-school-rd-phoenix/2041196?classicAffiliateId=%2Fr%2Fw%2F2041196%2F&utm_source=kitchen.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=2041196", // the link their own site uses
  uber: "https://www.ubereats.com/store/senor-sushi/yJClZDA_RPu3c7Et_yGQow",
  doordash: "https://www.doordash.com/store/senor-sushi-phoenix-137484/", // delivery only, no pickup on DoorDash
  postmates: "https://postmates.com/store/senor-sushi/yJClZDA_RPu3c7Et_yGQow",
  seamless: "https://www.seamless.com/menu/seor-sushi-phoenix-4324-w-indian-school-rd-phoenix/2041196",
  // --- CONTACT (from senorsushiphoenix.com/contact + printed menu) ---
  phone: "(623) 849-9312",
  phoneRaw: "+16238499312",
  email: "info@senorsushiphoenix.com",
  address: "4324 W Indian School Rd, Phoenix, AZ 85031",
  // --- SOCIALS (from their site footer; counts read 2026-07-29) ---
  ig: "https://www.instagram.com/senorsushiofficial",
  fb: "https://www.facebook.com/senorsushiaz/",
  igHandle: "@senorsushiofficial",
  // --- HAPPY HOUR (printed happy-hour menu) ---
  happyHour: "Monday to Friday, 2:00 PM to 7:00 PM",
  // --- HOURS (consensus of Yelp, Restaurantji, NetWaiter, Restaurant Guru
  //     and the Uber Eats store listing, all read 2026-07-29; 0=Sun..6=Sat) ---
  hours: [
    {open:11, close:22}, // Sun 11 AM to 10 PM
    {open:11, close:22}, // Mon
    {open:11, close:22}, // Tue
    {open:11, close:22}, // Wed
    {open:11, close:22}, // Thu
    {open:11, close:23}, // Fri 11 AM to 11 PM
    {open:11, close:23}  // Sat
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

/* ---- signature dishes: their own photography (pulled from their site),
       names and prices from the printed menu scans ---- */
const GALLERY = [
  {n:"Culichi Roll",           p:"$18.75", img:"assets/food/culichi-roll.jpg",           d:"Baked. Shrimp tempura, avocado, cucumber and crab mix under a fresh seafood mix, shredded cheese and EBI shrimp.", tag:"House Signature"},
  {n:"Carne Asada Roll",       p:"$16.75", img:"assets/food/carne-asada-roll.jpg",       d:"Deep fried. Carne asada, cream cheese, avocado, cucumber, tomato, onion, cilantro and jalapeno.", tag:"Fan Favorite"},
  {n:"Bomba",                  p:"$17.25", img:"assets/food/bomba.jpg",                  d:"Deep fried. Shrimp tempura, chicken, bacon, cream cheese, Chihuahua cheese, cucumber and avocado."},
  {n:"Guamuchilito Roll",      p:"$16.95", img:"assets/food/guamuchilito-roll.jpg",      d:"Deep fried. Shrimp tempura, crab mix, cream cheese, avocado and cucumber, topped with EBI shrimp."},
  {n:"Mexican Roll",           p:"$15.75", img:"assets/food/mexican-roll.jpg",           d:"Salmon tempura and spicy crab mix, topped with yellow hot pepper, avocado and Senor sauce."},
  {n:"Rainbow Roll",           p:"$16.95", img:"assets/food/rainbow-roll.jpg",           d:"Crab mix, avocado and cucumber, topped with fresh tuna, salmon, yellowtail and EBI shrimp."},
  {n:"Fire Cracker Jalapenos", p:"$13.25", img:"assets/food/fire-cracker-jalapenos.jpg", d:"Jalapenos stuffed with spicy tuna, crab mix and cream cheese on spring mix.", tag:"Starter"},
  {n:"Caramelo Roll",          p:"$15.95", img:"assets/food/caramelo-roll.jpg",          d:"Baked. EBI shrimp, crab mix, cucumber and avocado, topped with sauteed shrimp and cream cheese."}
];

/* ---- menu-page hover photos: every shot is theirs ---- */
const MENU_PHOTOS = {
  culichiroll:"assets/food/culichi-roll.jpg", carneasadaroll:"assets/food/carne-asada-roll.jpg",
  bomba:"assets/food/bomba.jpg", guamuchilitoroll:"assets/food/guamuchilito-roll.jpg",
  mexicanroll:"assets/food/mexican-roll.jpg", rainbowroll:"assets/food/rainbow-roll.jpg",
  firecrackerjalapenos:"assets/food/fire-cracker-jalapenos.jpg", caramelroll:"assets/food/caramelo-roll.jpg",
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
  clock:'<svg viewBox="0 0 24 24"><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm1 11h5v2h-7V6h2z"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.24 1z"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zm2 4 6 4 6-4"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h12l-5-5 1.4-1.4L21 12l-7.6 7.4L12 18l5-5H5z"/></svg>'
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
    {h:'index.html', t:'Home'},
    {h:'menu.html', t:'Menu'},
    {h:'specials.html', t:'Happy Hour'},
    {h:'contact.html', t:'Contact'}
  ];
  mount.outerHTML = `
  <header class="site" id="header">
    <nav class="nav">
      <a href="index.html" class="brand" aria-label="Senor Sushi Phoenix home"><img src="assets/brand/logo.png" alt="Señor Sushi Phoenix"></a>
      <div class="nav-links">${NAV.map(l=>`<a href="${l.h}"${active(l.h)}>${l.t}</a>`).join('')}</div>
      <div class="nav-right">
        <div class="nav-social">
          <a href="${CONFIG.ig}" target="_blank" rel="noopener" aria-label="Instagram">${IC.ig}</a>
          <a href="${CONFIG.fb}" target="_blank" rel="noopener" aria-label="Facebook">${IC.fb}</a>
        </div>
        <a href="${isHome ? '#order' : 'index.html#order'}" class="btn btn-primary btn-sm">Order Now</a>
        <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </nav>
  </header>
  <div class="mobile-menu" id="mobileMenu">
    ${NAV.map(l=>`<a href="${l.h}">${l.t}</a>`).join('')}
    <a href="${isHome ? '#order' : 'index.html#order'}" class="btn btn-primary">Order Now</a>
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
        <p>The fusion of Japanese and Latin gastronomy in the Valley of the Sun. A relaxing family atmosphere since day one.</p>
        <div class="socials" style="margin-top:18px">
          <a href="${CONFIG.ig}" target="_blank" rel="noopener" aria-label="Instagram">${IC.ig}</a>
          <a href="${CONFIG.fb}" target="_blank" rel="noopener" aria-label="Facebook">${IC.fb}</a>
        </div>
      </div>
      <div class="foot-col"><h5>Explore</h5>
        <a href="menu.html">The Menu</a><a href="specials.html">Happy Hour</a><a href="contact.html">Contact</a><a href="${home}#order">Order</a>
      </div>
      <div class="foot-col"><h5>Order Online</h5>
        <a href="${CONFIG.grubhub}" target="_blank" rel="noopener">Grubhub</a>
        <a href="${CONFIG.uber}" target="_blank" rel="noopener">Uber Eats</a>
        <a href="${CONFIG.doordash}" target="_blank" rel="noopener">DoorDash</a>
        <a href="${CONFIG.postmates}" target="_blank" rel="noopener">Postmates</a>
        <a href="${CONFIG.seamless}" target="_blank" rel="noopener">Seamless</a>
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
    txt.textContent='Open Now · til '+fmt(today.close);
  } else {
    pillEl.classList.add('closed');
    const next=h<today.open?today:CONFIG.hours[(day+1)%7];
    txt.textContent='Opens '+fmt(next.open);
  }
})();

// marquees (every phrase from their menu or brand)
function fillMarquee(id, items){
  const t=document.getElementById(id); if(!t) return;
  const set=items.map(x=>`<span>${x}</span>`).join('');
  t.innerHTML=set+set;
}
const MQ=["Latino Rolls","Culichi Roll","Happy Hour 2 to 7","Micheladas","Sake Bombers","Carne Asada Roll","Aguas Frescas","Phoenix · Mesa · Peoria","Deep Fried Ice Cream","Family Atmosphere"];
fillMarquee('mq1',MQ); fillMarquee('mq2',MQ);

// signature dish gallery (whole card is the tap target -> menu)
(function(){
  const host=document.getElementById('dish-grid'); if(!host) return;
  host.innerHTML=GALLERY.map((f,i)=>`
    <a class="dish reveal${i%4? ' d'+(i%4):''}" href="menu.html">
      ${f.tag?`<span class="d-tag">${f.tag}</span>`:''}
      <img src="${f.img}" alt="${f.n}, from the Señor Sushi menu" loading="lazy">
      <div class="d-meta"><h3>${f.n}</h3><span class="d-price">${f.p}</span></div>
    </a>`).join('');
})();

// visit map deep link: whole map opens directions (auto-pick Apple on Apple platforms)
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
    if(e.target.closest('a')) return; // inner phone link handles itself
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
      const x=Math.min(e.clientX+22, innerWidth-258), y=Math.min(Math.max(e.clientY-90,12), innerHeight-214);
      prev.style.transform='translate('+x+'px,'+y+'px)';
    });
    li.addEventListener('mouseleave',()=>{ prev.classList.remove('show'); });
    li.addEventListener('click',()=>{ pimg.src=photo; touchOpen=!touchOpen; prev.classList.toggle('show',touchOpen); prev.style.transform='translate('+Math.round(innerWidth/2-118)+'px,'+Math.round(innerHeight/2-110)+'px)'; });
  });
})();

/* ---------- scroll reveal ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
},{threshold:.12,rootMargin:"0px 0px -8% 0px"});
function observeReveals(){document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));}
observeReveals();

/* ---------- console mark ---------- */
console.log('%cSEÑOR SUSHI','font:400 22px Anton;color:#E8232B');
console.log('%cThis is... Señor Sushi','color:#E8B33C');

/* ============================================================
   SHARED BEAT CLOCK + GLOBAL EXPORT (fx modules read window.SENOR)
   ============================================================ */
const BEAT_MS = 1000; // matches --bpm:60
function beatEnv(tMs){ const phase=(tMs % BEAT_MS)/BEAT_MS; return Math.pow(1-phase, 2.2); }
window.SENOR = { CONFIG, GALLERY, MENU_PHOTOS, IC, mapApple, mapGoogle, beatEnv, BEAT_MS };
