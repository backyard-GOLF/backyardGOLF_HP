/* Spotlight cards (hero-kacheln.html): vanilla port of the React "GlowCard"
   (spotlight-card.tsx). The pointer/finger position is written into CSS
   variables relative to each card, so the glow also works on iOS Safari,
   which ignores background-attachment: fixed. Touch listeners are passive,
   so swiping still scrolls the page. */

const glowCards = document.querySelectorAll(".glow-card");

if (glowCards.length) {
  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const headerLine = document.querySelector(".header-line-glow");

  const update = () => {
    frame = 0;
    if (headerLine) {
      const r = headerLine.getBoundingClientRect();
      headerLine.style.setProperty("--lx", (lastX - r.left).toFixed(2));
      headerLine.style.setProperty("--ly", (lastY - r.top).toFixed(2));
    }
    glowCards.forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", (lastX - r.left).toFixed(2));
      card.style.setProperty("--y", (lastY - r.top).toFixed(2));
      card.style.setProperty("--xp", (lastX / window.innerWidth).toFixed(2));
      card.style.setProperty("--yp", (lastY / window.innerHeight).toFixed(2));
    });
  };

  const track = (x, y) => {
    lastX = x;
    lastY = y;
    if (!frame) frame = requestAnimationFrame(update);
  };

  document.addEventListener("pointermove", (e) => track(e.clientX, e.clientY));

  const onTouch = (e) => {
    const t = e.touches[0];
    if (t) track(t.clientX, t.clientY);
  };
  document.addEventListener("touchstart", onTouch, { passive: true });
  document.addEventListener("touchmove", onTouch, { passive: true });

  // Cards move under a resting finger while the page scrolls, so re-measure.
  window.addEventListener("scroll", () => { if (lastX || lastY) track(lastX, lastY); }, { passive: true });
}
