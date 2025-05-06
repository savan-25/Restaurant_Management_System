export class RestaurentData
{
    id:number = 0;
    name:string = '';
    address: string = '';
    email: string = '';
    services: string = '';
    mobile:number = 0;

    constructor(name:string,address: string, email : string,mobile : number,serv:string,id?: number )
    {   
        
        this.name = name;
        this.address = address;
        this.email = email;
        this.mobile = mobile;
        this.services = serv;
    }
}