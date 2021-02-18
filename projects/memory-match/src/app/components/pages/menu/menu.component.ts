import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  rounds = [
    {
      "name": "Round 1",
      "id":1
  },
  {
    "name": "Round 2",
    "id":2
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
