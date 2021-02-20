import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/pages/list/list.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { SwitchComponent } from './components/widgets/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    DropdownComponent,
    SwitchComponent
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
