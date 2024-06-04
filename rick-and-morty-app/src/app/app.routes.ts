import { Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';

export const routes: Routes = [
    { path: '', component: CharacterListComponent },
    { path: 'character/:id', component: CharacterDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];