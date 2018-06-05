import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './hr_register.component.html'
})
export class Hr_RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    type: 'Candidate',
    tech:'',
    org:'',
    chkLogin:'N',
    pos:''
  };

  position : string = "Fresher";
  

  hiredPosition :  string[]=[
    "Fresher",
    "Software Engineer",
    "Associate Software Consultant",
    "Software Consultant",    
    "Technical Lead"
  ];

  technologies :  string[] = ["java","oracle"];
  java :  string[] = ["Core Java","Spring","Hibernate"];
  oracle :  string[] = ["sql","plsql"];

  checkboxValue:boolean;

  selectedTechnology:string;
  selectedTechnologyValues :string[]=[];
  selectedTechnologyValue:string;
  showTechnologies:string[]=[];
  
  clickSelectedTechnology(selectedTechnology):void{

    console.log("selectedTechnology :: "+selectedTechnology);
    this.selectedTechnologyValue=selectedTechnology;

    if(this.selectedTechnologyValue=="java"){

      console.log("present");
      this.showTechnologies=this.java;
    }
    else{

       if(this.selectedTechnologyValue=="oracle"){

        console.log("present");
        this.showTechnologies=this.oracle;
      }
    }
  }

  selectedCheckBox(value,showTechnology):void{    
    
    console.log("selected value"+showTechnology+"checkbox boolean value "+value.target.checked+" present in "+(this.selectedTechnologyValues.indexOf(value)!=-1))
    if(this.selectedTechnologyValues.indexOf(showTechnology)!=-1){

      console.log(this.selectedTechnologyValues.indexOf(showTechnology)+"present selectedJava"+showTechnology);
      this.selectedTechnologyValues.push(showTechnology);      
    }
    else{

      this.selectedTechnologyValues.push(showTechnology);
    }
    if(!value.target.checked)
    {
      if (this.selectedTechnologyValues.indexOf(showTechnology) > -1) {
        console.log("Removed ");
        this.selectedTechnologyValues.splice(this.selectedTechnologyValues.indexOf(showTechnology), 1);
      }      
    }
  }

  clickselectedJavaValues(selectedJava):void{

    if(this.selectedTechnologyValues.indexOf(selectedJava)!=-1){

      console.log("present selectedJava"+selectedJava);
    }
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    console.log('Inside REG 1');
    console.log('Inside REG 1 - Selected tech - '+this.selectedTechnologyValue);
    console.log('Inside REG 1 - Selected pos - '+this.position);
    this.credentials.pos = this.position;
    if(this.credentials.pos === "Fresher")
    {
      this.credentials.tech = "Fresher";  
    }
    else{
      this.credentials.tech = this.selectedTechnologyValue;
    }
    
    console.log('Inside REG 1 - Credentials tech - '+this.credentials.tech);
    console.log('Inside REG 1 - Credentials pos - '+this.credentials.pos);
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
      console.log('Inside REG 1 subscrive');
    }, (err) => {
      console.error(err);
    });
  }

  onNameClick(position):void{
    this.position = position;
    console.log("this.selectedPosition::"+this.position);
  }
}
