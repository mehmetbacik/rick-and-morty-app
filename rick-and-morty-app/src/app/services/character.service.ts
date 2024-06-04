import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/?page=${page}`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }

  filterCharacters(name: string, species: string, status: string, gender: string): Observable<any> {
    let filterParams = '';
    if (name) filterParams += `&name=${name}`;
    if (species) filterParams += `&species=${species}`;
    if (status) filterParams += `&status=${status}`;
    if (gender) filterParams += `&gender=${gender}`;

    return this.http.get<any>(`${this.apiUrl}/character/?${filterParams}`);
  }
}
