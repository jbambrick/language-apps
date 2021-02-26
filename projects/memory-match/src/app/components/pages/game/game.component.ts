import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { MemoryMatchService } from '../../../services/memory-match.service';
import { MemoryRound } from '../../../types/types/memory-round';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  round: MemoryRound;

  constructor( private memoryMatchService: MemoryMatchService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.memoryMatchService.getRoundByID(params.get('id'));
      })
    )
    .subscribe((round: MemoryRound)=>{
      this.round = round;
    });
  }

}
