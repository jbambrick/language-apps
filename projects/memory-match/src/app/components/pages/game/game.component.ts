import { Component, OnInit } from '@angular/core';
import { MemoryMatchService } from '../../../services/memory-match/memory-match.service';
import { MemoryRound } from '../../../services/memory-match/memory-round';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  title: string = "Memory Match";
  message = "";

  round: MemoryRound;

  constructor( private memoryMatchService: MemoryMatchService ) { }

  ngOnInit(): void {
    this.memoryMatchService.getRoundByID("1").subscribe((round: MemoryRound)=>{
      this.round = round;
    })
  }

}
