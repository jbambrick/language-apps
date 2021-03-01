
import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { GameComponent } from './components/pages/game/game.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  }
];