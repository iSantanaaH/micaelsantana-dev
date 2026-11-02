import {
  Component,
  input,
  signal,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitTitle } from '../reveal/reveal';
import { Circuit } from '../circuit/circuit';
import { LINKS, T } from '../../lib/content';
import { setupIntersectionObserver } from '../../lib/observer';

const SOCIALS = [
  ['whatsapp', LINKS.whatsapp, '(75) 9 9946-8431', 'whatsapp'],
  ['github', LINKS.github, 'iSantanaaH', 'github'],
  ['linkedin', LINKS.linkedin, 'micael-santana', 'linkedin'],
  ['email', LINKS.email, 'micaelsantana.dev@gmail.com', 'email'],
];

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form
      (ngSubmit)="submit()"
      class="panel rounded-3xl p-6 sm:p-8 space-y-4"
      data-testid="contact-form"
      novalidate
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          class="field"
          placeholder="{{ c().name }}"
          [(ngModel)]="form.name"
          name="name"
          data-testid="contact-name-input"
        />
        <input
          class="field"
          type="email"
          placeholder="{{ c().email }}"
          [(ngModel)]="form.email"
          name="email"
          data-testid="contact-email-input"
        />
      </div>
      <input
        class="field"
        placeholder="{{ c().company }}"
        [(ngModel)]="form.company"
        name="company"
        data-testid="contact-company-input"
      />
      <textarea
        class="field min-h-[150px] resize-y"
        placeholder="{{ c().message }}"
        [(ngModel)]="form.message"
        name="message"
        data-testid="contact-message-input"
      ></textarea>

      <button
        type="submit"
        class="btn-primary w-full justify-center inline-flex items-center gap-2"
        [disabled]="loading()"
        data-testid="contact-submit-button"
      >
        <!-- Send Icon SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        {{ loading() ? c().sending : c().send }}
      </button>
    </form>
  `,
})
export class ContactForm {
  c = input.required<any>();

  form = { name: '', email: '', company: '', message: '' };
  loading = signal(false);

  submit() {
    if (
      this.form.name.trim().length < 2 ||
      !/^\S+@\S+\.\S+$/.test(this.form.email) ||
      this.form.message.trim().length < 10
    ) {
      alert(this.c().invalid);
      return;
    }

    this.loading.set(true);

    setTimeout(() => {
      alert(this.c().ok);
      this.form = { name: '', email: '', company: '', message: '' };
      this.loading.set(false);
    }, 1000);
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SplitTitle, Circuit, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
  lang = input('pt');
  readonly SOCIALS = SOCIALS;

  get t() {
    return T[this.lang()]?.contact || T['pt'].contact;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Monitora a troca de idioma para reiniciar o observer e as animações no Contact
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
