import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup } from '@angular/forms';
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
      name:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }

  signup()
  {
    this.http.post<any>("http://localhost:5200/posts",this.signupForm.value).subscribe(res=>{
      console.log(res)
      alert("Signup Successsfully");
      this.signupForm.reset();
      this.router.navigate(['/login']);

    }),(err:any)=>
    {
      console.log('Signup Error');
    }
  }

}
