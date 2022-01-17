import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    console.log(email,password);
    this.loginService.otherLogin(email,password);
  }

}
