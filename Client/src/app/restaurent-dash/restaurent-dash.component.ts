import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgControlStatusGroup  } from '@angular/forms';
import { ApiService } from '../Shared/api.service';
import {RestaurentData} from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
  standalone : false
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  restaurentModelObj : RestaurentData = new RestaurentData('','','',0,'');
  allRestaurentData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
     
    })
    this.getAllData();
  }

  clickAddResto()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
 
  addRestaurent()
  {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe((res:any) => {
      console.log(res);
      alert("Restaurent Added Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    }, (err:any)=>{
      console.log(err);
      alert("Restaurent Added Failed!");
    })
  }

  getAllData()
  {
    this.api.getRestaurent().subscribe(res => {
      console.log("Api respose :",res);
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })
  }

  deleteResto(id: any)
  {
    console.log("Deleting ID:", id); // Debugging statement
 
    this.api.deleteRestaurent(id).subscribe((res: any) => {
      console.log(res);
      alert("Restaurent Deleted Successfully");
      this.getAllData();
    })
  }

  onEditResto(data: any)
  {
    this.showAdd = false;
    this.showBtn = true;
    
    this.restaurentModelObj.id = data._id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

 
  }
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj.id,this.restaurentModelObj).subscribe((res: any) => {
      alert("Restaurent Updated Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    })
    
  }

  
}
