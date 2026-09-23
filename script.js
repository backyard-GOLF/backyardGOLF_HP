const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

const setScrolled = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};
setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

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
