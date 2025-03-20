import { Component, Input } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}
@Component({
  selector: 'app-login',
  imports: [DefaultLoginLayoutComponent,ReactiveFormsModule,PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm! : FormGroup<LoginForm>;

  constructor(private router : Router,
              private loginService: LoginService,
              private toastr: ToastrService){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  submit() {
    const formData = this.loginForm.value;
    console.log("formData enviado para login:", formData); // Exibe os dados do formulário
    this.toastr.success("Login efetuado")
    if (this.loginForm.invalid) {
      this.toastr.error("Preencha todos os campos corretamente!");
      return;
    }
  }

  navigate() {
    this.router.navigate(["signup"]);
  }
}
