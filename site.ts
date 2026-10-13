/**
 * SITO AUTOSCUOLA · DATI DEL SITO
 * ------------------------------------------------------------------
 * Unica fonte di verità: pagine e componenti leggono SOLO da questo file.
 *
 * ATTENZIONE: i valori qui sotto sono DATI DI ESEMPIO ("Autoscuola Esempio",
 * "Città", "Via Esempio 1", telefono 000…). Vanno sostituiti tutti con i dati
 * reali dell'autoscuola prima di pubblicare.
 *
 * Regole:
 * - Stringa vuota '' / array vuoto [] / null = dato mancante.
 *   Il sito mostra il segnaposto [DA COMPLETARE] oppure nasconde la sezione
 *   (gli strumenti "Quale patente", "Percorso stimato" e "Calcola pacchetto"
 *   restano nascosti finché i loro dati sono vuoti).
 * - `confermato: false` = dato "da confermare": resta visibile con il segnaposto.
 * - Non inserire mai prezzi, tempi, requisiti, recensioni o numeri non confermati.
 *
 * Per la versione definitiva:
 *   1. demo: false
 *   2. dominio: 'https://www.dominio-reale.it'
 *   3. compila whatsapp, endpointModulo e i campi vuoti qui sotto.
 */

export const TODO = '[DA COMPLETARE]';

/* ------------------------------------------------------------------ */
/* Tipi                                                                */
/* ------------------------------------------------------------------ */

export type Gruppo = 'moto' | 'auto' | 'camion' | 'autobus';

export interface Patente {
  /** Parte finale dell'URL: /patenti/{slug}/ */
  slug: string;
  /** Sigla della categoria */
  codice: string;
  /** Etichetta breve del veicolo (solo nome della categoria, nessun limite di legge) */
  veicolo: string;
  gruppo: Gruppo;
  /** Nome dell'icona in src/components/Icon.astro */
  icona: string;
}

export interface Requisito {
  /** slug della patente (es. 'b') */
  patente: string;
  /** Età minima confermata dal titolare */
  etaMinima: number;
  /** id del veicolo, deve esistere in `veicoliQuiz` */
  veicolo: string;
  /** true se la categoria è pensata per un uso professionale */
  lavoro: boolean;
}

export interface TempoIndicativo {
  /** slug della patente */
  patente: string;
  /** Fasi a durata fissa confermate dal titolare, in ordine (es. teoria) */
  fasi: { nome: string; settimane: number }[];
  /** Numero indicativo di guide confermato: la fase "Guide" dura guide ÷ guide a settimana */
  guideIndicative: number;
}

export interface Recensione {
  testo: string;
  nome: string;
  /** es. 'Google' */
  fonte: string;
  /** Stelle della singola recensione, se presenti */
  stelle?: number;
}

export interface Sede {
  slug: string;
  nome: string;
  indirizzo: string;
  cap: string;
  capConfermato: boolean;
  capNota: string;
  citta: string;
  provincia: string;
  zona: string;
  quartieri: string[];
  mezzi: string;
  parcheggio: string;
  /** Testo usato per mappa e indicazioni (senza CAP finché non è confermato) */
  query: string;
}

/* ------------------------------------------------------------------ */
/* Dati                                                                */
/* ------------------------------------------------------------------ */

const annoFondazione = 2000; // ESEMPIO: anno di apertura reale
const annoCorrente = new Date().getFullYear();

