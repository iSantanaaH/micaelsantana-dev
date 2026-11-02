import {
  Component,
  input,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHead, Reveal } from '../reveal/reveal';
import { T } from '../../lib/content';
import { setupIntersectionObserver } from '../../lib/observer';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule, SectionHead, Reveal],
  templateUrl: './journey.html',
  styleUrl: './journey.css',
})
export class Journey implements AfterViewInit {
  lang = input('pt');

  get t() {
    return T[this.lang()]?.journey || T['pt'].journey;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Monitora a troca de idioma para reiniciar o observer e as animações no Journey
    effect(() => {
      this.lang();

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          setupIntersectionObserver(this.elRef);
        }, 50);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setupIntersectionObserver(this.elRef);
    }
  }
}
