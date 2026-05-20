/**
 * Reddy Book Club — landing page UI (counters, winners ticker)
 */
(function () {
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(target * eased);
      el.textContent = prefix + val.toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  document.querySelectorAll(".winners-ticker").forEach((track) => {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  document.querySelectorAll(".landing-nav a, .landing-subnav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("javascript:") || href.startsWith("#")) return;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
})();
