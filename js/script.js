/*
  File purpose: Adds lightweight interactivity:
  1) Mobile navigation toggle
  2) Auto-close menu after nav link click
  3) Reveal-on-scroll animation for sections
*/

(function () {
  "use strict";

  // Mobile navigation elements
  var navToggleButton = document.querySelector(".nav-toggle");
  var siteNavigation = document.querySelector(".site-nav");

  if (navToggleButton && siteNavigation) {
    navToggleButton.addEventListener("click", function () {
      var isExpanded = navToggleButton.getAttribute("aria-expanded") === "true";

      navToggleButton.setAttribute("aria-expanded", String(!isExpanded));
      siteNavigation.classList.toggle("is-open");
    });

    // Close mobile menu after clicking a navigation link
    var navigationLinks = siteNavigation.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggleButton.setAttribute("aria-expanded", "false");
        siteNavigation.classList.remove("is-open");
      });
    });
  }

  // Reveal animation for sections
  var revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    // Fallback: show sections immediately on older browsers
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }
})();
