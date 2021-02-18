import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Tŝilhqot’in Memory Match';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToMenu(){
    this.router.navigateByUrl('/menu');
  }
}