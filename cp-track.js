/* The Com'mon People - anonymous Savri counts (UX review, Nov 2026).
   Counts clicks on the two homepage doors and on links into the Comquat tools,
   so we can see which door people choose and how many go on to use Comquat.
   No personal details are sent, and Savri sets no cookies. */
(function () {
  function track(name, props) { try { if (window.va) window.va("event", name, props || {}); } catch (e) {} }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (a.closest(".cta.doors")) track("Homepage door", { door: href.indexOf("employers") > -1 ? "Hiring" : "Looking for work" });
    var m = href.match(/^https:\/\/(cv|prep|recruiters)\.the-common-people\.com/);
    if (m) track("Comquat link", { tool: m[1] === "cv" ? (href.indexOf("/account") > -1 ? "Account" : "CV Rewrite") : m[1] === "prep" ? "Interview Prep" : "Recruiters", from: location.pathname });
  }, true);
})();
