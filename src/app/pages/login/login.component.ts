import { Component } from '@angular/core';
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
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.toastr.error("Por favor, preencha todos os campos corretamente");
      return;
    }

    const { email, password } = this.loginForm.value;
    
    if (!email || !password) {
      this.toastr.error("Email e senha são obrigatórios");
      return;
    }

    this.loginService.login(email, password).subscribe({
      next: () => {
        this.toastr.success("Login efetuado com sucesso!");
        this.router.navigate(['/listagem']); // Redirect to movie list
      },
      error: (error) => {
        console.error('Login error:', error);
        this.toastr.error(error.message || "Erro ao fazer login");
      }
    });
  }

}