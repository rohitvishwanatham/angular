import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay ,catchError,map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {baseURL} from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class NewleaderService {

  constructor(private http:HttpClient,
    private processhttpmsg:ProcessHTTPMsgService) { }
  getLeaders():Observable<Leader[]>{
   return this.http.get<Leader[]>(baseURL + 'leadership/')
   .pipe(catchError(this.processhttpmsg.handleError));
  }
  getLeader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/'+id)
    .pipe(catchError(this.processhttpmsg.handleError));
    }
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders=>leaders[0]))
    .pipe(catchError(this.processhttpmsg.handleError));
    
  }
}
