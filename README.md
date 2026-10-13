# Sito autoscuola · template

Template di sito per autoscuole, statico e veloce, fatto con [Astro](https://astro.build).
Lo stile è «neo-brutalista morbido»: blocchi di colore pieno, titoli enormi con evidenziatore, card arrotondate e pulsanti con ombra piena.

Tutti i dati sono in `src/data/site.ts`: pagine e componenti leggono solo da lì.
**I valori presenti sono di esempio** («Autoscuola Esempio», «Città», «Via Esempio 1», telefono 000…) e vanno sostituiti con quelli reali.

## Comandi

```bash
npm install
npm run dev      # anteprima locale su http://localhost:4321
npm run build    # sito statico in dist/
npm run preview  # prova della build
```

Su Windows puoi anche fare doppio clic su `Avvia-sito.bat`.

## Cosa contiene

- **Home:** hero tipografica con bollino, striscia scorrevole, card delle patenti, «Come funziona» con strada che si disegna allo scroll, numeri, recensioni in carosello, sezione genitori, sede con mappa a due click, FAQ, chiusura.
- **Pagine:** una per patente, rinnovo, duplicato, preventivo e pre-iscrizione, sede, genitori, chi siamo, recensioni, FAQ, contatti, privacy, cookie, 404.
- **Strumenti** in JavaScript vanilla: «Quale patente fa per te?», «Il tuo percorso stimato», «Cosa ti serve per…», «Calcola il tuo pacchetto». Ognuno compare solo quando i suoi dati sono compilati.
- **Modulo di pre-iscrizione** accessibile, con honeypot e consenso marketing separato.
- **SEO:** title e description per pagina, JSON-LD `DrivingSchool`, sitemap, robots.txt, Open Graph.
- **Nessuna risorsa esterna** al primo accesso: font self-hosted, mappa Google caricata solo dopo due click.

## Come personalizzarlo

1. In `src/data/site.ts` sostituisci i dati di esempio. I campi vuoti mostrano il segnaposto `[DA COMPLETARE]` o nascondono la sezione.
2. Colori, font, raggi e ombre sono variabili all'inizio di `src/styles/global.css`.
3. Sostituisci `public/og.png` (1200×630) con l'immagine di anteprima per i social del nuovo cliente.
4. Inserisci i testi di privacy e cookie policy in `src/components/LegalPage.astro`.
5. Per pubblicare: `demo: false`, `dominio` reale, `whatsapp` ed eventualmente `endpointModulo`. Poi `npm run build` e carica il contenuto di `dist/` sull'hosting.

## Licenze

I font Bricolage Grotesque e Figtree sono distribuiti con licenza SIL Open Font License (vedi `public/fonts`).
