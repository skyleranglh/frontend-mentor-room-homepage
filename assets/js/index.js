const slides = [
  {
    imageMobile: "../assets/images/mobile-image-hero-1.jpg",
    imageDesktop: "../assets/images/desktop-image-hero-1.jpg",
    heading: "Discover innovative ways to decorate",
    description:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
  },
  {
    imageMobile: "../assets/images/mobile-image-hero-2.jpg",
    imageDesktop: "../assets/images/desktop-image-hero-2.jpg",
    heading: "We are available all across the globe",
    description: `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,
  },
  {
    imageMobile: "../assets/images/mobile-image-hero-3.jpg",
    imageDesktop: "../assets/images/desktop-image-hero-3.jpg",
    heading: "Manufactured with the best materials",
    description: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
  },
];

const navbar = document.querySelector(".navbar");
const openButton = document.querySelector(".menu-toggle.open");
const closeButton = document.querySelector(".menu-toggle.close");
const overlay = document.querySelector(".nav-overlay");
const navLinksContainer = document.querySelector(".nav-links-container");

const heroSection = document.querySelector(".hero-section");
const mainSection = document.querySelector(".main");
const mainSectionHeading = mainSection.querySelector(".main-heading");
const mainSectionDescription = mainSection.querySelector(".main-description");
const prevSlideButton = document.querySelector(".slide-button.prev");
const nextSlideButton = document.querySelector(".slide-button.next");

const fadeDuration = 300;
let currentSlide = 0;
let isAnimating = false;
let isInitialising = true;
let slideDirection = "right";

const updateSlideContent = (slide) => {
  heroSection.style.backgroundImage =
    window.innerWidth >= 736
      ? `url(${slide.imageDesktop})`
      : `url(${slide.imageMobile})`;

  mainSectionHeading.textContent = slide.heading;
  mainSectionDescription.textContent = slide.description;
};

const updateSlide = (index) => {
  const slide = slides[index];

  if (isInitialising) {
    isInitialising = false;
    updateSlideContent(slide);
    return;
  }

  isAnimating = true;

  heroSection.classList.add(`slide-${slideDirection}-out`);
  mainSectionHeading.classList.add("slide-text-out");
  mainSectionDescription.classList.add("slide-text-out");

  setTimeout(() => {
    updateSlideContent(slide);

    heroSection.classList.remove(`slide-${slideDirection}-out`);
    heroSection.classList.add(`slide-${slideDirection}-in`);

    mainSectionHeading.classList.remove("slide-text-out");
    mainSectionHeading.classList.add("slide-text-in");

    mainSectionDescription.classList.remove("slide-text-out");
    mainSectionDescription.classList.add("slide-text-in");

    setTimeout(() => {
      heroSection.classList.remove(`slide-${slideDirection}-in`);
      mainSectionHeading.classList.remove("slide-text-in");
      mainSectionDescription.classList.remove("slide-text-in");

      isAnimating = false;
    }, fadeDuration);
  }, fadeDuration);
};

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

prevSlideButton.addEventListener("click", () => {
  if (isAnimating) return;

  slideDirection = "left";

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

nextSlideButton.addEventListener("click", () => {
  if (isAnimating) return;

  slideDirection = "right";

  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

window.addEventListener("load", () => updateSlide(currentSlide));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" && !navbar.classList.contains("active")) return;

  closeMenu();
  openButton.focus();
});
