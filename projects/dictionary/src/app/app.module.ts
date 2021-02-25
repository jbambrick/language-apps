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
import { ListControlComponent } from './components/widgets/list-control/list-control.component';
import { TermComponent } from './components/widgets/term/term.component';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';
import { TermsComponent } from './components/pages/terms/terms.component';
import { TermDetailComponent } from './components/pages/term-detail/term-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyListComponent,
    HomeComponent,
    DropdownComponent,
    SwitchComponent,
    VocabularyListsComponent,
    DisplayVocabularyListNamePipe,
    ListControlComponent,
    TermComponent,
    CopyrightPipe,
    TermsComponent,
    TermDetailComponent
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
