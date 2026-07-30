# My Last Bike — website

Eén lange pagina, statisch, geen build stap. Open `index.html` in de browser en hij werkt.

## Cijfers aanpassen (prijs, levertijd, CO2)

Alles wat kan veranderen staat in **`data.js`**. Pas de waarde aan, deploy opnieuw, klaar. Geen enkel ander bestand hoeft aangeraakt te worden.

## Fotolijst

Elke placeholder op de site vertelt precies wat je moet schieten. Sla de foto op onder de exacte bestandsnaam in `shots/` en hij verschijnt vanzelf:

| Bestand | Wat | Verhouding |
|---|---|---|
| `shots/shot_01_hero.jpg` | Hele fiets in het landschap, zijaanzicht, daglicht | liggend, minimaal 2400 px breed |
| `shots/shot_02_road.jpg` | Zijaanzicht in road opzet, strakke achtergrond | 3:2 |
| `shots/shot_03_gravel.jpg` | Zijaanzicht in gravel opzet, grindpad of ruig terrein | 3:2 |
| `shots/shot_04_lasnaad.jpg` | Macro van een lasnaad, bijvoorbeeld balhoofdbuis | 1:1 vierkant |
| `shots/shot_05_detail.jpg` | Achtervork of dropout, schuin van achteren | 4:5 staand |

Tip: schiet in daglicht, geborsteld titanium komt het best uit bij zacht bewolkt licht zonder harde reflecties.

## Formulier koppelen

1. Maak een gratis account op formspree.io en maak een nieuw formulier
2. Zet de endpoint URL in `data.js` bij `formspree`
3. Tot die tijd toont het formulier netjes een mailadres als fallback

## Online zetten

Gratis via Vercel of Netlify: sleep de map in hun dashboard, of koppel een git repo. Domein kan later aan beide worden gehangen.
