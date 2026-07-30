// ─────────────────────────────────────────────────────────────
// MY LAST BIKE — alle veranderlijke cijfers staan in dit bestand.
// Pas een waarde aan, deploy opnieuw, klaar.
// Geen enkele andere file hoeft aangeraakt te worden.
// ─────────────────────────────────────────────────────────────
window.SITE_DATA = {

  // Prijs en levering
  prijs: "vanaf €4.999",
  levertijd: "wordt nog bepaald",

  // CO2 en duurzaamheid
  co2_status: "nog geen gemeten cijfers",
  co2_toelichting: "Zodra onze eerste meting er is, staat het getal hier. Niet eerder.",

  // Frame
  bandenruimte_road: "tot 32 mm",
  bandenruimte_gravel: "tot 45 mm",
  framegewicht: "volgt na weging",
  legering: "3Al/2.5V titanium",

  // Geometrie: waarden volgen na de eerste meetronde met bikefitters
  geometrie: [
    { maat: "S",  stack: "volgt", reach: "volgt", zithoek: "volgt", balhoofd: "volgt" },
    { maat: "M",  stack: "volgt", reach: "volgt", zithoek: "volgt", balhoofd: "volgt" },
    { maat: "L",  stack: "volgt", reach: "volgt", zithoek: "volgt", balhoofd: "volgt" },
    { maat: "XL", stack: "volgt", reach: "volgt", zithoek: "volgt", balhoofd: "volgt" }
  ],

  // Contact
  mailadres: "info@mylastbike.nl",

  // Formspree endpoint: maak een gratis form aan op formspree.io
  // en vervang JOUW_FORM_ID door de echte code.
  formspree: "https://formspree.io/f/JOUW_FORM_ID",

  // Configurator — alle opties met prijs, gewicht en CO2 delta t.o.v. de basisoptie.
  // CO2 cijfers zijn schattingen op basis van industrie LCA data. Eigen meting volgt.
  configurator: {
    basis_gewicht_g: 8400,   // compleet gebouwde fiets met alle basisopties
    basis_co2_kg: 75,         // indicatief
    categorieen: [
      {
        id: "aandrijving",
        naam: "Aandrijving",
        opties: [
          {
            id: "s105",
            naam: "Shimano 105 Di2",
            omschrijving: "Elektronisch schakelen, betrouwbaar en breed te onderhouden",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_aandrijving_105.jpg",
            foto_alt: "Shimano 105 Di2 schakelaar"
          },
          {
            id: "ultegra",
            naam: "Shimano Ultegra Di2",
            omschrijving: "Nauwere toleranties, fijner schakelen, 95 gram lichter",
            prijs_delta: 480,
            gewicht_delta_g: -95,
            co2_delta_kg: 5.2,
            standaard: false,
            foto: "shots/config_aandrijving_ultegra.jpg",
            foto_alt: "Shimano Ultegra Di2 schakelaar"
          },
          {
            id: "sram_force",
            naam: "SRAM Force AXS",
            omschrijving: "Draadloos, 12-speed, uitstekend inzetbaar op road en gravel",
            prijs_delta: 720,
            gewicht_delta_g: -130,
            co2_delta_kg: 6.8,
            standaard: false,
            foto: "shots/config_aandrijving_sram.jpg",
            foto_alt: "SRAM Force AXS derailleur"
          }
        ]
      },
      {
        id: "wielset",
        naam: "Wielset",
        opties: [
          {
            id: "alloy_30",
            naam: "Aluminium 30mm",
            omschrijving: "Sterk, onderhoudsvriendelijk en duurzamer te produceren dan carbon",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_wielset_alloy.jpg",
            foto_alt: "Aluminium wielset"
          },
          {
            id: "carbon_35",
            naam: "Carbon 35mm",
            omschrijving: "Aanzienlijk lichter en stijver. Hogere CO2 bij productie",
            prijs_delta: 1100,
            gewicht_delta_g: -420,
            co2_delta_kg: 18.4,
            standaard: false,
            foto: "shots/config_wielset_carbon35.jpg",
            foto_alt: "Carbon 35mm wielset"
          },
          {
            id: "carbon_50",
            naam: "Carbon 50mm",
            omschrijving: "Maximum aerodynamica op vlak terrein, gevoeliger voor crosswind",
            prijs_delta: 1600,
            gewicht_delta_g: -380,
            co2_delta_kg: 22.1,
            standaard: false,
            foto: "shots/config_wielset_carbon50.jpg",
            foto_alt: "Carbon 50mm wielset"
          }
        ]
      },
      {
        id: "stuur",
        naam: "Stuur en stam",
        opties: [
          {
            id: "alu_compact",
            naam: "Aluminium compact",
            omschrijving: "Comfortabel voor lange dagen, eenvoudig aan te passen",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_stuur_alu.jpg",
            foto_alt: "Aluminium compact stuur"
          },
          {
            id: "carbon_compact",
            naam: "Carbon compact",
            omschrijving: "Dezelfde handling, lager gewicht en betere trillingsabsorptie",
            prijs_delta: 280,
            gewicht_delta_g: -180,
            co2_delta_kg: 3.2,
            standaard: false,
            foto: "shots/config_stuur_carbon.jpg",
            foto_alt: "Carbon compact stuur"
          }
        ]
      },
      {
        id: "banden",
        naam: "Banden",
        opties: [
          {
            id: "road_28",
            naam: "28c Road",
            omschrijving: "Lage rolweerstand, snel op droog asfalt",
            prijs_delta: 0,
            gewicht_delta_g: -85,
            co2_delta_kg: -0.2,
            standaard: false,
            foto: "shots/config_banden_road.jpg",
            foto_alt: "28c road band"
          },
          {
            id: "allround_32",
            naam: "32c All-round",
            omschrijving: "De meest veelzijdige keuze: asfalt en licht onverhard",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_banden_allround.jpg",
            foto_alt: "32c all-round band"
          },
          {
            id: "gravel_45",
            naam: "45c Gravel",
            omschrijving: "Grindpaden, bikepacking, alles buiten het asfalt",
            prijs_delta: 30,
            gewicht_delta_g: 220,
            co2_delta_kg: 0.3,
            standaard: false,
            foto: "shots/config_banden_gravel.jpg",
            foto_alt: "45c gravel band"
          }
        ]
      },
      {
        id: "afwerking",
        naam: "Afwerking",
        opties: [
          {
            id: "geborsteld",
            naam: "Geborsteld titanium",
            omschrijving: "Het metaal op zijn eerlijkst. Krassen poets je weg",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_finish_geborsteld.jpg",
            foto_alt: "Geborsteld titanium frame"
          },
          {
            id: "anodized_zwart",
            naam: "Anodized zwart",
            omschrijving: "Diep mat zwart, geanodiseerd zodat er geen lak bladdert",
            prijs_delta: 220,
            gewicht_delta_g: 0,
            co2_delta_kg: 1.1,
            standaard: false,
            foto: "shots/config_finish_zwart.jpg",
            foto_alt: "Zwart geanodiseerd frame"
          },
          {
            id: "anodized_bronze",
            naam: "Anodized bronze",
            omschrijving: "Warme brons tint die de lasnaad benadrukt",
            prijs_delta: 220,
            gewicht_delta_g: 0,
            co2_delta_kg: 1.1,
            standaard: false,
            foto: "shots/config_finish_bronze.jpg",
            foto_alt: "Bronze geanodiseerd frame"
          }
        ]
      }
    ]
  }
};
