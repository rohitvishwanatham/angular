import { Component, OnInit } from '@angular/core';
import {Leader} from '../shared/leader';
import {NewleaderService}  from '../services/newleader.service';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  constructor(private newleader:NewleaderService) { }

  ngOnInit() {
  this.newleader.getLeaders()
  .then(leaders=>this.leaders=leaders);
  }
  

}
