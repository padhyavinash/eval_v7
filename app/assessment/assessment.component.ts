import { Component,OnInit, Input } from '@angular/core';
import { AuthenticationService, UserDetails, TokenPayload, UserResult } from '../authentication.service';
import { AssessmentService } from '../assessment.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';
import { Category } from '../category';
import { CategoryAnswers } from '../categoty';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html'  
})
export class AssessmentComponent {

  details: UserDetails;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    type: '',
    tech: '',
    org:'',
    pos:''
  };

  resData: UserResult = {
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0,
    org:'',
    pos:''
  };

  renderQuestion : Question = new Question();
  category : Category=new Category();
  questions : Question [];
  /*
  questions : Question []=[
    {
      id: 1,
      question: "What is your name1?",
      option1 :"1. Ramesh",
      option2:"2.Suresh",
      option3:"3.Ganesh",
      option4:"4.Pappu",
      category:"1",
      correctOption : "option1"
  },
  {
    id: 2,
    question: "What is your name2?",
    option1 :"Ramesh",
    option2:"Suresh",
    option3:"Ganesh",
    option4:"Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 3,
    question: "What is your name3?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 4,
    question: "What is your name4?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 5,
    question: "What is your name5?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 6,
    question: "What is your name6?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 7,
    question: "What is your name7?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 8,
    question: "What is your name8?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 9,
    question: "What is your name9?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
    id: 10,
    question: "What is your name10?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"1",
    correctOption : "option1"
	},
	{
      id: 11,
      question: "What is your name1?",
      option1 :"1. Ramesh",
      option2:"2.Suresh",
      option3:"3.Ganesh",
      option4:"4.Pappu",
      category:"2",
      correctOption : "option1"
  },
  {
    id: 12,
    question: "What is your name2?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
    id: 13,
    question: "What is your name3?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
    id: 14,
    question: "What is your name4?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
    id: 15,
    question: "What is your name5?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
    id: 16,
    question: "What is your name6?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
    id: 17,
    question: "What is your name7?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"2",
    correctOption : "option1"
	},
	{
      id: 18,
      question: "What is your name1?",
      option1 :"1. Ramesh",
      option2:"2.Suresh",
      option3:"3.Ganesh",
      option4:"4.Pappu",
      category:"3",
      correctOption : "option1"
  },
  {
    id: 19,
    question: "What is your name2?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"3",
    correctOption : "option1"
	},
	{
    id: 20,
    question: "What is your name3?",
    option1 :"1. Ramesh",
    option2:"2.Suresh",
    option3:"3.Ganesh",
    option4:"4.Pappu",
    category:"3",
    correctOption : "option1"
  }
  ];
  */
  
  countAttemptedQuestion : number = 0;
  countCategory1 : number = 0;
  countCategory2 : number = 0;
  countCategory3 : number = 0;
  categoryType : string = "";
  categoryAnswer :CategoryAnswers = new CategoryAnswers();
 
    
  //For given answer
  selectedAnswers : string[]=[];

  selectedOption;

  //Number of questions to be attempted
  noOfQuestionCount : number = 10;

  //Last question for keeping Finish
  lastQuestion : boolean = false;

  //For Timer
  timeLeft: number = 1200;
  interval;


  constructor(private auth: AuthenticationService,
              private assessmentService: AssessmentService, 
             // private qservice: QuestionService,
              private router: Router) {}
  
  ngOnInit() { 
    console.log('nginit1 ');   
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.credentials = user;
      console.log('new user details tech '+ this.details.tech);
      console.log('new user credentials tech '+ this.credentials.tech);
      const newUser = this.credentials;
    
     console.log('beforeget ques ');
      this.auth.getQs(newUser)
        .subscribe(qs => {
          //this.user = user;
          console.log('Inside Get qs - name '+newUser.name);
          console.log('Inside Get qs - tech '+newUser.tech);
          console.log('Inside Get qs - pos '+newUser.pos);
          this.questions = qs; 
      /*
      this.userService.getUsers()
        .subscribe(contacts =>
          this.contacts = contacts);
      */  
     console.log('before extractQuestionsCategoryWise ');
     this.extractQuestionsCategoryWise();
     console.log('before startTimer ');
     this.startTimer();   
     console.log('this.questions - '+this.questions)   
    this.renderQuestion = this.category.category1Que[0] ;         
    this.countCategory1++;    
    this.countAttemptedQuestion++;  
    console.log('after countAttemptedQuestion ');
        });
        console.log('after   ques ');

      //this.credentials = user;
    }, (err) => {
      console.error(err);
    });

  
     // const newUser ={
     //   tech: this.details.tech
     // }

     
