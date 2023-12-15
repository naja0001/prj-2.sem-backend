"use strict";

const counters = document.querySelectorAll(".label2 span");
const container = document.querySelector("#counter-wrapper");

let activated = false;

window.addEventListener("scroll", () => {
  if (
    window.pageYOffset > container.offsetTop - container.offsetHeight - 200 &&
    activated === false
  ) {
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count);
      let count = 0;
      const duration = 1500; // Set the desired duration in milliseconds (1 second)

      function updateCount() {
        const increment = target / (duration / 15); // Calculate the increment based on the duration
        if (count < target) {
          count += increment;
          counter.innerText = Math.floor(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      }

      updateCount();

      activated = true;
    });
  } else if (
    window.pageYOffset < container.offsetTop - container.offsetHeight - 500 ||
    (window.pageYOffset === 0 && activated === true)
  ) {
    counters.forEach((counter) => {
      counter.innerText = 0;
    });
    activated = false;
  }
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  if (loader) {
    // Use setTimeout to remove the loader after 5 seconds
    setTimeout(() => {
      loader.classList.add("loader--hidden");
      // Remove the loader immediately without waiting for animation
      document.body.removeChild(loader);
    }, 500); // 5000 milliseconds = 5 seconds
  }
});

// Check if the device has touch capability
if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
  // Add a class for touch devices
  document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("touchstart", function () {
        // Toggle the 'tapped' class on touchstart
        dropdown.classList.toggle("tapped");
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("touchstart", function (event) {
      if (!event.target.closest(".dropdown")) {
        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("tapped");
        });
      }
    });
  });
}

function toggleCourseBody() {
  var courseBody = document.querySelector(".course_sprite .course_body");
  courseBody.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  const carouselInner = testimonialCarousel.querySelector(".carousel-inner");
  const items = testimonialCarousel.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  testimonialCarousel
    .querySelector(".carousel-control-prev")
    .addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });

  testimonialCarousel
    .querySelector(".carousel-control-next")
    .addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

  function updateCarousel() {
    const newTransformValue = -currentIndex * 100 + "%";
    carouselInner.style.transform = "translateX(" + newTransformValue + ")";
  }
});
