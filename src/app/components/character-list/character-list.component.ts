import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  showNoResultsMessage: boolean = false;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number): void {
    this.characterService.setFilters(this.nameFilter, this.speciesFilter, this.statusFilter, this.genderFilter);
    this.characterService.getCharacters(page)
      .subscribe(response => {
        if (response.results.length === 0) {
          this.characters = [];
          this.showNoResultsMessage = true;
        } else {
          this.characters = response.results;
          this.showNoResultsMessage = false;
        }
      }, error => {
        //console.error('Characters Error:', error);
        this.characters = [];
        this.showNoResultsMessage = true;
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
      this.scrollToTop();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getCharacters(this.currentPage);
    this.scrollToTop();
  }

  @ViewChild('top') topElement!: ElementRef;

  private scrollToTop(): void {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
