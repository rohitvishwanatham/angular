import { Component, OnInit,Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {NewleaderService}  from '../services/newleader.service';
import {flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  errMess:string;
  constructor(private newleader:NewleaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  this.newleader.getLeaders()
  .subscribe(leaders=>this.leaders=leaders,
    errmess=>this.errMess=errmess);
  }
  

}
