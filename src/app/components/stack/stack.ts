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
import { T, STACK } from '../../lib/content';
import { setupIntersectionObserver } from '../../lib/observer';

const SPAN = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-7',
];

@Component({
  selector: 'app-stack-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--navy)] p-7 sm:p-8 transition-colors duration-500 hover:border-[var(--cyan)]/50"
      [attr.data-testid]="'stack-card-' + group().key"
    >
      <div
        class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--blue)] opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-40"
      ></div>
      <div class="relative flex items-center gap-3">
        <span
          class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--line)] bg-[var(--ink)]/70"
        >
          @switch (group().key) {
            @case ('backend') {
              <!-- Server -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                <line x1="6" x2="6.01" y1="6" y2="6" />
                <line x1="6" x2="6.01" y1="18" y2="18" />
              </svg>
            }
            @case ('api') {
              <!-- Network -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <rect x="16" y="16" width="6" height="6" rx="1" />
                <rect x="2" y="16" width="6" height="6" rx="1" />
                <rect x="9" y="2" width="6" height="6" rx="1" />
                <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
                <path d="M12 12V8" />
              </svg>
            }
            @case ('security') {
              <!-- ShieldCheck -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
            @case ('data') {
              <!-- Database -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
              </svg>
            }
            @case ('frontend') {
              <!-- LayoutTemplate -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            }
            @case ('devops') {
              <!-- Activity -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-[var(--cyan)]"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
          }
        </span>
        <span class="eyebrow">0{{ index() + 1 }}</span>
      </div>
      <h3 class="font-display relative mt-6 text-2xl sm:text-3xl font-bold tracking-tight">
        {{ label() }}
      </h3>
      <div class="relative mt-6 flex flex-wrap gap-2.5">
        @for (it of group().items; track it) {
          <span
            class="rounded-full border border-[var(--line)] bg-[var(--ink)]/70 px-4 py-2 text-sm transition-colors duration-300 hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >{{ it }}</span
          >
        }
      </div>
    </article>
  `,
})
export class StackCardComponent {
  group = input.required<any>();
  label = input.required<string>();
  index = input.required<number>();
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, StackCardComponent],
  templateUrl: './stack.html',
  styleUrl: './stack.css',
})
export class Stack implements AfterViewInit {
  lang = input('pt');
  readonly STACK = STACK;
  readonly SPAN = SPAN;

  get t() {
    return T[this.lang()]?.stack || T['pt'].stack;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Monitora a troca de idioma para reiniciar o observer e as animações no Stack
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
