/* The Com'mon People - Comquat "free forever" banner (Nov 2026).
   Replaces the old full-screen pop-up, following the UX review of 20 Nov 2026:
   a small card in the corner (a slim strip on phones) that never covers the page,
   appears once someone has started reading (scrolled a little, or after 8 seconds),
   and stays hidden for 30 days once closed.
   Comquat colours: kumquat #FF8A1F, leaf #1F6B45, ink #17191C.
   To switch it off everywhere: set CPFREE_ON to false below. */
(function () {
  var CPFREE_ON = true;
  var KEY = "cpFreeBannerClosed";
  var DAYS = 30;
  if (!CPFREE_ON) return;
  try {
    var t = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (t && Date.now() - t < DAYS * 864e5) return;
  } catch (e) {}

  var css = [
    "#cpfree{position:fixed;left:18px;bottom:18px;z-index:9000;width:min(380px,calc(100vw - 36px));background:#fff;color:#17191C;border-radius:18px;box-shadow:0 18px 50px -18px rgba(23,25,28,.45);border:1px solid rgba(23,25,28,.08);font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;overflow:hidden;transform:translateY(140%);transition:transform .45s ease}",
    "#cpfree.on{transform:none}",
    "#cpfree .cfb-top{display:flex;align-items:center;gap:10px;padding:12px 48px 10px 16px;background:linear-gradient(120deg,#FF8A1F 0%,#F25C54 60%,#E8467C 100%);color:#17191C;font-weight:700;font-size:15px;line-height:1.3}",
    "#cpfree .cfb-top img{width:20px;height:auto;flex:none}",
    "#cpfree .cfb-body{padding:12px 16px 16px;font-size:15px;line-height:1.45}",
    "#cpfree .cfb-body p{margin:0 0 12px}",
    "#cpfree .cfb-btns{display:flex;gap:8px;flex-wrap:wrap}",
    "#cpfree .cfb-btns a{flex:1 1 auto;text-align:center;text-decoration:none;font-weight:700;font-size:15px;padding:11px 14px;border-radius:999px;min-height:44px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center}",
    "#cpfree .cfb-prep{background:#1F6B45;color:#fff}",
    "#cpfree .cfb-cv{background:#FF8A1F;color:#17191C}",
    "#cpfree .cfb-x{position:absolute;top:6px;right:6px;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.45);color:#17191C;font-size:24px;line-height:1;cursor:pointer}",
    "#cpfree .cfb-x:focus-visible,#cpfree a:focus-visible{outline:3px solid #17191C;outline-offset:2px}",
    "@media (max-width:600px){#cpfree{left:10px;right:10px;bottom:10px;width:auto;border-radius:14px}#cpfree .cfb-body p{display:none}#cpfree .cfb-body{padding:10px 12px 12px}}",
    "@media (prefers-reduced-motion:reduce){#cpfree{transition:none}}"
  ].join("");

  function build() {
    if (document.getElementById("cpfree")) return;
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    var box = document.createElement("aside");
    box.id = "cpfree";
    box.setAttribute("aria-label", "Comquat is free");
    box.innerHTML =
      '<div class="cfb-top"><img src="/img/comquat-mark.svg" alt="">Comquat is free. For everyone, every time.</div>' +
      '<button class="cfb-x" type="button" aria-label="Close">&times;</button>' +
      '<div class="cfb-body"><p>Our CV Rewrite and Interview Prep tools cost nothing. No card, no credits, no catch.</p>' +
      '<div class="cfb-btns"><a class="cfb-prep" href="https://prep.the-common-people.com">Interview Prep</a>' +
      '<a class="cfb-cv" href="https://cv.the-common-people.com">Rewrite my CV</a></div></div>';
    document.body.appendChild(box);
    box.querySelector(".cfb-x").addEventListener("click", function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      box.classList.remove("on");
      setTimeout(function () { box.remove(); }, 500);
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("on"); }); });
  }

  var shown = false;
  function show() {
    if (shown) return;
    shown = true;
    window.removeEventListener("scroll", onScroll);
    build();
  }
  function onScroll() {
    if (window.scrollY > Math.min(600, document.documentElement.scrollHeight * 0.25)) show();
  }
  function start() {
    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(show, 8000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
