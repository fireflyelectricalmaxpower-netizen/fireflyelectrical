 const sections = document.querySelectorAll("section");

  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if(sectionTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  }





const images = [
  "images/bg1.jpg",
  "images/bg2.jpg",
  "images/bg3.jpg",
  "images/bg4.jpg"
];

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;
let imageIndex = 0;
let interval;

/* INIT SLIDES */
slides[0].style.backgroundImage = `url(${images[0]})`;
slides[1].style.backgroundImage = `url(${images[1]})`;
slides[0].classList.add("active");

/* CREATE DOTS */
images.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    goToSlide(i);
    resetInterval();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dots span");

/* UPDATE DOTS */
function updateDots(index) {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

/* FADE SLIDE */
function fadeBg() {
  const nextSlide = currentSlide === 0 ? 1 : 0;
  imageIndex = (imageIndex + 1) % images.length;

  slides[nextSlide].style.backgroundImage =
    `url(${images[imageIndex]})`;

  slides[nextSlide].classList.add("active");
  slides[currentSlide].classList.remove("active");

  currentSlide = nextSlide;
  updateDots(imageIndex);
}

/* GO TO SPECIFIC SLIDE */
function goToSlide(index) {
  const nextSlide = currentSlide === 0 ? 1 : 0;
  imageIndex = index;

  slides[nextSlide].style.backgroundImage =
    `url(${images[imageIndex]})`;

  slides[nextSlide].classList.add("active");
  slides[currentSlide].classList.remove("active");

  currentSlide = nextSlide;
  updateDots(imageIndex);
}

/* AUTOPLAY */
function startInterval() {
  interval = setInterval(fadeBg, 4000);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

startInterval();

  const bun = document.getElementById("shopBtn");

  bun.addEventListener("click", function () {

    // Show loader
    loader.style.display = "flex";

    // Wait so browser shows it
    setTimeout(() => {
      window.location.href = "led-bulbs.html";
    }, 1500);

  });


  const butn = document.getElementById("shoBtn");

  butn.addEventListener("click", function () {

    // Show loader
    loader.style.display = "flex";

    // Wait so browser shows it
    setTimeout(() => {
      window.location.href = "led-bulbs.html";
    }, 1500);

  });
  const buttn = document.getElementById("shBtn");

  buttn.addEventListener("click", function () {

    // Show loader
    loader.style.display = "flex";

    // Wait so browser shows it
    setTimeout(() => {
      window.location.href = "led-bulbs.html";
    }, 1500);

  });
  const button = document.getElementById("sBtn");

  button.addEventListener("click", function () {

    // Show loader
    loader.style.display = "flex";

    // Wait so browser shows it
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1500);

  });
  const buttonn = document.getElementById("stn");

  buttonn.addEventListener("click", function () {

    // Show loader
    loader.style.display = "flex";

    // Wait so browser shows it
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1500);

  });

  const fireflyContainer = document.querySelector(".firefly-container");
  const FIREFLY_COUNT = 20;

  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const firefly = document.createElement("div");
    firefly.classList.add("firefly");

    const size = Math.random() * 4 + 4;
    firefly.style.width = size + "px";
    firefly.style.height = size + "px";

    firefly.style.left = Math.random() * 100 + "%";
    firefly.style.top = Math.random() * 100 + "%";

    firefly.style.setProperty("--x", `${(Math.random() - 0.5) * 200}px`);
    firefly.style.setProperty("--y", `${(Math.random() - 0.5) * 200}px`);

    firefly.style.animationDuration =
      `${Math.random() * 15 + 10}s, ${Math.random() * 3 + 2}s`;

    fireflyContainer.appendChild(firefly);
  }

  const catalogs = document.querySelector(".catalogs");
  const container = catalogs.querySelector(".firefly-container");

  const COUNT = 24;

  for (let i = 0; i < COUNT; i++) {
    const f = document.createElement("div");
    f.className = "firefly";

    const startX = Math.random() * catalogs.clientWidth;
    const startY = Math.random() * catalogs.clientHeight;

    const moveX = (Math.random() - 0.5) * catalogs.clientWidth;
    const moveY = (Math.random() - 0.5) * catalogs.clientHeight;

    f.style.left = startX + "px";
    f.style.top = startY + "px";
    f.style.setProperty("--x", moveX + "px");
    f.style.setProperty("--y", moveY + "px");

    f.style.animationDuration =
      `${Math.random() * 14 + 8}s, ${Math.random() * 3 + 2}s`;

    container.appendChild(f);
  }



  window.addEventListener("scroll", revealSections);
  window.addEventListener("load", revealSections);