const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapa il testo e trasforma ogni "[DA COMPLETARE…]" in un segnaposto evidenziato */
export function withTodo(text: string): string {
  return escape(text).replace(/\[DA COMPLETARE[^\]]*\]/g, (m) => `<span class="todo">${m}</span>`);
}

/** Divide un titolo per evidenziare una parola chiave con il blocco di colore */
export function highlight(title: string, word?: string): string {
  const safe = escape(title);
  if (!word) return safe;
  const w = escape(word);
  const i = safe.indexOf(w);
  if (i === -1) return safe;
  // La punteggiatura subito dopo resta attaccata alla parola evidenziata
  const rest = safe.slice(i + w.length);
  const punct = /^[.,;:!?…]+/.exec(rest)?.[0] ?? '';
  return `${safe.slice(0, i)}<span class="nowrap"><span class="hl">${w}</span>${punct}</span>${rest.slice(punct.length)}`;
}
