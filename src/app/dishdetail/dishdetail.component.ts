import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import {Comment} from '../shared/Comment';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import  {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility',[
      state('shown',style({
        transform:'scale(1.0)' ,
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('*=>*',animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
  
  feedbackForm:FormGroup;
  comment:Comment;
  @ViewChild('f1form') feedbackFormDirective;

  dish : Dish;
  dishIds: string[];
  errMess:string;
  dishcopy:Dish;

  prev:string;
  next:string;
  visibility='shown';

  formErrors={
    'author':'',

    'coment':''

  }
  Validationmsg={
  'author':  {
    'required':'name is required',
    'minlength':'name should be atleast 2 characters',
    'maxlength':'name should be less than 25 characters'

    },
    'coment':{
      'required':'comment is required',

    }
  }

  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location :Location,
    private fb:FormBuilder,
    @Inject('BaseURL')private BaseURL) { 
      this.createForm();
    }

  ngOnInit() { 
  this.dishService.getDishIds()
  .subscribe((dishIds)=>this.dishIds=dishIds);
  this.route.params.pipe(switchMap((params:Params)=>{this.visibility='hidden';return this.dishService.getDish(params['id']);}))
    .subscribe(dish=>{this.dish=dish; this.dishcopy=dish; this.setPrevNext(dish.id); this.visibility='shown'; },
    errmess=> this.errMess=<any>errmess);
  }
  createForm(){
    
    this.feedbackForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:0,
      coment:['',[Validators.required]],
      date:new Date().toISOString()

    });
    this.feedbackForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
  this.onValueChanged();
    
  }
  onValueChanged(data?:any){
    if(!this.feedbackForm){
      return;
    }
    const form=this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control=form.get(field);
        if(control && control.dirty && control.invalid){
          const messages=this.Validationmsg[field];
          for(const key in control.errors){
            
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+'';
            }
          }
        }
      }
    }
  }
  onSubmit(){
    this.comment=this.feedbackForm.value;
    console.log(this.comment);
    this.feedbackForm.reset({
      author:'',
      rating:0,
      coment:'',
      date:''
    });
    this.feedbackFormDirective.resetForm();
    
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish=>{
      this.dish=dish;this.dishcopy=dish;
    },
    errmess=>{this.dish=null;this.dishcopy=null;this.errMess=<any>errmess});
   
    

  }
  setPrevNext(dishId:string){
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index +1)%this.dishIds.length];

  }
  goBack():void{
    this.location.back();

  }

}
