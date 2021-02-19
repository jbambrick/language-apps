import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ListComponent } from './components/pages/list/list.component';

export const routes: Routes = [
    {"path":"", "component": HomeComponent},
    {"path":"lists/:id", "component": ListComponent}
];