# Backyard Golf × Jonny M

Indoor-Golfsimulator mit Lounge. Statische Seite (index.html / styles.css / script.js), kein Build-Schritt — lokal einfach `python3 -m http.server` im Projektordner und im Browser öffnen.

## Design
- Dunkle "Nacht-Lounge"-Optik statt hellem Standard-Look: Espresso-Schwarz, Fairway-Grün, Messing-Akzent, kühles Screen-Glow-Blau nur um das Simulator-Screen-Motiv.
- Headlines in Fraunces (Serife), Fließtext in Manrope.
- Fotos fehlen noch — echtes Material aus dem Raum in `/images` legen, wenn verfügbar. Hero und Sektionen sind bewusst mit CSS-Verläufen statt Fotos gebaut, damit die Seite auch ohne Fotos schon funktioniert.

## Buchungssystem (offen)
In `index.html` gibt es einen klar markierten Platzhalter: `.booking-embed-slot` im Abschnitt `#booking`. Sobald ein Anbieter feststeht, kommt dessen Embed (iframe/Widget/Script) dort rein — Preise/Fakten links daneben in `.booking-facts` entsprechend anpassen.
