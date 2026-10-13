/** Link WhatsApp lato client: senza numero resta il segnaposto #whatsapp */
export function setWaLink(a: HTMLAnchorElement, number: string, text: string) {
  if (!number) {
    a.href = '#whatsapp';
    a.dataset.wa = 'placeholder';
    return;
  }
  a.href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  a.target = '_blank';
  a.rel = 'noopener';
}

export const readJson = <T>(root: ParentNode, sel: string): T | null => {
  const el = root.querySelector(sel);
  try {
    return el ? (JSON.parse(el.textContent || 'null') as T) : null;
  } catch {
    return null;
  }
};
