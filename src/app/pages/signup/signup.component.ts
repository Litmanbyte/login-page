import { Component, Input } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [DefaultLoginLayoutComponent,ReactiveFormsModule,PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  signupForm! : FormGroup;
  @Input() disablePrimaryBtn : boolean = true;

  constructor(private router : Router,
              private loginService: LoginService,
              private toastr: ToastrService){
    this.signupForm = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toastr.success("Sucesso"),
      error : () => this.toastr.error("fail")
    })
  }

  navigate() {
    this.router.navigate(["login"]);
  }
}
