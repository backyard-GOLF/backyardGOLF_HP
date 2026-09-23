const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Letter 3D swap: each character rolls up to reveal an identical second face, staggered left to right. */

const splitGraphemes = (text) =>
  "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter("de", { granularity: "grapheme" }).segment(text), (s) => s.segment)
    : Array.from(text);

const buildChar = (char) => {
  const box = document.createElement("span");
  box.className = "l3-char";
  box.setAttribute("aria-hidden", "true");
  for (const face of ["l3-front", "l3-back"]) {
    const el = document.createElement("span");
    el.className = `l3-face ${face}`;
    el.textContent = char;
    box.appendChild(el);
  }
  return box;
};

const initLetterSwap = (root) => {
  const nodes = Array.from(root.childNodes);
  root.textContent = "";

  nodes.forEach((node) => {
    if (node.nodeName === "BR") {
      const br = document.createElement("span");
      br.className = "l3-break";
      root.appendChild(br);
      return;
    }

    const words = node.textContent.split(" ").filter(Boolean);
    words.forEach((word, i) => {
      const wordEl = document.createElement("span");
      wordEl.className = "l3-word";
      splitGraphemes(word).forEach((char) => wordEl.appendChild(buildChar(char)));
      if (i < words.length - 1) {
        const space = document.createElement("span");
        space.className = "l3-space";
        space.textContent = " ";
        wordEl.appendChild(space);
      }
      root.appendChild(wordEl);
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const staggerMs = 30;
  const durationMs = 550;
  const chars = Array.from(root.querySelectorAll(".l3-char"));
  let running = false;

  const lineHeightPx = () => {
    const cs = getComputedStyle(root);
    return parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.05;
  };

  const syncHeight = () => root.style.setProperty("--l3-h", `${lineHeightPx()}px`);
  syncHeight();
  new ResizeObserver(syncHeight).observe(root);
  if (document.fonts) document.fonts.ready.then(syncHeight);

  const play = () => {
    if (running) return;
    running = true;

    const half = lineHeightPx() / 2;
    const rest = `translateZ(${-half}px) rotateX(0deg)`;
    const flipped = `translateZ(${-half}px) rotateX(90deg)`;

    chars.forEach((char, i) => {
      char.animate([{ transform: rest }, { transform: flipped }], {
        duration: durationMs,
        delay: i * staggerMs,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards",
      });
    });

    setTimeout(() => {
      running = false;
    }, durationMs + chars.length * staggerMs + 50);
  };

  root.addEventListener("mouseenter", play);
  root.addEventListener("click", play);
  root.addEventListener("touchstart", play, { passive: true });
  if (!reduceMotion.matches) setTimeout(play, 700);
};

document.querySelectorAll("[data-letter-swap]").forEach(initLetterSwap);

const bgVideo = document.querySelector(".bg-video");
if (bgVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) bgVideo.pause();

/* Text roll: letters slide up and are replaced by an identical row from below, staggered from the center. */

document.querySelectorAll("[data-text-roll]").forEach((el) => {
  const text = el.textContent.trim();
  const chars = splitGraphemes(text);
  const stagger = 0.035;
  const center = (chars.length - 1) / 2;

  const buildRow = (className) => {
    const row = document.createElement("span");
    row.className = className;
    row.setAttribute("aria-hidden", "true");
    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "tr-char";
      span.style.transitionDelay = `${(stagger * Math.abs(i - center)).toFixed(3)}s`;
      span.textContent = char;
      row.appendChild(span);
    });
    return row;
  };

  el.setAttribute("aria-label", text);
  el.textContent = "";
  el.appendChild(buildRow("tr-top"));
  el.appendChild(buildRow("tr-bottom"));
});
