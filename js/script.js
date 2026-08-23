/*
  File purpose: Site interactions, language handling, and lightweight UI behavior.
  Includes:
  1) Mobile menu behavior
  2) Reveal animation
  3) EN/NL translations with Dutch default
  4) Gig calendar rendered from the GIGS array, including JSON-LD structured data
  5) Member bio expand/collapse
  6) Lightbox for gallery photos and event posters
  7) Copy-email and Formspree contact form handling

  To update the gig calendar, edit the GIGS array below. Nothing else needs changing.
*/

(function () {
  "use strict";

  var STORAGE_KEY = "shadies-site-language";
  var DEFAULT_LANGUAGE = "nl";
  var SUPPORTED_LANGUAGES = ["en", "nl"];
  var memberBioRefreshHandler = null;
  var gigsRefreshHandler = null;

  var MONTH_ABBREVIATIONS = {
    nl: ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"],
    en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  };

  /*
    Single source of truth for the gig calendar: cards and JSON-LD are both built from this.
    date     ISO yyyy-mm-dd; past gigs drop off automatically and the list sorts itself
    place    shown on the card
    venue    JSON-LD location name; omit together with city for private bookings
    poster   optional image; adds the click-to-enlarge poster button
    featured optional override; without it the soonest upcoming gig is featured
    private  optional; keeps the gig off search engines and out of JSON-LD
  */
  var GIGS = [
    {
      date: "2026-08-29",
      title: "2 Jaar De Stip",
      place: "Stevoort",
      venue: "De Stip",
      city: "Stevoort",
      poster: "assets/images/AfficheDeStip.jpeg",
      featured: true
    },
    {
      date: "2026-09-19",
      title: "Pilspop",
      place: "Paal",
      venue: "Pilspop",
      city: "Paal"
    },
    {
      date: "2026-10-03",
      title: "Private Birthday Party",
      place: "Paal",
      private: true
    },
    {
      date: "2026-11-10",
      title: "Durango Sessions",
      place: "Paal",
      venue: "Durango Sessions",
      city: "Paal"
    }
  ];

  var translations = {
    nl: {
      "meta.title": "Shadies & The Lady | Pop & Rock Coverband Limburg Belgie",
      "meta.description": "Shadies & The Lady is een all-round Belgische pop/rock coverband uit Limburg. Wij spelen op trouwfeesten, festivals, privefeesten, cafes en bedrijfsevents.",
      "meta.ogTitle": "Shadies & The Lady | Pop & Rock Coverband Limburg Belgie",
      "meta.ogDescription": "Energetische live covers voor trouwfeesten, festivals, privefeesten, cafes en bedrijfsevents.",
      "meta.ogImageAlt": "Shadies & The Lady bandlogo",

      "brand.homeAria": "Ga naar home sectie",
      "nav.toggleAria": "Open navigatiemenu",
      "nav.mainAria": "Hoofdnavigatie",
      "lang.aria": "Taalkeuze",

      "nav.home": "Home",
      "nav.band": "Band",
      "nav.repertoire": "Repertoire",
      "nav.gigsBooking": "Optredens & Boeken",
      "nav.gallery": "Galerij",
      "nav.contact": "Contact",
      "nav.book": "Boek Ons",

      "hero.eyebrow": "Belgische Pop/Rock Coverband",
      "hero.lead": "Energetische live covers voor trouwfeesten, festivals, cafes, privefeesten en bedrijfsevents.",
      "hero.ctaPrimary": "Boek de Band",
      "hero.ctaSecondary": "Bekijk Optredens",

      "band.title": "Over de Band",
      "band.p1": "Wat begon als een gedeelde liefde voor muziek, groeide uit tot Shadies & The Lady: een enthousiaste pop- en rockcoverband uit Limburg.",
      "band.p2": "Met nummers uit verschillende decennia brengen we een mix van klassiekers, guilty pleasures, stevige rocksongs en moderne hits. We houden ervan om een publiek mee te nemen op een muzikale reis waarbij iedereen wel een nummer hoort dat herinneringen oproept.",
      "band.p3": "Of het nu een festival, trouwfeest, cafe of bedrijfsevent is, we staan op het podium met een doel: mensen een fantastische avond bezorgen. Samen zingen, dansen en genieten van live muziek – dat is waar Shadies & The Lady voor staat.",
      "band.membersTitle": "Bandleden",
      "band.bio.diana": "Als kind kon Diana uren in de living staan meezingen met nummers van onder andere Clouseau, terwijl ze deed alsof ze op een podium stond.\n\nHet was dan ook niet verwonderlijk dat ze naar de muziekschool wilde. Als instrument koos ze voor saxofoon. Ook haar zang bleef ze verder ontwikkelen, onder andere door bij het kerkkoor te zingen en regelmatig de microfoon vast te nemen tijdens een karaokeavond.\n\nAls jongvolwassene kregen andere dingen voorrang en raakte muziek wat meer op de achtergrond. Het zingen beperkte zich vooral nog tot de momenten onder de douche.\n\nTot ze enkele jaren geleden haar passie voor muziek herontdekte. Ze besloot opnieuw volop voor haar kinderdroom te gaan en van zingen weer een belangrijk deel van haar leven te maken.\n\nHaar grootste passie blijft zang, maar onder het motto \"je bent nooit te oud om te leren\" besloot ze begin 2025 ook akoestische gitaar te leren spelen.\n\nWant stilzitten? Dat is duidelijk niets voor Diana.",
      "band.bio.matthew": "Matthew ontdekte al op jonge leeftijd zijn liefde voor muziek aan de muziekschool. Zijn interesse verschoof al snel naar gitaar, aangewakkerd door bands als Ramones, Led Zeppelin en AC/DC. De klassieke lessen sloten echter steeds minder aan bij zijn muzikale smaak, die duidelijk richting rock en elektrische gitaar evolueerde. En eerlijk is eerlijk: als tiener had hij ook wel andere dingen aan zijn hoofd.\nDe gitaar verdween daarna bijna vijftien jaar uit beeld. Pas op zijn 28ste, dankzij zijn vader, vond Matthew de weg terug naar het instrument. Achteraf bekeken een van de beste beslissingen die hij ooit nam.\nSindsdien is gitaar spelen uitgegroeid tot een echte passie. Hij blijft voortdurend experimenteren met nieuwe sounds, technieken en materiaal, altijd op zoek naar dat beetje extra dat een nummer nog beter laat klinken. Die nieuwsgierigheid en liefde voor muziek hoor je terug in elk optreden van Shadies & The Lady.",
      "band.bio.bart": "Bart ontdekte zijn passie voor gitaar dankzij Metallica en Disturbed. Later kwamen daar bands als Children of Bodom en AC/DC bij, met Angus Young en Alexi Laiho als zijn grote gitaarhelden. Hoewel metal en rock altijd zijn favoriete genres zijn gebleven, is hij door de jaren heen ook andere muziekstijlen meer gaan waarderen.\nNa een jaartje gitaarles belandde de gitaar jarenlang in de hoek door studies, een doctoraat en een drukke carrière. Dankzij een collega en zangeres Diana vond hij de muzikale vonk terug.\nOp het podium speelt Bart het liefst op ESP/LTD- en Gibson-gitaren. Digitale versterkers? Geen probleem. Over één ding is hij echter onwrikbaar: een Fender zal je hem niet snel zien bespelen.",
      "band.bio.dirk": "Dirk belandde dankzij zijn moeder, die zelf uit een muzikale familie komt, al op jonge leeftijd in de muziekschool. Op zijn twaalfde moest hij een instrument kiezen en kwam hij eerder toevallig bij gitaar terecht. Al snel bleek echter dat klassieke gitaarlessen niets voor hem waren. Veel te braaf, veel te saai.\nMet een Guitar for Dummies-boek uit de bibliotheek leerde hij zichzelf verder spelen, helemaal op zijn eigen manier. Toen zijn eerste band nog een bassist zocht en er niemand anders kandidaat was, nam Dirk die rol op zich. Wat begon als een praktische oplossing, groeide uit tot een blijvende passie.\nVandaag vormt hij met zijn bas het stevige fundament van Shadies & The Lady. Recent verruilde hij zijn vertrouwde Yamaha voor een Sandberg California TM4, waarmee hij elke groove met plezier neerzet.",
      "band.bio.philippe": "Philippe wist al op jonge leeftijd dat ritme zijn ding was. Gewapend met pollepels, Dash-tonnen en een flinke portie fantasie bouwde hij als zesjarige zijn eerste drumstel. Tijdens optredens keek hij niet naar de zanger of gitarist, maar uitsluitend naar de drummer. Zijn ouders beseften al snel dat de woonkamer geen concertzaal was en investeerden in een echt drumstel.\nDie passie bracht hem naar de muziekacademie van Mol, waar hij slagwerk studeerde. Een internationale carrière zat er uiteindelijk niet in, maar zijn liefde voor muziek, het podium en een stevige portie pop en rock is sindsdien alleen maar gegroeid.\nVandaag is Philippe de drijvende kracht achter het ritme van Shadies & The Lady. Geef hem een drumstel, een spotlight en een enthousiast publiek, en hij voelt zich helemaal in zijn element.\nAll-time favorite: Purple Rain – Prince",

      "role.singer": "Zang",
      "role.guitar": "Gitaar",
      "role.bass": "Bas",
      "role.drums": "Drums",

      "repertoire.title": "Repertoire",
      "repertoire.intro": "Een selectie uit ons live repertoire:",
      "repertoire.classicsTitle": "Classics",
      "repertoire.ninetiesTitle": "90s / 00s",
      "repertoire.modernTitle": "Modern & Publieksfavorieten",

      "gigsBooking.title": "Optredens & Boeken",
      "gigs.title": "Aankomende Optredens",
      "gigs.nextBadge": "Volgende show",
      "gigs.nextCta": "IK BEN ERBIJ",
      "gigs.posterCta": "Affiche",
      "gigs.posterAria": "Bekijk de affiche van",
      "gigs.none": "Momenteel staan er geen optredens gepland. Neem contact op om ons te boeken.",

      "booking.step1Title": "Neem contact op",
      "booking.step2Title": "Ontvang voorstel",
      "booking.step3Title": "Bevestiging",

      "gallery.title": "Galerij",
      "gallery.intro": "Live momenten, sfeerbeelden en foto's achter de schermen.",
      "gallery.lightboxDialogAria": "Vergrote galerijfoto",
      "gallery.lightboxCloseAria": "Sluiten",
      "gallery.lightboxPrevAria": "Vorige foto",
      "gallery.lightboxNextAria": "Volgende foto",
      "gallery.lightboxCloseTitle": "Sluiten",
      "gallery.lightboxPrevTitle": "Vorige",
      "gallery.lightboxNextTitle": "Volgende",
      "gallery.photo1": "Banners zijn cool!",
      "gallery.photo2": "Ons werkstation",
      "gallery.photo3": "Matthew laat de gitaar knallen",
      "gallery.photo4": "Philippe gaat los op de drums",
      "gallery.photo5": "Diana zingt haar hart uit haar lijf",
      "gallery.photo6": "Bart trekt zijn gitaargezichten",
      "gallery.photo7": "Dirk houdt de groove strak",

      "contact.title": "Contact",
      "contact.emailLabel": "E-mail:",
      "contact.socialLabel": "Socials:",
      "contact.copyEmail": "Kopieer",

      "social.facebookAria": "Facebook",
      "social.instagramAria": "Instagram",
      "social.linktreeAria": "Linktree",
      "social.facebookTitle": "Facebook",
      "social.instagramTitle": "Instagram",
      "social.linktreeTitle": "Linktree",

      "form.note": "Zo verloopt boeken:",
      "form.firstNameLabel": "Voornaam",
      "form.lastNameLabel": "Achternaam",
      "form.emailLabel": "E-mail",
      "form.phoneCodeLabel": "Landcode",
      "form.phoneCodeBE": "BE +32 Belgie",
      "form.phoneCodeNL": "NL +31 Nederland",
      "form.phoneCodeFR": "FR +33 Frankrijk",
      "form.phoneCodeDE": "DE +49 Duitsland",
      "form.phoneCodeOther": "Andere",
      "form.phoneNumberOptionalLabel": "Telefoonnummer (optioneel)",
      "form.phoneHelp": "Vul alleen het lokale nummer in zonder landcode.",
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
      "form.specialRequestsLabel": "Speciale wensen of verzoeknummers",
      "form.optionalDetailsSummary": "Extra details (optioneel)",
      "form.privacyConsent": "Ik ga akkoord dat mijn gegevens worden verwerkt om mijn aanvraag te beantwoorden.",
      "form.privacyNote": "Lees ons privacy- en GDPR-beleid in de footer links hieronder.",
      "form.submit": "Verstuur aanvraag",

      "form.setup": "Formulier is nog niet gekoppeld. Vervang YOUR_FORM_ID in index.html.",
      "form.sending": "Bezig met versturen...",
      "form.success": "Bedankt! Je aanvraag is verstuurd. We nemen snel contact met je op.",
      "form.error": "Er liep iets mis bij het versturen. Probeer opnieuw of mail ons rechtstreeks.",
      "form.invalid": "Controleer de verplichte velden en probeer opnieuw.",

      "copy.success": "E-mailadres gekopieerd.",
      "copy.error": "Kopieren niet gelukt. Selecteer en kopieer handmatig.",

      "footer.legalLink": "Juridisch",
      "footer.privacyLink": "Privacy & GDPR",
      "footer.photoCreditsLabel": "Foto's door",
      "legal.text": "Deze website dient als informatie- en contactkanaal voor boekingen van Shadies & The Lady.",
      "privacy.text": "We gebruiken ingezonden contactgegevens uitsluitend om je aanvraag te beantwoorden. Formulierinzendingen worden verwerkt via Formspree als verwerker. Volgens hun publieke documentatie worden inzendingen op het gratis plan tot 30 dagen bewaard, en gebruikt Formspree Standard Contractual Clauses voor internationale gegevensoverdracht. Wij bewaren je gegevens zelf niet langer dan nodig voor de opvolging van je aanvraag.",
      "footer.copy": "© 2026 Shadies & The Lady. Alle rechten voorbehouden."
    },
    en: {
      "meta.title": "Shadies & The Lady | Pop & Rock Cover Band Limburg Belgium",
      "meta.description": "Shadies & The Lady is an all-round Belgian pop/rock cover band from Limburg. We play at weddings, festivals, private parties, pubs, and corporate events.",
      "meta.ogTitle": "Shadies & The Lady | Pop & Rock Cover Band Limburg Belgium",
      "meta.ogDescription": "Energetic live covers for weddings, festivals, private parties, pubs, and corporate events.",
      "meta.ogImageAlt": "Shadies & The Lady band logo",

      "brand.homeAria": "Go to home section",
      "nav.toggleAria": "Open navigation menu",
      "nav.mainAria": "Main navigation",
      "lang.aria": "Language switcher",

      "nav.home": "Home",
      "nav.band": "Band",
      "nav.repertoire": "Repertoire",
      "nav.gigsBooking": "Gigs & Booking",
      "nav.gallery": "Gallery",
      "nav.contact": "Contact",
      "nav.book": "Book Us",

      "hero.eyebrow": "Belgian Pop/Rock Cover Band",
      "hero.lead": "Energetic live covers for weddings, festivals, pubs, private parties, and corporate events.",
      "hero.ctaPrimary": "Book the Band",
      "hero.ctaSecondary": "See Upcoming Gigs",

      "band.title": "About the Band",
      "band.p1": "What started as a shared love of music grew into Shadies & The Lady: an enthusiastic pop and rock cover band from Limburg.",
      "band.p2": "We draw from several decades of music, mixing classics, guilty pleasures, powerful rock songs, and modern hits. We love taking an audience on a musical journey where everyone hears a song that brings back a memory.",
      "band.p3": "Whether it is a festival, wedding, pub, or corporate event, we take the stage with one goal: giving people a fantastic evening. Singing along, dancing, and enjoying live music together — that is what Shadies & The Lady is all about.",
      "band.membersTitle": "Band Members",
      "band.bio.diana": "As a child, Diana could spend hours singing along to songs by Clouseau and other artists in the living room, pretending she was on stage.\n\nIt was no surprise, then, that she wanted to attend music school. She chose the saxophone as her instrument, while continuing to develop her singing by performing with the church choir and regularly taking the microphone at karaoke nights.\n\nAs a young adult, other things took priority and music gradually moved into the background. Singing was mostly limited to shower performances.\n\nThat changed a few years ago, when she rediscovered her passion for music. She decided to pursue her childhood dream wholeheartedly and make singing an important part of her life again.\n\nSinging remains her greatest passion, but guided by the motto \"you are never too old to learn\", she also took up acoustic guitar at the beginning of 2025.\n\nBecause sitting still? That is clearly not Diana's style.",
      "band.bio.matthew": "Matthew discovered his love of music at music school from a young age. His interest quickly shifted towards guitar, sparked by bands like the Ramones, Led Zeppelin, and AC/DC. Classical lessons, however, felt less and less aligned with his musical taste, which was clearly heading towards rock and electric guitar. And honestly, as a teenager he had plenty of other things on his mind too.\nThe guitar then disappeared from his life for almost fifteen years. It was not until he was 28, thanks to his father, that Matthew found his way back to the instrument — in hindsight, one of the best decisions he ever made.\nSince then, playing guitar has grown into a real passion. He constantly experiments with new sounds, techniques, and gear, always looking for that little extra that makes a song sound even better. That curiosity and love of music comes through in every performance by Shadies & The Lady.",
      "band.bio.bart": "Bart discovered his passion for guitar through Metallica and Disturbed. He later added bands like Children of Bodom and AC/DC to the mix, with Angus Young and Alexi Laiho as his guitar heroes. While metal and rock have always been his favourite genres, over the years he has come to appreciate other styles of music too.\nAfter a year of guitar lessons, the guitar gathered dust for years as studies, a doctorate, and a busy career took over. It was thanks to a colleague and singer Diana that he rediscovered the musical spark.\nOn stage, Bart favours ESP/LTD and Gibson guitars. Digital amps? No problem. But there is one thing he is firm about: you won't catch him playing a Fender any time soon.",
      "band.bio.dirk": "Thanks to his mother, who comes from a musical family herself, Dirk found his way to music school at a young age. At twelve, he had to choose an instrument and ended up with guitar somewhat by chance. It quickly became clear, however, that classical guitar lessons were not for him. Too well-behaved, too dull.\nArmed with a Guitar for Dummies book from the library, he taught himself to play in his own way. When his first band needed a bassist and no one else volunteered, Dirk stepped up. What started as a practical solution grew into a lasting passion.\nToday he forms the solid foundation of Shadies & The Lady with his bass. He recently traded his trusty Yamaha for a Sandberg California TM4, laying down every groove with a smile.",
      "band.bio.philippe": "Philippe knew from an early age that rhythm was his thing. Armed with wooden spoons, washing powder tubs, and a healthy dose of imagination, he built his first drum kit at the age of six. At live shows, he never watched the singer or guitarist — his eyes were always on the drummer. His parents quickly realised the living room was not a concert hall and invested in a real drum kit.\nThat passion took him to the music academy in Mol, where he studied percussion. An international career was not to be, but his love of music, the stage, and a solid dose of pop and rock has only grown since.\nToday, Philippe is the driving force behind the rhythm of Shadies & The Lady. Give him a drum kit, a spotlight, and an enthusiastic crowd, and he is completely in his element.\nAll-time favourite: Purple Rain – Prince",

      "role.singer": "Singer",
      "role.guitar": "Guitar",
      "role.bass": "Bass",
      "role.drums": "Drums",

      "repertoire.title": "Repertoire",
      "repertoire.intro": "A selection from our live repertoire:",
      "repertoire.classicsTitle": "Classics",
      "repertoire.ninetiesTitle": "90s / 00s",
      "repertoire.modernTitle": "Modern & Crowd Favorites",

      "gigsBooking.title": "Gigs & Booking",
      "gigs.title": "Upcoming Gigs",
      "gigs.nextBadge": "Next Show",
      "gigs.nextCta": "BE THERE",
      "gigs.posterCta": "Poster",
      "gigs.posterAria": "View the poster for",
      "gigs.none": "No gigs are currently scheduled. Get in touch to book us.",

      "booking.step1Title": "Contact Us",
      "booking.step2Title": "Receive Proposal",
      "booking.step3Title": "Confirmation",

      "gallery.title": "Gallery",
      "gallery.intro": "Live moments, crowd energy, and behind-the-scenes photos.",
      "gallery.lightboxDialogAria": "Expanded gallery photo",
      "gallery.lightboxCloseAria": "Close",
      "gallery.lightboxPrevAria": "Previous photo",
      "gallery.lightboxNextAria": "Next photo",
      "gallery.lightboxCloseTitle": "Close",
      "gallery.lightboxPrevTitle": "Previous",
      "gallery.lightboxNextTitle": "Next",
      "gallery.photo1": "Banners are cool!",
      "gallery.photo2": "Our work station",
      "gallery.photo3": "Matthew rocking the guitar",
      "gallery.photo4": "Philippe rocking the drums",
      "gallery.photo5": "Diana singing her heart out",
      "gallery.photo6": "Bart making guitar faces",
      "gallery.photo7": "Dirk keeping the groove",

      "contact.title": "Contact",
      "contact.emailLabel": "Email:",
      "contact.socialLabel": "Social:",
      "contact.copyEmail": "Copy",

      "social.facebookAria": "Facebook",
      "social.instagramAria": "Instagram",
      "social.linktreeAria": "Linktree",
      "social.facebookTitle": "Facebook",
      "social.instagramTitle": "Instagram",
      "social.linktreeTitle": "Linktree",

      "form.note": "How booking works:",
      "form.firstNameLabel": "First name",
      "form.lastNameLabel": "Last name",
      "form.emailLabel": "Email",
      "form.phoneCodeLabel": "Country code",
      "form.phoneCodeBE": "BE +32 Belgium",
      "form.phoneCodeNL": "NL +31 Netherlands",
      "form.phoneCodeFR": "FR +33 France",
      "form.phoneCodeDE": "DE +49 Germany",
      "form.phoneCodeOther": "Other",
      "form.phoneNumberOptionalLabel": "Phone number (optional)",
      "form.phoneHelp": "Enter only the local number without country code.",
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
      "form.specialRequestsLabel": "Special requests or song wishes",
      "form.optionalDetailsSummary": "Additional details (optional)",
      "form.privacyConsent": "I agree that my data will be processed to respond to my inquiry.",
      "form.privacyNote": "Read our privacy and GDPR statement in the footer links below.",
      "form.submit": "Send request",

      "form.setup": "Form is not connected yet. Replace YOUR_FORM_ID in index.html.",
      "form.sending": "Sending...",
      "form.success": "Thank you! Your request has been sent. We will contact you soon.",
      "form.error": "Something went wrong while sending. Please try again or email us directly.",
      "form.invalid": "Please check required fields and try again.",

      "copy.success": "Email address copied.",
      "copy.error": "Copy failed. Please copy the address manually.",

      "footer.legalLink": "Legal",
      "footer.privacyLink": "Privacy & GDPR",
      "footer.photoCreditsLabel": "Photos by",
      "legal.text": "This website serves as an information and booking contact channel for Shadies & The Lady.",
      "privacy.text": "We use submitted contact details only to respond to your inquiry. Form submissions are processed via Formspree as our data processor. According to their public documentation, submissions on the free plan are retained for up to 30 days, and Formspree relies on Standard Contractual Clauses for international data transfers. We do not keep your personal data ourselves longer than needed to follow up on your inquiry.",
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
        var translatedText = t(key, lang);
        if (translatedText !== key) {
          element.textContent = translatedText;
        }
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

    var titleElements = document.querySelectorAll("[data-i18n-title-key]");
    titleElements.forEach(function (element) {
      var titleKey = element.getAttribute("data-i18n-title-key");
      if (titleKey) {
        element.setAttribute("title", t(titleKey, lang));
      }
    });

    var altElements = document.querySelectorAll("[data-i18n-alt-key]");
    altElements.forEach(function (element) {
      var altKey = element.getAttribute("data-i18n-alt-key");
      if (altKey) {
        element.setAttribute("alt", t(altKey, lang));
        var galleryItem = element.closest(".gallery-item");
        if (galleryItem) {
          galleryItem.setAttribute("aria-label", t(altKey, lang));
        }
      }
    });

    document.title = t("meta.title", lang);

    // Store current UI language with each form submission.
    var formLanguageField = document.getElementById("formLanguage");
    if (formLanguageField) {
      formLanguageField.value = lang;
    }

    updateLanguageButtons(lang);
    saveLanguage(lang);

    if (typeof memberBioRefreshHandler === "function") {
      memberBioRefreshHandler(lang);
    }

    if (typeof gigsRefreshHandler === "function") {
      gigsRefreshHandler(lang);
    }
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

    function closeNavigation() {
      if (!siteNavigation.classList.contains("is-open")) {
        return;
      }
      navToggleButton.setAttribute("aria-expanded", "false");
      siteNavigation.classList.remove("is-open");
    }

    document.addEventListener("click", function (event) {
      if (!siteNavigation.contains(event.target) && !navToggleButton.contains(event.target)) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    var navigationLinks = siteNavigation.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeNavigation();
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
          threshold: 0,
          rootMargin: "0px 0px -10% 0px"
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

  // Built from local date parts so a gig never shifts a day across time zones.
  function parseGigDate(isoDate) {
    var parts = String(isoDate).split("-");
    if (parts.length !== 3) {
      return NaN;
    }
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).getTime();
  }

  function getUpcomingGigs() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayStamp = today.getTime();

    return GIGS.filter(function (gig) {
      var stamp = parseGigDate(gig.date);
      // A gig stays listed for the whole of its own day.
      return isNaN(stamp) || stamp >= todayStamp;
    }).sort(function (first, second) {
      return parseGigDate(first.date) - parseGigDate(second.date);
    });
  }

  function getFeaturedIndex(gigs) {
    var firstPublic = -1;

    for (var index = 0; index < gigs.length; index += 1) {
      if (gigs[index].featured) {
        return index;
      }
      // Private bookings are listed but never headlined, since nobody can attend.
      if (firstPublic === -1 && !gigs[index].private) {
        firstPublic = index;
      }
    }

    if (firstPublic !== -1) {
      return firstPublic;
    }

    return gigs.length > 0 ? 0 : -1;
  }

  function formatGigDate(isoDate, lang) {
    var parts = String(isoDate).split("-");
    var months = MONTH_ABBREVIATIONS[lang] || MONTH_ABBREVIATIONS[DEFAULT_LANGUAGE];
    var monthIndex = Number(parts[1]) - 1;

    if (parts.length !== 3 || !months[monthIndex]) {
      return isoDate;
    }

    return Number(parts[2]) + " " + months[monthIndex] + " " + parts[0];
  }

  function buildPosterButton(gig, lang, isFeatured) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "gig-cta";
    button.setAttribute("data-poster-src", gig.poster);
    button.setAttribute("data-poster-caption", gig.title + " — " + gig.place + ", " + formatGigDate(gig.date, lang));
    button.setAttribute("aria-label", t("gigs.posterAria", lang) + " " + gig.title);

    var posterWrap = document.createElement("span");
    posterWrap.className = "gig-cta-poster";

    var posterImage = document.createElement("img");
    posterImage.src = gig.poster;
    posterImage.alt = "";
    posterImage.loading = "lazy";
    posterWrap.appendChild(posterImage);

    var label = document.createElement("span");
    label.className = "gig-cta-label";

    var labelText = document.createElement("span");
    labelText.textContent = isFeatured ? t("gigs.nextCta", lang) : t("gigs.posterCta", lang);
    label.appendChild(labelText);

    var arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrow.setAttribute("class", "gig-cta-arrow");
    arrow.setAttribute("viewBox", "0 0 24 24");
    arrow.setAttribute("aria-hidden", "true");
    arrow.setAttribute("focusable", "false");

    var arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("d", "M4 12h13.2l-4.6-4.6L14 6l7 6-7 6-1.4-1.4 4.6-4.6H4z");
    arrow.appendChild(arrowPath);
    label.appendChild(arrow);

    button.appendChild(posterWrap);
    button.appendChild(label);

    return button;
  }

  function buildGigCard(gig, lang, isFeatured) {
    var card = document.createElement("article");
    card.className = isFeatured ? "gig-card featured" : "gig-card";

    var details = document.createElement("div");
    details.className = "gig-featured-text";

    if (isFeatured) {
      var badge = document.createElement("p");
      badge.className = "gig-badge";
      badge.setAttribute("data-i18n-key", "gigs.nextBadge");
      badge.textContent = t("gigs.nextBadge", lang);
      details.appendChild(badge);
    }

    var date = document.createElement("p");
    date.className = "gig-date";
    date.textContent = formatGigDate(gig.date, lang);
    details.appendChild(date);

    var title = document.createElement("h4");
    title.textContent = gig.title;
    details.appendChild(title);

    var place = document.createElement("p");
    place.textContent = gig.place;
    details.appendChild(place);

    card.appendChild(details);

    if (gig.poster) {
      card.appendChild(buildPosterButton(gig, lang, isFeatured));
    }

    return card;
  }

  function renderGigStructuredData() {
    var container = document.getElementById("gigsStructuredData");
    if (!container) {
      return;
    }

    var events = getUpcomingGigs().filter(function (gig) {
      return !gig.private;
    }).map(function (gig) {
      return {
        "@type": "MusicEvent",
        name: gig.title,
        startDate: gig.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: gig.venue || gig.place,
          address: {
            "@type": "PostalAddress",
            addressLocality: gig.city || gig.place,
            addressCountry: "BE"
          }
        },
        performer: { "@type": "MusicGroup", name: "Shadies & The Lady" }
      };
    });

    container.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": events
    });
  }

  function initializeGigs() {
    var timeline = document.getElementById("gigsTimeline");
    if (!timeline) {
      return;
    }

    function renderGigs(language) {
      var lang = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
      var upcoming = getUpcomingGigs();
      var featuredIndex = getFeaturedIndex(upcoming);

      timeline.innerHTML = "";

      if (upcoming.length === 0) {
        var empty = document.createElement("p");
        empty.className = "gigs-empty";
        empty.setAttribute("data-i18n-key", "gigs.none");
        empty.textContent = t("gigs.none", lang);
        timeline.appendChild(empty);
        return;
      }

      upcoming.forEach(function (gig, index) {
        timeline.appendChild(buildGigCard(gig, lang, index === featuredIndex));
      });
    }

    renderGigs(document.documentElement.getAttribute("data-current-lang"));
    renderGigStructuredData();

    gigsRefreshHandler = renderGigs;
  }

  function initializeGalleryLightbox() {    var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid .gallery-item"));
    var lightbox = document.getElementById("galleryLightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxCounter = document.getElementById("lightboxCounter");
    var closeButton = document.getElementById("lightboxClose");
    var prevButton = document.getElementById("lightboxPrev");
    var nextButton = document.getElementById("lightboxNext");

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxCounter || !closeButton || !prevButton || !nextButton) {
      return;
    }

    var currentIndex = 0;
    var activeSlides = [];
    var lastTrigger = null;
    var touchStartX = null;
    var previousBodyOverflow = "";
    var previousHtmlOverflow = "";

    // Keep fixed positioning viewport-based even inside transformed section wrappers.
    if (lightbox.parentNode !== document.body) {
      document.body.appendChild(lightbox);
    }

    function lockPageScroll() {
      previousBodyOverflow = document.body.style.overflow;
      previousHtmlOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.classList.add("has-lightbox-open");
    }

    function unlockPageScroll() {
      document.body.classList.remove("has-lightbox-open");
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }

    // Read captions at open time so they follow the active language.
    function buildGallerySlides() {
      return galleryItems
        .map(function (item) {
          var image = item.querySelector("img");
          if (!image) {
            return null;
          }
          return { src: image.src, caption: image.alt };
        })
        .filter(Boolean);
    }

    function setLightboxImage(index) {
      if (activeSlides.length === 0) {
        return;
      }

      if (index < 0) {
        currentIndex = activeSlides.length - 1;
      } else if (index >= activeSlides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      var slide = activeSlides[currentIndex];
      if (!slide) {
        return;
      }

      var hasMultipleSlides = activeSlides.length > 1;

      lightboxImage.src = slide.src;
      lightboxImage.alt = slide.caption;
      lightboxCaption.textContent = slide.caption;
      lightboxCounter.textContent = hasMultipleSlides
        ? String(currentIndex + 1) + " / " + String(activeSlides.length)
        : "";
      lightboxCounter.hidden = !hasMultipleSlides;
      prevButton.hidden = !hasMultipleSlides;
      nextButton.hidden = !hasMultipleSlides;
    }

    function openLightbox(slides, index, triggerElement) {
      if (!slides || slides.length === 0) {
        return;
      }

      activeSlides = slides;
      lastTrigger = triggerElement || null;
      setLightboxImage(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lockPageScroll();
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      unlockPageScroll();

      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    }

    function showPreviousImage() {
      if (activeSlides.length < 2) {
        return;
      }
      setLightboxImage(currentIndex - 1);
    }

    function showNextImage() {
      if (activeSlides.length < 2) {
        return;
      }
      setLightboxImage(currentIndex + 1);
    }

    galleryItems.forEach(function (item, index) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");

      var previewImage = item.querySelector("img");
      if (previewImage && previewImage.alt) {
        item.setAttribute("aria-label", previewImage.alt);
      }

      item.addEventListener("click", function () {
        openLightbox(buildGallerySlides(), index, item);
      });

      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(buildGallerySlides(), index, item);
        }
      });
    });

    // Delegated so poster buttons keep working after the gig list re-renders.
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest ? event.target.closest("[data-poster-src]") : null;
      if (!trigger) {
        return;
      }

      var posterSource = trigger.getAttribute("data-poster-src");
      if (!posterSource) {
        return;
      }

      var posterCaption = trigger.getAttribute("data-poster-caption") || trigger.getAttribute("aria-label") || "";
      openLightbox([{ src: posterSource, caption: posterCaption }], 0, trigger);
    });

    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    lightbox.addEventListener("touchstart", function (event) {
      if (!event.touches || event.touches.length === 0) {
        return;
      }
      touchStartX = event.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", function (event) {
      if (touchStartX === null || !event.changedTouches || event.changedTouches.length === 0) {
        touchStartX = null;
        return;
      }

      var touchEndX = event.changedTouches[0].clientX;
      var deltaX = touchEndX - touchStartX;
      touchStartX = null;

      if (Math.abs(deltaX) < 40) {
        return;
      }

      if (deltaX > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      }
    });
  }

  function initializeMemberBioToggle() {
    var memberCards = Array.prototype.slice.call(document.querySelectorAll(".member-toggle[data-member-id]"));
    var bioPanel = document.getElementById("memberBioPanel");
    var bioText = document.getElementById("memberBioText");

    if (!bioPanel || !bioText || memberCards.length === 0) {
      return;
    }

    var activeMemberId = null;

    function getCurrentLanguage() {
      var lang = document.documentElement.getAttribute("data-current-lang");
      if (SUPPORTED_LANGUAGES.indexOf(lang) !== -1) {
        return lang;
      }
      return DEFAULT_LANGUAGE;
    }

    function setCardActiveState(memberId) {
      memberCards.forEach(function (card) {
        var isActive = card.getAttribute("data-member-id") === memberId;
        card.classList.toggle("is-active", isActive);
        card.setAttribute("aria-expanded", isActive ? "true" : "false");
      });
    }

    function renderBio(memberId, shouldScrollIntoView) {
      var card = memberCards.find(function (item) {
        return item.getAttribute("data-member-id") === memberId;
      });

      if (!card) {
        return;
      }

      var currentLang = getCurrentLanguage();
      var bioKey = "band.bio." + memberId;

      var bioContent = t(bioKey, currentLang);
      var gridContainer = document.querySelector('.members-grid');
      // On mobile: insert after clicked card (inside grid)
      // On desktop: insert after grid (outside grid) to preserve 5-column layout
      if (window.innerWidth <= 860) {
        card.insertAdjacentElement("afterend", bioPanel);
      } else {
        gridContainer.insertAdjacentElement("afterend", bioPanel);
      }
      bioText.innerHTML = "";
      bioContent.split("\n").forEach(function (paragraph) {
        if (paragraph.trim()) {
          var p = document.createElement("p");
          p.textContent = paragraph;
          bioText.appendChild(p);
        }
      });

      bioPanel.hidden = false;
      setCardActiveState(memberId);

      if (shouldScrollIntoView) {
        bioPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    function collapseBio() {
      activeMemberId = null;
      bioPanel.hidden = true;
      setCardActiveState(null);
    }

    function toggleBio(memberId) {
      if (activeMemberId === memberId) {
        collapseBio();
        return;
      }

      activeMemberId = memberId;
      renderBio(memberId, true);
    }

    memberCards.forEach(function (card) {
      var memberId = card.getAttribute("data-member-id");

      card.addEventListener("click", function () {
        if (!memberId) {
          return;
        }
        toggleBio(memberId);
      });

      card.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        if (!memberId) {
          return;
        }
        toggleBio(memberId);
      });
    });

    memberBioRefreshHandler = function () {
      if (!activeMemberId) {
        return;
      }
      renderBio(activeMemberId, false);
    };
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

  function setCopyStatus(type, message) {
    var statusElement = document.getElementById("copy-status");
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

  function initializeCopyEmail() {
    var copyButton = document.getElementById("copyEmailButton");
    var emailElement = document.getElementById("contactEmail");

    if (!copyButton || !emailElement) {
      return;
    }

    copyButton.addEventListener("click", function () {
      var currentLang = document.documentElement.getAttribute("data-current-lang") || DEFAULT_LANGUAGE;
      var emailAddress = emailElement.textContent.trim();

      if (!emailAddress) {
        setCopyStatus("error", t("copy.error", currentLang));
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(emailAddress)
          .then(function () {
            setCopyStatus("success", t("copy.success", currentLang));
          })
          .catch(function () {
            setCopyStatus("error", t("copy.error", currentLang));
          });
        return;
      }

      // Fallback for older browsers
      var tempInput = document.createElement("input");
      tempInput.value = emailAddress;
      document.body.appendChild(tempInput);
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);

      try {
        document.execCommand("copy");
        setCopyStatus("success", t("copy.success", currentLang));
      } catch (error) {
        setCopyStatus("error", t("copy.error", currentLang));
      }

      document.body.removeChild(tempInput);
    });
  }

  function initializeContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    var isSubmitting = false;

    var dateField = document.getElementById("eventDate");
    if (dateField && !dateField.getAttribute("min")) {
      dateField.setAttribute("min", new Date().toISOString().slice(0, 10));
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

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

      isSubmitting = true;
      if (submitButton) {
        submitButton.disabled = true;
      }
      setFormStatus("", t("form.sending", currentLang));

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
          var formLanguageField = document.getElementById("formLanguage");
          if (formLanguageField) {
            formLanguageField.value = currentLang;
          }
          setFormStatus("success", t("form.success", currentLang));
        })
        .catch(function () {
          setFormStatus("error", t("form.error", currentLang));
        })
        .then(function () {
          isSubmitting = false;
          if (submitButton) {
            submitButton.disabled = false;
          }
        });
    });
  }

  initializeLanguageSwitcher();
  initializeMobileNavigation();
  initializeRevealAnimations();
  initializeMemberBioToggle();
  initializeGigs();
  initializeGalleryLightbox();
  initializeCopyEmail();
  initializeContactForm();
})();