/*
    this.extractQuestionsCategoryWise();
    this.startTimer(); 
    this.renderQuestion = this.category.category1Que[0] ;     
    this.countCategory1++;
    this.countAttemptedQuestion++;
    */
  }

  extractQuestionsCategoryWise():void{

    for (var temp = 0; temp < this.questions.length; temp++) {
      console.log('Qs Length '+this.questions.length);

      if(this.questions[temp].category=="1"){

        this.category.category1Que.push(this.questions[temp]);
      }
      else{

        if(this.questions[temp].category=="2"){
          
          this.category.category2Que.push(this.questions[temp]);
        }
        else{       

        this.category.category3Que.push(this.questions[temp]);
      
        }
      }  
    }
  }
  
  //This will be called on Next button selected
  onSelect(): void {

    //Push last question selected answer
    this.selectedAnswers.push(this.selectedOption);
    this.selectedOption=undefined;
    this.renderQuestionAndCheckAnswer();
        
   //Increase the count of question
    this.countAttemptedQuestion++;
        
    //For last question enable Finish Button in HTML page
   if(this.countAttemptedQuestion==this.noOfQuestionCount){

    this.lastQuestion = true;        
   }        
  }


  renderQuestionAndCheckAnswer():void{
     //
     if(this.countCategory1==3||this.countCategory1==7){

      this.checkAnswer();  
    }
    else if(this.countCategory2==4||(this.countCategory2==3 && this.countAttemptedQuestion==10)) {
      this.checkAnswer();  
    } 
    //else if(this.countCategory3==3) {

      //this.checkAnswer();  
   // }
    
    

      if(this.categoryAnswer.category1>1){

        if(this.categoryAnswer.category2>1){
          this.countCategory2=0;
          this.categoryType="category3";
          this.renderQuestion = this.category.category3Que[this.countCategory3] ;
          this.countCategory3++;
          console.log("category3 :: ");
        }
        else{
        this.countCategory1=0;
        this.categoryType="category2";
        this.renderQuestion = this.category.category2Que[this.countCategory2] ;
        this.countCategory2++;
        console.log("category2 :: ");
        }
      }
      else{
        this.categoryType="category1";
        this.renderQuestion = this.category.category1Que[this.countCategory1] ;
        console.log("category1 :: ");
        this.countCategory1++;
      }
      console.log("Render Question and check answer.");
        
  }

  //This will be called on selected answer
  onAnswerSelection(optionSelected):void{    
    this.selectedOption = optionSelected;
    console.log("selected answer :: "+this.selectedOption)
    
   }

  // This will get called on selection of Finish Button.
  onFinish():void{

    //Push last question selected answer
    this.selectedAnswers.push(this.selectedOption);
    this.checkAnswer();
    console.log("In finish.",this.selectedAnswers);
    this.examFinishOrTimeout();
  }

  

  checkAnswer():void{
    
    //For category 1
     var localCount  = this.countCategory1;
     var tempNo=localCount;

     if(this.countCategory1==3)
     {
        tempNo=0;        
     }
     else if(this.countCategory1==7){
        tempNo=3;
        localCount=this.countAttemptedQuestion;
     }
     else if(this.countCategory1==10){
      tempNo=7;
     }

     //For Category2
     if(this.countCategory2==4)
     {
       tempNo = 3;
       localCount=this.countAttemptedQuestion;
     }
     if(this.countCategory2==3&& this.countAttemptedQuestion==10)
     {
       tempNo = 0;                                   
      localCount=3;
     } 
     if(this.countCategory2==7)
     {
      tempNo = 7;
      localCount=this.countAttemptedQuestion;
     }

     //For Category 3
     if(this.countCategory3== 3)
     {
       tempNo = 0;
       localCount=3;
     }

     var correctAnswerCount = 0;
     for(var temp=tempNo;temp<localCount;temp++){

          if(this.categoryType=="category1")
          {

            if(this.selectedAnswers[temp]==this.category.category1Que[temp].correctOption) {
              correctAnswerCount++;        
              //console.log("In check answer of category 1.");
            }       
            
          }
          else if(this.categoryType=="category2")
          {
            if(this.countCategory2==3 && this.countAttemptedQuestion==10){
                  if(this.selectedAnswers[temp+7]==this.category.category2Que[temp].correctOption) {
                                correctAnswerCount++;  
                  }
                }else{
            if(this.selectedAnswers[temp]==this.category.category2Que[temp-3].correctOption) {
              correctAnswerCount++;        
            //console.log("In check answer of category 2.");
            }
            }  
                   
          }else if(this.categoryType=="category3"){

            if(this.selectedAnswers[temp+7]==this.category.category3Que[temp].correctOption) {
              correctAnswerCount++;        
              //console.log("In check answer of category 3.");
            }               
          }
      }
      if(this.countCategory1==3||this.countCategory1==7||this.countCategory1==10)
      {
        console.log("count :: ",this.countCategory1);
        this.categoryAnswer.category1=this.categoryAnswer.category1+correctAnswerCount;
      }
      if(this.countCategory2==4||this.countCategory2==7||(this.countCategory2==3 && this.countAttemptedQuestion==10))
      {
        this.categoryAnswer.category2=this.categoryAnswer.category2+correctAnswerCount;
        console.log("count :: ",this.countCategory2);
      }
      if(this.countCategory3==3)
      {
        this.categoryAnswer.category3=this.categoryAnswer.category3+correctAnswerCount;      
        console.log("count :: ",this.countCategory3);
      }
      console.log(this.categoryAnswer);
  }
  
  chkLogin(){
    
    this.auth.chkLogin(this.credentials).subscribe(() => {
      console.log('Inside ChkLogin False 1');  
      
    }, (err) => {
      console.error(err);
    });
  }
  examFinishOrTimeout(){
    
    //Logic for storing final results -- categoryAnswer
    var newResData = this.resData;

    newResData.email = this.details.email;
    newResData.name = this.details.name;
    newResData.tech = this.details.tech;
    newResData.category1 = this.categoryAnswer.category1;
    newResData.category2 = this.categoryAnswer.category2;
    newResData.category3 = this.categoryAnswer.category3;
    newResData.finalResult = (this.categoryAnswer.category1*2) + (this.categoryAnswer.category2*10) + (this.categoryAnswer.category3*30);
    newResData.org = this.details.org;
    newResData.pos = this.details.pos;
    console.log('Final Result: '+newResData.finalResult);
    console.log('Before SaveRes');
    this.auth.saveRes(newResData).subscribe(res => {
      
          
      this.resData = res; 

    });;
    console.log('After SaveRes');
    this.chkLogin();
    this.auth.cdlogout();
   console.log("Exam Finished.");
  }


  //Timer Code

    startTimer() {
        if(this.timeLeft!=0){
          console.log("In timer if")
            this.interval = setInterval(() => {
            if(this.timeLeft > 0) {
                this.timeLeft--;
            }
            else{

              if((this.timeLeft==0)){

                console.log("In timer else")
                this.examFinishOrTimeout();
                clearInterval(this.interval);
              }
            }      
            },1000)
        }        
    }
}



