import { Component, input, ElementRef, Inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Circuit } from '../circuit/circuit';
import {
  LucideDownload,
  LucideGraduationCap,
  LucideMapPin,
  LucideCpu,
  LucideZap,
} from '@lucide/angular';
import { LINKS, T } from '../../lib/content';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    Circuit,
    LucideDownload,
    LucideGraduationCap,
    LucideMapPin,
    LucideCpu,
    LucideZap,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  // Recebe o idioma atual propagado pelo componente pai (app.component)
  lang = input<string>('pt');
  private isInitialized = false; // Flag para ignorar o primeiro disparo do effect na hidratação

  // Puxa as traduções do Hero diretamente do content.ts unificado
  get h() {
    return T[this.lang()]?.hero || T['pt'].hero;
  }

  // Usa os links globais centralizados
  readonly LINKS = LINKS;

  // Retorna o currículo correto com base na linguagem ativa
  get currentCvLink(): string {
    return this.lang() === 'en' ? LINKS.cvEn : LINKS.cvPt;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Monitora a troca de idioma para reiniciar as animações do Hero apenas em cliques futuros
    effect(() => {
      this.lang(); // Registra o sinal como dependência

      // Se ainda estiver na carga/hidratação inicial, não faz nada
      if (!this.isInitialized) return;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const elements = this.elRef.nativeElement.querySelectorAll(
            '.animate-fade-up, .animate-reveal-line',
          );

          elements.forEach((el: HTMLElement) => {
            el.style.animation = 'none';
            void el.offsetWidth; // Força o reflow do navegador
            el.style.animation = '';
          });
        }, 50);
      }
    });

    // Libera a flag após a montagem inicial do componente no cliente
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.isInitialized = true;
      }, 300);
    }
  }
}
