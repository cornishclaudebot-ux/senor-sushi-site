/* ============================================================
   SEÑOR SUSHI — fx-sunroll.js
   The roll is the rising sun: a glowing sun climbs the frame,
   resolves into concentric rings, and lands as a top-down cut
   roll (rice, nori, fillings) plated at center.
   Standalone classic script. Self-guards. Reduced-motion static
   fallback. Reads the shared beat clock from window.SENOR.
   Brand: rojo #E8232B, deep #8E1114, gold #E8B33C, bone #f4ecde.
   ============================================================ */
(function(){
  'use strict';

  var canvas = document.getElementById('rollCanvas');
  if(!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if(!ctx) return;

  var section = canvas.closest('#sunroll') || document.getElementById('sunroll');
  var hasSection = !!section;

  var reduce = false;
  try { reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches; } catch(e){}

  var ROJO = '#E8232B', DEEP = '#8E1114', ORO = '#E8B33C', BONE = '#f4ecde';

  function beat(){
    var S = window.SENOR;
    if(S && typeof S.beatEnv === 'function') return S.beatEnv(performance.now());
    return 0;
  }

  // ----- sizing -----
  var DPR = 1, cw = 0, ch = 0;
  function resize(){
    DPR = Math.min(1.5, window.devicePixelRatio || 1);
    var rect = canvas.getBoundingClientRect();
    cw = rect.width  || canvas.clientWidth  || 430;
    ch = rect.height || canvas.clientHeight || 430;
    canvas.width  = Math.max(1, Math.round(cw * DPR));
    canvas.height = Math.max(1, Math.round(ch * DPR));
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // ----- scroll progress -----
  function progress(){
    if(!hasSection) return 1;
    var r = section.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var total = r.height + vh;
    var p = (vh - r.top) / total;
    if(p < 0) p = 0; else if(p > 1) p = 1;
    return p;
  }

  var lastP = reduce ? 1 : 0;

  // deterministic pseudo-random for stable rice grains / sesame
  function prand(i){ var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  // fixed filling layout: five pieces around center (salmon, avocado,
  // cream cheese, spicy tuna, cucumber) — the cut face of the roll
  var FILL = [
    {a: -90,  r: 0.42, s: 0.30, c: '#ff8a5c', c2:'#e9663a'}, // salmon
    {a: -18,  r: 0.44, s: 0.27, c: '#8fbf6f', c2:'#5f9448'}, // avocado
    {a: 54,   r: 0.42, s: 0.26, c: '#fff3e0', c2:'#e8d9bd'}, // cream cheese
    {a: 126,  r: 0.44, s: 0.29, c: '#e8434b', c2:'#b81f28'}, // spicy tuna
    {a: 198,  r: 0.42, s: 0.25, c: '#cfe3a0', c2:'#9dbb6a'}  // cucumber
  ];

  function clear(){ ctx.clearRect(0, 0, cw, ch); }

  // PHASE A: the sun — a glowing disc high in the frame
  function drawSun(cx, cy, R, a){
    var g = ctx.createRadialGradient(cx, cy, R * 0.05, cx, cy, R);
    g.addColorStop(0, 'rgba(255,190,80,' + (0.95 * a) + ')');
    g.addColorStop(0.45, 'rgba(232,35,43,' + (0.8 * a) + ')');
    g.addColorStop(1, 'rgba(142,17,20,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }

  // PHASE A/B: concentric sunset rings flipping flat (rojo and gold alternate)
  function drawRings(cx, cy, R, flip, alphaMul){
    if(alphaMul == null) alphaMul = 1;
    var N = 7;
    var scaleY = Math.cos(flip * Math.PI / 2);
    if(scaleY < 0.001) scaleY = 0.001;
    ctx.save();
    ctx.translate(cx, cy);
    for(var i = 0; i < N; i++){
      var t = i / (N - 1);
      var rad = R * (1 - t * 0.82);
      ctx.strokeStyle = (i % 2 === 0) ? ROJO : ORO;
      ctx.lineWidth = Math.max(1.5, R * 0.018 * (1 - t * 0.35));
      ctx.globalAlpha = (0.55 + 0.45 * (1 - t)) * alphaMul;
      ctx.beginPath();
      ctx.ellipse(0, 0, rad, rad * scaleY, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // PHASE B: the finished roll, top-down cut face
  function drawRoll(cx, cy, R, glowPulse, morph){
    ctx.save();
    ctx.translate(cx, cy);
    var rScale = 0.86 + 0.14 * morph;
    var rr = R * rScale;

    // plate shadow glow: the sun now lives under the roll
    var halo = ctx.createRadialGradient(0, 0, rr * 0.5, 0, 0, rr * 1.5);
    halo.addColorStop(0, 'rgba(232,35,43,' + (0.16 + 0.10 * glowPulse) * morph + ')');
    halo.addColorStop(1, 'rgba(232,35,43,0)');
    ctx.globalAlpha = morph;
    ctx.beginPath(); ctx.arc(0, 0, rr * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = halo; ctx.fill();

    // outer rice ring
    var rice = ctx.createRadialGradient(0, -rr * 0.2, rr * 0.2, 0, 0, rr);
    rice.addColorStop(0, '#fbf6ea');
    rice.addColorStop(1, '#e9dfc8');
    ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2);
    ctx.fillStyle = rice; ctx.fill();

    // rice grain texture (stable speckles in the rice band)
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    for(var i = 0; i < 90; i++){
      var ang = prand(i) * Math.PI * 2;
      var rad = rr * (0.74 + prand(i + 200) * 0.22);
      var gx = Math.cos(ang) * rad, gy = Math.sin(ang) * rad;
      ctx.save();
      ctx.translate(gx, gy); ctx.rotate(ang);
      ctx.globalAlpha = 0.5 * morph;
      ctx.beginPath(); ctx.ellipse(0, 0, rr * 0.022, rr * 0.009, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = morph;

    // nori ring
    ctx.lineWidth = rr * 0.075;
    ctx.strokeStyle = '#17120a';
    ctx.beginPath(); ctx.arc(0, 0, rr * 0.66, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(63,174,69,.35)'; // faint green sheen on the nori
    ctx.beginPath(); ctx.arc(0, 0, rr * 0.663, 0, Math.PI * 2); ctx.stroke();

    // inner rice
    ctx.beginPath(); ctx.arc(0, 0, rr * 0.62, 0, Math.PI * 2);
    ctx.fillStyle = '#f6efdd'; ctx.fill();

    // fillings: five soft-cornered pieces around center
    for(var f = 0; f < FILL.length; f++){
      var Fp = FILL[f];
      var fa = Fp.a * Math.PI / 180;
      var fx = Math.cos(fa) * rr * Fp.r * 0.62;
      var fy = Math.sin(fa) * rr * Fp.r * 0.62;
      var fs = rr * Fp.s * 0.62;
      var fg = ctx.createRadialGradient(fx - fs * 0.3, fy - fs * 0.3, fs * 0.1, fx, fy, fs);
      fg.addColorStop(0, Fp.c);
      fg.addColorStop(1, Fp.c2);
      ctx.beginPath();
      // slightly irregular blob: 8-point wobble
      for(var k = 0; k <= 16; k++){
        var t2 = k / 16 * Math.PI * 2;
        var wob = 1 + 0.12 * Math.sin(t2 * 3 + f * 2.1);
        var px = fx + Math.cos(t2) * fs * wob;
        var py = fy + Math.sin(t2) * fs * wob * 0.92;
        if(k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = fg; ctx.fill();
    }

    // center: the red circle with the green chile — the logo motif, plated
    ctx.beginPath(); ctx.arc(0, 0, rr * 0.155, 0, Math.PI * 2);
    var cg = ctx.createRadialGradient(-rr*0.04, -rr*0.05, rr*0.02, 0, 0, rr*0.155);
    cg.addColorStop(0, '#ff5a52'); cg.addColorStop(1, DEEP);
    ctx.fillStyle = cg; ctx.fill();
    ctx.save();
    ctx.rotate(-0.5);
    ctx.strokeStyle = '#3FAE45';
    ctx.lineWidth = Math.max(2, rr * 0.028);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(rr * 0.02, -rr * 0.11, rr * 0.07, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
    ctx.restore();

    // sesame on the rice ring
    ctx.fillStyle = ORO;
    for(var s2 = 0; s2 < 26; s2++){
      var sa = prand(s2 + 900) * Math.PI * 2;
      var sr = rr * (0.8 + prand(s2 + 400) * 0.14);
      ctx.save();
      ctx.translate(Math.cos(sa) * sr, Math.sin(sa) * sr);
      ctx.rotate(sa + 0.6);
      ctx.globalAlpha = 0.85 * morph;
      ctx.beginPath(); ctx.ellipse(0, 0, rr * 0.016, rr * 0.008, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // rim light pulsing with the house beat
    ctx.globalAlpha = (0.35 + 0.4 * glowPulse) * morph;
    ctx.lineWidth = Math.max(1.5, rr * 0.012);
    ctx.strokeStyle = ROJO;
    ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2); ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ----- master render -----
  function render(p, forceFinished){
    if(!cw || !ch) resize();
    clear();
    var cx = cw / 2, cy = ch / 2;
    var R = Math.min(cw, ch) * 0.42;

    if(forceFinished || reduce){
      drawRoll(cx, cy, R, 0, 1);
      return;
    }

    var RINGS_END = 0.58;
    var MORPH_END = 0.78;

    if(p < RINGS_END){
      // the sun rises from low in the frame while sunset rings gather
      var a = p / RINGS_END;
      var ease = a * a * (3 - 2 * a);
      var scale = 0.12 + 0.88 * ease;
      var yOff = (ch * 0.4) * (1 - ease);
      var flip = 1 - ease;
      var alpha = 0.22 + 0.78 * ease;
      drawSun(cx, cy - yOff, R * (0.5 + 0.5 * ease), 0.5 + 0.5 * (1 - ease));
      drawRings(cx, cy - yOff, R * scale, flip, alpha);
      if(a > 0.82){ var pre = (a - 0.82) / 0.18; drawRoll(cx, cy, R, beat(), pre); }
    } else if(p < MORPH_END){
      var b = (p - RINGS_END) / (MORPH_END - RINGS_END);
      var morph = Math.min(1, b * 1.7);
      if(b < 0.30){ drawRings(cx, cy, R, 0, 1 - b * 3); }
      drawRoll(cx, cy, R, beat(), morph);
    } else {
      drawRoll(cx, cy, R, beat(), 1);
    }
  }

  // ----- animation loop with visibility gating -----
  var running = false;
  var inView = !hasSection;
  var rafId = 0;

  function frame(){
    rafId = 0;
    if(!shouldRun()){ running = false; return; }
    lastP = progress();
    render(lastP);
    running = true;
    rafId = requestAnimationFrame(frame);
  }
  function shouldRun(){
    if(reduce) return false;
    if(document.hidden) return false;
    if(!inView) return false;
    return true;
  }
  function start(){ if(running || !shouldRun()) return; running = true; rafId = requestAnimationFrame(frame); }
  function stop(){ running = false; if(rafId){ cancelAnimationFrame(rafId); rafId = 0; } }

  if(reduce || !hasSection){
    resize();
    var drawStatic = function(){ render(1, true); };
    drawStatic();
    window.addEventListener('resize', drawStatic, { passive: true });
    return;
  }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        inView = en.isIntersecting;
        if(inView) start(); else stop();
      });
    }, { threshold: 0.01 });
    io.observe(section);
  } else {
    inView = true;
  }

  document.addEventListener('visibilitychange', function(){
    if(document.hidden) stop(); else start();
  });
  window.addEventListener('resize', function(){ resize(); render(lastP); }, { passive: true });

  resize();
  render(progress());
  start();
})();
