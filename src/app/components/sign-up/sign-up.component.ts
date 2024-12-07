import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { AppServiceService } from '../../app-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(
    private service : UserServiceService,
    private toastr : ToastrService,
    private router:Router

  ){}
  ngOnInit(){
  }

  selectedFile: File | null = null
  
  onFileSelected(event:any){
    console.log(event);
    this.selectedFile = event.target.files[0]
  }

  register_user(email:any,password:any,fullname:any,phone:any,birth:any,gender:any){
    const formData = new FormData();
    formData.append('user_email', email.value);
    formData.append('user_password', password.value);
    formData.append('user_name', fullname.value);
    formData.append('user_phone', phone.value);
    formData.append('user_birth', birth.value);
    if (this.selectedFile) { formData.append('avatar', this.selectedFile)  }
    formData.append('user_gender', gender.value);
    formData.append('user_address', "thanhphohochiminh");        
    this.service.user_register(formData).subscribe((data)=>{
      if(data.code == 400) this.toastr.error(data.error)
      else if(data.code == 200){
        this.router.navigate(['/sign-in'])
        this.toastr.success("Register successfull")
      } 
      else console.log(data.error);
    })
  }

}
