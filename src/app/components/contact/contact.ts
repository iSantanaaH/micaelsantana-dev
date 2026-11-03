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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SplitTitle, Circuit],
  template: `
    <section id="contact" class="relative px-4 py-24 md:py-32" data-testid="contact-section">
      <div
        class="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[var(--line)] bg-[#06163F] px-6 py-16 sm:px-14 md:py-24"
      >
        <app-circuit class="opacity-70"></app-circuit>

        <div
          class="absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--blue)] opacity-40 blur-[120px]"
        ></div>

        <div class="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
          <!-- Coluna Esquerda com animação de subida -->
          <div class="lg:col-span-6 animate-fade-up">
            <p class="eyebrow">{{ t.eyebrow }}</p>

            <app-split-title
              [lines]="t.title"
              [glowLast]="true"
              class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold"
            ></app-split-title>

            <p class="mt-6 max-w-md text-base md:text-lg text-[var(--muted)]">{{ t.sub }}</p>

            <p class="eyebrow mt-10 !text-[var(--muted)]">{{ t.direct }}</p>

            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              @for (social of SOCIALS; track social[0]; let i = $index) {
                <a
                  [href]="social[1]"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.data-testid]="'contact-link-' + social[0]"
                  class="group flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--ink)]/60 px-4 py-3 transition-colors duration-300 hover:border-[var(--cyan)]"
                >
                  <span
                    class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--blue)]/20 text-[var(--cyan)]"
                  >
                    @switch (social[0]) {
                      @case ('whatsapp') {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                          />
                        </svg>
                      }
                      @case ('github') {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                          />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      }
                      @case ('linkedin') {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                          />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      }
                      @case ('email') {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      }
                    }
                  </span>
                  <span
                    class="min-w-0 break-all text-sm transition-colors duration-300 group-hover:text-[var(--cyan)]"
                  >
                    {{ social[2] }}
                  </span>
                </a>
              }
            </div>
          </div>

          <!-- Coluna Direita (Formulário) -->
          <div class="lg:col-span-6 animate-fade-up" style="animation-delay: 0.2s;">
            <form
              (ngSubmit)="submit()"
              class="panel rounded-3xl p-6 sm:p-8 space-y-4"
              data-testid="contact-form"
              novalidate
            >
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  class="field"
                  placeholder="{{ t.name }}"
                  [(ngModel)]="form.name"
                  name="name"
                  data-testid="contact-name-input"
                />
                <input
                  class="field"
                  type="email"
                  placeholder="{{ t.email }}"
                  [(ngModel)]="form.email"
                  name="email"
                  data-testid="contact-email-input"
                />
              </div>
              <input
                class="field"
                placeholder="{{ t.company }}"
                [(ngModel)]="form.company"
                name="company"
                data-testid="contact-company-input"
              />
              <textarea
                class="field min-h-[150px] resize-y"
                placeholder="{{ t.message }}"
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
                {{ loading() ? t.sending : t.send }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DE SUCESSO GLOBAL FIXO NA TELA INTEIRA -->
    @if (showModal()) {
      <div
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#040a1c]/85 backdrop-blur-md"
      >
        <div
          class="panel relative w-full max-w-md rounded-[28px] p-8 text-center border border-[var(--cyan)]/40 shadow-[0_0_60px_rgba(79,216,255,0.2)] animate-fade-up"
        >
          <div
            class="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[var(--blue)]/20 text-[var(--cyan)] shadow-[0_0_20px_rgba(79,216,255,0.3)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h3 class="font-display text-2xl font-bold text-[var(--text)]">
            {{ lang() === 'en' ? 'Message Sent!' : 'Mensagem Recebida!' }}
          </h3>

          <p class="mt-3 text-sm text-[var(--muted)] leading-relaxed">
            {{
              lang() === 'en'
                ? 'Your message was successfully sent. I will get back to you as soon as possible!'
                : 'Mensagem recebida com sucesso, entro em contato assim que possível!'
            }}
          </p>

          <div class="mt-8">
            <button type="button" (click)="closeModal()" class="btn-primary w-full justify-center">
              OK
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
  lang = input('pt');
  readonly SOCIALS = SOCIALS;

  form = { name: '', email: '', company: '', message: '' };
  loading = signal(false);
  showModal = signal(false);

  get t() {
    return T[this.lang()]?.contact || T['pt'].contact;
  }

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Efeito reativo que bloqueia ou libera o scroll da página baseado no modal
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.showModal()) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });

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

  async submit() {
    if (
      this.form.name.trim().length < 2 ||
      !/^\S+@\S+\.\S+$/.test(this.form.email) ||
      this.form.message.trim().length < 10
    ) {
      alert(this.t.invalid || 'Preencha os campos corretamente.');
      return;
    }

    this.loading.set(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '0f2738dd-420d-4497-b3df-2edbdd37e2c4',
          name: this.form.name,
          email: this.form.email,
          company: this.form.company || 'Não informada',
          message: this.form.message,
          subject: `Nova mensagem de ${this.form.name} via Portfólio`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        this.showModal.set(true);
        this.form = { name: '', email: '', company: '', message: '' };
      } else {
        alert('Erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      alert('Erro de conexão. Verifique sua rede.');
    } finally {
      this.loading.set(false);
    }
  }

  closeModal() {
    this.showModal.set(false);
  }
}
