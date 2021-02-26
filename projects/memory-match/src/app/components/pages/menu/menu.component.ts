import { Component, OnInit } from '@angular/core';
import { MemoryMatchService } from '../../../services/memory-match.service';
import { MemoryRound } from '../../../types/types/memory-round';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  rounds: MemoryRound[];

  constructor( private memoryMatchService: MemoryMatchService ) { }

  ngOnInit(): void {
    this.memoryMatchService.getAllRounds().subscribe((data: MemoryRound[])=>{
      console.log(data)
      this.rounds = data;
    })
  }

}
