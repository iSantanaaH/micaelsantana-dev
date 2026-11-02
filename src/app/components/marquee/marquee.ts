import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { T } from '../../lib/content';
import { LucideDynamicIcon, LucideSparkle } from '@lucide/angular';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './marquee.html',
  styleUrl: './marquee.css',
})
export class Marquee {
  readonly Sparkle = LucideSparkle;
  lang = input('pt');

  get items(): string[] {
    return T[this.lang()]?.marquee || T['pt'].marquee;
  }

  protected readonly LucideSparkle = LucideSparkle;
}
