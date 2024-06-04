import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters: any[] = [];

  constructor(private characterService: CharacterService) {
    this.characterService.getCharacters().subscribe(response => {
      this.characters = response.results;
    });
  }
}