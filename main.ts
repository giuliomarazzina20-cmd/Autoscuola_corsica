/**
 * Script comuni a tutte le pagine (vanilla, nessuna libreria).
 * Animazioni solo con transform/opacity e disattivate con prefers-reduced-motion.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (toggle && menu) {
  const set = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      set(false);
      toggle.focus();
    }
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) set(false);
  });
}

/* ---------- Barra annunci chiudibile ---------- */
const announce = document.querySelector<HTMLElement>('[data-announce]');
if (announce) {
  const key = 'announce-closed';
  try {
    if (sessionStorage.getItem(key)) announce.hidden = true;
  } catch {}
  announce.querySelector('[data-announce-close]')?.addEventListener('click', () => {
    announce.hidden = true;
    try {
      sessionStorage.setItem(key, '1');
    } catch {}
  });
}

/* ---------- Toast ---------- */
let toastEl: HTMLElement | null = null;
let toastTimer = 0;
export function toast(msg: string) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.dataset.state = 'hidden';
    document.body.append(toastEl);
  }
  toastEl.textContent = msg;
  requestAnimationFrame(() => (toastEl!.dataset.state = 'visible'));
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toastEl!.dataset.state = 'hidden'), 5000);
}

/* Link segnaposto (WhatsApp o altri link non ancora forniti) */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[data-wa="placeholder"], a[data-todo-link]');
  if (!a) return;
  e.preventDefault();
  toast(
    a.hasAttribute('data-todo-link')
      ? 'Link [DA COMPLETARE]: sarà attivo dopo la pubblicazione.'
      : 'WhatsApp [DA COMPLETARE]: il numero sarà attivo dopo la pubblicazione. Intanto puoi chiamarci.',
  );
});

/* ---------- Numeri che contano ---------- */
const counters = $$('[data-count]');
if (counters.length) {
  const run = (el: HTMLElement) => {
    const end = Number(el.dataset.count);
    const start = Number(el.dataset.from ?? 0);
    const t0 = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (reduced || !('IntersectionObserver' in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.count ?? ''));
  } else {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            io.unobserve(en.target);
            run(en.target as HTMLElement);
          }
        }),
      { threshold: 0.6 },
    );
    counters.forEach((el) => {
      el.textContent = el.dataset.from ?? '0';
      io.observe(el);
    });
  }
}

/* ---------- Strada che si disegna durante lo scroll ---------- */
const roads = $$('[data-road]');
if (roads.length && !reduced) {
  let active: HTMLElement[] = [];
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    active.forEach((road) => {
      const r = road.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
      road.style.setProperty('--road', p.toFixed(3));
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const el = en.target as HTMLElement;
      active = en.isIntersecting ? [...new Set([...active, el])] : active.filter((a) => a !== el);
    });
    onScroll();
  });
  roads.forEach((r) => {
    r.classList.add('is-drawing');
    r.style.setProperty('--road', '0');
    io.observe(r);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/* ---------- Striscia scorrevole: pausa ---------- */
$$('[data-marquee-toggle]').forEach((btn) => {
  const box = btn.closest<HTMLElement>('[data-marquee]');
  btn.addEventListener('click', () => {
    const paused = box?.classList.toggle('is-paused') ?? false;
    btn.setAttribute('aria-pressed', String(paused));
  });
});

/* ---------- Mappa a due click ---------- */
$$('[data-map]').forEach((box) => {
  const step1 = box.querySelector<HTMLButtonElement>('[data-map-step1]');
  const consent = box.querySelector<HTMLElement>('[data-map-consent]');
  const load = box.querySelector<HTMLButtonElement>('[data-map-load]');
  step1?.addEventListener('click', () => {
    step1.hidden = true;
    if (consent) consent.hidden = false;
    load?.focus();
  });
  load?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = box.dataset.src ?? '';
    iframe.title = box.dataset.title ?? 'Mappa';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'map__frame';
    box.querySelector('[data-map-cover]')?.remove();
    box.append(iframe);
    iframe.focus();
  });
});
