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

  // Configurator — alle opties met prijs, gewicht en CO2 delta t.o.v. de basisoptie.
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
            standaard: true,
            foto: "shots/config_groep_105.jpg",
            foto_alt: "Shimano 105 Di2 groepenset"
          },
          {
            id: "centaur",
            naam: "Campagnolo Centaur",
            omschrijving: "Mechanisch, 11 speed. Italiaans karakter en decennialang te onderhouden, zonder meerprijs.",
            prijs_delta: 0,
            gewicht_delta_g: 180,
            co2_delta_kg: -1.0,
            standaard: false,
            foto: "shots/config_groep_centaur.jpg",
            foto_alt: "Campagnolo Centaur groepenset"
          },
          {
            id: "grx",
            naam: "Shimano GRX",
            omschrijving: "Gravel specifiek. Extra grip op de shifters en een clutch derailleur voor onverhard.",
            prijs_delta: 150,
            gewicht_delta_g: 120,
            co2_delta_kg: 0.5,
            standaard: false,
            foto: "shots/config_groep_grx.jpg",
            foto_alt: "Shimano GRX gravel groepenset"
          },
          {
            id: "ultegra",
            naam: "Shimano Ultegra Di2",
            omschrijving: "Nauwere toleranties, fijner schakelen en lichter dan 105.",
            prijs_delta: 650,
            gewicht_delta_g: -90,
            co2_delta_kg: 2.0,
            standaard: false,
            foto: "shots/config_groep_ultegra.jpg",
            foto_alt: "Shimano Ultegra Di2 groepenset"
          },
          {
            id: "super_record",
            naam: "Campagnolo Super Record 13",
            omschrijving: "Draadloos, 13 speed. Een van de lichtste elektronische groepensets ter wereld, het absolute topsegment.",
            prijs_delta: 2900,
            gewicht_delta_g: -420,
            co2_delta_kg: 6.0,
            standaard: false,
            foto: "shots/config_groep_superrecord.jpg",
            foto_alt: "Campagnolo Super Record 13 groepenset"
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
            standaard: true,
            foto: "shots/config_wiel_alu.jpg",
            foto_alt: "Aluminium wielset"
          },
          {
            id: "carbon",
            naam: "Carbon",
            omschrijving: "Aanzienlijk lichter en stijver. Road of allroad. Merken: Scope, DT Swiss of Mavic.",
            prijs_delta: 1200,
            gewicht_delta_g: -450,
            co2_delta_kg: 18.4,
            standaard: false,
            foto: "shots/config_wiel_carbon.jpg",
            foto_alt: "Carbon wielset"
          }
        ]
      },
      {
        id: "stuur",
        naam: "Stuur",
        opties: [
          {
            id: "carbon_int",
            naam: "Carbon geïntegreerd",
            omschrijving: "Eén cockpit, carbon en geïntegreerd met het frame. Geen kabels zichtbaar. Breedte en reach bepalen we op basis van jouw bikefit.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_stuur_carbon_int.jpg",
            foto_alt: "Carbon geïntegreerd stuur"
          }
        ]
      },
      {
        id: "zadel",
        naam: "Zadel",
        opties: [
          {
            id: "selle_italia",
            naam: "Selle Italia",
            omschrijving: "Ons standaard zadel: een neutrale Selle Italia. Tijdens de intake stemmen we het definitieve zadel op je af.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_zadel_selle.jpg",
            foto_alt: "Selle Italia zadel"
          },
          {
            id: "eigen",
            naam: "Eigen zadel",
            omschrijving: "Rijd je al jaren op je eigen zadel? Dan monteren wij dat, zonder meerprijs.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: false,
            foto: "shots/config_zadel_eigen.jpg",
            foto_alt: "Je eigen zadel"
          }
        ]
      },
      {
        id: "banden",
        naam: "Banden",
        opties: [
          {
            id: "road",
            naam: "Road",
            omschrijving: "Lage rolweerstand, snel op asfalt. Schwalbe of Continental.",
            prijs_delta: 0,
            gewicht_delta_g: 0,
            co2_delta_kg: 0,
            standaard: true,
            foto: "shots/config_band_road.jpg",
            foto_alt: "Road band, Schwalbe of Continental"
          },
          {
            id: "gravel",
            naam: "Gravel",
            omschrijving: "Grip op grind en onverhard, voor bikepacking en alles buiten het asfalt. Schwalbe of Continental.",
            prijs_delta: 40,
            gewicht_delta_g: 220,
            co2_delta_kg: 0.3,
            standaard: false,
            foto: "shots/config_band_gravel.jpg",
            foto_alt: "Gravel band, Schwalbe of Continental"
          },
          {
            id: "beide",
            naam: "Beide sets",
            omschrijving: "Twee bandensets: road en gravel. Wissel mee met je wielset en rijd beide werelden. Schwalbe of Continental.",
            prijs_delta: 120,
            gewicht_delta_g: 0,
            co2_delta_kg: 1.0,
            standaard: false,
            foto: "shots/config_band_beide.jpg",
            foto_alt: "Road en gravel bandensets"
          }
        ]
      }
    ]
  }
};
