import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private loginService: LoginserviceService,
    private router: Router
  ) { }

  ngOnInit() {


  }



  onLoginSubmit(login: login) {
    if (login.username && login.password) {
      this.loginService.userLogin(login).subscribe(profile => {
          console.log(profile);
          if (profile.success) {
            //  profile.user.practice_id, profile.user.user_id
                // this._alertService.pushNewMsg([
                //   { severity: 'success', summary: 'Successfully Logging In' }
                // ]);
                this.loginService.storeUserData(profile.token);
                this.router.navigate(['/pagination']);
          } else {
            if (profile.msg === 'no user found') {
              this.username = null;
              this.password = null;
              this.router.navigate(['/login']);
            } else {

            }
          }
      });
    }
  }
}


export class login{
  username:String;
  password:String;
}
