import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionsService} from '../services/promotions.service';
import {Leader} from '../shared/leader';
import {NewleaderService} from '../services/newleader.service';
import {flyInOut,expand} from '../animations/app.animation'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  
  dishErrMess:string;

  constructor(private dishService: DishService,
    private promotionService:PromotionsService,
    private leaderservice:NewleaderService,
    @Inject('BaseURL') private BaseURL){
      

    }

  ngOnInit() {
   this.dishService.getFeaturedDish()
   .subscribe(dish=>this.dish=dish,
    errmess=>this.dishErrMess=<any>errmess);
    
   this.promotionService.getFeaturedPromotion()
   .subscribe(promotion=>this.promotion=promotion);
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader=>this.leader=leader);
  }

}
