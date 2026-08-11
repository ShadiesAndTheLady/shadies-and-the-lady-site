/*
  File purpose: Site interactions, language handling, and lightweight UI behavior.
  Includes:
  1) Mobile menu behavior
  2) Reveal animation
  3) EN/NL translations with Dutch default
  4) Gallery lightbox navigation
  5) Copy-email and Formspree contact form handling
*/

(function () {
  "use strict";

  var STORAGE_KEY = "shadies-site-language";
  var DEFAULT_LANGUAGE = "nl";
  var SUPPORTED_LANGUAGES = ["en", "nl"];
  var memberBioRefreshHandler = null;

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
      "nav.videos": "Video's",
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
      "band.membersIntro": "Voeg later kleine headshots toe per bandlid door de placeholder te vervangen met een foto.",
      "band.bio.diana": "placeholder text for Diana Braet",
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
      "repertoire.aria": "Artiesten in repertoire",
      "repertoire.classicsTitle": "Classics",
      "repertoire.classicsText": "Tijdloze rock- en popanthems die iedereen meezingt.",
      "repertoire.ninetiesTitle": "90s / 00s",
      "repertoire.ninetiesText": "Songs waarmee het publiek opgroeide, van grunge tot poprock.",
      "repertoire.modernTitle": "Modern & Publieksfavorieten",
      "repertoire.modernText": "Nieuwe tracks en vaste publieksfavorieten voor een volle dansvloer.",

      "gigsBooking.title": "Optredens & Boeken",
      "gigsBooking.intro": "Actieve kalender, duidelijke boekingsflow en praktische technische info op een plek.",
      "gigs.title": "Aankomende Optredens",
      "gigs.nextBadge": "Volgende show",
      "gigs.date1": "29 AUG 2026",
      "gigs.date2": "19 SEP 2026",
      "gigs.date3": "20 SEP 2026",
      "gigs.date4": "3 OKT 2026",
      "gigs.date5": "10 NOV 2026",
      "gigs.nextCta": "IK BEN ERBIJ ->",

      "booking.title": "Boekingsinformatie",
      "booking.step1Title": "Neem contact op",
      "booking.step1Text": "Stuur ons je datum, locatie, type event en verwachte timing.",
      "booking.step2Title": "Ontvang voorstel",
      "booking.step2Text": "Wij bevestigen beschikbaarheid en bezorgen een voorstel op maat.",
      "booking.step3Title": "Bevestiging",
      "booking.step3Text": "Na akkoord stemmen we opbouw, setduur en praktische details af.",
      "booking.priceTitle": "Een offerte op maat",
      "booking.priceText": "Vraag je offerte aan via het formulier. We antwoorden snel met een voorstel op maat van je event.",

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
      "gallery.photoGuide": "Fototip: gebruik beelden van ongeveer 1600px breed en 250-600 KB voor goede kwaliteit en snelle laadtijd.",
      "gallery.placeholder": "Foto Placeholder",
      "gallery.lightboxDialogAria": "Vergrote galerijfoto",
      "gallery.lightboxCloseAria": "Sluiten",
      "gallery.lightboxPrevAria": "Vorige foto",
      "gallery.lightboxNextAria": "Volgende foto",
      "gallery.lightboxCloseTitle": "Sluiten",
      "gallery.lightboxPrevTitle": "Vorige",
      "gallery.lightboxNextTitle": "Volgende",

      "videos.title": "Video's",
      "videos.intro": "Bekijk ons live en voel de sfeer.",

      "contact.title": "Contact",
      "contact.intro": "Klaar om live energie op jouw event te brengen? Stuur je aanvraag hieronder.",
      "contact.emailLabel": "E-mail:",
      "contact.phoneLabel": "Telefoon:",
      "contact.phoneOptionalLabel": "Telefoon (optioneel)",
      "contact.locationLabel": "Locatie:",
      "contact.locationValue": "Limburg, Belgie",
      "contact.socialLabel": "Socials:",
      "contact.copyEmail": "Kopieer",
      "contact.snapshotTitle": "Boekingssnapshot",
      "contact.snapshot1": "Gemiddelde reactietijd: binnen 48 uur",
      "contact.snapshot2": "Beschikbaar voor trouw, festival, prive en corporate events",
      "contact.snapshot3": "PA en verlichting mogelijk op aanvraag",
      "contact.snapshot4": "Actief in Limburg en ver daarbuiten",

      "social.facebookAria": "Facebook",
      "social.instagramAria": "Instagram",
      "social.linktreeAria": "Linktree",
      "social.facebookTitle": "Facebook",
      "social.instagramTitle": "Instagram",
      "social.linktreeTitle": "Linktree",

      "form.note": "Zo verloopt boeken:",
      "form.fullNameLabel": "Naam",
      "form.firstNameLabel": "Voornaam",
      "form.lastNameLabel": "Achternaam",
      "form.emailLabel": "E-mail",
      "form.phoneCodeLabel": "Landcode",
      "form.phoneCodeBE": "BE +32 Belgie",
      "form.phoneCodeNL": "NL +31 Nederland",
      "form.phoneCodeFR": "FR +33 Frankrijk",
      "form.phoneCodeDE": "DE +49 Duitsland",
      "form.phoneCodeOther": "Andere",
      "form.phoneOptionalLabel": "Telefoon (optioneel)",
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
      "form.optionalDetailsSummary": "Bericht / extra details (optioneel)",
      "form.privacyConsent": "Ik ga akkoord dat mijn gegevens worden verwerkt om mijn aanvraag te beantwoorden.",
      "form.privacyNote": "Lees ons privacy- en GDPR-beleid in de footer links hieronder.",
      "form.submit": "Verstuur aanvraag",

      "form.setup": "Formulier is nog niet gekoppeld. Vervang YOUR_FORM_ID in index.html.",
      "form.success": "Bedankt! Je aanvraag is verstuurd. We nemen snel contact met je op.",
      "form.error": "Er liep iets mis bij het versturen. Probeer opnieuw of mail ons rechtstreeks.",
      "form.invalid": "Controleer de verplichte velden en probeer opnieuw.",

      "copy.success": "E-mailadres gekopieerd.",
      "copy.error": "Kopieren niet gelukt. Selecteer en kopieer handmatig.",

      "footer.aboutTitle": "Shadies & The Lady",
      "footer.aboutText": "Pop/rock coverband uit Limburg voor feesten, festivals en bedrijfsevents.",
      "footer.quickTitle": "Snelle Links",
      "footer.linkBand": "Band",
      "footer.linkBooking": "Boeken",
      "footer.linkGallery": "Galerij",
      "footer.linkContact": "Contact",
      "footer.bookingTitle": "Boeking",
      "footer.bookingText": "Gebruik het formulier of mail ons rechtstreeks voor een offerte op maat.",
      "footer.legalLink": "Juridisch",
      "footer.privacyLink": "Privacy & GDPR",
      "footer.photoCreditsLabel": "Foto's door",
      "legal.title": "Juridische Informatie",
      "legal.text": "Deze website dient als informatie- en contactkanaal voor boekingen van Shadies & The Lady.",
      "privacy.title": "Privacy & GDPR",
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
      "nav.videos": "Videos",
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
      "band.membersIntro": "You can add small headshots for each member later by replacing the placeholder.",
      "band.bio.diana": "placeholder text for Diana Braet",
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
      "repertoire.aria": "Artists in repertoire",
      "repertoire.classicsTitle": "Classics",
      "repertoire.classicsText": "Timeless rock and pop anthems everyone sings along to.",
      "repertoire.ninetiesTitle": "90s / 00s",
      "repertoire.ninetiesText": "Songs the crowd grew up with, from grunge to pop-rock.",
      "repertoire.modernTitle": "Modern & Crowd Favorites",
      "repertoire.modernText": "Newer tracks and proven crowd favorites for a full dance floor.",

      "gigsBooking.title": "Gigs & Booking",
      "gigsBooking.intro": "Live calendar, clear booking flow, and practical technical info in one place.",
      "gigs.title": "Upcoming Gigs",
      "gigs.nextBadge": "Next Show",
      "gigs.date1": "29 AUG 2026",
      "gigs.date2": "19 SEP 2026",
      "gigs.date3": "20 SEP 2026",
      "gigs.date4": "3 OCT 2026",
      "gigs.date5": "10 NOV 2026",
      "gigs.nextCta": "BE THERE ->",

      "booking.title": "Booking Information",
      "booking.step1Title": "Contact Us",
      "booking.step1Text": "Send us your date, location, event type, and expected timing.",
      "booking.step2Title": "Receive Proposal",
      "booking.step2Text": "We confirm availability and send a tailored proposal.",
      "booking.step3Title": "Confirmation",
      "booking.step3Text": "After agreement, we align setup, set duration, and practical details.",
      "booking.priceTitle": "A Tailored Quote",
      "booking.priceText": "Request your quote through the form. We reply quickly with a proposal tailored to your event.",

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
      "gallery.photoGuide": "Photo tip: use images around 1600px wide and 250-600 KB for good quality and fast loading.",
      "gallery.placeholder": "Photo Placeholder",
      "gallery.lightboxDialogAria": "Expanded gallery photo",
      "gallery.lightboxCloseAria": "Close",
      "gallery.lightboxPrevAria": "Previous photo",
      "gallery.lightboxNextAria": "Next photo",
      "gallery.lightboxCloseTitle": "Close",
      "gallery.lightboxPrevTitle": "Previous",
      "gallery.lightboxNextTitle": "Next",

      "videos.title": "Videos",
      "videos.intro": "Watch us live and feel the atmosphere.",

      "contact.title": "Contact",
      "contact.intro": "Ready to bring live energy to your event? Send your request below.",
      "contact.emailLabel": "Email:",
      "contact.phoneLabel": "Phone:",
      "contact.phoneOptionalLabel": "Phone (optional)",
      "contact.locationLabel": "Location:",
      "contact.locationValue": "Limburg, Belgium",
      "contact.socialLabel": "Social:",
      "contact.copyEmail": "Copy",
      "contact.snapshotTitle": "Booking Snapshot",
      "contact.snapshot1": "Average response time: within 48 hours",
      "contact.snapshot2": "Available for weddings, festivals, private and corporate events",
      "contact.snapshot3": "PA and lighting available on request",
      "contact.snapshot4": "Active in Limburg and beyond",

      "social.facebookAria": "Facebook",
      "social.instagramAria": "Instagram",
      "social.linktreeAria": "Linktree",
      "social.facebookTitle": "Facebook",
      "social.instagramTitle": "Instagram",
      "social.linktreeTitle": "Linktree",

      "form.note": "How booking works:",
      "form.fullNameLabel": "Name",
      "form.firstNameLabel": "First name",
      "form.lastNameLabel": "Last name",
      "form.emailLabel": "Email",
      "form.phoneCodeLabel": "Country code",
      "form.phoneCodeBE": "BE +32 Belgium",
      "form.phoneCodeNL": "NL +31 Netherlands",
      "form.phoneCodeFR": "FR +33 France",
      "form.phoneCodeDE": "DE +49 Germany",
      "form.phoneCodeOther": "Other",
      "form.phoneOptionalLabel": "Phone (optional)",
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
      "form.optionalDetailsSummary": "Message / extra details (optional)",
      "form.privacyConsent": "I agree that my data will be processed to respond to my inquiry.",
      "form.privacyNote": "Read our privacy and GDPR statement in the footer links below.",
      "form.submit": "Send request",

      "form.setup": "Form is not connected yet. Replace YOUR_FORM_ID in index.html.",
      "form.success": "Thank you! Your request has been sent. We will contact you soon.",
      "form.error": "Something went wrong while sending. Please try again or email us directly.",
      "form.invalid": "Please check required fields and try again.",

      "copy.success": "Email address copied.",
      "copy.error": "Copy failed. Please copy the address manually.",

      "footer.aboutTitle": "Shadies & The Lady",
      "footer.aboutText": "Pop/rock cover band from Limburg for parties, festivals, and corporate events.",
      "footer.quickTitle": "Quick Links",
      "footer.linkBand": "Band",
      "footer.linkBooking": "Booking",
      "footer.linkGallery": "Gallery",
      "footer.linkContact": "Contact",
      "footer.bookingTitle": "Booking",
      "footer.bookingText": "Use the form or email us directly for a tailored quote.",
      "footer.legalLink": "Legal",
      "footer.privacyLink": "Privacy & GDPR",
      "footer.photoCreditsLabel": "Photos by",
      "legal.title": "Legal Information",
      "legal.text": "This website serves as an information and booking contact channel for Shadies & The Lady.",
      "privacy.title": "Privacy & GDPR",
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

  function initializeGalleryLightbox() {
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid .gallery-item"));
    var lightbox = document.getElementById("galleryLightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxCounter = document.getElementById("lightboxCounter");
    var closeButton = document.getElementById("lightboxClose");
    var prevButton = document.getElementById("lightboxPrev");
    var nextButton = document.getElementById("lightboxNext");

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxCounter || !closeButton || !prevButton || !nextButton || galleryItems.length === 0) {
      return;
    }

    var currentIndex = 0;
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

    function getImageFromIndex(index) {
      var item = galleryItems[index];
      if (!item) {
        return null;
      }
      return item.querySelector("img");
    }

    function setLightboxImage(index) {
      if (galleryItems.length === 0) {
        return;
      }

      if (index < 0) {
        currentIndex = galleryItems.length - 1;
      } else if (index >= galleryItems.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      var sourceImage = getImageFromIndex(currentIndex);
      if (!sourceImage) {
        return;
      }

      lightboxImage.src = sourceImage.src;
      lightboxImage.alt = sourceImage.alt;
      lightboxCaption.textContent = sourceImage.alt;
      lightboxCounter.textContent = String(currentIndex + 1) + " / " + String(galleryItems.length);
    }

    function openLightbox(index, triggerElement) {
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
      setLightboxImage(currentIndex - 1);
    }

    function showNextImage() {
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
        openLightbox(index, item);
      });

      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(index, item);
        }
      });
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
    var bioName = document.getElementById("memberBioName");
    var bioRole = document.getElementById("memberBioRole");
    var bioText = document.getElementById("memberBioText");

    if (!bioPanel || !bioName || !bioRole || !bioText || memberCards.length === 0) {
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

      var nameElement = card.querySelector("h4");
      var roleElement = card.querySelector("p");
      var currentLang = getCurrentLanguage();
      var bioKey = "band.bio." + memberId;

      bioName.textContent = nameElement ? nameElement.textContent.trim() : "";
      bioRole.textContent = roleElement ? roleElement.textContent.trim() : "";
      var bioContent = t(bioKey, currentLang);
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
  initializeMemberBioToggle();
  initializeGalleryLightbox();
  initializeCopyEmail();
  initializeContactForm();
})();
