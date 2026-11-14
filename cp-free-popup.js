/* The Com'mon People - "Free forever" launch pop-up (Sept 2026), rebranded to Comquat (Nov 2026).
   Colours and type follow the Comquat Brand design system: kumquat #FF8A1F, leaf #1F6B45,
   ink #17191C, peel #FFF3E2, Bricolage Grotesque headlines, DM Sans everything else.
   Appears 5 seconds after someone lands, once per visit (per browser tab session).
   Chasing theatre lights, confetti, a bouncing stamp and an original fanfare.
   Lights chase at 2 steps a second, well under the 3-flashes-a-second safety limit.
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
    "#cpfree{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(10,14,20,.78);opacity:0;transition:opacity .35s ease}",
    "#cpfree.on{opacity:1}",
    "#cpfree canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}",
    "#cpfree .cf-card{position:relative;width:min(560px,100%);max-height:calc(100vh - 36px);overflow:auto;background:#17191C;color:#FFF3E2;border-radius:26px;padding:44px 34px 30px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.8),0 0 0 4px #FF8A1F;transform:scale(.4) rotate(-6deg);transition:transform .6s cubic-bezier(.2,1.6,.4,1);font-family:'DM Sans','Hanken Grotesk','Helvetica Neue',Arial,sans-serif}",
    "#cpfree.on .cf-card{transform:scale(1) rotate(0)}",
    "#cpfree .cf-bulbs{position:absolute;inset:10px;border-radius:18px;pointer-events:none}",
    "#cpfree .cf-bulb{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#5a3a1a;box-shadow:none}",
    "#cpfree .cf-bulb.lit{background:#FFC27A;box-shadow:0 0 10px 3px rgba(255,138,31,.8)}",
    "#cpfree .cf-x{position:absolute;top:12px;right:16px;z-index:3;background:none;border:0;color:#AEBAC6;font-size:32px;line-height:1;cursor:pointer;padding:4px 8px}",
    "#cpfree .cf-x:hover{color:#fff}",
    "#cpfree .cf-logo{display:inline-block;background:#FFF3E2;border-radius:999px;padding:11px 22px 9px;margin-bottom:18px}",
    "#cpfree .cf-logo img{display:block;height:34px;width:auto}",
    "#cpfree .cf-eyebrow{font-family:'DM Sans',Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#FF8A1F;margin:0 0 6px}",
    "#cpfree h2{font-family:'Bricolage Grotesque','DM Sans',Arial,sans-serif;font-weight:800;text-transform:none;font-size:clamp(46px,11vw,78px);line-height:.95;letter-spacing:-1.5px;margin:6px 0 4px;color:#FFF3E2}",
    "#cpfree h2 em{font-style:normal;color:#FF8A1F;display:inline-block;animation:cfwiggle 1.6s ease-in-out infinite}",
    "#cpfree .cf-sub{font-size:17px;line-height:1.55;color:#E9DCC8;margin:14px auto 22px;max-width:40ch}",
    "#cpfree .cf-stamp{position:absolute;top:26px;left:18px;z-index:2;width:92px;height:92px;border-radius:50%;background:#FF8A1F;color:#17191C;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Bricolage Grotesque','DM Sans',Arial,sans-serif;font-weight:800;line-height:1;transform:rotate(-14deg);box-shadow:0 8px 20px -6px rgba(0,0,0,.6);animation:cfstamp 2.4s ease-in-out infinite}",
    "#cpfree .cf-stamp s{font-size:18px;opacity:.8}#cpfree .cf-stamp b{font-weight:800;font-size:34px}",
    "#cpfree .cf-btns{display:flex;flex-direction:column;gap:12px}",
    "#cpfree .cf-btn{display:block;font-family:'DM Sans',Arial,sans-serif;font-weight:700;font-size:18px;letter-spacing:0;text-decoration:none;padding:16px 20px;border-radius:999px;transition:transform .12s ease}",
    "#cpfree .cf-btn:hover{transform:translateY(-2px) scale(1.02)}",
    "#cpfree .cf-a{background:#1F6B45;color:#FFF3E2;animation:cfpulse 1.8s ease-in-out infinite}",
    "#cpfree .cf-b{background:#FF8A1F;color:#17191C}",
    "#cpfree .cf-sound{margin-top:16px;background:none;border:2px solid #FF8A1F;color:#FF8A1F;border-radius:999px;padding:9px 18px;font-family:'DM Sans',Arial,sans-serif;font-weight:700;font-size:14px;letter-spacing:.02em;cursor:pointer}",
    "#cpfree .cf-sound:hover{background:#FF8A1F;color:#17191C}",
    "#cpfree .cf-fine{margin:14px 0 0;font-size:12.5px;color:#A9A398}",
    "#cpfree a:focus-visible,#cpfree button:focus-visible{outline:3px solid #FF8A1F;outline-offset:3px}",
    "@keyframes cfwiggle{0%,100%{transform:rotate(-2deg) scale(1)}50%{transform:rotate(2deg) scale(1.06)}}",
    "@keyframes cfstamp{0%,100%{transform:rotate(-14deg) scale(1)}50%{transform:rotate(-8deg) scale(1.1)}}",
    "@keyframes cfpulse{0%,100%{box-shadow:0 0 0 0 rgba(62,154,95,.7)}50%{box-shadow:0 0 0 12px rgba(62,154,95,0)}}",
    "@media (max-width:480px){#cpfree .cf-card{padding:34px 20px 24px}#cpfree .cf-logo{padding:9px 16px 7px}#cpfree .cf-logo img{height:26px}#cpfree .cf-stamp{width:64px;height:64px;top:16px;left:14px}#cpfree .cf-stamp s{font-size:14px}#cpfree .cf-stamp b{font-size:24px}#cpfree .cf-eyebrow{margin-top:56px}}",
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
        '<div class="cf-bulbs" aria-hidden="true"></div>' +
        '<button class="cf-x" type="button" aria-label="Close">&times;</button>' +
        '<div class="cf-stamp" aria-hidden="true"><s>&pound;15</s><b>&pound;0</b></div>' +
        '<div class="cf-logo"><img src="/img/comquat-logo.svg" alt="Comquat" width="150" height="34"></div>' +
        '<p class="cf-eyebrow">Big news, everyone</p>' +
        '<h2 id="cpfree-title">Free.<br><em>Forever.</em></h2>' +
        '<p class="cf-sub">Comquat, our CV Rewrite and Interview Prep app, now costs nothing. Every time, for everyone. No card, no credits, no catch.</p>' +
        '<div class="cf-btns">' +
          '<a class="cf-btn cf-a" href="https://the-common-people.com/prep-report.html">Get my free Interview Prep &rarr;</a>' +
          '<a class="cf-btn cf-b" href="https://cv.the-common-people.com">Rewrite my CV for free &rarr;</a>' +
        '</div>' +
        '<button class="cf-sound" type="button">&#9835; Play the fanfare</button>' +
        '<p class="cf-fine">Comquat is from The Com\'mon People. Built on mutual aid, same as every guide, dispatch and Loudspeaker.</p>' +
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
    var ctx = canvas.getContext("2d"), W, H, parts = [], colours = ["#FF8A1F", "#E2650B", "#1F6B45", "#3E9A5F", "#FFF3E2"];
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
    setTimeout(function () { timer = bulbs(wrap); }, 350);
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
