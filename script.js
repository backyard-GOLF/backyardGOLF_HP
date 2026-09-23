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
  const rest = "translateZ(-0.5lh) rotateX(0deg)";
  const flipped = "translateZ(-0.5lh) rotateX(90deg)";
  let running = false;

  const play = async () => {
    if (running || reduceMotion.matches) return;
    running = true;

    const animations = Array.from(root.querySelectorAll(".l3-char")).map((char, i) =>
      char.animate([{ transform: rest }, { transform: flipped }], {
        duration: 650,
        delay: i * staggerMs,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards",
      }).finished
    );

    await Promise.allSettled(animations);
    running = false;
  };

  root.addEventListener("mouseenter", play);
  root.addEventListener("click", play);
  setTimeout(play, 700);
};

document.querySelectorAll("[data-letter-swap]").forEach(initLetterSwap);
