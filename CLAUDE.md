# JONNY M. x backyard GOLF

Indoor-Golfsimulator mit Lounge. Statische Seite (index.html / styles.css / script.js), kein Build-Schritt — lokal einfach `python3 -m http.server` im Projektordner und im Browser öffnen.

## Design
Richtet sich nach dem echten Brandbook (`backyardGOLFxJonnyM_Styleguide_S01V01_SCREEN.pdf`), Layout-Vorbild ist mendo.nl (zurückhaltende Basisfarben, großformatige Bildflächen, ruhige Typografie, Farbe kommt nur über Akzente rein).

- Farben exakt aus dem Styleguide: Clubhouse Cream `#FFF8EE`, Iron Grey `#191919`, Caddy Gold `#F6E3A1`, Open Sky `#8ED2E9`, Putting Green `#A9CCA0`, Birdie Blush `#D8A9BE`. Nicht durch andere Töne ersetzen.
- Pastelle sind als volle Sektionsflächen im Einsatz (wie die Kapitelseiten im Brandbook): Hero Open Sky, Konzept Caddy Gold, Bays Putting Green, Lounge Birdie Blush, Buchung Cream mit Iron-Panel; Footer mit 4-Farben-Balken. Text auf Pastell immer Iron Grey. Kapitel-Kreise (K/B/1/2/L) sind das Kreis-Badge-Motiv aus dem Brandbook.
- Hero: Tagline mit "Letter 3D Swap"-Effekt (Buchstaben rollen gestaffelt nach oben, bei Hover/Klick und einmal beim Laden). Umsetzung als Vanilla-JS/CSS in `script.js` / `.l3-*` in `styles.css`, weil auf dem Rechner kein Node installiert war. Falls das Projekt später auf React/Tailwind/shadcn migriert wird, kann die Originalkomponente (`components/ui/letter-3d-swap.tsx`, npm `motion`) 1:1 ersetzen.
- Schrift: Inter, bold/black für Headlines und Logo, mixed case (keine All-Caps-Eyebrows).
- Logo (`.logo` in index.html) ist als HTML/CSS nachgebaut, nicht als Bild — aktuell nur als Creme-auf-Dunkel-Variante (Header, Footer). Auf hellen Hintergründen laut Styleguide die farbige Variante nutzen (Kreise gefüllt: G Blush, O Green, L Sky, F Gold, Iron-Kontur/-Schrift). Farben, Reihenfolge und Proportionen des Logos nicht verändern (Styleguide-Vorgabe).
- Tagline "same game different place." ist ein fixer Kampagnen-Claim aus dem Brandbook — bewusst unübersetzt im Hero belassen.

## Bilder (offen)
Alle Bildflächen sind aktuell `.ph`-Platzhalter mit gestricheltem Hinweistext ("Foto folgt — ..."). Sobald Material da ist (u. a. das Kampagnenmotiv mit dem Golfer im Konferenzraum), Dateien in `/images` legen und das jeweilige `.ph` durch ein `<img>` ersetzen: Kampagnenband unter dem Hero (`.campaign`), Konzept (Innenraum), Bay 1, Bay 2, Lounge.

## Buchungssystem (offen)
In `index.html` gibt es einen klar markierten Platzhalter: `.booking-embed-slot` im Abschnitt `#booking`. Sobald ein Anbieter feststeht, kommt dessen Embed (iframe/Widget/Script) dort rein — Preise/Fakten links daneben in `.booking-facts` entsprechend anpassen.
