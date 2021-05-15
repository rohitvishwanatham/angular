import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import { resolve } from 'url';
import { of ,Observable} from 'rxjs';
import { delay, catchError,map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import{baseURL} from '../shared/baseurl';
import{ProcessHTTPMsgService} from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http:HttpClient,
    private processHttpMsg:ProcessHTTPMsgService) { }
  getPromotions() :Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions/')
    .pipe(catchError(this.processHttpMsg.handleError));
}
  getPromotion(id:string):Observable< Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/'+id)
    .pipe(catchError(this.processHttpMsg.handleError));
  }
  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions =>promotions[0]))
    .pipe(catchError(this.processHttpMsg.handleError));
  }

}
