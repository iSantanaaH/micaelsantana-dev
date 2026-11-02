import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Marquee } from './components/marquee/marquee';
import { About } from './components/about/about';
import { Stack } from './components/stack/stack';
import { Journey } from './components/journey/journey';
import { Project } from './components/project/project';
import { Contact } from './components/contact/contact';
import { T } from './lib/content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Hero,
    Marquee,
    About,
    Stack,
    Journey,
    Project,
    Contact,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentLang = signal<string>(
    typeof window !== 'undefined' ? localStorage.getItem('lang') || 'pt' : 'pt',
  );

  // Removido o constructor com effect() global.
  // Toda vez que o idioma muda, tratamos de forma explícita no clique do usuário:
  onLangChange(newLang: string) {
    this.currentLang.set(newLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
      document.documentElement.lang = newLang === 'en' ? 'en' : 'pt-BR';
    }
  }

  get footerText() {
    return T[this.currentLang()]?.footer || T['pt'].footer;
  }

  get currentYear() {
    return new Date().getFullYear();
  }
}
