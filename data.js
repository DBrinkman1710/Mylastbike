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
  bandenruimte_road: "tot 45 mm",
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

  // Configurator — alleen de keuzes met echte impact staan als selectie.
  // De definitieve specificatie leggen we altijd samen vast tijdens het intakegesprek.
  // Prijzen zijn indicatief. CO2 cijfers zijn schattingen op basis van industrie LCA data. Eigen meting volgt.
  configurator: {
    basis_gewicht_g: 8200,   // compleet gebouwde fiets met alle basisopties
    basis_co2_kg: 75,         // indicatief
    categorieen: [
      {
        id: "groepenset",
        naam: "Groepenset",
        opties: [
          {
            id: "s105",
            naam: "Shimano 105 Di2",
            omschrijving: "Elektronisch schakelen, 12 speed. Betrouwbaar en overal ter wereld te onderhouden.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true
          },
          {
            id: "centaur",
            naam: "Campagnolo Centaur",
            omschrijving: "Mechanisch, 11 speed. Italiaans karakter en decennialang te onderhouden, zonder meerprijs.",
            prijs_delta: 0,
            gewicht_delta_g: 180,
            co2_delta_kg: -1.0,
            standaard: false
          },
          {
            id: "grx",
            naam: "Shimano GRX",
            omschrijving: "Gravel specifiek. Extra grip op de shifters en een clutch derailleur voor onverhard.",
            prijs_delta: 150,
            gewicht_delta_g: 120,
            co2_delta_kg: 0.5,
            standaard: false
          },
          {
            id: "ultegra",
            naam: "Shimano Ultegra Di2",
            omschrijving: "Nauwere toleranties, fijner schakelen en lichter dan 105.",
            prijs_delta: 650,
            gewicht_delta_g: -90,
            co2_delta_kg: 2.0,
            standaard: false
          },
          {
            id: "super_record",
            naam: "Campagnolo Super Record 13",
            omschrijving: "Draadloos, 13 speed. Een van de lichtste elektronische groepensets ter wereld, het absolute topsegment.",
            prijs_delta: 2900,
            gewicht_delta_g: -420,
            co2_delta_kg: 6.0,
            standaard: false
          }
        ]
      },
      {
        id: "wielset",
        naam: "Wielset",
        opties: [
          {
            id: "alu",
            naam: "Aluminium",
            omschrijving: "Sterk, onderhoudsvriendelijk en duurzamer te produceren. Road of allroad. Merken: DT Swiss of Mavic.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true
          },
          {
            id: "carbon",
            naam: "Carbon",
            omschrijving: "Aanzienlijk lichter en stijver. Road of allroad. Merken: Scope, DT Swiss of Mavic.",
            prijs_delta: 1200,
            gewicht_delta_g: -450,
            co2_delta_kg: 18.4,
            standaard: false
          }
        ]
      }
    ],

    // Vaste onderdelen: geen keuze, alleen een korte toelichting.
    toelichting: [
      {
        naam: "Stuur",
        tekst: "Eén cockpit, carbon en geïntegreerd met het frame. Geen kabels zichtbaar. Breedte en reach bepalen we op basis van jouw bikefit."
      },
      {
        naam: "Zadel",
        tekst: "Standaard een neutrale Selle Italia, of we monteren je eigen zadel. Tijdens de intake stemmen we het definitieve zadel op je af."
      },
      {
        naam: "Banden",
        tekst: "Schwalbe of Continental, in road, gravel of beide sets. Welke bij jouw ritten past bespreken we tijdens de intake."
      }
    ]
  }
};
