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

let currentSlide = 0;

const navbar = document.querySelector(".navbar");
const openButton = document.querySelector(".menu-toggle.open");
const closeButton = document.querySelector(".menu-toggle.close");
const overlay = document.querySelector(".nav-overlay");
const navLinksContainer = document.querySelector(".nav-links-container");

const heroSection = document.querySelector(".hero-section");
const mainSection = document.querySelector(".main");
const mainSectionHeading = mainSection.querySelector("h1");
const mainSectionDescription = mainSection.querySelector("p");
const prevSlideButton = document.querySelector(".slide-button.prev");
const nextSlideButton = document.querySelector(".slide-button.next");

const fadeDuration = 300;
let isAnimating = false;
let isInitialising = true;

const updateSlideContent = (slide) => {
  heroSection.style.backgroundImage =
    window.innerWidth >= 736
      ? `url(${slide.imageDesktop})`
      : `url(${slide.imageMobile})`;

  mainSectionHeading.textContent = slide.heading;
  mainSectionDescription.textContent = slide.description;
};

const updateSlide = (index) => {
  console.log(index);
  const slide = slides[index];

  if (isInitialising) {
    isInitialising = false;
    updateSlideContent(slide);
    return;
  }

  if (isAnimating) return;

  isAnimating = true;

  heroSection.classList.add("fade-out");
  mainSectionHeading.classList.add("fade-out");
  mainSectionDescription.classList.add("fade-out");

  setTimeout(() => {
    updateSlideContent(slide);

    heroSection.classList.remove("fade-out");
    heroSection.classList.add("fade-in");

    mainSectionHeading.classList.remove("fade-out");
    mainSectionHeading.classList.add("fade-in");

    mainSectionDescription.classList.remove("fade-out");
    mainSectionDescription.classList.add("fade-in");

    setTimeout(() => {
      heroSection.classList.remove("fade-in");
      mainSectionHeading.classList.remove("fade-in");
      mainSectionDescription.classList.remove("fade-in");

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
  if (!isAnimating) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(currentSlide);
  }
});

nextSlideButton.addEventListener("click", () => {
  if (!isAnimating) {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  }
});

window.addEventListener("load", () => updateSlide(currentSlide));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navbar.classList.contains("active")) {
    closeMenu();
    openButton.focus();
  }
});
