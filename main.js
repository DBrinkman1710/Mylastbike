// ─────────────────────────────────────────────
// MY LAST BIKE — sitegedrag
// ─────────────────────────────────────────────
(function () {
  var D = window.SITE_DATA || {};
  var currentLang = localStorage.getItem("lang") || "nl";
  var currentMode = "road";

  // ─── helpers ───
  function T(key) {
    var dict = window.I18N && window.I18N[currentLang];
    return dict && dict[key] !== undefined ? dict[key] : key;
  }

  // ─── 1. data-key values from data.js ───
  document.querySelectorAll("[data-key]").forEach(function (el) {
    var key = el.getAttribute("data-key");
    if (D[key]) el.textContent = D[key];
  });
  document.querySelectorAll("[data-key-href]").forEach(function (el) {
    var key = el.getAttribute("data-key-href");
    if (D[key]) el.href = "mailto:" + D[key];
  });

  // ─── 2. geometry table ───
  function renderGeoTable() {
    var geoBody = document.getElementById("geo_body");
    if (!geoBody || !Array.isArray(D.geometrie)) return;
    var tbd = T("geo_tbd");
    geoBody.innerHTML = "";
    D.geometrie.forEach(function (r) {
      var tr = document.createElement("tr");
      [r.maat,
       r.stack === "volgt" ? tbd : r.stack,
       r.reach === "volgt" ? tbd : r.reach,
       r.zithoek === "volgt" ? tbd : r.zithoek,
       r.balhoofd === "volgt" ? tbd : r.balhoofd
      ].forEach(function (v) {
        var td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      geoBody.appendChild(tr);
    });
  }
  renderGeoTable();

  // ─── 3. photo placeholder logic ───
  function watchShots(root) {
    (root || document).querySelectorAll(".shot img").forEach(function (img) {
      function markMissing() { img.closest(".shot").classList.add("missing"); }
      if (img.complete && img.naturalWidth === 0) markMissing();
      img.addEventListener("error", markMissing);
    });
  }
  watchShots();

  // ─── 4. road / gravel toggle ───
  var MODES = {
    road: {
      img: "shots/shot_02_road.jpg",
      alt: "De fiets in road opzet, zijaanzicht",
      shotNum: "FOTO 02",
      shotText: "Zijaanzicht in road opzet, strakke achtergrond",
      shotFile: "Verhouding 3:2 · bestand: shots/shot_02_road.jpg"
    },
    gravel: {
      img: "shots/shot_03_gravel.jpg",
      alt: "De fiets in gravel opzet, zijaanzicht",
      shotNum: "FOTO 03",
      shotText: "Zijaanzicht in gravel opzet, grindpad of ruig terrein",
      shotFile: "Verhouding 3:2 · bestand: shots/shot_03_gravel.jpg"
    }
  };

  function updateModeDisplay(name) {
    var m = MODES[name];
    var prefix = "mode_" + name + "_";
    var modeImg = document.getElementById("mode_img");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-mode-field]").forEach(function (el) {
      el.textContent = T(prefix + el.getAttribute("data-mode-field"));
    });
    document.getElementById("mode_shot_num").textContent = m.shotNum;
    document.getElementById("mode_shot_text").textContent = m.shotText;
    document.getElementById("mode_shot_file").textContent = m.shotFile;

    function swapImg() {
      var shot = modeImg.closest(".shot");
      shot.classList.remove("missing");
      modeImg.alt = m.alt;
      modeImg.src = m.img;
      if (!reduceMotion) modeImg.classList.remove("swapping");
    }
    if (reduceMotion) { swapImg(); }
    else {
      modeImg.classList.add("swapping");
      setTimeout(swapImg, 220);
    }
  }

  var modeSwitch = document.querySelector(".mode_switch");
  if (modeSwitch) {
    modeSwitch.querySelectorAll(".mode_btn").forEach(function (b) {
      b.addEventListener("click", function () {
        currentMode = b.getAttribute("data-mode");
        modeSwitch.setAttribute("data-active", currentMode);
        modeSwitch.querySelectorAll(".mode_btn").forEach(function (btn) {
          var active = btn === b;
          btn.classList.toggle("is_active", active);
          btn.setAttribute("aria-pressed", String(active));
        });
        updateModeDisplay(currentMode);
      });
    });
  }
  updateModeDisplay(currentMode);

  // ─── 5. configurator ───
  var accordion = document.getElementById("config_accordion");
  var configBar = document.getElementById("config_bar");
  var selections = {};

  function initSelections() {
    var conf = D.configurator;
    if (!conf) return;
    conf.categorieen.forEach(function (cat) {
      cat.opties.forEach(function (opt) {
        if (opt.standaard) selections[cat.id] = opt.id;
      });
      if (!selections[cat.id]) selections[cat.id] = cat.opties[0].id;
    });
  }

  function renderConfigurator() {
    var conf = D.configurator;
    if (!conf || !accordion) return;
    var openCats = new Set();
    accordion.querySelectorAll(".config_cat.is_open").forEach(function (el) {
      openCats.add(el.getAttribute("data-cat"));
    });
    if (openCats.size === 0) openCats.add(conf.categorieen[0].id);

    accordion.innerHTML = conf.categorieen.map(function (cat) {
      var selOpt = cat.opties.find(function (o) { return o.standaard; }) || cat.opties[0];
      var selOptForLabel = cat.opties.find(function (o) { return o.id === selections[cat.id]; }) || selOpt;
      var isOpen = openCats.has(cat.id);
      return "<div class=\"config_cat" + (isOpen ? " is_open" : "") + "\" data-cat=\"" + cat.id + "\">" +
        "<button class=\"config_cat_hdr\" type=\"button\" aria-expanded=\"" + isOpen + "\" aria-controls=\"catb_" + cat.id + "\">" +
          "<span class=\"config_cat_name\">" + (T("cat_" + cat.id) || cat.naam) + "</span>" +
          "<span class=\"config_cat_sel\">" + (T("cat_" + cat.id.slice(0, 3) + "_" + selOptForLabel.id) || selOptForLabel.naam) + "</span>" +
          "<span class=\"config_cat_arrow\" aria-hidden=\"true\"></span>" +
        "</button>" +
        "<div class=\"config_cat_body\" id=\"catb_" + cat.id + "\">" +
          "<div class=\"config_cat_body_inner\">" +
            "<div class=\"config_options\">" +
              cat.opties.map(function (opt) {
                var sel = selections[cat.id] === opt.id;
                var descKey = "desc_" + cat.id + "_" + opt.id;
                var desc = T(descKey) || opt.omschrijving;
                return "<button class=\"config_option" + (sel ? " is_selected" : "") + "\"" +
                  " type=\"button\" data-cat=\"" + cat.id + "\" data-opt=\"" + opt.id + "\"" +
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
                    "<p class=\"config_option_desc\">" + desc + "</p>" +
                    "<div class=\"config_option_badges\">" +
                      "<span class=\"badge_group\"><span class=\"badge_lbl\">" + T("conf_badge_prijs") + "</span>" + priceBadge(opt.prijs_delta) + "</span>" +
                      "<span class=\"badge_group\"><span class=\"badge_lbl\">" + T("conf_badge_gewicht") + "</span>" + weightBadge(opt.gewicht_delta_g) + "</span>" +
                      "<span class=\"badge_group\"><span class=\"badge_lbl\">" + T("conf_badge_co2") + "</span>" + co2Badge(opt.co2_delta_kg) + "</span>" +
                    "</div>" +
                  "</div>" +
                  "<span class=\"config_check\" aria-hidden=\"true\"></span>" +
                "</button>";
              }).join("") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    }).join("");

    watchShots(accordion);

    accordion.addEventListener("click", function (e) {
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
        catEl.querySelectorAll(".config_option").forEach(function (b) {
          var active = b === optBtn;
          b.classList.toggle("is_selected", active);
          b.setAttribute("aria-pressed", String(active));
        });
        selections[catId] = optId;
        var catData = D.configurator.categorieen.find(function (c) { return c.id === catId; });
        if (catData) {
          var optData = catData.opties.find(function (o) { return o.id === optId; });
          if (optData) {
            var selEl = catEl.querySelector(".config_cat_sel");
            if (selEl) selEl.textContent = optData.naam;
          }
        }
        updateBar();
      }
    }, { once: true });

    // Re-attach with a persistent delegated listener (replacing the once:true above)
    // Using a named function stored on the element to avoid duplicate listeners
    if (!accordion._listenerAttached) {
      accordion._listenerAttached = true;
      accordion.addEventListener("click", function (e) {
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
          catEl.querySelectorAll(".config_option").forEach(function (b) {
            var active = b === optBtn;
            b.classList.toggle("is_selected", active);
            b.setAttribute("aria-pressed", String(active));
          });
          selections[catId] = optId;
          var catData = D.configurator.categorieen.find(function (c) { return c.id === catId; });
          if (catData) {
            var optData = catData.opties.find(function (o) { return o.id === optId; });
            if (optData) {
              var selEl = catEl.querySelector(".config_cat_sel");
              if (selEl) selEl.textContent = optData.naam;
            }
          }
          updateBar();
        }
      });
    }

    updateBar();
  }

  function updateBar() {
    var conf = D.configurator;
    if (!conf) return;
    var totalWeight = conf.basis_gewicht_g;
    var totalCo2 = conf.basis_co2_kg;
    var totalPrice = 0;
    conf.categorieen.forEach(function (cat) {
      var opt = cat.opties.find(function (o) { return o.id === selections[cat.id]; });
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
    if (pEl) {
      var baseword = currentLang === "en" ? "standard" : "basisopbouw";
      pEl.textContent = totalPrice === 0 ? baseword : "+€" + totalPrice.toLocaleString("nl-NL");
    }
  }

  function priceBadge(val) {
    var standaard = T("conf_badge_standaard");
    if (val === 0) return "<span class=\"badge badge_base\">" + standaard + "</span>";
    return "<span class=\"badge badge_price\">+€" + val.toLocaleString("nl-NL") + "</span>";
  }

  function weightBadge(val) {
    var standaard = T("conf_badge_standaard");
    if (val === 0) return "<span class=\"badge badge_base\">" + standaard + "</span>";
    var abs = Math.abs(val);
    var sign = val < 0 ? "−" : "+";
    var disp = abs >= 1000
      ? sign + (abs / 1000).toFixed(1).replace(".", ",") + " kg"
      : sign + abs + " g";
    return "<span class=\"badge " + (val < 0 ? "badge_good" : "badge_bad") + "\">" + disp + "</span>";
  }

  function co2Badge(val) {
    var standaard = T("conf_badge_standaard");
    if (val === 0) return "<span class=\"badge badge_base\">" + standaard + "</span>";
    var sign = val < 0 ? "−" : "+";
    var disp = sign + Math.abs(val).toFixed(1).replace(".", ",") + " kg";
    return "<span class=\"badge " + (val < 0 ? "badge_good" : "badge_bad") + "\">" + disp + "</span>";
  }

  // Sticky bar visibility
  if (configBar) {
    document.body.classList.add("has_config_bar");
    var confSection = document.getElementById("configurator");
    if (confSection) {
      var observer = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        configBar.classList.toggle("is_visible",
          entry.isIntersecting || entry.boundingClientRect.top < 0);
      }, { rootMargin: "0px 0px -80px 0px" });
      observer.observe(confSection);
    }
  }

  // Bar CTA pre-fills contact form
  var barCta = document.getElementById("bar_cta");
  if (barCta) {
    barCta.addEventListener("click", function () {
      var ta = document.getElementById("f_bericht");
      if (ta && !ta.value.trim() && D.configurator) {
        var lines = [T("build_summary_title")];
        D.configurator.categorieen.forEach(function (cat) {
          var opt = cat.opties.find(function (o) { return o.id === selections[cat.id]; });
          if (opt) lines.push((T("cat_" + cat.id) || cat.naam) + ": " + opt.naam);
        });
        ta.value = lines.join("\n");
      }
    });
  }

  initSelections();
  renderConfigurator();

  // ─── 6. contact form ───
  var form = document.getElementById("enquiry_form");
  var statusEl = document.getElementById("form_status");
  if (form) {
    var endpoint = D.formspree || "";
    var configured = endpoint && endpoint.indexOf("JOUW_FORM_ID") === -1;
    if (configured) form.action = endpoint;
    form.addEventListener("submit", function (e) {
      if (!configured) {
        e.preventDefault();
        statusEl.textContent = T("form_unconfigured") + (D.mailadres || "info@mylastbike.nl");
        return;
      }
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      statusEl.textContent = T("form_sending");
      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          statusEl.textContent = T("form_success");
        } else {
          statusEl.textContent = T("form_error") + (D.mailadres || "");
        }
      }).catch(function () {
        statusEl.textContent = T("form_offline") + (D.mailadres || "");
      }).finally(function () { btn.disabled = false; });
    });
  }

  // ─── 7. language switching ───
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var dict = window.I18N && window.I18N[lang];
      if (dict && dict[key] !== undefined) el.textContent = dict[key];
    });

    var trigger = document.getElementById("lang_current");
    if (trigger) trigger.textContent = lang.toUpperCase();
    document.querySelectorAll(".lang_opt").forEach(function (opt) {
      var active = opt.getAttribute("data-lang") === lang;
      opt.classList.toggle("is_active", active);
      opt.setAttribute("aria-selected", String(active));
    });

    renderGeoTable();
    updateModeDisplay(currentMode);
    renderConfigurator();
  }

  document.querySelectorAll(".lang_opt").forEach(function (opt) {
    opt.addEventListener("click", function () {
      applyLanguage(opt.getAttribute("data-lang"));
    });
  });

  // Apply saved language on load
  if (currentLang !== "nl") applyLanguage(currentLang);

})();
