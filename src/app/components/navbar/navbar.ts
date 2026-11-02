import {
  Component,
  HostListener,
  input,
  output,
  signal,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideMenu, LucideX } from '@lucide/angular';
import { T } from '../../lib/content';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideMenu, LucideX],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  lang = input<string>('pt');
  langChange = output<string>();

  scrolled = signal(false);
  open = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Verifica a posição do scroll imediatamente ao carregar ou atualizar a página
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 24);
    }
  }

  // Puxa o objeto T direto do content.ts
  get t() {
    return T[this.lang()] || T['pt'];
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.scrolled.set(window.scrollY > 24);
    }
  }

  toggleMenu() {
    this.open.update((v) => !v);
  }

  setLang(l: string) {
    this.langChange.emit(l);
  }
}
