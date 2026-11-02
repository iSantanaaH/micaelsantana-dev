import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reveal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="className()" class="transition-all duration-700 ease-out">
      <ng-content></ng-content>
    </div>
  `,
})
export class Reveal {
  delay = input<number>(0);
  className = input<string>('');
}

@Component({
  selector: 'app-split-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mt-6 font-display text-chrome font-bold leading-[0.98] tracking-tight {{ className() }}">
      @for (l of lines(); track l; let i = $index) {
        <span class="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            class="block origin-left transition-all duration-700 ease-out"
            [class.text-glow]="glowLast() && i === lines().length - 1"
          >
            {{ l }}
          </span>
        </span>
      }
    </h2>
  `,
})
export class SplitTitle {
  lines = input.required<string[]>();
  className = input<string>('');
  glowLast = input<boolean>(false);
}

@Component({
  selector: 'app-section-head',
  standalone: true,
  imports: [CommonModule, Reveal, SplitTitle],
  template: `
    <div class="max-w-3xl">
      <app-reveal>
        <p class="eyebrow mb-6">{{ eyebrow() }}</p>
      </app-reveal>

      <app-split-title
        [lines]="title()"
        class="mt-5 text-4xl sm:text-5xl lg:text-6xl"
      ></app-split-title>

      @if (sub()) {
        <app-reveal [delay]="0.15">
          <p class="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[var(--muted)]">
            {{ sub() }}
          </p>
        </app-reveal>
      }
    </div>
  `,
})
export class SectionHead {
  eyebrow = input.required<string>();
  title = input.required<string[]>();
  sub = input<string>();
}
