import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TermDetailComponent } from './components/pages/term-detail/term-detail.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { VocabularyListComponent } from './components/pages/vocabulary-list/vocabulary-list.component';
import { VocabularyListsComponent } from './components/pages/vocabulary-lists/vocabulary-lists.component';

export const routes: Routes = [
    { "path":"", "component": HomeComponent },
    { "path":"lists/:id", "component": VocabularyListComponent },
    { "path":"lists", "component": VocabularyListsComponent },
    { "path": "terms/:id", "component": TermDetailComponent },
    { "path": "terms", "component": TermsComponent }
];