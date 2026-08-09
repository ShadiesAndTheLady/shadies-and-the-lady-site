/*
  File purpose: Site interactions and language handling.
  Includes:
  1) Mobile menu behavior
  2) Reveal animation
  3) EN/NL translations with Dutch default
  4) Formspree contact form submission status handling
*/

(function () {
  "use strict";

  var STORAGE_KEY = "shadies-site-language";
  var DEFAULT_LANGUAGE = "nl";
  var SUPPORTED_LANGUAGES = ["en", "nl"];

  var translations = {
    nl: {
      "meta.title": "Shadies & The Lady | Belgische Pop/Rock Coverband",
      "meta.description": "Shadies & The Lady is een all-round Belgische pop/rock coverband uit Limburg. Wij spelen op trouwfeesten, festivals, privefeesten, cafes en bedrijfsevents.",
      "meta.ogTitle": "Shadies & The Lady | Belgische Pop/Rock Coverband",
      "meta.ogDescription": "Energetische live covers voor trouwfeesten, festivals, privefeesten, cafes en bedrijfsevents.",

      "brand.homeAria": "Ga naar home sectie",
      "nav.toggleAria": "Open navigatiemenu",
      "nav.mainAria": "Hoofdnavigatie",
      "lang.aria": "Taalkeuze",

      "nav.home": "Home",
      "nav.band": "Band",
      "nav.repertoire": "Repertoire",
      "nav.gigsBooking": "Optredens & Boeken",
      "nav.gallery": "Galerij",
      "nav.videos": "Video's",
      "nav.contact": "Contact",
      "nav.book": "Boek Ons",

      "hero.eyebrow": "Belgische Pop/Rock Coverband",
      "hero.lead": "Energetische live covers voor trouwfeesten, festivals, cafes, privefeesten en bedrijfsevents.",
      "hero.ctaPrimary": "Boek de Band",
      "hero.ctaSecondary": "Bekijk Optredens",

      "band.title": "Over de Band",
      "band.p1": "Wij zijn een all-round pop/rock coverband uit Limburg, Belgie.",
      "band.p2": "We delen allemaal een grote passie voor muziek, zowel oud als nieuw, en we maken mensen graag blij met hun favoriete songs.",
      "band.p3": "Ons repertoire gaat over meerdere decennia en combineert tijdloze klassiekers met moderne hits. Of het nu een festival, trouwfeest, privefeest, cafe-optreden of bedrijfsevent is: wij zorgen voor een energieke sfeer die mensen laat zingen en dansen.",
      "band.membersTitle": "Bandleden",
      "band.membersIntro": "Voeg later kleine headshots toe per bandlid door de placeholder te vervangen met een foto.",

      "role.singer": "Zang",
      "role.guitar": "Gitaar",
      "role.bass": "Bas",
      "role.drums": "Drums",

      "repertoire.title": "Repertoire",
      "repertoire.intro": "Wij spelen songs van artiesten zoals:",
      "repertoire.aria": "Artiesten in repertoire",

      "gigsBooking.title": "Optredens & Boeken",
      "gigsBooking.intro": "Actieve kalender, duidelijke boekingsflow en praktische technische info op een plek.",
      "gigs.title": "Aankomende Optredens",

      "booking.title": "Boekingsinformatie",
      "booking.step1Title": "1. Neem contact op",
      "booking.step1Text": "Stuur ons je datum, locatie, type event en verwachte timing.",
      "booking.step2Title": "2. Ontvang voorstel",
      "booking.step2Text": "Wij bevestigen beschikbaarheid en bezorgen een voorstel op maat.",
      "booking.step3Title": "3. Bevestiging",
      "booking.step3Text": "Na akkoord stemmen we opbouw, setduur en praktische details af.",
      "booking.priceTitle": "Prijsrichtlijn",
      "booking.priceText": "Prijs hangt af van eventtype, duur, locatie en technische noden.",

      "tech.title": "Technische Setup",
      "tech.provideTitle": "Wat wij kunnen voorzien",
      "tech.provide1": "Volledig PA-systeem voor kleine tot middelgrote events",
      "tech.provide2": "Podiumverlichting",
      "tech.provide3": "Flexibele setlengtes en pauzeplanning",
      "tech.needTitle": "Wat wij nodig hebben",
      "tech.need1": "Stabiele stroomvoorziening dicht bij de speelplek",
      "tech.need2": "Voldoende speelruimte",
      "tech.need3": "Vlotte toegang voor opbouw en afbouw",

      "request.title": "Boekingsaanvraag Template",
      "request.item1": "Type event",
      "request.item2": "Datum en locatie",
      "request.item3": "Geschat aantal aanwezigen",
      "request.item4": "Binnen of buiten",
      "request.item5": "Gewenst speelmoment en duur",
      "request.item6": "Moeten wij PA/licht voorzien?",
      "request.item7": "Contactpersoon en telefoonnummer",
      "request.item8": "Speciale wensen of songvoorkeuren",

      "gallery.title": "Galerij",
      "gallery.intro": "Live momenten, sfeerbeelden en foto's achter de schermen.",
      "gallery.placeholder": "Foto Placeholder",

      "videos.title": "Video's",
      "videos.intro": "Bekijk ons live en voel de sfeer.",

      "contact.title": "Contact",
      "contact.intro": "Klaar om live energie op jouw event te brengen? Stuur je aanvraag hieronder.",
      "contact.emailLabel": "E-mail:",
      "contact.phoneLabel": "Telefoon:",
      "contact.locationLabel": "Locatie:",
      "contact.socialLabel": "Socials:",

      "form.note": "Vul het formulier in voor een snelle offerte op maat.",
      "form.nameLabel": "Naam",
      "form.emailLabel": "E-mail",
      "form.phoneLabel": "Telefoon",
      "form.eventTypeLabel": "Type event",
      "form.selectDefault": "Selecteer",
      "form.eventWedding": "Trouwfeest",
      "form.eventFestival": "Festival",
      "form.eventPrivate": "Privefeest",
      "form.eventCorporate": "Bedrijfsevent",
      "form.eventOther": "Anders",
      "form.dateLabel": "Datum",
      "form.locationLabel": "Locatie",
      "form.messageLabel": "Bericht",
      "form.submit": "Verstuur aanvraag",

      "form.setup": "Formulier is nog niet gekoppeld. Vervang YOUR_FORM_ID in index.html.",
      "form.success": "Bedankt! Je aanvraag is verstuurd. We nemen snel contact met je op.",
      "form.error": "Er liep iets mis bij het versturen. Probeer opnieuw of mail ons rechtstreeks.",
      "form.invalid": "Controleer de verplichte velden en probeer opnieuw.",

      "footer.copy": "© 2026 Shadies & The Lady. Alle rechten voorbehouden."
    },
    en: {
      "meta.title": "Shadies & The Lady | Belgian Pop/Rock Cover Band",
      "meta.description": "Shadies & The Lady is an all-round Belgian pop/rock cover band from Limburg. We play at weddings, festivals, private parties, pubs, and corporate events.",
      "meta.ogTitle": "Shadies & The Lady | Belgian Pop/Rock Cover Band",
      "meta.ogDescription": "Energetic live covers for weddings, festivals, private parties, pubs, and corporate events.",

      "brand.homeAria": "Go to home section",
      "nav.toggleAria": "Open navigation menu",
      "nav.mainAria": "Main navigation",
      "lang.aria": "Language switcher",

      "nav.home": "Home",
      "nav.band": "Band",
      "nav.repertoire": "Repertoire",
      "nav.gigsBooking": "Gigs & Booking",
      "nav.gallery": "Gallery",
      "nav.videos": "Videos",
      "nav.contact": "Contact",
      "nav.book": "Book Us",

      "hero.eyebrow": "Belgian Pop/Rock Cover Band",
      "hero.lead": "Energetic live covers for weddings, festivals, pubs, private parties, and corporate events.",
      "hero.ctaPrimary": "Book the Band",
      "hero.ctaSecondary": "See Upcoming Gigs",

      "band.title": "About the Band",
      "band.p1": "We are an all-round pop/rock cover band from Limburg, Belgium.",
      "band.p2": "We all share a big passion for music, both old and new, and love to make people happy by playing their favorite songs.",
      "band.p3": "Our repertoire spans several decades, combining timeless classics with modern hits. Whether it is a festival, wedding, private party, pub, or corporate event, we enjoy creating an energetic atmosphere that gets people singing and dancing.",
      "band.membersTitle": "Band Members",
      "band.membersIntro": "You can add small headshots for each member later by replacing the placeholder.",

      "role.singer": "Singer",
      "role.guitar": "Guitar",
      "role.bass": "Bass",
      "role.drums": "Drums",

      "repertoire.title": "Repertoire",
      "repertoire.intro": "We perform songs by artists including:",
      "repertoire.aria": "Artists in repertoire",

      "gigsBooking.title": "Gigs & Booking",
      "gigsBooking.intro": "Live calendar, clear booking flow, and practical technical info in one place.",
      "gigs.title": "Upcoming Gigs",

      "booking.title": "Booking Information",
      "booking.step1Title": "1. Contact Us",
      "booking.step1Text": "Send us your date, location, event type, and expected timing.",
      "booking.step2Title": "2. Receive Proposal",
      "booking.step2Text": "We confirm availability and send a tailored proposal.",
      "booking.step3Title": "3. Confirmation",
      "booking.step3Text": "After agreement, we align setup, set duration, and practical details.",
      "booking.priceTitle": "Pricing Guidance",
      "booking.priceText": "Pricing depends on event type, duration, location, and technical needs.",

      "tech.title": "Technical Setup",
      "tech.provideTitle": "What we can provide",
      "tech.provide1": "Full PA system for small to medium events",
      "tech.provide2": "Stage lighting setup",
      "tech.provide3": "Flexible set lengths and break planning",
      "tech.needTitle": "What we need",
      "tech.need1": "Stable power access near performance area",
      "tech.need2": "Sufficient stage/performance space",
      "tech.need3": "Clear load-in and load-out access",

      "request.title": "Booking Request Template",
      "request.item1": "Event type",
      "request.item2": "Date and location",
      "request.item3": "Estimated audience size",
      "request.item4": "Indoor or outdoor",
      "request.item5": "Preferred performance time and duration",
      "request.item6": "Do you need us to provide PA/lighting?",
      "request.item7": "Contact person and phone number",
      "request.item8": "Special requests or song preferences",

      "gallery.title": "Gallery",
      "gallery.intro": "Live moments, crowd energy, and behind-the-scenes photos.",
      "gallery.placeholder": "Photo Placeholder",

      "videos.title": "Videos",
      "videos.intro": "Watch us live and feel the atmosphere.",

      "contact.title": "Contact",
      "contact.intro": "Ready to bring live energy to your event? Send your request below.",
      "contact.emailLabel": "Email:",
      "contact.phoneLabel": "Phone:",
      "contact.locationLabel": "Location:",
      "contact.socialLabel": "Social:",

      "form.note": "Fill in the form to receive a fast tailored quote.",
      "form.nameLabel": "Name",
      "form.emailLabel": "Email",
      "form.phoneLabel": "Phone",
      "form.eventTypeLabel": "Event type",
      "form.selectDefault": "Select",
      "form.eventWedding": "Wedding",
      "form.eventFestival": "Festival",
      "form.eventPrivate": "Private party",
      "form.eventCorporate": "Corporate event",
      "form.eventOther": "Other",
      "form.dateLabel": "Date",
      "form.locationLabel": "Location",
      "form.messageLabel": "Message",
      "form.submit": "Send request",

      "form.setup": "Form is not connected yet. Replace YOUR_FORM_ID in index.html.",
      "form.success": "Thank you! Your request has been sent. We will contact you soon.",
      "form.error": "Something went wrong while sending. Please try again or email us directly.",
      "form.invalid": "Please check required fields and try again.",

      "footer.copy": "© 2026 Shadies & The Lady. All rights reserved."
    }
  };

  function isSupportedLanguage(code) {
    return SUPPORTED_LANGUAGES.indexOf(code) !== -1;
  }

  function getSavedLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(code) {
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (error) {
      /* ignore storage errors */
    }
  }

  function t(key, language) {
    var dict = translations[language] || translations[DEFAULT_LANGUAGE];
    return dict[key] || key;
  }

  function updateLanguageButtons(activeLanguage) {
    var languageButtons = document.querySelectorAll(".lang-btn");
    languageButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-lang") === activeLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function applyTranslations(language) {
    var lang = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;

    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-current-lang", lang);

    var textElements = document.querySelectorAll("[data-i18n-key]");
    textElements.forEach(function (element) {
      var key = element.getAttribute("data-i18n-key");
      if (key) {
        element.textContent = t(key, lang);
      }
    });

    var attrElements = document.querySelectorAll("[data-i18n-attr][data-i18n-key]");
    attrElements.forEach(function (element) {
      var attrName = element.getAttribute("data-i18n-attr");
      var key = element.getAttribute("data-i18n-key");
      if (attrName && key) {
        element.setAttribute(attrName, t(key, lang));
      }
    });

    var ariaLabelElements = document.querySelectorAll("[data-i18n-aria-label-key]");
    ariaLabelElements.forEach(function (element) {
      var key = element.getAttribute("data-i18n-aria-label-key");
      if (key) {
        element.setAttribute("aria-label", t(key, lang));
      }
    });

    document.title = t("meta.title", lang);

    updateLanguageButtons(lang);
    saveLanguage(lang);
  }

  function initializeLanguageSwitcher() {
    var languageButtons = document.querySelectorAll(".lang-btn");
    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var language = button.getAttribute("data-lang");
        applyTranslations(language);
      });
    });

    var saved = getSavedLanguage();
    var htmlDefault = document.documentElement.getAttribute("data-current-lang");
    var startup = DEFAULT_LANGUAGE;

    if (isSupportedLanguage(saved)) {
      startup = saved;
    } else if (isSupportedLanguage(htmlDefault)) {
      startup = htmlDefault;
    }

    applyTranslations(startup);
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
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
  }

  function setFormStatus(type, message) {
    var statusElement = document.getElementById("form-status");
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.classList.remove("is-success", "is-error");

    if (type === "success") {
      statusElement.classList.add("is-success");
    } else if (type === "error") {
      statusElement.classList.add("is-error");
    }
  }

  function initializeContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var currentLang = document.documentElement.getAttribute("data-current-lang") || DEFAULT_LANGUAGE;
      var actionUrl = form.getAttribute("action") || "";

      if (actionUrl.indexOf("YOUR_FORM_ID") !== -1) {
        setFormStatus("error", t("form.setup", currentLang));
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        setFormStatus("error", t("form.invalid", currentLang));
        return;
      }

      var formData = new FormData(form);

      fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Form submission failed");
          }
          form.reset();
          setFormStatus("success", t("form.success", currentLang));
        })
        .catch(function () {
          setFormStatus("error", t("form.error", currentLang));
        });
    });
  }

  initializeLanguageSwitcher();
  initializeMobileNavigation();
  initializeRevealAnimations();
  initializeContactForm();
})();
