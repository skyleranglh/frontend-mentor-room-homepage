const navbar = document.querySelector(".navbar");
const openButton = document.querySelector(".menu-toggle.open");
const closeButton = document.querySelector(".menu-toggle.close");
const overlay = document.querySelector(".nav-overlay");
const navLinksContainer = document.querySelector(".nav-links-container");

const openMenu = () => {
  openButton.setAttribute("aria-expanded", "true");

  navbar.classList.add("active");
  navLinksContainer.classList.add("open");
  overlay.style.display = "block";

  closeButton.focus();

  setTimeout(() => {
    overlay.classList.add("open");
  }, 10);
};

const closeMenu = () => {
  openButton.setAttribute("aria-expanded", "false");

  openButton.focus();

  navLinksContainer.classList.remove("open");
  navLinksContainer.classList.add("closing");
  overlay.classList.remove("open");
  overlay.classList.add("closing");

  navLinksContainer.addEventListener(
    "transitionend",
    () => {
      navLinksContainer.classList.remove("closing");
      overlay.classList.remove("closing");
      overlay.style.display = "none";
    },
    { once: true }
  );
};

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navbar.classList.contains("active")) {
    closeMenu();
    openButton.focus();
  }
});
