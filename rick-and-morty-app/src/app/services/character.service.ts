import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api';
  private nameFilter: string = '';
  private speciesFilter: string = '';
  private statusFilter: string = '';
  private genderFilter: string = '';

  constructor(private http: HttpClient) {}

  setFilters(
    name: string,
    species: string,
    status: string,
    gender: string
  ): void {
    this.nameFilter = name;
    this.speciesFilter = species;
    this.statusFilter = status;
    this.genderFilter = gender;
  }

  getCharacters(page: number): Observable<any> {
    let filterParams = `?page=${page}`;
    if (this.nameFilter) filterParams += `&name=${this.nameFilter}`;
    if (this.speciesFilter) filterParams += `&species=${this.speciesFilter}`;
    if (this.statusFilter) filterParams += `&status=${this.statusFilter}`;
    if (this.genderFilter) filterParams += `&gender=${this.genderFilter}`;

    return this.http.get<any>(`${this.apiUrl}/character/${filterParams}`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }
}
