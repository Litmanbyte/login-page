import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    console.log("Form válido?", this.signupForm.valid);
    console.log("Erros no formulário:", this.signupForm.errors);
    console.log("Estado dos campos:", this.signupForm.controls);
  
    // Verifica se o formulário é válido
    if (this.signupForm.invalid) {
      this.toastr.error("Preencha todos os campos corretamente!");
      return;
    }
  
    // Coleta os dados do formulário
    const formData = this.signupForm.getRawValue();
    console.log("formData enviado para signup:", formData);
  
    // Passa os dados de forma individualizada para o método signup
    this.loginService.signup(
      formData.name, 
      formData.email, 
      formData.password
    ).subscribe({
      next: () => this.toastr.success("Sucesso"),
      error: () => this.toastr.error("Falha no cadastro")
    });
  }
  
  

  navigate(){
    this.router.navigate(["login"])
  }
}