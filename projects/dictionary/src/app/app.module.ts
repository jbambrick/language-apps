import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/pages/list/list.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
