/* The Com'mon People - "Free forever" launch pop-up (Sept 2026).
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
    "#cpfree .cf-card{position:relative;width:min(560px,100%);max-height:calc(100vh - 36px);overflow:auto;background:#161F29;color:#ECE6D8;border-radius:26px;padding:44px 34px 30px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.8),0 0 0 4px #E0B03C;transform:scale(.4) rotate(-6deg);transition:transform .6s cubic-bezier(.2,1.6,.4,1);font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif}",
    "#cpfree.on .cf-card{transform:scale(1) rotate(0)}",
    "#cpfree .cf-bulbs{position:absolute;inset:10px;border-radius:18px;pointer-events:none}",
    "#cpfree .cf-bulb{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#5a4a1c;box-shadow:none}",
    "#cpfree .cf-bulb.lit{background:#FFE08A;box-shadow:0 0 10px 3px rgba(255,210,90,.85)}",
    "#cpfree .cf-x{position:absolute;top:12px;right:16px;z-index:3;background:none;border:0;color:#AEBAC6;font-size:32px;line-height:1;cursor:pointer;padding:4px 8px}",
    "#cpfree .cf-x:hover{color:#fff}",
    "#cpfree .cf-plates{display:inline-flex;gap:5px;margin-bottom:18px}",
    "#cpfree .cf-plates span{font-family:Anton,'Arial Narrow',sans-serif;font-size:17px;color:#14110E;-webkit-text-stroke:3px #FBF7EC;paint-order:stroke fill;padding:5px 9px 6px;border-radius:7px;border:2.5px solid #14110E;text-transform:uppercase;letter-spacing:1px}",
    "#cpfree .p1{background:#E0B03C;transform:rotate(-3deg)}#cpfree .p2{background:#5AA9C2;transform:rotate(2deg)}#cpfree .p3{background:#D2691E;transform:rotate(-2deg)}",
    "#cpfree .cf-eyebrow{font-family:Oswald,'Arial Narrow',sans-serif;font-weight:700;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:#E0B03C;margin:0 0 6px}",
    "#cpfree h2{font-family:Anton,'Arial Narrow',sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(46px,11vw,76px);line-height:.92;letter-spacing:1px;margin:6px 0 4px;color:#ECE6D8}",
    "#cpfree h2 em{font-style:normal;color:#E0B03C;display:inline-block;animation:cfwiggle 1.6s ease-in-out infinite}",
    "#cpfree .cf-sub{font-size:17px;line-height:1.55;color:#C6CFD8;margin:14px auto 22px;max-width:40ch}",
    "#cpfree .cf-stamp{position:absolute;top:26px;left:18px;z-index:2;width:92px;height:92px;border-radius:50%;background:#D2691E;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Anton,'Arial Narrow',sans-serif;line-height:1;transform:rotate(-14deg);box-shadow:0 8px 20px -6px rgba(0,0,0,.6);animation:cfstamp 2.4s ease-in-out infinite}",
    "#cpfree .cf-stamp s{font-size:18px;opacity:.8}#cpfree .cf-stamp b{font-weight:400;font-size:34px}",
    "#cpfree .cf-btns{display:flex;flex-direction:column;gap:12px}",
    "#cpfree .cf-btn{display:block;font-family:Oswald,'Arial Narrow',sans-serif;font-weight:700;font-size:17px;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;padding:16px 20px;border-radius:999px;transition:transform .12s ease}",
    "#cpfree .cf-btn:hover{transform:translateY(-2px) scale(1.02)}",
    "#cpfree .cf-a{background:#D2691E;color:#fff;animation:cfpulse 1.8s ease-in-out infinite}",
    "#cpfree .cf-b{background:#5AA9C2;color:#0F2A33}",
    "#cpfree .cf-sound{margin-top:16px;background:none;border:2px solid #E0B03C;color:#E0B03C;border-radius:999px;padding:9px 18px;font-family:Oswald,'Arial Narrow',sans-serif;font-weight:600;font-size:14px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}",
    "#cpfree .cf-sound:hover{background:#E0B03C;color:#161F29}",
    "#cpfree .cf-fine{margin:14px 0 0;font-size:12.5px;color:#8E99A4}",
    "#cpfree a:focus-visible,#cpfree button:focus-visible{outline:3px solid #E0B03C;outline-offset:3px}",
    "@keyframes cfwiggle{0%,100%{transform:rotate(-2deg) scale(1)}50%{transform:rotate(2deg) scale(1.06)}}",
    "@keyframes cfstamp{0%,100%{transform:rotate(-14deg) scale(1)}50%{transform:rotate(-8deg) scale(1.1)}}",
    "@keyframes cfpulse{0%,100%{box-shadow:0 0 0 0 rgba(210,105,30,.7)}50%{box-shadow:0 0 0 12px rgba(210,105,30,0)}}",
    "@media (max-width:480px){#cpfree .cf-card{padding:34px 20px 24px}#cpfree .cf-plates{display:none}#cpfree .cf-stamp{width:64px;height:64px;top:16px;left:14px}#cpfree .cf-stamp s{font-size:14px}#cpfree .cf-stamp b{font-size:24px}#cpfree .cf-eyebrow{margin-top:56px}}",
    "@media (prefers-reduced-motion:reduce){#cpfree .cf-card{transition:none;transform:none}#cpfree h2 em,#cpfree .cf-stamp,#cpfree .cf-a{animation:none}}"
  ].join("\n");

  function build() {
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
        '<div class="cf-plates" aria-hidden="true"><span class="p1">The</span><span class="p2">Com\'mon</span><span class="p3">People</span></div>' +
        '<p class="cf-eyebrow">Big news, everyone</p>' +
        '<h2 id="cpfree-title">Free.<br><em>Forever.</em></h2>' +
        '<p class="cf-sub">Our Interview Prep Report and CV Rewrite tools now cost nothing. Every time, for everyone. No card, no credits, no catch.</p>' +
        '<div class="cf-btns">' +
          '<a class="cf-btn cf-a" href="https://the-common-people.com/prep-report.html">Get my free interview prep &rarr;</a>' +
          '<a class="cf-btn cf-b" href="https://cv.the-common-people.com">Rewrite my CV for free &rarr;</a>' +
        '</div>' +
        '<button class="cf-sound" type="button">&#9835; Play the fanfare</button>' +
        '<p class="cf-fine">Built on mutual aid. Same as every guide, dispatch and Loudspeaker.</p>' +
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
    var ctx = canvas.getContext("2d"), W, H, parts = [], colours = ["#E0B03C", "#5AA9C2", "#D2691E", "#ECE6D8", "#FFFFFF"];
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
