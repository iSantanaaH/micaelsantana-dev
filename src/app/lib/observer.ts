import { ElementRef } from '@angular/core';

export function setupIntersectionObserver(
  elRef: ElementRef,
  selector: string = '.animate-fade-up',
) {
  if (typeof window === 'undefined') return;

  const elements = elRef.nativeElement.querySelectorAll(selector);

  // Reseta o estado visual imediatamente para forçar o reinício da animação
  elements.forEach((el: HTMLElement) => {
    el.classList.remove('in-view');
    void el.offsetWidth; // Truque para forçar o reflow do navegador
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      // Se o elemento está na tela (ex: ao trocar o idioma), aguarda um instante e aplica a classe para rodar o fade
      setTimeout(() => {
        el.classList.add('in-view');
      }, 50);
    } else {
      observer.observe(el);
    }
  });
}
