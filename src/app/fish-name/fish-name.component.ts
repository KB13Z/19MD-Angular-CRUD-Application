import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishName } from '../fish-name';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fish-name',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class='listing'>
      <img class='listing-photo' [src]='fishName.photo' alt='Photo of {{fishName.name}}'>
      <h3 class='listing-heading'>{{ fishName.name }}</h3>
      <p class='listing-species'>{{ fishName.species }}</p>
      <a [routerLink]="['/details', fishName.id]" class='listing-link'>Learn more</a>
    </section>
  `,
  styleUrls: ['./fish-name.component.css']
})
export class FishNameComponent {
  @Input() fishName!:FishName;
}
