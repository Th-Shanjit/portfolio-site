export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${id}`);
}

export function scrollToSectionFromHash(): void {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
}
