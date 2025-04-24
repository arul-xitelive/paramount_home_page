//##########    TOP NAV HIDING ###############//
const topNav = document.getElementById("topNav");
const menuNav = document.getElementById("menuNav");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scroll Down: Hide the top nav
    topNav.classList.add("hidden");
    // menuNav.classList.add("fixed-top");
  }
  if (window.scrollY === 0) {
    // We are at the top of the page
    topNav.classList.remove("hidden");
    menuNav.classList.remove("fixed-top");
  }

  lastScrollY = currentScrollY;
});
//##########    TOP NAV HIDING ENDS ###############//





// //###############    NEWS AND BLOGS STARTS  ###################//
// let items = document.querySelectorAll(".carousel .carousel-item");

// items.forEach((el) => {
//   const minPerSlide = 4;
//   let next = el.nextElementSibling;
//   for (var i = 1; i < minPerSlide; i++) {
//     if (!next) {
//       // wrap carousel by using first child
//       next = items[0];
//     }
//     let cloneChild = next.cloneNode(true);
//     el.appendChild(cloneChild.children[0]);
//     next = next.nextElementSibling;
//   }
// });

// document.getElementById("blogprevBtn").addEventListener("click", function () {
//   let carousel = new bootstrap.Carousel(
//     document.getElementById("blogCarousel")
//   );
//   carousel.prev(); // Moves to the previous slide
// });

// document.getElementById("blognextBtn").addEventListener("click", function () {
//   let carousel = new bootstrap.Carousel(
//     document.getElementById("blogCarousel")
//   );
//   carousel.next(); // Moves to the next slide
// });

// //###############    NEWS AND BLOGS  ENDS ###################//



document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("testimonialCarousel");
  const slideInfo = document.getElementById("slideInfo");
  const totalSlides = document.querySelectorAll(".testimonial .carousel-item").length;

  function updateSlideNumber() {
    const activeIndex = [...carousel.querySelectorAll(".carousel-item")].findIndex(
      (item) => item.classList.contains("active")
    );
    slideInfo.textContent = `${activeIndex + 1}/${totalSlides}`;
  }

  carousel.addEventListener("slid.bs.carousel", updateSlideNumber);
  updateSlideNumber();
});
