import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import{ProcessHTTPMsgService} from './process-httpmsg.service';
import {baseURL} from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
   private processfbmsg:ProcessHTTPMsgService ) { }
  submitFeedback(fb:Feedback) :Observable <Feedback>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })

    };
    return this.http.post<Feedback>(baseURL + 'feedback/',fb,httpOptions)
    .pipe(catchError(this.processfbmsg.handleError));

  }
}
