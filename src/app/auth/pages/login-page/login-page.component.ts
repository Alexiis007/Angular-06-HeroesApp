import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(
    private router : Router,
    private authServices : AuthService,
    ){}
  public onLogin():void{
    this.authServices.login('Christian@gmail.com','123456')
    .subscribe(user => {
      this.router.navigate(['/'])
    })
  }
}
