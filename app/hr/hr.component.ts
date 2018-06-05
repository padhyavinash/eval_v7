import { Component } from '@angular/core';
import { AuthenticationService, UserDetails, UserResult } from '../authentication.service';
import { UserResultClass } from '../../UserResultClass';
import { PieChartService } from '../piechart.service';
import { PieChartConfig } from '../piechart';
declare var google: any;

var infData;
var tempinf;
var idmData;
var tempidm;

@Component({
  templateUrl: './hr.component.html'
})

export class HrComponent {
  details: UserDetails;

  title = 'Reusable charts sample';

  data1: any[] =[
    ['Category', 'Correct Answers'],
    ['Wrong',     1],
    ['Cat1',      2],
    ['Cat2',      3],
    ['Cat3',      4]
    
  ];
  config1: PieChartConfig = new PieChartConfig('Final Result stat', 0.4);
  elementId1: String = 'myPieChart1';

  data2: any[] =[
    ['Organisation', 'Scores'],
    ['INF',      1],
    ['IDM',      2]
  ];
  config2: PieChartConfig = new PieChartConfig('Org analysis', 0.4);
  elementId2: String = 'myPieChart2';
/* 
  candidateData : any = {
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0
  }; */
  candidateData : string;
  status : string;
  userResult: UserResultClass = new UserResultClass();
  /* userResult: UserResult ={
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0
  }; */

  resData: UserResult[] = [
    {
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0,
    org:'',
    pos:''
  }];

  constructor(private auth: AuthenticationService,private _pieChartService:PieChartService) {}
  
showResults(){
 // var newResData = this.resData;

  this.auth.getRes().subscribe(res => {                
    this.resData = res;   

    
     
    /* this.candidateData=  this.resData[0].name;
   
    this.userResult.name =  this.resData[0].name;
    this.userResult.email =  this.resData[0].email;
    this.userResult.finalResult =  this.resData[0].finalResult;
    this.userResult.tech =  this.resData[0].tech;
    this.userResult.pos =  this.resData[0].pos; */
    
    
    console.log(this.resData)
  });
}

  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    this.showResults();
    
    
  }


  onNameClick(candidate):void{
    console.log("in on name click"+candidate);        
    this.candidateData = candidate;

    this.resData.forEach(element => {

    if(element.name==candidate)
    {
      console.log("name matched"+element.name);
      if(element.finalResult > 90)
      {
        this.status = 'Pass';
      }
      else
      {
        if(element.finalResult > 50 && element.finalResult < 91)
        {
          this.status = 'On Hold';
        } 
        else
        {
          this.status = 'Fail';
        }
      }
      this.userResult = element;
      this.data1 = [
        ['Category', 'Correct Answers'],
        ['Wrong',     10-(element.category1+element.category2+element.category3)],
        ['Cat1',      element.category1],
        ['Cat2',      element.category2],
        ['Cat3',      element.category3]
        
        
      ];
      this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1); 
    }
    });    
  }

  findOrgRes()
  {
    var len = this.resData.length;
    var cnt_inf = 0;
    var cnt_idm = 0;
    tempidm = 0;
    tempinf = 0;
    infData = 0;
    idmData = 0;

    for(var i=0;i<len;i++)
    {
   console.log('Inside Pie Graph 1');
    if(this.resData[i].org == 'INF')
    {
      cnt_inf = cnt_inf + 1;
      console.log('this.inf - '+this.resData[i].finalResult);
      tempinf = this.resData[i].finalResult; 
      infData = infData + tempinf;
      console.log('inf - '+infData);
      
    }
    else
    {
      if(this.resData[i].org == 'IDM')
      {
        cnt_idm = cnt_idm + 1;
        console.log('this.idm - '+this.resData[i].finalResult);
        tempidm = this.resData[i].finalResult; 
        idmData = idmData + tempidm;
        console.log('idmData - '+idmData);
      }
    }
  }
  infData = infData/cnt_inf;
  idmData = idmData/cnt_idm;
  console.log('infData - '+infData);
  console.log('idmData - '+idmData);
  }

  showAnalysis():void{
    console.log('Inside Show Analysis 1');
    this.findOrgRes(); 
    console.log('Inside Show Analysis 2');
      this.data2 = [
        ['Organisation', 'Scores'],
        ['INF',      infData],
        ['IDM',      idmData]
       //['INF',      20],
       //['IDM',      130]
      ];
      console.log('Inside Show Analysis 3');
      this._pieChartService.BuildPieChart(this.elementId2, this.data2, this.config2); 
     
  }

  
}

