import { Component, OnInit ,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,Contacttype} from '../shared/feedback';
import {flyInOut,expand} from '../animations/app.animation';
import {FeedbackService} from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm :FormGroup;
  feedback:Feedback;
  contacttype= Contacttype;
  fbo:Feedback;
  formerr:string;
  loder:boolean;
  form:boolean;
  submission:boolean;

  @ViewChild('fform') feedbackFormDirective;
  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };
  validationMesaages={
    'firstname':{
      'required' :'Firstname is rquired',
      'minlength': 'First name must be atleast 2 characters long',
      'maxlength':'First name cannot be more than 25 character'
    },
    'lastname':{
      'required' :'Lastname is rquired',
      'minlength': 'Last name must be atleast 2 characters long',
      'maxlength':'Last name cannot be more than 25 character'
    },
    'telnum':{
      'required':'Telnum is required',
      'pattern' :'Tel .no must contain only numbers'

    },
    'email':{
      'required':'Email is required',
      'email':'Email is not valid'

    }
  };
  constructor(private fb:FormBuilder,
    private fbs:FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }
  createForm(){
    this.loder=false;
    this.form=true;
    this.feedbackForm= this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''

    });
    this.feedbackForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();//reset from validation messages
    
  }
  onValueChanged(data?: any){
    if(!this.feedbackForm){
      return;
    }
    const form=this.feedbackForm;
    for(const field in this.formErrors)
    {
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field]='';
        const control =form.get(field);
        
        if(control && control.dirty && !control.valid){
         
          const messages =this.validationMesaages[field];
          for(const key in control.errors){
        
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field ]+=messages[key]+ '';
            }
          }
        }

      }

    }
  }
  

  onSubmit(){
    this.feedback =this.feedbackForm.value;
   this.loder=true;
   this.fbo=null;
    this.fbs.submitFeedback(this.feedback)
    .subscribe(fb=> {this.fbo=fb;this.submission=true; this.form=false;setTimeout(()=>{this.form=true;this.submission=false;this.loder=false},5000)},
      errmess=>{this.loder=false;this.formerr=errmess});
      
      
    this.feedbackForm.reset({
      
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:''

    });
    this.feedbackFormDirective.resetForm();
    
   
    
  }

}
