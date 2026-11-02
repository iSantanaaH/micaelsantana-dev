import {
  Component,
  input,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { SectionHead } from '../reveal/reveal';
import { LINKS, T } from '../../lib/content';
import { setupIntersectionObserver } from '../../lib/observer';

@Component({
  selector: 'app-project-layers',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div
      class="panel relative rounded-3xl p-5 sm:p-6 shadow-[0_40px_120px_-30px_rgba(47,128,255,0.6)]"
      data-testid="project-architecture"
    >
      <div class="flex items-center justify-between">
        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          mw-flow · architecture
        </p>
        <img
          ngSrc="/mw-logo.png"
          alt="MW-Flow"
          class="h-10 w-10 rounded-lg object-cover"
          height="544"
          width="558"
        />
      </div>
      <ul class="mt-5 space-y-2.5">
        @for (layer of layers(); track layer[0]; let i = $index) {
          <li
            class="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--ink)]/60 px-4 py-3 transition-colors duration-300 hover:border-[var(--cyan)]/60"
          >
            <span class="flex items-center gap-3">
              <span
                class="h-2 w-2 shrink-0 rounded-full bg-[var(--cyan)] blink"
                [style.animation-delay]="i * 0.3 + 's'"
              ></span>
              <span class="text-sm font-semibold">{{ layer[0] }}</span>
            </span>
            <span class="text-right text-xs text-[var(--muted)]">{{ layer[1] }}</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class ProjectLayersComponent {
  layers = input.required<[string, string][]>();
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProjectLayersComponent, SectionHead],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements AfterViewInit {
  lang = input('pt');
  readonly LINKS = LINKS;

  get t() {
    return T[this.lang()]?.project || T['pt'].project;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Monitora a alteração de idioma para reexecutar o observer após a atualização do DOM
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
