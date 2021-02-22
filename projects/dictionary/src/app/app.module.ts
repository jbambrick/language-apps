import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VocabularyListComponent } from './components/pages/vocabulary-list/vocabulary-list.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { SwitchComponent } from './components/widgets/switch/switch.component';
import { VocabularyListsComponent } from './components/pages/vocabulary-lists/vocabulary-lists.component';
import { DisplayVocabularyListNamePipe } from './pipes/display-vocabulary-list-name/display-vocabulary-list-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyListComponent,
    HomeComponent,
    DropdownComponent,
    SwitchComponent,
    VocabularyListsComponent,
    DisplayVocabularyListNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