export const site = {
  /** true = anteprima: noindex, banner, moduli che non inviano nulla */
  demo: true,
  /** Dominio senza barra finale. Usato anche da astro.config.mjs (site) */
  dominio: 'https://www.autoscuola-esempio.example',

  nome: 'Autoscuola Esempio', // ESEMPIO
  ragioneSociale: '', // es. 'Nome S.r.l.'
  partitaIva: '',

  citta: 'Città', // ESEMPIO
  zona: 'Zona Centro', // ESEMPIO
  quartieri: ['Quartiere Uno', 'Quartiere Due', 'Quartiere Tre'], // ESEMPIO

  /** Numero come va mostrato */
  telefono: '+39 000 000 0000', // ESEMPIO
  /** Formato internazionale, senza + e spazi (es. 39XXXXXXXXXX). Vuoto = pulsanti segnaposto */
  whatsapp: '',
  email: 'info@autoscuola-esempio.example', // ESEMPIO

  annoFondazione,

  orari: {
    /** Orari segreteria e teoria. confermato: false = segnaposto */
    righe: [
      { giorni: 'Lunedì – venerdì', fasce: [] as string[], confermato: false, nota: '' },
      { giorni: 'Sabato', fasce: [] as string[], confermato: false, nota: '' },
    ],
    /** Per i dati strutturati (JSON-LD), es. { giorni: ['Monday', 'Tuesday'], fasce: [['09:00', '12:30']] } */
    schema: [] as { giorni: string[]; fasce: string[][] }[],
  },

  sedi: [
    {
      slug: 'sede-centrale',
      nome: 'Sede centrale',
      indirizzo: 'Via Esempio 1', // ESEMPIO
      cap: '00000',
      capConfermato: false,
      capNota: 'CAP',
      citta: 'Città',
      provincia: 'XX',
      zona: 'Zona Centro',
      quartieri: ['Quartiere Uno', 'Quartiere Due', 'Quartiere Tre'],
      mezzi: '',
      parcheggio: '',
      query: 'Via Esempio 1, Città',
    },
  ] as Sede[],

  /** Patenti offerte. confermate: false = segnaposto "da confermare" */
  patentiConfermate: false,
  patenti: [
    { slug: 'a1', codice: 'A1', veicolo: 'Moto leggere', gruppo: 'moto', icona: 'scooter' },
    { slug: 'a', codice: 'A', veicolo: 'Moto', gruppo: 'moto', icona: 'moto' },
    { slug: 'b', codice: 'B', veicolo: 'Auto', gruppo: 'auto', icona: 'car' },
    { slug: 'be', codice: 'BE', veicolo: 'Auto con rimorchio', gruppo: 'auto', icona: 'car-trailer' },
    { slug: 'c', codice: 'C', veicolo: 'Camion', gruppo: 'camion', icona: 'truck' },
    { slug: 'ce', codice: 'CE', veicolo: 'Camion con rimorchio', gruppo: 'camion', icona: 'truck-trailer' },
    { slug: 'd', codice: 'D', veicolo: 'Autobus', gruppo: 'autobus', icona: 'bus' },
    { slug: 'de', codice: 'DE', veicolo: 'Autobus con rimorchio', gruppo: 'autobus', icona: 'bus-trailer' },
  ] as Patente[],

  /** Altri servizi offerti */
  servizi: {
    rinnovo: {
      attivo: true,
      nome: 'Rinnovo patente',
      /** Come funziona il servizio (vuoto = segnaposto) */
      dettaglio: '',
      /** Giorni e orari del servizio di rinnovo (vuoto = segnaposto) */
      orari: '',
    },
    duplicato: {
      attivo: true,
      nome: 'Duplicato patente',
      casi: ['smarrimento', 'furto', 'deterioramento'],
    },
    recuperoPunti: { attivo: false },
  },

  /** 'solo preventivo' → soloPreventivo: true e liste vuote (lo strumento "Calcola il tuo pacchetto" resta nascosto) */
  prezzi: {
    soloPreventivo: true,
    /** { patente: 'b', da: 0 } — prezzo "da" confermato */
    patenti: [] as { patente: string; da: number }[],
    /** Extra acquistabili: { id: 'guida-extra', nome: 'Guida extra', prezzo: 0 } */
    extra: [] as { id: string; nome: string; prezzo: number }[],
  },

  /** Promozione attiva: null = barra annunci nascosta */
  promozione: null as null | { testo: string; link?: string; linkTesto?: string },

  /** Solo numeri veri: anno di apertura e anni di attività (calcolati alla build) */
  numeri: [
    { valore: annoFondazione, etichetta: "l'anno in cui abbiamo aperto", anno: true },
    { valore: annoCorrente - annoFondazione, etichetta: 'anni a insegnare a guidare', anno: false },
  ],

  /** Punti di forza reali. confermato: false = segnaposto "da confermare" */
  puntiDiForza: [
    { icona: 'calendar', titolo: 'Esperienza', testo: '', confermato: false },
    { icona: 'touch', titolo: 'Teoria in aula', testo: '', confermato: false },
    { icona: 'chat', titolo: 'Sempre raggiungibili', testo: '', confermato: false },
    { icona: 'steering', titolo: 'Guide su misura', testo: '', confermato: false },
  ],

  /** Requisiti per categoria confermati dal titolare. Vuoto = "Quale patente fa per te?" nascosto */
  requisiti: [] as Requisito[],
  /** Opzioni della domanda "Cosa vuoi guidare?" (usate solo se `requisiti` è compilato) */
  veicoliQuiz: [
    { id: 'moto', label: 'Una moto o uno scooter' },
    { id: 'auto', label: "Un'auto" },
    { id: 'auto-rimorchio', label: "Un'auto con rimorchio" },
    { id: 'camion', label: 'Un camion' },
    { id: 'autobus', label: 'Un autobus' },
  ],

  /** Tempi indicativi confermati dal titolare. Vuoto = "Il tuo percorso stimato" nascosto */
  tempi: [] as TempoIndicativo[],
  guidePerSettimana: [1, 2, 3, 4],

  /** Documenti per servizio. Liste vuote = checklist con segnaposto (solo in demo) */
  documenti: {
    iscrizione: [] as string[],
    rinnovo: [] as string[],
    duplicato: [] as string[],
  },

  staff: [] as { nome: string; ruolo: string }[],

  recensioni: [] as Recensione[],

  google: {
    scheda: '', // link alla scheda Google
    linkRecensione: '', // link "lascia una recensione"
    mediaStelle: null as number | null,
    numeroRecensioni: null as number | null,
  },

  simulatoreQuiz: '',

  social: {
    /** Link alla pagina Facebook (vuoto = link nascosto) */
    facebook: '',
  },

  /** Colori del brand: null = palette predefinita in src/styles/global.css */
  coloriBrand: null,
  /** Percorso del logo in /public (es. '/logo.svg'). Vuoto = logotipo tipografico */
  logo: '',
  /** Foto reali in /public/foto: { src, alt, width, height } */
  foto: [] as { src: string; alt: string; width: number; height: number }[],

  /** Endpoint che riceve il modulo (POST). Vuoto = il modulo apre WhatsApp con i dati già scritti */
  endpointModulo: '',

  /** Risposte per la sezione "Per i genitori" (solo fatti noti; il resto è segnaposto) */
  genitori: [
    { icona: 'euro', titolo: 'Costi chiari', testo: '', todo: 'come funzionano costi e preventivo' },
    { icona: 'shield', titolo: 'Sicurezza', testo: '', todo: 'dettagli su istruttori e veicoli' },
    { icona: 'wallet', titolo: 'Pagamenti', testo: 'Modalità di pagamento accettate:', todo: 'modalità di pagamento' },
  ],

  faq: [
    { domanda: 'Dove siete?', risposta: '[DA COMPLETARE: indirizzo e zone servite]' },
    { domanda: 'Quando è aperta la segreteria?', risposta: '[DA COMPLETARE: orari]' },
    { domanda: 'Quali patenti posso prendere da voi?', risposta: '[DA COMPLETARE: elenco delle patenti]' },
    { domanda: 'Quanto costa la patente?', risposta: '[DA COMPLETARE: prezzi o preventivo]' },
    {
      domanda: 'Quanto tempo serve per prendere la patente?',
      risposta: 'Dipende dalla patente, da quante guide riesci a fare e dalle date d’esame. [DA COMPLETARE: tempi indicativi]',
    },
    { domanda: 'Fate il rinnovo della patente?', risposta: '[DA COMPLETARE]' },
    { domanda: 'Ho perso la patente: potete aiutarmi?', risposta: '[DA COMPLETARE]' },
    { domanda: 'Che documenti servono per iscrivermi?', risposta: '[DA COMPLETARE: elenco documenti]' },
  ],
};

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

export const telHref = `tel:${site.telefono.replace(/\s+/g, '')}`;

/** Link WhatsApp: se il numero manca restituisce il segnaposto #whatsapp */
export function whatsappHref(testo = ''): string {
  if (!site.whatsapp) return '#whatsapp';
  const q = testo ? `?text=${encodeURIComponent(testo)}` : '';
  return `https://wa.me/${site.whatsapp}${q}`;
}

export const hasWhatsapp = site.whatsapp.length > 0;

export function indicazioniHref(sede: Sede = site.sedi[0]): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(sede.query)}`;
}

export function mappaEmbed(sede: Sede = site.sedi[0]): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(sede.query)}&output=embed`;
}

export function patente(slug: string): Patente | undefined {
  return site.patenti.find((p) => p.slug === slug);
}

export const anniAttivita = annoCorrente - annoFondazione;

/** Orari confermati in forma breve, es. "dal lunedì al venerdì, 9:30 – 12:30 e 15:30 – 19:30" */
export const orariBreve = site.orari.righe
  .filter((r) => r.confermato)
  .map((r) => `${r.giorni.replace('Lunedì – venerdì', 'dal lunedì al venerdì')}, ${r.fasce.join(' e ')}`)
  .join('; ') || TODO;
