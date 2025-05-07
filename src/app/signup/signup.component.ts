import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder,FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router )
  {}

  ngOnInit(): void {
      
    this.signupForm = this.formbuilder.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  get f() :{[key:string]:AbstractControl}{
    return this.signupForm.controls;
  }
  onSubmit()
  {
    if(this.signupForm.valid)
    {
      console.log(this.signupForm.value);

    this.http.post<any>("http://localhost:5200/users/signup",this.signupForm.value).subscribe((res)=>{
      console.log(res)
      alert("Signup Successsfully");
      this.signupForm.reset();
      this.router.navigate(['/login']);

    },(err:any)=>
    {
      console.log('Signup Error');
    }
  );
  }
 }



}
