import { site, type Sede } from '../data/site';

/** JSON-LD DrivingSchool + LocalBusiness per una sede (senza aggregateRating né review) */
export function sedeSchema(sede: Sede) {
  const url = new URL(`/sedi/${sede.slug}/`, site.dominio).href;
  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    streetAddress: sede.indirizzo,
    addressLocality: sede.citta,
    addressRegion: sede.provincia,
    addressCountry: 'IT',
  };
  // Il CAP entra nei dati strutturati solo quando è confermato
  if (sede.capConfermato) address.postalCode = sede.cap;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['DrivingSchool', 'LocalBusiness'],
    '@id': `${url}#sede`,
    name: `${site.nome} – ${sede.nome}`,
    url,
    telephone: site.telefono.replace(/\s+/g, ''),
    email: site.email,
    foundingDate: String(site.annoFondazione),
    address,
    areaServed: sede.quartieri.map((q) => ({ '@type': 'Place', name: `${q}, ${sede.citta}` })),
    openingHoursSpecification: site.orari.schema.flatMap((o) =>
      o.fasce.map(([opens, closes]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: o.giorni.map((g) => `https://schema.org/${g}`),
        opens,
        closes,
      })),
    ),
    image: new URL('/og.png', site.dominio).href,
  };
  if (site.social.facebook) data.sameAs = [site.social.facebook];
  if (site.ragioneSociale) data.legalName = site.ragioneSociale;
  if (site.partitaIva) data.vatID = site.partitaIva;
  if (site.logo) data.logo = new URL(site.logo, site.dominio).href;
  return data;
}
