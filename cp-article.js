/* The Com'mon People - long-read helpers (UX review, Nov 2026).
   1. A thin reading-progress bar along the top of the page.
   2. An "In this piece" contents list, built from the article's section headings,
      on Dispatches and Field Guides that don't already have one. */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    var body = document.querySelector(".prose") || document.querySelector("main") || document.body;

    // 1. Progress bar
    var bar = document.createElement("div");
    bar.className = "cp-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    function update() {
      var r = body.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var done = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.transform = "scaleX(" + done + ")";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    // 2. Contents list
    if (document.querySelector(".toc, nav[aria-label*='ontents'], .cp-toc")) return;
    var heads = Array.prototype.filter.call(body.querySelectorAll("h2"), function (h) {
      return h.offsetParent !== null && h.textContent.trim().length > 2;
    });
    if (heads.length < 3) return;
    var used = {};
    var items = heads.map(function (h) {
      if (!h.id) {
        var id = h.textContent.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
        while (used[id] || document.getElementById(id)) id += "-2";
        h.id = id;
      }
      used[h.id] = 1;
      return '<li><a href="#' + h.id + '">' + h.textContent.trim().replace(/</g, "&lt;") + "</a></li>";
    });
    var box = document.createElement("details");
    box.className = "cp-toc";
    if (window.innerWidth > 920) box.open = true;
    box.innerHTML = "<summary>In this piece (" + heads.length + " sections)</summary><nav aria-label=\"Contents\"><ol>" + items.join("") + "</ol></nav>";
    heads[0].parentNode.insertBefore(box, heads[0]);
  });
})();
