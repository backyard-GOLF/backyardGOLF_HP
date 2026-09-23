# JONNY M. x backyard GOLF

Indoor-Golfsimulator mit Lounge. Statische Seite (index.html / styles.css / script.js), kein Build-Schritt — lokal einfach `python3 -m http.server` im Projektordner und im Browser öffnen.

## Design
Richtet sich nach dem echten Brandbook (`backyardGOLFxJonnyM_Styleguide_S01V01_SCREEN.pdf`), Layout-Vorbild ist mendo.nl (zurückhaltende Basisfarben, großformatige Bildflächen, ruhige Typografie, Farbe kommt nur über Akzente rein).

- Farben exakt aus dem Styleguide: Clubhouse Cream `#FFF8EE`, Iron Grey `#191919`, Caddy Gold `#F6E3A1`, Open Sky `#8ED2E9`, Putting Green `#A9CCA0`, Birdie Blush `#D8A9BE`. Nicht durch andere Töne ersetzen.
- Schrift: Inter, bold/black für Headlines und Logo, mixed case (keine All-Caps-Eyebrows).
- Logo (`.logo` in index.html) ist als HTML/CSS nachgebaut, nicht als Bild — `logo--negative` (Creme auf Dunkel) ist die Hauptvariante, `logo--colored` (gefüllte Kreise in den vier Markenfarben) nur für helle/cream Hintergründe verwenden. Farben, Reihenfolge und Proportionen des Logos nicht verändern (Styleguide-Vorgabe).
- Tagline "same game different place." ist ein fixer Kampagnen-Claim aus dem Brandbook — bewusst unübersetzt im Hero belassen.

## Bilder (offen)
Alle Bildflächen sind aktuell CSS-Platzhalter mit gestricheltem Hinweistext ("Foto folgt — ..."), damit die Seite auch ohne Fotos fertig aussieht. Sobald Material da ist (u. a. das hochgeladene Kampagnenmotiv mit dem Golfer im Konferenzraum), Dateien in `/images` legen und dort einbauen:
- `.hero-media` im Hero — Kampagnenbild
- `.placeholder-img` im Konzept-Abschnitt — Innenraum
- `.bay-media` (×2) — je ein Bild pro Bay
- `.lounge-media` — Lounge/Sitzbereich

## Buchungssystem (offen)
In `index.html` gibt es einen klar markierten Platzhalter: `.booking-embed-slot` im Abschnitt `#booking`. Sobald ein Anbieter feststeht, kommt dessen Embed (iframe/Widget/Script) dort rein — Preise/Fakten links daneben in `.booking-facts` entsprechend anpassen.
