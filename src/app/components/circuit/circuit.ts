import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circuit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circuit.html',
  styleUrl: './circuit.css',
})
export class Circuit {
  readonly PATHS = [
    'M0 120 H220 L260 160 H520 L560 120 H900',
    'M0 300 H160 L200 260 H420 L470 310 H760 L800 270 H1200',
    'M1440 90 H1180 L1140 130 H900 L860 90 H700',
    'M1440 420 H1240 L1200 380 H980 L940 420 H720',
    'M120 720 V560 L160 520 H380',
    'M1320 720 V600 L1280 560 H1080',
    'M600 0 V80 L640 120',
    'M980 0 V60 L940 100 H860',
  ];

  readonly NODES = [
    [220, 120],
    [520, 160],
    [420, 260],
    [760, 310],
    [1180, 90],
    [900, 130],
    [1240, 420],
    [980, 420],
    [380, 520],
    [1080, 560],
    [640, 120],
    [860, 100],
  ];
}
