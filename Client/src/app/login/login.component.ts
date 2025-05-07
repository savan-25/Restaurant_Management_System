import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  loginForm!:FormGroup;
  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router){}


  ngOnInit(): void {
        this.loginForm = this.formbuilder.group({
          email:[''],
          password:['']
        });
  }

  logIn()
  {
    console.log(this.loginForm.value);

    alert("Marvellous" + " logged in successfully");
    this.router.navigate(['/restaurent']);
    this.loginForm.reset();
  }


}
