import {
  Component,
  ElementRef,
  AfterViewInit,
  input,
  Inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { T } from '../../lib/content';
import { setupIntersectionObserver } from '../../lib/observer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  lang = input<string>('pt');

  get a() {
    return T[this.lang()]?.about || T['pt'].about;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Sempre que o sinal de linguagem mudar, reaplicamos a verificação após o DOM atualizar
    effect(() => {
      // Lê o signal lang para registrar a dependência
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
