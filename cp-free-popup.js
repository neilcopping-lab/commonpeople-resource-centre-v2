/* The Com'mon People - "Free forever" launch pop-up (Sept 2026), rebranded to Comquat (Nov 2026).
   Colours and type follow the Comquat Brand design system: kumquat #FF8A1F, leaf #1F6B45,
   ink #17191C, peel #FFF3E2, Bricolage Grotesque headlines, DM Sans everything else.
   Appears 5 seconds after someone lands, once per visit (per browser tab session).
   Bright Comquat look (Nov 2026): orange to pink header, white card, app-coloured buttons,
   confetti, a bouncing stamp and an original fanfare.
   Browsers block sound until a visitor taps, so the fanfare starts from a button.
   To switch the pop-up off everywhere: set CPFREE_ON to false below. */
(function () {
  var CPFREE_ON = true;
  var DELAY_MS = 5000;
  var KEY = "cpFreePopupSeen";
  if (!CPFREE_ON) return;
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = [
    "#cpfree{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(23,25,28,.55);opacity:0;transition:opacity .35s ease}",
    "#cpfree.on{opacity:1}",
    "#cpfree canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}",
    "#cpfree .cf-card{position:relative;width:min(540px,100%);max-height:calc(100vh - 36px);overflow:auto;background:#fff;color:#17191C;border-radius:28px;text-align:center;box-shadow:0 30px 80px -24px rgba(23,25,28,.55);transform:scale(.5) rotate(-4deg);transition:transform .6s cubic-bezier(.2,1.6,.4,1);font-family:'DM Sans','Helvetica Neue',Arial,sans-serif}",
    "#cpfree.on .cf-card{transform:scale(1) rotate(0)}",
    "#cpfree .cf-top{position:relative;overflow:hidden;background:linear-gradient(120deg,#FF8A1F 0%,#F25C54 55%,#E8467C 100%);color:#fff;padding:34px 30px 40px}",
    "#cpfree .cf-top:before,#cpfree .cf-top:after{content:'';position:absolute;border-radius:50%;pointer-events:none}",
    "#cpfree .cf-top:before{width:260px;height:260px;right:-90px;top:-120px;background:#fff;opacity:.16}",
    "#cpfree .cf-top:after{width:170px;height:170px;left:-60px;bottom:-110px;background:#FFB547;opacity:.4}",
    "#cpfree .cf-top>*{position:relative;z-index:1}",
    "#cpfree .cf-x{position:absolute;top:12px;right:14px;z-index:3;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);border:0;color:#fff;font-size:28px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 0 3px}",
    "#cpfree .cf-x:hover{background:rgba(255,255,255,.34)}",
    "#cpfree .cf-logo{display:inline-block;margin-bottom:14px}",
    "#cpfree .cf-logo img{display:block;height:32px;width:auto}",
    "#cpfree .cf-eyebrow{display:inline-block;font-weight:700;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 14px;margin:0 0 10px}",
    "#cpfree h2{font-family:'Bricolage Grotesque','DM Sans',Arial,sans-serif;font-weight:800;text-transform:none;font-size:clamp(46px,11vw,76px);line-height:.95;letter-spacing:-1.5px;margin:4px 0 0;color:#fff}",
    "#cpfree h2 em{font-style:normal;color:#FFE3B3;display:inline-block;animation:cfwiggle 1.6s ease-in-out infinite}",
    "#cpfree .cf-stamp{position:absolute;top:16px;left:16px;z-index:2;width:84px;height:84px;border-radius:50%;background:#fff;color:#17191C;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Bricolage Grotesque','DM Sans',Arial,sans-serif;font-weight:800;line-height:1;transform:rotate(-14deg);box-shadow:0 10px 22px -8px rgba(23,25,28,.45);animation:cfstamp 2.4s ease-in-out infinite}",
    "#cpfree .cf-stamp s{font-size:16px;color:#5B5F66}#cpfree .cf-stamp b{font-weight:800;font-size:31px;color:#E2650B}",
    "#cpfree .cf-body{padding:24px 30px 26px;background:#fff}",
    "#cpfree .cf-sub{font-size:17px;line-height:1.55;color:#3F444B;margin:0 auto 20px;max-width:40ch}",
    "#cpfree .cf-btns{display:flex;flex-direction:column;gap:12px}",
    "#cpfree .cf-btn{display:flex;align-items:center;justify-content:center;gap:10px;font-weight:700;font-size:18px;letter-spacing:0;text-decoration:none;padding:15px 20px;border-radius:999px;transition:transform .12s ease,box-shadow .12s ease}",
    "#cpfree .cf-btn:hover{transform:translateY(-2px)}",
    "#cpfree .cf-btn i{width:10px;height:10px;border-radius:50%;background:currentColor;opacity:.75}",
    "#cpfree .cf-a{background:linear-gradient(120deg,#3E9A5F,#1F6B45);color:#fff;box-shadow:0 8px 18px -8px rgba(31,107,69,.7);animation:cfpulse 1.8s ease-in-out infinite}",
    "#cpfree .cf-b{background:linear-gradient(120deg,#FFA53D,#FF8A1F);color:#17191C;box-shadow:0 8px 18px -8px rgba(226,101,11,.7)}",
    "#cpfree .cf-sound{margin-top:16px;background:#FFF3E2;border:2px solid #F25C54;color:#C2362E;border-radius:999px;padding:8px 18px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer}",
    "#cpfree .cf-sound:hover{background:#F25C54;color:#fff}",
    "#cpfree .cf-fine{margin:14px 0 0;font-size:12.5px;line-height:1.5;color:#5B5F66}",
    "#cpfree a:focus-visible,#cpfree button:focus-visible{outline:3px solid #17191C;outline-offset:3px}",
    "@keyframes cfwiggle{0%,100%{transform:rotate(-2deg) scale(1)}50%{transform:rotate(2deg) scale(1.06)}}",
    "@keyframes cfstamp{0%,100%{transform:rotate(-14deg) scale(1)}50%{transform:rotate(-8deg) scale(1.1)}}",
    "@keyframes cfpulse{0%,100%{box-shadow:0 0 0 0 rgba(62,154,95,.55)}50%{box-shadow:0 0 0 12px rgba(62,154,95,0)}}",
    "@media (max-width:480px){#cpfree .cf-top{padding:30px 18px 32px}#cpfree .cf-body{padding:20px 18px 22px}#cpfree .cf-logo img{height:28px}#cpfree .cf-stamp{width:60px;height:60px;top:12px;left:12px}#cpfree .cf-stamp s{font-size:12px}#cpfree .cf-stamp b{font-size:22px}#cpfree .cf-logo{margin-top:44px}#cpfree .cf-btn{font-size:17px}}",
    "@media (prefers-reduced-motion:reduce){#cpfree .cf-card{transition:none;transform:none}#cpfree h2 em,#cpfree .cf-stamp,#cpfree .cf-a{animation:none}}"
  ].join("\n");

  function build() {
    var fl = document.createElement("link"); fl.rel = "stylesheet";
    fl.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=DM+Sans:wght@500;700&display=swap";
    document.head.appendChild(fl);
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var wrap = document.createElement("div");
    wrap.id = "cpfree";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "cpfree-title");
    wrap.innerHTML =
      '<canvas aria-hidden="true"></canvas>' +
      '<div class="cf-card">' +
        '<button class="cf-x" type="button" aria-label="Close">&times;</button>' +
        '<div class="cf-top">' +
          '<div class="cf-stamp" aria-hidden="true"><s>&pound;15</s><b>&pound;0</b></div>' +
          '<div class="cf-logo"><img src="/img/comquat-logo-reversed.svg" alt="Comquat" width="150" height="34"></div><br>' +
          '<p class="cf-eyebrow">Big news, everyone</p>' +
          '<h2 id="cpfree-title">Free.<br><em>Forever.</em></h2>' +
        '</div>' +
        '<div class="cf-body">' +
          '<p class="cf-sub">Comquat, our CV Rewrite and Interview Prep app, now costs nothing. Every time, for everyone. No card, no credits, no catch.</p>' +
          '<div class="cf-btns">' +
            '<a class="cf-btn cf-a" href="https://the-common-people.com/prep-report.html"><i aria-hidden="true"></i>Get my free Interview Prep &rarr;</a>' +
            '<a class="cf-btn cf-b" href="https://cv.the-common-people.com"><i aria-hidden="true"></i>Rewrite my CV for free &rarr;</a>' +
          '</div>' +
          '<button class="cf-sound" type="button">&#9835; Play the fanfare</button>' +
          '<p class="cf-fine">Comquat is from The Com\'mon People. Built on mutual aid, same as every guide, dispatch and Loudspeaker.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  // Theatre bulbs around the card edge, chasing at 2 steps a second.
  function bulbs(wrap) {
    var box = wrap.querySelector(".cf-bulbs");
    var w = box.clientWidth, h = box.clientHeight, gap = 30, pts = [];
    for (var x = 0; x <= w; x += gap) pts.push([x, 0]);
    for (var y = gap; y <= h; y += gap) pts.push([w, y]);
    for (x = w - gap; x >= 0; x -= gap) pts.push([x, h]);
    for (y = h - gap; y > 0; y -= gap) pts.push([0, y]);
    var els = pts.map(function (p) {
      var b = document.createElement("i"); b.className = "cf-bulb";
      b.style.left = p[0] + "px"; b.style.top = p[1] + "px"; box.appendChild(b); return b;
    });
    var step = 0;
    function paint() { els.forEach(function (b, i) { b.classList.toggle("lit", (i + step) % 3 !== 0); }); }
    paint();
    if (reduce) return null;
    return setInterval(function () { step++; paint(); }, 500);
  }

  // Confetti burst in brand colours.
  function confetti(canvas) {
    if (reduce) return;
    var ctx = canvas.getContext("2d"), W, H, parts = [], colours = ["#FF8A1F", "#F25C54", "#E8467C", "#3E9A5F", "#FFB547", "#7C3AED"];
    function size() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    size();
    for (var i = 0; i < 220; i++) {
      parts.push({ x: W / 2, y: H / 2, vx: (Math.random() - .5) * 18, vy: Math.random() * -16 - 4, r: Math.random() * 6 + 4,
        c: colours[i % colours.length], a: Math.random() * 6, va: (Math.random() - .5) * .3 });
    }
    var t0 = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
      });
      if (t - t0 < 4500) requestAnimationFrame(frame); else ctx.clearRect(0, 0, W, H);
    })(t0);
  }

  // An original, short brass-style fanfare, synthesised in the browser (no audio file).
  var audio = null;
  function fanfare(btn) {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      audio = audio || new AC();
      audio.resume();
      var now = audio.currentTime + .05;
      var master = audio.createGain(); master.gain.value = .22; master.connect(audio.destination);
      // [note (Hz), start beat, length in beats]
      var G4 = 392, C5 = 523.25, E5 = 659.25, G5 = 783.99, A5 = 880, C6 = 1046.5, F5 = 698.46, D5 = 587.33;
      var tune = [[G4,0,.5],[C5,.5,.5],[E5,1,.5],[G5,1.5,1],[E5,2.5,.5],[G5,3,1.5],
                  [A5,4.75,.5],[G5,5.25,.5],[F5,5.75,.5],[E5,6.25,.5],[D5,6.75,.5],[C5,7.25,.5],[G5,7.75,.75],[C6,8.5,2]];
      var beat = .18;
      tune.forEach(function (n) {
        var t = now + n[1] * beat, d = n[2] * beat;
        [1, 2.005].forEach(function (mult, k) {
          var o = audio.createOscillator(), g = audio.createGain();
          o.type = k ? "square" : "sawtooth"; o.frequency.value = n[0] * (k ? 1 : 1);
          if (k) o.frequency.value = n[0] * 1.005;
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(k ? .25 : .5, t + .02);
          g.gain.setValueAtTime(k ? .25 : .5, t + d * .8); g.gain.linearRampToValueAtTime(0, t + d);
          o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .02);
        });
      });
      // a cheery drum hit under the big notes
      [0, 1.5, 3, 4.75, 7.75, 8.5].forEach(function (b) {
        var t = now + b * beat, o = audio.createOscillator(), g = audio.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(50, t + .15);
        g.gain.setValueAtTime(.8, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
        o.connect(g); g.connect(master); o.start(t); o.stop(t + .22);
      });
      if (btn) btn.innerHTML = "&#9835; Play it again";
    } catch (e) {}
  }

  function open() {
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    var wrap = build(), lastFocus = document.activeElement;
    requestAnimationFrame(function () { wrap.classList.add("on"); });
    var timer = null;
    confetti(wrap.querySelector("canvas"));
    var closeBtn = wrap.querySelector(".cf-x"), soundBtn = wrap.querySelector(".cf-sound");
    closeBtn.focus();
    function close() {
      wrap.classList.remove("on"); if (timer) clearInterval(timer);
      if (audio) { try { audio.close(); } catch (e) {} }
      document.removeEventListener("keydown", onKey);
      setTimeout(function () { wrap.remove(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }, 350);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") { // keep focus inside the pop-up
        var f = wrap.querySelectorAll("a,button"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    closeBtn.addEventListener("click", close);
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    soundBtn.addEventListener("click", function () { fanfare(soundBtn); });
  }

  function start() { setTimeout(open, DELAY_MS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
