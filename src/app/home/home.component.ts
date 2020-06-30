import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionsService} from '../services/promotions.service';
import {Leader} from '../shared/leader';
import {NewleaderService} from '../services/newleader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  constructor(private dishService: DishService,
    private promotionService:PromotionsService,
    private leaderservice:NewleaderService){
      

    }

  ngOnInit() {
   this.dishService.getFeaturedDish()
   .subscribe(dish=>this.dish=dish);
   this.promotionService.getFeaturedPromotion()
   .subscribe(promotion=>this.promotion=promotion);
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader=>this.leader=leader);
  }

}
