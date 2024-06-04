import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacter(Number(id)).subscribe(response => {
      this.character = response;
    });
  }
}