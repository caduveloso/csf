import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Mounted once in the Layout. Wires up tasteful, specific scroll motion:
//  · [data-reveal] elements fade + rise into view (stagger via data-reveal-delay)
//  · article prose auto-tags only its *visual* blocks (headings, figures,
//    callouts, quotes, code, diagrams) — body paragraphs stay calm
//  · .draw SVGs line-draw when revealed
//  · .scrolly sections drive a sticky figure step-by-step as you scroll
export default function Reveal() {
  const router = useRouter();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observers = [];

    const setup = () => {
      // 1 · auto-tag the visual blocks inside an article (not every paragraph)
      const prose = document.querySelector('.prose-editorial');
      if (prose) {
        const sel =
          ':scope > h2, :scope > h3, :scope > figure, :scope > .figure-block, ' +
          ':scope > .callout, :scope > blockquote, :scope > pre, :scope > .scrolly';
        prose.querySelectorAll(sel).forEach((el) => {
          if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
        });
      }

      const items = Array.from(document.querySelectorAll('[data-reveal]'));

      if (reduce || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
      }

      // 2 · reveal on enter
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = Number(el.dataset.revealDelay || 0);
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-in');
            io.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      items.forEach((el) => io.observe(el));
      observers.push(io);

      // 3 · scrollytelling: each step lights up its part of the sticky figure
      document.querySelectorAll('.scrolly').forEach((sc) => {
        const figure = sc.querySelector('.scrolly-figure');
        const steps = Array.from(sc.querySelectorAll('.scrolly-step'));
        if (!figure || !steps.length) return;
        const so = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              steps.forEach((s) => s.classList.remove('active'));
              entry.target.classList.add('active');
              figure.setAttribute('data-active', entry.target.dataset.step || '1');
            });
          },
          { threshold: 0.6, rootMargin: '-18% 0px -32% 0px' }
        );
        steps.forEach((s) => so.observe(s));
        observers.push(so);
      });
    };

    // wait a tick so dangerouslySetInnerHTML article content is in the DOM
    const t = setTimeout(setup, 40);
    return () => {
      clearTimeout(t);
      observers.forEach((o) => o.disconnect());
    };
  }, [router.asPath]);

  return null;
}
