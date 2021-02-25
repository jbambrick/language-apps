import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.css']
})
export class TermDetailComponent implements OnInit {

  id: string;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(map(params=>params['id']))
    .subscribe((id:string)=>{
      this.id = id;
    });
  }

}
