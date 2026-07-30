// ─────────────────────────────────────────────
// MY LAST BIKE — sitegedrag
// ─────────────────────────────────────────────
(function () {
  const D = window.SITE_DATA || {};

  // 1. Waarden uit data.js in de pagina zetten
  document.querySelectorAll("[data-key]").forEach(function (el) {
    const key = el.getAttribute("data-key");
    if (D[key]) el.textContent = D[key];
  });
  document.querySelectorAll("[data-key-href]").forEach(function (el) {
    const key = el.getAttribute("data-key-href");
    if (D[key]) el.href = "mailto:" + D[key];
  });

  // 2. Geometrietabel opbouwen
  const geoBody = document.getElementById("geo_body");
  if (geoBody && Array.isArray(D.geometrie)) {
    D.geometrie.forEach(function (r) {
      const tr = document.createElement("tr");
      [r.maat, r.stack, r.reach, r.zithoek, r.balhoofd].forEach(function (v) {
        const td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      geoBody.appendChild(tr);
    });
  }

  // 3. Foto placeholders: toon de opnamebrief zolang de foto ontbreekt
  document.querySelectorAll(".shot img").forEach(function (img) {
    function markMissing() { img.closest(".shot").classList.add("missing"); }
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  });

  // 4. Road / gravel wissel
  const MODES = {
    road: {
      bandenruimte: D.bandenruimte_road || "tot 32 mm",
      opzet: "Snel op asfalt, lange trainingen, wedstrijden",
      wissel: "Ander wielset erin en je staat op gravel",
      img: "shots/shot_02_road.jpg",
      alt: "De fiets in road opzet, zijaanzicht",
      shotNum: "FOTO 02",
      shotText: "Zijaanzicht in road opzet, strakke achtergrond",
      shotFile: "Verhouding 3:2 · bestand: shots/shot_02_road.jpg"
    },
    gravel: {
      bandenruimte: D.bandenruimte_gravel || "tot 45 mm",
      opzet: "Onverhard, lange dagen, bikepacking",
      wissel: "Ander wielset erin en je staat op asfalt",
      img: "shots/shot_03_gravel.jpg",
      alt: "De fiets in gravel opzet, zijaanzicht",
      shotNum: "FOTO 03",
      shotText: "Zijaanzicht in gravel opzet, ruig terrein of grindpad",
      shotFile: "Verhouding 3:2 · bestand: shots/shot_03_gravel.jpg"
    }
  };

  const switchEl = document.querySelector(".mode_switch");
  const modeImg = document.getElementById("mode_img");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modeOrder = ["road", "gravel"];
  let currentMode = "road";

  function setMode(name) {
    const m = MODES[name];
    if (!m || !switchEl) return;

    const dir = modeOrder.indexOf(name) > modeOrder.indexOf(currentMode) ? 1 : -1;
    currentMode = name;

    switchEl.setAttribute("data-active", name);
    switchEl.querySelectorAll(".mode_btn").forEach(function (b) {
      const active = b.getAttribute("data-mode") === name;
      b.classList.toggle("is_active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-mode-field]").forEach(function (el) {
      el.textContent = m[el.getAttribute("data-mode-field")] || "";
    });
    document.getElementById("mode_shot_num").textContent = m.shotNum;
    document.getElementById("mode_shot_text").textContent = m.shotText;
    document.getElementById("mode_shot_file").textContent = m.shotFile;

    const shot = modeImg.closest(".shot");

    if (reduceMotion) {
      shot.classList.remove("missing");
      modeImg.alt = m.alt;
      modeImg.src = m.img;
      return;
    }

    modeImg.style.opacity = "0";
    setTimeout(function () {
      modeImg.alt = m.alt;
      modeImg.src = m.img;
      shot.classList.remove("missing");
      modeImg.style.opacity = "1";
    }, 180);
  }

  if (switchEl) {
    switchEl.querySelectorAll(".mode_btn").forEach(function (b) {
      b.addEventListener("click", function () { setMode(b.getAttribute("data-mode")); });
    });
  }

  // Initialise spec values from data.js so HTML defaults are never shown
  document.querySelectorAll("[data-mode-field]").forEach(function (el) {
    el.textContent = MODES.road[el.getAttribute("data-mode-field")] || "";
  });

  // 5. Formulier: naar Formspree zodra een echt form id is ingesteld
  const form = document.getElementById("enquiry_form");
  const status = document.getElementById("form_status");
  if (form) {
    const endpoint = D.formspree || "";
    const configured = endpoint && endpoint.indexOf("JOUW_FORM_ID") === -1;
    if (configured) form.action = endpoint;
    form.addEventListener("submit", function (e) {
      if (!configured) {
        e.preventDefault();
        status.textContent = "Formulier nog niet gekoppeld. Mail ons op " + (D.mailadres || "info@mylastbike.nl");
        return;
      }
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      status.textContent = "Versturen…";
      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          status.textContent = "Ontvangen. We nemen binnen twee werkdagen contact op.";
        } else {
          status.textContent = "Versturen mislukt. Probeer het nog eens of mail " + (D.mailadres || "");
        }
      }).catch(function () {
        status.textContent = "Geen verbinding. Probeer het nog eens of mail " + (D.mailadres || "");
      }).finally(function () { btn.disabled = false; });
    });
  }
  // ─── Configurator ───
  initConfigurator();

  function initConfigurator() {
    var conf = D.configurator;
    var accordion = document.getElementById("config_accordion");
    var bar = document.getElementById("config_bar");
    if (!conf || !accordion) return;

    // Selections: which option id is active per category
    var selections = {};
    conf.categorieen.forEach(function(cat) {
      cat.opties.forEach(function(opt) {
        if (opt.standaard) selections[cat.id] = opt.id;
      });
      if (!selections[cat.id]) selections[cat.id] = cat.opties[0].id;
    });

    // Render full accordion once
    accordion.innerHTML = conf.categorieen.map(renderCategory).join("");

    // Mark images missing if they 404
    accordion.querySelectorAll(".config_option_shot img").forEach(function(img) {
      function markMissing() { img.closest(".shot").classList.add("missing"); }
      if (img.complete && img.naturalWidth === 0) markMissing();
      img.addEventListener("error", markMissing);
    });

    // Open first category
    var firstCat = accordion.querySelector(".config_cat");
    if (firstCat) {
      firstCat.classList.add("is_open");
      firstCat.querySelector(".config_cat_hdr").setAttribute("aria-expanded", "true");
    }

    // Event delegation: one listener handles all clicks
    accordion.addEventListener("click", function(e) {
      var hdr = e.target.closest(".config_cat_hdr");
      if (hdr) {
        var catEl = hdr.closest(".config_cat");
        var nowOpen = !catEl.classList.contains("is_open");
        catEl.classList.toggle("is_open", nowOpen);
        hdr.setAttribute("aria-expanded", String(nowOpen));
        return;
      }
      var optBtn = e.target.closest(".config_option");
      if (optBtn && !optBtn.classList.contains("is_selected")) {
        var catId = optBtn.getAttribute("data-cat");
        var optId = optBtn.getAttribute("data-opt");
        var catEl = accordion.querySelector(".config_cat[data-cat='" + catId + "']");

        // Toggle selected state on all sibling cards
        catEl.querySelectorAll(".config_option").forEach(function(b) {
          var active = b === optBtn;
          b.classList.toggle("is_selected", active);
          b.setAttribute("aria-pressed", String(active));
        });

        // Update header summary label
        selections[catId] = optId;
        var catData = conf.categorieen.find(function(c) { return c.id === catId; });
        if (catData) {
          var optData = catData.opties.find(function(o) { return o.id === optId; });
          if (optData) {
            var selEl = catEl.querySelector(".config_cat_sel");
            if (selEl) selEl.textContent = optData.naam;
          }
        }
        updateBar();
      }
    });

    // Sticky bar: show when configurator is on screen or below
    if (bar) {
      document.body.classList.add("has_config_bar");
      var section = document.getElementById("configurator");
      if (section) {
        var observer = new IntersectionObserver(function(entries) {
          var entry = entries[0];
          bar.classList.toggle("is_visible",
            entry.isIntersecting || entry.boundingClientRect.top < 0);
        }, { rootMargin: "0px 0px -80px 0px" });
        observer.observe(section);
      }
    }

    // Bar CTA: pre-fill contact form with selected build before scrolling
    var barCta = document.getElementById("bar_cta");
    if (barCta) {
      barCta.addEventListener("click", function() {
        var ta = document.getElementById("f_bericht");
        if (ta && !ta.value.trim()) {
          var lines = ["Geselecteerde opbouw:"];
          conf.categorieen.forEach(function(cat) {
            var opt = cat.opties.find(function(o) { return o.id === selections[cat.id]; });
            if (opt) lines.push(cat.naam + ": " + opt.naam);
          });
          ta.value = lines.join("\n");
        }
      });
    }

    updateBar();

    function updateBar() {
      var totalWeight = conf.basis_gewicht_g;
      var totalCo2 = conf.basis_co2_kg;
      var totalPrice = 0;
      conf.categorieen.forEach(function(cat) {
        var opt = cat.opties.find(function(o) { return o.id === selections[cat.id]; });
        if (opt) {
          totalWeight += opt.gewicht_delta_g;
          totalCo2 += opt.co2_delta_kg;
          totalPrice += opt.prijs_delta;
        }
      });
      var wEl = document.getElementById("bar_weight");
      var cEl = document.getElementById("bar_co2");
      var pEl = document.getElementById("bar_price");
      if (wEl) wEl.textContent = (totalWeight / 1000).toFixed(2).replace(".", ",") + " kg";
      if (cEl) cEl.textContent = totalCo2.toFixed(1).replace(".", ",") + " kg CO2";
      if (pEl) pEl.textContent = totalPrice === 0 ? "basisopbouw" : "+€" + totalPrice.toLocaleString("nl-NL");
    }

    function renderCategory(cat) {
      var selOpt = cat.opties.find(function(o) { return o.standaard; }) || cat.opties[0];
      return "<div class=\"config_cat\" data-cat=\"" + cat.id + "\">" +
        "<button class=\"config_cat_hdr\" type=\"button\" aria-expanded=\"false\" aria-controls=\"catb_" + cat.id + "\">" +
          "<span class=\"config_cat_name\">" + cat.naam + "</span>" +
          "<span class=\"config_cat_sel\">" + selOpt.naam + "</span>" +
          "<span class=\"config_cat_arrow\" aria-hidden=\"true\"></span>" +
        "</button>" +
        "<div class=\"config_cat_body\" id=\"catb_" + cat.id + "\">" +
          "<div class=\"config_cat_body_inner\">" +
            "<div class=\"config_options\">" +
              cat.opties.map(function(opt) { return renderOption(opt, cat.id); }).join("") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    }

    function renderOption(opt, catId) {
      var sel = selections[catId] === opt.id;
      return "<button class=\"config_option" + (sel ? " is_selected" : "") + "\"" +
        " type=\"button\" data-cat=\"" + catId + "\" data-opt=\"" + opt.id + "\"" +
        " aria-pressed=\"" + sel + "\">" +
        "<figure class=\"config_option_shot shot\">" +
          "<img src=\"" + opt.foto + "\" alt=\"" + opt.foto_alt + "\" loading=\"lazy\">" +
          "<figcaption class=\"shot_brief\">" +
            "<span class=\"shot_num\">FOTO</span>" +
            "<span>" + opt.foto_alt + "</span>" +
            "<span>" + opt.foto + "</span>" +
          "</figcaption>" +
        "</figure>" +
        "<div class=\"config_option_body\">" +
          "<p class=\"config_option_name\">" + opt.naam + "</p>" +
          "<p class=\"config_option_desc\">" + opt.omschrijving + "</p>" +
          "<div class=\"config_option_badges\">" +
            "<span class=\"badge_group\"><span class=\"badge_lbl\">Prijs</span>" + priceBadge(opt.prijs_delta) + "</span>" +
            "<span class=\"badge_group\"><span class=\"badge_lbl\">Gewicht</span>" + weightBadge(opt.gewicht_delta_g) + "</span>" +
            "<span class=\"badge_group\"><span class=\"badge_lbl\">CO2</span>" + co2Badge(opt.co2_delta_kg) + "</span>" +
          "</div>" +
        "</div>" +
        "<span class=\"config_check\" aria-hidden=\"true\"></span>" +
      "</button>";
    }

    function priceBadge(val) {
      if (val === 0) return "<span class=\"badge badge_base\">standaard</span>";
      return "<span class=\"badge badge_price\">+€" + val.toLocaleString("nl-NL") + "</span>";
    }

    function weightBadge(val) {
      if (val === 0) return "<span class=\"badge badge_base\">standaard</span>";
      var abs = Math.abs(val);
      var sign = val < 0 ? "−" : "+";
      var disp = abs >= 1000
        ? sign + (abs / 1000).toFixed(1).replace(".", ",") + " kg"
        : sign + abs + " g";
      return "<span class=\"badge " + (val < 0 ? "badge_good" : "badge_bad") + "\">" + disp + "</span>";
    }

    function co2Badge(val) {
      if (val === 0) return "<span class=\"badge badge_base\">standaard</span>";
      var sign = val < 0 ? "−" : "+";
      var disp = sign + Math.abs(val).toFixed(1).replace(".", ",") + " kg";
      return "<span class=\"badge " + (val < 0 ? "badge_good" : "badge_bad") + "\">" + disp + "</span>";
    }
  }

})();
