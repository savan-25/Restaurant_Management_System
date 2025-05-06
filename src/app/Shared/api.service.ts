import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { RestaurentData } from '../restaurent-dash/restaurent.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x:string]:any;
   
    
  private url = "http://localhost:5200/posts";
   constructor(private http:HttpClient) { }
   
  //Add Restaurent
  addRestaurent(restaurentModelObj:RestaurentData)
  {
     return this.http.post<any>(this.url,restaurentModelObj).pipe(map((res:any) => 
    {
      return res;
    }));
  }
  //post method
  postRestaurent(data:any ) 
  {
    return this.http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //GET request
  getRestaurent()
  {
    return this.http.get<any>(this.url).pipe(map((res:any)=>
    {
      return res;
    }));
  }

  //delete request
  deleteRestaurent(id:number | string)
  {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(map((res: any) => {
      return res;
    }));
    
  }

  //update request
  updateRestaurent(id:number | string,data:RestaurentData)
  {
    return this.http.put<any>(`${this.url}/${id}`,data).pipe(map((res:any)=>
    {
      return res;
    }))
  }

}
