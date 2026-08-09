/*
  File purpose: Adds lightweight interactivity:
  1) Mobile navigation toggle
  2) Auto-close menu after nav link click
  3) Reveal-on-scroll animation for sections
  4) EN/NL language switching with Dutch default and saved preference
*/

(function () {
  "use strict";

  var STORAGE_KEY = "shadies-site-language";
  var DEFAULT_LANGUAGE = "nl";
  var SUPPORTED_LANGUAGES = ["en", "nl"];

  function isSupportedLanguage(languageCode) {
    return SUPPORTED_LANGUAGES.indexOf(languageCode) !== -1;
  }

  function getSavedLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(languageCode) {
    try {
      window.localStorage.setItem(STORAGE_KEY, languageCode);
    } catch (error) {
      /* Ignore storage errors (private mode / blocked storage). */
    }
  }

  function getTextForLanguage(element, languageCode) {
    return element.getAttribute("data-i18n-" + languageCode);
  }

  function updateLanguageButtons(activeLanguage) {
    var languageButtons = document.querySelectorAll(".lang-btn");
    languageButtons.forEach(function (button) {
      var buttonLanguage = button.getAttribute("data-lang");
      var isActive = buttonLanguage === activeLanguage;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function applyLanguage(languageCode) {
    var finalLanguage = isSupportedLanguage(languageCode) ? languageCode : DEFAULT_LANGUAGE;

    // Update <html> language metadata.
    document.documentElement.lang = finalLanguage;
    document.documentElement.setAttribute("data-current-lang", finalLanguage);

    // Update text content for standard translated elements.
    var translatableElements = document.querySelectorAll("[data-i18n]");
    translatableElements.forEach(function (element) {
      var translatedText = getTextForLanguage(element, finalLanguage);
      if (translatedText !== null) {
        element.textContent = translatedText;
      }
    });

    // Update translated attributes, like meta description content.
    var attributeTranslatedElements = document.querySelectorAll("[data-i18n-attr]");
    attributeTranslatedElements.forEach(function (element) {
      var attributeName = element.getAttribute("data-i18n-attr");
      var translatedValue = getTextForLanguage(element, finalLanguage);

      if (attributeName && translatedValue !== null) {
        element.setAttribute(attributeName, translatedValue);
      }
    });

    // Update translated aria-label values where provided.
    var ariaTranslatedElements = document.querySelectorAll("[data-i18n-aria-label]");
    ariaTranslatedElements.forEach(function (element) {
      var translatedAriaLabel = element.getAttribute("data-i18n-aria-label-" + finalLanguage);
      if (translatedAriaLabel !== null) {
        element.setAttribute("aria-label", translatedAriaLabel);
      }
    });

    updateLanguageButtons(finalLanguage);
    saveLanguage(finalLanguage);
  }

  function initializeLanguageSwitcher() {
    var languageButtons = document.querySelectorAll(".lang-btn");
    if (languageButtons.length === 0) {
      return;
    }

    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selectedLanguage = button.getAttribute("data-lang");
        applyLanguage(selectedLanguage);
      });
    });

    // Priority: saved language -> html data-current-lang -> default.
    var savedLanguage = getSavedLanguage();
    var languageFromHtml = document.documentElement.getAttribute("data-current-lang");
    var startupLanguage = DEFAULT_LANGUAGE;

    if (isSupportedLanguage(savedLanguage)) {
      startupLanguage = savedLanguage;
    } else if (isSupportedLanguage(languageFromHtml)) {
      startupLanguage = languageFromHtml;
    }

    applyLanguage(startupLanguage);
  }

  function initializeMobileNavigation() {
    var navToggleButton = document.querySelector(".nav-toggle");
    var siteNavigation = document.querySelector(".site-nav");

    if (!navToggleButton || !siteNavigation) {
      return;
    }

    navToggleButton.addEventListener("click", function () {
      var isExpanded = navToggleButton.getAttribute("aria-expanded") === "true";

      navToggleButton.setAttribute("aria-expanded", String(!isExpanded));
      siteNavigation.classList.toggle("is-open");
    });

    // Close mobile menu after clicking a navigation link.
    var navigationLinks = siteNavigation.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggleButton.setAttribute("aria-expanded", "false");
        siteNavigation.classList.remove("is-open");
      });
    });
  }

  function initializeRevealAnimations() {
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
      // Fallback: show sections immediately on older browsers.
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
  }

  initializeLanguageSwitcher();
  initializeMobileNavigation();
  initializeRevealAnimations();
})();
