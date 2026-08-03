import { useEffect } from 'react';

export function useScrollEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .12 });
    document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => reveal.observe(element));
    const elements = [...document.querySelectorAll<HTMLElement>('.parallax')];
    let frame = 0;
    const update = () => { frame = 0; const center = window.innerHeight / 2; elements.forEach((element) => { const speed = Number(element.dataset.speed || .08); const rect = element.getBoundingClientRect(); element.style.setProperty('--parallax-y', `${(rect.top + rect.height / 2 - center) * speed * -1}px`); }); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { reveal.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
}
