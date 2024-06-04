import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  nameFilter: string = '';
  speciesFilter: string = '';
  statusFilter: string = '';
  genderFilter: string = '';

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number): void {
    this.characterService.filterCharacters(this.nameFilter, this.speciesFilter, this.statusFilter, this.genderFilter)
      .subscribe(response => {
        this.characters = response.results;
      });
  }

  filterCharacters(): void {
    this.currentPage = 1;
    this.getCharacters(this.currentPage);
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.speciesFilter = '';
    this.statusFilter = '';
    this.genderFilter = '';
    this.getCharacters(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacters(this.currentPage);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getCharacters(this.currentPage);
  }
}